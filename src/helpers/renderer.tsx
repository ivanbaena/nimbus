import React from 'react';
import { ApolloProvider } from '@apollo/client';
import { Request, Response } from 'express';
import { renderToString, renderToStaticMarkup } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { renderRoutes, matchRoutes } from 'react-router-config';
import { getDataFromTree } from '@apollo/client/react/ssr';

import { Routes } from '../client/Routes';
import { client, context } from './apollo';
import { Html } from './Html';

export const renderer = (req: Request, res: Response) => {
  const clientInstance = client(req);
  const initialState = clientInstance.extract();

  const App = (
    <ApolloProvider client={clientInstance}>
      <StaticRouter location={req.url} context={context}>
        {renderRoutes(Routes)}
      </StaticRouter>
    </ApolloProvider>
  );

  const promises = matchRoutes(Routes, req.path)
    .map(({ route }: { route: any }) => {
      return route.loadData ? route.loadData(initialState) : null;
    })
    .map((promise: any) => {
      if (promise) {
        return new Promise((resolve, reject) => {
          promise.then(resolve).catch(resolve);
        });
      }
    });

  getDataFromTree(App).then(() => {
    Promise.all(promises).then(() => {
      if (context.url || context.notFound) {
        if (context.url) return res.redirect(301, context.url);
        if (context.notFound) res.status(404);
      }

      // We are ready to render for real
      const content = renderToString(App);
      const html = <Html content={content} state={initialState} />;

      res.status(200);
      res.send(`<!doctype html>\n${renderToStaticMarkup(html)}`);
      res.end();
    });
  });
};
