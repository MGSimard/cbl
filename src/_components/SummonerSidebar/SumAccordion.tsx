import { useState } from "react";

interface SumAccordionProps {
  label: string;
  count: number;
  children?: React.ReactNode;
}
export function SumAccordion({ label, count, children }: SumAccordionProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="sum-accordion">
      <button
        type="button"
        aria-expanded={children ? isOpen : undefined}
        aria-controls={children ? `ss-${label}` : undefined}
        onClick={() => setIsOpen(!isOpen)}
        disabled={!children}>
        <span>&#9658;</span>
        {label}
        {` (${count})`}
      </button>
      {children && (
        <div id={`ss-${label}`} inert={!isOpen}>
          {children}
        </div>
      )}
    </div>
  );
}
