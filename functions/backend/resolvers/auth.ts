import type { Session } from "../types";

const login = async (): Promise<Session> => {};

export const resolvers = {
  Mutation: {
    login,
  },
};
