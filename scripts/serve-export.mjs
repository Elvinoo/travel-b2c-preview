// Local QA for the GitHub Pages export, including its repository subpath.
import http from "node:http";
import fs from "node:fs/promises";
import path from "node:path";
const root = path.resolve("out");
const prefix = process.env.NEXT_PUBLIC_BASE_PATH || "/travel-b2c-preview";
const types = {
  ".html": "text/html",
  ".js": "text/javascript",
  ".css": "text/css",
  ".svg": "image/svg+xml",
  ".webp": "image/webp",
  ".json": "application/json",
  ".txt": "text/plain",
};
http
  .createServer(async (request, response) => {
    try {
      const url = new URL(request.url, "http://127.0.0.1");
      if (url.pathname !== prefix && !url.pathname.startsWith(prefix + "/")) {
        response.writeHead(404).end();
        return;
      }
      const relative = decodeURIComponent(url.pathname.slice(prefix.length));
      let file = path.resolve(root, "." + relative);
      if (file !== root && !file.startsWith(root + path.sep)) {
        response.writeHead(404).end();
        return;
      }
      const stat = await fs.stat(file);
      if (stat.isDirectory()) {
        if (!url.pathname.endsWith("/")) {
          response
            .writeHead(308, { Location: url.pathname + "/" + url.search })
            .end();
          return;
        }
        file = path.join(file, "index.html");
      }
      response.writeHead(200, {
        "Content-Type": types[path.extname(file)] || "application/octet-stream",
      });
      response.end(await fs.readFile(file));
    } catch {
      response.writeHead(404).end();
    }
  })
  .listen(3002, "127.0.0.1", () =>
    console.log(`Static preview: http://127.0.0.1:3002${prefix}/`),
  );
