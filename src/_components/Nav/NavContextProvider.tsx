import { createContext, useContext, useState } from "react";

interface NavStateContext {
  isExpanded: boolean;
  toggleExpanded: () => void;
}

const NavStateContext = createContext<NavStateContext | undefined>(undefined);

export function NavStateContextProvider({ children }: { children: React.ReactNode }) {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const toggleExpanded = () => setIsExpanded((prev) => !prev);

  return <NavStateContext.Provider value={{ isExpanded, toggleExpanded }}>{children}</NavStateContext.Provider>;
}

export function useNavState() {
  const context = useContext(NavStateContext);
  if (!context) {
    throw new Error("useNavState must be used within a NavStateContextProvider");
  }
  return context;
}
