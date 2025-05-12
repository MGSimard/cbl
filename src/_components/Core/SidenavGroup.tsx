import { useState } from "react";

interface SidenavGroupProps {
  label: string;
  count: number;
  children?: React.ReactNode;
}
export function SidenavGroup({ label, count, children }: SidenavGroupProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="sidenav-group">
      <button
        type="button"
        aria-expanded={children ? isOpen : undefined}
        aria-controls={children ? `sidenav-${label}` : undefined}
        onClick={() => setIsOpen(!isOpen)}
        disabled={!children}>
        <span>&#9658;</span>
        {label}
        {` (${count})`}
      </button>
      {children && (
        <div id={`sidenav-${label}`} inert={!isOpen}>
          {children}
        </div>
      )}
    </div>
  );
}
