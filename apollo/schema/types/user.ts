import { gql } from 'apollo-server-express';

export const user = gql`
  type User {
    _id: ID
    email: String
    username: String
    password: String
    auth: Boolean
  }

  extend type Query {
    users: [User]
    getUser(userId: String): User
    currentUser: User
  }

  extend type Mutation {
    signup(email: String!, username: String!, password: String!): User
    login(email: String!, password: String!): User
    logout: Boolean
    deleteUser(_id: ID!): User
    updateUser(_id: ID!, username: String!): User
  }
`;
