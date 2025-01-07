/* eslint-disable @typescript-eslint/no-explicit-any */
import fs from "node:fs";
import path from "node:path";
import { Buffer } from "node:buffer";
import express from "express";
import bodyParser from "body-parser";
import { v4 as uuid } from "uuid";

const app = express();
app.use(bodyParser.json());

app.get("/api/test", (_req, resp) => {
  resp.end("test");
});

app.post("/api/extract", async function (req, resp) {
  const sourceDir = req.body.sourceDir;
  if (!sourceDir) {
    resp.status(400).json({ err: "sourcedDir is required" });
    return;
  }
  try {
    const curWorkDir = process.cwd();
    const outputDir = path.join(curWorkDir, "output");
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }
    await extractFiles(sourceDir, outputDir);
    resp.status(200).json({ msg: "Extract succeed!" });
  } catch (reason) {
    resp.status(500).json({ err: reason });
  }
});

const unrecognized_file = 0;
const exif_file = 1;
const ftyp_video_file = 2;
const jpeg_file = 3;
const png_file = 4;

const exif_image_magic = Buffer.from([0xff, 0xd8, 0xff, 0xe1]);
const ftypisom_video_magic = Buffer.from([
  0x00, 0x00, 0x00, 0x00, 0x00, 0x18, 0x66, 0x74, 0x79, 0x70,
]);
const ftypmp42_video_magic = Buffer.from([
  0x00, 0x00, 0x00, 0x00, 0x00, 0x20, 0x66, 0x74, 0x79, 0x70,
]);
const jpeg_image_magic = Buffer.from([0xff, 0xd8, 0xff, 0xe0]);
const png_image_magic = Buffer.from([
  0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a,
]);

// console.log(exif_image_magic.toString());
// console.log(ftypisom_video_magic.toString());
// console.log(ftypmp42_video_magic.toString());
// console.log(jpeg_image_magic.toString());
// console.log(png_image_magic.toString());

async function extractFiles(sourceDir: string, targetDir: string) {
  const files = fs.readdirSync(sourceDir);
  for (const file of files) {
    const filePath = path.join(sourceDir, file);
    const stat = fs.statSync(filePath);
    if (
      stat.isDirectory() ||
      !file.endsWith(".ndf") ||
      stat.size < 300 * 1024
    ) {
      continue;
    }
    const fileType = getFileType(filePath);
    if (fileType === unrecognized_file) {
      continue;
    }
    const dstPath = path.join(targetDir, uuid() + getFileExtension(fileType));
    let buf = fs.readFileSync(filePath);
    if (fileType === ftyp_video_file && buf.length > 2) {
      buf = buf.slice(2);
    }
    fs.writeFileSync(dstPath, buf);
  }
}

const getFileType = (filePath: string): number => {
  const buf = fs.readFileSync(filePath);
  if (compareHead(buf, exif_image_magic, 4)) {
    return exif_file;
  } else if (compareHead(buf, png_image_magic, 8)) {
    return png_file;
  } else if (compareHead(buf, jpeg_image_magic, 4)) {
    return jpeg_file;
  } else if (
    compareHead(buf, ftypmp42_video_magic, 10) ||
    compareHead(buf, ftypisom_video_magic, 10)
  ) {
    return ftyp_video_file;
  } else {
    return unrecognized_file;
  }
};

function compareHead(buf: Buffer, pattern: Buffer, cnt: number): boolean {
  for (let i = 0; i < cnt; i++) {
    if (buf[i] !== pattern[i]) {
      return false;
    }
  }
  return true;
}

const getFileExtension = (fileType: number): string => {
  switch (fileType) {
    case exif_file:
    case jpeg_file:
      return ".jpg";
    case png_file:
      return ".png";
    case ftyp_video_file:
      return ".mp4";
    default:
      return "";
  }
};

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
