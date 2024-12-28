import React, { Component } from "react";
import {
  Text,
  SafeAreaView,
  StatusBar,
  Alert,
  View,
  FlatList,
  StyleSheet,
  TouchableOpacity,
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
import Footer from "./Provider/Footer";
import HideWithKeyboard from "react-native-hide-with-keyboard";

export default class MyEventsOngoing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Tab: 1,
      Pending: [
        {
          event: "Event Type : Birthday",
          name: "Event Title",
          message: "5th Birthday Celebration",
          text: "Date & Time",
          text1: "26-Nov-2022, 11:00AM",
          guest: "No. of Guest",
          no: "50",
          Area: "Area(Suburb/Postcode)",
          Okemas: "Okemas, Michigan, 48864",
          budget: "Budget",
          $: "$1650",
        },
      ],
      Ongoing: [
        {
          event: "Event Type : Birthday",
          name: "Event Title",
          message: "5th Birthday Celebration",
          text: "Date & Time",
          text1: "26-Nov-2022, 11:00AM",
          guest: "No. of Guest",
          no: "50",
          Area: "Area(Suburb/Postcode)",
          Okemas: "Okemas, Michigan, 48864",
          budget: "Budget",
          $: "$1650",
        },
        {
          event: "Event Type : Anniversary",
          name: "Event Title",
          message: "5th Birthday Celebration",
          text: "Date & Time",
          text1: "26-Nov-2022, 11:00AM",
          guest: "No. of Guest",
          no: "50",
          Area: "Area(Suburb/Postcode)",
          Okemas: "Okemas, Michigan, 48864",
          budget: "Budget",
          $: "$800",
        },
      ],
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
            <View
              style={{ width: (mobileW * 100) / 100, alignItems: "center" }}
            >
              <Text
                style={{
                  color: Colors.whiteColor,
                  fontFamily: Font.FontSemiBold,
                  fontSize: (mobileW * 5) / 100,
                }}
              >
                {Lang_chg.My_Events_txt[config.language]}
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
          {/* ----------------------for tab view--------------------------- */}
          <View style={styles.Maintab}>
            <TouchableOpacity
              activeOpacity={1}
              onPress={() => {
                this.setState({ Tab: 0 });
              }}
              style={{ width: "50%", alignSelf: "center" }}
            >
              {this.state.Tab == 0 ? (
                <View style={styles.Active_View}>
                  <LinearGradient
                    colors={[Colors.light_greencolor, Colors.purple_color]}
                    start={{ x: 1, y: 1 }}
                    end={{ x: 0, y: 1 }}
                    style={{
                      width: "100%",
                      alignSelf: "center",
                      alignItems: "center",
                      borderBottomColor: Colors.whiteColor,
                      borderBottomWidth: 4,
                      paddingVertical: (mobileW * 3) / 100,
                    }}
                  >
                    <Text
                      style={{
                        fontSize: (mobileW * 4.5) / 100,
                        fontFamily: Font.FontBold,
                        color: Colors.whiteColor,
                      }}
                    >
                      {Lang_chg.Pending_txt[config.language]}
                    </Text>
                  </LinearGradient>
                </View>
              ) : (
                <View style={styles.Deactive_View}>
                  <Text
                    style={{
                      fontSize: (mobileW * 4) / 100,
                      fontFamily: Font.FontBold,
                      color: Colors.greyColor,
                    }}
                  >
                    {Lang_chg.Pending_txt[config.language]}
                  </Text>
                </View>
              )}
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.08}
              onPress={() => {
                this.setState({ Tab: 1 });
              }}
              style={{ width: "50%", alignSelf: "center" }}
            >
              {this.state.Tab == 1 ? (
                <View style={styles.Active_View}>
                  <LinearGradient
                    colors={[Colors.light_greencolor, Colors.purple_color]}
                    start={{ x: 1, y: 1 }}
                    end={{ x: 0, y: 1 }}
                    style={{
                      width: "100%",
                      alignSelf: "center",
                      alignItems: "center",
                      borderBottomColor: Colors.whiteColor,
                      borderBottomWidth: 4,
                      paddingVertical: (mobileW * 3) / 100,
                    }}
                  >
                    <Text
                      style={{
                        fontSize: (mobileW * 4) / 100,
                        fontFamily: Font.FontBold,
                        color: Colors.whiteColor,
                      }}
                    >
                      {Lang_chg.Ongoing_txt[config.language]}
                    </Text>
                  </LinearGradient>
                </View>
              ) : (
                <View style={styles.Deactive_View}>
                  <Text
                    style={{
                      fontSize: (mobileW * 4.5) / 100,
                      fontFamily: Font.FontBold,
                      color: Colors.greyColor,
                    }}
                  >
                    {Lang_chg.Ongoing_txt[config.language]}
                  </Text>
                </View>
              )}
            </TouchableOpacity>
          </View>
          {/*-------------------tab ended------------------------ */}
          {/* ----------------------- 1st flatlist--------------- */}
          {this.state.Tab == 0 && (
            <View>
              <FlatList
                contentContainerStyle={{
                  width: (mobileW * 100) / 100,
                  alignSelf: "center",
                }}
                data={this.state.Pending}
                renderItem={({ item, index }) => {
                  return (
                    <TouchableOpacity
                      onPress={() =>
                        this.props.navigation.navigate(
                          "ProposedEventVendorList1"
                        )
                      }
                      activeOpacity={0.7}
                      style={{
                        width: (mobileW * 100) / 100,
                        paddingVertical: (mobileW * 1.5) / 100,
                        marginBottom: (mobileH * 1.5) / 100,
                      }}
                    >
                      <View
                        style={{
                          borderBottomWidth: 1,
                          borderColor: Colors.greyColor,
                          width: (mobileW * 100) / 100,
                          alignSelf: "center",
                        }}
                      ></View>
                      <View style={{ backgroundColor: Colors.light_graycolor }}>
                        <Text
                          style={{
                            fontSize: (mobileW * 3.5) / 100,
                            fontFamily: Font.FontBold,

                            color: Colors.black_color,
                            paddingVertical: (mobileH * 1) / 100,
                            paddingHorizontal: (mobileW * 2) / 100,
                          }}
                        >
                          {item.event}
                        </Text>
                      </View>
                      <View
                        style={{
                          borderBottomWidth: 1,
                          borderColor: Colors.greyColor,
                          width: (mobileW * 100) / 100,
                          alignSelf: "center",
                        }}
                      ></View>
                      <View
                        style={{
                          width: (mobileW * 95) / 100,
                          paddingHorizontal: (mobileW * 2) / 100,
                          // width: mobileW,
                          alignSelf: "center",
                          paddingVertical: (mobileW * 1.5) / 100,
                        }}
                      >
                        <View
                          style={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                            width: (mobileW * 95) / 100,
                            alignSelf: "center",
                          }}
                        >
                          {/* for first view */}
                          <View
                            style={{
                              width: (mobileW * 45) / 100,
                              justifyContent: "flex-start",
                              borderRadius: (mobileW * 1) / 100,
                            }}
                          >
                            <Text
                              style={{
                                fontSize: (mobileW * 3.5) / 100,
                                fontFamily: Font.FontBold,
                                color: Colors.black_color,
                              }}
                            >
                              {item.name}
                            </Text>
                            <Text
                              style={{
                                fontSize: (mobileW * 3.5) / 100,
                                fontFamily: Font.FontRegular,
                                color: Colors.black_color,
                              }}
                            >
                              {item.message}
                            </Text>
                            <Text
                              style={{
                                fontSize: (mobileW * 3.5) / 100,
                                fontFamily: Font.FontBold,
                                color: Colors.black_color,
                                paddingTop: (mobileH * 2) / 100,
                              }}
                            >
                              {item.text}
                            </Text>
                            <Text
                              style={{
                                fontSize: (mobileW * 3.5) / 100,
                                fontFamily: Font.FontRegular,
                                color: Colors.black_color,
                              }}
                            >
                              {item.text1}
                            </Text>
                          </View>
                          {/* ----for second view */}
                          <View
                            style={{
                              width: (mobileW * 50) / 100,
                              justifyContent: "flex-start",
                            }}
                          >
                            <Text
                              style={{
                                fontSize: (mobileW * 3.5) / 100,
                                fontFamily: Font.FontBold,
                                color: Colors.black_color,
                              }}
                            >
                              {item.guest}
                            </Text>
                            <Text
                              style={{
                                fontSize: (mobileW * 3.5) / 100,
                                fontFamily: Font.FontSemiBold,
                                color: Colors.black_color,
                              }}
                            >
                              {item.no}
                            </Text>
                            <Text
                              style={{
                                fontSize: (mobileW * 3.5) / 100,
                                fontFamily: Font.FontBold,
                                color: Colors.black_color,
                                paddingTop: (mobileH * 2) / 100,
                              }}
                            >
                              {item.Area}
                            </Text>
                            <Text
                              style={{
                                fontSize: (mobileW * 3.5) / 100,
                                fontFamily: Font.FontRegular,
                                color: Colors.black_color,
                              }}
                            >
                              {item.Okemas}
                            </Text>
                          </View>
                        </View>
                      </View>
                      {/* -for third view- */}
                      <View
                        style={{
                          borderBottomWidth: 1,
                          borderColor: Colors.greyColor,
                          width: (mobileW * 100) / 100,
                          alignSelf: "center",
                        }}
                      ></View>
                      <View
                        style={{
                          width: (mobileW * 96) / 100,
                          paddingHorizontal: (mobileW * 2.5) / 100,
                          backgroundColor: Colors.light_graycolor,
                          flexDirection: "row",
                          justifyContent: "space-between",
                          paddingVertical: (mobileH * 1) / 100,
                        }}
                      >
                        <Text
                          style={{
                            fontSize: (mobileW * 3.5) / 100,
                            fontFamily: Font.FontBold,
                            color: Colors.black_color,
                          }}
                        >
                          {item.budget}
                        </Text>
                        <Text
                          style={{
                            fontSize: (mobileW * 3.5) / 100,
                            fontFamily: Font.FontBold,
                            color: Colors.black_color,
                          }}
                        >
                          {item.$}
                        </Text>
                      </View>
                      <View
                        style={{
                          borderBottomWidth: 1,
                          borderColor: Colors.greyColor,
                          width: (mobileW * 100) / 100,
                          alignSelf: "center",
                        }}
                      ></View>
                    </TouchableOpacity>
                  );
                }}
              />
            </View>
          )}
          {/* ---------------for ongoing--------------- */}
          {this.state.Tab == 1 && (
            <View>
              <FlatList
                contentContainerStyle={{
                  width: (mobileW * 100) / 100,
                  alignSelf: "center",
                  marginTop: (mobileH * 1) / 100,
                }}
                data={this.state.Ongoing}
                renderItem={({ item, index }) => {
                  return (
                    <TouchableOpacity
                      onPress={() =>
                        this.props.navigation.navigate("TransactionNumber")
                      }
                      activeOpacity={0.7}
                      style={{
                        width: (mobileW * 100) / 100,
                        paddingVertical: (mobileW * 1.5) / 100,
                        marginBottom: (mobileH * 1.5) / 100,
                      }}
                    >
                      <View
                        style={{
                          borderBottomWidth: 1,
                          borderColor: Colors.greyColor,
                          width: (mobileW * 100) / 100,
                          alignSelf: "center",
                        }}
                      ></View>
                      <View style={{ backgroundColor: Colors.light_graycolor }}>
                        <Text
                          style={{
                            fontSize: (mobileW * 3.5) / 100,
                            fontFamily: Font.FontBold,
                            color: Colors.black_color,
                            paddingVertical: (mobileH * 1.5) / 100,
                            paddingHorizontal: (mobileW * 2) / 100,
                          }}
                        >
                          {item.event}
                        </Text>
                      </View>
                      <View
                        style={{
                          borderBottomWidth: 1,
                          borderColor: Colors.greyColor,
                          width: (mobileW * 100) / 100,
                          alignSelf: "center",
                        }}
                      ></View>
                      <View
                        style={{
                          width: (mobileW * 95) / 100,
                          paddingHorizontal: (mobileW * 2) / 100,
                          // width: mobileW,
                          alignSelf: "center",
                          paddingVertical: (mobileW * 1.5) / 100,
                        }}
                      >
                        <View
                          style={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                            width: (mobileW * 95) / 100,
                            alignSelf: "center",
                          }}
                        >
                          {/* for first view */}
                          <View
                            style={{
                              width: (mobileW * 45) / 100,
                              justifyContent: "flex-start",
                              borderRadius: (mobileW * 1) / 100,
                            }}
                          >
                            <Text
                              style={{
                                fontSize: (mobileW * 3.5) / 100,
                                fontFamily: Font.FontBold,
                                color: Colors.black_color,
                              }}
                            >
                              {item.name}
                            </Text>
                            <Text
                              style={{
                                fontSize: (mobileW * 3.5) / 100,
                                fontFamily: Font.FontRegular,
                                color: Colors.black_color,
                              }}
                            >
                              {item.message}
                            </Text>
                            <Text
                              style={{
                                fontSize: (mobileW * 3.5) / 100,
                                fontFamily: Font.FontBold,
                                color: Colors.black_color,
                                paddingTop: (mobileH * 2) / 100,
                              }}
                            >
                              {item.text}
                            </Text>
                            <Text
                              style={{
                                fontSize: (mobileW * 3.5) / 100,
                                fontFamily: Font.FontRegular,
                                color: Colors.black_color,
                              }}
                            >
                              {item.text1}
                            </Text>
                          </View>
                          {/* ----for second view */}
                          <View
                            style={{
                              width: (mobileW * 47) / 100,
                              justifyContent: "flex-start",
                            }}
                          >
                            <Text
                              style={{
                                fontSize: (mobileW * 3.5) / 100,
                                fontFamily: Font.FontBold,
                                color: Colors.black_color,
                              }}
                            >
                              {item.guest}
                            </Text>
                            <Text
                              style={{
                                fontSize: (mobileW * 3.5) / 100,
                                fontFamily: Font.FontRegular,
                                color: Colors.black_color,
                              }}
                            >
                              {item.no}
                            </Text>
                            <Text
                              style={{
                                fontSize: (mobileW * 3.5) / 100,
                                fontFamily: Font.FontBold,
                                color: Colors.black_color,
                                paddingTop: (mobileH * 2) / 100,
                              }}
                            >
                              {item.Area}
                            </Text>
                            <Text
                              style={{
                                fontSize: (mobileW * 3.5) / 100,
                                fontFamily: Font.FontRegular,
                                color: Colors.black_color,
                              }}
                            >
                              {item.Okemas}
                            </Text>
                          </View>
                        </View>
                      </View>
                      {/* -for third view- */}
                      <View
                        style={{
                          borderBottomWidth: 1,
                          borderColor: Colors.greyColor,
                          width: (mobileW * 100) / 100,
                          alignSelf: "center",
                        }}
                      ></View>
                      <View
                        style={{
                          width: (mobileW * 96) / 100,
                          paddingHorizontal: (mobileW * 2.5) / 100,
                          backgroundColor: Colors.light_graycolor,
                          flexDirection: "row",
                          justifyContent: "space-between",
                          paddingVertical: (mobileH * 1) / 100,
                        }}
                      >
                        <Text
                          style={{
                            fontSize: (mobileW * 3.5) / 100,
                            fontFamily: Font.FontBold,
                            color: Colors.black_color,
                          }}
                        >
                          {item.budget}
                        </Text>
                        <Text
                          style={{
                            fontSize: (mobileW * 3.5) / 100,
                            fontFamily: Font.FontBold,
                            color: Colors.black_color,
                          }}
                        >
                          {item.$}
                        </Text>
                      </View>
                      <View
                        style={{
                          borderBottomWidth: 1,
                          borderColor: Colors.greyColor,
                          width: (mobileW * 100) / 100,
                          alignSelf: "center",
                        }}
                      ></View>
                    </TouchableOpacity>
                  );
                }}
              />
            </View>
          )}
        </KeyboardAwareScrollView>
        <HideWithKeyboard>
          <LinearGradient
            colors={[Colors.light_greencolor, Colors.voilet_color]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.linearGradient1}
          >
            <Footer
              activepage="MyEvents"
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
                  name: "Inbox1",
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
              user_id={this.state.user_id}
            />
          </LinearGradient>
        </HideWithKeyboard>
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
  Active_View: {
    width: "100%",
    alignSelf: "center",
    alignItems: "center",
    borderBottomColor: Colors.whiteColor,
    borderBottomWidth: 4,
  },

  Deactive_View: {
    width: "100%",
    alignSelf: "center",
    alignItems: "center",
  },
  Active_txt: {
    fontSize: (mobileW * 3.8) / 100,
    fontFamily: Font.mediumFont,
    color: Colors.whiteColor,
  },
  Deactive_txt: {
    fontSize: (mobileW * 3.8) / 100,
    fontFamily: Font.mediumFont,
    color: Colors.black,
  },
  Maintab: {
    width: "100%",
    alignSelf: "center",
    backgroundColor: "white",
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: Colors.whiteColor,
  },
  linearGradient1: {
    marginTop: (mobileH * 1) / 100,
    height: (mobileH * 9) / 100,
    width: (mobileW * 100) / 100,
  },
});
