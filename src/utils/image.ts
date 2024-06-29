'use server';

import sharp from 'sharp';
import { promises as fs } from 'fs';
import path from 'path';

import { BLURRED_IMAGE } from '@/constants/blurred-image';

function bufferToBase64(buffer: Buffer): string {
  return `data:image/png;base64,${buffer.toString('base64')}`;
}

async function getFileBufferLocal(filepath: string) {
  const realFilepath = path.join(process.cwd(), 'public', filepath);

  return fs.readFile(realFilepath);
}

async function getFileBufferRemote(url: string) {
  const response = await fetch(url);

  return Buffer.from(await response.arrayBuffer());
}

function getFileBuffer(src: string) {
  const isRemote = src.startsWith('http');

  return isRemote ? getFileBufferRemote(src) : getFileBufferLocal(src);
}

const cache = new Map();

export async function getPlaceholderImage(filepath: string) {
  if (cache.has(filepath)) {
    return cache.get(filepath);
  }

  try {
    const originalBuffer = await getFileBuffer(filepath);
    const resizedBuffer = await sharp(originalBuffer).resize(10, 10).toBuffer();
    const placeholder = bufferToBase64(resizedBuffer);

    const result = {
      src: filepath,
      placeholder,
    };

    cache.set(filepath, result);

    return result;
  } catch {
    const result = {
      src: filepath,
      placeholder: BLURRED_IMAGE,
    };

    cache.set(filepath, result);

    return result;
  }
}
