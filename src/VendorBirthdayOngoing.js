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
  Lang_chg,
  Font,
  Colors,
  mobileH,
  mobileW,
  localimag,
} from "./Provider/utilslib/Utils";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import LinearGradient from "react-native-linear-gradient";
import DashedLine from "react-native-dashed-line";

export default class VendorBirthdayOngoing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      work: 0,
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
            start={{ x: 1, y: 1 }}
            end={{ x: 0, y: 1 }}
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
              onPress={() =>
                this.props.navigation.navigate("VendorMyEventsCompleted")
              }
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
                {Lang_chg.Birthday_txt[config.language]}
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
          <View
            style={{
              width: (mobileW * 95) / 100,
              // alignSelf: 'center',
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: (mobileH * 2) / 100,
              paddingHorizontal: (mobileW * 4) / 100,
            }}
          >
            <Text
              style={{
                color: Colors.black_color,
                fontFamily: Font.FontSemiBold,
                fontSize: (mobileW * 3.8) / 100,
              }}
            >
              {Lang_chg.Booking_txt[config.language]}
            </Text>
            <Text
              style={{
                color: Colors.black_color,
                fontFamily: Font.FontSemiBold,
                fontSize: (mobileW * 3.8) / 100,
              }}
            >
              {Lang_chg.Booking_ID_txt[config.language]}
            </Text>
          </View>
          {/* ================for grediant view---------------- */}
          <View style={{ alignItems: "center", alignSelf: "center" }}>
            <LinearGradient
              colors={[Colors.light_greencolor, Colors.purple_color]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={{
                height: (mobileH * 6) / 100,
                width: (mobileW * 100) / 100,
                alignSelf: "center",
                alignItems: "center",
                marginTop: (mobileH * 2) / 100,
              }}
            >
              <View
                style={{
                  width: (mobileW * 92) / 100,
                  alignSelf: "center",
                  paddingVertical: (mobileH * 1.5) / 100,
                }}
              >
                <Text
                  style={{
                    color: Colors.whiteColor,
                    fontFamily: Font.FontSemiBold,
                    fontSize: (mobileW * 3.8) / 100,
                    paddingTop: (mobileH * 0.2) / 100,
                  }}
                >
                  {Lang_chg.Event_Details_txt[config.language]}
                </Text>
              </View>
            </LinearGradient>
          </View>
          {/* -------for text view--------------------------------- */}
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              width: (mobileW * 92) / 100,
              alignSelf: "center",
            }}
          >
            {/* for first view */}
            <View
              style={{
                width: (mobileW * 50) / 100,
                justifyContent: "flex-start",
                borderRadius: (mobileW * 1) / 100,
                paddingVertical: (mobileH * 1) / 100,
              }}
            >
              <Text
                style={{
                  fontSize: (mobileW * 3.5) / 100,
                  fontFamily: Font.FontSemiBold,
                  color: Colors.black_color,
                }}
              >
                {Lang_chg.Event_Title_txt[config.language]}
              </Text>
              <Text
                style={{
                  fontSize: (mobileW * 3.2) / 100,
                  fontFamily: Font.FontRegular,
                  color: Colors.black_color,
                  width: (mobileW * 50) / 100,
                }}
              >
                {Lang_chg.Birthday_Celebration_txt[config.language]}
              </Text>

              <Text
                style={{
                  fontSize: (mobileW * 3.5) / 100,
                  fontFamily: Font.FontSemiBold,
                  color: Colors.black_color,
                  paddingTop: (mobileH * 2) / 100,
                }}
              >
                {Lang_chg.Guest_txt[config.language]}
              </Text>
              <Text
                style={{
                  fontSize: (mobileW * 3.2) / 100,
                  fontFamily: Font.FontRegular,
                  color: Colors.black_color,
                }}
              >
                {Lang_chg.Guest50_txt[config.language]}
              </Text>
            </View>
            {/* ----for second view */}
            <View
              style={{
                width: (mobileW * 45) / 100,
                justifyContent: "flex-start",
                borderRadius: (mobileW * 1) / 100,
                paddingVertical: (mobileH * 1) / 100,
              }}
            >
              <Text
                style={{
                  fontSize: (mobileW * 3.5) / 100,
                  fontFamily: Font.FontSemiBold,
                  color: Colors.black_color,
                }}
              >
                {Lang_chg.DateTime_txt[config.language]}
              </Text>
              <Text
                style={{
                  fontSize: (mobileW * 3.2) / 100,
                  fontFamily: Font.FontRegular,
                  color: Colors.black_color,
                }}
              >
                {Lang_chg.Nov_txt[config.language]}
              </Text>

              <Text
                style={{
                  fontSize: (mobileW * 3.5) / 100,
                  fontFamily: Font.FontSemiBold,
                  color: Colors.black_color,
                  paddingTop: (mobileH * 2) / 100,
                }}
              >
                {Lang_chg.Areat_txt[config.language]}
              </Text>
              <Text
                style={{
                  fontSize: (mobileW * 3.2) / 100,
                  fontFamily: Font.FontRegular,
                  color: Colors.black_color,
                }}
              >
                {Lang_chg.Okemas_txt[config.language]}
              </Text>
            </View>
          </View>
          {/* ================for grediant 2nd view---------------- */}
          <View style={{ alignItems: "center", alignSelf: "center" }}>
            <LinearGradient
              colors={[Colors.light_greencolor, Colors.purple_color]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={{
                height: (mobileH * 6) / 100,
                width: (mobileW * 100) / 100,
                alignSelf: "center",
                alignItems: "center",
                marginTop: (mobileH * 2) / 100,
              }}
            >
              <View
                style={{
                  width: (mobileW * 92) / 100,
                  alignSelf: "center",
                  paddingVertical: (mobileH * 1.5) / 100,
                }}
              >
                <Text
                  style={{
                    color: Colors.whiteColor,
                    fontFamily: Font.FontSemiBold,
                    fontSize: (mobileW * 3.8) / 100,
                  }}
                >
                  {Lang_chg.Services_txt[config.language]}
                </Text>
              </View>
            </LinearGradient>
          </View>
          {/* -------------------for simple text view------- */}
          <View
            style={{
              width: (mobileW * 92) / 100,
              alignSelf: "center",
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: (mobileH * 2) / 100,
            }}
          >
            <Text
              style={{
                color: Colors.black_color,
                fontFamily: Font.FontSemiBold,
                fontSize: (mobileW * 3.5) / 100,
              }}
            >
              {Lang_chg.Baloon_Decoration_Service_txt[config.language]}
            </Text>
            <Text
              style={{
                color: Colors.black_color,
                fontFamily: Font.FontSemiBold,
                fontSize: (mobileW * 3.5) / 100,
              }}
            >
              {Lang_chg.$200_txt[config.language]}
            </Text>
          </View>
          {/* ---------2----- */}
          <View
            style={{
              width: (mobileW * 92) / 100,
              alignSelf: "center",
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: (mobileH * 2) / 100,
            }}
          >
            <Text
              style={{
                color: Colors.black_color,
                fontFamily: Font.FontSemiBold,
                fontSize: (mobileW * 3.5) / 100,
              }}
            >
              {Lang_chg.Party_Decoration_txt[config.language]}
            </Text>
            <Text
              style={{
                color: Colors.black_color,
                fontFamily: Font.FontSemiBold,
                fontSize: (mobileW * 3.5) / 100,
              }}
            >
              {Lang_chg.$300_txt[config.language]}
            </Text>
          </View>
          {/* ----------- for border dash view-----------*/}
          <View
            style={{
              paddingTop: (mobileW * 5) / 100,
              width: "93%",
              alignSelf: "center",
            }}
          >
            <DashedLine dashLength={5} dashColor={Colors.greyColor} />
          </View>
          <View
            style={{
              width: (mobileW * 92) / 100,
              alignSelf: "center",
              // marginTop: mobileH * 2 / 100,
              // borderColor: Colors.greyColor,
              // borderStyle: 'dashed',
              // borderTopWidth: mobileW * 0.3 / 100,
              // borderBottomWidth: mobileW * 0.3 / 100,
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Text
              style={{
                color: Colors.black_color,
                fontFamily: Font.FontSemiBold,
                fontSize: (mobileW * 3.5) / 100,
                paddingVertical: (mobileH * 2) / 100,
                marginLeft: (mobileW * 0.3) / 100,
              }}
            >
              {Lang_chg.Budget_txt[config.language]}
            </Text>
            <Text
              style={{
                color: Colors.black_color,
                fontFamily: Font.FontSemiBold,
                fontSize: (mobileW * 3.5) / 100,
                paddingVertical: (mobileH * 2) / 100,
              }}
            >
              {Lang_chg.$550_txt[config.language]}
            </Text>
          </View>
          <View style={{ width: "93%", alignSelf: "center" }}>
            <DashedLine dashLength={5} dashColor={Colors.greyColor} />
          </View>
          {/* -----------------------for client view===================== */}
          <View
            style={{
              width: (mobileW * 92) / 100,
              alignSelf: "center",
              marginTop: (mobileH * 3) / 100,
              borderColor: Colors.greyColor,
              borderStyle: "dashed",
              borderWidth: (mobileW * 0.3) / 100,
              paddingVertical: (mobileH * 2) / 100,
              marginBottom: (mobileH * 3) / 100,
              backgroundColor: Colors.border_color,
              borderRadius: (mobileW * 1.5) / 100,
            }}
          >
            <Text
              style={{
                color: Colors.black_color,
                fontFamily: Font.FontSemiBold,
                fontSize: (mobileW * 4) / 100,
                // paddingTop: mobileH * 1 / 100,
                paddingHorizontal: (mobileW * 3) / 100,
              }}
            >
              {Lang_chg.Client_txt[config.language]}
            </Text>
            {/* ----view ------------ */}
            <View
              style={{
                width: (mobileW * 85) / 100,
                alignSelf: "center",
                flexDirection: "row",
                justifyContent: "center",
                paddingVertical: (mobileH * 1.5) / 100,
              }}
            >
              <View
                style={{
                  width: (mobileW * 85) / 100,
                  flexDirection: "row",
                  alignSelf: "center",
                  justifyContent: "flex-start",
                }}
              >
                <View
                  style={{
                    width: (mobileW * 11) / 100,
                    paddingVertical: (mobileH * 0.2) / 100,
                    alignItems: "center",
                    backgroundColor: Colors.whiteColor,
                    borderRadius: (mobileW * 20) / 100,
                    elevation: 4 / 100,
                  }}
                >
                  <Image
                    style={{
                      width: (mobileW * 10) / 100,
                      height: (mobileW * 10) / 100,
                      borderRadius: (mobileW * 30) / 100,
                    }}
                    resizeMode="cover"
                    source={localimag.girl_img}
                  ></Image>
                </View>
                <View
                  style={{
                    marginLeft: (mobileW * 1.8) / 100,
                    paddingVertical: (mobileH * 1) / 100,
                  }}
                >
                  <Text
                    style={{
                      color: Colors.black_color,
                      fontFamily: Font.FontSemiBold,
                      fontSize: (mobileW * 4) / 100,
                    }}
                  >
                    {Lang_chg.EvelynHarper_txt[config.language]}
                  </Text>
                </View>
                <View
                  style={{
                    width: (mobileW * 42) / 100,
                    flexDirection: "row",
                    justifyContent: "flex-end",
                  }}
                >
                  {this.state.work != 2 && (
                    <TouchableOpacity
                      onPress={() =>
                        this.props.navigation.navigate("VendorChatDemo")
                      }
                      activeOpacity={0.7}
                      style={{
                        width: (mobileW * 15) / 100,
                        alignSelf: "center",
                        backgroundColor: Colors.green_color,
                        borderRadius: (mobileW * 1) / 100,
                        flexDirection: "row",
                        justifyContent: "center",
                      }}
                    >
                      <Image
                        style={{
                          width: (mobileW * 3) / 100,
                          height: (mobileW * 3) / 100,
                          marginTop: (mobileH * 0.8) / 100,
                        }}
                        source={localimag.chat_provider}
                      ></Image>
                      <Text
                        style={{
                          color: Colors.whiteColor,
                          fontFamily: Font.FontSemiBold,
                          fontSize: (mobileW * 2.9) / 100,
                          textAlign: "center",
                          paddingVertical: (mobileH * 0.5) / 100,
                          marginLeft: (mobileW * 1) / 100,
                        }}
                      >
                        {Lang_chg.Chat_txt[config.language]}
                      </Text>
                    </TouchableOpacity>
                  )}
                </View>
              </View>
            </View>
            {this.state.work == 2 && (
              <View>
                {/* ---------------for border view------------------- */}
                <View
                  style={{
                    width: (mobileW * 85) / 100,
                    alignSelf: "center",
                    borderColor: Colors.greyColor,
                    borderTopWidth: (mobileW * 0.3) / 100,
                    borderBottomWidth: (mobileW * 0.3) / 100,
                  }}
                >
                  <Text
                    style={{
                      color: Colors.black_color,
                      fontFamily: Font.FontSemiBold,
                      fontSize: (mobileW * 3) / 100,
                      paddingVertical: (mobileH * 1.5) / 100,
                    }}
                  >
                    {Lang_chg.Client_Review_txt[config.language]}
                  </Text>
                </View>
                {/* for star and view----------------------------- */}

                <View
                  style={{
                    width: (mobileW * 85) / 100,
                    alignSelf: "center",
                    marginTop: (mobileH * 1.5) / 100,
                    flexDirection: "row",
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      width: (mobileW * 85) / 100,
                      alignSelf: "center",
                    }}
                  >
                    <View
                      style={{
                        width: "29%",
                        flexDirection: "row",
                        justifyContent: "space-between",
                      }}
                    >
                      <Image
                        style={{
                          width: (mobileW * 3.3) / 100,
                          height: (mobileW * 3.3) / 100,
                        }}
                        source={localimag.star_Active}
                      ></Image>
                      <Image
                        style={{
                          width: (mobileW * 3.3) / 100,
                          height: (mobileW * 3.3) / 100,
                        }}
                        source={localimag.star_Active}
                      ></Image>
                      <Image
                        style={{
                          width: (mobileW * 3.3) / 100,
                          height: (mobileW * 3.3) / 100,
                        }}
                        source={localimag.star_Active}
                      ></Image>
                      <Image
                        style={{
                          width: (mobileW * 3.3) / 100,
                          height: (mobileW * 3.3) / 100,
                        }}
                        source={localimag.star_Active}
                      ></Image>
                      <Image
                        style={{
                          width: (mobileW * 3.4) / 100,
                          height: (mobileW * 3.3) / 100,
                        }}
                        source={localimag.star_Deactive}
                      ></Image>
                      <Text
                        style={{
                          color: Colors.black_color,
                          fontFamily: Font.FontBold,
                          fontSize: (mobileW * 2.9) / 100,
                        }}
                      >
                        {Lang_chg.num40_txt[config.language]}
                      </Text>
                    </View>
                    <Text
                      style={{
                        color: Colors.black_color,
                        fontFamily: Font.FontRegular,
                        fontSize: (mobileW * 2.6) / 100,
                        width: (mobileW * 30.2) / 100,
                      }}
                    >
                      {Lang_chg.Nov_txt[config.language]}
                    </Text>
                  </View>
                </View>
                <View
                  style={{
                    width: "93%",
                    alignSelf: "center",
                    marginTop: (mobileH * 1) / 100,
                  }}
                >
                  <Text
                    style={{
                      color: Colors.black_color,
                      fontFamily: Font.FontRegular,
                      fontSize: (mobileW * 3) / 100,
                      textAlign: "justify",
                    }}
                  >
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam,{" "}
                  </Text>
                </View>
              </View>
            )}
          </View>
          {/* -------------------for button continue condition------------ */}
          {this.state.work == 0 && (
            <TouchableOpacity
              onPress={() => {
                this.setState({ work: 1 });
              }}
              activeOpacity={0.7}
              style={{
                marginTop: (mobileH * 1) / 100,
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
                  width: (mobileW * 92) / 100,
                  alignSelf: "center",
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: (mobileW * 1.5) / 100,
                }}
              >
                <Text
                  style={{
                    color: "#f5f4f5",
                    fontFamily: Font.FontSemiBold,
                    fontSize: (mobileW * 4.3) / 100,
                  }}
                >
                  {Lang_chg.Start_Work_txt[config.language]}
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          )}
          {/* -------------------for button end work condition------------ */}
          {this.state.work == 1 && (
            <View>
              <TouchableOpacity
                onPress={() => {
                  this.setState({ work: 2 });
                }}
                activeOpacity={0.7}
                style={{
                  marginTop: (mobileH * 1) / 100,
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
                    width: (mobileW * 92) / 100,
                    alignSelf: "center",
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: (mobileW * 1.5) / 100,
                  }}
                >
                  <Text
                    style={{
                      color: "#f5f4f5",
                      fontFamily: Font.FontSemiBold,
                      fontSize: (mobileW * 4.3) / 100,
                    }}
                  >
                    {Lang_chg.End_Work_txt[config.language]}
                  </Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          )}
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
