import { Link } from "@tanstack/react-router";
import { authClient } from "@/server/auth/auth-client";
import { useNavState } from "@/_components/Nav/NavContextProvider";
import { NavTrigger } from "@/_components/Nav/NavTrigger";
import { NavGroup } from "@/_components/Nav/NavGroup";
import { useIsMobile } from "@/_hooks/useIsMobile";
import { SignIn } from "@/_components/Nav/SignIn";
import { SignOut } from "@/_components/Nav/SignOut";

export function Nav() {
  const { isExpanded } = useNavState();
  const isMobile = useIsMobile();
  const { data: session, isPending, error, refetch } = authClient.useSession();

  const handleFailingAvatar = (e: React.SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.onerror = null;
    e.currentTarget.src = "/assets/placeholder-warning.svg";
  };

  return (
    <nav id="nav" data-expanded={isExpanded}>
      <div id="nav-left">
        <Link to="/" id="nav-logo">
          <img src="/metadata/icon.svg" alt="CBL Logo" />
        </Link>
        {!isExpanded && <NavTrigger />}
      </div>
      <div id="nav-right" inert={!isExpanded && isMobile.mounted && isMobile.isMobile}>
        <div id="nav-header">
          <div id="nav-avatar">
            <img alt="Icon" src={session?.user?.image ?? "/assets/avatar-default.png"} onError={handleFailingAvatar} />
          </div>
          <div id="nav-identity">
            <span id="nav-email">{session?.user?.email ?? "Guest"}</span>
            <span id="nav-rank">{session?.user?.role ?? "-"}</span>
            {session?.user ? <SignOut /> : <SignIn />}
          </div>
          {isExpanded && <NavTrigger />}
        </div>
        <div id="nav-content">
          <NavGroup label="NavGroup 1" count={1}>
            <ul>
              <li>NavItem 1</li>
            </ul>
          </NavGroup>
          <NavGroup label="NavGroup 2" count={4}>
            <ul>
              <li>NavItem 1</li>
              <li>NavItem 2</li>
              <li>NavItem 3</li>
              <li>NavItem 4</li>
            </ul>
          </NavGroup>
          <NavGroup label="NavGroup 3" count={2}>
            <ul>
              <li>NavItem 1</li>
              <li>NavItem 2</li>
            </ul>
          </NavGroup>
          <NavGroup label="Disabled Test" count={0}></NavGroup>
        </div>
      </div>
    </nav>
  );
}
