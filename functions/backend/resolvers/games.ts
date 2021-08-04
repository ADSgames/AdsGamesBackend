import type { Game } from "../types";
import { TABLES } from "../constants/tables";
import { GameController } from "../controllers/Game.controller";

const getGames = async (): Promise<Game[]> => {
  return new GameController(TABLES.GAMES).listGames();
};

const getGame = async (
  _: unknown,
  { game_id }: { game_id: string }
): Promise<Game | null> => {
  return new GameController(TABLES.GAMES).getGameById(game_id);
};

const addGame = async (_: unknown, game: Game): Promise<boolean> => {
  return new GameController(TABLES.GAMES).createGame(game);
};

export const resolvers = {
  Query: {
    games: getGames,
    game: getGame,
  },
  Mutation: {
    addGame,
  },
};
