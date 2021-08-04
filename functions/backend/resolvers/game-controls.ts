import { Converter } from "aws-sdk/clients/dynamodb";

import type { GameControl } from "../types";
import { put } from "../helpers/operations";
import { TABLES } from "../constants/tables";

const addControl = async (
  _: unknown,
  control: GameControl
): Promise<boolean> => {
  return put({
    TableName: TABLES.GAME_CONTROLS,
    Item: Converter.marshall(control),
  });
};

export const resolvers = {
  Mutation: {
    addControl,
  },
};
