import type { NextApiRequest, NextApiResponse } from "next";
import GifEncoder from 'gif-encoder-2';
import Jimp from 'jimp';
import fs from "fs";

import {
  downloadFileFromUrl,
  getNameAndExtensionFromUrl,
  makeTempFilePath,
  uploadFileFromLocalPath
} from "@/helpers/files";

interface GifResponse {
  url: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<GifResponse>
) {
  const { body } = req;
  const { urls, width, height, speed } = body;

  try {
    const processedImages = await Promise.all(urls.map(async (url: string) => {
      const localImagePath = await downloadFileFromUrl(url);
      const image = await Jimp.read(localImagePath as string);
      image.resize(width, height);
      return image.bitmap.data;
    }));

    const localOutputPath = makeTempFilePath();

    const encoder = new GifEncoder(width, height);
    const writeStream = fs.createWriteStream(localOutputPath);

    encoder.createReadStream().pipe(writeStream);
    encoder.start();
    encoder.setRepeat(0);
    encoder.setDelay((1 / speed) * 1000);
    encoder.setQuality(10);

    processedImages.forEach(bitmapData => {
      encoder.addFrame(bitmapData);
    });

    encoder.finish();

    await new Promise((resolve, reject) => {
      writeStream.on('finish', resolve);
      writeStream.on('error', reject);
    });

    const { basename } = getNameAndExtensionFromUrl(urls[0]);
    const uploadedUrl = await uploadFileFromLocalPath(
      localOutputPath,
      `${basename}_gif.gif`
    );

    return res.status(200).json({ url: uploadedUrl as string });
  } catch (error) {
    console.error("An error occurred", error);
    return res.status(500);
  }
}

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "100mb",
    },
  },
};