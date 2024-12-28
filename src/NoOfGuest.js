import React, { Component } from "react";
import {
  Text,
  SafeAreaView,
  StatusBar,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";
import {
  config,
  Lang_chg,
  Font,
  Colors,
  mobileH,
  mobileW,
  localimag,
  consolepro,
  localStorage,
  msgProvider,
  msgText,
} from "./Provider/utilslib/Utils";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import LinearGradient from "react-native-linear-gradient";

export default class NoOfGuest extends Component {
  constructor(props) {
    super(props);
    this.state = {
      report: "",
      image_change_gender: 0,
    };
  }
  componentDidMount() {
    this.props.navigation.addListener("focus", () => {
      this.setgender();
    });
  }
  async setgender() {
    let gender = await localStorage.getItemObject("image_change_gender");
    consolepro.consolelog("gendergendergender", gender);
    if (gender != null) {
      this.setState({ image_change_gender: gender });
    }
  }

  continueButton() {
    consolepro.consolelog(
      "image_change_gender",
      this.state.image_change_gender
    );

    localStorage.setItemObject(
      "image_change_gender",
      this.state.image_change_gender
    );
    if (this.state.image_change_gender == 0) {
      msgProvider.toast(msgText.emptynoofGuest[config.language], "center");
      return false;
    }
    this.props.navigation.goBack();
  }

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
        {/* ---------------for header--------------- */}
        <View style={{ alignItems: "center", alignSelf: "center" }}>
          <LinearGradient
            colors={[Colors.purple_color, Colors.bluegreen_color]}
            start={{ x: 1, y: 1 }}
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
            <View style={{ width: (mobileW * 70) / 100, alignItems: "center" }}>
              <Text
                style={{
                  color: Colors.whiteColor,
                  fontFamily: Font.FontSemiBold,
                  fontSize: (mobileW * 5) / 100,
                }}
              >
                {Lang_chg.of_Guest_txt[config.language]}
              </Text>
            </View>
            <View
              style={{ width: (mobileW * 15) / 100, alignItems: "center" }}
            ></View>
          </LinearGradient>
        </View>
        {/* ------------------header end ---------------- */}
        <KeyboardAwareScrollView
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ width: mobileW }}
          keyboardShouldPersistTaps="handled"
        >
          {/* ----for first view--------- */}
          <TouchableOpacity
            onPress={() => this.setState({ image_change_gender: 1 })}
            style={{
              width: (mobileW * 90) / 100,
              alignSelf: "center",
              flexDirection: "row",
              marginTop: (mobileH * 3) / 100,
              justifyContent: "space-between",
            }}
          >
            <Text
              style={{
                color: Colors.black_color,
                fontFamily: Font.FontSemiBold,
                fontSize: (mobileW * 4) / 100,
              }}
            >
              {Lang_chg.of_020_txt[config.language]}
            </Text>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              {this.state.image_change_gender == 1 ? (
                <Image
                  style={{
                    width: (mobileW * 4.5) / 100,
                    height: (mobileW * 4.5) / 100,
                    marginTop: (mobileH * 0.6) / 100,
                    resizeMode: "contain",
                  }}
                  source={localimag.check_1}
                ></Image>
              ) : (
                <Image
                  style={{
                    width: (mobileW * 4.5) / 100,
                    height: (mobileW * 4.5) / 100,
                    marginTop: (mobileH * 0.6) / 100,
                    resizeMode: "contain",
                  }}
                  source={localimag.uncheck}
                ></Image>
              )}
            </View>
          </TouchableOpacity>
          <View
            style={{
              width: (mobileW * 92) / 100,
              alignSelf: "center",
              marginTop: (mobileH * 1.5) / 100,
              borderWidth: (mobileW * 0.3) / 100,
              borderColor: Colors.border_color,
              backgroundColor: Colors.border_color,
            }}
          ></View>
          {/* ----for second view--------- */}
          <TouchableOpacity
            onPress={() => this.setState({ image_change_gender: 2 })}
            style={{
              width: (mobileW * 90) / 100,
              alignSelf: "center",
              flexDirection: "row",
              marginTop: (mobileH * 2) / 100,
              justifyContent: "space-between",
            }}
          >
            <Text
              style={{
                color: Colors.black_color,
                fontFamily: Font.FontSemiBold,
                fontSize: (mobileW * 4) / 100,
              }}
            >
              {Lang_chg.of_050_txt[config.language]}
            </Text>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              {this.state.image_change_gender == 2 ? (
                <Image
                  style={{
                    width: (mobileW * 4.5) / 100,
                    height: (mobileW * 4.5) / 100,
                    marginTop: (mobileH * 0.6) / 100,
                    resizeMode: "contain",
                  }}
                  source={localimag.check_1}
                ></Image>
              ) : (
                <Image
                  style={{
                    width: (mobileW * 4.5) / 100,
                    height: (mobileW * 4.5) / 100,
                    marginTop: (mobileH * 0.6) / 100,
                    resizeMode: "contain",
                  }}
                  source={localimag.uncheck}
                ></Image>
              )}
            </View>
          </TouchableOpacity>
          <View
            style={{
              width: (mobileW * 92) / 100,
              alignSelf: "center",
              marginTop: (mobileH * 1.5) / 100,
              borderWidth: (mobileW * 0.3) / 100,
              borderColor: Colors.border_color,
              backgroundColor: Colors.border_color,
            }}
          ></View>
          {/* ----for third view--------- */}
          <TouchableOpacity
            onPress={() => this.setState({ image_change_gender: 3 })}
            style={{
              width: (mobileW * 90) / 100,
              alignSelf: "center",
              flexDirection: "row",
              marginTop: (mobileH * 2) / 100,
              justifyContent: "space-between",
            }}
          >
            <Text
              style={{
                color: Colors.black_color,
                fontFamily: Font.FontSemiBold,
                fontSize: (mobileW * 4) / 100,
              }}
            >
              {Lang_chg.of_100_txt[config.language]}
            </Text>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              {this.state.image_change_gender == 3 ? (
                <Image
                  style={{
                    width: (mobileW * 4.5) / 100,
                    height: (mobileW * 4.5) / 100,
                    marginTop: (mobileH * 0.6) / 100,
                    resizeMode: "contain",
                  }}
                  source={localimag.check_1}
                ></Image>
              ) : (
                <Image
                  style={{
                    width: (mobileW * 4.5) / 100,
                    height: (mobileW * 4.5) / 100,
                    marginTop: (mobileH * 0.6) / 100,
                    resizeMode: "contain",
                  }}
                  source={localimag.uncheck}
                ></Image>
              )}
            </View>
          </TouchableOpacity>
          <View
            style={{
              width: (mobileW * 92) / 100,
              alignSelf: "center",
              marginTop: (mobileH * 1.5) / 100,
              borderWidth: (mobileW * 0.3) / 100,
              borderColor: Colors.border_color,
              backgroundColor: Colors.border_color,
            }}
          ></View>
          {/* ----for four view--------- */}
          <TouchableOpacity
            onPress={() => this.setState({ image_change_gender: 4 })}
            style={{
              width: (mobileW * 90) / 100,
              alignSelf: "center",
              flexDirection: "row",
              marginTop: (mobileH * 2) / 100,
              justifyContent: "space-between",
            }}
          >
            <Text
              style={{
                color: Colors.black_color,
                fontFamily: Font.FontSemiBold,
                fontSize: (mobileW * 4) / 100,
              }}
            >
              {Lang_chg.Custom_txt[config.language]}
            </Text>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              {this.state.image_change_gender == 4 ? (
                <Image
                  style={{
                    width: (mobileW * 4.5) / 100,
                    height: (mobileW * 4.5) / 100,
                    marginTop: (mobileH * 0.6) / 100,
                    resizeMode: "contain",
                  }}
                  source={localimag.check_1}
                ></Image>
              ) : (
                <Image
                  style={{
                    width: (mobileW * 4.5) / 100,
                    height: (mobileW * 4.5) / 100,
                    marginTop: (mobileH * 0.6) / 100,
                    resizeMode: "contain",
                  }}
                  source={localimag.uncheck}
                ></Image>
              )}
            </View>
          </TouchableOpacity>
          <View
            style={{
              width: (mobileW * 92) / 100,
              alignSelf: "center",
              marginTop: (mobileH * 1.5) / 100,
              borderWidth: (mobileW * 0.3) / 100,
              borderColor: Colors.border_color,
              backgroundColor: Colors.border_color,
            }}
          ></View>
        </KeyboardAwareScrollView>
        {/* //=========Login Submit============// */}
        <TouchableOpacity
          onPress={() => this.continueButton()}
          activeOpacity={0.7}
          style={{
            alignItems: "center",
            alignSelf: "center",
            position: "absolute",
            bottom: (mobileH * 5) / 100,
          }}
        >
          <LinearGradient
            colors={[Colors.purple_color, Colors.bluegreen_color]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={{
              height: (mobileH * 6.7) / 100,
              width: (mobileW * 90) / 100,
              alignSelf: "center",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: (mobileW * 1.5) / 100,
              // marginTop: mobileH * 50 / 100
            }}
          >
            <Text
              style={{
                color: "#f5f4f5",
                fontFamily: Font.FontBold,
                fontSize: (mobileW * 4.3) / 100,
              }}
            >
              {Lang_chg.Continue_txt}
            </Text>
          </LinearGradient>
        </TouchableOpacity>
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
