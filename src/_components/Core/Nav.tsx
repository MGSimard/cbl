import { authClient } from "@/server/auth/auth-client";
import { NavGroup } from "./NavGroup";

export function Nav() {
  return (
    <nav id="nav">
      <div id="nav-left">
        <img id="nav-logo" alt="CBL Logo" />
        <span>test</span>
      </div>
      <div id="nav-right">
        <div id="nav-header">
          <div id="nav-avatar">
            <img alt="Icon" />
            <span id="nav-level">
              <span>0</span>
            </span>
          </div>
          <div id="nav-identity">
            <span id="nav-email">-</span>
            <span id="nav-rank">-</span>
          </div>
        </div>
        <NavGroup label="Aliases" count={1}>
          <ul>
            <li>Alias 1</li>
          </ul>
        </NavGroup>
        <NavGroup label="Reports" count={2}>
          <ul>
            <li>Report 1</li>
            <li>Report 2</li>
          </ul>
        </NavGroup>
        <NavGroup label="Recent Players" count={3}>
          <ul>
            <li>Recent Player 1</li>
            <li>Recent Player 2</li>
            <li>Recent Player 3</li>
          </ul>
        </NavGroup>
        <NavGroup label="Disabled Test" count={0}></NavGroup>
      </div>
    </nav>
  );
}
