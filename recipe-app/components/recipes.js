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
  }

  state = {
    name: ""
  };

  handleChange = e => {
    this.setState({
      name: e.nativeEvent.text
    });
  };

  handleSubmit = () => {
    addIngredient(this.state.name);
  };

  render() {
    return (
      <View>
        <Text>Add Item</Text>
        <TextInput onChange={this.handleChange} />
        <TouchableHighlight
          underlayColor="white"
          onPress={this.handleSubmit}
        >
          <Text>Add</Text>
        </TouchableHighlight>
      </View>
    );
  }
}

