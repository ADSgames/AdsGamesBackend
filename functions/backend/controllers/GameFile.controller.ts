import { query } from "../helpers/operations";

import type { GameFile } from "../types";

/**
 * GameFileController encapsulates functions related to GameFiles in DynamoDB
 */
export class GameFileController {
  private readonly tableName: string;

  public constructor(tableName: string) {
    this.tableName = tableName;
  }

  /**
   * Get GameFiles by Game ID
   * @returns List of files for game
   */
  public async getFilesForGame(gameId: string): Promise<GameFile[]> {
    return query<GameFile>({
      TableName: this.tableName,
      KeyConditionExpression: "game_id = :value",
      ExpressionAttributeValues: { ":value": { S: gameId } },
    });
  }
}
