const fs = require('fs');
const path = require('path');

// 1. Update __root.tsx — fix favicon to use PNG logo, add manifest link + install support
const rootPath = path.join(process.cwd(), 'src', 'routes', '__root.tsx');
let rootContent = fs.readFileSync(rootPath, 'utf8');

const oldLinks = `{ rel: "icon", href: "/favicon.ico?v=2", type: "image/x-icon" },`;
const newLinks = `{ rel: "icon", href: "/rentsync-logo.png?v=3", type: "image/png" },
      { rel: "apple-touch-icon", href: "/rentsync-logo.png?v=3" },
      { rel: "manifest", href: "/manifest.json" },`;

if (!rootContent.includes(oldLinks)) {
  console.error('❌ Could not find favicon line in __root.tsx — paste me the current file again.');
  process.exit(1);
}
rootContent = rootContent.replace(oldLinks, newLinks);

const oldMeta = `{ name: "twitter:card", content: "summary_large_image" },`;
const newMeta = `{ name: "twitter:card", content: "summary_large_image" },
      { name: "theme-color", content: "#0b1f3f" },`;

if (rootContent.includes(oldMeta)) {
  rootContent = rootContent.replace(oldMeta, newMeta);
}

fs.writeFileSync(rootPath, rootContent, 'utf8');
console.log('✅ __root.tsx updated — favicon fixed, manifest linked, theme color added.');

// 2. Create manifest.json so browsers offer "Add to Home Screen" / install
const manifestPath = path.join(process.cwd(), 'public', 'manifest.json');
const manifestContent = {
  name: "RentSync — Smart Property Management",
  short_name: "RentSync",
  description: "RentSync helps Kenyan landlords track rent, tenants, maintenance and finances.",
  start_url: "/",
  display: "standalone",
  background_color: "#ffffff",
  theme_color: "#0b1f3f",
  icons: [
    {
      src: "/rentsync-logo.png",
      sizes: "512x512",
      type: "image/png",
      purpose: "any maskable"
    }
  ]
};

fs.writeFileSync(manifestPath, JSON.stringify(manifestContent, null, 2), 'utf8');
console.log('✅ manifest.json created — install/home-screen prompt now enabled.');