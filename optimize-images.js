const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

// Create optimized images directory
const optimizedDir = 'source/images/optimized';
if (!fs.existsSync(optimizedDir)) {
  fs.mkdirSync(optimizedDir, { recursive: true });
}

// Image optimization function
async function optimizeImage(inputPath, outputPath, quality = 80) {
  try {
    await sharp(inputPath)
      .jpeg({ quality: quality, progressive: true })
      .png({ quality: quality, progressive: true })
      .toFile(outputPath);
    console.log(`Optimized: ${inputPath} -> ${outputPath}`);
  } catch (error) {
    console.error(`Error optimizing ${inputPath}:`, error);
  }
}

// Optimize all images
async function optimizeAllImages() {
  const imagesDir = 'source/images';
  const showcaseDir = 'source/images/showcase';

  // Optimize main images
  const mainImages = [
    'watch.png',
    'watch-2.png',
    'logo.png',
    'call-to-action.jpg',
    'avater.png'
  ];

  for (const image of mainImages) {
    const inputPath = path.join(imagesDir, image);
    const outputPath = path.join(optimizedDir, image);
    if (fs.existsSync(inputPath)) {
      await optimizeImage(inputPath, outputPath, 85);
    }
  }

  // Optimize showcase images
  const showcaseImages = [
    'showcase-1.png',
    'showcase-2.png',
    'showcase-3.png',
    'showcase-4.png',
    'showcase-5.png',
    'showcase-6.png',
    'showcase-7.png',
    'showcase-8.png'
  ];

  for (const image of showcaseImages) {
    const inputPath = path.join(showcaseDir, image);
    const outputPath = path.join(optimizedDir, image);
    if (fs.existsSync(inputPath)) {
      await optimizeImage(inputPath, outputPath, 80);
    }
  }
}

// Run optimization
optimizeAllImages().then(() => {
  console.log('Image optimization complete!');
}).catch(console.error);
