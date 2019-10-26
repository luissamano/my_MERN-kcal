import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from 'react-router-dom';
import Loadable from "react-loadable";
import CircularProgress from "@material-ui/core/CircularProgress";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";

import "./global.css";

const App = Loadable({
  loader: () => import('./container/App'),
  loading: () => <div style={{textAlign: 'center', marginTop: 'Sem'}}><CircularProgress /></div>
});

const theme = createMuiTheme({
  typography: 16
});

const MyAwesomeReactComponent = ({ history }) => (
  <MuiThemeProvider theme={theme}>
    <Router>
      <App history={history} />
    </Router>
  </MuiThemeProvider>
);

ReactDOM.render(
  <MyAwesomeReactComponent history={history} />,
  document.getElementById("app")
);