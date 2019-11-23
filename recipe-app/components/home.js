import React, { Component } from "react";
import { StyleSheet, Text, View, Button } from "react-native";

export default class HomeScreen extends Component {

  render() {
    return (
      <View style={styles.container}>
        <Text>Hello World</Text>
        <Button
          title="go to camera"
          onPress={() => this.props.navigation.navigate("Camera")}
        />
        <Button
          title="Recipes"
          onPress={() => this.props.navigation.navigate("Recipes")}
        ></Button>
      </View>
    );
  }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center"
    }
});
