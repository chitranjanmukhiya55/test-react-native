import React, { Component } from "react";
import {
  Text,
  BackHandler,
  SafeAreaView,
  StatusBar,
  FlatList,
  Alert,
  View,
  StyleSheet,
  Keyboard,
  Switch,
  TouchableOpacity,
  Image,
  TextInput,
  ImageBackground,
  RefreshControl,
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
  msgTitle,
  msgProvider,
} from "./Provider/utilslib/Utils";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import LinearGradient from "react-native-linear-gradient";
import { LinearTextGradient } from "react-native-text-gradient";
import Footer from "./Provider/Footer";
import HideWithKeyboard, {
  ShowWithKeyboard,
} from "react-native-hide-with-keyboard";
import { Nodata_foundimage } from "./Provider/Nodata_foundimage";

export default class AllEventsHome extends Component {
  _didFocusSubscription;
  _willBlurSubscription;

  constructor(props) {
    super(props);
    this.state = {
      service: "",
      details: "",
      price: "",
      baloon: 0,
      homeData: "",
      count_arr: "NA",
      event_arr: "NA",
      refresh: false,
      Ongoing: [
        {
          event: "Event : Birthday",
          request: "Request ID #6574738382",
          name: "Event Title",
          message: "5th Birthday Celebration",
          text: "Date & Time",
          text1: "26-Nov-2022, 11:00AM",
          guest: "No. of Guest",
          no: "50",
          Area: "Area(Suburb/Postcode)",
          Okemas: "Okemas, Michigan, 48864",
          budget: "Budget ",
          $: " $650",
          remove: " Reject",
          add: " Accept",
        },
        {
          event: "Event : Anniversary",
          request: "Request ID #6574738382",
          name: "Event Title",
          message: "5th Anniversary Celebration",
          text: "Date & Time",
          text1: "26-Nov-2022, 11:00AM",
          guest: "No. of Guest",
          no: "50",
          Area: "Area(Suburb/Postcode)",
          Okemas: "Okemas, Michigan, 48864",
          budget: "Budget ",
          $: "$800",
          remove: " Reject",
          add: " Accept",
        },
      ],
      show_details: false,
    };
    this._didFocusSubscription = props.navigation.addListener(
      "focus",
      (payload) =>
        BackHandler.addEventListener("hardwareBackPress", this.handleBackPress)
    );
  }
  componentDidMount() {
    this._willBlurSubscription = this.props.navigation.addListener(
      "blur",
      (payload) =>
        BackHandler.removeEventListener(
          "hardwareBackPress",
          this.handleBackPress
        )
    );
    this.props.navigation.addListener("focus", () => {
      this.getVendorSideHome(1);
    });
    this.getVendorSideHome(0);
  }
  //---------back handler funtion-------------//

  handleBackPress = () => {
    Alert.alert(
      Lang_chg.Gobacktxt[config.language],

      Lang_chg.Doyouwanttoexitapptxt[config.language],
      [
        {
          text: Lang_chg.NoTxt[config.language],

          onPress: () => consolepro.consolelog("Cancel Pressed"),

          style: "Yes",
        },
        {
          text: Lang_chg.YesTxt[config.language],
          onPress: () => BackHandler.exitApp(),
        },
      ],
      {
        cancelable: false,
      }
    ); // works best when the goBack is async

    return true;
  };

