import React, { Component } from "react";
import {
  Text,
  SafeAreaView,
  StatusBar,
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
  consolepro,
  localStorage,
  apifuntion,
  msgProvider,
  msgTitle,
} from "./Provider/utilslib/Utils";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import LinearGradient from "react-native-linear-gradient";
import HideWithKeyboard from "react-native-hide-with-keyboard";
import Footer from "./Provider/Footer";
import { Nodata_foundimage } from "./Provider/Nodata_foundimage";
global.EventStatus = 0;
export default class MyEvents extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Tab: 0,
      pendingArray: "NA",
      ongoingArray: "NA",
      show_details: false,
    };
  }
  componentDidMount() {
    this.props.navigation.addListener("focus", () => {
      // this.getVendersByCategory()
      consolepro.consolelog("fhfh");
      if (EventStatus == 1) {
        this.setState({ Tab: 1 });
      }
      this.getAllMyEvents();
      this.getAllOngoing();
      global.EventStatus = 0;
    });
    // this.getAllMyEvents()
    // this.getAllOngoing()
  }

  async getAllMyEvents() {
    var user_arr = await localStorage.getItemObject("user_arr");
    var user_id = user_arr.user_id;
    let url = config.baseURL + "get_pending_event.php?user_id=" + user_id;
    consolepro.consolelog("url", url);
    apifuntion
      .getApi(url, 1)
      .then((obj) => {
        consolepro.consolelog("obj cuisines", obj);
        this.setState({ show_details: true });
        if (obj.success == "true") {
          if (obj.event_arr != "NA") {
            this.setState({ pendingArray: obj.event_arr });
          } else {
            this.setState({ pendingArray: "NA" });
          }
        } else {
          this.setState({ show_details: true });
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
  async getAllOngoing() {
    var user_arr = await localStorage.getItemObject("user_arr");
    var user_id = user_arr.user_id;
    let url = config.baseURL + "get_ongoing_event.php?user_id=" + user_id;
    consolepro.consolelog("url", url);
    apifuntion
      .getApi(url, 1)
      .then((obj) => {
        consolepro.consolelog("obj ongoing", obj);
        if (obj.success == "true") {
          if (obj.event_arr != "NA") {
            this.setState({ ongoingArray: obj.event_arr });
          } else {
            this.setState({ ongoingArray: "NA" });
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
              style={{
                width: (mobileW * 100) / 100,
                alignItems: "center",
              }}
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
        >
          {this.state.show_details != false && (
            <>
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
                        start={{ x: 1, y: 0 }}
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
                        start={{ x: 1, y: 0 }}
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
              </View>
              {/*-------------------tab ended------------------------ */}
              {/* ----------------------- 1st flatlist--------------- */}
              {this.state.Tab == 0 && (
                <View>
                  {this.state.pendingArray != "NA" ? (
                    <FlatList
                      contentContainerStyle={{
                        width: (mobileW * 100) / 100,
                        alignSelf: "center",
                      }}
                      data={this.state.pendingArray}
                      renderItem={({ item, index }) => {
                        return (
                          <TouchableOpacity
                            onPress={() =>
                              this.props.navigation.navigate(
                                "ProposedEventVendorList1",
                                { item: item.event_id }
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
                                backgroundColor: Colors.light_graycolor,
                              }}
                            >
                              <Text
                                style={{
                                  fontSize: (mobileW * 3.5) / 100,
                                  fontFamily: Font.FontBold,
                                  color: Colors.black_color,
                                  paddingVertical: (mobileH * 1) / 100,
                                  paddingHorizontal: (mobileW * 2) / 100,
                                }}
                              >
                                {item.event_type}
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
                                width: (mobileW * 70) / 100,
                                paddingHorizontal: (mobileW * 2) / 100,
                                width: mobileW,
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
                                      fontSize: (mobileW * 3.5) / 100,
                                      fontFamily: Font.FontRegular,
                                      color: Colors.black_color,
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
                                    {Lang_chg.DateTime[config.language]}
                                  </Text>
                                  <Text
                                    style={{
                                      fontSize: (mobileW * 3.5) / 100,
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
                                      fontSize: (mobileW * 3.5) / 100,
                                      fontFamily: Font.FontSemiBold,
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
                                    {Lang_chg.Area[config.language]}
                                  </Text>
                                  <Text
                                    style={{
                                      fontSize: (mobileW * 3.5) / 100,
                                      fontFamily: Font.FontRegular,
                                      color: Colors.black_color,
                                    }}
                                  >
                                    {item.postal_code}
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
                                  fontSize: (mobileW * 3.8) / 100,
                                  fontFamily: Font.FontSemiBold,
                                  color: Colors.black_color,
                                }}
                              >
                                {Lang_chg.Budget_txt[config.language]}
                              </Text>
                              <Text
                                style={{
                                  fontSize: (mobileW * 3.8) / 100,
                                  fontFamily: Font.FontSemiBold,
                                  color: Colors.black_color,
                                }}
                              >
                                {"$" + item.budget}
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
                  ) : (
                    <Nodata_foundimage />
                  )}
                </View>
              )}
              {/* ---------------for ongoing--------------- */}
              {this.state.Tab == 1 && (
                <View>
                  {this.state.ongoingArray != "NA" ? (
                    <FlatList
                      contentContainerStyle={{
                        width: (mobileW * 100) / 100,
                        alignSelf: "center",
                      }}
                      data={this.state.ongoingArray}
                      renderItem={({ item, index }) => {
                        return (
                          <TouchableOpacity
                            onPress={() =>
                              this.props.navigation.navigate(
                                "ProposedEventVendorList1",
                                { item: item.event_id }
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
                                backgroundColor: Colors.light_graycolor,
                              }}
                            >
                              <Text
                                style={{
                                  fontSize: (mobileW * 3.5) / 100,
                                  fontFamily: Font.FontBold,
                                  color: Colors.black_color,
                                  paddingVertical: (mobileH * 1) / 100,
                                  paddingHorizontal: (mobileW * 2) / 100,
                                }}
                              >
                                {item.event_type}
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
                                width: (mobileW * 70) / 100,
                                paddingHorizontal: (mobileW * 2) / 100,
                                width: mobileW,
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
                                      fontSize: (mobileW * 3.5) / 100,
                                      fontFamily: Font.FontRegular,
                                      color: Colors.black_color,
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
                                    {Lang_chg.DateTime[config.language]}
                                  </Text>
                                  <Text
                                    style={{
                                      fontSize: (mobileW * 3.5) / 100,
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
                                      fontSize: (mobileW * 3.5) / 100,
                                      fontFamily: Font.FontSemiBold,
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
                                    {Lang_chg.Area[config.language]}
                                  </Text>
                                  <Text
                                    style={{
                                      fontSize: (mobileW * 3.5) / 100,
                                      fontFamily: Font.FontRegular,
                                      color: Colors.black_color,
                                    }}
                                  >
                                    {item.postal_code}
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
                                  fontSize: (mobileW * 3.8) / 100,
                                  fontFamily: Font.FontSemiBold,
                                  color: Colors.black_color,
                                }}
                              >
                                {Lang_chg.Budget_txt[config.language]}
                              </Text>
                              <Text
                                style={{
                                  fontSize: (mobileW * 3.8) / 100,
                                  fontFamily: Font.FontSemiBold,
                                  color: Colors.black_color,
                                }}
                              >
                                {"$" + item.budget}
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
                  ) : (
                    <Nodata_foundimage />
                  )}
                </View>
              )}
            </>
          )}
        </KeyboardAwareScrollView>

        <HideWithKeyboard>
          <LinearGradient
            colors={[Colors.voilet_color, Colors.light_greencolor]}
            start={{ x: 1, y: 1 }}
            end={{ x: 0, y: 0 }}
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
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.17,
    shadowRadius: 3.05,
    elevation: 4,
  },
  linearGradient1: {
    marginTop: (mobileH * 1) / 100,
    height: (mobileH * 9) / 100,
    width: (mobileW * 100) / 100,
  },
});
