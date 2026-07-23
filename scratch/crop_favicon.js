const fs = require('fs');
const path = require('path');
const zlib = require('zlib');

function cropPNG(inputBuffer) {
  // Check PNG signature
  if (inputBuffer.readUInt32BE(0) !== 0x89504E47) {
    throw new Error('Not a valid PNG');
  }

  let offset = 8;
  let width = 0;
  let height = 0;
  let bitDepth = 0;
  let colorType = 0;
  let idatChunks = [];

  while (offset < inputBuffer.length) {
    const length = inputBuffer.readUInt32BE(offset);
    const type = inputBuffer.toString('ascii', offset + 4, offset + 8);
    const data = inputBuffer.slice(offset + 8, offset + 8 + length);

    if (type === 'IHDR') {
      width = data.readUInt32BE(0);
      height = data.readUInt32BE(4);
      bitDepth = data[8];
      colorType = data[9];
    } else if (type === 'IDAT') {
      idatChunks.push(data);
    } else if (type === 'IEND') {
      break;
    }

    offset += 12 + length;
  }

  if (colorType !== 6 || bitDepth !== 8) {
    // Only RGBA 8-bit supported natively by this simple decoder
    console.log('Color type:', colorType, 'Bit depth:', bitDepth);
    return null;
  }

  const decompressed = zlib.inflateSync(Buffer.concat(idatChunks));
  const bpp = 4;
  const stride = 1 + width * bpp;

  let minX = width, minY = height, maxX = 0, maxY = 0;
  const rawPixels = Buffer.alloc(width * height * 4);

  let prevLine = Buffer.alloc(width * bpp);

  for (let y = 0; y < height; y++) {
    const filterType = decompressed[y * stride];
    const lineData = decompressed.slice(y * stride + 1, (y + 1) * stride);
    const currentLine = Buffer.alloc(width * bpp);

    for (let x = 0; x < width * bpp; x++) {
      let val = lineData[x];
      const a = x >= bpp ? currentLine[x - bpp] : 0;
      const b = prevLine[x];
      const c = x >= bpp ? prevLine[x - bpp] : 0;

      if (filterType === 1) val = (val + a) & 0xFF;
      else if (filterType === 2) val = (val + b) & 0xFF;
      else if (filterType === 3) val = (val + Math.floor((a + b) / 2)) & 0xFF;
      else if (filterType === 4) {
        const p = a + b - c;
        const pa = Math.abs(p - a);
        const pb = Math.abs(p - b);
        const pc = Math.abs(p - c);
        let pr;
        if (pa <= pb && pa <= pc) pr = a;
        else if (pb <= pc) pr = b;
        else pr = c;
        val = (val + pr) & 0xFF;
      }
      currentLine[x] = val;
    }
    prevLine = currentLine;

    for (let x = 0; x < width; x++) {
      const pxIdx = (y * width + x) * 4;
      const alpha = currentLine[x * 4 + 3];
      rawPixels[pxIdx] = currentLine[x * 4];
      rawPixels[pxIdx + 1] = currentLine[x * 4 + 1];
      rawPixels[pxIdx + 2] = currentLine[x * 4 + 2];
      rawPixels[pxIdx + 3] = alpha;

      if (alpha > 10) {
        if (x < minX) minX = x;
        if (x > maxX) maxX = x;
        if (y < minY) minY = y;
        if (y > maxY) maxY = y;
      }
    }
  }

  console.log(`Bounding Box: X[${minX}..${maxX}], Y[${minY}..${maxY}] in Original Size [${width}x${height}]`);

  const cropW = maxX - minX + 1;
  const cropH = maxY - minY + 1;
  const maxDim = Math.max(cropW, cropH);
  const padding = Math.floor(maxDim * 0.02); // 2% padding
  const squareDim = maxDim + padding * 2;

  const outBuffer = Buffer.alloc(squareDim * squareDim * 4);
  const offsetX = Math.floor((squareDim - cropW) / 2);
  const offsetY = Math.floor((squareDim - cropH) / 2);

  for (let cy = 0; cy < cropH; cy++) {
    for (let cx = 0; cx < cropW; cx++) {
      const srcIdx = ((minY + cy) * width + (minX + cx)) * 4;
      const dstIdx = ((offsetY + cy) * squareDim + (offsetX + cx)) * 4;
      outBuffer[dstIdx] = rawPixels[srcIdx];
      outBuffer[dstIdx + 1] = rawPixels[srcIdx + 1];
      outBuffer[dstIdx + 2] = rawPixels[srcIdx + 2];
      outBuffer[dstIdx + 3] = rawPixels[srcIdx + 3];
    }
  }

  // Encode squareDim x squareDim PNG (Filter 0)
  const rawIDAT = Buffer.alloc(squareDim * (1 + squareDim * 4));
  for (let y = 0; y < squareDim; y++) {
    rawIDAT[y * (1 + squareDim * 4)] = 0; // Filter 0
    outBuffer.copy(rawIDAT, y * (1 + squareDim * 4) + 1, y * squareDim * 4, (y + 1) * squareDim * 4);
  }

  const compressedIDAT = zlib.deflateSync(rawIDAT);

  function makeChunk(type, data) {
    const len = Buffer.alloc(4);
    len.writeUInt32BE(data.length, 0);
    const typeBuf = Buffer.from(type, 'ascii');
    const crcVal = crc32(Buffer.concat([typeBuf, data]));
    const crcBuf = Buffer.alloc(4);
    crcBuf.writeUInt32BE(crcVal, 0);
    return Buffer.concat([len, typeBuf, data, crcBuf]);
  }

  function crc32(buf) {
    let crc = -1;
    for (let i = 0; i < buf.length; i++) {
      crc ^= buf[i];
      for (let j = 0; j < 8; j++) {
        crc = (crc >>> 1) ^ (-(crc & 1) & 0xEDB88320);
      }
    }
    return (crc ^ -1) >>> 0;
  }

  const sig = Buffer.from([0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A]);
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(squareDim, 0);
  ihdr.writeUInt32BE(squareDim, 4);
  ihdr[8] = 8; // 8 bits
  ihdr[9] = 6; // RGBA
  ihdr[10] = 0; ihdr[11] = 0; ihdr[12] = 0;

  const chunkIHDR = makeChunk('IHDR', ihdr);
  const chunkIDAT = makeChunk('IDAT', compressedIDAT);
  const chunkIEND = makeChunk('IEND', Buffer.alloc(0));

  return Buffer.concat([sig, chunkIHDR, chunkIDAT, chunkIEND]);
}

const inputPath = path.join(__dirname, '..', 'newfavicon.png');
const inputBuf = fs.readFileSync(inputPath);
const croppedBuf = cropPNG(inputBuf);

if (croppedBuf) {
  const dests = [
    path.join(__dirname, '..', 'newfavicon.png'),
    path.join(__dirname, '..', 'public', 'favicon.png'),
    path.join(__dirname, '..', 'public', 'favicon.ico'),
    path.join(__dirname, '..', 'app', 'favicon.ico'),
    path.join(__dirname, '..', 'app', 'icon.png'),
    path.join(__dirname, '..', 'app', 'apple-icon.png')
  ];

  for (const dest of dests) {
    fs.writeFileSync(dest, croppedBuf);
    console.log('Saved cropped favicon to:', dest);
  }
}
