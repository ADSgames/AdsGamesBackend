import { ApolloServer } from "apollo-server-lambda";
import { typeDefs } from "./schema";

import { resolvers as gameResolvers } from "./resolvers/games";
import { resolvers as featuredGameResolvers } from "./resolvers/featured-games";
import { resolvers as extendedGameResolvers } from "./resolvers/extended-game";
import { resolvers as gameControlResolvers } from "./resolvers/game-controls";
import { resolvers as gameFileResolvers } from "./resolvers/game-files";
import { resolvers as gameImageResolvers } from "./resolvers/game-images";

const server = new ApolloServer({
  resolvers: [
    gameImageResolvers,
    gameFileResolvers,
    gameControlResolvers,
    extendedGameResolvers,
    gameResolvers,
    featuredGameResolvers,
  ],
  typeDefs,
  cacheControl: {
    defaultMaxAge: 0,
  },
  playground: true,
  introspection: true,
});

export const graphql = server.createHandler({
  cors: {
    origin: ["http://localhost:3000"],
    credentials: true,
  },
});