  _onRefresh = async () => {
    consolepro.consolelog("_onRefresh", "_onRefresh");
    this.setState({ refresh: true });
    setTimeout(() => {
      this.getVendorSideHome(1);
    }, 500);
  };
  async getVendorSideHome(Display) {
    let user_arr = await localStorage.getItemObject("user_arr");
    consolepro.consolelog("user_arr>", user_arr);
    let user_id = user_arr.user_id;
    let url =
      config.baseURL + "get_vendor_view_all_request.php?user_id=" + user_id;
    consolepro.consolelog("url", url);
    apifuntion
      .getApi(url, Display)
      .then((obj) => {
        consolepro.consolelog("obj", obj);
        this.setState({ refresh: false, show_details: true });
        if (obj.success == "true") {
          this.setState({
            homeData: obj.user_details,
            count_arr: obj.count_arr,
            event_arr: obj.event_arr,
          });
        } else {
          if (obj.active_status == 0 || obj.account_active_status == 0) {
            setTimeout(() => {
              config.checkUserDeactivate(this.props.navigation);
            }, 300);
            return false;
          } else {
            this.setState({ show_details: true });
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

  async actionButton(item, status) {
    let user_arr = await localStorage.getItemObject("user_arr");
    consolepro.consolelog("user_arr>", user_arr);
    let user_id = user_arr.user_id;
    let url = config.baseURL + "vendor_request_accept_reject.php";
    consolepro.consolelog("url", url);
    let data = new FormData();
    data.append("user_id", user_id);
    data.append("event_id", item.event_id);
    data.append("status", status);
    consolepro.consolelog("datadata", data);

    apifuntion
      .postApi(url, data)
      .then((obj) => {
        consolepro.consolelog("obj", obj);
        if (obj.success == "true") {
          this.getVendorSideHome(1);
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
            start={{ x: 1, y: 1 }}
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
            <TouchableOpacity
              onPress={() => {
                this.props.navigation.goBack();
              }}
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
                {Lang_chg.Recent_Events_txt[config.language]}
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
          {this.state.show_details != false && (
            <>
              {/* -----------flatlist --------------- */}
              {this.state.event_arr != "NA" ? (
                <FlatList
                  contentContainerStyle={{
                    width: (mobileW * 95) / 100,
                    alignSelf: "center",
                    marginTop: (mobileH * 2) / 100,
                  }}
                  data={this.state.event_arr}
                  renderItem={({ item, index }) => {
                    return (
                      <View
                        style={{
                          width: (mobileW * 95) / 100,
                          paddingVertical: (mobileW * 1.5) / 100,
                          borderRadius: (mobileW * 1) / 100,
                          // borderTopWidth:mobileW*0.3/100,
                          // borderWidth: mobileW * 0.3 / 100,
                          borderColor: Colors.greyColor,
                          marginBottom: (mobileH * 2) / 100,
                          marginTop: (mobileH * 1.5) / 100,
                          backgroundColor:
                            config.device_type == "ios"
                              ? Colors.whiteColor
                              : "#000000099",
                          shadowColor: Colors.text_color,
                          //  "#000000",
                          shadowOffset: { width: 0, height: 2 },
                          shadowOpacity: 0.17,
                          shadowRadius: 3.05,
                          elevation: 2,
                          // backgroundColor: '#000000099',
                        }}
                      >
                        <TouchableOpacity
                          activeOpacity={0.7}
                          onPress={() =>
                            this.props.navigation.navigate(
                              "VendorBirthdayHome",
                              {
                                item: item.event_id,
                              }
                            )
                          }
                          style={{
                            width: (mobileW * 95) / 100,
                            paddingVertical: (mobileW * 1.5) / 100,
                            // borderTopWidth: mobileW * 0.3 / 100,
                            // borderColor: Colors.greyColor,
                          }}
                        >
                          <Text
                            style={{
                              fontSize: (mobileW * 3.5) / 100,
                              fontFamily: Font.FontSemiBold,
                              color: Colors.black_color,
                              paddingHorizontal: (mobileW * 2.5) / 100,
                            }}
                          >
                            {item.event_type}
                          </Text>

                          <Text
                            style={{
                              fontSize: (mobileW * 3) / 100,
                              fontFamily: Font.FontSemiBold,
                              color: Colors.light_greencolor,
                              paddingVertical: (mobileH * 0.5) / 100,
                              paddingHorizontal: (mobileW * 2.5) / 100,
                            }}
                          >
                            {"Request ID " + item.order_number}
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
                                width: (mobileW * 93) / 100,
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
                                  paddingHorizontal: (mobileW * 1.5) / 100,
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
                                    width: (mobileW * 65) / 100,
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
                            marginTop: (mobileH * 0.5) / 100,
                          }}
                        >
                          <View
                            style={{
                              width: (mobileW * 95) / 100,
                              flexDirection: "row",
                              paddingVertical: (mobileH * 1) / 100,
                            }}
                          >
                            <View
                              style={{
                                width: (mobileW * 48) / 100,
                                flexDirection: "row",
                                marginTop: (mobileH * 0.5) / 100,
                              }}
                            >
                              <Text
                                style={{
                                  color: Colors.light_greencolor,
                                  fontFamily: Font.FontBold,
                                  fontSize: (mobileW * 3.5) / 100,
                                  marginLeft: (mobileW * 2.3) / 100,
                                }}
                              >
                                {"Budget "}
                              </Text>
                              <Text
                                style={{
                                  color: Colors.black_color,
                                  fontFamily: Font.FontBold,
                                  fontSize: (mobileW * 3.5) / 100,
                                  marginLeft: (mobileW * 1) / 100,
                                }}
                              >
                                {"$" + item.budget}
                              </Text>
                            </View>

                            {/* -----------for second view------------------ */}
                            <View
                              style={{
                                width: (mobileW * 43) / 100,
                                flexDirection: "row",
                                justifyContent: "space-between",
                              }}
                            >
                              <TouchableOpacity
                                onPress={() => {
                                  this.actionButton(item, 2);
                                }}
                                activeOpacity={0.7}
                                style={{
                                  width: (mobileW * 20) / 100,
                                  alignSelf: "center",
                                  backgroundColor: Colors.redColor,
                                  borderRadius: (mobileW * 1) / 100,
                                  flexDirection: "row",
                                  justifyContent: "center",
                                }}
                              >
                                <Image
                                  style={{
                                    width: (mobileW * 2) / 100,
                                    height: (mobileW * 2) / 100,
                                    marginTop: (mobileH * 1) / 100,
                                  }}
                                  source={localimag.cross_64}
                                ></Image>
                                <Text
                                  style={{
                                    color: Colors.whiteColor,
                                    fontFamily: Font.FontBold,
                                    fontSize: (mobileW * 3.2) / 100,
                                    textAlign: "center",
                                    paddingVertical: (mobileH * 0.5) / 100,
                                    marginLeft: (mobileW * 0.8) / 100,
                                  }}
                                >
                                  {"Reject"}
                                </Text>
                              </TouchableOpacity>
                              <TouchableOpacity
                                onPress={() => {
                                  this.actionButton(item, 1);
                                }}
                                activeOpacity={0.7}
                                style={{
                                  width: (mobileW * 20) / 100,
                                  alignSelf: "center",
                                  backgroundColor: Colors.green_color,
                                  borderRadius: (mobileW * 1) / 100,
                                  flexDirection: "row",
                                  justifyContent: "center",
                                }}
                              >
                                <Image
                                  style={{
                                    width: (mobileW * 2.3) / 100,
                                    height: (mobileW * 2.3) / 100,
                                    marginTop: (mobileH * 1) / 100,
                                    tintColor: Colors.whiteColor,
                                  }}
                                  source={localimag.check}
                                ></Image>
                                <Text
                                  style={{
                                    color: Colors.whiteColor,
                                    fontFamily: Font.FontBold,
                                    fontSize: (mobileW * 3.2) / 100,
                                    textAlign: "center",
                                    paddingVertical: (mobileH * 0.5) / 100,
                                    marginLeft: (mobileW * 0.8) / 100,
                                  }}
                                >
                                  {"Accept"}
                                </Text>
                              </TouchableOpacity>
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
            </>
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
  linearGradient1: {
    marginTop: (mobileH * 1) / 100,
    height: (mobileH * 9) / 100,
    width: (mobileW * 100) / 100,

  },
});
