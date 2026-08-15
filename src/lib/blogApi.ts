export type BlogPost = {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  content?: string;
  coverImage: string | null;
  metaTitle: string | null;
  metaDescription: string | null;
  status: "draft" | "published";
  publishedAt: string | null;
  createdAt: string;
  updatedAt: string;
};

export type BlogPagination = {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
};

const API_BASE = (import.meta.env.VITE_BLOG_API_URL as string | undefined)?.replace(/\/$/, "") || "/api";
const TOKEN_KEY = "fixoo_nova_blog_admin_token";

export function getAdminToken(): string | null {
  try {
    return window.localStorage.getItem(TOKEN_KEY);
  } catch {
    return null;
  }
}

export function setAdminToken(token: string | null) {
  try {
    if (!token) {
      window.localStorage.removeItem(TOKEN_KEY);
      return;
    }
    window.localStorage.setItem(TOKEN_KEY, token);
  } catch {
    // ignore
  }
}

async function request<T>(path: string, init: RequestInit = {}, auth = false): Promise<T> {
  const headers = new Headers(init.headers);
  if (!(init.body instanceof FormData) && !headers.has("Content-Type") && init.body) {
    headers.set("Content-Type", "application/json");
  }
  if (auth) {
    const token = getAdminToken();
    if (token) headers.set("Authorization", `Bearer ${token}`);
  }

  const res = await fetch(`${API_BASE}${path}`, { ...init, headers });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error((data as { error?: string }).error || `Request failed (${res.status})`);
  }
  return data as T;
}

export function fetchPublishedPosts(page = 1, limit = 12) {
  return request<{ posts: BlogPost[]; pagination: BlogPagination }>(
    `/posts.php?page=${page}&limit=${limit}`,
  );
}

export function fetchPublishedPost(slug: string) {
  return request<{ post: BlogPost }>(`/posts.php?slug=${encodeURIComponent(slug)}`);
}

export function adminLogin(username: string, password: string) {
  return request<{ token: string; expiresInHours: number }>("/admin/login.php", {
    method: "POST",
    body: JSON.stringify({ username, password }),
  });
}

export function adminListPosts() {
  return request<{ posts: BlogPost[] }>("/admin/posts.php", {}, true);
}

export function adminGetPost(id: number) {
  return request<{ post: BlogPost }>(`/admin/posts.php?id=${id}`, {}, true);
}

export type BlogPostInput = {
  title: string;
  slug?: string;
  excerpt?: string;
  content: string;
  coverImage?: string | null;
  metaTitle?: string | null;
  metaDescription?: string | null;
  status: "draft" | "published";
};

export function adminCreatePost(input: BlogPostInput) {
  return request<{ post: BlogPost }>(
    "/admin/posts.php",
    { method: "POST", body: JSON.stringify(input) },
    true,
  );
}

export function adminUpdatePost(id: number, input: BlogPostInput) {
  return request<{ post: BlogPost }>(
    `/admin/posts.php?id=${id}`,
    {
      method: "POST",
      headers: { "X-HTTP-Method-Override": "PUT" },
      body: JSON.stringify(input),
    },
    true,
  );
}

export function adminDeletePost(id: number) {
  return request<{ ok: boolean }>(
    `/admin/posts.php?id=${id}`,
    {
      method: "POST",
      headers: { "X-HTTP-Method-Override": "DELETE" },
    },
    true,
  );
}

export async function adminUploadImage(file: File) {
  const body = new FormData();
  body.append("file", file);
  return request<{ url: string; path: string }>(
    "/admin/upload.php",
    { method: "POST", body },
    true,
  );
}
