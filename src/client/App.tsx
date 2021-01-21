import React from 'react';
import { renderRoutes } from 'react-router-config';

const App = ({ route }: any) => {
  return <div>{renderRoutes(route.routes)}</div>;
};

export default {
  component: App,
};
