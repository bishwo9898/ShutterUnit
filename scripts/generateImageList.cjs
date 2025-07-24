const fs = require("fs");
const path = require("path");

const folders = ["home", "weddings", "portraits"];
const imageExtensions = [".jpg", ".jpeg", ".png", ".webp"];

let output = "";

folders.forEach((folder) => {
  const folderPath = path.join(__dirname, `../public/${folder}`);
  if (!fs.existsSync(folderPath)) {
    console.warn(`⚠️ Folder not found: ${folderPath}`);
    return;
  }

  const images = fs
    .readdirSync(folderPath)
    .filter((file) =>
      imageExtensions.includes(path.extname(file).toLowerCase())
    );

  output += `export const ${folder}Images = ${JSON.stringify(images, null, 2)};\n\n`;
});

fs.writeFileSync(path.join(__dirname, "../src/imageLists.js"), output);
console.log("✅ Generated imageLists.js for all folders.");
