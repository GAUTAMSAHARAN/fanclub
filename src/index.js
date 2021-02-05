import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import configureStore from './store/store';
import { BrowserRouter } from "react-router-dom";
import reportWebVitals from './reportWebVitals';
import 'semantic-ui-css/semantic.min.css'
import Layout from './views/rootLayout';
import './styles/colors.css';

const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <React.StrictMode>
              <Layout />
      </React.StrictMode>
    </BrowserRouter>
  </Provider >,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
