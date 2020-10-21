import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter } from "react-router-dom";
import { createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import rootReducer from "./modules";
import { Provider } from "react-redux";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import { CssBaseline } from '@material-ui/core';

const store = createStore(rootReducer, composeWithDevTools());
const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#1b2c48'
    },
  }, 
  overrides: {
    MuiOutlinedInput: {
      root: {
        width: '100%',
        '&$focused $notchedOutline': {
          borderColor: '#707070',
          borderWidth: 1,
        },
      },
      input: {
        padding: '10px 10px',
      },
      inputMarginDense: {
        paddingTop: '9px',
        paddingBottom: '9px',
      },
    },
    MuiSelect: {
      selectMenu: {
        fontFamily: 'AppleSDGothicNeoL00'
      }
    },
    MuiMenuItem: {
      root: {
        fontFamily: 'AppleSDGothicNeoL00'
      }
    }
  },
  colorA: "#5a6482",
  colorWhite: 'white',
});

ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <App />
      </ThemeProvider>
    </Provider>
  </BrowserRouter>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
