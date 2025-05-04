"use client";
import { useState } from "react";

export function SumAccordion({ label, children }: { label: string; children?: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="sum-accordion">
      <button type="button" aria-expanded={isOpen} aria-controls={`ss-${label}`} onClick={() => setIsOpen(!isOpen)}>
        {label}
      </button>
      {children && (
        <div id={`ss-${label}`} inert={!isOpen}>
          {children}
        </div>
      )}
    </div>
  );
}
