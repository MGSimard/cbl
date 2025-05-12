import { NavTrigger } from "@/_components/Nav/NavTrigger";
import { NavRight } from "@/_components/Nav/NavRight";
import { NavStateContextProvider } from "@/_components/Nav/NavContextProvider";

export function Nav() {
  return (
    <NavStateContextProvider>
      <nav id="nav">
        <div id="nav-left">
          <img id="nav-logo" alt="CBL Logo" />
          <NavTrigger />
        </div>
        <NavRight />
      </nav>
    </NavStateContextProvider>
  );
}
