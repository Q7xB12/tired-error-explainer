export const rules = [
  {
    id: "python.module-not-found",
    language: "python",
    confidence: 0.98,
    pattern: /ModuleNotFoundError:\s+No module named\s+['"]?(?<module>[A-Za-z0-9_.-]+)['"]?/i,
    title: "Python cannot find {module}",
    summary: "Your code is trying to import {module}, but Python cannot find that package or module in the environment running the script.",
    why: [
      "{module} is not installed in the active environment.",
      "You may be using a different Python interpreter, virtual environment, or terminal than the one where the package was installed.",
      "If {module} is a local file, Python may be running from the wrong folder."
    ],
    tryThis: [
      "Install the missing package in the same environment that runs the code.",
      "Confirm your virtual environment is active before running the app.",
      "If it is your own file, check the filename and run the command from the project root."
    ],
    checks: [
      "Does `python -m pip show {module}` find anything?",
      "Does your editor use the same Python interpreter as your terminal?"
    ],
    commands: [
      "python -m pip install {module}",
      "python -m pip show {module}",
      "python -c \"import sys; print(sys.executable)\""
    ],
    example: "ModuleNotFoundError: No module named 'requests'"
  },
  {
    id: "python.import-error-name",
    language: "python",
    confidence: 0.94,
    pattern: /ImportError:\s+cannot import name\s+['"]?(?<name>[A-Za-z0-9_]+)['"]?\s+from\s+['"]?(?<module>[A-Za-z0-9_.-]+)['"]?/i,
    title: "Python found {module}, but not {name}",
    summary: "Python can import {module}, but that module does not expose something named {name} from the place your code expects.",
    why: [
      "{name} may have been renamed, removed, or moved in the installed version of {module}.",
      "A local file may be shadowing the real package.",
      "Circular imports can also make a name unavailable while Python is still loading files."
    ],
    tryThis: [
      "Check the docs for the installed version of {module}.",
      "Search your project for a file or folder named {module}.py or {module}.",
      "Move shared imports inside functions if two files import each other."
    ],
    checks: [
      "Did this start after upgrading dependencies?",
      "Is there a local file with the same name as the package?"
    ],
    commands: [
      "python -m pip show {module}",
      "python -c \"import {module}; print({module}.__file__)\""
    ],
    example: "ImportError: cannot import name 'url_quote' from 'werkzeug.urls'"
  },
  {
    id: "python.indentation",
    language: "python",
    confidence: 0.96,
    pattern: /IndentationError:\s+(?<reason>unexpected indent|unindent does not match any outer indentation level|expected an indented block)/i,
    title: "Python indentation is inconsistent",
    summary: "Python uses indentation as syntax. One line is indented differently from what Python expects, so it cannot understand the block structure.",
    why: [
      "A line may have extra spaces at the start.",
      "Tabs and spaces may be mixed in the same file.",
      "A line after `if`, `for`, `while`, `def`, `class`, or `try` may need to be indented."
    ],
    tryThis: [
      "Look at the line mentioned in the traceback and the few lines above it.",
      "Convert tabs to spaces.",
      "Use four spaces per indentation level."
    ],
    checks: [
      "Does the previous line end with a colon?",
      "Are invisible tabs showing in your editor?"
    ],
    commands: [],
    example: "IndentationError: unexpected indent"
  },
  {
    id: "python.syntax",
    language: "python",
    confidence: 0.9,
    pattern: /SyntaxError:\s+(?<reason>.+)/i,
    title: "Python hit invalid syntax",
    summary: "Python reached code it cannot parse. The message points near the problem, but the actual mistake is often on the line just before it.",
    why: [
      "A bracket, quote, comma, or colon may be missing.",
      "You may be using syntax from a newer Python version than the one running the code.",
      "A previous line may be unfinished, making this line look broken."
    ],
    tryThis: [
      "Check the line with the caret and the line above it.",
      "Look for unmatched quotes, brackets, or parentheses.",
      "Confirm the Python version matches the syntax you are using."
    ],
    checks: [
      "Does `python --version` match the project docs?",
      "Did a formatter or copy-paste change punctuation?"
    ],
    commands: [
      "python --version"
    ],
    example: "SyntaxError: invalid syntax"
  },
  {
    id: "node.cannot-find-module",
    language: "javascript",
    confidence: 0.97,
    pattern: /(?:Error:\s+)?Cannot find module\s+['"](?<module>[^'"]+)['"]/i,
    title: "Node cannot find {module}",
    summary: "Node tried to load {module}, but it is not available from the current project, path, or package installation.",
    why: [
      "The dependency may not be installed.",
      "You may be running the command outside the project folder.",
      "The import path may be misspelled or missing `./` for a local file."
    ],
    tryThis: [
      "Run install from the project root.",
      "Use `./` or `../` for local files.",
      "Check whether the package name in package.json matches the import."
    ],
    checks: [
      "Is there a node_modules folder?",
      "Does package.json include {module} if it is a dependency?"
    ],
    commands: [
      "npm install",
      "npm install {module}",
      "node -p \"process.cwd()\""
    ],
    example: "Error: Cannot find module 'express'"
  },
  {
    id: "node.enoent",
    language: "javascript",
    confidence: 0.92,
    pattern: /ENOENT:\s+no such file or directory,\s+(?<operation>\w+)\s+['"](?<path>[^'"]+)['"]/i,
    title: "A file path does not exist",
    summary: "The program tried to {operation} {path}, but that file or folder was not found from the process that ran the command.",
    why: [
      "The file may be missing, generated later, or ignored by git.",
      "The command may be running from the wrong working directory.",
      "A relative path may need to be resolved from a different folder."
    ],
    tryThis: [
      "Check whether {path} exists.",
      "Print the current working directory from the process.",
      "Use an absolute path temporarily to confirm the path is the issue."
    ],
    checks: [
      "Does the file exist on disk?",
      "Is this path created by a build step that has not run yet?"
    ],
    commands: [
      "node -p \"process.cwd()\""
    ],
    example: "ENOENT: no such file or directory, open './config.json'"
  },
  {
    id: "node.eaddrinuse",
    language: "javascript",
    confidence: 0.95,
    pattern: /EADDRINUSE.*(?::|port\s+)(?<port>\d{2,5})/i,
    title: "Port {port} is already in use",
    summary: "Your app tried to start a server on port {port}, but another process is already listening there.",
    why: [
      "A previous dev server may still be running.",
      "Another app may be using the same port.",
      "Hot reload may have left a process behind."
    ],
    tryThis: [
      "Stop the process using port {port}.",
      "Restart the terminal.",
      "Run the app on a different port."
    ],
    checks: [
      "Do you already have this project running in another terminal?",
      "Did the server crash but leave a child process behind?"
    ],
    commands: [
      "netstat -ano | findstr :{port}"
    ],
    example: "Error: listen EADDRINUSE: address already in use :::3000"
  },
  {
    id: "js.undefined-property",
    language: "javascript",
    confidence: 0.9,
    pattern: /TypeError:\s+Cannot read propert(?:y|ies) (?:of undefined|of null|reading ['"](?<property>[^'"]+)['"])/i,
    title: "Something is undefined when your code uses it",
    summary: "Your code expected an object, but it got `undefined` or `null`, then tried to read a property from it.",
    why: [
      "Data may not have loaded yet.",
      "A function may have returned nothing.",
      "An API response may not have the shape the code expects."
    ],
    tryThis: [
      "Log the value right before the failing line.",
      "Add a guard for missing data.",
      "Check the API response or function return value."
    ],
    checks: [
      "Is this happening only on first render or during loading?",
      "Did a property name change?"
    ],
    commands: [],
    example: "TypeError: Cannot read properties of undefined (reading 'map')"
  },
  {
    id: "npm.eresolve",
    language: "javascript",
    confidence: 0.94,
    pattern: /npm ERR!\s+ERESOLVE|ERESOLVE\s+unable to resolve dependency tree/i,
    title: "npm found incompatible dependency versions",
    summary: "npm is refusing to install because two packages require dependency versions that do not fit together.",
    why: [
      "A package may require a peer dependency version different from the one installed.",
      "The project may mix packages from different major versions.",
      "A lockfile may be holding onto an older dependency graph."
    ],
    tryThis: [
      "Read the package names npm prints under the conflict.",
      "Install compatible versions instead of forcing the install first.",
      "Use `--legacy-peer-deps` only as a temporary unblocker."
    ],
    checks: [
      "Did this start after upgrading React, ESLint, Vite, or TypeScript?",
      "Does package.json pin versions that disagree?"
    ],
    commands: [
      "npm install --legacy-peer-deps",
      "npm explain <package-name>"
    ],
    example: "npm ERR! ERESOLVE unable to resolve dependency tree"
  },
  {
    id: "typescript.cannot-find-name",
    language: "typescript",
    confidence: 0.94,
    pattern: /TS2304:\s+Cannot find name\s+['"]?(?<name>[A-Za-z0-9_$]+)['"]?/i,
    title: "TypeScript does not know {name}",
    summary: "TypeScript sees {name} in your code, but it cannot find a declaration for it in scope.",
    why: [
      "{name} may need to be imported.",
      "A variable may be misspelled or declared in another scope.",
      "Browser, Node, or test globals may need type definitions."
    ],
    tryThis: [
      "Import {name} from the module that defines it.",
      "Check spelling and capitalization.",
      "Install the relevant @types package if {name} is a global from a runtime or test framework."
    ],
    checks: [
      "Does the code run but only TypeScript complains?",
      "Is tsconfig missing the right `types` or `lib` entry?"
    ],
    commands: [
      "npm install -D @types/node"
    ],
    example: "TS2304: Cannot find name 'process'"
  },
  {
    id: "typescript.not-assignable",
    language: "typescript",
    confidence: 0.89,
    pattern: /TS2322:\s+Type\s+['"]?(?<actual>[^'"]+?)['"]?\s+is not assignable to type\s+['"]?(?<expected>[^'"]+?)['"]?\.?/i,
    title: "TypeScript expected one shape and got another",
    summary: "A value with type {actual} is being used where TypeScript expects {expected}.",
    why: [
      "The variable, prop, function argument, or return value has a stricter type than the value you passed.",
      "The value may be missing required fields.",
      "A union type may need narrowing before use."
    ],
    tryThis: [
      "Read the expected type first, then compare it to the value being passed.",
      "Fix the value shape instead of silencing the type error.",
      "Narrow optional or union values before assigning them."
    ],
    checks: [
      "Did a component prop or API response type change?",
      "Is the value possibly undefined?"
    ],
    commands: [],
    example: "TS2322: Type 'string | undefined' is not assignable to type 'string'."
  },
  {
    id: "git.non-fast-forward",
    language: "git",
    confidence: 0.93,
    pattern: /non-fast-forward|fetch first|rejected.*because the remote contains work/i,
    title: "Your branch is behind GitHub",
    summary: "Git refused to push because the remote branch has commits that your local branch does not have yet.",
    why: [
      "Someone else pushed to the same branch.",
      "You edited files from another machine or GitHub's web UI.",
      "Your local history and remote history need to be combined first."
    ],
    tryThis: [
      "Pull the remote changes, resolve any conflicts, then push again.",
      "Use rebase if your team prefers a straight history.",
      "Avoid force pushing unless you are sure nobody else's work will be overwritten."
    ],
    checks: [
      "Did you create a README or file on GitHub after cloning?",
      "Are you pushing to the branch you intended?"
    ],
    commands: [
      "git pull --rebase origin main",
      "git push"
    ],
    example: "! [rejected] main -> main (non-fast-forward)"
  },
  {
    id: "docker.port-allocated",
    language: "docker",
    confidence: 0.93,
    pattern: /Bind for .*?(?<port>\d{2,5}) failed:\s+port is already allocated|Ports are not available.*?(?<altPort>\d{2,5})/i,
    title: "Docker cannot bind that port",
    summary: "Docker tried to expose a container on a host port that is already being used.",
    why: [
      "Another container may already be using the port.",
      "A local service outside Docker may be listening there.",
      "A stopped-looking stack may still have one container running."
    ],
    tryThis: [
      "List running containers and stop the one using the port.",
      "Change the host port in docker-compose.yml.",
      "Restart Docker if the port looks stuck."
    ],
    checks: [
      "Is the old container still running?",
      "Does another local dev server use the same port?"
    ],
    commands: [
      "docker ps",
      "docker compose down"
    ],
    example: "Bind for 0.0.0.0:5432 failed: port is already allocated"
  },
  {
    id: "os.permission-denied",
    language: "system",
    confidence: 0.86,
    pattern: /EACCES|permission denied|access is denied/i,
    title: "The process does not have permission",
    summary: "The command tried to read, write, execute, or bind something that the current user or process is not allowed to access.",
    why: [
      "The file or folder may belong to another user.",
      "The process may be writing outside the project folder.",
      "A protected port, system folder, or locked file may be involved."
    ],
    tryThis: [
      "Check the exact path or port in the error.",
      "Move generated files into the project folder.",
      "Close apps that may have locked the file."
    ],
    checks: [
      "Is the file open in another app?",
      "Are you trying to write to a system folder?"
    ],
    commands: [],
    example: "EACCES: permission denied, open '/usr/local/bin/tool'"
  }
];
