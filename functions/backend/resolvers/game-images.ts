import { Converter } from "aws-sdk/clients/dynamodb";

import type { GameImage } from "../types";
import { put } from "../helpers/operations";
import { TABLES } from "../constants/tables";

const addGameImage = async (_: unknown, image: GameImage): Promise<boolean> => {
  return put({
    TableName: TABLES.GAME_IMAGES,
    Item: Converter.marshall(image),
  });
};

export const resolvers = {
  Mutation: {
    addGameImage,
  },
};
