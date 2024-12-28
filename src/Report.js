import React, { Component } from "react";
import {
  Text,
  SafeAreaView,
  StatusBar,
  View,
  StyleSheet,
  Keyboard,
  TouchableOpacity,
  Image,
  TextInput,
} from "react-native";
import {
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

export default class Report extends Component {
  constructor(props) {
    super(props);
    this.state = {
      report: "",
    };
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
        {/* ---------------for header--------------- */}
        <View style={{ alignItems: "center", alignSelf: "center" }}>
          <LinearGradient
            colors={[Colors.purple_color, Colors.light_greencolor]}
            start={{ x: 0, y: 1 }}
            end={{ x: 1, y: 1 }}
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
                {Lang_chg.Report_txt[config.language]}
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
          {/* //=========Report======// */}
          <LinearGradient
            colors={[Colors.light_greencolor, Colors.voilet_color]}
            start={{ x: 0, y: 1 }}
            end={{ x: 0, y: 0 }}
            style={styles.linearGradient}
          >
            <View style={styles.innerContainer}>
              <View
                style={{
                  marginLeft: (mobileW * 2.5) / 100,
                  marginTop: (mobileH * 2.3) / 100,
                }}
              >
                <Image
                  resizeMode="contain"
                  style={{
                    width: (mobileW * 4.2) / 100,
                    height: (mobileW * 4.2) / 100,
                  }}
                  source={localimag.edit}
                ></Image>
              </View>
              <View
                style={{
                  borderEndWidth: 1,
                  borderColor: Colors.bluegreen_color,
                  alignItems: "flex-start",
                  justifyContent: "flex-start",
                  width: (mobileW * 3) / 100,
                  height: (mobileH * 3.5) / 100,
                  marginTop: (mobileH * 1.5) / 100,
                }}
              >
                <Text style={{}}></Text>
              </View>
              <TextInput
                style={styles.buttonText}
                placeholderTextColor={Colors.greyColor}
                placeholder="Message"
                keyboardType="default"
                returnKeyLabel="done"
                returnKeyType="done"
                multiline={true}
                ref={(input) => {
                  this.mobilefield = input;
                }}
                onSubmitEditing={() => {
                  Keyboard.dismiss();
                }}
                onFocus={() => {
                  this.setState({ errorno: 0, activeinput: 1 });
                }}
                onChangeText={(txt) => {
                  this.setState({ report: txt });
                }}
                value={this.state.report}
                maxLength={250}
              />
            </View>
          </LinearGradient>

          {/* //=========Login Submit============// */}
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate("NoOfGuest")}
            activeOpacity={0.7}
            style={{ alignItems: "center", alignSelf: "center" }}
          >
            <LinearGradient
              colors={[Colors.purple_color, Colors.bluegreen_color]}
              start={{ x: 0, y: 1 }}
              end={{ x: 1, y: 0 }}
              style={{
                height: (mobileH * 6.7) / 100,
                width: (mobileW * 90) / 100,
                alignSelf: "center",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: (mobileW * 1.5) / 100,
                marginTop: (mobileH * 3) / 100,
              }}
            >
              <Text
                style={{
                  color: "#f5f4f5",
                  fontFamily: Font.FontBold,
                  fontSize: (mobileW * 4.3) / 100,
                }}
              >
                {Lang_chg.Submit_txt}
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        </KeyboardAwareScrollView>
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

  linearGradient: {
    marginTop: (mobileH * 4) / 100,
    height: (mobileH * 20) / 100,
    width: (mobileW * 90) / 100,
    alignSelf: "center",
    borderRadius: (mobileW * 1.5) / 100, // <-- Outer Border Radius
  },
  innerContainer: {
    borderRadius: (mobileW * 1.5) / 100, // <-- Inner Border Radius
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
    marginTop:
      config.device_type == "ios" ? (mobileH * 1.5) / 100 : (mobileH * 0) / 100,
    paddingVertical: (mobileH * 1.5) / 100,
    width: (mobileW * 62) / 100,
    alignSelf: "flex-start",
    alignItems: "flex-start",
  },
});
