import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { FloatingContactButtons } from "./FloatingContactButtons";
import { useLocation } from "react-router-dom";

export function Layout({ children }: { children: React.ReactNode }) {
  const { pathname } = useLocation();
  const isAdmin = pathname.startsWith("/admin");

  return (
    <div className="flex min-h-screen flex-col">
      {!isAdmin ? <Navbar /> : null}
      <main className="flex-1">{children}</main>
      {!isAdmin ? <Footer /> : null}
      {!isAdmin ? <FloatingContactButtons /> : null}
    </div>
  );
}
