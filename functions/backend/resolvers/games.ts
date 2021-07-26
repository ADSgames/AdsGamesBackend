import type {
  GameControl,
  Game,
  FeaturedGame,
  GameImage,
  GameFile,
} from "../types";
import { get, scan, query, put } from "../helpers/operations";
import { TABLES } from "../constants/tables";
import { Converter } from "aws-sdk/clients/dynamodb";

const getGames = async (): Promise<Game[]> => {
  return scan<Game>({ TableName: TABLES.GAMES });
};

const getGame = async (
  _: unknown,
  { game_id }: { game_id: string }
): Promise<Game | null> => {
  return get<Game>({ TableName: TABLES.GAMES, Key: { id: { S: game_id } } });
};

const getFeaturedGames = async (): Promise<FeaturedGame[]> => {
  return scan<FeaturedGame>({ TableName: TABLES.FEATURED_GAMES });
};

const addFeaturedGame = async (
  _: unknown,
  featured: FeaturedGame
): Promise<boolean> => {
  return put({
    TableName: TABLES.FEATURED_GAMES,
    Item: Converter.marshall(featured),
  });
};

const getImagesForGame = async (game: Game): Promise<GameImage[]> => {
  return query<GameImage>({
    TableName: TABLES.GAME_IMAGES,
    FilterExpression: "game_id = :value",
    ExpressionAttributeValues: { ":value": { S: game.game_id } },
  });
};

const getFilesForGame = async (game: Game): Promise<GameFile[]> => {
  return query<GameFile>({
    TableName: TABLES.GAME_FILES,
    FilterExpression: "game_id = :value",
    ExpressionAttributeValues: { ":value": { S: game.game_id } },
  });
};

const getControls = async (): Promise<GameControl[]> => {
  return scan<GameControl>({ TableName: TABLES.GAME_CONTROLS });
};

const getControlsForGame = async (game: Game): Promise<GameControl[]> => {
  return query<GameControl>({
    TableName: TABLES.GAME_CONTROLS,
    KeyConditionExpression: "game_id = :value",
    ExpressionAttributeValues: { ":value": { S: game.game_id } },
  });
};

const addGame = async (_: unknown, game: Game): Promise<boolean> => {
  return put({ TableName: TABLES.GAMES, Item: Converter.marshall(game) });
};

const addControl = async (
  _: unknown,
  control: GameControl
): Promise<boolean> => {
  return put({
    TableName: TABLES.GAME_CONTROLS,
    Item: Converter.marshall(control),
  });
};

const addGameImage = async (_: unknown, image: GameImage): Promise<boolean> => {
  return put({
    TableName: TABLES.GAME_IMAGES,
    Item: Converter.marshall(image),
  });
};

const addGameFile = async (_: unknown, file: GameFile): Promise<boolean> => {
  return put({ TableName: TABLES.GAME_IMAGES, Item: Converter.marshall(file) });
};

export const resolvers = {
  Query: {
    games: getGames,
    game: getGame,
    featuredGames: getFeaturedGames,
    controls: getControls,
  },
  Mutation: {
    addGame,
    addFeaturedGame,
    addControl,
    addGameImage,
    addGameFile,
  },
  ExtendedGame: {
    controls: getControlsForGame,
    images: getImagesForGame,
    files: getFilesForGame,
  },
};
