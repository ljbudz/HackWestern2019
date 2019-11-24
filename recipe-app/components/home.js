import React, { Component } from "react";
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Button,
    StatusBar,
    Image,
    TouchableOpacity
} from "react-native";
import NavigationBar from "./navigation.js";
//import BottomNav from './bottomNav.js';

const styles = StyleSheet.create({
  mainView: {
    display: "flex",
    flexWrap: "nowrap",
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    height: "100%",
    width: "100%",
    backgroundColor: "#ece6f2",
    margin: 0,
    alignSelf: "stretch"
  },
  content: {
    display: "flex",
    backgroundColor: "#ece6f2",
    width: "100%",
    height: "100%",
    marginTop: 0,
    alignItems: "center",
    justifyContent: "flex-start",
    //flex: 1,
    alignSelf: "stretch"
  },
  navButton: {
    backgroundColor: "#B55BD7",
    color: "white"
  },
  headingText: {
    color: "white",
    fontSize: 25,
    margin: 5
  },
  bodyText: {
    color: "grey",
    fontSize: 20,
    margin: 2
  },
  smallText: {
    color: "grey",
    fontSize: 15,
    margin: 2
  },
  image: {
    width: 240,
    height: 240,
    borderRadius: 5,
    marginBottom: 10
  },
  lastRecipeDisplay: {
    backgroundColor: "white",
    borderRadius: 5,
    marginTop: 35,
    marginBottom: 30,
    width: "85%",
    height: 400,
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start"
  },
  lastRecipeHeader: {
    backgroundColor: "#9042D0",
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    width: "100%",
    height: 50,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "white"
  },
  lastRecipeFoodDesc: {
    paddingTop: 25,
    paddingBottom: 30,
    paddingLeft: 15,
    paddingRight: 15,
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start"
  },
  button: {
    fontSize: 25
  },
  appHeader: {
    width: "100%",
    height: 60,
    backgroundColor: "#9042D0",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  appHeaderText: {
    color: "white",
    fontSize: 30,
    margin: 5
  }
});

/* navigation bar */

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
        flexDirection: "row",
        height: appBarHeight,
        backgroundColor: 'white',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        paddingLeft: 15,
        paddingRight: 15,
        alignSelf: "flex-end",
        width: "100%"
    },
});

/*navigation bar*/

export default class HomeScreen extends Component {
    componentDidMount() {
        StatusBar.setHidden(true, true);

        this.goToFridge = this.goToFridge.bind(this);
        this.goToRecipes = this.goToRecipes.bind(this);
        this.goToCamera = this.goToCamera.bind(this);
    }

  goToFridge() {
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
                <View style={styles.appHeader}>
                    <Text style={styles.appHeaderText}>Recipe Radar</Text>
                </View>
                <View style={styles.content}>
                    <View style={styles.lastRecipeDisplay}>
                        <View style={styles.lastRecipeHeader}>
                            <Text style={styles.headingText}>
                                Your Last Recipe
                            </Text>
                        </View>
                        <View style={styles.lastRecipeFoodDesc}>
                            <Image
                                style={styles.image}
                                //source={{uri: 'https://facebook.github.io/react-native/img/tiny_logo.png'}}
                                source={require("../assets/food.jpg")}
                            />
                            <Text style={styles.bodyText}>
                                Put Name of Dish Here
                            </Text>
                            <Text style={styles.smallText}>You Saved: $25</Text>
                        </View>
                    </View>
                    {/*<Button
            title="Launch Camera"
            style={styles.button}
            color={"#9042D0"}
            onPress={() => this.goToCamera()}
          />*/}
          {/*this shit is the nav bar thing*/}
          <View style={navStyles.container}>
            <View style={[navStyles.navigationBar]}>
                {/*<Button
                    title={"Launch Camera"}
                    color="#B55BD7"
                    onPress={() => this.goToCamera()}
                />
                <Button
                    title={"My Fridge"}
                    color="#B55BD7"
                    onPress={() => this.goToFridge()}
                />
                <Button
                  title={"Recipes"}
                  color="#B55BD7"
                  onPress={() => this.goToRecipes()}
                />*/}
                <TouchableOpacity onPress = {() => this.goToCamera()}>
                  <View style = {{backgroundColor: '#9042D0', alignItems: 'center', 
                                  justifyContent: 'center', borderRadius: 10, width: 100, height: 30}}
                         >
                      <Text style = {{color: 'white'}}>Camera</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity onPress = {() => this.goToFridge()}>
                  <View style = {{backgroundColor: '#9042D0', alignItems: 'center', 
                                  justifyContent: 'center', borderRadius: 10, width: 100, height: 30}}
                         >
                      <Text style = {{color: 'white'}}>Fridge</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity onPress = {() => this.goToRecipes()}>
                  <View style = {{backgroundColor: '#9042D0', alignItems: 'center', 
                                  justifyContent: 'center', borderRadius: 10, width: 100, height: 30}}
                         >
                      <Text style = {{color: 'white'}}>Recipes</Text>
                  </View>
                </TouchableOpacity>
            </View>
          </View>
          {/*this shit is the nav bar thing*/}
        </View>
      </View>
    );
  }
}
