import React, { Component } from "react";
import { View } from "react-native";
import { ListItem } from "react-native-elements";
import TouchableScale from "react-native-touchable-scale";
import { db } from "../config";

const list = ["apples", "oranges"];


export default class Fridge extends Component {
    componentDidMount() {
        db.ref("/ingredients").once("value", function (snapshot) {
            snapshot.forEach(function (childSnapshot) {
                list.push(childSnapshot.val());
            })})}
          
  render() {
    return(
        <ListItem
        Component = { TouchableScale }
        friction = { 90} //
        tension = { 100} // These props are passed to the parent component (here TouchableScale)
        activeScale = { 0.95} //
        linearGradientProps = {{
                    colors: ['#9D18B0', '#7901Fd'],
            start: [1, 0],
            end: [0.2, 0],
        }}
        title = "Apples"
        titleStyle = {{ color: 'white', fontWeight: 'bold' }}
        subtitleStyle = {{ color: 'white' }}
        chevron = {{ color: 'white' }}
        />        
    );
  }
}
