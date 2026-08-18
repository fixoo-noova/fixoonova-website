import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, CalendarDays } from "lucide-react";
import { fetchPublishedPosts, type BlogPost, type BlogPagination } from "@/lib/blogApi";

function formatDate(value: string | null) {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  return date.toLocaleDateString("en-AE", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [pagination, setPagination] = useState<BlogPagination | null>(null);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    document.getElementById("fixoo-nova-home-schema")?.remove();
    let cancelled = false;
    setLoading(true);
    setError(null);

    fetchPublishedPosts(page, 9)
      .then((data) => {
        if (cancelled) return;
        setPosts(data.posts);
        setPagination(data.pagination);
      })
      .catch((err: Error) => {
        if (cancelled) return;
        setError(err.message || "Could not load blog posts.");
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [page]);

  return (
    <>
      <section className="px-6 lg:px-10 pt-24 pb-12 max-w-7xl mx-auto">
        <span className="eyebrow">INSIGHTS</span>
        <h1 className="font-display text-5xl sm:text-6xl mt-4 mb-6 max-w-4xl leading-tight">
          Fixoo Nova <span className="text-gradient-gold">Blog</span>
        </h1>
        <p className="text-lg text-muted-foreground max-w-3xl">
          Practical guides on building maintenance, AC care, plumbing and property upkeep across
          Dubai and Dubai South.
        </p>
      </section>

      <section className="px-6 lg:px-10 pb-24 max-w-7xl mx-auto">
        {loading ? (
          <p className="text-muted-foreground">Loading posts…</p>
        ) : error ? (
          <div className="premium-card p-8">
            <p className="text-destructive">{error}</p>
            <p className="mt-2 text-sm text-muted-foreground">
              If this is a new setup, confirm the Hostinger API and MySQL database are configured.
            </p>
          </div>
        ) : posts.length === 0 ? (
          <div className="premium-card p-8">
            <p className="text-muted-foreground">No published posts yet. Check back soon.</p>
          </div>
        ) : (
          <>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {posts.map((post) => (
                <article key={post.id} className="premium-card premium-card-hover overflow-hidden flex flex-col">
                  {post.coverImage ? (
                    <Link to={`/blog/${post.slug}`} className="block overflow-hidden">
                      <img
                        src={post.coverImage}
                        alt=""
                        loading="lazy"
                        className="h-48 w-full object-cover"
                        width={640}
                        height={360}
                      />
                    </Link>
                  ) : null}
                  <div className="flex flex-1 flex-col p-6">
                    {post.publishedAt ? (
                      <p className="mb-3 flex items-center gap-2 text-xs uppercase tracking-widest text-muted-foreground">
                        <CalendarDays className="h-3.5 w-3.5 text-primary" />
                        {formatDate(post.publishedAt)}
                      </p>
                    ) : null}
                    <h2 className="font-display text-2xl leading-snug">
                      <Link to={`/blog/${post.slug}`} className="hover:text-primary transition-colors">
                        {post.title}
                      </Link>
                    </h2>
                    <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
                      {post.excerpt}
                    </p>
                    <Link
                      to={`/blog/${post.slug}`}
                      className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline"
                    >
                      Read more <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </article>
              ))}
            </div>

            {pagination && pagination.totalPages > 1 ? (
              <div className="mt-10 flex items-center justify-center gap-3">
                <button
                  type="button"
                  disabled={page <= 1}
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  className="btn-outline disabled:opacity-50"
                >
                  Previous
                </button>
                <span className="text-sm text-muted-foreground">
                  Page {pagination.page} of {pagination.totalPages}
                </span>
                <button
                  type="button"
                  disabled={page >= pagination.totalPages}
                  onClick={() => setPage((p) => p + 1)}
                  className="btn-outline disabled:opacity-50"
                >
                  Next
                </button>
              </div>
            ) : null}
          </>
        )}
      </section>
    </>
  );
}
