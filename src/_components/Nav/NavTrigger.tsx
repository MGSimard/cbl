import { useNavState } from "@/_components/Nav/NavContextProvider";
import { IconMenu } from "@/_components/Icons";

export function NavTrigger() {
  const { isExpanded, toggleExpanded } = useNavState();

  return (
    <button
      id="nav-trigger"
      aria-label="Toggle Sidebar"
      title="Toggle Sidebar"
      aria-expanded={isExpanded}
      aria-controls="nav-right"
      onClick={toggleExpanded}>
      <IconMenu />
    </button>
  );
}
