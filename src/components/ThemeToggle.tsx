// Opted against having light mode
// "use client";
// import { useEffect, useState } from "react";
// import { useTheme } from "next-themes";

// export function ThemeToggle() {
//   const [mounted, setMounted] = useState(false);
//   const { resolvedTheme, setTheme } = useTheme();

//   const toggleTheme = () => {
//     setTheme(resolvedTheme === "light" ? "dark" : "light");
//   };

//   useEffect(() => setMounted(true), []);

//   return (
//     <input
//       type="checkbox"
//       id="theme-toggle"
//       aria-label="Toggle theme"
//       title="Toggle theme"
//       checked={resolvedTheme === "light"}
//       onChange={toggleTheme}
//     />
//   );
// }
