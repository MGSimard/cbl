import { useState } from "react";

interface NavGroupProps {
  label: string;
  count: number;
  children?: React.ReactNode;
}
export function NavGroup({ label, count, children }: NavGroupProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="nav-group">
      <button
        type="button"
        aria-expanded={children ? isOpen : undefined}
        aria-controls={children ? `nav-${label}` : undefined}
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
