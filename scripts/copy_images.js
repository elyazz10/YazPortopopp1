const fs = require('fs');
const path = require('path');

const dir = 'C:\\Users\\ASUS\\.gemini\\antigravity\\brain\\931f5e93-124b-46a4-ac62-4da94aa4bd37';
const files = fs.readdirSync(dir)
  .filter(f => f.startsWith('media__') && (f.endsWith('.png') || f.endsWith('.jpg')))
  .map(f => ({ name: f, time: fs.statSync(path.join(dir, f)).mtime.getTime() }))
  .sort((a, b) => b.time - a.time);

const recentFiles = files.slice(0, 3);
const destDir = path.join(process.cwd(), 'public');

recentFiles.forEach((file, index) => {
  const ext = path.extname(file.name);
  const newName = "journey-" + (index + 1) + ext;
  fs.copyFileSync(path.join(dir, file.name), path.join(destDir, newName));
  console.log("Copied " + file.name + " to " + newName);
});
