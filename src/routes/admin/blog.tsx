import { FormEvent, useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  adminCreatePost,
  adminDeletePost,
  adminGetPost,
  adminListPosts,
  adminLogin,
  adminUpdatePost,
  adminUploadImage,
  getAdminToken,
  setAdminToken,
  type BlogPost,
  type BlogPostInput,
} from "@/lib/blogApi";

const emptyForm: BlogPostInput = {
  title: "",
  slug: "",
  excerpt: "",
  content: "",
  coverImage: null,
  metaTitle: "",
  metaDescription: "",
  status: "draft",
};

export default function AdminBlogPage() {
  const [token, setToken] = useState<string | null>(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [form, setForm] = useState<BlogPostInput>(emptyForm);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const isAuthed = Boolean(token);

  useEffect(() => {
    setToken(getAdminToken());
  }, []);

  const loadPosts = async () => {
    const data = await adminListPosts();
    setPosts(data.posts);
  };

  useEffect(() => {
    if (!token) return;
    loadPosts().catch((err: Error) => setError(err.message));
  }, [token]);

  const sortedPosts = useMemo(
    () => [...posts].sort((a, b) => b.updatedAt.localeCompare(a.updatedAt)),
    [posts],
  );

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const data = await adminLogin(username, password);
      setAdminToken(data.token);
      setToken(data.token);
      setPassword("");
      setMessage("Signed in");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    setAdminToken(null);
    setToken(null);
    setPosts([]);
    setEditingId(null);
    setForm(emptyForm);
  };

  const startEdit = async (id: number) => {
    setError(null);
    setLoading(true);
    try {
      const data = await adminGetPost(id);
      const post = data.post;
      setEditingId(post.id);
      setForm({
        title: post.title,
        slug: post.slug,
        excerpt: post.excerpt,
        content: post.content || "",
        coverImage: post.coverImage,
        metaTitle: post.metaTitle || "",
        metaDescription: post.metaDescription || "",
        status: post.status,
      });
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not load post");
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setEditingId(null);
    setForm(emptyForm);
  };

  const handleSave = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setMessage(null);
    setLoading(true);
    try {
      const payload: BlogPostInput = {
        ...form,
        metaTitle: form.metaTitle || null,
        metaDescription: form.metaDescription || null,
        coverImage: form.coverImage || null,
      };
      if (editingId) {
        await adminUpdatePost(editingId, payload);
        setMessage("Post updated");
      } else {
        await adminCreatePost(payload);
        setMessage("Post created");
      }
      resetForm();
      await loadPosts();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Save failed");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm("Delete this post permanently?")) return;
    setError(null);
    setLoading(true);
    try {
      await adminDeletePost(id);
      if (editingId === id) resetForm();
      setMessage("Post deleted");
      await loadPosts();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Delete failed");
    } finally {
      setLoading(false);
    }
  };

  const handleUpload = async (file: File | null) => {
    if (!file) return;
    setError(null);
    setLoading(true);
    try {
      const data = await adminUploadImage(file);
      setForm((prev) => ({ ...prev, coverImage: data.url }));
      setMessage("Cover image uploaded");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setLoading(false);
    }
  };

  if (!isAuthed) {
    return (
      <section className="px-6 lg:px-10 pt-24 pb-24 max-w-md mx-auto">
        <h1 className="font-display text-4xl mb-2">Blog admin</h1>
        <p className="text-sm text-muted-foreground mb-8">
          Sign in to manage posts stored on your Hostinger MySQL database.
        </p>
        <form onSubmit={handleLogin} className="premium-card space-y-4 p-6">
          <div>
            <label htmlFor="admin-username" className="text-xs uppercase tracking-widest text-muted-foreground">
              Username
            </label>
            <input
              id="admin-username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="mt-2 w-full rounded-lg border border-input bg-background px-4 py-3 text-sm"
            />
          </div>
          <div>
            <label htmlFor="admin-password" className="text-xs uppercase tracking-widest text-muted-foreground">
              Password
            </label>
            <input
              id="admin-password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-2 w-full rounded-lg border border-input bg-background px-4 py-3 text-sm"
            />
          </div>
          {error ? <p className="text-sm text-destructive">{error}</p> : null}
          <button type="submit" disabled={loading} className="btn-primary w-full justify-center disabled:opacity-70">
            {loading ? "Signing in…" : "Sign in"}
          </button>
        </form>
      </section>
    );
  }

  return (
    <section className="px-6 lg:px-10 pt-24 pb-24 max-w-6xl mx-auto">
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-4xl">Blog admin</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Create and publish posts. Images upload to Hostinger <code>/uploads</code>.
          </p>
        </div>
        <div className="flex gap-3">
          <Link to="/blog" className="btn-outline">
            View blog
          </Link>
          <button type="button" onClick={handleLogout} className="btn-outline">
            Sign out
          </button>
        </div>
      </div>

      {message ? <p className="mb-4 text-sm text-primary">{message}</p> : null}
      {error ? <p className="mb-4 text-sm text-destructive">{error}</p> : null}

      <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr]">
        <form onSubmit={handleSave} className="premium-card space-y-4 p-6">
          <h2 className="font-display text-2xl">{editingId ? "Edit post" : "New post"}</h2>

          <Field id="title" label="Title" value={form.title} onChange={(v) => setForm((p) => ({ ...p, title: v }))} required />
          <Field id="slug" label="Slug (optional)" value={form.slug || ""} onChange={(v) => setForm((p) => ({ ...p, slug: v }))} />
          <Field id="excerpt" label="Excerpt" value={form.excerpt || ""} onChange={(v) => setForm((p) => ({ ...p, excerpt: v }))} />

          <div>
            <label htmlFor="content" className="text-xs uppercase tracking-widest text-muted-foreground">
              Content (HTML allowed)
            </label>
            <textarea
              id="content"
              required
              rows={12}
              value={form.content}
              onChange={(e) => setForm((p) => ({ ...p, content: e.target.value }))}
              className="mt-2 w-full rounded-lg border border-input bg-background px-4 py-3 text-sm font-mono"
              placeholder="<p>Write your article…</p>"
            />
          </div>

          <div>
            <label htmlFor="cover" className="text-xs uppercase tracking-widest text-muted-foreground">
              Cover image
            </label>
            <input
              id="cover"
              type="file"
              accept="image/jpeg,image/png,image/webp,image/gif"
              className="mt-2 block w-full text-sm"
              onChange={(e) => handleUpload(e.target.files?.[0] ?? null)}
            />
            {form.coverImage ? (
              <img src={form.coverImage} alt="" className="mt-3 h-36 w-full rounded-lg object-cover" />
            ) : null}
          </div>

          <Field
            id="metaTitle"
            label="Meta title (max 55–60)"
            value={form.metaTitle || ""}
            onChange={(v) => setForm((p) => ({ ...p, metaTitle: v }))}
          />
          <Field
            id="metaDescription"
            label="Meta description (max 155)"
            value={form.metaDescription || ""}
            onChange={(v) => setForm((p) => ({ ...p, metaDescription: v }))}
          />

          <div>
            <label htmlFor="status" className="text-xs uppercase tracking-widest text-muted-foreground">
              Status
            </label>
            <select
              id="status"
              value={form.status}
              onChange={(e) =>
                setForm((p) => ({ ...p, status: e.target.value === "published" ? "published" : "draft" }))
              }
              className="mt-2 w-full rounded-lg border border-input bg-background px-4 py-3 text-sm"
            >
              <option value="draft">Draft</option>
              <option value="published">Published</option>
            </select>
          </div>

          <div className="flex flex-wrap gap-3 pt-2">
            <button type="submit" disabled={loading} className="btn-primary disabled:opacity-70">
              {loading ? "Saving…" : editingId ? "Update post" : "Create post"}
            </button>
            {editingId ? (
              <button type="button" onClick={resetForm} className="btn-outline">
                Cancel edit
              </button>
            ) : null}
          </div>
        </form>

        <div className="space-y-3">
          <h2 className="font-display text-2xl">All posts</h2>
          {sortedPosts.length === 0 ? (
            <p className="text-sm text-muted-foreground">No posts yet.</p>
          ) : (
            sortedPosts.map((post) => (
              <div key={post.id} className="premium-card p-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-medium">{post.title}</p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      {post.status} · /blog/{post.slug}
                    </p>
                  </div>
                  <span
                    className={`rounded-full px-2 py-0.5 text-[10px] uppercase tracking-wider ${
                      post.status === "published"
                        ? "bg-primary/15 text-primary"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {post.status}
                  </span>
                </div>
                <div className="mt-3 flex flex-wrap gap-2">
                  <button type="button" className="btn-outline py-1.5 px-3 text-xs" onClick={() => startEdit(post.id)}>
                    Edit
                  </button>
                  {post.status === "published" ? (
                    <Link to={`/blog/${post.slug}`} className="btn-outline py-1.5 px-3 text-xs">
                      View
                    </Link>
                  ) : null}
                  <button
                    type="button"
                    className="btn-outline py-1.5 px-3 text-xs text-destructive"
                    onClick={() => handleDelete(post.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}

function Field({
  id,
  label,
  value,
  onChange,
  required,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
}) {
  return (
    <div>
      <label htmlFor={id} className="text-xs uppercase tracking-widest text-muted-foreground">
        {label}
      </label>
      <input
        id={id}
        value={value}
        required={required}
        onChange={(e) => onChange(e.target.value)}
        className="mt-2 w-full rounded-lg border border-input bg-background px-4 py-3 text-sm"
      />
    </div>
  );
}
