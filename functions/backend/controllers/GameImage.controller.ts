import { query } from "../helpers/operations";

import type { GameImage } from "../types";

/**
 * GameImageController encapsulates functions related to GameImages in DynamoDB
 */
export class GameImageController {
  private readonly tableName: string;

  public constructor(tableName: string) {
    this.tableName = tableName;
  }

  /**
   * Get GameImages by Game ID
   * @returns List of images for game
   */
  public async getImagesForGame(gameId: string): Promise<GameImage[]> {
    return query<GameImage>({
      TableName: this.tableName,
      KeyConditionExpression: "game_id = :value",
      ExpressionAttributeValues: { ":value": { S: gameId } },
    });
  }
}
