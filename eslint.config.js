// scripts/generateImageList.cjs
const fs = require("fs");
const path = require("path");
require("dotenv").config();
const cloudinary = require("cloudinary").v2;

// Config
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Folders to fetch from
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

    // Map to full secure URLs
    const urls = response.resources.map((file) => file.secure_url);

    result = result.concat(urls);
    nextCursor = response.next_cursor;
  } while (nextCursor);

  return result;
}


async function generateImageList() {
  const allImages = {};

  for (const folder of folders) {
    console.log(`Fetching from: ${folder}`);
    const images = await fetchImages(folder);
    allImages[folder] = images;
  }

  const outputPath = path.join(__dirname, "..", "src", "imageList.js");
  const fileContent = `export const imageList = ${JSON.stringify(allImages, null, 2)};`;

  fs.writeFileSync(outputPath, fileContent);
  console.log(`✅ Image list generated at ${outputPath}`);
}

generateImageList().catch((err) => console.error("❌ Error:", err));
