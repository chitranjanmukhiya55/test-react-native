import React, { Component } from "react";
import {
  Text,
  BackHandler,
  SafeAreaView,
  StatusBar,
  Alert,
  View,
  FlatList,
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
import Footer from "./Provider/Footer";
import HideWithKeyboard from "react-native-hide-with-keyboard";

export default class VendorMyEventsCompleted extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Tab: 1,
      Ongoing: [
        {
          event: "Event : Birthday",
          request: "Booking ID  #6574738382",
          name: "Event Title",
          message: "5th Birthday Celebration",
          text: "Date & Time",
          text1: "26-Nov-2022, 11:00AM",
          guest: "No. of Guest",
          no: "50",
          Area: "Area(Suburb/Postcode)",
          Okemas: "Okemas, Michigan, 48864",
          budget: "Budget ",
          $: " $600",
          ongoing: "Ongoing",
          paid: "Paid",
        },
        {
          event: "Event : Anniversary",
          request: "Booking ID  #6574738382",
          name: "Event Title",
          message: "5th Anniversary Celebration",
          text: "Date & Time",
          text1: "26-Nov-2022, 11:00AM",
          guest: "No. of Guest",
          no: "50",
          Area: "Area(Suburb/Postcode)",
          Okemas: "Okemas, Michigan, 48864",
          budget: "Budget ",
          $: " $1000",
          ongoing: "Ongoing",
          paid: "Paid",
          remove: " Recject",
          add: " Accept",
        },
      ],
      Completed: [
        {
          event: "Event : Birthday",
          request: "Booking ID  #6574738382",
          name: "Event Title",
          message: "5th Birthday Celebration",
          text: "Date & Time",
          text1: "26-Nov-2022, 11:00AM",
          guest: "No. of Guest",
          no: "50",
          Area: "Area(Suburb/Postcode)",
          Okemas: "Okemas, Michigan, 48864",
          budget: "Budget ",
          $: " $600",
          ongoing: "Completed",
          paid: "Paid",
        },
        {
          event: "Event : Anniversary",
          request: "Booking ID  #6574738382",
          name: "Event Title",
          message: "5th Anniversary Celebration",
          text: "Date & Time",
          text1: "26-Nov-2022, 11:00AM",
          guest: "No. of Guest",
          no: "50",
          Area: "Area(Suburb/Postcode)",
          Okemas: "Okemas, Michigan, 48864",
          budget: "Budget ",
          $: " $1000",
          ongoing: "Completed",
          paid: "Paid",
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
                    end={{ x: 0, y: 0 }}
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
                      {Lang_chg.Ongoing_txt[config.language]}
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
                    {Lang_chg.Ongoing_txt[config.language]}
                  </Text>
                </View>
              )}
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.08}
              onPress={() => {
                this.setState({ Tab: 1 });
                //  this.getbroadcastarr(1)
              }}
              style={{ width: "50%", alignSelf: "center" }}
            >
              {this.state.Tab == 1 ? (
                <View style={styles.Active_View}>
                  <LinearGradient
                    colors={[Colors.light_greencolor, Colors.purple_color]}
                    start={{ x: 1, y: 1 }}
                    end={{ x: 0, y: 0 }}
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
                      {Lang_chg.Completed_txt[config.language]}
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
                    {Lang_chg.Completed_txt[config.language]}
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
                  width: (mobileW * 95) / 100,
                  alignSelf: "center",
                }}
                data={this.state.Ongoing}
                renderItem={({ item, index }) => {
                  return (
                    <View
                      style={{
                        width: (mobileW * 95) / 100,
                        paddingVertical: (mobileW * 1.5) / 100,
                        borderColor: Colors.greyColor,
                        marginTop: (mobileH * 1.5) / 100,
                        //elevation: 3,
                        borderRadius: (mobileW * 1) / 100,
                        marginBottom: (mobileH * 2) / 100,
                        backgroundColor:
                          config.device_type == "ios"
                            ? Colors.whiteColor
                            : "#000000099",
                        shadowColor: Colors.text_color,
                        //    shadowColor: "#000000",
                        shadowOffset: { width: 0, height: 2 },
                        shadowOpacity: 0.17,
                        shadowRadius: 3.05,
                        elevation: 3,
                        // backgroundColor: '#000000099',

                        shadowColor: Colors.text_color,
                      }}
                    >
                      <TouchableOpacity
                        activeOpacity={0.7}
                        onPress={() =>
                          this.props.navigation.navigate(
                            "VendorBirthdayOngoing"
                          )
                        }
                        style={{
                          width: (mobileW * 95) / 100,
                          paddingVertical: (mobileW * 1.5) / 100,
                        }}
                      >
                        <View
                          style={{
                            width: (mobileW * 92) / 100,
                            flexDirection: "row",
                            justifyContent: "space-between",
                          }}
                        >
                          <Text
                            style={{
                              fontSize: (mobileW * 3.8) / 100,
                              fontFamily: Font.FontSemiBold,
                              color: Colors.black_color,
                              paddingHorizontal: (mobileW * 2) / 100,
                            }}
                          >
                            {item.event}
                          </Text>
                          <Text
                            style={{
                              fontSize: (mobileW * 3.8) / 100,
                              fontFamily: Font.FontSemiBold,
                              color: Colors.light_greencolor,
                              // paddingHorizontal: mobileW * 2 / 100,
                            }}
                          >
                            {item.ongoing}
                          </Text>
                        </View>

                        <Text
                          style={{
                            fontSize: (mobileW * 3) / 100,
                            fontFamily: Font.FontSemiBold,
                            color: Colors.light_greencolor,
                            paddingVertical: (mobileH * 0.5) / 100,
                            paddingHorizontal: (mobileW * 2) / 100,
                          }}
                        >
                          {item.request}
                        </Text>

                        <View
                          style={{
                            width: (mobileW * 92) / 100,
                            paddingHorizontal: (mobileW * 2) / 100,
                            // width: mobileW,
                            alignSelf: "center",
                            paddingVertical: (mobileW * 1.5) / 100,
                            borderTopWidth: (mobileW * 0.3) / 100,
                            borderTopColor: Colors.greyColor,
                            borderBottomWidth: (mobileW * 0.3) / 100,
                            borderBottomColor: Colors.greyColor,
                            marginTop: (mobileH * 1) / 100,
                          }}
                        >
                          <View
                            style={{
                              flexDirection: "row",
                              justifyContent: "space-between",
                              width: (mobileW * 91) / 100,
                              alignSelf: "center",
                            }}
                          >
                            {/* for first view */}
                            <View
                              style={{
                                width: (mobileW * 44) / 100,
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
                                {item.name}
                              </Text>
                              <Text
                                style={{
                                  fontSize: (mobileW * 3.2) / 100,
                                  fontFamily: Font.FontRegular,
                                  color: Colors.black_color,
                                  width: (mobileW * 50) / 100,
                                }}
                              >
                                {item.message}
                              </Text>
                              <Text
                                style={{
                                  fontSize: (mobileW * 3.5) / 100,
                                  fontFamily: Font.FontSemiBold,
                                  color: Colors.black_color,
                                  paddingTop: (mobileH * 2) / 100,
                                }}
                              >
                                {item.text}
                              </Text>
                              <Text
                                style={{
                                  fontSize: (mobileW * 3.2) / 100,
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
                                {item.guest}
                              </Text>
                              <Text
                                style={{
                                  fontSize: (mobileW * 3.2) / 100,
                                  fontFamily: Font.FontRegular,
                                  color: Colors.black_color,
                                }}
                              >
                                {item.no}
                              </Text>
                              <Text
                                style={{
                                  fontSize: (mobileW * 3.5) / 100,
                                  fontFamily: Font.FontSemiBold,
                                  color: Colors.black_color,
                                  paddingTop: (mobileH * 2) / 100,
                                }}
                              >
                                {item.Area}
                              </Text>
                              <Text
                                style={{
                                  fontSize: (mobileW * 3.2) / 100,
                                  fontFamily: Font.FontRegular,
                                  color: Colors.black_color,
                                }}
                              >
                                {item.Okemas}
                              </Text>
                            </View>
                          </View>
                        </View>
                      </TouchableOpacity>
                      {/* ---------------for outer view---------- */}
                      <View
                        style={{
                          width: (mobileW * 95) / 100,
                          alignSelf: "center",
                          alignItems: "center",
                        }}
                      >
                        <View
                          style={{
                            width: (mobileW * 90) / 100,
                            flexDirection: "row",
                            paddingVertical: (mobileH * 0.8) / 100,
                          }}
                        >
                          <View
                            style={{
                              width: (mobileW * 45) / 100,
                              flexDirection: "row",
                              marginTop: (mobileH * 0.5) / 100,
                            }}
                          >
                            <Text
                              style={{
                                color: Colors.light_greencolor,
                                fontFamily: Font.FontSemiBold,
                                fontSize: (mobileW * 3.8) / 100,
                              }}
                            >
                              {item.budget}
                            </Text>
                            <Text
                              style={{
                                color: Colors.black_color,
                                fontFamily: Font.FontSemiBold,
                                fontSize: (mobileW * 3.8) / 100,
                                marginLeft: (mobileW * 1) / 100,
                              }}
                            >
                              {item.$}
                            </Text>
                          </View>

                          {/* -----------for second view------------------ */}
                          <View style={{ width: (mobileW * 43) / 100 }}>
                            <TouchableOpacity
                              activeOpacity={0.7}
                              style={{
                                width: (mobileW * 13) / 100,
                                alignSelf: "flex-end",
                                backgroundColor: Colors.light_green_color,
                              }}
                            >
                              <Text
                                style={{
                                  color: Colors.green_color,
                                  fontFamily: Font.FontSemiBold,
                                  fontSize: (mobileW * 2.9) / 100,
                                  textAlign: "center",
                                  paddingVertical: (mobileH * 0.5) / 100,
                                }}
                              >
                                {item.paid}
                              </Text>
                            </TouchableOpacity>
                          </View>
                        </View>
                      </View>
                    </View>
                  );
                }}
              />
            </View>
          )}
          {/* ---------------for Completed--------------- */}
          {this.state.Tab == 1 && (
            <View>
              <FlatList
                contentContainerStyle={{
                  width: (mobileW * 95) / 100,
                  alignSelf: "center",
                }}
                data={this.state.Completed}
                renderItem={({ item, index }) => {
                  return (
                    <View
                      style={{
                        width: (mobileW * 95) / 100,
                        paddingVertical: (mobileW * 1.5) / 100,
                        borderColor: Colors.greyColor,
                        marginTop: (mobileH * 1.5) / 100,
                        // elevation: 1,
                        marginBottom: (mobileH * 2) / 100,
                        borderRadius: (mobileW * 1) / 100,
                        backgroundColor:
                          config.device_type == "ios"
                            ? Colors.whiteColor
                            : "#000000099",
                        shadowColor: Colors.text_color,
                        //  "#000000",
                        shadowOffset: { width: 0, height: 2 },
                        shadowOpacity: 0.17,
                        shadowRadius: 3.05,
                        elevation: 3,
                        // backgroundColor: '#000000099',
                      }}
                    >
                      <TouchableOpacity
                        activeOpacity={0.7}
                        onPress={() =>
                          this.props.navigation.navigate(
                            "VendorBirthdayCompleted"
                          )
                        }
                        style={{
                          width: (mobileW * 95) / 100,
                          paddingVertical: (mobileW * 1.5) / 100,
                        }}
                      >
                        <View
                          style={{
                            width: (mobileW * 92) / 100,
                            flexDirection: "row",
                            justifyContent: "space-between",
                          }}
                        >
                          <Text
                            style={{
                              fontSize: (mobileW * 3.8) / 100,
                              fontFamily: Font.FontSemiBold,
                              color: Colors.black_color,
                              paddingHorizontal: (mobileW * 2) / 100,
                            }}
                          >
                            {item.event}
                          </Text>
                          <Text
                            style={{
                              fontSize: (mobileW * 3.8) / 100,
                              fontFamily: Font.FontSemiBold,
                              color: Colors.light_greencolor,
                              // paddingHorizontal: mobileW * 2 / 100,
                            }}
                          >
                            {item.ongoing}
                          </Text>
                        </View>

                        <Text
                          style={{
                            fontSize: (mobileW * 3) / 100,
                            fontFamily: Font.FontSemiBold,
                            color: Colors.light_greencolor,
                            paddingVertical: (mobileH * 0.5) / 100,
                            paddingHorizontal: (mobileW * 2) / 100,
                          }}
                        >
                          {item.request}
                        </Text>

                        <View
                          style={{
                            width: (mobileW * 92) / 100,
                            paddingHorizontal: (mobileW * 2) / 100,
                            // width: mobileW,
                            alignSelf: "center",
                            paddingVertical: (mobileW * 1.5) / 100,
                            borderTopWidth: (mobileW * 0.3) / 100,
                            borderTopColor: Colors.greyColor,
                            borderBottomWidth: (mobileW * 0.3) / 100,
                            borderBottomColor: Colors.greyColor,
                            marginTop: (mobileH * 1) / 100,
                          }}
                        >
                          <View
                            style={{
                              flexDirection: "row",
                              justifyContent: "space-between",
                              width: (mobileW * 91) / 100,
                              alignSelf: "center",
                            }}
                          >
                            {/* for first view */}
                            <View
                              style={{
                                width: (mobileW * 46) / 100,
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
                                {item.name}
                              </Text>
                              <Text
                                style={{
                                  fontSize: (mobileW * 3.2) / 100,
                                  fontFamily: Font.FontRegular,
                                  color: Colors.black_color,
                                  width: (mobileW * 50) / 100,
                                }}
                              >
                                {item.message}
                              </Text>
                              <Text
                                style={{
                                  fontSize: (mobileW * 3.5) / 100,
                                  fontFamily: Font.FontSemiBold,
                                  color: Colors.black_color,
                                  paddingTop: (mobileH * 2) / 100,
                                }}
                              >
                                {item.text}
                              </Text>
                              <Text
                                style={{
                                  fontSize: (mobileW * 3.2) / 100,
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
                                {item.guest}
                              </Text>
                              <Text
                                style={{
                                  fontSize: (mobileW * 3.2) / 100,
                                  fontFamily: Font.FontRegular,
                                  color: Colors.black_color,
                                }}
                              >
                                {item.no}
                              </Text>
                              <Text
                                style={{
                                  fontSize: (mobileW * 3.5) / 100,
                                  fontFamily: Font.FontSemiBold,
                                  color: Colors.black_color,
                                  paddingTop: (mobileH * 2) / 100,
                                }}
                              >
                                {item.Area}
                              </Text>
                              <Text
                                style={{
                                  fontSize: (mobileW * 3.2) / 100,
                                  fontFamily: Font.FontRegular,
                                  color: Colors.black_color,
                                }}
                              >
                                {item.Okemas}
                              </Text>
                            </View>
                          </View>
                        </View>
                      </TouchableOpacity>
                      {/* ---------------for outer view---------- */}
                      <View
                        style={{
                          width: (mobileW * 95) / 100,
                          alignSelf: "center",
                          alignItems: "center",
                        }}
                      >
                        <View
                          style={{
                            width: (mobileW * 90) / 100,
                            flexDirection: "row",
                            paddingVertical: (mobileH * 0.8) / 100,
                          }}
                        >
                          <View
                            style={{
                              width: (mobileW * 45) / 100,
                              flexDirection: "row",
                              marginTop: (mobileH * 0.5) / 100,
                            }}
                          >
                            <Text
                              style={{
                                color: Colors.light_greencolor,
                                fontFamily: Font.FontSemiBold,
                                fontSize: (mobileW * 3.8) / 100,
                              }}
                            >
                              {item.budget}
                            </Text>
                            <Text
                              style={{
                                color: Colors.black_color,
                                fontFamily: Font.FontSemiBold,
                                fontSize: (mobileW * 3.8) / 100,
                                marginLeft: (mobileW * 1) / 100,
                              }}
                            >
                              {item.$}
                            </Text>
                          </View>

                          {/* -----------for second view------------------ */}
                          <View style={{ width: (mobileW * 43) / 100 }}>
                            <TouchableOpacity
                              activeOpacity={0.7}
                              style={{
                                width: (mobileW * 13) / 100,
                                alignSelf: "flex-end",
                                backgroundColor: Colors.light_green_color,
                              }}
                            >
                              <Text
                                style={{
                                  color: Colors.green_color,
                                  fontFamily: Font.FontSemiBold,
                                  fontSize: (mobileW * 2.9) / 100,
                                  textAlign: "center",
                                  paddingVertical: (mobileH * 0.5) / 100,
                                }}
                              >
                                {item.paid}
                              </Text>
                            </TouchableOpacity>
                          </View>
                        </View>
                      </View>
                    </View>
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
              activepage="VendorMyEvents"
              usertype={1}
              footerpage={[
                {
                  name: "VendorHome",
                  title: "Home",
                  countshow: false,
                  image: localimag.home_deactive,
                  activeimage: localimag.home,
                },
                {
                  name: "VendorMyEvents",
                  title: "My Events",
                  countshow: false,
                  image: localimag.manage_event,
                  activeimage: localimag.my_event_active,
                },
                {
                  name: "VendorInbox1",
                  title: "Chat",
                  countshow: false,
                  image: localimag.chat,
                  activeimage: localimag.chat_active,
                },
                {
                  name: "VendorEarning",
                  title: "Earning",
                  countshow: false,
                  image: localimag.earning,
                  activeimage: localimag.earning_active,
                },
                {
                  name: "VendorProfile",
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
  // Deactive_View: {
  //     width: '100%', alignSelf: 'center', alignItems: 'center',
  // },
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
