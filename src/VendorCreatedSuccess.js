import React, { Component } from "react";
import {
  Text,
  SafeAreaView,
  StatusBar,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  BackHandler,
} from "react-native";
import {
  GradientText,
  config,
  Lang_chg,
  Font,
  Colors,
  mobileH,
  mobileW,
  localimag,
} from "./Provider/utilslib/Utils";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import LinearGradient from "react-native-linear-gradient";
import { LinearTextGradient } from "react-native-text-gradient";

export default class VendorCreatedSuccess extends Component {
  _didFocusSubscription;

  _willBlurSubscription;
  constructor(props) {
    super(props);
    this.state = {};
    this._didFocusSubscription = props.navigation.addListener(
      "focus",
      (payload) =>
        BackHandler.addEventListener("hardwareBackPress", this.handleBackPress)
    );
  }
  async componentDidMount() {
    this._willBlurSubscription = this.props.navigation.addListener(
      "blur",
      (payload) =>
        BackHandler.removeEventListener(
          "hardwareBackPress",
          this.handleBackPress
        )
    );
  }

  //---------back handler funtion-------------//
  handleBackPress = () => {
    return true;
  };
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar
          hidden={false}
          translucent={false}
          backgroundColor={Colors.whiteColor}
          barStyle="dark-content"
          networkActivityIndicatorVisible={true}
        />
        {/* ---------------for background-------------- */}

        <View style={{ alignItems: "center", alignSelf: "center", flex: 1 }}>
          <LinearGradient
            colors={[Colors.purple_color, Colors.bluegreen_color]}
            start={{ x: 1, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={{
              height: (mobileH * 100) / 100,
              width: (mobileW * 100) / 100,
            }}
          >
            <View
              activeOpacity={0.7}
              style={{
                alignSelf: "center",
                width: (mobileW * 90) / 100,
                marginTop: (mobileH * 35) / 100,
                alignItems: "center",
              }}
            >
              <Image
                style={{
                  width: (mobileW * 22) / 100,
                  height: (mobileW * 22) / 100,
                  resizeMode: "contain",
                }}
                source={localimag.success}
              ></Image>
            </View>
            <View
              style={{
                width: (mobileW * 90) / 100,
                alignItems: "center",
                alignSelf: "center",
                marginTop: (mobileH * 1.5) / 100,
                justifyContent: "center",
              }}
            >
              <Text
                style={{
                  color: Colors.whiteColor,
                  fontFamily: Font.FontBold,
                  fontSize: (mobileW * 5) / 100,
                }}
              >
                {Lang_chg.Success_txt[config.language]}
              </Text>
              <Text
                style={{
                  color: Colors.whiteColor,
                  fontFamily: Font.FontSemiBold,
                  fontSize: (mobileW * 4) / 100,
                  paddingVertical: (mobileH * 0.3) / 100,
                  textAlign: "center",
                }}
              >
                {Lang_chg.Profile_Created_txt[config.language]}
              </Text>
            
            </View>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate("Login")}
              activeOpacity={0.7}
              style={{
                width: (mobileW * 40) / 100,
                alignItems: "center",
                backgroundColor: Colors.whiteColor,
                borderRadius: (mobileW * 10) / 100,
                justifyContent: "center",
                alignSelf: "center",
                height: (mobileH * 6) / 100,
                marginTop: (mobileH * 3) / 100,
              }}
            >
              <GradientText
                //   style={{paddingVertical:mobileH*1.8/100}}
                colors={[Colors.voilet_color, Colors.dark_greencolor]}
              >
                <Text
                  style={{
                    color: Colors.purple_color,
                    fontFamily: Font.FontBold,
                    fontSize: (mobileW * 3.8) / 100,
                    paddingVertical: (mobileH * 1.8) / 100,
                  }}
                >
                  {Lang_chg.Done[config.language]}
                </Text>
              </GradientText>
            </TouchableOpacity>
          </LinearGradient>
        </View>
        {/* ------------------header end ---------------- */}
      </SafeAreaView>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.whiteColor,
  },
});
