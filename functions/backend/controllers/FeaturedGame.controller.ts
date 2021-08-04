import { ApolloError } from "apollo-server-lambda";
import { Converter } from "aws-sdk/clients/dynamodb";
import { scan, put } from "../helpers/operations";

import type { FeaturedGame } from "../types";

/**
 * FeaturedGame controller encapsulates functions related to FeaturedGames in DynamoDB
 */
export class FeaturedGameController {
  private readonly tableName: string;

  public constructor(tableName: string) {
    this.tableName = tableName;
  }

  /**
   * List FeaturedGames
   * @returns All FeaturedGames in system
   */
  public async listFeaturedGames(): Promise<FeaturedGame[]> {
    return scan<FeaturedGame>({ TableName: this.tableName });
  }

  public async createFeaturedGame(game: FeaturedGame): Promise<boolean> {
    const current = await this.listFeaturedGames();

    if (current.find((featured) => featured.place === game.place)) {
      throw new ApolloError("Featured game exists at postition", "ID_CONFLICT");
    }

    return put({
      TableName: this.tableName,
      Item: Converter.marshall(game),
    });
  }
}
