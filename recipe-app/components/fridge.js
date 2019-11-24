import React, { Component } from "react";
import { ScrollView, Keyboard } from "react-native";
import { ListItem, Input, Button, Header, Icon } from "react-native-elements";
import TouchableScale from "react-native-touchable-scale";
import { db } from "../config";

export default class Fridge extends Component {
    constructor(props) {
        super(props);
        this.state = { text: "", list: [] };

        this.deleteItem = this.deleteItem.bind(this);
    }

    componentDidMount() {
        let list = [];
        db.ref("/ingredients")
            .once("value", function(snapshot) {
                snapshot.forEach(function(childSnapshot) {
                    list.push({
                        key: childSnapshot.key,
                        name: childSnapshot.val().name
                    });
                });
            })
            .then(() => {
                this.setState({ list: list });
            });
    }

    handleSubmit = () => {
        let list = this.state.list;
        db.ref("/ingredients")
            .push({
                name: this.state.text
            })
            .once("value", function(snapshot) {
                list.push({
                    key: snapshot.key,
                    name: snapshot.val().name
                });
            });
        this.setState({
            text: "",
            list: list
        });
        Keyboard.dismiss();
    };

    deleteItem(key) {
        let list = this.state.list;
        db.ref("/ingredients")
            .child(key)
            .remove()
            .then(() => {
                db.ref("/ingredients").once("value", function(snapshot) {
                    list.push({
                        key: snapshot.key,
                        name: snapshot.val().name
                    });
                });
            });

        this.setState({
            text: "",
            list: list
        });
    }

    render() {
        return (
            <ScrollView stickyHeaderIndices={[0]}>
                <Header
                    leftComponent={
                        <Button
                            title="Home"
                            onPress={() =>
                                this.props.navigation.navigate("Home")
                            }
                        />
                    }
                    centerComponent={{
                        text: "My Fridge",
                        style: { color: "#fff" }
                    }}
                    backgroundColor="purple"
                />
                <Input
                    placeholder="Add new indredients..."
                    leftIcon={{
                        type: "font-awesome",
                        name: "shopping-cart"
                    }}
                    onChangeText={text => {
                        this.setState(
                            Object.assign(this.state, {
                                text
                            })
                        );
                    }}
                    value={this.state.text}
                    rightIcon={
                        <Button
                            title="Add"
                            type="solid"
                            onPress={this.handleSubmit}
                        />
                    }
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
                        rightIcon={
                            <Icon
                                name="delete"
                                color="white"
                                onPress={() => this.deleteItem(item.key)}
                            />
                        }
                    />
                ))}
            </ScrollView>
        );
    }
}
