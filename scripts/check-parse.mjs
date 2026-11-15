// Parse every prototype source the way the browser will.
//
// The prototype has no linter and no test lane, so a syntax error is found only when a page
// renders blank. This runs the Babel the pages vendor over every .jsx module and every inline
// <script type="text/babel"> block of every page, and every page variant under variants/.
//
//   node scripts/check-parse.mjs
//
// It sees syntax only: a page that parses can still fail at runtime, or draw a block twice.

import { readFileSync, readdirSync } from 'node:fs';
import { createRequire } from 'node:module';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..', 'prototype');

// The vendored Babel is a UMD build. Loaded as CommonJS (this repository has no package.json), it
// sets `module.exports`; loaded as an ES module (under a `"type": "module"` package, as it was in
// masaha), it finds no `exports` and sets `globalThis.Babel`. Take whichever is set.
const loaded = createRequire(import.meta.url)(join(ROOT, '_vendor', 'babel.min.js'));
const Babel = loaded && loaded.transform ? loaded : globalThis.Babel;

const pieces = [];
for (const file of readdirSync(join(ROOT, 'masaha')).filter((f) => f.endsWith('.jsx'))) {
  pieces.push({ label: `masaha/${file}`, code: readFileSync(join(ROOT, 'masaha', file), 'utf8') });
}
// Each page variant (variants/<Page>/<name>.jsx) replaces its page's inline block.
for (const file of readdirSync(join(ROOT, 'variants'), { recursive: true }).filter((f) => f.endsWith('.jsx'))) {
  const label = `variants/${file.replace(/\\/g, '/')}`;
  pieces.push({ label, code: readFileSync(join(ROOT, 'variants', file), 'utf8') });
}
const files = readdirSync(ROOT).filter((f) => f.endsWith('.html'));
for (const file of files) {
  const text = readFileSync(join(ROOT, file), 'utf8');
  // Only the inline blocks: a block with src= is one of the modules above.
  for (const m of text.matchAll(/<script\b([^>]*type=["']text\/babel["'][^>]*)>([\s\S]*?)<\/script>/gi)) {
    if (/\bsrc=/.test(m[1])) continue;
    const line = text.slice(0, m.index).split('\n').length;
    pieces.push({ label: `${file} (inline, line ${line})`, code: m[2] });
  }
}

let failures = 0;
for (const { label, code } of pieces) {
  try {
    Babel.transform(code, { presets: ['react'], filename: label, sourceType: 'script' });
  } catch (error) {
    failures++;
    console.error(`FAIL ${label}\n     ${error.message.split('\n')[0]}`);
  }
}

console.log(`${pieces.length - failures}/${pieces.length} blocks parsed, from ${files.length} pages and the modules`);
process.exitCode = failures ? 1 : 0;
