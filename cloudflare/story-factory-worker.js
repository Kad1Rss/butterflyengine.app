/**
 * Cloudflare Worker — serve the Story Factory site under
 * https://butterflyengine.app/story-factory/ while the apex domain keeps
 * serving the existing Butterfly Engine site.
 *
 * Route: butterflyengine.app/story-factory/*
 *
 * Upstream: GitHub Pages project site
 * https://kad1rss.github.io/butterflyengine.app/
 */

const UPSTREAM = "https://kad1rss.github.io/butterflyengine.app";
const PREFIX = "/story-factory";

export default {
  async fetch(request) {
    const url = new URL(request.url);

    if (url.pathname === PREFIX) {
      return Response.redirect(`${url.origin}${PREFIX}/`, 301);
    }
    if (!url.pathname.startsWith(`${PREFIX}/`)) {
      return fetch(request);
    }

    const upstreamPath = url.pathname.slice(PREFIX.length) || "/";
    const target = new URL(UPSTREAM + upstreamPath);
    target.search = url.search;

    const headers = new Headers(request.headers);
    headers.delete("host");
    headers.set("x-forwarded-host", url.host);

    let upstream = await fetch(target.toString(), {
      method: request.method,
      headers,
      redirect: "manual",
    });

    // GitHub Pages serves its own 404 page. Use ours for missing assets too.
    if (upstream.status === 404) {
      const notFound = await fetch(`${UPSTREAM}/404.html`);
      upstream = new Response(notFound.body, {
        status: 404,
        headers: notFound.headers,
      });
    }

    const responseHeaders = new Headers(upstream.headers);
    responseHeaders.set("x-served-by", "butterfly-story-factory-worker");
    return new Response(upstream.body, {
      status: upstream.status,
      statusText: upstream.statusText,
      headers: responseHeaders,
    });
  },
};
