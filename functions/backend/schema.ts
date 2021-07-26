import { gql } from "apollo-server-lambda";

export const typeDefs = gql`
  type GameControl {
    game_id: ID!
    type: String!
    description: String!
  }

  type GameImage {
    game_id: ID!
    type: String!
    url: String!
  }

  type GameFile {
    game_id: ID!
    platform: String!
    url: String!
  }

  type FeaturedGame {
    game_id: ID!
    place: Int!
  }

  type Game {
    game_id: ID!
    short_name: String!
    name: String!
    description: String!
    visible: Boolean!
  }

  type ExtendedGame {
    game_id: ID!
    short_name: String!
    name: String!
    description: String!
    visible: Boolean
    controls: [GameControl!]!
    images: [GameImage!]!
    files: [GameFile!]!
  }

  type Query {
    games: [ExtendedGame!]!
    game(game_id: String!): ExtendedGame
    featuredGames: [FeaturedGame!]!
    controls: [GameControl!]!
  }

  type Mutation {
    addGame(
      game_id: ID!
      short_name: String!
      name: String!
      description: String!
      visible: Boolean!
    ): Boolean!
    updateGame(
      game_id: ID!
      short_name: String!
      name: String!
      description: String!
      visible: Boolean!
    ): Boolean!
    addGameImage(game_id: ID!, type: String!, url: String!): Boolean!
    addGameFile(game_id: ID!, platform: String!, url: String!): Boolean!
    addFeaturedGame(game_id: ID!, place: Int!): Boolean!
    addControl(game_id: ID!, type: String!, description: String!): Boolean!
  }
`;
