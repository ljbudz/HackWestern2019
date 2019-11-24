import React, { Component } from "react";
import { View, Text, Image } from "react-native";
import { Card, ListItem, Button, Icon } from "react-native-elements";
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

  render() {
    return (
      <View></View>
    )
  }
}

