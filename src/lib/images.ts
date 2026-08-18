const UPLOAD_MARKER = "/image/upload/";

function cloudinaryAssetPath(url: string): { prefix: string; id: string } | null {
  if (!url.includes("res.cloudinary.com")) return null;
  const idx = url.indexOf(UPLOAD_MARKER);
  if (idx === -1) return null;
  const prefix = url.slice(0, idx + UPLOAD_MARKER.length);
  const after = url.slice(idx + UPLOAD_MARKER.length);
  const versioned = after.match(/v\d+\/.+$/);
  const id = versioned ? versioned[0] : after;
  if (!id) return null;
  return { prefix, id };
}

export function cloudinaryUrl(url: string, transform: string): string {
  const parsed = cloudinaryAssetPath(url);
  if (!parsed) return url;
  return `${parsed.prefix}${transform}/${parsed.id}`;
}

export function cloudinarySrcSet(url: string, widths: number[]) {
  const parsed = cloudinaryAssetPath(url);
  if (!parsed || widths.length === 0) return { src: url };
  const max = widths[widths.length - 1] ?? widths[0];
  return {
    src: cloudinaryUrl(url, `q_auto,f_auto,c_fill,w_${max}`),
    srcSet: widths
      .map((width) => `${cloudinaryUrl(url, `q_auto,f_auto,c_fill,w_${width}`)} ${width}w`)
      .join(", "),
  };
}

export function blogCoverAlt(title: string) {
  return `${title} cover image`;
}
