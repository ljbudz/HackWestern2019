import React, { Component } from "react";
import { StyleSheet, Text, View, Button, StatusBar } from "react-native";
import NavigationBar from './navigation.js';

const styles = StyleSheet.create({
  mainView: {
    display: "flex",
    flexWrap: "nowrap",
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    height: "100%",
    width: "100%",
    backgroundColor: "white",
    margin: 0,
  },
  buttons: {
    display: "flex",
    backgroundColor: "#fff",
    height: "25%",
    width: "100%",
    marginTop: 150,
    alignItems: "center",
    justifyContent: "space-between",
    alignSelf: "center"
  }
});

export default class HomeScreen extends Component {
  componentDidMount() {
    StatusBar.setHidden(true,true);
  }

  render() {
    return (
      <View style={styles.mainView}>
        <NavigationBar 
          componentLeft={<Button title="Back" onPress={() => console.log("back")}/>}
          componentCenter={<Text>app name</Text>}
          componentRight={<Button title="Next" onPress={() => console.log("next")}/>}
        />
        <View style={styles.buttons}>
          <Text>Hello World</Text>
          <Button
            title="Fridge"
            onPress={() => this.props.navigation.navigate("Fridge")}
          />
          <Button
            title="Recipes"
            onPress={() => this.props.navigation.navigate("Recipes")}
          ></Button>
          <Button
            title="Camera"
            onPress={() => this.props.navigation.navigate("Camera")}
          ></Button>
        </View>
      </View>
    );
  }
}

