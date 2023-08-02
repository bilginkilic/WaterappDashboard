import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import { Amplify } from 'aws-amplify'
import awsconfig from '../src/aws-exports';

Amplify.configure(awsconfig);

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
