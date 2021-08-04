import type { GameControl, Game, GameImage, GameFile } from "../types";
import { TABLES } from "../constants/tables";
import { GameControlController } from "../controllers/GameControl.controller";
import { GameFileController } from "../controllers/GameFile.controller";
import { GameImageController } from "../controllers/GameImage.controller";

const getImagesForGame = async (game: Game): Promise<GameImage[]> => {
  return new GameImageController(TABLES.GAME_IMAGES).getImagesForGame(
    game.game_id
  );
};

const getFilesForGame = async (game: Game): Promise<GameFile[]> => {
  return new GameFileController(TABLES.GAME_FILES).getFilesForGame(
    game.game_id
  );
};

const getControlsForGame = async (game: Game): Promise<GameControl[]> => {
  return new GameControlController(TABLES.GAME_CONTROLS).getControlsForGame(
    game.game_id
  );
};

export const resolvers = {
  ExtendedGame: {
    controls: getControlsForGame,
    images: getImagesForGame,
    files: getFilesForGame,
  },
};
