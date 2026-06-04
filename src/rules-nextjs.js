/**
 * Next.js-specific error rules
 * Covers common Next.js, Vercel, and SSR-related errors
 */

export const nextjsRules = [
  {
    id: "nextjs.module-not-found-client",
    language: "javascript",
    confidence: 0.93,
    pattern: /Module not found.*Can't resolve.*\/(app|pages)\//i,
    title: "Next.js cannot find a page or component module",
    summary:
      "Next.js tried to import a file from your pages or app directory, but the file does not exist or the path is incorrect.",
    why: [
      "The file may have been deleted or renamed.",
      "The import path may have a typo or incorrect casing.",
      "The file may be in the wrong directory for the router you're using (app vs pages)."
    ],
    tryThis: [
      "Check that the file exists at the expected path.",
      "Verify the import path matches the file location exactly (case-sensitive).",
      "Ensure you're using the correct router directory (app/ for App Router, pages/ for Pages Router).",
      "Restart the dev server to clear any stale module cache."
    ],
    checks: [
      "Does the file exist with the exact same casing?",
      "Are you mixing App Router and Pages Router conventions?"
    ],
    commands: ["npm run dev"],
    example: "Module not found: Can't resolve './app/components/Header'"
  },
  {
    id: "nextjs.client-component-in-server",
    language: "javascript",
    confidence: 0.94,
    pattern: /"use client".*cannot be imported.*server component/is,
    title: "Client component imported into Server Component",
    summary:
      "A component marked with 'use client' is being imported directly into a Server Component, which is not allowed in Next.js App Router.",
    why: [
      "Next.js Server Components cannot import Client Components as children by default.",
      "You may need to pass the Client Component as a prop instead of importing it.",
      "The parent component may need to become a Client Component."
    ],
    tryThis: [
      "Add 'use client' to the parent component if it needs client features.",
      "Pass the Client Component as children or props to the Server Component.",
      "Move the import to a different part of the component tree.",
      "Restructure so Server Components wrap Client Components, not import them directly."
    ],
    checks: [
      "Does the parent component need useState, useEffect, or browser APIs?",
      "Can you pass the client component as a prop or children?"
    ],
    commands: [],
    example: "Error: 'use client' component cannot be imported into a Server Component."
  },
  {
    id: "nextjs.async-client-component",
    language: "javascript",
    confidence: 0.92,
    pattern: /Client Components cannot be async/i,
    title: "Client Component declared as async",
    summary:
      "A component marked with 'use client' is declared as an async function, which is not supported.",
    why: [
      "Client Components run in the browser and cannot be async functions.",
      "Only Server Components can be async.",
      "You may have added 'use client' to a Server Component by mistake."
    ],
    tryThis: [
      "Remove the async keyword from the Client Component function.",
      "Move async data fetching to a Server Component higher in the tree.",
      "Use useEffect with fetch for client-side data loading instead.",
      "Remove 'use client' if the component only needs server-side rendering."
    ],
    checks: [
      "Does this component need to be a Client Component?",
      "Can you fetch data in a parent Server Component instead?"
    ],
    commands: [],
    example: "Error: Client Components cannot be async functions."
  },
  {
    id: "nextjs.dynamic-server-usage",
    language: "javascript",
    confidence: 0.90,
    pattern:
      /Dynamic server usage.*This route prefers to use Static Rendering|route.*is prerendering.*dynamic/is,
    title: "Dynamic API used in statically rendered page",
    summary:
      "Your page is trying to use dynamic Next.js APIs (cookies, headers, searchParams) but is configured for static rendering.",
    why: [
      "You're using cookies(), headers(), or searchParams in a route configured for static export.",
      "The page is trying to access dynamic data during build time.",
      "Force-dynamic or revalidation settings may be missing."
    ],
    tryThis: [
      "Add `export const dynamic = 'force-dynamic'` to the page.",
      "Add `export const revalidate = 0` to disable static optimization.",
      "Move dynamic logic to a Client Component with useSearchParams.",
      "Check if you actually need static export for this route."
    ],
    checks: [
      "Are you using cookies(), headers(), or searchParams in a page?",
      "Is the route configured for static or dynamic rendering?"
    ],
    commands: [],
    example:
      "Error: Dynamic server usage: This route prefers to use Static Rendering but used `cookies`."
  },
  {
    id: "nextjs.missing-image-config",
    language: "javascript",
    confidence: 0.91,
    pattern: /Invalid src prop.*on `next\/image`.*hostname.*is not configured/i,
    title: "External image hostname not configured",
    summary:
      "You're using next/image with an external URL, but that domain is not allowed in next.config.js.",
    why: [
      "Next.js requires explicit configuration of external image domains for security.",
      "The domain may not be in the images.remotePatterns or images.domains config."
    ],
    tryThis: [
      "Add the domain to next.config.js under images.remotePatterns.",
      "Restart the dev server after changing next.config.js.",
      "Use the loader prop if you need custom image optimization."
    ],
    checks: ["Is the domain listed in next.config.js?", "Did you restart the server after config changes?"],
    commands: ["npm run dev"],
    example:
      "Error: Invalid src prop (https://example.com/image.jpg) on `next/image`, hostname 'example.com' is not configured under images in your `next.config.js`"
  },
  {
    id: "nextjs.metadata-export",
    language: "javascript",
    confidence: 0.89,
    pattern: /You are attempting to export "metadata".*not a Server Component/i,
    title: "metadata export in Client Component",
    summary:
      "You're trying to export metadata from a Client Component, but metadata can only be exported from Server Components.",
    why: [
      "The file has 'use client' but also exports metadata.",
      "Metadata is a Server Component-only feature in Next.js App Router."
    ],
    tryThis: [
      "Remove 'use client' if the component doesn't need client features.",
      "Move the metadata export to a parent Server Component layout.",
      "Use the Metadata API only in Server Components.",
      "For client components, use next/head in a parent server component."
    ],
    checks: [
      "Does this file have 'use client' at the top?",
      "Can you move the metadata to a layout.js file?"
    ],
    commands: [],
    example: "Error: You are attempting to export 'metadata' from a file that is not a Server Component."
  }
];
