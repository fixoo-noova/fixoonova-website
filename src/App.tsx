import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Layout } from "@/components/Layout";
import { PageMeta } from "@/components/PageMeta";
import HomePage from "@/routes/index";
import AboutPage from "@/routes/about";
import ServicesPage from "@/routes/services";
import ContactPage from "@/routes/contact";
import MaintenancePlanPage from "@/routes/maintenance-plan";
import BlogPage from "@/routes/blog";
import BlogPostPage from "@/routes/blog-post";
import AdminBlogPage from "@/routes/admin/blog";
import DubaiSouthPage from "@/routes/building-maintenance-dubai-south";

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [pathname]);

  return null;
}

function NotFoundPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you are looking for does not exist or has been moved.
        </p>
        <div className="mt-6">
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <PageMeta />
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/maintenance-plan" element={<MaintenancePlanPage />} />
          <Route path="/building-maintenance-dubai-south" element={<DubaiSouthPage />} />
          <Route path="/building-maintenance-dubai-south/" element={<DubaiSouthPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog/:slug" element={<BlogPostPage />} />
          <Route path="/admin/blog" element={<AdminBlogPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}
