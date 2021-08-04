import { Converter } from "aws-sdk/clients/dynamodb";

import { get, put, scan } from "../helpers/operations";

import type { Game } from "../types";

/**
 * Game controller encapsulates functions related to Games in DynamoDB
 */
export class GameController {
  private readonly tableName: string;

  public constructor(tableName: string) {
    this.tableName = tableName;
  }

  /**
   * List Games
   * @returns All games in system
   */
  public async listGames(): Promise<Game[]> {
    return scan<Game>({ TableName: this.tableName });
  }

  /**
   * Get Game by ID
   * @returns Game by id
   */
  public async getGameById(gameId: string): Promise<Game | null> {
    return get<Game>({ TableName: this.tableName, Key: { id: { S: gameId } } });
  }

  /**
   * Create Game
   * @param game Game to create
   * @returns
   */
  public async createGame(game: Game): Promise<boolean> {
    return put({ TableName: this.tableName, Item: Converter.marshall(game) });
  }
}
