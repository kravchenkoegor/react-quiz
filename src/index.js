import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import './index.scss';
import App from './App';
import rootReducer from './store/reducers/rootReducer';
import * as serviceWorker from './serviceWorker';

const store = createStore(rootReducer, applyMiddleware(thunk));

const app = (
  <Provider store={store}>
    <BrowserRouter>
      <App/>
    </BrowserRouter>
  </Provider>
);

ReactDOM.render(app, document.getElementById('root'));

serviceWorker.register();

// import {MuiThemeProvider, createMuiTheme} from '@material-ui/core/styles';
// import lightBlue from '@material-ui/core/colors/lightBlue';
// import green from '@material-ui/core/colors/green';

// const theme = createMuiTheme({
//   palette: {
//     primary: {
//       main: lightBlue[800],
//       contrastText: '#fff'
//     },
//     secondary: {
//       main: green[500],
//       contrastText: '#fff'
//     },
//   },
//   typography: {
//     useNextVariants: true,
//   },
// });

// ReactDOM.render(
//   <MuiThemeProvider theme={theme}>
//     <App title="My first React App"/>
//   </MuiThemeProvider>,
//   document.getElementById('root')
// );
