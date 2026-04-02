// Generic mock for any react-icons sub-package (react-icons/si, react-icons/tb, etc.)
// Returns a function component for any named export, so imports like
// `import { SiJavascript } from "react-icons/si"` resolve to valid components.
const React = require("react");

module.exports = new Proxy(
  { __esModule: true },
  {
    get(_target, prop) {
      if (prop === "__esModule") return true;
      if (prop === "default") return module.exports;
      return function MockIcon(props) {
        return React.createElement("svg", { "data-icon": String(prop), ...props });
      };
    },
  }
);
