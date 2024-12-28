import React, { Component } from "react";
import {
  Text,
  BackHandler,
  SafeAreaView,
  StatusBar,
  Alert,
  View,
  StyleSheet,
  Keyboard,
  TouchableOpacity,
  Image,
  TextInput,
  ImageBackground,
} from "react-native";
import {
  config,
  msgProvider,
  localStorage,
  apifuntion,
  msgText,
  msgTitle,
  consolepro,
  Lang_chg,
  Font,
  Colors,
  mobileH,
  mobileW,
  localimag,
  firebaseprovider,
} from "./Provider/utilslib/Utils";
import Fontisto from "react-native-vector-icons/Fontisto";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import LinearGradient from "react-native-linear-gradient";

export default class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {}
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
        {/* -------------------for background----------------- */}
        <ImageBackground
          style={{
            width: mobileW,
            height: (mobileH * 40) / 100,
            alignItems: "center",
          }}
          source={localimag.splash}
        >
          <Text
            style={{
              color: Colors.whiteColor,
              fontSize: (mobileW * 5.2) / 100,
              fontFamily: Font.FontSemiBold,
            }}
          >
            {Lang_chg.Profile_txt[config.language]}
          </Text>
        </ImageBackground>

        <View
          style={{
            width: (mobileW * 80) / 100,
            alignSelf: "center",
            height: (mobileH * 60) / 100,
            elevation: 8,
            backgroundColor: Colors.whiteColor,
            position: "absolute",
            top: (mobileH * 25) / 100,
          }}
        >
          <View
            style={{
              width: (mobileW * 70) / 100,
              alignSelf: "center",
              alignItems: "center",
              marginTop: (mobileH * 7) / 100,
            }}
          >
            <Text
              style={{
                color: Colors.black_color,
                fontSize: (mobileW * 4.5) / 100,
                fontFamily: Font.FontSemiBold,
              }}
            >
              {Lang_chg.EvelynHarper_txt[config.language]}
            </Text>
            <Text
              style={{
                color: Colors.black_color,
                fontSize: (mobileW * 3.5) / 100,
                fontFamily: Font.FontMedium,
                paddingVertical: (mobileH * 0.5) / 100,
              }}
            >
              {Lang_chg.EvelynHarper123_txt[config.language]}
            </Text>
            <Text
              style={{
                color: Colors.black_color,
                fontSize: (mobileW * 3.5) / 100,
                fontFamily: Font.FontMedium,
              }}
            >
              {Lang_chg.num123_txt[config.language]}
            </Text>
          </View>

          {/* ------------------for second  view------------ */}

          <View
            style={{
              width: (mobileW * 70) / 100,
              alignSelf: "center",
              alignItems: "center",
              marginTop: (mobileH * 5) / 100,
            }}
          >
            {/* --for edit profile--- */}
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate("Details")}
              activeOpacity={0.7}
              style={{
                width: (mobileW * 70) / 100,
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Text
                style={{
                  color: Colors.black_color,
                  fontSize: (mobileW * 3.5) / 100,
                  fontFamily: Font.FontMedium,
                }}
              >
                {Lang_chg.edit_txt[config.language]}
              </Text>
              <Image
                style={{
                  width: (mobileW * 3.5) / 100,
                  height: (mobileW * 3.5) / 100,
                  alignSelf: "center",
                  resizeMode: "contain",
                }}
                source={localimag.backr}
              ></Image>
            </TouchableOpacity>
            {/* ----for view----border */}
            <View
              style={{
                width: (mobileW * 80) / 100,
                borderColor: Colors.border_color,
                borderWidth: (mobileW * 0.2) / 100,
                backgroundColor: Colors.border_color,
                marginTop: (mobileH * 1.5) / 100,
              }}
            ></View>

            {/* --for My favourites --- */}
            <TouchableOpacity
              activeOpacity={0.7}
              style={{
                width: (mobileW * 70) / 100,
                flexDirection: "row",
                justifyContent: "space-between",
                marginTop: (mobileH * 2) / 100,
              }}
            >
              <Text
                style={{
                  color: Colors.black_color,
                  fontSize: (mobileW * 3.5) / 100,
                  fontFamily: Font.FontMedium,
                }}
              >
                {Lang_chg.Favourites_txt[config.language]}
              </Text>
              <Image
                style={{
                  width: (mobileW * 3.5) / 100,
                  height: (mobileW * 3.5) / 100,
                  alignSelf: "center",
                  resizeMode: "contain",
                }}
                source={localimag.backr}
              ></Image>
            </TouchableOpacity>
            {/* ----for view----border */}
            <View
              style={{
                width: (mobileW * 80) / 100,
                borderColor: Colors.border_color,
                borderWidth: (mobileW * 0.2) / 100,
                backgroundColor: Colors.border_color,
                marginTop: (mobileH * 1.5) / 100,
              }}
            ></View>
            {/* --for My Bookings --- */}
            <TouchableOpacity
              activeOpacity={0.7}
              style={{
                width: (mobileW * 70) / 100,
                flexDirection: "row",
                justifyContent: "space-between",
                marginTop: (mobileH * 2) / 100,
              }}
            >
              <Text
                style={{
                  color: Colors.black_color,
                  fontSize: (mobileW * 3.5) / 100,
                  fontFamily: Font.FontMedium,
                }}
              >
                {Lang_chg.Bookings_txt[config.language]}
              </Text>
              <Image
                style={{
                  width: (mobileW * 3.5) / 100,
                  height: (mobileW * 3.5) / 100,
                  alignSelf: "center",
                  resizeMode: "contain",
                }}
                source={localimag.backr}
              ></Image>
            </TouchableOpacity>
            {/* ----for view----border */}
            <View
              style={{
                width: (mobileW * 80) / 100,
                borderColor: Colors.border_color,
                borderWidth: (mobileW * 0.2) / 100,
                backgroundColor: Colors.border_color,
                marginTop: (mobileH * 1.5) / 100,
              }}
            ></View>
            {/* --for setting --- */}
            <TouchableOpacity
              activeOpacity={0.7}
              style={{
                width: (mobileW * 70) / 100,
                flexDirection: "row",
                justifyContent: "space-between",
                marginTop: (mobileH * 2) / 100,
              }}
            >
              <Text
                style={{
                  color: Colors.black_color,
                  fontSize: (mobileW * 3.5) / 100,
                  fontFamily: Font.FontMedium,
                }}
              >
                {Lang_chg.Propased_txt[config.language]}
              </Text>
              <Image
                style={{
                  width: (mobileW * 3.5) / 100,
                  height: (mobileW * 3.5) / 100,
                  alignSelf: "center",
                  resizeMode: "contain",
                }}
                source={localimag.backr}
              ></Image>
            </TouchableOpacity>
            {/* ----for view----border */}
            <View
              style={{
                width: (mobileW * 80) / 100,
                borderColor: Colors.border_color,
                borderWidth: (mobileW * 0.2) / 100,
                backgroundColor: Colors.border_color,
                marginTop: (mobileH * 1.5) / 100,
              }}
            ></View>
            {/* --for Setting --- */}
            <TouchableOpacity
              activeOpacity={0.7}
              style={{
                width: (mobileW * 70) / 100,
                flexDirection: "row",
                justifyContent: "space-between",
                marginTop: (mobileH * 2) / 100,
              }}
            >
              <Text
                style={{
                  color: Colors.black_color,
                  fontSize: (mobileW * 3.5) / 100,
                  fontFamily: Font.FontMedium,
                }}
              >
                {Lang_chg.Setting[config.language]}
              </Text>
              <Image
                style={{
                  width: (mobileW * 3.5) / 100,
                  height: (mobileW * 3.5) / 100,
                  alignSelf: "center",
                  resizeMode: "contain",
                }}
                source={localimag.backr}
              ></Image>
            </TouchableOpacity>
            {/* ----for view----border */}
            <View
              style={{
                width: (mobileW * 80) / 100,
                borderColor: Colors.border_color,
                borderWidth: (mobileW * 0.2) / 100,
                backgroundColor: Colors.border_color,
                marginTop: (mobileH * 1.5) / 100,
              }}
            ></View>
            {/* --for Logout--- */}
            <TouchableOpacity
              activeOpacity={0.7}
              style={{
                width: (mobileW * 70) / 100,
                flexDirection: "row",
                justifyContent: "space-between",
                marginTop: (mobileH * 2) / 100,
              }}
            >
              <Text
                style={{
                  color: Colors.black_color,
                  fontSize: (mobileW * 3.5) / 100,
                  fontFamily: Font.FontMedium,
                }}
              >
                {Lang_chg.Logout_txt[config.language]}
              </Text>
              <Image
                style={{
                  width: (mobileW * 3.5) / 100,
                  height: (mobileW * 3.5) / 100,
                  alignSelf: "center",
                  resizeMode: "contain",
                }}
                source={localimag.backr}
              ></Image>
            </TouchableOpacity>
            {/* ----for view----border */}
            <View
              style={{
                width: (mobileW * 80) / 100,
                borderColor: Colors.border_color,
                borderWidth: (mobileW * 0.2) / 100,
                backgroundColor: Colors.border_color,
                marginTop: (mobileH * 1.5) / 100,
              }}
            ></View>
          </View>
        </View>
        {/* ------------------for icone --------------------- */}
        <View
          style={{
            width: (mobileW * 27) / 100,
            height: (mobileH * 14) / 100,
            alignSelf: "center",

            backgroundColor: Colors.whiteColor,
            borderRadius: (mobileW * 30) / 100,
            position: "absolute",
            top: (mobileH * 17) / 100,
            elevation: 6,
          }}
        >
          <Image
            style={{
              width: (mobileW * 24.5) / 100,
              height: (mobileW * 24.5) / 100,
              alignSelf: "center",
              marginTop: (mobileH * 0.3) / 100,
              borderRadius: (mobileH * 25) / 100,
              resizeMode: "cover",
            }}
            source={localimag.home_banner}
          ></Image>
        </View>
        <KeyboardAwareScrollView
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ width: mobileW }}
          keyboardShouldPersistTaps="handled"
        ></KeyboardAwareScrollView>
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
  view1: {
    backgroundColor: Colors.whiteColor,
    height: (mobileH * 8) / 100,

    flexDirection: "row",
    width: (mobileW * 88) / 100,
    alignSelf: "center",
    alignItems: "center",
  },

  linearGradient: {
    marginTop: (mobileH * 1) / 100,
    height: (mobileH * 7.3) / 100,
    width: (mobileW * 90) / 100,
    borderRadius: (mobileW * 0.7) / 100, // <-- Outer Border Radius
  },
  innerContainer: {
    borderRadius: (mobileW * 0.7) / 100, // <-- Inner Border Radius
    flex: 1,
    margin: (mobileW * 0.4) / 100, // <-- Border Width
    backgroundColor: Colors.whiteColor,
    flexDirection: "row",
    alignItems: "flex-start",
  },
  buttonText: {
    fontSize: (mobileW * 3.7) / 100,
    fontFamily: Font.FontRegular,
    marginLeft: (mobileW * 1.5) / 100,
    color: Colors.black_color,
    backgroundColor: Colors.whiteColor,
    height: (mobileH * 5) / 100,
    width: (mobileW * 62) / 100,
    alignSelf: "center",
    alignItems: "center",
  },
  icon1s: {
    width: (mobileW * 7) / 100,
    height: (mobileW * 7) / 100,
    resizeMode: "contain",
    alignSelf: "center",
  },
  createaccount: {
    color: Colors.bluegreen_color,
    fontFamily: Font.FontBold,
    fontSize: (mobileW * 4.5) / 100,
  },
});
