import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { RootView } from './views/RootView'
import {configureStore} from './configureStore'
import { Provider } from 'react-redux'


const store = configureStore()

function App(props) {
  <Provider store = {store}>
    <RootView/>
  </Provider>
}

export default App;
