export const usersQuery = {
  users: (_: any, {}: any, { dataSources }: any) => dataSources.users.users(),
  getUser: (_: any, { userId }: any, { dataSources }: any) =>
    dataSources.users.getUser(userId),
  currentUser: (parent: any, args: any, context: any) => context.getUser(),
};
