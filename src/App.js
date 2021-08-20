import React, { useState, useEffect } from "react";
import { Route, Switch, Link } from "react-router-dom";

import * as yup from "yup";
import "./App.css";
import axios from "axios";

import HomePage from "./homePage";
import PizzaForm from "./pizzaForm";
import pizzaSchema from "./pizzaFormSchema";

const initialFormValues = {
  size: "",
  sauce: "Original Red",
  pepperoni: false,
  threeCheese: false,
  pinapple: false,
  sausage: false,
  name: "",
  special: "",
};

const initialFormErrors = {
  size: "Please choose a size",
  name: "Please enter your name",
};

const App = () => {
  const [formValues, setFormValues] = useState(initialFormValues);
  const [formErrors, setFormErrors] = useState(initialFormErrors);
  const [disabled, setDisabled] = useState(true);
  
  const createPizza = (pizza) => {
    axios
      .post("https://reqres.in/api/orders", pizza)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
    setFormValues(initialFormValues);
  };

  const inputChange = (name, value) => {
    yup
      .reach(pizzaSchema, name)
      .validate(value)
      .then(() => {
        setFormErrors({ ...formErrors, [name]: "" });
      })
      .catch((err) => {
        setFormErrors({ ...formErrors, [name]: err.errors[0] });
      });
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const formSubmit = () => {
    console.log(formValues);
    const pizza = {
      size: formValues.size.trim(),
      sauce: formValues.sauce.trim(),
      pepperoni: formValues.pepperoni,
      threeCheese: formValues.threeCheese,
      pinapple: formValues.pinapple,
      sausage: formValues.sausage,

      name: formValues.name.trim(),
      special: formValues.special.trim(),
    };

    console.log(pizza);
    createPizza(pizza);
  };
  useEffect(() => {
    pizzaSchema.isValid(formValues).then((valid) => setDisabled(!valid));
  }, [formValues]);

  return (
    <div className="App">
      <div className="header">
        <div className="navBar">
          <h1>Lambda Eats!</h1>
          <Link to="/">Home</Link>
        </div>
      </div>
      <Switch>
        <Route path="/pizza">
          <PizzaForm
            values={formValues}
            change={inputChange}
            submit={formSubmit}
            errors={formErrors}
            disabled={disabled}
          />
        </Route>
        <Route path="/">
          <HomePage />
        </Route>
      </Switch>
    </div>
  );
};
export default App;
