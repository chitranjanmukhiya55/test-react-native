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

export default class SuccessfullyBooked extends Component {
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
        {/* ---------------for background-------------- */}
        <KeyboardAwareScrollView
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ width: mobileW }}
          keyboardShouldPersistTaps="handled"
        >
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
                }}
              >
                <Text
                  style={{
                    color: Colors.whiteColor,
                    fontFamily: Font.FontBold,
                    fontSize: (mobileW * 5.5) / 100,
                  }}
                >
                  {Lang_chg.Success_txt[config.language]}
                </Text>
                <Text
                  style={{
                    color: Colors.whiteColor,
                    fontFamily: Font.FontSemiBold,
                    fontSize: (mobileW * 4.5) / 100,
                    paddingVertical: (mobileH * 0.2) / 100,
                  }}
                >
                  {Lang_chg.successfullyhave_txt[config.language]}
                </Text>
                <Text
                  style={{
                    color: Colors.whiteColor,
                    fontFamily: Font.FontSemiBold,
                    fontSize: (mobileW * 4.5) / 100,
                  }}
                >
                  {Lang_chg.vendors_txt[config.language]}
                </Text>
              </View>
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate("Einvites")}
                activeOpacity={0.7}
                style={{
                  width: (mobileW * 30) / 100,
                  alignItems: "center",
                  backgroundColor: Colors.whiteColor,
                  borderRadius: (mobileW * 2) / 100,
                  alignSelf: "center",
                  marginTop: (mobileH * 2) / 100,
                }}
              >
                <Text
                  style={{
                    color: Colors.purple_color,
                    fontFamily: Font.FontBold,
                    fontSize: (mobileW * 3.8) / 100,
                    paddingVertical: (mobileH * 1.8) / 100,
                  }}
                >
                  {Lang_chg.Done_txt[config.language]}
                </Text>
              </TouchableOpacity>
            </LinearGradient>
          </View>
          {/* ------------------header end ---------------- */}
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
