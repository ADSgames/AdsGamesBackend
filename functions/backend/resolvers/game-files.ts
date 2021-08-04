import { Converter } from "aws-sdk/clients/dynamodb";

import type { GameFile } from "../types";
import { put } from "../helpers/operations";
import { TABLES } from "../constants/tables";

const addGameFile = async (_: unknown, file: GameFile): Promise<boolean> => {
  return put({ TableName: TABLES.GAME_IMAGES, Item: Converter.marshall(file) });
};

export const resolvers = {
  Mutation: {
    addGameFile,
  },
};
