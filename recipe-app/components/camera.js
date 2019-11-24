import React from "react";
import { Text, View, TouchableOpacity, Button } from "react-native";
import * as Permissions from "expo-permissions";
import { Camera } from "expo-camera";
import { StyleSheet, Platform } from "react-native";
import FormData from 'FormData';
// import { response } from "express";

export default class CameraExample extends React.Component {
  state = {
    hasCameraPermission: null,
    type: Camera.Constants.Type.back
  };

  async componentDidMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === "granted" });
  }

  render() {
    const { hasCameraPermission } = this.state;
    if (hasCameraPermission === null) {
      return <View />;
    } else if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    } else {
      return (
        <View style={{ flex: 1 }}>
          <Camera
            style={{ flex: 1 }}
            type={this.state.type}
            ref={ref => {
              this.camera = ref;
            }}
          >
            <View
              style={{
                flex: 1,
                backgroundColor: "transparent",
                flexDirection: "row"
              }}
            >
              <TouchableOpacity
                style={{
                  flex: 0.1,
                  alignSelf: "flex-end",
                  alignItems: "center"
                }}
                onPress={() => {
                  this.setState({
                    type:
                      this.state.type ===
                        Camera.Constants.Type.back
                        ? Camera.Constants.Type.front
                        : Camera.Constants.Type.back
                  });
                }}
              >
                <Text
                  style={{
                    fontSize: 18,
                    marginBottom: 10,
                    color: "white"
                  }}
                >
                  {" "}
                  Flip{" "}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  flex: 0.3,
                  alignSelf: "flex-start",
                  alignItems: "center",
                  //backgroundColor: "grey"
                }}
                onPress={() => this.snap()}
              >
                <Text
                  style={{
                    fontSize: 18,
                    marginTop: 10,
                    color: "white"
                  }}
                >
                  {" "}
                  Take Picture{" "}
                </Text>
              </TouchableOpacity>
            </View>
          </Camera>
        </View>
      );
    }
  }

  snap = async () => {
    if (this.camera) {
      let photo = await this.camera.takePictureAsync();
      console.log(photo);
      var data  = new FormData();
      var pic = {
        uri: photo.uri,
        type: 'image/jpeg',
        name: 'photo.jpg'
      };
      data.append("test", "ABCD");
      data.append("image", pic);
      // Update URL accordingly
      fetch('http://2e2c28a2.ngrok.io/procReceipt',
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type':'multipart/form-data',
          'X-Requested-With': 'XMLHttpRequest'
        },
        body:data
      }).then((response) => response.json())
      .then(responseJSON => {
        console.log(responseJSON);
        // TODO: Add ingredients to firebase
      })
      .catch((error)=>{
        console.log(error);
      });
      console.log("Hello");
    }
  };
}

const styles = StyleSheet.create({
  button: {
    height: 10,
    //flex: "none"
  }
});