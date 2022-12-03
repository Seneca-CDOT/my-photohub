const path = require('path');
const fs = require('fs');
const sharp = require('sharp');

const directoryPath = path.join(__dirname, './images');
console.log(directoryPath);

fs.readdir(directoryPath, (err, files) => {
  if (err) {
    console.error({ err }, 'Unable to read the directory');
  }

  const newFolder = path.join(__dirname, './out');

  try {
    // Create a folder, if out folder does not exist
    if (!fs.existsSync(newFolder)) {
      fs.mkdirSync(newFolder);
    }
  } catch (err) {
    console.error({ err }, 'Error while creating out directory');
  }

  files.forEach(async (file) => {
    const filePath = path.join(__dirname, './images/', file);

    const newFileName = `${newFolder}/${path.basename(filePath)}`.replace(/\.[^/.]+$/, '');

    try {
      sharp(filePath).resize(525, 295).webp({ lossless: true }).toFile(`${newFileName}_w_525.webp`);

      sharp(filePath).resize(746, 420).webp({ lossless: true }).toFile(`${newFileName}_w_746.webp`);

      sharp(filePath).resize(934, 525).webp({ lossless: true }).toFile(`${newFileName}_w_934.webp`);
    } catch (err) {
      console.error({ err }, 'Error occurred while converting to resized images');
    }
  });
});
