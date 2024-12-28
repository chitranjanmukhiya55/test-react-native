import React, { Component } from "react";
import {
  Text,
  BackHandler,
  SafeAreaView,
  StatusBar,
  KeyboardAvoidingView,
  Alert,
  View,
  StyleSheet,
  Keyboard,
  Dimensions,
  ImageBackground,
  TouchableOpacity,
  Image,
  Modal,
  FlatList,
  ScrollView,
  RadioButton,
  Button,
  TextInput,
  ActivityIndicator,
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
  notification,
} from "./Provider/utilslib/Utils";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import CountDown from "react-native-countdown-component";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import LinearGradient from "react-native-linear-gradient";

export default class VendorLocation extends Component {
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
          backgroundColor={Colors.whiteColor}
          translucent={false}
          barStyle="dark-content"
          networkActivityIndicatorVisible={true}
        />
        {/* ---------------for header--------------- */}
        <View style={{ alignItems: "center", alignSelf: "center" }}>
          <LinearGradient
            colors={[Colors.light_greencolor, Colors.purple_color]}
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
                {Lang_chg.Location_txt[config.language]}
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
          <ImageBackground
            style={{
              width: mobileW,
              height: mobileH,
            }}
            source={localimag.Group_2015}
          >
            {/*===========Search----------------------  */}

            <View
              style={{
                marginTop: (mobileH * 2) / 100,
                flexDirection: "row",
                width: (mobileW * 92) / 100,
                borderRadius: (mobileW * 1.5) / 100,
                backgroundColor: Colors.whiteColor,
                paddingVertical: (mobileH * 0.1) / 100,
                shadowColor: Colors.shadow_color,
                shadowOffset: { width: 2, height: 2 },
                shadowOpacity: 0.2,
                elevation: 1,
                alignSelf: "center",
                backgroundColor: Colors.border_color,
                paddingHorizontal: (mobileW * 3) / 100,
              }}
            >
              <Image
                style={{
                  height: (mobileW * 6) / 100,
                  width: (mobileW * 6) / 100,
                  resizeMode: "contain",
                  alignSelf: "center",
                  justifyContent: "center",
                  marginLeft: (mobileW * 0.5) / 100,
                }}
                source={localimag.grey_search}
              ></Image>
              <TextInput
                style={{
                  width: "95%",
                  justifyContent: "center",
                  alignSelf: "center",
                  fontFamily: Font.FontSemiBold,
                  paddingVertical: (mobileW * 3) / 100,
                  color: Colors.black_color,
                  fontSize: (mobileW * 4.2) / 100,
                  marginLeft: (mobileW * 1.5) / 100,
                }}
                onChangeText={(txt) => {
                  this.setState({ enterreceipt: txt });
                }}
                maxLength={53}
                returnKeyLabel="done"
                returnKeyType="done"
                onSubmitEditing={() => {
                  Keyboard.dismiss();
                }}
                placeholderTextColor={Colors.greyColor}
                placeholder={"Search "}
              />
            </View>
            {/* ==========================search end=============================== */}
            {/* ----------------for button--------- */}
            <TouchableOpacity
              onPress={() => this.props.navigation.goBack()}
              activeOpacity={0.7}
              style={{
                marginTop: (mobileH * 68) / 100,
                alignItems: "center",
                alignSelf: "center",
                marginBottom: (mobileH * 2) / 100,
              }}
            >
              <LinearGradient
                colors={[Colors.purple_color, Colors.light_greencolor]}
                start={{ x: 0, y: 1 }}
                end={{ x: 1, y: 0 }}
                style={{
                  height: (mobileH * 6.7) / 100,
                  width: (mobileW * 90) / 100,
                  alignSelf: "center",
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: (mobileW * 1.5) / 100,
                }}
              >
                <Text
                  style={{
                    color: "#f5f4f5",
                    fontFamily: Font.FontBold,
                    fontSize: (mobileW * 4.3) / 100,
                  }}
                >
                  {Lang_chg.Continue_txt[config.language]}
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          </ImageBackground>
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
});
