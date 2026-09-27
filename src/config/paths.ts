// Next Link handles basePath automatically; plain image/icon URLs need it explicitly.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
export function publicAsset(path: string) {
  return path.startsWith("/") && !path.startsWith("//")
    ? `${basePath}${path}`
    : path;
}
