const fs = require("fs");
const path = require("path");

const filePath = path.join(process.cwd(), "src", "routes", "index.tsx");
let content = fs.readFileSync(filePath, "utf8");
content = content.replace(/\r\n/g, "\n");

const oldLine = `<div className="hidden md:block">`;
const newLine = `<div className="block">`;

if (!content.includes(oldLine)) {
  console.error("❌ Could not find the line — paste me the file again.");
  process.exit(1);
}

content = content.split(oldLine).join(newLine);
fs.writeFileSync(filePath, content, "utf8");
console.log(
  '✅ Nav wrapper changed from "hidden md:block" to "block" — Get Started now shows on all screen sizes.',
);
