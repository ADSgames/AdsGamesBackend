export type GameControl = {
  game_id: string;
  description: string;
  type: string;
};

export type GameImage = {
  game_id: string;
  type: "large" | "thumbnail" | "wide";
  url: string;
};

export type GameFile = {
  game_id: string;
  platform: "linux" | "mac" | "source" | "web" | "windows";
  url: string;
};

export type Game = {
  game_id: string;
  short_name: string;
  name: string;
  description: string;
  visible: boolean;
};

export type GameInput = {
  game_input_id: string;
  short_name: string;
  name: string;
  description: string;
  visible: boolean;
};

export type FeaturedGame = {
  game_id: string;
  place: number;
};
