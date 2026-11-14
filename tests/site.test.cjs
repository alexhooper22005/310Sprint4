const assert = require("node:assert/strict");
const { readFileSync } = require("node:fs");
const path = require("node:path");
const test = require("node:test");
const cssPath = path.join(__dirname, "..", "styles.css");

const pagePath = path.join(__dirname, "..", "index.html");

test("the Water Tracker page has an accessible dashboard shell", () => {
  const html = readFileSync(pagePath, "utf8");
  const css = readFileSync(cssPath, "utf8");

  assert.match(html, /<title>Water Tracker<\/title>/);
  assert.match(html, /<header\b/);
  assert.match(html, /<main\b/);
  assert.match(html, /Today's hydration/i);
  assert.match(html, /water comparisons/i);
  assert.match(html, /<link[^>]+href=["']styles\.css["']/);
  assert.match(html, /<button[^>]*>Add a sip \(~16 mL\)<\/button>/);
  assert.match(html, /id=["']water-total["']/);

  assert.match(html, /id=["']water-ml["']/);
  assert.match(
    html,
    /<script type=["']module["'] src=["']\.\/src\/ui\/main\.mjs["']><\/script>/,
  );
  assert.match(html, /id=["']object-comparison["']/);
  assert.match(css, /\.add-sip-button\s*\{/);
});
