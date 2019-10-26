import React from "react";
import Loadable from "react-loadable";
import { Route, Switch } from "react-router-dom";
import styles from "./styles.module.css";
import CircularProgress from "@material-ui/core/CircularProgress";

const dynamicImport = importingComponent => (
  Loadable({
    loader: importingComponent,
    loading: () => (
      // <div style={{ textAlign: "center", marginTop: "Sem" }}>Cargando...</div>
      <div>
        <CircularProgress />
      </div>
    )
  })
)

const Calories = dynamicImport(() => import("./Pages/Calories"));
const Dashboard = dynamicImport(() => import("./Pages/Dashboard"));
const NoMatch = dynamicImport(() => import("./Pages/NoMatch"));
const Summary = dynamicImport(() => import("./Pages/Summary"));

const App = props => {
  const { history } = props;
  return (
    <div className={styles.container}>
      <Switch>
        <Route exact path="/" component={Dashboard} />
        <Route path="/add-calories" component={Calories} />
        <Route path="/summary" component={Summary} />
        <Route component={NoMatch} />
      </Switch>
    </div>
  );
};

export default App;