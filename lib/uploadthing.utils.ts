"use server";
import { UTApi } from "uploadthing/server";

const utApi = new UTApi();

export const deleteFile = async (key: string) => {
  "use server";
  // authenticate user
  // verify they have permission to delete
  await utApi.deleteFiles(key);
};
