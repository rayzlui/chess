import React from 'react';
import logo from './logo.svg';
import './App.scss';
import { RootViewContainer } from './containers/RootViewContainer';
import { configureStore } from './configureStore';
import { Provider } from 'react-redux';

const store = configureStore();

function App() {
  return (
    <Provider store={store}>
      <RootViewContainer />
    </Provider>
  );
}

export default App;
