import format from "date-fns/format";
import fs from "fs";
import crypto from "crypto";
import { resolve } from "path";

import logger from "@shared/util/logger";
import { IUpload, IFile } from "@shared/util/dtos";
import Budget from "@modules/budgets/entities/Budget";
import User from "@modules/users/entities/User";
import Provider from "@modules/providers/entities/Provider";

export const formatDate = (date: Date | number) => {
  const value = format(date, "yyyy-MM-dd HH:mm:ss");
  return value;
  return date;
};

export const processedFiles = async (
  files: [IUpload],
  nameModel: string,
  model: Budget | User | Provider
): Promise<IFile[] | undefined> => {
  const archives: IFile[] = [];

  await Promise.all(
    files.map(async file => {
      const { filename, createReadStream } = await file;

      const fileHash = crypto.randomBytes(10).toString("hex");
      const archive = `${fileHash}-${filename}`;

      const path = resolve("./tmp", archive);
      const stream = createReadStream();

      await new Promise(resolve => {
        stream
          .pipe(fs.createWriteStream(path))
          .on("finish", () => {
            resolve(
              archives.push({
                filename: `tmp/${archive}`,
                path
              })
            );
          })
          .on("error", () =>
            logger.warn(
              `Não foi possível gravar anexo ... ${nameModel}: ${model.id}:`
            )
          );
      });
    })
  );

  return archives;
};
