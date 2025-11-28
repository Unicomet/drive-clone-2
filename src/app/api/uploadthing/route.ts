import { createRouteHandler } from "uploadthing/next";
import type { NextRequest } from "next/server";
import { ourFileRouter } from "./core";

// Create the base route handlers from uploadthing
const baseHandlers = createRouteHandler({
  router: ourFileRouter,
  config: {},
  // Apply an (optional) custom config:
  // config: { ... },
});

// Wrap handlers to log incoming request headers (useful for debugging auth / proxy issues)
export const GET = (req: NextRequest) => {
  console.log("[uploadthing] GET headers", Object.fromEntries(req.headers));
  return baseHandlers.GET(req);
};

export const POST = (req: NextRequest) => {
  console.log("[uploadthing] POST headers", Object.fromEntries(req.headers));
  return baseHandlers.POST(req);
};
