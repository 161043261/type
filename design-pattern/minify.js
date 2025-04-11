import { minify } from "terser";
import fs from "node:fs";
import path from "node:path";

/**
 *
 * @param {string} dir
 */
function traverseDir(dir) {
  fs.readdirSync(dir).forEach((file) => {
    const relativePath = path.join(dir, file);
    const stat = fs.statSync(relativePath);
    if (stat.isDirectory()) {
      traverseDir(relativePath);
    } else if (path.extname(relativePath) === ".js") {
      minifyFile(relativePath);
    }
  });
}

/**
 *
 * @param {string} relativePath
 */
async function minifyFile(relativePath) {
  try {
    const code = fs.readFileSync(relativePath, "utf8");
    const output = await minify(code);
    fs.writeFileSync(relativePath, output.code, "utf8");
  } catch (err) {
    console.error(err);
  }
}

traverseDir("dist");
