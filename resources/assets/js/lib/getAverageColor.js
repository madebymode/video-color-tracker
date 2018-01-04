/**
 * Get average color. Return as `rgba()`.
 * @param  {Array}  imageData
 * @return {String}
 */
export default function getAverageColor(imageData, opacity) {
  // Default opacity = 1
  if (typeof opacity === 'undefined') {
    opacity = 1;
  }

  // Get the length of the data, divide that by 4 to get the number of pixels
  let imageDataLength = (imageData.length / 4);

  // Loop through the raw image data, adding the rgb of every pixel to rgbSums
  let pixelCount = 0;
  let rgbSums = [0, 0, 0];
  for (let i = 0; i < imageDataLength; i += 4) {
    rgbSums[0] += imageData[i * 4];
    rgbSums[1] += imageData[i * 4 + 1];
    rgbSums[2] += imageData[i * 4 + 2];
    pixelCount++;
  }

  // Average the rgb sums to get the average color of the frame in rgb
  rgbSums[0] = Math.floor(rgbSums[0] / pixelCount);
  rgbSums[1] = Math.floor(rgbSums[1] / pixelCount);
  rgbSums[2] = Math.floor(rgbSums[2] / pixelCount);

  return `rgba(${rgbSums.join(',')}, ${opacity})`;
}
