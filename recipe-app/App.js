import React, { Component } from "react";
import { createAppContainer, SafeAreaView } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import Camera from "./components/camera";
import Recipes from "./components/recipes";
import Home from "./components/home";
import Fridge from "./components/fridge";

const AppNavigator = createStackNavigator(
  {
    Home: Home,
    Fridge: Fridge,
    Camera: Camera,
    Recipes: Recipes
  },
  {
    initialRouteName: "Home",
    headerMode: 'none'
  }
);

const AppContainer = createAppContainer(AppNavigator);

export default class App extends Component {
  render() {
    return <AppContainer />;
  }
}
