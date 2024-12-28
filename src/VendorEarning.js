import React, { Component } from "react";
import {
  Text,
  BackHandler,
  SafeAreaView,
  StatusBar,
  FlatList,
  View,
  StyleSheet,
  Keyboard,
  Switch,
  TouchableOpacity,
  Image,
  TextInput,
  ImageBackground,
} from "react-native";
import {
  GradientText,
  config,
  Lang_chg,
  Font,
  Colors,
  mobileH,
  mobileW,
  localimag,
  consolepro,
  apifuntion,
  localStorage,
  msgProvider,
  msgTitle,
} from "./Provider/utilslib/Utils";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import LinearGradient from "react-native-linear-gradient";
import { LinearTextGradient } from "react-native-text-gradient";
import Footer from "./Provider/Footer";
import HideWithKeyboard from "react-native-hide-with-keyboard";
import { Nodata_foundimage } from "./Provider/Nodata_foundimage";

export default class VendorEarning extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Tab: 0,
      earning_history_arr: "NA",
      withdrawal_history_arr: "NA",
      business_earning: 0,
      withdreawl_arr: [
        {
          event: "Birthday",
          request: "Booking ID #6574738382",
          name: "Evelyn Harper",
          money: "Please Withdrawl the money",
          $: "$600",
          withdrawl: "Pending",
          status: false,
        },
        {
          event: "Birthday",
          request: "Booking ID #6574738382",
          name: "Evelyn Harper",
          money: "Please Withdrawl the money",
          $: "$600",
          withdrawl: "Completed",
          status: true,
        },
        {
          event: "Birthday",
          request: "Booking ID #6574738382",
          name: "Evelyn Harper",
          money: "Please Withdrawl the money",
          $: "$600",
          withdrawl: "Completed",
          status: true,
        },
        {
          event: "Birthday",
          request: "Booking ID #6574738382",
          name: "Evelyn Harper",
          money: "Please Withdrawl the money",
          $: "$600",
          withdrawl: "Completed",
          status: true,
        },
        {
          event: "Birthday",
          request: "Booking ID #6574738382",
          name: "Evelyn Harper",
          money: "Please Withdrawl the money",
          $: "$600",
          withdrawl: "Completed",
          status: true,
        },
      ],
    };
  }
  componentDidMount() {
    this.props.navigation.addListener("focus", () => {
      this.getHomeDetails(1);
    });
    this.getHomeDetails(1);
  }

  async getHomeDetails(Display) {
    Keyboard.dismiss();
    var user_arr = await localStorage.getItemObject("user_arr");
    var user_id = user_arr.user_id;
    let url = config.baseURL + "get_vendor_earning.php?user_id=" + user_id;

    consolepro.consolelog("url", url);
    apifuntion
      .getApi(url, Display)
      .then((obj) => {
        consolepro.consolelog("earning_history_arr", obj);
        if (obj.success == "true") {
          this.setState({
            earning_history_arr: obj.earning_history_arr,
            business_earning: obj.business_earning,
            withdrawal_history_arr: obj.withdrawal_history_arr,
          });
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
            <View style={{ width: (mobileW * 15) / 100 }}></View>
            <View style={{ width: (mobileW * 70) / 100, alignItems: "center" }}>
              <Text
                style={{
                  color: Colors.whiteColor,
                  fontFamily: Font.FontSemiBold,
                  fontSize: (mobileW * 5) / 100,
                }}
              >
                {Lang_chg.Earning_txt[config.language]}
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
          <View
            style={{
              alignItems: "center",
              alignSelf: "center",
              marginTop: (mobileH * 2) / 100,
            }}
          >
            <LinearGradient
              colors={[Colors.purple_color, Colors.bluegreen_color]}
              start={{ x: 1, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={{
                height: (mobileH * 25) / 100,
                width: (mobileW * 93) / 100,
                borderRadius: (mobileW * 2) / 100,
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  color: Colors.whiteColor,
                  fontFamily: Font.FontSemiBold,
                  fontSize: (mobileW * 4.5) / 100,
                  paddingTop: (mobileH * 7.5) / 100,
                }}
              >
                {Lang_chg.Total_Earning_txt[config.language]}
              </Text>
              <Text
                style={{
                  color: Colors.whiteColor,
                  fontFamily: Font.FontBold,
                  fontSize: (mobileW * 11) / 100,
                }}
              >
                {this.state.business_earning != null
                  ? "$" + this.state.business_earning
                  : 0}
              </Text>
            </LinearGradient>
          </View>

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
                  <GradientText
                    colors={[Colors.voilet_color, Colors.dark_greencolor]}
                  >
                    <Text
                      style={{
                        fontSize: (mobileW * 4) / 100,
                        fontFamily: Font.FontBold,
                        color: Colors.light_greencolor,
                        paddingVertical: (mobileH * 1.3) / 100,
                      }}
                    >
                      {Lang_chg.Earning_History_txt[config.language]}
                    </Text>
                  </GradientText>
                </View>
              ) : (
                <View style={styles.Deactive_View}>
                  <Text
                    style={{
                      fontSize: (mobileW * 4) / 100,
                      fontFamily: Font.FontRegular,
                      color: Colors.black_color,
                      paddingVertical: (mobileH * 1.3) / 100,
                    }}
                  >
                    {Lang_chg.Earning_History_txt[config.language]}
                  </Text>
                </View>
              )}
            </TouchableOpacity>
            {/* ======for border view----------- */}
            <View
              style={{
                height: (mobileH * 3.5) / 100,
                alignSelf: "center",
                borderColor: Colors.greyColor,
                borderWidth: (mobileW * 0.2) / 100,
                backgroundColor: Colors.greyColor,
              }}
            ></View>
            {/* -----end --------------- */}
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
                  <GradientText
                    colors={[Colors.voilet_color, Colors.dark_greencolor]}
                  >
                    <Text
                      style={{
                        fontSize: (mobileW * 4) / 100,
                        fontFamily: Font.FontBold,
                        color: Colors.light_greencolor,
                        paddingVertical: (mobileH * 1.3) / 100,
                      }}
                    >
                      {Lang_chg.Withdrawl_History_txt[config.language]}
                    </Text>
                  </GradientText>
                </View>
              ) : (
                <View style={styles.Deactive_View}>
                  <Text
                    style={{
                      fontSize: (mobileW * 4) / 100,
                      fontFamily: Font.FontRegular,
                      color: Colors.black_color,
                      paddingVertical: (mobileH * 1.3) / 100,
                    }}
                  >
                    {Lang_chg.Withdrawl_History_txt[config.language]}
                  </Text>
                </View>
              )}
            </TouchableOpacity>
          </View>
          {/*-------------------tab ended------------------------ */}
          {this.state.Tab == 0 && (
            <View>
              {this.state.earning_history_arr != "NA" ? (
                <FlatList
                  contentContainerStyle={{
                    width: (mobileW * 95) / 100,
                    alignSelf: "center",
                  }}
                  data={this.state.earning_history_arr}
                  renderItem={({ item, index }) => {
                    // consolepro.consolelog('item--==++', item)
                    return (
                      <View
                        style={{
                          width: (mobileW * 90) / 100,
                          alignSelf: "center",
                          marginTop: (mobileH * 1.5) / 100,
                          paddingVertical: (mobileH * 1) / 100,
                        }}
                      >
                        {/* ------------for first view------------ */}
                        <View
                          style={{
                            width: (mobileW * 90) / 100,
                            alignSelf: "center",
                            flexDirection: "row",
                            justifyContent: "space-between",
                          }}
                        >
                          <Text
                            style={{
                              fontSize: (mobileW * 3.5) / 100,
                              fontFamily: Font.FontSemiBold,
                              color: Colors.light_greencolor,
                            }}
                          >
                            {"Booking ID " + item.order_number}
                          </Text>
                          <Text
                            style={{
                              fontSize: (mobileW * 3.5) / 100,
                              fontFamily: Font.FontSemiBold,
                              color: Colors.black_color,
                            }}
                          >
                            {"$" + item.business_earning}
                          </Text>
                        </View>
                        <Text
                          style={{
                            fontSize: (mobileW * 3.5) / 100,
                            fontFamily: Font.FontRegular,
                            color: Colors.black_color,
                            paddingVertical: (mobileH * 0.5) / 100,
                          }}
                        >
                          {item.user_name}
                        </Text>
                        {/* ------------for first view------------ */}
                        <View
                          style={{
                            width: (mobileW * 90) / 100,
                            alignSelf: "center",
                            flexDirection: "row",
                            justifyContent: "space-between",
                          }}
                        >
                          <Text
                            style={{
                              fontSize: (mobileW * 3.5) / 100,
                              fontFamily: Font.FontRegular,
                              color: Colors.black_color,
                            }}
                          >
                            {item.title}
                          </Text>

                          <TouchableOpacity
                            onPress={() =>
                              this.props.navigation.navigate(
                                "VendorWithdrawlRequest",
                                { event_booking_id: item.event_booking_id }
                              )
                            }
                            activeOpacity={0.7}
                          >
                            <Text
                              style={{
                                fontSize: (mobileW * 3.2) / 100,
                                fontFamily: Font.FontSemiBold,
                                color: Colors.light_greencolor,
                              }}
                            >
                              {"Withdrawl Request"}
                            </Text>
                          </TouchableOpacity>
                        </View>
                        <View
                          style={{
                            width:
                              config.device_type == "ios"
                                ? (mobileW * 28.3) / 100
                                : (mobileW * 28.7) / 100,
                            alignSelf: "flex-end",
                            borderColor: Colors.light_greencolor,
                            borderWidth: (mobileW * 0.2) / 100,
                            backgroundColor: Colors.light_greencolor,
                            marginRight: (mobileW * 0.2) / 100,
                          }}
                        ></View>
                        {/* ---border view-------------- */}
                        <View
                          style={{
                            width:
                              config.device_type == "ios"
                                ? (mobileW * 93) / 100
                                : (mobileW * 93) / 100,
                            alignSelf: "center",
                            borderColor: Colors.greyColor,
                            borderWidth: (mobileW * 0.3) / 100,
                            backgroundColor: Colors.greyColor,
                            marginLeft: (mobileW * 3.5) / 100,
                            marginTop: (mobileH * 1.3) / 100,
                          }}
                        ></View>
                      </View>
                    );
                  }}
                />
              ) : (
                <Nodata_foundimage />
              )}
            </View>
          )}
          {/* --------------end================= */}

          {this.state.Tab == 1 && (
            <View>
              {this.state.withdrawal_history_arr != "NA" ? (
                <FlatList
                  contentContainerStyle={{
                    width: (mobileW * 95) / 100,
                    alignSelf: "center",
                  }}
                  data={this.state.withdrawal_history_arr}
                  renderItem={({ item, index }) => {
                    return (
                      <View
                        style={{
                          width: (mobileW * 90) / 100,
                          alignSelf: "center",
                          marginTop: (mobileH * 1.5) / 100,

                          paddingVertical: (mobileH * 1) / 100,
                        }}
                      >
                        {/* ------------for first view------------ */}
                        <View
                          style={{
                            width: (mobileW * 90) / 100,
                            alignSelf: "center",
                            flexDirection: "row",
                            justifyContent: "space-between",
                          }}
                        >
                          <Text
                            style={{
                              fontSize: (mobileW * 3.5) / 100,
                              fontFamily: Font.FontSemiBold,
                              color: Colors.light_greencolor,
                            }}
                          >
                            {"Request Id : #" + item.withdrawl_req_id}
                          </Text>
                          <Text
                            style={{
                              fontSize: (mobileW * 3.5) / 100,
                              fontFamily: Font.FontSemiBold,
                              color: Colors.black_color,
                            }}
                          >
                            {item.withdrawl_amount}
                          </Text>
                        </View>
                        <Text
                          style={{
                            fontSize: (mobileW * 3.5) / 100,
                            fontFamily: Font.FontRegular,
                            color: Colors.black_color,
                            paddingVertical: (mobileH * 0.5) / 100,
                          }}
                        >
                          {item.account_holder_name}
                        </Text>

                        {/* ------------for first view------------ */}
                        <View
                          style={{
                            width: (mobileW * 90) / 100,
                            alignSelf: "center",
                            flexDirection: "row",
                            justifyContent: "space-between",
                          }}
                        >
                          <Text
                            style={{
                              fontSize: (mobileW * 3.5) / 100,
                              fontFamily: Font.FontRegular,
                              color: Colors.black_color,
                            }}
                          >
                            {item.description}
                          </Text>
                          <Text
                            style={{
                              fontSize: (mobileW * 3.2) / 100,
                              fontFamily: Font.FontSemiBold,
                              color:
                                (item.status == "Pending" &&
                                  Colors.darkyellow_color) ||
                                (item.status == "Completed" &&
                                  Colors.green_color) ||
                                (item.status == "Rejected" && Colors.redColor),
                            }}
                          >
                            {item.status}
                          </Text>
                        </View>
                
                        {/* ---border view-------------- */}
                        <View
                          style={{
                            width:
                              config.device_type == "ios"
                                ? (mobileW * 93) / 100
                                : (mobileW * 93) / 100,
                            alignSelf: "center",
                            borderColor: Colors.greyColor,
                            borderWidth: (mobileW * 0.3) / 100,
                            backgroundColor: Colors.greyColor,
                            marginLeft: (mobileW * 3.5) / 100,
                            marginTop: (mobileH * 0.5) / 100,
                          }}
                        ></View>
                      </View>
                    );
                  }}
                />
              ) : (
                <Nodata_foundimage />
              )}
            </View>
          )}
          {/* --------------end================= */}
        </KeyboardAwareScrollView>
        <HideWithKeyboard>
          <LinearGradient
            colors={[Colors.light_greencolor, Colors.voilet_color]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.linearGradient1}
          >
            <Footer
              activepage="VendorEarning"
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
    color: Colors.blue3_color,
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
    marginTop: (mobileH * 3) / 100,
    borderTopColor: Colors.greyColor,
    borderTopWidth: (mobileW * 0.3) / 100,
    borderBottomColor: Colors.greyColor,
    borderBottomWidth: (mobileW * 0.3) / 100,
  },
  linearGradient1: {
    marginTop: (mobileH * 1) / 100,
    height: (mobileH * 9) / 100,
    width: (mobileW * 100) / 100,

  },
});
