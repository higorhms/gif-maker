import type { NextApiRequest, NextApiResponse } from "next";
import sharp from "sharp";
import {
  downloadFileFromUrl,
  getNameAndExtensionFromUrl,
  makeTempFilePathFromUrl,
  uploadFileFromLocalPath,
} from "@/helpers/files";

type ResponseData = {
  grayscaledUrl: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  const { body } = req;
  const { url } = body;

  // download the image to our local filesystem
  const localInputUrl = await downloadFileFromUrl(url);

  // create a temp path for the output file
  const localOutputPath = makeTempFilePathFromUrl(url);

  // use sharp to grayscale the image
  await sharp(localInputUrl).grayscale().toFile(localOutputPath);

  // upload the grayscaled image to AWS
  const { basename, extension } = getNameAndExtensionFromUrl(url);
  const uploadedUrl = await uploadFileFromLocalPath(
    localOutputPath,
    `${basename}_grayscaled${extension}`
  );

  // return the image back to the client
  if (uploadedUrl) {
    return res.status(200).json({ grayscaledUrl: uploadedUrl });
  }

  return res.status(500);
}

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "100mb",
    },
  },
};
