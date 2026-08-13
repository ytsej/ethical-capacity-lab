import { writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const source = new URL("../app/icon.svg", import.meta.url);
const appleIcon = new URL("../app/apple-icon.png", import.meta.url);
const favicon = new URL("../app/favicon.ico", import.meta.url);

const applePng = await sharp(fileURLToPath(source)).resize(180, 180).png().toBuffer();
await writeFile(appleIcon, applePng);

const faviconPng = await sharp(fileURLToPath(source)).resize(32, 32).png().toBuffer();
const header = Buffer.alloc(22);
header.writeUInt16LE(0, 0);
header.writeUInt16LE(1, 2);
header.writeUInt16LE(1, 4);
header.writeUInt8(32, 6);
header.writeUInt8(32, 7);
header.writeUInt8(0, 8);
header.writeUInt8(0, 9);
header.writeUInt16LE(1, 10);
header.writeUInt16LE(32, 12);
header.writeUInt32LE(faviconPng.length, 14);
header.writeUInt32LE(22, 18);
await writeFile(favicon, Buffer.concat([header, faviconPng]));
