import fs from "fs";

export const deleteFile = async (filePath: string): Promise<void> => {
  try {
    await fs.stat(filePath, (error, _stats) => {
      if (error) throw new Error(`error: ${error}`);
      // console.log('filePath', filePath);
      console.log("Path is file:", _stats.isFile());
      console.log("Path is directory:", _stats.isDirectory());

      fs.unlink(filePath, () => {
        if (error) throw new Error("The file could not be deleted..");
      });
    });
  } catch {
    return;
  }

  // await fs.promises.unlink(filePath);
};
