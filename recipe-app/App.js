import React, { Component } from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import firebase from "firebase";
import CameraExample from "./Camera.js";

class HomeScreen extends Component {
  // componentWillMount() {
  //   var firebaseConfig = {
  //     apiKey: "AIzaSyCbt9r7pVu9e3J4S3TfWN171m9cX0A5dsM",
  //     authDomain: "recipe-app-259321.firebaseapp.com",
  //     databaseURL: "https://recipe-app-259321.firebaseio.com",
  //     projectId: "recipe-app-259321",
  //     storageBucket: "recipe-app-259321.appspot.com",
  //     messagingSenderId: "598930290897",
  //     appId: "1:598930290897:web:1ffc5a429060ed3ccbedf0",
  //     measurementId: "G-0BY16H0QLW"
  //   };
  //   // Initialize Firebase
  //   firebase.initializeApp(firebaseConfig);
  // }

  render() {
    return (
      <View style={styles.container}>
        <Text>Hello World</Text>
        <Button
          title="go to camera"
          onPress={() => this.props.navigation.navigate('Camera')}
          />
      </View>
    );
  }
}

const AppNavigator = createStackNavigator(
  {
    Home: HomeScreen,
    Camera: CameraExample
  },
  {
    initialRouteName: "Home"
  }
);

export default createAppContainer(AppNavigator);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});
