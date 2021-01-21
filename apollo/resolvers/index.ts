import { Query } from './query';
import { Mutation } from './mutation';

// Resolvers define the technique for fetching the types defined in the
// schema. This resolver retrieves books from the "books" array above.
export const resolvers = {
  Query,
  Mutation,
};
