import React, { Component } from "react";
import { Platform, ScrollView, StyleSheet, Keyboard, View, TouchableOpacity, Text } from "react-native";
import { ListItem, Input, Button, Header } from "react-native-elements";
import TouchableScale from "react-native-touchable-scale";
import { db } from "../config";

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
        flexDirection: 'row',
        height: appBarHeight,
        backgroundColor: 'white',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 15,
        paddingLeft: 20,
        paddingRight: 20,
        alignSelf: "flex-end",
        width: "100%",
    },
});

/*navigation bar*/

export default class Fridge extends Component {
    constructor(props) {
        super(props);
        this.state = { text: "", list: []};

        this.goToHomeScreen = this.goToHomeScreen.bind(this);
        this.goToRecipes = this.goToRecipes.bind(this);
        this.goToCamera = this.goToCamera.bind(this);
    }

    goToHomeScreen() {
        this.props.navigation.navigate("Home");
    }

    goToRecipes() {
        this.props.navigation.navigate("Recipes");
    }

    goToCamera() {
        this.props.navigation.navigate("Camera");
    }

    componentDidMount() {
        let list = [];
        db.ref("/ingredients").once("value", function(snapshot) {
            snapshot.forEach(function(childSnapshot) {
                list.push({
                    key: childSnapshot.key,
                    name: childSnapshot.val().name
                });
            });
        }).then(() => {
            this.setState({list: list});
        });
    }

    handleSubmit = () => {
        let list = this.state.list;
        db.ref("/ingredients").push({
            name: this.state.text
        }).once("value", function(snapshot) {
            list.push({
                key: snapshot.key,
                name: snapshot.val().name
            });
    
        });
        this.setState({
            text: '',
            list : list
        });
        Keyboard.dismiss();
    };

    render() {
        return (
            <ScrollView stickyHeaderIndices={[0]}>
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
                        <TouchableOpacity onPress = {() => this.goToHomeScreen()}>
                          <View style = {{backgroundColor: '#9042D0', alignItems: 'center', 
                                          justifyContent: 'center', borderRadius: 10, width: 100, height: 30}}
                                 >
                              <Text style = {{color: 'white'}}>Home</Text>
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
                <Input
                    placeholder="Add new ingredients..."
                    // leftIcon={{
                    //     type: "font-awesome",
                    //     name: "shopping-cart"
                    // }}
                    onChangeText={text => {
                        this.setState(
                            Object.assign(this.state, {
                                text
                            })
                        );
                    }}
                    value={this.state.text}
                    rightIcon={
                        <TouchableOpacity onPress = {this.handleSubmit}>
                          <View style = {{backgroundColor: '#9042D0', alignItems: 'center', 
                                          justifyContent: 'center', borderRadius: 10, width: 60, height: 35}}
                                 >
                              <Text style = {{color: 'white'}}>Add</Text>
                          </View>
                        </TouchableOpacity>
                    }
                    style={{marginTop: 10, marginBottom: 15}}
                />
                {this.state.list.map((item, i) => (
                    <ListItem
                        key={item.key}
                        Component={TouchableScale}
                        friction={90} //
                        tension={100} // These props are passed to the parent component (here TouchableScale)
                        activeScale={0.95} //
                        linearGradientProps={{
                            colors: ["#9D18B0", "#7901Fd"],
                            start: [1, 0],
                            end: [0.2, 0]
                        }}
                        title={item.name}
                        titleStyle={{
                            color: "white",
                            fontWeight: "bold"
                        }}
                        subtitleStyle={{ color: "white" }}
                        chevron={{ color: "white" }}
                    />
                ))}
            </ScrollView>
        );
    }
}