import React, { useContext } from 'react';

const HomePage = (props: any) => {
  return <div>HomePage SSR Client</div>;
};

const loadData = () => {
  console.log('load data');
};

export default {
  component: HomePage,
  loadData: loadData,
};
