// scripts/generateImageList.cjs

const fs = require("fs");
const path = require("path");
require("dotenv").config();
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const folders = ["home", "weddings", "portraits"];

async function fetchImages(folder) {
  let result = [];
  let nextCursor = undefined;

  do {
    const response = await cloudinary.search
      .expression(`folder:${folder}`)
      .sort_by("public_id", "desc")
      .max_results(100)
      .next_cursor(nextCursor)
      .execute();

    // Collect secure URLs of images
    const urls = response.resources.map((file) => file.secure_url);

    result = result.concat(urls);
    nextCursor = response.next_cursor;
  } while (nextCursor);

  return result;
}

async function generateImageList() {
  let output = "";

  for (const folder of folders) {
    console.log(`Fetching images from folder: ${folder}`);
    try {
      const images = await fetchImages(folder);
      output += `export const ${folder}Images = ${JSON.stringify(images, null, 2)};\n\n`;
    } catch (err) {
      console.error(`Error fetching images for folder "${folder}":`, err);
      output += `export const ${folder}Images = [];\n\n`;
    }
  }

  const outputPath = path.join(__dirname, "../src/imageLists.js");
  fs.writeFileSync(outputPath, output);
  console.log(`✅ Generated imageLists.js for all folders at ${outputPath}`);
}

generateImageList().catch((err) => {
  console.error("❌ Script failed:", err);
});
