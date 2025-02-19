'use server';

import { put } from '@vercel/blob';

export async function uploadFile(blob: Blob, fileName: string) {
  // eslint-disable-next-line turbo/no-undeclared-env-vars
  if (process.env.BLOB_READ_WRITE_TOKEN) {
    await put('adminext-demo/' + fileName, blob, {
      access: 'public',
    });
  }
}
