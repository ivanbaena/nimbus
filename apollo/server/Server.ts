import { DocumentNode } from 'graphql';
import { ApolloServer } from 'apollo-server-express';

export interface ApolloParams {
  typeDefs: string | DocumentNode | DocumentNode[] | string[] | undefined;
  resolvers: any | any[] | undefined;
  dataSources?: () => {};
  context?: ({ req }: { req: Request }) => {};
}

export class Apollo {
  constructor(
    public port: number,
    public apolloParams: ApolloParams,
    public app: any
  ) {}

  init = () => {
    const { app, port, apolloParams } = this;
    const apollo = new ApolloServer(apolloParams);

    apollo.applyMiddleware({ app, cors: false });
    app.listen({ port }, () =>
      console.log(
        `🚀 Server ready at http://localhost:${port}${apollo.graphqlPath}, {useNewUrlParser: true}`
      )
    );
  };
}
