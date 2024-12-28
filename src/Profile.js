import React, { Component } from "react";
import {
  Text,
  SafeAreaView,
  StatusBar,
  Alert,
  View,
  StyleSheet,
  Image,
} from "react-native";
import {
  config,
  consolepro,
  Lang_chg,
  Font,
  Colors,
  mobileH,
  mobileW,
  localimag,
  localStorage,
} from "./Provider/utilslib/Utils";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import LinearGradient from "react-native-linear-gradient";
import Footer from "./Provider/Footer";
import { TouchableOpacity } from "react-native-gesture-handler";
export default class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user_details: "",
    };
  }
  componentDidMount() {
    this.props.navigation.addListener("focus", () => {
      this.getUserProfileDetails();
      consolepro.consolelog("----------------------------------- Profile");
    });
    this.getUserProfileDetails();
  }

  async getUserProfileDetails() {
    let user_details = await localStorage.getItemObject("user_arr");
    consolepro.consolelog("user_details47", user_details);
    this.setState({ user_details: user_details });
  }
  //--------for logout ---------//
  logoutbtn = () => {
    Alert.alert(
      Lang_chg.Logout_txt[config.language],
      Lang_chg.are_you_logout[config.language],
      [
        {
          text: Lang_chg.no_txt[config.language],
          onPress: () => {
            consolepro.consolelog("nothing");
          },
        },
        {
          text: Lang_chg.yes_txt[config.language],
          onPress: () => config.AppLogout(this.props.navigation),
        },
      ],
      { cancelable: false }
    );
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
        {/* -------------------for background----------------- */}
        <View style={{ flex: 1 }}>
          <LinearGradient
            colors={[Colors.purple_color, Colors.light_greencolor]}
            start={{ x: 1, y: 1 }}
            end={{ x: 0, y: 0 }}
            style={{
              height: (mobileH * 40) / 100,
              width: mobileW,
              alignSelf: "center",
              alignItems: "center",
            }}
          >
            <View style={{ marginTop: (mobileH * 1) / 100 }}>
              <Text
                style={{
                  color: Colors.whiteColor,
                  fontSize: (mobileW * 5.2) / 100,
                  fontFamily: Font.FontSemiBold,
                  paddingTop: (mobileH * 1) / 100,
                }}
              >
                {Lang_chg.Profile_txt[config.language]}
              </Text>
            </View>
          </LinearGradient>
        </View>
        {/* ------------------for icone --------------------- */}

        {/* -----for background view------------------ */}

        <View
          style={{
            width: (mobileW * 83) / 100,
            alignSelf: "center",
            height:
              config.device_type == "ios"
                ? (mobileH * 45) / 100
                : (mobileH * 50) / 100,
            backgroundColor: Colors.whiteColor,
            shadowColor: "#000000",
            marginTop: (mobileH * 9.5) / 100,
            shadowOffset: { width: 0, height: 13 },
            shadowOpacity: 0.17,
            shadowRadius: 3.05,
            elevation: 4,
            backgroundColor: Colors.whiteColor,
            marginTop: (mobileH * 17) / 100,
          }}
        >
          <View
            style={{
              width:
                config.device_type == "ios"
                  ? (mobileW * 0) / 100
                  : (mobileW * 0) / 100,
              paddingVertical: (mobileH * 0.6) / 100,
              alignSelf: "center",
              backgroundColor: Colors.whiteColor,
              borderRadius: (mobileW * 30) / 100,
              bottom: (mobileH * 7.9) / 100,
            }}
          >
            <View
              style={{
                width: 15 / 100,
                height: (mobileW * 15) / 100,
                backgroundColor: Colors.whiteColor,
                borderRadius: (mobileW * 35) / 100,
                padding:
                  config.device_type == "ios"
                    ? (mobileH * 7.9) / 100
                    : (mobileH * 8.2) / 100,
                alignSelf: "center",
                justifyContent: "center",
                shadowColor: "#000000",
                alignItems: "center",
                backgroundColor: Colors.whiteColor,
                shadowColor: "#000000",
                shadowOffset: { width: 0, height: 13 },
                shadowOpacity: 0.17,
                shadowRadius: 3.05,
                elevation: 14,
              }}
            >
              <Image
                style={{
                  width: (mobileW * 30.5) / 100,
                  height: (mobileW * 30.5) / 100,
                  alignSelf: "center",
                  borderRadius: (mobileH * 25) / 100,
                  resizeMode: "cover",
                }}
                source={
                  this.state.user_details.image != null
                    ? { uri: config.img_url + this.state.user_details.image }
                    : localimag.userplaceholder
                }
              ></Image>
            </View>
            <View
              style={{
                width: (mobileW * 70) / 100,
                alignSelf: "center",
                alignItems: "center",
                marginTop: (mobileH * 2.5) / 100,
              }}
            >
              <Text
                style={{
                  color: Colors.black_color,
                  fontSize: (mobileW * 4.5) / 100,
                  fontFamily: Font.FontBold,
                }}
              >
                {this.state.user_details.name}
              </Text>
              <Text
                style={{
                  color: Colors.black_color,
                  fontSize: (mobileW * 3.5) / 100,
                  fontFamily: Font.FontMedium,
                  paddingVertical: (mobileH * 0.5) / 100,
                }}
              >
                {this.state.user_details.email}
              </Text>
              <Text
                style={{
                  color: Colors.black_color,
                  fontSize: (mobileW * 3.5) / 100,
                  fontFamily: Font.FontMedium,
                }}
              >
                {"+" +
                  this.state.user_details.phone_code +
                  " " +
                  this.state.user_details.mobile}
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
              <View
                style={{
                  width: (mobileW * 83) / 100,
                  borderColor: Colors.border_color,
                  borderWidth: (mobileW * 0.2) / 100,
                  backgroundColor: Colors.border_color,
                  marginBottom: (mobileH * 2) / 100,
                }}
              ></View>
              {/* --for edit profile--- */}
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate("Editprofile")}
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
                    fontSize: (mobileW * 4) / 100,
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
                  width: (mobileW * 83) / 100,
                  borderColor: Colors.border_color,
                  borderWidth: (mobileW * 0.2) / 100,
                  backgroundColor: Colors.border_color,
                  marginTop: (mobileH * 1.5) / 100,
                }}
              ></View>

              {/* --for Event --- */}
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => this.props.navigation.navigate("EventsHistory")}
                style={{
                  width: (mobileW * 70) / 100,
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginTop: (mobileH * 2.5) / 100,
                }}
              >
                <Text
                  style={{
                    color: Colors.black_color,
                    fontSize: (mobileW * 4) / 100,
                    fontFamily: Font.FontMedium,
                  }}
                >
                  {Lang_chg.Events_History_txt[config.language]}
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
                  width: (mobileW * 83) / 100,
                  borderColor: Colors.border_color,
                  borderWidth: (mobileW * 0.2) / 100,
                  backgroundColor: Colors.border_color,
                  marginTop: (mobileH * 1.5) / 100,
                }}
              ></View>
              {/* --for Setting --- */}
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => this.props.navigation.navigate("Setting")}
                style={{
                  width: (mobileW * 70) / 100,
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginTop: (mobileH * 2.5) / 100,
                }}
              >
                <Text
                  style={{
                    color: Colors.black_color,
                    fontSize: (mobileW * 4) / 100,
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
                  width: (mobileW * 83) / 100,
                  borderColor: Colors.border_color,
                  borderWidth: (mobileW * 0.2) / 100,
                  backgroundColor: Colors.border_color,
                  marginTop: (mobileH * 1.5) / 100,
                }}
              ></View>
            </View>
          </View>
        </View>

        <KeyboardAwareScrollView
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ width: mobileW }}
          keyboardShouldPersistTaps="handled"
        ></KeyboardAwareScrollView>

        <LinearGradient
          colors={[Colors.voilet_color, Colors.light_greencolor]}
          start={{ x: 1, y: 1 }}
          end={{ x: 0, y: 0 }}
          style={styles.linearGradient1}
        >
          <Footer
            activepage="Profile"
            usertype={1}
            footerpage={[
              {
                name: "Home",
                title: "Home",
                countshow: false,
                image: localimag.home_deactive,
                activeimage: localimag.home,
              },
              {
                name: "MyEvents",
                title: "My Events",
                countshow: false,
                image: localimag.manage_event,
                activeimage: localimag.my_event_active,
              },
              {
                name: "Einvites",
                title: "E-invites",
                countshow: false,
                image: localimag.messages,
                activeimage: localimag.invite_active,
              },
              {
                name: "InboxBooking",
                title: "Chat",
                countshow: false,
                image: localimag.chat,
                activeimage: localimag.chat_active,
              },
              {
                name: "Profile",
                title: "Profile",
                countshow: false,
                image: localimag.profile,
                activeimage: localimag.profile_active,
              },
            ]}
            navigation={this.props.navigation}
            imagestyle1={{
              width: (mobileW * 6) / 100,
              height: (mobileW * 6) / 100,
              countcolor: "black",
              countbackground: "black",
            }}
            GuestUser={false}
          />
        </LinearGradient>
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
  linearGradient1: {
    marginTop: (mobileH * 1) / 100,
    height: (mobileH * 9) / 100,
    width: (mobileW * 100) / 100,
  },
});
