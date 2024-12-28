import React, { Component } from "react";
import {
  View,
  Dimensions,
  Modal,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Image,
  Text,
} from "react-native";
import { Colors, Font, config, Lang_chg } from "../utilslib/Utils";
const screenHeight = Math.round(Dimensions.get("window").height);
const screenWidth = Math.round(Dimensions.get("window").width);

export default class Cameragallery extends Component {
  render() {
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={this.props.mediamodal}
        onRequestClose={() => {
          this.setState({ modalVisible: false });
        }}
      >
     
        <View
          style={{
            flex: 1,
            backgroundColor: "#00000030",
            alignItems: "center",
          }}
        >
          <View
            style={{ position: "absolute", bottom: 25, width: screenWidth }}
          >
            <View
              style={{
                backgroundColor: Colors.whiteColor,
                borderRadius: 15,
                width: "88%",
                paddingVertical: (screenWidth * 7.3) / 100,
                alignSelf: "center",
              }}
            >
              <TouchableOpacity>
                <Text
                  style={{
                    color: Colors.black_color,
                    fontSize: 17,
                    alignSelf: "center",
                    fontFamily: Font.FontSemiBold,
                  }}
                >
                  {Lang_chg.select_option_txt[config.language]}
                </Text>
              </TouchableOpacity>
              <View
                style={{
                  borderBottomColor: Colors.border_color,
                  borderBottomWidth: 2,
                  marginTop: 10,
                }}
              ></View>
              <TouchableOpacity
                onPress={() => {
                  this.props.Camerapopen();
                }}
              >
                <Text
                  style={{
                    color: Colors.black_color,
                    fontSize: 18,
                    alignSelf: "center",
                    fontFamily: Font.FontSemiBold,
                    marginTop: 10,
                    paddingVertical: (screenWidth * 1.5) / 100,
                  }}
                >
                  {Lang_chg.MediaCamera[config.language]}
                </Text>
              </TouchableOpacity>
              <View
                style={{
                  borderBottomColor: Colors.border_color,
                  borderBottomWidth: 2,
                  marginTop: 10,
                }}
              ></View>
              <TouchableOpacity
                onPress={() => {
                  this.props.Galleryopen();
                }}
              >
                <Text
                  style={{
                    color: Colors.black_color,
                    fontSize: 18,
                    alignSelf: "center",
                    fontFamily: Font.FontSemiBold,
                    marginTop: 10,
                    marginTop: (screenWidth * 3.5) / 100,
                  }}
                >
                  {Lang_chg.Mediagallery[config.language]}
                </Text>
              </TouchableOpacity>
            </View>
            <View
              style={{
                marginTop: 15,
                alignSelf: "center",
                borderRadius: 6,
                backgroundColor: Colors.whiteColor,
                width: "88%",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <TouchableOpacity
                onPress={() => {
                  this.props.Canclemedia();
                }}
                style={{
                  alignSelf: "center",
                  width: "88%",
                  alignItems: "center",
                  justifyContent: "center",
                  paddingVertical: (screenWidth * 3.5) / 100,
                  backgroundColor: Colors.whiteColor,
                }}
              >
                <Text
                  style={{
                    fontFamily: Font.FontSemiBold,
                    fontSize: (screenWidth * 4) / 100,
                    color: Colors.redColor,
                  }}
                >
                  {Lang_chg.cancelmedia[config.language]}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    position: "absolute",
    justifyContent: "center",
    backgroundColor: "#00000040",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },

  activityIndicatorWrapper: {
    height: 80,
    width: 80,
    borderRadius: 10,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "black",
    borderRadius: 6,
    justifyContent: "space-around",
    alignItems: "center",
    alignSelf: "center",
  },
});
