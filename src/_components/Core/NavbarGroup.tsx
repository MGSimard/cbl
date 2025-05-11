import { useState } from "react";

interface NavbarGroupProps {
  label: string;
  count: number;
  children?: React.ReactNode;
}
export function NavbarGroup({ label, count, children }: NavbarGroupProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="nav-accordion">
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
        <div id={`nav-${label}`} inert={!isOpen}>
          {children}
        </div>
      )}
    </div>
  );
}
