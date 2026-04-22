#!/usr/bin/env node
// ─── Generate PWA icons ───────────────────────────────────────────────────────
// Run: node scripts/generate-icons.js
// Requires: npm install -g canvas  OR use any online PWA icon generator
//
// Quick alternative: use https://favicon.io or https://realfavicongenerator.net
// with the SVG below, export 192×192 and 512×512 PNGs to public/icons/
//
// ─── Source SVG (copy to public/icons/icon.svg) ──────────────────────────────

const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
  <rect width="512" height="512" rx="80" fill="#0C0C0C"/>
  <rect x="60" y="230" width="392" height="52" rx="26" fill="#C8FF00"/>
  <rect x="60" y="200" width="52" height="112" rx="26" fill="#C8FF00"/>
  <rect x="400" y="200" width="52" height="112" rx="26" fill="#C8FF00"/>
  <rect x="20" y="220" width="52" height="72" rx="26" fill="#C8FF00"/>
  <rect x="440" y="220" width="52" height="72" rx="26" fill="#C8FF00"/>
</svg>`;

console.log("Save this SVG as public/icons/icon.svg:");
console.log(svg);
console.log("\nThen convert to PNG using:");
console.log("  - https://svgtopng.com (192px and 512px)");
console.log("  - Place in public/icons/icon-192.png and public/icons/icon-512.png");
