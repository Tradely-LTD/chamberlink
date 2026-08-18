"use client";

import { useState } from "react";
import { ArrowLeft, LockKeyhole, SearchCheck } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import VerifyForm from "./VerifyForm";

/**
 * The "Verify another certificate" trigger on the verify-result page — was a
 * plain <Link href="/verify"> full-page navigation, now opens the same search
 * inline as a modal instead. Renders its own container div and captures it
 * via a callback ref into state (reading a useRef's .current during render is
 * a React rules-of-hooks violation — this app's eslint config actually
 * catches it), then passes that element to DialogContent so the portaled
 * dialog stays inside .naccima-shell (this component always renders
 * somewhere inside it) and picks up the same .verify-dialog / .dialog-icon /
 * .verify-field styling the rest of the site already uses correctly — no
 * re-derived one-off design, no portal-escapes-scope bug (see DialogContent's
 * `container` prop).
 */
export default function VerifyAnotherCertificate() {
  const [open, setOpen] = useState(false);
  const [containerEl, setContainerEl] = useState<HTMLDivElement | null>(null);

  return (
    <div ref={setContainerEl}>
      <button type="button" onClick={() => setOpen(true)} className="text-link" style={{ background: "none", border: 0, cursor: "pointer", font: "inherit" }}>
        <ArrowLeft size={16} /> Verify another certificate
      </button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent container={containerEl} className="verify-dialog">
          <DialogHeader>
            <div className="dialog-icon"><SearchCheck size={22} /></div>
            <DialogTitle>Verify another certificate</DialogTitle>
            <DialogDescription>Enter a certificate number or verification code to check an issued certificate.</DialogDescription>
          </DialogHeader>
          <VerifyForm />
          <p className="dialog-note"><LockKeyhole size={13} /> Public verification only displays approved certificate fields.</p>
        </DialogContent>
      </Dialog>
    </div>
  );
}
