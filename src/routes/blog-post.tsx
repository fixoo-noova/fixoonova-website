import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, CalendarDays } from "lucide-react";
import { fetchPublishedPost, type BlogPost } from "@/lib/blogApi";
import { absoluteUrl, SITE_NAME, SITE_URL } from "@/lib/seo";
import { injectJsonLd } from "@/lib/structuredData";

function formatDate(value: string | null) {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  return date.toLocaleDateString("en-AE", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default function BlogPostPage() {
  const { slug = "" } = useParams();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    document.getElementById("fixoo-nova-home-schema")?.remove();
    if (!slug) return;
    let cancelled = false;
    setLoading(true);
    setError(null);

    fetchPublishedPost(slug)
      .then((data) => {
        if (cancelled) return;
        setPost(data.post);
      })
      .catch((err: Error) => {
        if (cancelled) return;
        setPost(null);
        setError(err.message || "Post not found");
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [slug]);

  useEffect(() => {
    if (!post) return;

    const title = post.metaTitle || `${post.title} | ${SITE_NAME}`;
    const description =
      post.metaDescription || post.excerpt || `Read ${post.title} on the Fixoo Nova blog.`;
    const url = absoluteUrl(`/blog/${post.slug}`);

    document.title = title;

    const setMeta = (name: string, content: string, attr: "name" | "property" = "name") => {
      let el = document.querySelector(`meta[${attr}="${name}"]`);
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute(attr, name);
        document.head.appendChild(el);
      }
      el.setAttribute("content", content);
    };

    setMeta("description", description);
    setMeta("og:title", title, "property");
    setMeta("og:description", description, "property");
    setMeta("og:type", "article", "property");
    setMeta("og:url", url, "property");
    setMeta("og:site_name", SITE_NAME, "property");
    if (post.coverImage) {
      setMeta("og:image", post.coverImage, "property");
      setMeta("twitter:image", post.coverImage);
    }
    setMeta("twitter:card", "summary_large_image");
    setMeta("twitter:title", title);
    setMeta("twitter:description", description);

    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }
    canonical.setAttribute("href", url);

    return injectJsonLd("fixoo-nova-blog-post-schema", {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      headline: post.title,
      description,
      image: post.coverImage || undefined,
      datePublished: post.publishedAt || post.createdAt,
      dateModified: post.updatedAt,
      author: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
      publisher: {
        "@type": "Organization",
        name: SITE_NAME,
        logo: { "@type": "ImageObject", url: `${SITE_URL}/favicon.png` },
      },
      mainEntityOfPage: url,
    });
  }, [post]);

  if (loading) {
    return (
      <section className="px-6 lg:px-10 pt-24 pb-24 max-w-3xl mx-auto">
        <p className="text-muted-foreground">Loading article…</p>
      </section>
    );
  }

  if (error || !post) {
    return (
      <section className="px-6 lg:px-10 pt-24 pb-24 max-w-3xl mx-auto">
        <h1 className="font-display text-4xl mb-4">Article not found</h1>
        <p className="text-muted-foreground mb-6">{error || "This post does not exist."}</p>
        <Link to="/blog" className="btn-outline inline-flex items-center gap-2">
          <ArrowLeft className="h-4 w-4" /> Back to blog
        </Link>
      </section>
    );
  }

  return (
    <article className="px-6 lg:px-10 pt-24 pb-24 max-w-3xl mx-auto">
      <Link
        to="/blog"
        className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
      >
        <ArrowLeft className="h-4 w-4" /> Back to blog
      </Link>

      <header className="mt-6 mb-10">
        {post.publishedAt ? (
          <p className="mb-4 flex items-center gap-2 text-xs uppercase tracking-widest text-muted-foreground">
            <CalendarDays className="h-3.5 w-3.5 text-primary" />
            {formatDate(post.publishedAt)}
          </p>
        ) : null}
        <h1 className="font-display text-4xl sm:text-5xl leading-tight">{post.title}</h1>
        {post.excerpt ? (
          <p className="mt-5 text-lg text-muted-foreground leading-relaxed">{post.excerpt}</p>
        ) : null}
      </header>

      {post.coverImage ? (
        <img
          src={post.coverImage}
          alt=""
          className="mb-10 w-full rounded-2xl object-cover"
          width={1200}
          height={630}
        />
      ) : null}

      <div
        className="blog-content space-y-4 text-base leading-relaxed text-foreground/90 [&_h2]:font-display [&_h2]:text-3xl [&_h2]:mt-10 [&_h2]:mb-3 [&_h3]:font-display [&_h3]:text-2xl [&_h3]:mt-8 [&_h3]:mb-2 [&_a]:text-primary [&_a]:underline [&_ul]:list-disc [&_ul]:pl-6 [&_ol]:list-decimal [&_ol]:pl-6 [&_img]:rounded-xl [&_img]:my-6"
        dangerouslySetInnerHTML={{ __html: post.content || "" }}
      />

      <aside className="mt-14 rounded-2xl border border-border bg-card p-6">
        <h2 className="font-display text-2xl mb-3">Related services</h2>
        <p className="text-sm text-muted-foreground mb-4">
          Need help with a property in Dubai? Explore our maintenance services or request a visit.
        </p>
        <div className="flex flex-wrap gap-3">
          <Link to="/services" className="btn-outline">
            Services
          </Link>
          <Link to="/maintenance-plan" className="btn-outline">
            Maintenance Plan
          </Link>
          <Link to="/contact" className="btn-primary">
            Contact
          </Link>
        </div>
      </aside>
    </article>
  );
}
