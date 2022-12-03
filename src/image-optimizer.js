import Compressor from 'compressorjs';
import camelCase from 'camelcase';

const compressorOptions = [
  { mimeType: 'image/jpeg', width: 375 },
  { mimeType: 'image/jpeg', width: 744 },
  { mimeType: 'image/jpeg', width: 950 },
  { mimeType: 'image/jpeg', width: 1120 },
  { mimeType: 'image/webp', width: 375 },
  { mimeType: 'image/webp', width: 744 },
  { mimeType: 'image/webp', width: 950 },
  { mimeType: 'image/webp', width: 1120 },
  { mimeType: 'image/png', width: 375 },
  { mimeType: 'image/png', width: 744 },
  { mimeType: 'image/png', width: 950 },
  { mimeType: 'image/png', width: 1120 },
  { mimeType: 'image/avif', width: 375 },
  { mimeType: 'image/avif', width: 744 },
  { mimeType: 'image/avif', width: 950 },
  { mimeType: 'image/avif', width: 1120 },
];

const compressImage = (file, option) => {
  return new Promise((resolve, reject) => {
    new Compressor(file, {
      width: option.width,
      quality: 0.6,
      success: (result) => {
        const fileNameWithoutExt = file.name.replace(/\.[^/.]+$/, '');
        const fileName =
          camelCase(fileNameWithoutExt) +
          option.width +
          '.' +
          option.mimeType.substring(option.mimeType.indexOf('/') + 1);
        resolve(new File([result], fileName, { type: option.mimeType }));
      },
      error: (err) => {
        console.error(err.message);
        reject(err);
      },
    });
  });
};

export const createOptimizedImages = async (originalImages) => {
  if (!originalImages) {
    return;
  }

  let compressFilesPromises = [];
  compressorOptions.forEach((option) => {
    for (const image of originalImages) {
      compressFilesPromises.push(compressImage(image, option));
    }
  });

  return Promise.all(compressFilesPromises);
};
