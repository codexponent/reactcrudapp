import 'babel-polyfill';

// React
import React from 'react';
import ReactDOM from "react-dom";

// Material-UI
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

// Components
import App from './App.js';

ReactDOM.render( 
    <MuiThemeProvider muiTheme={getMuiTheme()}>
      <App />
    </MuiThemeProvider>
    , document.getElementById('root'));
