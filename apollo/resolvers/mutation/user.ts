import { UserInterFace } from '../../models';

export const userMutations = {
  signup: (
    _: any,
    { email, username, password }: UserInterFace,
    { dataSources }: any
  ): void => {
    const req = dataSources.users.context.request();
    return dataSources.users.signup(email, username, password, req);
  },
  login: (
    _: any,
    { email, password }: UserInterFace,
    { dataSources }: any
  ): void => {
    const req = dataSources.users.context.request();
    return dataSources.users.login(email, password, req);
  },
  logout: (parent: any, args: any, context: any) => context.logout(),
  deleteUser: (_: any, { _id }: UserInterFace, { dataSources }: any): void => {
    dataSources.users.delete(_id);
  },
  updateUser: (
    _: any,
    { _id, username }: UserInterFace,
    { dataSources }: any
  ): void => {
    dataSources.users.update(_id, username);
  },
};
