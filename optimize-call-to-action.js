const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

async function optimizeCallToAction() {
  const inputPath = "source/images/call-to-action.jpg";
  const outputPath = "source/images/optimized/call-to-action-ultra.jpg";

  try {
    await sharp(inputPath)
      .resize(1200, 800, {
        // Reduce dimensions
        fit: "cover",
        position: "center",
      })
      .jpeg({
        quality: 60, // Much lower quality
        progressive: true,
        mozjpeg: true,
      })
      .toFile(outputPath);

    console.log(`Ultra-optimized call-to-action image created: ${outputPath}`);

    // Get file sizes
    const originalSize = fs.statSync(inputPath).size;
    const optimizedSize = fs.statSync(outputPath).size;
    const reduction = (
      ((originalSize - optimizedSize) / originalSize) *
      100
    ).toFixed(1);

    console.log(`Original: ${(originalSize / 1024).toFixed(1)} KB`);
    console.log(`Optimized: ${(optimizedSize / 1024).toFixed(1)} KB`);
    console.log(`Reduction: ${reduction}%`);
  } catch (error) {
    console.error("Error optimizing call-to-action image:", error);
  }
}

optimizeCallToAction();
