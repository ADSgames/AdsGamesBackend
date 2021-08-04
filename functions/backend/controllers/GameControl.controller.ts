import { query } from "../helpers/operations";

import type { GameControl } from "../types";

/**
 * GameControlController encapsulates functions related to GameControls in DynamoDB
 */
export class GameControlController {
  private readonly tableName: string;

  public constructor(tableName: string) {
    this.tableName = tableName;
  }

  /**
   * Get GameControls by Game ID
   * @returns List of controls for game
   */
  public async getControlsForGame(gameId: string): Promise<GameControl[]> {
    return query<GameControl>({
      TableName: this.tableName,
      KeyConditionExpression: "game_id = :value",
      ExpressionAttributeValues: { ":value": { S: gameId } },
    });
  }
}
