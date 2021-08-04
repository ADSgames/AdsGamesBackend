import { TABLES } from "../constants/tables";
import { FeaturedGameController } from "../controllers/FeaturedGame.controller";
import type { FeaturedGame } from "../types";

const getFeaturedGames = async (): Promise<FeaturedGame[]> => {
  return new FeaturedGameController(TABLES.FEATURED_GAMES).listFeaturedGames();
};

const addFeaturedGame = async (
  _: unknown,
  featured: FeaturedGame
): Promise<boolean> => {
  return new FeaturedGameController(TABLES.FEATURED_GAMES).createFeaturedGame(
    featured
  );
};

export const resolvers = {
  Query: {
    featuredGames: getFeaturedGames,
  },
  Mutation: {
    addFeaturedGame,
  },
};
