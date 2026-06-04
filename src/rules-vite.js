/**
 * Vite-specific error rules
 * Common build errors from Vite and its ecosystem
 */

export const viteRules = [
  {
    id: "vite.failed-resolve-import",
    language: "javascript",
    confidence: 0.94,
    pattern: /Failed to resolve import ['"](?<module>[^'"]+)['"] from ['"](?<file>[^'"]+)['"]/i,
    title: "Vite cannot resolve {module}",
    summary:
      "Vite tried to import {module} from {file}, but cannot find the module in node_modules or the file system.",
    why: [
      "The package may not be installed.",
      "The import path may need a file extension or correct alias.",
      "The module may be a Node.js built-in that needs to be polyfilled for the browser."
    ],
    tryThis: [
      "Install the package if it's a dependency.",
      "Add file extensions to relative imports (e.g., './file.js' instead of './file').",
      "Configure vite.config.js to resolve the alias or extension.",
      "For Node built-ins, add a polyfill or use a browser-compatible alternative."
    ],
    checks: [
      "Is the package listed in package.json?",
      "Are you importing a Node.js built-in like 'fs' or 'path'?",
      "Does the import have the correct file extension?"
    ],
    commands: ["npm install {module}", "npm install"],
    example: "Failed to resolve import 'lodash' from 'src/utils.js'"
  },
  {
    id: "vite.no-export",
    language: "javascript",
    confidence: 0.92,
    pattern:
      /The requested module ['"](?<module>[^'"]+)['"] does not provide an export named ['"](?<exportName>[^'"]+)['"]/i,
    title: "{module} does not export {exportName}",
    summary:
      "You're trying to import {exportName} from {module}, but that export does not exist in the module.",
    why: [
      "The export name may have changed in a newer version of the package.",
      "You may be using a named import for a default export, or vice versa.",
      "The module may not be exporting the name you expect."
    ],
    tryThis: [
      "Check the package documentation for the correct export name.",
      "Try importing the default export: `import Module from '{module}'`",
      "Use `import * as Module from '{module}'` to see all exports.",
      "Check if the package version matches the docs you're reading."
    ],
    checks: [
      "Did you recently upgrade the package?",
      "Are you mixing default and named imports incorrectly?",
      "Does the package's index file export this name?"
    ],
    commands: ["npm list {module}"],
    example: "The requested module 'react-router-dom' does not provide an export named 'useHistory'"
  },
  {
    id: "vite.port-in-use",
    language: "javascript",
    confidence: 0.93,
    pattern: /Port (?<port>\d{2,5}) is in use, trying another one/i,
    title: "Vite port {port} is in use",
    summary:
      "Vite tried to start the dev server on port {port}, but another process is already using it.",
    why: [
      "Another Vite or dev server is already running.",
      "A previous server process didn't shut down cleanly.",
      "Another application is using the same port."
    ],
    tryThis: [
      "Stop other dev servers running on the same port.",
      "Close the terminal and restart.",
      "Configure a different port in vite.config.js.",
      "Find and kill the process using the port."
    ],
    checks: [
      "Is another instance of this project already running?",
      "Did the server crash but leave a process behind?"
    ],
    commands: ["netstat -ano | findstr :{port}"],
    example: "Port 5173 is in use, trying another one..."
  },
  {
    id: "vite.cannot-import-outside-module",
    language: "javascript",
    confidence: 0.88,
    pattern: /Cannot use import statement outside a module/i,
    title: "Import statement in non-module context",
    summary:
      "Your code is using ES modules (import/export) in a context that doesn't support them.",
    why: [
      "A file in a Node.js script may be missing `type: 'module'` in package.json.",
      "A script tag may be missing `type='module'`.",
      "Vite config or other tool config may not be recognized as a module."
    ],
    tryThis: [
      "Add `\"type\": \"module\"` to package.json for Node scripts.",
      "Rename config files to .mjs (e.g., vite.config.mjs).",
      "Check that HTML script tags have type='module'.",
      "Ensure you're not mixing CommonJS and ES modules incorrectly."
    ],
    checks: [
      "Does package.json have `\"type\": \"module\"`?",
      "Is this a Node.js script or a browser file?",
      "Are you using .js or .mjs extensions correctly?"
    ],
    commands: [],
    example: "SyntaxError: Cannot use import statement outside a module"
  },
  {
    id: "vite.sourcemap-warning",
    language: "javascript",
    confidence: 0.85,
    pattern: /Sourcemap.*points to missing source files/i,
    title: "Missing source files for sourcemap",
    summary:
      "Vite is warning that sourcemap references point to files that don't exist, making debugging harder.",
    why: [
      "A dependency may have broken sourcemaps.",
      "Source files may have been deleted or moved.",
      "A build step may have incorrectly generated sourcemaps."
    ],
    tryThis: [
      "Ignore this warning if it's from a third-party package.",
      "Disable sourcemaps in vite.config.js if you don't need them.",
      "Report the issue to the package maintainer.",
      "Check if a monorepo or build step is moving files unexpectedly."
    ],
    checks: [
      "Is this warning from your code or a node_modules package?",
      "Do you actually need sourcemaps in production?"
    ],
    commands: [],
    example: "Sourcemap for '/node_modules/package/dist/index.js' points to missing source files"
  }
];
