"use server";
import { writeFile } from "fs/promises";
import { revalidatePath } from "next/cache";

export async function uploadFile(file: File) {
  const arrayBuffer = await file.arrayBuffer();
  const buffer = new Uint8Array(arrayBuffer);

  await writeFile(`./public/uploads/${file.name}`, buffer);

  revalidatePath("/");
}