import express from "express";
import multer from "multer";
import path from "path";
import fs from "fs";
import { v4 as uuidv4 } from "uuid";

const app = express();
const upload = multer();

app.use(express.static(path.join(__dirname, "frontend")));

app.post("/convert", upload.none(), async (req, res) => {
  const sourceDir = req.body.sourceDir;

  if (!sourceDir) {
    return res.status(400).json({ error: "Source directory is required" });
  }

  try {
    const outputDir = await getOutputDir();
    await convertFiles(sourceDir, outputDir);
    res.status(200).json({ message: "Files converted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const getOutputDir = async (): Promise<string> => {
  const exePath = process.cwd();
  const outputDir = path.join(exePath, "output");

  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  return outputDir;
};

const convertFiles = async (
  sourceDir: string,
  targetDir: string
): Promise<void> => {
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
    if (fileType === UNRECOGNIZED_FILE) {
      continue;
    }

    const destPath = path.join(
      targetDir,
      uuidv4() + getFileExtension(fileType)
    );
    let data = fs.readFileSync(filePath);

    if (fileType === FTYP_VIDEO_FILE && data.length > 2) {
      data = data.slice(2);
    }

    fs.writeFileSync(destPath, data);
  }
};

const getFileType = (filePath: string): number => {
  const data = fs.readFileSync(filePath);
  if (compareFromHead(data, EXIF_IMAGE_MAGIC, 4)) {
    return EXIF_FILE;
  } else if (compareFromHead(data, PNG_IMAGE_MAGIC, 8)) {
    return PNG_FILE;
  } else if (compareFromHead(data, JPEG_IMAGE_MAGIC, 4)) {
    return JPEG_FILE;
  } else if (
    compareFromHead(data, FTYPMP42_VIDEO_MAGIC, 10) ||
    compareFromHead(data, FTYPISOM_VIDEO_MAGIC, 10)
  ) {
    return FTYP_VIDEO_FILE;
  } else {
    return UNRECOGNIZED_FILE;
  }
};

const compareFromHead = (
  toBeCompared: Buffer,
  pattern: Buffer,
  nPattern: number
): boolean => {
  for (let i = 0; i < nPattern; i++) {
    if (toBeCompared[i] !== pattern[i]) {
      return false;
    }
  }
  return true;
};

const getFileExtension = (fileType: number): string => {
  switch (fileType) {
    case EXIF_FILE:
    case JPEG_FILE:
      return ".jpg";
    case PNG_FILE:
      return ".png";
    case FTYP_VIDEO_FILE:
      return ".mp4";
    default:
      return "";
  }
};

const UNRECOGNIZED_FILE = 0;
const EXIF_FILE = 1;
const PNG_FILE = 2;
const JPEG_FILE = 3;
const FTYP_VIDEO_FILE = 4;

const EXIF_IMAGE_MAGIC = Buffer.from([0xff, 0xd8, 0xff, 0xe1]);
const PNG_IMAGE_MAGIC = Buffer.from([
  0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a,
]);
const JPEG_IMAGE_MAGIC = Buffer.from([0xff, 0xd8, 0xff, 0xe0]);
const FTYPISOM_VIDEO_MAGIC = Buffer.from([
  0x00, 0x00, 0x00, 0x00, 0x00, 0x18, 0x66, 0x74, 0x79, 0x70,
]);
const FTYPMP42_VIDEO_MAGIC = Buffer.from([
  0x00, 0x00, 0x00, 0x00, 0x00, 0x20, 0x66, 0x74, 0x79, 0x70,
]);

app.listen(8080, () => {
  console.log("Server is running on port 8080");
});
