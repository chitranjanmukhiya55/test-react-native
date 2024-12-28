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
import { pushnotification } from "./Provider/Pushnotificationredirection";
global.showStatus = 0;

export default class VendorHome extends Component {
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
      notification_count: 0,
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
    pushnotification.redirectfun(this.props);
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
    setTimeout(() => {
      this.getVendorSideHome(0);
    }, 700);
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
    let url = config.baseURL + "get_vendor_home.php?user_id=" + user_id;
    consolepro.consolelog("url", url);
    apifuntion
      .getApi(url, Display)
      .then((obj) => {
        consolepro.consolelog("obj", obj);
        this.setState({ show_details: true });
        this.setState({ refresh: false });
        if (obj.success == "true") {
          this.setState({
            homeData: obj.user_details,
            count_arr: obj.count_arr,
            event_arr: obj.event_arr,
            notification_count: obj.notification_count,
          });
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
            end={{ x: 0, y: 1 }}
            style={{
              height:
                config.device_type == "ios"
                  ? (mobileH * 45) / 100
                  : (mobileH * 49) / 100,
              width: (mobileW * 100) / 100,
              borderBottomLeftRadius: (mobileW * 5) / 100,
              borderBottomRightRadius: (mobileW * 5) / 100,
            }}
          >
            <View
              style={{
                width: (mobileW * 92) / 100,
                marginTop: (mobileH * 3) / 100,
                flexDirection: "row",
                alignSelf: "center",
                justifyContent: "space-between",
                paddingVertical: (mobileH * 1) / 100,
              }}
            >
              <Image
                style={{
                  width: (mobileW * 12) / 100,
                  height: (mobileW * 12) / 100,
                  borderRadius: (mobileW * 50) / 100,
                }}
                resizeMode="cover"
                source={
                  this.state.homeData.image != null
                    ? { uri: config.img_url + this.state.homeData.image }
                    : localimag.userplaceholder
                }
              ></Image>
              <View
                style={{
                  flexDirection: "column",
                  alignSelf: "flex-start",
                  justifyContent: "space-between",
                }}
              >
                <Text
                  style={{
                    color: Colors.whiteColor,
                    fontFamily: Font.FontSemiBold,
                    fontSize: (mobileW * 4) / 100,
                  }}
                >
                  {Lang_chg.Hello_txt[config.language]}
                </Text>
                <Text
                  style={{
                    color: Colors.whiteColor,
                    fontFamily: Font.FontBold,
                    fontSize: (mobileW * 4.5) / 100,
                  }}
                >
                  {this.state.homeData.name}
                </Text>
              </View>
              <View
                style={{
                  width: (mobileW * 55) / 100,
                  flexDirection: "row",
                  justifyContent: "flex-end",
                }}
              >
                {/* <Image style={{width:mobileW*8/100, height:mobileW*8/100}} resizeMode='contain' source={localimag.notification_dot}></Image> */}
                <TouchableOpacity
                  onPress={() =>
                    this.props.navigation.navigate("VendorNotifications1")
                  }
                  activeOpacity={0.7}
                  style={{ marginTop: (mobileH * 1) / 100 }}
                >
                  {this.state.notification_count > 0 ? (
                    <Image
                      style={{
                        width: (mobileW * 7.2) / 100,
                        height: (mobileW * 7.2) / 100,
                        marginLeft: (mobileW * 2) / 100,
                      }}
                      resizeMode="contain"
                      source={localimag.notification}
                    ></Image>
                  ) : (
                    <Image
                      style={{
                        width: (mobileW * 7.2) / 100,
                        height: (mobileW * 7.2) / 100,
                        marginLeft: (mobileW * 2) / 100,
                      }}
                      resizeMode="contain"
                      source={localimag.notification_dot}
                    ></Image>
                  )}
                </TouchableOpacity>
              </View>
            </View>

            {/* --------------------------for white view-------- */}
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate("VendorEarning")}
              activeOpacity={0.7}
              style={{
                width: (mobileW * 90) / 100,
                alignSelf: "center",
                justifyContent: "center",
                flexDirection: "row",
                borderRadius: (mobileW * 3) / 100,
                backgroundColor: Colors.whiteColor,
                paddingVertical: (mobileH * 2) / 100,
                marginTop: (mobileH * 2) / 100,
              }}
            >
              <View style={{ width: (mobileW * 12) / 100 }}>
                <Image
                  style={{
                    alignSelf: "center",
                    width: (mobileW * 7.5) / 100,
                    height: (mobileW * 7.5) / 100,
                  }}
                  resizeMode="contain"
                  source={localimag.earning_vendor}
                ></Image>
              </View>
              {/* ---------second view----------- */}
              <View
                style={{
                  width: (mobileW * 45) / 100,
                  marginTop: (mobileH * 0.3) / 100,
                }}
              >
                <GradientText
                  colors={[Colors.voilet_color, Colors.dark_greencolor]}
                >
                  <Text
                    style={{
                      color: Colors.bluegreen_color,
                      fontFamily: Font.FontSemiBold,
                      fontSize: (mobileW * 4.3) / 100,
                    }}
                  >
                    {Lang_chg.Your_Earning_txt[config.language]}
                  </Text>
                </GradientText>
              </View>
              {/* --------for third view----- */}
              <View
                style={{ width: (mobileW * 30) / 100, alignItems: "center" }}
              >
                <GradientText
                  colors={[Colors.voilet_color, Colors.dark_greencolor]}
                >
                  <Text
                    style={{
                      color: Colors.bluegreen_color,
                      fontFamily: Font.FontSemiBold,
                      fontSize: (mobileW * 5) / 100,
                      alignSelf: "center",
                    }}
                  >
                    {this.state.count_arr != "NA" &&
                      "$" + this.state.count_arr.business_earning}
                  </Text>
                </GradientText>
              </View>
            </TouchableOpacity>

            {/* ----for icons --------------- */}
            <View
              style={{
                width: (mobileW * 90) / 100,
                alignSelf: "center",
                justifyContent: "space-between",
                flexDirection: "row",
                marginTop: (mobileH * 2) / 100,
              }}
            >
              <TouchableOpacity
                onPress={() => {
                  global.showStatus = 1;
                  this.props.navigation.navigate("VendorMyEventsOngoing");
                }}
                activeOpacity={0.7}
              >
                <ImageBackground
                  style={{
                    width: (mobileW * 41) / 100,
                    height: (mobileW * 42) / 100,
                  }}
                  source={localimag.ongoing_events_vendor}
                >
                  <View
                    style={{
                      marginTop: (mobileH * 11.3) / 100,
                      paddingHorizontal: (mobileW * 3) / 100,
                    }}
                  >
                    <Text
                      style={{
                        color: Colors.darkyellow_color,
                        fontFamily: Font.FontSemiBold,
                        fontSize: (mobileW * 3.5) / 100,
                      }}
                    >
                      {Lang_chg.Ongoing_Events_txt[config.language]}
                    </Text>
                    <Text
                      style={{
                        color: Colors.darkyellow_color,
                        fontFamily: Font.FontSemiBold,
                        fontSize: (mobileW * 6) / 100,
                        paddingVertical: (mobileH * 0.5) / 100,
                      }}
                    >
                      {this.state.count_arr != "NA" &&
                        this.state.count_arr.ongoing_count}
                    </Text>
                  </View>
                </ImageBackground>
              </TouchableOpacity>
              {/* -----------------for second image------------------ */}
              <TouchableOpacity
                onPress={() => {
                  global.showStatus = 2;
                  this.props.navigation.navigate("VendorMyEventsOngoing");
                }}
                activeOpacity={0.7}
              >
                <ImageBackground
                  style={{
                    width: (mobileW * 41) / 100,
                    height: (mobileW * 42) / 100,
                  }}
                  source={localimag.completed_event_vendor}
                >
                  <View
                    style={{
                      marginTop: (mobileH * 11.3) / 100,
                      paddingHorizontal: (mobileW * 3) / 100,
                    }}
                  >
                    <Text
                      style={{
                        color: Colors.bluegreen_color,
                        fontFamily: Font.FontSemiBold,
                        fontSize: (mobileW * 3.5) / 100,
                      }}
                    >
                      {Lang_chg.Completed_Events_txt[config.language]}
                    </Text>
                    <Text
                      style={{
                        color: Colors.bluegreen_color,
                        fontFamily: Font.FontSemiBold,
                        fontSize: (mobileW * 6) / 100,
                        paddingVertical: (mobileH * 0.5) / 100,
                      }}
                    >
                      {this.state.count_arr != "NA" &&
                        this.state.count_arr.complete_count}
                    </Text>
                  </View>
                </ImageBackground>
              </TouchableOpacity>
            </View>
          </LinearGradient>
        </View>

        {/* -------for text view-------------- */}
        <View
          style={{
            width: (mobileW * 93) / 100,
            alignSelf: "center",
            marginTop: (mobileH * 2) / 100,
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Text
            style={{
              color: Colors.blue1_color,
              fontFamily: Font.FontSemiBold,
              fontSize: (mobileW * 4.2) / 100,
            }}
          >
            {Lang_chg.Recent_Events_txt[config.language]}
          </Text>
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.navigate("AllEventsHome");
            }}
          >
            <Text
              style={{
                color: Colors.blue1_color,
                fontFamily: Font.FontSemiBold,
                fontSize: (mobileW * 4.2) / 100,
              }}
            >
              {Lang_chg.ViewAll_txt[config.language]}
            </Text>
          </TouchableOpacity>
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
          {/* -----------flatlist --------------- */}
          {this.state.show_details != false && (
            <>
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
                            //  borderColor: Colors.greyColor,
                            //  borderTopWidth: mobileW * 0.3 / 100,
                            //  borderBottomWidth: mobileW * 0.3 / 100,
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

        {/* ----------------------for footer------------------------- */}
        <HideWithKeyboard>
          <LinearGradient
            colors={[Colors.light_greencolor, Colors.voilet_color]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.linearGradient1}
          >
            <Footer
              activepage="VendorHome"
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
  linearGradient1: {
    marginTop: (mobileH * 1) / 100,
    height: (mobileH * 9) / 100,
    width: (mobileW * 100) / 100,

  },
});
