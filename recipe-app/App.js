import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import ImagePicker from "react-native-image-picker";
import firebase from "firebase";

export default class HomeScreen extends Component {
    componentWillMount() {
        var firebaseConfig = {
            apiKey: "AIzaSyCbt9r7pVu9e3J4S3TfWN171m9cX0A5dsM",
            authDomain: "recipe-app-259321.firebaseapp.com",
            databaseURL: "https://recipe-app-259321.firebaseio.com",
            projectId: "recipe-app-259321",
            storageBucket: "recipe-app-259321.appspot.com",
            messagingSenderId: "598930290897",
            appId: "1:598930290897:web:1ffc5a429060ed3ccbedf0",
            measurementId: "G-0BY16H0QLW"
        };
        // Initialize Firebase
        firebase.initializeApp(firebaseConfig);
    }

    componentDidMount() {
      ImagePicker.launchCamera(options, response => {
        console.log(response);
      });
    }

    render() {
        return (
            <View style={styles.container}>
                <Text>Hello World</Text>
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
