"use client";

import { useEffect, useRef, type RefObject } from "react";
import * as THREE from "three";
import { ScrollTrigger } from "@/lib/motion/gsap";
import { useReducedMotion } from "@/lib/motion/useReducedMotion";
import { colorways, brand, type ColorwayName } from "@/lib/theme";

type Props = {
  /** The scrollable wrapper whose height drives camera + color progress (0..1). */
  journeyRef: RefObject<HTMLElement | null>;
  /** Narrative colorway per equal scroll segment across the journey. */
  colorStops: ColorwayName[];
};

/**
 * A deterministic "trade network" — glowing nodes (chamber hubs) connected by
 * arcing corridors (trade routes). No stock imagery: the depth illusion comes
 * entirely from the WebGL scene + fog, driven by scroll progress.
 */
function buildNetwork() {
  // Fixed pseudo-random layout (seeded) so the shape is stable across reloads.
  let seed = 42;
  const rand = () => {
    seed = (seed * 16807) % 2147483647;
    return (seed - 1) / 2147483646;
  };

  const NODE_COUNT = 16;
  const nodes: THREE.Vector3[] = [];
  for (let i = 0; i < NODE_COUNT; i++) {
    const radius = 5.5 + rand() * 3.5;
    const theta = rand() * Math.PI * 2;
    const phi = Math.acos(2 * rand() - 1);
    nodes.push(
      new THREE.Vector3(
        radius * Math.sin(phi) * Math.cos(theta),
        radius * Math.sin(phi) * Math.sin(theta) * 0.6,
        radius * Math.cos(phi)
      )
    );
  }

  // Connect each node to its 2 nearest neighbors (roughly) for a plausible network.
  const edges: [number, number][] = [];
  for (let i = 0; i < NODE_COUNT; i++) {
    const distances = nodes
      .map((n, j) => ({ j, d: i === j ? Infinity : nodes[i].distanceTo(n) }))
      .sort((a, b) => a.d - b.d);
    for (const { j } of distances.slice(0, 2)) {
      const key: [number, number] = i < j ? [i, j] : [j, i];
      if (!edges.some(([a, b]) => a === key[0] && b === key[1])) edges.push(key);
    }
  }

  return { nodes, edges };
}

function makeGlowTexture(): THREE.Texture {
  const size = 128;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d")!;
  const gradient = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
  gradient.addColorStop(0, "rgba(255,255,255,1)");
  gradient.addColorStop(0.35, "rgba(255,255,255,0.6)");
  gradient.addColorStop(1, "rgba(255,255,255,0)");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, size, size);
  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}

