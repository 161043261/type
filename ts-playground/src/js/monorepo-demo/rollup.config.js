// @ts-check
import typescript from "@rollup/plugin-typescript";
import nodeResolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import json from "@rollup/plugin-json";
import dts from "rollup-plugin-dts";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const packagesDir = path.resolve(__dirname, "packages");
const pkgs = fs.readdirSync(packagesDir);

/**
 *
 * @param {string} path
 * @returns
 */
function output(path) {
  return [
    {
      input: [`./packages/${path}/src/index.ts`],
      output: [
        {
          file: `./packages/${path}/dist/index.cjs.js`,
          format: "cjs",
          sourcemap: true,
        },
        {
          file: `./packages/${path}/dist/index.esm.js`,
          format: "esm",
          sourcemap: true,
        },
      ],
      plugins: [
        typescript(),
        nodeResolve(),
        commonjs(),
        json(),
      ],
    },
    {
      input: `./packages/${path}/src/index.ts`,
      output: [
        { file: `./packages/${path}/dist/index.cjs.d.ts`, format: "cjs" },
        { file: `./packages/${path}/dist/index.esm.d.ts`, format: "esm" },
      ],
      plugins: [dts()],
    },
  ];
}

export default [...pkgs.map((path) => output(path)).flat()];
