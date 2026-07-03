const { getLoader, loaderByName } = require("@craco/craco");

// react-scripts (CRA) only runs full Babel transpilation on files inside
// src/. Everything in node_modules is shipped as-is. That's normally fine
// because most packages publish down-leveled JS, but several of our
// dependencies are ESM-only and ship modern ES2020+ syntax untouched
// (optional chaining, nullish coalescing, etc.):
//   - react-router (v7, ESM-only, targets ES2020+)
//   - @supabase/supabase-js
//   - react-markdown + the remark/rehype/unified/mdast/hast/unist ecosystem
//     it pulls in
//
// On an older engine (older iOS/Safari, older Android WebViews/Chrome),
// the browser can't even *parse* that syntax. That throws a SyntaxError
// while the bundle is loading, before React ever mounts - which is why it
// showed up as a fully blank screen instead of a normal React error our
// ErrorBoundary could catch (ErrorBoundary only catches errors thrown
// *during* render, not parse-time syntax errors in the bundle itself).
//
// The fix: tell Babel to also process these packages, down-leveled to the
// browserslist targets in package.json.
const MODERN_PACKAGES = [
  "react-router",
  "react-router-dom",
  "@supabase",
  "react-markdown",
  "remark-gfm",
  "remark-math",
  "rehype-katex",
  "unified",
  "unist-util-",
  "mdast-util-",
  "hast-util-",
  "micromark",
  "vfile",
  "bail",
  "trough",
  "is-plain-obj",
  "property-information",
  "space-separated-tokens",
  "comma-separated-tokens",
  "web-namespaces",
  "zwitch",
  "decode-named-character-reference",
  "character-entities",
  "character-reference-invalid",
  "character-entities-html4",
  "html-void-elements",
  "longest-streak",
  "ccount",
  "escape-string-regexp",
  "markdown-table",
  "trim-lines",
  "devlop",
  "katex",
];

const transpileTest = new RegExp(
  `node_modules[\\\\/](${MODERN_PACKAGES.join("|")})`,
);

module.exports = {
  webpack: {
    configure: (webpackConfig) => {
      const { isFound, match } = getLoader(
        webpackConfig,
        loaderByName("babel-loader"),
      );

      if (isFound) {
        const existingInclude = match.loader.include;
        const includeList = Array.isArray(existingInclude)
          ? existingInclude
          : [existingInclude];

        match.loader.include = [
          ...includeList,
          (modulePath) => transpileTest.test(modulePath),
        ];

        // These packages are plain JS (no JSX/Flow), so a lightweight
        // preset-env-only pass through the app's own babel config is
        // enough - no need to change loader options beyond `include`.
      }

      return webpackConfig;
    },
  },
};
