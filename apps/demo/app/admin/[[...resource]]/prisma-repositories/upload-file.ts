'use server'
import { writeFile, mkdir } from "fs/promises";
import { revalidatePath } from "next/cache";
import path from "path";

export async function uploadFile(file: File) {
  const uploadsDir = path.join(process.cwd(), "public/uploads");
  await mkdir(uploadsDir, { recursive: true });
  const arrayBuffer = await file.arrayBuffer();
  const buffer = new Uint8Array(arrayBuffer);
  const filePath = path.join(uploadsDir, file.name);
  await writeFile(filePath, buffer);
  revalidatePath("/");
}