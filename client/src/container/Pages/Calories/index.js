import React, { Component } from "react";
import styles from "./style.module.css";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import CircularProgress from "@material-ui/core/CircularProgress";
import Button from "@material-ui/core/Button";
import { DropDown, Autocomplete } from "../../../component";
import { width } from "@material-ui/system";
import axios from "axios";
import format from "date-fns/format";
import keycode from "keycode";

const HOST = process.env.API_URL;

const getFoodUuid = (data, item) => data.find(i => i.label === item).uuid;

const initialState = {
  meal: "",
  loading: false,
  error: null,
  mealCatalog: [],
  foodCatalog: [],
  mealType: "",
  date: "" || format(new Date(), "yyyy-MM-dd"),
  inputValue: "",
  selectedItem: [],
  selectedFood: []
};

class Calories extends Component {
  state = initialState;

  componentDidMount() {
    const { uuid } = this.props.match.params;

    if (uuid) {
      this.getDetail(uuid);
    }

    this.load();
  }

  async load() {
    this.setState({
      loading: true,
      error: null
    });

    try {
      const [mealCatalog, foodCatalog] = await Promise.all([
        axios.get(`${HOST}/api/catalogs/mealtypes`).then(res => res.data),
        axios.get(`${HOST}/api/catalogs/foodtypes`).then(res => res.data)
      ]);

      this.setState({
        loading: false,
        mealCatalog,
        foodCatalog
      });
    } catch (error) {
      this.setState({
        loading: false,
        error: error.message
      });
    }
  }

  onChange = e => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  };

  handleInputChange = event => {
    this.setState({ inputValue: event.target.value });
  };

  handleChange = item => {
    let { selectedItem, selectedFood } = this.state;

    if (selectedItem.indexOf(item) === -1) {
      selectedItem = [...selectedItem, item];
      selectedFood = [
        ...selectedFood,
        getFoodUuid(this.state.foodCatalog, item)
      ];
    }

    this.setState({
      inputValue: "",
      selectedItem,
      selectedFood
    });
  };

  handleKeyDown = event => {
    const { inputValue, selectedItem } = this.state;
    if (
      selectedItem.length &&
      !inputValue.length &&
      keycode(event) === "backspace"
    ) {
      this.setState({
        selectedItem: selectedItem.slice(0, selectedItem.length - 1)
      });
    }
  };

  handleDelete = item => () => {
    this.setState(state => {
      const selectedItem = [...state.selectedItem];
      const selectedFood = [...state.selectedFood];

      selectedItem.splice(selectedItem.indexOf(item), 1);
      selectedFood.splice(
        selectedFood.indexOf(getFoodUuid(this.state.foodCatalog, item)),
        1
      );

      return {
        selectedItem,
        selectedFood
      };
    });
  };

  onSave = async e => {
    this.setState({ loading: true });

    const { meal, selectedFood, mealType, date } = this.state;
    const data = { meal, foods: selectedFood, mealType, date };

    try {
      const response = await axios.post(`${HOST}/api/meals`, data);

      this.setState({ loading: false });
      this.props.history.push("/");
    } catch (e) {
      this.setState({
        error: e.message,
        loading: false
      });
    }
  };

  render() {
    console.log(`State:`, this.state);
    //console.log(`TCL: `, HOST);

    const {
      meal,
      loading,
      error,
      mealCatalog,
      foodCatalog,
      mealType,
      date,
      inputValue,
      selectedItem
    } = this.state;

    if (loading) {
      return (
        <div className={styles.loading}>
          <CircularProgress />
        </div>
      );
    }

    const disabled = !!meal && !!mealType && selectedItem.length > 0;

    return (
      <div className={styles.container}>
        <h1 className={styles.title}>Agregar calorias.</h1>
        {error ? (
          <p className={styles.error}>{error}</p>
        ) : (
          <Paper elevation={1} className={styles.paper}>
            <TextField
              name="meal"
              label="Comida"
              margin="normal"
              style={{ width: "50%" }}
              value={this.state.meal}
              onChange={this.onChange}
              error={!this.state.meal}
            />
            <DropDown
              name="mealType"
              label="Tipo de comida"
              data={mealCatalog}
              onChange={this.onChange}
              value={mealType}
            />
            <TextField
              id="date"
              name="date"
              label="Fecha"
              margin="normal"
              type="date"
              defaultValue={this.state.date}
              onChange={this.onChange}
              InputLabelProps={{
                shrink: true
              }}
            />
            <Autocomplete
              label="Alimentos"
              palceholder="seleccine multiples alimentos"
              data={foodCatalog}
              inputValue={inputValue}
              selectedItem={selectedItem}
              handleInputChange={this.handleInputChange}
              handleChange={this.handleChange}
              handleKeyDown={this.handleKeyDown}
              handleDelete={this.handleDelete}
            />
            <div className={styles.btnContainer}>
              <Button
                disabled={!disabled}
                name="mealType"
                variant="contained"
                color="secondary"
                onClick={this.onSave}
              >
                Guardar
              </Button>
            </div>
          </Paper>
        )}
      </div>
    );
  }
}

export default Calories;
