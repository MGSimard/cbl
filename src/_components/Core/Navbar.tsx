export function Navbar() {
  return (
    <nav id="navbar">
      <div id="nav-header">
        <div id="nav-avatar">
          <img alt="Icon" />
          <span id="sum-level">
            <span>123</span>
          </span>
        </div>
        <div id="sum-identity">
          <span>UserName</span>
          <span>User Type</span>
        </div>
      </div>

      <SumAccordion label="Aliases" count={1}>
        <ul>
          <li>Alias 1</li>
        </ul>
      </SumAccordion>
      <SumAccordion label="Reports" count={2}>
        <ul>
          <li>Report 1</li>
          <li>Report 2</li>
        </ul>
      </SumAccordion>
      <SumAccordion label="Recent Players" count={3}>
        <ul>
          <li>Recent Player 1</li>
          <li>Recent Player 2</li>
          <li>Recent Player 3</li>
        </ul>
      </SumAccordion>
      <SumAccordion label="Disabled Test" count={0}></SumAccordion>
    </nav>
  );
}
