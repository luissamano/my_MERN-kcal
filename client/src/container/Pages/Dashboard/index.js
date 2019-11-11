import React from "react";
import styles from "./style.module.css";
import axios from "axios";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import CircularProgress from "@material-ui/core/CircularProgress";

import { KcalList } from "../../../component";

const HOST = process.env.API_URL;


class Dashboard extends React.Component {
  //   constructor(props) {
  //     super(props);
  //     this.goToAddCalories = this.goToAddCalories.bind(this);
  //   }

  state = {
    items: [],
    loading: false,
    error: null
  };

  

  componentDidMount() {
    //Cargar todas las comidas.
    this.load();
  }

  async load() {
    this.setState({
      loading: true
    });

    try {
      const items = await axios.get(`${HOST}/api/meals`).then(res => res.data);
      this.setState({
        loading: false,
        items
      })
    } catch (error) {
      this.setState({
        loading: false,
        error: error.message,
      });
    }
  }

  goToAddCalories = event => {
    event && event.preventDefault();
    this.props.history.push("/add-calories");
  };

  render() {
    const {loading, error, items } = this.state;

    if (loading) {
      return (
        <div className={styles.loading}>
          <CircularProgress />
        </div>
      )
    }


    const ErrorMsg = <p className={styles.error}>{error}</p>
    const List = error ? ErrorMsg : <KcalList items={items} />
    return (
      <div className={styles.container}>
        <h1 className={styles.title}>Consumo de calorias.</h1>
        <div className={styles.section}>
          { List}
          <div className={styles.containerBtns}>
            <Fab
              size="medium"
              color="primary"
              arial-label="Add"
              onClick={this.goToAddCalories}
            >
              <AddIcon />
            </Fab>
          </div>
        </div>
      </div>
    );
  }
}

export default Dashboard;
