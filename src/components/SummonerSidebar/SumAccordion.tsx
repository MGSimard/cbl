"use client";
import { useState } from "react";

interface SumAccordionProps {
  label: string;
  children?: React.ReactNode;
  count?: number;
}

export function SumAccordion({ label, children, count }: SumAccordionProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="sum-accordion">
      <button
        type="button"
        aria-expanded={children ? isOpen : undefined}
        aria-controls={children ? `ss-${label}` : undefined}
        onClick={() => setIsOpen(!isOpen)}
        disabled={!children}>
        {label}
        {count && ` (${count})`}
      </button>
      {children && (
        <div id={`ss-${label}`} inert={!isOpen}>
          {children}
        </div>
      )}
    </div>
  );
}
