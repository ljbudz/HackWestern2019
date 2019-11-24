import React, { Component } from "react";
import { Platform, StyleSheet, Text, View, Button, StatusBar } from "react-native";
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
  },
  navButton: {
    backgroundColor: "#B55BD7",
    color: "white"
  }
});

/* navigation fix */

const statusBarHeight = Platform.OS === 'ios' ? 20 : 0;
const appBarHeight = Platform.OS === 'ios' ? 44 : 56;

const navStyles = StyleSheet.create({
    container: {
        width: "100%",
        backgroundColor: "blue"
    },
    statusBar: {
        height: statusBarHeight,
    },
    navigationBar: {
        flexDirection: 'row',
        height: appBarHeight,
        backgroundColor: '#9042D0',
        justifyContent: 'space-between',
        alignItems: 'center',
        color: 'black',
        padding: 5,
        paddingLeft: 15,
        paddingRight: 15
    },
});

/**/

export default class HomeScreen extends Component {
  componentDidMount() {
    StatusBar.setHidden(true,true);

    this.goToFridge = this.goToFridge.bind(this);
    this.goToRecipes = this.goToRecipes.bind(this);
    this.goToCamera = this.goToCamera.bind(this);
  }

  goToFridge() {
    console.log(this.props);
    this.props.navigation.navigate("Fridge");
  }

  goToRecipes() {
    this.props.navigation.navigate("Recipes");
  }

  goToCamera() {
    this.props.navigation.navigate("Camera");
  }

  render() {
    return (
      <View style={navStyles.mainView}>
        {/*this shit should be in the nav bar thing*/}
        <View style={navStyles.container}>
                <View style={[navStyles.navigationBar]}>
                    <Button
                        title={"For You"}
                        color="#B55BD7"
                        onPress={() => {
                            console.log("click left");
                        }}
                    />
                    <Button
                        title={"My Fridge"}
                        color="#B55BD7"
                        onPress={() => this.goToFridge()}
                    />
                    <Button
                        title={"recipes"}
                        color="#B55BD7"
                        onPress={() => this.goToRecipes()}
                    />
                </View>
        </View>
        {/*this shit should be in the nav bar thing*/}
        <View style={styles.buttons}>
          <Text>Hello World</Text>
          <Button
            title="Fridge"
            onPress={() => this.goToFridge()}
          />
          <Button
            title="Recipes"
            onPress={() => this.goToRecipes()}
          ></Button>
          <Button
            title="Camera"
            onPress={() => this.goToCamera()}
          ></Button>
        </View>
      </View>
    );
  }
}

