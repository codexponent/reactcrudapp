import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

// Material-UI
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

ReactDOM.render(
<MuiThemeProvider muiTheme={getMuiTheme()}>
    <App />
</MuiThemeProvider>, document.getElementById('root'));
registerServiceWorker();
