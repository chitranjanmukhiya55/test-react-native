import {
  View,
  Image,
  TouchableOpacity,
  StatusBar,
  ScrollView,
  SafeAreaView,
} from "react-native";
import React, { Component } from "react";
import {
  Colors,
  mobileH,
  mobileW,
  config,
  consolepro,
  localimag,
} from "../Provider/utilslib/Utils";
import Image1 from "react-native-image-progress";
import ProgressBar from "react-native-progress/Bar";
import ImageZoom from "react-native-image-pan-zoom";
import LinearGradient from "react-native-linear-gradient";
export default class ViewImage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      image: this.props.route.params.image,
    };
  }
  componentDidMount = () => {
    consolepro.consolelog("image", this.state.image);
  };
  render() {
    return (
      <View style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
        <SafeAreaView style={{ backgroundColor: Colors.whiteColor }} />
        <StatusBar
          hidden={false}
          translucent={false}
          backgroundColor={Colors.whiteColor}
          barStyle="dark-content"
          networkActivityIndicatorVisible={true}
        />
        <View style={{ alignItems: "center", alignSelf: "center" }}>
          <LinearGradient
            colors={[Colors.purple_color, Colors.light_greencolor]}
            start={{ x: 1, y: 0 }}
            end={{ x: 0, y: 0 }}
            style={{
              height: (mobileH * 9) / 100,
              width: (mobileW * 100) / 100,
              alignSelf: "center",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <TouchableOpacity
              onPress={() => this.props.navigation.goBack()}
              activeOpacity={0.7}
              style={{ width: (mobileW * 15) / 100 }}
            >
              <Image
                style={{
                  alignSelf: "center",
                  width: (mobileW * 4.5) / 100,
                  height: (mobileW * 4.5) / 100,
                  paddingHorizontal: (mobileW * 4) / 100,
                  resizeMode: "contain",
                }}
                source={localimag.back}
              ></Image>
            </TouchableOpacity>
            <View
              style={{
                width: (mobileW * 70) / 100,
                alignItems: "center",
              }}
            ></View>
            <View
              style={{
                width: (mobileW * 15) / 100,
                alignItems: "center",
              }}
            ></View>
          </LinearGradient>
        </View>
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            flex: 1,
            backgroundColor: Colors.whiteColor,
          }}
        >
          <ImageZoom
            style={{ flex: 1 }}
            cropWidth={mobileW}
            cropHeight={mobileH}
            imageWidth={mobileW}
            imageHeight={mobileH}
          >
            <Image1
              renderError={() => {
                consolepro.consolelog("I am here in banner image error");
                this.setState({ image: null });
              }}
              indicator={ProgressBar.Circle}
              resizeMode="contain"
              style={{ width: mobileW, height: mobileH, borderRadius: 5 }}
              source={
                this.state.image != undefined && {
                  uri: config.img_url3 + this.state.image,
                }
              }
            />
          </ImageZoom>
        </View>
      </View>
    );
  }
}
