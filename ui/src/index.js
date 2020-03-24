//Polyfills
import 'url-search-params-polyfill';

//React Schtuff
import React from 'react'
import { render } from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import Root from './containers/Root'
import configureStore from './store/configureStore'


// Vendor Schtuff
import 'bootswatch/dist/lumen/bootstrap.min.css';
import 'jquery/src/jquery';
import 'bootstrap/dist/js/bootstrap.js';
import './assets/css/App.css';


const store = configureStore()

render((
  <BrowserRouter basename='/'>
    <Root store={store} />
  </BrowserRouter>
), document.getElementById('root'));
