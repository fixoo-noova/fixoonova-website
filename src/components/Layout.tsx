import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { FloatingContactButtons } from "./FloatingContactButtons";

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
      <FloatingContactButtons />
    </div>
  );
}
