import fs from "fs";
import path from "path";
import tmp from "tmp";
import fetch from "node-fetch";
import { nanoid } from "nanoid";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import {
  accessKeyId,
  secretAccessKey,
  bucket,
  region,
  awsS3Url,
} from "../../credentials";

export const getNameAndExtensionFromUrl = (
  url: string
): { basename: string; filename: string; extension: string } => {
  if (!url) {
    throw new Error("No URL provided.");
  }

  const extension = path.extname(url);

  const basename = path.basename(url, extension);

  if (!basename) {
    throw new Error("No filename found for the provided URL.");
  }

  return { basename, filename: basename + extension, extension };
};

export const makeTempFilePath = (filename: string = `${Date.now()}`): string => {
  const tmpobj = tmp.fileSync({
    name: `${nanoid(8)}-${filename}`,
  });
  return tmpobj.name;
};

export const makeTempFilePathFromUrl = (url: string): string => {
  const { filename } = getNameAndExtensionFromUrl(url);
  const localFileUrl = makeTempFilePath(filename);
  return localFileUrl;
};

export const downloadFileFromUrl = async (url: string) => {
  try {
    const { filename } = getNameAndExtensionFromUrl(url);
    const tempFilepath = makeTempFilePath(filename);
    const res = await fetch(url);
    const fileStream = fs.createWriteStream(tempFilepath);
    await new Promise((resolve, reject) => {
      if (!res || !res.body) {
        throw new Error("No response found for the provided URL.");
      }
      res.body.pipe(fileStream);
      res.body.on("error", reject);
      fileStream.on("finish", resolve);
    });
    return tempFilepath;
  } catch (error) {
    console.error("An error occurred while downloading:", error);
  }
};

export const uploadFileFromLocalPath = async (
  localPath: string,
  storageName: string
) => {
  try {
    const s3 = new S3Client({
      region,
      credentials: {
        accessKeyId,
        secretAccessKey,
      },
    });

    const params = {
      Bucket: bucket,
      Key: storageName,
      Body: fs.readFileSync(localPath),
    };

    const command = new PutObjectCommand(params);
    await s3.send(command);
    const s3Url = awsS3Url + storageName;
    return s3Url;
  } catch (error) {
    console.error("An error occurred while uploading:", error);
  }
};
