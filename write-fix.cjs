const fs = require('fs');
const path = require('path');

const filePath = path.join(process.cwd(), 'src', 'routes', '__root.tsx');
let content = fs.readFileSync(filePath, 'utf8');

const oldFavicon = `{ rel: "icon", href: "/favicon.ico", type: "image/x-icon" },`;
const newFavicon = `{ rel: "icon", href: "/favicon.ico?v=2", type: "image/x-icon" },`;

if (!content.includes(oldFavicon)) {
  console.error('❌ Could not find the favicon line — paste me __root.tsx again.');
  process.exit(1);
}

content = content.replace(oldFavicon, newFavicon);
fs.writeFileSync(filePath, content, 'utf8');
console.log('✅ Favicon cache-busted — browsers will fetch the new icon instead of using the cached Lovable one.');