export default function TradeNetworkCanvas({ journeyRef, colorStops }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 100);
    camera.position.set(0, 0, 30);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);
    container.appendChild(renderer.domElement);

    const inkColor = new THREE.Color(brand.ink);
    scene.fog = new THREE.FogExp2(inkColor, 0.045);

    const networkGroup = new THREE.Group();
    scene.add(networkGroup);

    const { nodes, edges } = buildNetwork();
    const glowTexture = makeGlowTexture();

    const nodeGeometry = new THREE.IcosahedronGeometry(0.16, 1);
    const nodeMaterial = new THREE.MeshBasicMaterial({ color: colorways.emerald.bright });
    const nodeMesh = new THREE.InstancedMesh(nodeGeometry, nodeMaterial, nodes.length);
    const dummy = new THREE.Object3D();
    nodes.forEach((pos, i) => {
      dummy.position.copy(pos);
      dummy.updateMatrix();
      nodeMesh.setMatrixAt(i, dummy.matrix);
    });
    networkGroup.add(nodeMesh);

    const sprites: THREE.Sprite[] = nodes.map((pos) => {
      const material = new THREE.SpriteMaterial({
        map: glowTexture,
        color: colorways.emerald.bright,
        transparent: true,
        opacity: 0.55,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      });
      const sprite = new THREE.Sprite(material);
      sprite.position.copy(pos);
      sprite.scale.setScalar(1.6);
      networkGroup.add(sprite);
      return sprite;
    });

    const edgeLines: THREE.Line[] = edges.map(([a, b]) => {
      const start = nodes[a];
      const end = nodes[b];
      const mid = start.clone().add(end).multiplyScalar(0.5);
      mid.multiplyScalar(1.15); // bow the midpoint outward for an arc
      const curve = new THREE.QuadraticBezierCurve3(start, mid, end);
      const points = curve.getPoints(24);
      const geometry = new THREE.BufferGeometry().setFromPoints(points);
      const material = new THREE.LineBasicMaterial({
        color: colorways.emerald.base,
        transparent: true,
        opacity: 0.35,
      });
      const line = new THREE.Line(geometry, material);
      networkGroup.add(line);
      return line;
    });

    // --- Scroll-driven progress -------------------------------------------------
    const progress = { value: 0 };
    let trigger: ScrollTrigger | undefined;
    if (journeyRef.current) {
      trigger = ScrollTrigger.create({
        trigger: journeyRef.current,
        start: "top top",
        end: "bottom bottom",
        scrub: 1,
        onUpdate: (self) => {
          progress.value = self.progress;
        },
      });
    }

    // --- Pointer parallax (desktop, non-reduced-motion only) -------------------
    const pointer = { x: 0, y: 0 };
    const onPointerMove = (e: PointerEvent) => {
      pointer.x = (e.clientX / window.innerWidth - 0.5) * 2;
      pointer.y = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    if (!reducedMotion) window.addEventListener("pointermove", onPointerMove);

    // --- Visibility gating (pause GPU work once the journey scrolls out) -------
    let isActive = true;
    const observer = new IntersectionObserver(
      ([entry]) => {
        isActive = entry.isIntersecting;
      },
      { threshold: 0 }
    );
    if (journeyRef.current) observer.observe(journeyRef.current);

    const currentColor = new THREE.Color();
    const currentBright = new THREE.Color();
    const clock = new THREE.Clock();
    let rafId = 0;

    const resolveColorway = (p: number): { base: THREE.Color; bright: THREE.Color } => {
      const segments = colorStops.length;
      const segIndex = Math.min(segments - 1, Math.floor(p * segments));
      const name = colorStops[segIndex] as ColorwayName;
      const c = colorways[name];
      return { base: new THREE.Color(c.base), bright: new THREE.Color(c.bright) };
    };

    function animate() {
      rafId = requestAnimationFrame(animate);
      if (!isActive) return;

      const delta = clock.getDelta();
      const p = progress.value;

      // Camera dolly: pull in through the network as the journey scrolls.
      const targetZ = THREE.MathUtils.lerp(30, 8, Math.min(p / 0.85, 1));
      camera.position.z += (targetZ - camera.position.z) * 0.06;

      const arcX = Math.sin(p * Math.PI * 1.4) * 2.2;
      const arcY = Math.cos(p * Math.PI * 1.1) * 1.1;
      const parallaxX = reducedMotion ? 0 : pointer.x * 0.6;
      const parallaxY = reducedMotion ? 0 : pointer.y * 0.4;
      camera.position.x += (arcX + parallaxX - camera.position.x) * 0.05;
      camera.position.y += (arcY + parallaxY - camera.position.y) * 0.05;
      camera.lookAt(0, 0, 0);

      if (!reducedMotion) {
        networkGroup.rotation.y += delta * 0.035;
      }

      // Fog breathes slightly as depth reveals, then thickens again near the end.
      const fogPulse = 0.06 - Math.sin(Math.min(p, 1) * Math.PI) * 0.025;
      (scene.fog as THREE.FogExp2).density = fogPulse;

      const { base, bright } = resolveColorway(p);
      currentColor.lerp(base, 0.05);
      currentBright.lerp(bright, 0.05);
      nodeMaterial.color.copy(currentBright);
      edgeLines.forEach((line) => (line.material as THREE.LineBasicMaterial).color.copy(currentColor));
      sprites.forEach((sprite) => (sprite.material as THREE.SpriteMaterial).color.copy(currentBright));

      renderer.render(scene, camera);
    }
    animate();

    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("pointermove", onPointerMove);
      observer.disconnect();
      trigger?.kill();
      nodeGeometry.dispose();
      nodeMaterial.dispose();
      glowTexture.dispose();
      edgeLines.forEach((line) => {
        line.geometry.dispose();
        (line.material as THREE.Material).dispose();
      });
      sprites.forEach((sprite) => (sprite.material as THREE.Material).dispose());
      renderer.dispose();
      container.removeChild(renderer.domElement);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reducedMotion]);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0"
    />
  );
}
