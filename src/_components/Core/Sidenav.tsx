import { SidenavGroup } from "./SidenavGroup";

export function Sidenav() {
  return (
    <nav id="sidenav">
      <div id="sidenav-header">
        <div id="sidenav-avatar">
          <img alt="Icon" />
          <span id="sidenav-level">
            <span>123</span>
          </span>
        </div>
        <div id="sidenav-identity">
          <span id="sidenav-username">UserName</span>
          <span>User Type</span>
        </div>
      </div>
      <SidenavGroup label="Aliases" count={1}>
        <ul>
          <li>Alias 1</li>
        </ul>
      </SidenavGroup>
      <SidenavGroup label="Reports" count={2}>
        <ul>
          <li>Report 1</li>
          <li>Report 2</li>
        </ul>
      </SidenavGroup>
      <SidenavGroup label="Recent Players" count={3}>
        <ul>
          <li>Recent Player 1</li>
          <li>Recent Player 2</li>
          <li>Recent Player 3</li>
        </ul>
      </SidenavGroup>
      <SidenavGroup label="Disabled Test" count={0}></SidenavGroup>
    </nav>
  );
}
