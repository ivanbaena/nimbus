import { typeDefs } from '../schema';
import { resolvers } from '../resolvers';
import { User } from '../data-source';
import { user } from '../models';

export const params = {
  typeDefs,
  resolvers,
  dataSources: () => ({
    users: new User(user),
  }),
  context: ({ req }: { req: any }) => ({
    request: () => req,
    getUser: () => req.user,
    logout: () => req.logout(),
  }),
};
