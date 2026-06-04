/**
 * React-specific error rules
 * Common errors from React, React DOM, and popular React frameworks
 */

export const reactRules = [
  {
    id: "react.invalid-hook-call",
    language: "javascript",
    confidence: 0.96,
    pattern: /Invalid hook call\. Hooks can only be called inside/is,
    title: "React Hook called outside a component",
    summary:
      "Hooks (useState, useEffect, etc.) can only be called at the top level of function components or custom hooks.",
    why: [
      "The hook may be called inside a regular function, class, or conditional.",
      "The file may not be recognized as a component (must start with capital letter).",
      "react and react-dom versions may be mismatched."
    ],
    tryThis: [
      "Move the hook call to the top level of the component function.",
      "Rename the function to start with a capital letter if it's a component.",
      "Extract conditional hook logic into a separate component.",
      "Check that react and react-dom versions match."
    ],
    checks: [
      "Is the hook inside an if statement, loop, or nested function?",
      "Does the function name start with a lowercase letter?",
      "Are you mixing React versions?"
    ],
    commands: ["npm list react react-dom"],
    example: "Error: Invalid hook call. Hooks can only be called inside the body of a function component."
  },
  {
    id: "react.hydration-failed",
    language: "javascript",
    confidence: 0.95,
    pattern: /Hydration failed.*initial UI does not match/is,
    title: "React hydration mismatch",
    summary:
      "The HTML React generated on the server differs from what the browser rendered, breaking hydration.",
    why: [
      "Server and client may be rendering different content (e.g., Date.now(), random IDs, browser APIs).",
      "A component may be using browser-only APIs during SSR.",
      "Conditional rendering may differ between server and client.",
      "Text content may have extra whitespace differences."
    ],
    tryThis: [
      "Check for Date.now(), Math.random(), or browser APIs in the initial render.",
      "Use useEffect for client-only code that accesses window or document.",
      "Ensure server and client props are identical.",
      "Suppress hydration warnings with suppressHydrationWarning for unavoidable differences."
    ],
    checks: [
      "Does the component use window, document, or localStorage before useEffect?",
      "Is the component rendering different content based on time or randomness?",
      "Are there whitespace differences in text content?"
    ],
    commands: [],
    example:
      "Error: Hydration failed because the initial UI does not match what was rendered on the server."
  },
  {
    id: "react.text-content-mismatch",
    language: "javascript",
    confidence: 0.93,
    pattern: /Text content (?:does not match|did not match) server-rendered HTML/i,
    title: "Server/client text mismatch",
    summary:
      "The text rendered on the server is different from the text rendered on the client during hydration.",
    why: [
      "Dynamic text like dates, user-specific data, or random values differs between renders.",
      "Locale or timezone differences between server and client.",
      "Data may have changed between server render and client hydration."
    ],
    tryThis: [
      "Move dynamic text generation to useEffect.",
      "Use the same timezone and locale settings on server and client.",
      "For user-specific content, render a placeholder on the server.",
      "Check if data is being modified between server and client render."
    ],
    checks: [
      "Is the text using Date, Intl, or other environment-specific APIs?",
      "Does the text depend on user session or authentication state?"
    ],
    commands: [],
    example: "Warning: Text content did not match. Server: 'Loading...' Client: 'Welcome back!'"
  },
  {
    id: "react.too-many-rerenders",
    language: "javascript",
    confidence: 0.94,
    pattern: /Too many re-renders\. React limits the number/i,
    title: "Infinite render loop detected",
    summary:
      "A component is re-rendering infinitely, usually because state is being set during render.",
    why: [
      "setState may be called directly in the component body instead of inside an effect or event handler.",
      "An effect may be missing dependencies, causing it to run on every render.",
      "Props or state may be creating new object/array references on every render."
    ],
    tryThis: [
      "Move setState calls inside useEffect or event handlers.",
      "Add missing dependencies to useEffect dependency array.",
      "Memoize objects and arrays that are passed as props or dependencies.",
      "Check for setState in render logic without conditions."
    ],
    checks: [
      "Is setState called directly in the component body?",
      "Does useEffect have the correct dependencies?",
      "Are you creating new objects/arrays on every render?"
    ],
    commands: [],
    example: "Error: Too many re-renders. React limits the number of renders to prevent an infinite loop."
  },
  {
    id: "react.cannot-update-unmounted",
    language: "javascript",
    confidence: 0.91,
    pattern:
      /Can(?:not|'t) perform a React state update on an unmounted component|Can(?:not|'t) perform a React state update on a component that is not yet mounted/i,
    title: "State update after unmount",
    summary:
      "A component tried to update state after it was already unmounted, usually from an async operation.",
    why: [
      "An async function, promise, or timer continued running after the component unmounted.",
      "A cleanup function may be missing from useEffect.",
      "An event listener may not have been removed."
    ],
    tryThis: [
      "Add a cleanup function to useEffect that cancels async operations.",
      "Use an isMounted flag or AbortController to cancel requests.",
      "Remove event listeners in useEffect cleanup.",
      "Check that timers (setTimeout, setInterval) are cleared."
    ],
    checks: [
      "Does the effect return a cleanup function?",
      "Are you awaiting a fetch or promise that may resolve after unmount?",
      "Are timers being cleared?"
    ],
    commands: [],
    example:
      "Warning: Can't perform a React state update on an unmounted component. This is a no-op, but it indicates a memory leak in your application."
  },
  {
    id: "react.missing-key",
    language: "javascript",
    confidence: 0.89,
    pattern: /Each child in (?:a list|an array) should have a unique ["']key["'] prop/i,
    title: "Missing key prop in list",
    summary:
      "React needs a key prop on each element in a list to track which items changed, were added, or removed.",
    why: [
      "A .map() call is rendering components without assigning a key.",
      "The key may not be unique across all items.",
      "Index is being used as key when items can be reordered or filtered."
    ],
    tryThis: [
      "Add a unique key prop to each element in the .map() return value.",
      "Use a stable unique identifier (id from database) instead of array index.",
      "If items can be reordered, never use array index as the key.",
      "Ensure keys are unique within the list."
    ],
    checks: [
      "Is each mapped element assigned a key?",
      "Are you using array index as key for a reorderable list?",
      "Are keys unique across all items?"
    ],
    commands: [],
    example:
      "Warning: Each child in a list should have a unique 'key' prop. Check the render method of `UserList`."
  }
];
