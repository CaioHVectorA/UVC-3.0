import { promises as fs } from 'fs'
import path from 'path'
import jimp from 'jimp'
function normalize(l: number): number {
  return (1440 - (960 - l / 4)) - ((l/ 4))
  }
export async function saveImage(base64String: string, outputPath: string) {
  console.log('Function called!')
  // Remove the data:image/png;base64 prefix if it exists
  const base64Data = base64String.replace(/^data:image\/png;base64,/, '');

  // Create a buffer from the base64 data
  const buffer = Buffer.from(base64Data, 'base64');

  // Write the buffer to a file at the specified output path
  await fs.writeFile(outputPath, buffer);
  const img = await jimp.read(outputPath)
  if (img.hasAlpha()) {
    if (img.getWidth() > 480 || img.getHeight() > 480) img.resize(normalize(img.getWidth()), normalize(img.getHeight()))
    const newImg = new jimp(img.getWidth(),img.getHeight(), '#000')
    console.log(newImg)
    newImg.composite(img,0,0)
    console.log('Salvou imagem!')
    await newImg.writeAsync(outputPath)
  }
}