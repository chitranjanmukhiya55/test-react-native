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
  RefreshControl,
} from "react-native";
import {
  config,
  msgProvider,
  Lang_chg,
  Font,
  Colors,
  mobileH,
  mobileW,
  localimag,
  consolepro,
  apifuntion,
  localStorage,
  msgTitle,
} from "./Provider/utilslib/Utils";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import LinearGradient from "react-native-linear-gradient";
import Footer from "./Provider/Footer";
import HideWithKeyboard from "react-native-hide-with-keyboard";
import { Nodata_foundimage } from "./Provider/Nodata_foundimage";

export default class VendorMyEventsOngoing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Tab: 2,
      refresh: false,
      // status: this.props.route.params.status,

      pendingEvents: "NA",
      ongoingEvents: "NA",
      completedEvents: "NA",
    };
  }

  componentDidMount() {
    this.props.navigation.addListener("focus", () => {
      // this.getVendorSideHome(0)
      if (showStatus == 1) {
        this.setState({ Tab: 0 });
      }
      if (showStatus == 2) {
        this.setState({ Tab: 1 });
      }
      global.showStatus = 0;

      setTimeout(() => {
        this.getPendingEvents(0);
      }, 800);
      this.getOngoingEvents(1);
      this.getCompeltedEvents(1);
    });
  }

  _onRefresh = async () => {
    consolepro.consolelog("_onRefresh", "_onRefresh");
    this.setState({ refresh: true });
    if (this.state.Tab == 2) {
      setTimeout(() => {
        this.getPendingEvents(1);
      }, 300);
    }
    if (this.state.Tab == 0) {
      setTimeout(() => {
        this.getOngoingEvents(1);
      }, 300);
    }
    if (this.state.Tab == 1) {
      setTimeout(() => {
        this.getCompeltedEvents(1);
      }, 300);
    }
  };
  async getPendingEvents(Display) {
    let user_arr = await localStorage.getItemObject("user_arr");
    consolepro.consolelog("user_arr>", user_arr);
    let user_id = user_arr.user_id;
    let url =
      config.baseURL + "get_vendor_pending_event.php?user_id=" + user_id;
    consolepro.consolelog("url", url);
    apifuntion
      .getApi(url, Display)
      .then((obj) => {
        consolepro.consolelog("get_vendor_pending_event", obj);
        this.setState({ refresh: false });
        if (obj.success == "true") {
          if (obj.event_arr != "NA") {
            this.setState({ pendingEvents: obj.event_arr });
          } else {
            this.setState({ pendingEvents: "NA" });
          }
        } else {
          if (obj.active_status == 0 || obj.account_active_status == 0) {
            setTimeout(() => {
              config.checkUserDeactivate(this.props.navigation);
            }, 300);
            return false;
          } else {
            setTimeout(() => {
              msgProvider.alert(
                msgTitle.information[config.language],
                obj.msg[config.language],
                false
              );
            }, 200);
          }
          return false;
        }
      })
      .catch((error) => {
        consolepro.consolelog("-------- error ------- " + error);
      });
  }
  async getOngoingEvents(Display) {
    let user_arr = await localStorage.getItemObject("user_arr");
    consolepro.consolelog("user_arr>", user_arr);
    let user_id = user_arr.user_id;
    let url =
      config.baseURL + "get_vendor_ongoing_event.php?user_id=" + user_id;
    consolepro.consolelog("url", url);
    apifuntion
      .getApi(url, Display)
      .then((obj) => {
        consolepro.consolelog("get_vendor_ongoing_event", obj);
        this.setState({ refresh: false });
        if (obj.success == "true") {
          if (obj.event_arr != "NA") {
            this.setState({ ongoingEvents: obj.event_arr });
          } else {
            this.setState({ ongoingEvents: "NA" });
          }
        } else {
          if (obj.active_status == 0 || obj.account_active_status == 0) {
            setTimeout(() => {
              config.checkUserDeactivate(this.props.navigation);
            }, 300);
            return false;
          } else {
            setTimeout(() => {
              msgProvider.alert(
                msgTitle.information[config.language],
                obj.msg[config.language],
                false
              );
            }, 200);
          }
          return false;
        }
      })
      .catch((error) => {
        consolepro.consolelog("-------- error ------- " + error);
      });
  }

  async getCompeltedEvents(Display) {
    let user_arr = await localStorage.getItemObject("user_arr");
    consolepro.consolelog("user_arr>", user_arr);
    let user_id = user_arr.user_id;
    let url =
      config.baseURL + "get_vendor_complete_event.php?user_id=" + user_id;
    consolepro.consolelog("url", url);
    apifuntion
      .getApi(url, Display)
      .then((obj) => {
        consolepro.consolelog("get_vendor_complete_event", obj);
        this.setState({ refresh: false });
        if (obj.success == "true") {
          if (obj.event_arr != "NA") {
            this.setState({ completedEvents: obj.event_arr });
          } else {
            this.setState({ completedEvents: "NA" });
          }
        } else {
          if (obj.active_status == 0 || obj.account_active_status == 0) {
            setTimeout(() => {
              config.checkUserDeactivate(this.props.navigation);
            }, 300);
            return false;
          } else {
            setTimeout(() => {
              msgProvider.alert(
                msgTitle.information[config.language],
                obj.msg[config.language],
                false
              );
            }, 200);
          }
          return false;
        }
      })
      .catch((error) => {
        consolepro.consolelog("-------- error ------- " + error);
      });
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
              style={{
                width: (mobileW * 15) / 100,
                alignItems: "center",
              }}
            ></View>
          </LinearGradient>
        </View>
        {/* ------------------header end ---------------- */}
        <KeyboardAwareScrollView
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ width: mobileW }}
          keyboardShouldPersistTaps="handled"
          refreshControl={
            <RefreshControl
              refreshing={this.state.refresh}
              onRefresh={this._onRefresh}
              tintColor={Colors.theme_color}
              colors={[Colors.theme_color]}
            />
          }
        >
          {/* ----------------------for tab view--------------------------- */}
          <View style={styles.Maintab}>
            <TouchableOpacity
              activeOpacity={1}
              onPress={() => {
                this.setState({ Tab: 2 });
              }}
              style={{ width: "33%", alignSelf: "center" }}
            >
              {this.state.Tab == 2 ? (
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
              activeOpacity={1}
              onPress={() => {
                this.setState({ Tab: 0 });
              }}
              style={{ width: "33%", alignSelf: "center" }}
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
              style={{ width: "33%", alignSelf: "center" }}
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
                      fontSize: (mobileW * 4) / 100,
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

          {this.state.Tab == 2 && (
            <View>
              {this.state.pendingEvents != "NA" ? (
                <FlatList
                  contentContainerStyle={{
                    width: (mobileW * 95) / 100,
                    alignSelf: "center",
                  }}
                  data={this.state.pendingEvents}
                  renderItem={({ item, index }) => {
                    consolepro.consolelog("item", item);
                    return (
                      <View
                        style={{
                          width: (mobileW * 95) / 100,
                          paddingVertical: (mobileW * 1.5) / 100,
                          borderColor: Colors.greyColor,
                          marginTop: (mobileH * 1.5) / 100,
                          // elevation: 1
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
                              "VendorBirthdayHome",
                              { item: item.event_id }
                            )
                          }
                          style={{
                            width: (mobileW * 95) / 100,
                            paddingVertical: (mobileW * 1.5) / 100,
                          }}
                        >
                          <View
                            style={{
                              width: (mobileW * 90) / 100,
                              flexDirection: "row",
                              justifyContent: "space-between",
                            }}
                          >
                            <Text
                              style={{
                                fontSize: (mobileW * 3.5) / 100,
                                fontFamily: Font.FontSemiBold,
                                color: Colors.black_color,
                                paddingHorizontal: (mobileW * 2) / 100,
                              }}
                            >
                              {item.event_type}
                            </Text>
                            <Text
                              style={{
                                fontSize: (mobileW * 3.5) / 100,
                                fontFamily: Font.FontSemiBold,
                                color: Colors.light_greencolor,
                                paddingHorizontal: (mobileW * 2) / 100,
                              }}
                            >
                              {item.event_status}
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
                            {Lang_chg.Booking_txt[config.language] +
                              " " +
                              item.order_number}
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
                                  {Lang_chg.EventTitle[config.language]}
                                </Text>
                                <Text
                                  style={{
                                    fontSize: (mobileW * 3.2) / 100,
                                    fontFamily: Font.FontRegular,
                                    color: Colors.black_color,
                                    width: (mobileW * 50) / 100,
                                  }}
                                >
                                  {item.title}
                                </Text>
                                <Text
                                  style={{
                                    fontSize: (mobileW * 3.5) / 100,
                                    fontFamily: Font.FontSemiBold,
                                    color: Colors.black_color,
                                    paddingTop: (mobileH * 2) / 100,
                                  }}
                                >
                                  {" "}
                                  {Lang_chg.DateTime[config.language]}
                                </Text>
                                <Text
                                  style={{
                                    fontSize: (mobileW * 3.2) / 100,
                                    fontFamily: Font.FontRegular,
                                    color: Colors.black_color,
                                  }}
                                >
                                  {item.event_date_time}
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
                                  {Lang_chg.NoofGuest[config.language]}
                                </Text>
                                <Text
                                  style={{
                                    fontSize: (mobileW * 3.2) / 100,
                                    fontFamily: Font.FontRegular,
                                    color: Colors.black_color,
                                  }}
                                >
                                  {item.no_of_guest}
                                </Text>
                                <Text
                                  style={{
                                    fontSize: (mobileW * 3.5) / 100,
                                    fontFamily: Font.FontSemiBold,
                                    color: Colors.black_color,
                                    paddingTop: (mobileH * 2) / 100,
                                  }}
                                >
                                  {" "}
                                  {Lang_chg.Area[config.language]}
                                </Text>
                                <Text
                                  style={{
                                    fontSize: (mobileW * 3.2) / 100,
                                    fontFamily: Font.FontRegular,
                                    color: Colors.black_color,
                                  }}
                                >
                                  {item.address}
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
                                  fontSize: (mobileW * 3.5) / 100,
                                }}
                              >
                                {"Budget"}
                              </Text>
                              <Text
                                style={{
                                  color: Colors.black_color,
                                  fontFamily: Font.FontSemiBold,
                                  fontSize: (mobileW * 3.5) / 100,
                                  marginLeft: (mobileW * 1) / 100,
                                }}
                              >
                                {"$" + item.budget}
                              </Text>
                            </View>

                            {/* -----------for second view------------------ */}
                            <View style={{ width: (mobileW * 43) / 100 }}>
                              <View
                                activeOpacity={0.7}
                                style={{
                                  paddingHorizontal: (mobileW * 2) / 100,
                                  alignSelf: "flex-end",
                                  backgroundColor: Colors.lightred_color,
                                }}
                              >
                                <Text
                                  style={{
                                    color: "#C53333",
                                    fontFamily: Font.FontSemiBold,
                                    fontSize: (mobileW * 3) / 100,
                                    textAlign: "center",
                                    paddingVertical: (mobileH * 0.5) / 100,
                                  }}
                                >
                                  {item.event_status}
                                </Text>
                              </View>
                            </View>
                          </View>
                        </View>
                      </View>
                    );
                  }}
                />
              ) : (
                <Nodata_foundimage />
              )}
            </View>
          )}
          {/* ----------------------- 1st flatlist--------------- */}
          {this.state.Tab == 0 && (
            <View>
              {this.state.ongoingEvents != "NA" ? (
                <FlatList
                  contentContainerStyle={{
                    width: (mobileW * 95) / 100,
                    alignSelf: "center",
                  }}
                  data={this.state.ongoingEvents}
                  renderItem={({ item, index }) => {
                    consolepro.consolelog("item", item);
                    return (
                      <View
                        style={{
                          width: (mobileW * 95) / 100,
                          paddingVertical: (mobileW * 1.5) / 100,
                          borderColor: Colors.greyColor,
                          marginTop: (mobileH * 1.5) / 100,
                          // elevation: 1
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
                              "VendorBirthdayHome",
                              { item: item.event_id }
                            )
                          }
                          style={{
                            width: (mobileW * 95) / 100,
                            paddingVertical: (mobileW * 1.5) / 100,
                          }}
                        >
                          <View
                            style={{
                              width: (mobileW * 90) / 100,
                              flexDirection: "row",
                              justifyContent: "space-between",
                            }}
                          >
                            <Text
                              style={{
                                fontSize: (mobileW * 3.5) / 100,
                                fontFamily: Font.FontSemiBold,
                                color: Colors.black_color,
                                paddingHorizontal: (mobileW * 2) / 100,
                              }}
                            >
                              {item.event_type}
                            </Text>
                            <Text
                              style={{
                                fontSize: (mobileW * 3.5) / 100,
                                fontFamily: Font.FontSemiBold,
                                color: Colors.light_greencolor,
                                paddingHorizontal: (mobileW * 2) / 100,
                              }}
                            >
                              {item.event_status}
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
                            {Lang_chg.Booking_txt[config.language] +
                              " " +
                              item.order_number}
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
                                  {Lang_chg.EventTitle[config.language]}
                                </Text>
                                <Text
                                  style={{
                                    fontSize: (mobileW * 3.2) / 100,
                                    fontFamily: Font.FontRegular,
                                    color: Colors.black_color,
                                    width: (mobileW * 50) / 100,
                                  }}
                                >
                                  {item.title}
                                </Text>
                                <Text
                                  style={{
                                    fontSize: (mobileW * 3.5) / 100,
                                    fontFamily: Font.FontSemiBold,
                                    color: Colors.black_color,
                                    paddingTop: (mobileH * 2) / 100,
                                  }}
                                >
                                  {" "}
                                  {Lang_chg.DateTime[config.language]}
                                </Text>
                                <Text
                                  style={{
                                    fontSize: (mobileW * 3.2) / 100,
                                    fontFamily: Font.FontRegular,
                                    color: Colors.black_color,
                                  }}
                                >
                                  {item.event_date_time}
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
                                  {Lang_chg.NoofGuest[config.language]}
                                </Text>
                                <Text
                                  style={{
                                    fontSize: (mobileW * 3.2) / 100,
                                    fontFamily: Font.FontRegular,
                                    color: Colors.black_color,
                                  }}
                                >
                                  {item.no_of_guest}
                                </Text>
                                <Text
                                  style={{
                                    fontSize: (mobileW * 3.5) / 100,
                                    fontFamily: Font.FontSemiBold,
                                    color: Colors.black_color,
                                    paddingTop: (mobileH * 2) / 100,
                                  }}
                                >
                                  {" "}
                                  {Lang_chg.Area[config.language]}
                                </Text>
                                <Text
                                  style={{
                                    fontSize: (mobileW * 3.2) / 100,
                                    fontFamily: Font.FontRegular,
                                    color: Colors.black_color,
                                  }}
                                >
                                  {item.address}
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
                                  fontSize: (mobileW * 3.5) / 100,
                                }}
                              >
                                {"Budget"}
                              </Text>
                              <Text
                                style={{
                                  color: Colors.black_color,
                                  fontFamily: Font.FontSemiBold,
                                  fontSize: (mobileW * 3.5) / 100,
                                  marginLeft: (mobileW * 1) / 100,
                                }}
                              >
                                {"$" + item.budget}
                              </Text>
                            </View>

                            {/* -----------for second view------------------ */}
                            <View style={{ width: (mobileW * 43) / 100 }}>
                              <View
                                activeOpacity={0.7}
                                style={{
                                  width: (mobileW * 13) / 100,
                                  alignSelf: "flex-end",
                                  backgroundColor: Colors.lightgreen_color,
                                }}
                              >
                                <Text
                                  style={{
                                    color: "#2EA133",
                                    fontFamily: Font.FontSemiBold,
                                    fontSize: (mobileW * 3) / 100,
                                    textAlign: "center",
                                    paddingVertical: (mobileH * 0.5) / 100,
                                  }}
                                >
                                  {item.payment_status}
                                </Text>
                              </View>
                            </View>
                          </View>
                        </View>
                      </View>
                    );
                  }}
                />
              ) : (
                <Nodata_foundimage />
              )}
            </View>
          )}
          {/* ---------------for Completed--------------- */}
          {this.state.Tab == 1 && (
            <View>
              {this.state.completedEvents != "NA" ? (
                <FlatList
                  contentContainerStyle={{
                    width: (mobileW * 95) / 100,
                    alignSelf: "center",
                  }}
                  data={this.state.completedEvents}
                  renderItem={({ item, index }) => {
                    consolepro.consolelog("item", item);
                    return (
                      <View
                        style={{
                          width: (mobileW * 95) / 100,
                          paddingVertical: (mobileW * 1.5) / 100,
                          borderColor: Colors.greyColor,
                          marginTop: (mobileH * 1.5) / 100,
                          // elevation: 1
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
                              "VendorBirthdayHome",
                              { item: item.event_id }
                            )
                          }
                          style={{
                            width: (mobileW * 95) / 100,
                            paddingVertical: (mobileW * 1.5) / 100,
                          }}
                        >
                          <View
                            style={{
                              width: (mobileW * 90) / 100,
                              flexDirection: "row",
                              justifyContent: "space-between",
                            }}
                          >
                            <Text
                              style={{
                                fontSize: (mobileW * 3.5) / 100,
                                fontFamily: Font.FontSemiBold,
                                color: Colors.black_color,
                                paddingHorizontal: (mobileW * 2) / 100,
                              }}
                            >
                              {item.event_type}
                            </Text>
                            <Text
                              style={{
                                fontSize: (mobileW * 3.5) / 100,
                                fontFamily: Font.FontSemiBold,
                                color: Colors.light_greencolor,
                                paddingHorizontal: (mobileW * 2) / 100,
                              }}
                            >
                              {item.event_status}
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
                            {Lang_chg.Booking_txt[config.language] +
                              " " +
                              item.order_number}
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
                                  {Lang_chg.EventTitle[config.language]}
                                </Text>
                                <Text
                                  style={{
                                    fontSize: (mobileW * 3.2) / 100,
                                    fontFamily: Font.FontRegular,
                                    color: Colors.black_color,
                                    width: (mobileW * 50) / 100,
                                  }}
                                >
                                  {item.title}
                                </Text>
                                <Text
                                  style={{
                                    fontSize: (mobileW * 3.5) / 100,
                                    fontFamily: Font.FontSemiBold,
                                    color: Colors.black_color,
                                    paddingTop: (mobileH * 2) / 100,
                                  }}
                                >
                                  {" "}
                                  {Lang_chg.DateTime[config.language]}
                                </Text>
                                <Text
                                  style={{
                                    fontSize: (mobileW * 3.2) / 100,
                                    fontFamily: Font.FontRegular,
                                    color: Colors.black_color,
                                  }}
                                >
                                  {item.event_date_time}
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
                                  {Lang_chg.NoofGuest[config.language]}
                                </Text>
                                <Text
                                  style={{
                                    fontSize: (mobileW * 3.2) / 100,
                                    fontFamily: Font.FontRegular,
                                    color: Colors.black_color,
                                  }}
                                >
                                  {item.no_of_guest}
                                </Text>
                                <Text
                                  style={{
                                    fontSize: (mobileW * 3.5) / 100,
                                    fontFamily: Font.FontSemiBold,
                                    color: Colors.black_color,
                                    paddingTop: (mobileH * 2) / 100,
                                  }}
                                >
                                  {" "}
                                  {Lang_chg.Area[config.language]}
                                </Text>
                                <Text
                                  style={{
                                    fontSize: (mobileW * 3.2) / 100,
                                    fontFamily: Font.FontRegular,
                                    color: Colors.black_color,
                                  }}
                                >
                                  {item.address}
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
                                  fontSize: (mobileW * 3.5) / 100,
                                }}
                              >
                                {"Budget"}
                              </Text>
                              <Text
                                style={{
                                  color: Colors.black_color,
                                  fontFamily: Font.FontSemiBold,
                                  fontSize: (mobileW * 3.5) / 100,
                                  marginLeft: (mobileW * 1) / 100,
                                }}
                              >
                                {"$" + item.budget}
                              </Text>
                            </View>

                            {/* -----------for second view------------------ */}
                            <View style={{ width: (mobileW * 43) / 100 }}>
                              <View
                                activeOpacity={0.7}
                                style={{
                                  paddingHorizontal: (mobileW * 2) / 100,
                                  alignSelf: "flex-end",
                                  backgroundColor: Colors.lightgreen_color,
                                }}
                              >
                                <Text
                                  style={{
                                    color: Colors.green_color,
                                    fontFamily: Font.FontSemiBold,
                                    fontSize: (mobileW * 3) / 100,
                                    textAlign: "center",
                                    paddingVertical: (mobileH * 0.5) / 100,
                                  }}
                                >
                                  {item.event_status}
                                </Text>
                              </View>
                            </View>
                          </View>
                        </View>
                      </View>
                    );
                  }}
                />
              ) : (
                <Nodata_foundimage />
              )}
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
              activepage="VendorMyEventsOngoing"
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
                  name: "VendorMyEventsOngoing",
                  title: "My Events",
                  countshow: false,
                  image: localimag.manage_event,
                  activeimage: localimag.my_event_active,
                },
                {
                  name: "InboxBookingVendor",
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
