import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  TouchableHighlight
} from "react-native";
import { db } from "../config";

let addIngredient = item => {
  db.ref("/ingredients").push({
    name: item
  });
};

export default class RecipeSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {recipes: []}
  }

  state = {
    name: ""
  };

  render() {
    return (
    );
  }
}

