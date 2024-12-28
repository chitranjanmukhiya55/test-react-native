import React, { Component } from "react";
import {
  Text,
  View,
  FlatList,
  SafeAreaView,
  Alert,
  StatusBar,
  StyleSheet,
  Keyboard,
  ImageBackground,
  TouchableOpacity,
  Image,
  TextInput,
  BackHandler,
  RefreshControl,
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
  apifuntion,
  msgTitle,
  msgProvider,
  localStorage,
} from "./Provider/utilslib/Utils";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import LinearGradient from "react-native-linear-gradient";
import Footer from "./Provider/Footer";
import HideWithKeyboard from "react-native-hide-with-keyboard";
import Carousel from "react-native-banner-carousel";
import { Nodata_foundimage } from "./Provider/Nodata_foundimage";
import { ProgressBar } from "react-native-paper";
import Image1 from "react-native-image-progress";

export default class Home extends Component {
  _didFocusSubscription;
  _willBlurSubscription;
  constructor(props) {
    super(props);
    this.state = {
      banner_arr: "NA",
      category_arr: "NA",
      category_arr_All: "NA",
      user_details: "NA",
      searchByCategory: "",
      refresh: false,
      GuestUser: false,
      notification_count: 0,
      show_details: false,
    };
    this._didFocusSubscription = props.navigation.addListener(
      "focus",
      (payload) =>
        BackHandler.addEventListener("hardwareBackPress", this.handleBackPress)
    );
  }
  componentDidMount() {
    localStorage.setItemObject("image_change_gender", null);
    localStorage.setItemObject("createEventJSON", null);
    global_user_address = "";
    this._willBlurSubscription = this.props.navigation.addListener(
      "blur",
      (payload) =>
        BackHandler.removeEventListener(
          "hardwareBackPress",
          this.handleBackPress
        )
    );
    this.props.navigation.addListener("focus", () => {
      consolepro.consolelog("767676767676767676");
      this.setState({ searchByCategory: "" });
      this.getHomeDetails(1);
    });
    setTimeout(() => {
      this.getHomeDetails(1);
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

  async getHomeDetails(Display) {
    let GuestUser = await localStorage.getItemObject("ContinueAsaGuest");
    consolepro.consolelog("GuestUserGuestUserGuestUser", GuestUser);
    if (GuestUser != null) {
      this.setState({ GuestUser: GuestUser });
    }
    let url;
    if (GuestUser == true) {
      url = config.baseURL + "home.php?user_id=" + 0;
    } else {
      var user_arr = await localStorage.getItemObject("user_arr");
      var user_id = user_arr.user_id;
      url = config.baseURL + "home.php?user_id=" + user_id;
    }
    consolepro.consolelog("url", url);
    apifuntion
      .getApi(url, Display)
      .then((obj) => {
        consolepro.consolelog("objhome", obj);
        this.setState({ show_details: true });
        if (obj.success == "true") {
          this.setState({
            banner_arr: obj.banner_arr,
            category_arr: obj.category_arr,
            user_details: obj.user_details,
            category_arr_All: obj.category_arr,
            refresh: false,
            notification_count: obj.notification_count,
          });
          localStorage.setItemObject("user_arr", obj.user_details);
          consolepro.consolelog("obj.banner_arr", obj.banner_arr);
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

  //  ----------- function for search school
  searchbyCategory = () => {
    Keyboard.dismiss();
    let data1 = this.state.category_arr_All;
    if (data1 != "NA") {
      consolepro.consolelog("data1108", data1);
      if (data1 != "NA") {
        var text_data = this.state.searchByCategory.toString().toLowerCase();
        let newData = data1.filter(function (item) {
          return (
            item.category_name.toString().toLowerCase().indexOf(text_data) >= 0
          );
        });

        if (newData.length > 0) {
          this.setState({ category_arr: newData });
        } else if (newData.length <= 0) {
          this.setState({ category_arr: "NA" });
        }
      }
    }
  };

  _onRefresh = async () => {
    if (config.app_status == 1) {
      consolepro.consolelog("_onRefresh", "_onRefresh");
      this.setState({ refresh: true, searchByCategory: "" });
      setTimeout(() => {
        this.getHomeDetails(1);
      }, 500);
    }
  };

  Checkuser = async (page) => {
    Alert.alert(
      Lang_chg.login_txt[config.language],
      Lang_chg.PleaseLoginFirst[config.language],
      [
        {
          text: msgTitle.cancel[0],
        },
        {
          text: msgTitle.ok[0],
          onPress: () => {
            localStorage.setItemObject("ContinueAsaGuest", false);
            this.props.navigation.navigate("Login");
          },
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
          backgroundColor={Colors.whiteColor}
          translucent={false}
          barStyle="dark-content"
          networkActivityIndicatorVisible={true}
        />

        {/* //===========ImageBackground ======// */}

        <View
          style={{
            width: mobileW,
            alignItems: "center",
            alignSelf: "center",
            flex: 1,
          }}
        >
          <View
            style={{
              width: (mobileW * 100) / 100,
              alignItems: "center",
              alignSelf: "center",
            }}
          >
            <ImageBackground
              style={{ width: mobileW, height: (mobileH * 19) / 100 }}
              resizeMode="cover"
              source={localimag.home_banner}
            >
              <View
                style={{
                  width: (mobileW * 92) / 100,
                  marginTop: (mobileH * 2.7) / 100,
                  flexDirection: "row",
                  alignSelf: "center",
                  justifyContent: "flex-start",
                  paddingVertical: (mobileH * 4) / 100,
                }}
              >
                <Image
                  style={{
                    width: (mobileW * 12.5) / 100,
                    height: (mobileW * 12.5) / 100,
                    borderRadius: (mobileW * 30) / 100,
                  }}
                  resizeMode="cover"
                  source={
                    this.state.user_details.image != null
                      ? { uri: config.img_url + this.state.user_details.image }
                      : localimag.userplaceholder
                  }
                ></Image>
                <View
                  style={{
                    marginLeft: (mobileW * 1.5) / 100,
                    flexDirection: "column",
                    alignSelf: "flex-start",
                    justifyContent: "space-between",
                    width: (mobileW * 40) / 100,
                  }}
                >
                  <Text
                    style={{
                      color: Colors.whiteColor,
                      fontFamily: Font.FontBold,
                      fontSize: (mobileW * 4.8) / 100,
                    }}
                  >
                    {this.state.GuestUser == true
                      ? "Welcome"
                      : Lang_chg.welcome_back_txt[config.language]}
                  </Text>
                  <Text
                    style={{
                      color: Colors.whiteColor,
                      fontFamily: Font.FontSemiBold,
                      fontSize: (mobileW * 4.5) / 100,
                    }}
                  >
                    {this.state.GuestUser == false &&
                      this.state.user_details.name}
                  </Text>
                </View>
                <View
                  style={{
                    width: (mobileW * 37) / 100,
                    flexDirection: "row",
                    justifyContent: "flex-end",
                  }}
                >
                  <TouchableOpacity
                    onPress={() => {
                      if (this.state.GuestUser == true) {
                        this.Checkuser();
                      } else {
                        this.props.navigation.navigate("Notifications");
                      }
                    }}
                    activeOpacity={0.7}
                    style={{}}
                  >
                    {this.state.notification_count > 0 ? (
                      <Image
                        style={{
                          width: (mobileW * 9) / 100,
                          height: (mobileW * 9) / 100,
                          marginLeft: (mobileW * 2) / 100,
                          alignSelf: "center",
                        }}
                        resizeMode="contain"
                        source={localimag.notification}
                      ></Image>
                    ) : (
                      <Image
                        style={{
                          width: (mobileW * 9) / 100,
                          height: (mobileW * 9) / 100,
                          marginLeft: (mobileW * 2) / 100,
                          alignSelf: "center",
                        }}
                        resizeMode="contain"
                        source={localimag.notification_dot}
                      ></Image>
                    )}
                  </TouchableOpacity>
                </View>
              </View>
            </ImageBackground>
            {/*===========Search----------------------  */}
            <View
              style={{
                marginTop: (mobileH * 2) / 100,
                flexDirection: "row",
                width: (mobileW * 94) / 100,
                borderRadius: (mobileW * 1.5) / 100,
                backgroundColor: Colors.whiteColor,
                paddingVertical: (mobileH * 0.1) / 100,
                shadowColor: Colors.shadow_color,
                shadowOffset: { width: 2, height: 2 },
                shadowOpacity: 0.2,
                elevation: 9,
                alignSelf: "center",
                paddingHorizontal: (mobileW * 3) / 100,
              }}
            >
              <TextInput
                style={{
                  width: "69%",
                  justifyContent: "center",
                  alignSelf: "center",
                  fontFamily: Font.FontSemiBold,
                  paddingVertical: (mobileW * 2) / 100,
                  color: Colors.black_color,
                  fontSize: (mobileW * 3.8) / 100,
                  marginLeft: (mobileW * 0) / 100,
                }}
                onChangeText={(txt) => {
                  consolepro.consolelog("txt", txt);
                  consolepro.consolelog(
                    "searchByCategory",
                    this.state.searchByCategory
                  );
                  if (txt == "") {
                    this.setState({
                      category_arr: this.state.category_arr_All,
                    });
                  }
                  this.setState({ searchByCategory: txt });
                }}
                maxLength={53}
                returnKeyLabel="done"
                returnKeyType="done"
                onSubmitEditing={() => {
                  Keyboard.dismiss();
                }}
                placeholderTextColor={Colors.greyColor}
                placeholder={"Search by Category"}
                value={this.state.searchByCategory + ""}
              />
              <TouchableOpacity
                onPress={() => {
                  this.searchbyCategory();
                }}
                activeOpacity={0.7}
                style={{ alignItems: "center", alignSelf: "center" }}
              >
                <LinearGradient
                  colors={[Colors.light_greencolor, Colors.purple_color]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={{
                    height: (mobileH * 7.1) / 100,
                    width: (mobileW * 30) / 100,
                    alignSelf: "center",
                    justifyContent: "center",
                    alignItems: "center",
                    borderTopRightRadius: (mobileW * 2) / 100,
                    borderBottomRightRadius: (mobileW * 2) / 100,
                    flexDirection: "row",
                  }}
                >
                  <Image
                    style={{
                      marginTop: (mobileH * 0) / 100,
                      height: (mobileW * 4.8) / 100,
                      width: (mobileW * 4.8) / 100,
                      resizeMode: "contain",
                      alignItems: "flex-start",
                      tintColor: Colors.whiteColor,
                    }}
                    source={localimag.grey_search}
                  ></Image>
                  <Text
                    style={{
                      color: "#f5f4f5",
                      fontFamily: Font.FontRegular,
                      fontSize: (mobileW * 4) / 100,
                      marginLeft: (mobileW * 1) / 100,
                    }}
                  >
                    {Lang_chg.Search_txt[config.language]}
                  </Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
            {this.state.show_details != false && (
              <KeyboardAwareScrollView
                refreshControl={
                  <RefreshControl
                    refreshing={this.state.refresh}
                    onRefresh={this._onRefresh}
                    tintColor={Colors.theme_color}
                    colors={[Colors.theme_color]}
                    //tintColor="#fff" titleColor="#fff" colors={[Colors.theme_color, "green", "blue"]}
                  />
                }
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ width: mobileW }}
                keyboardShouldPersistTaps="handled"
              >
                {/* ==========================search end=============================== */}

                {/* //=========Image View=====//*/}

                {this.state.banner_arr != "NA" && (
                  <Carousel
                    autoplay={true}
                    autoplayTimeout={3000}
                    loop={true}
                    index={0}
                    showsPageIndicator={true}
                    pageIndicatorStyle={{
                      backgroundColor: Colors.greyColor,
                      marginTop: (mobileH * 3) / 100,
                      borderRadius: (mobileW * 50) / 100,
                    }}
                    activePageIndicatorStyle={{
                      backgroundColor: Colors.voilet_color,
                    }}
                  >
                    {this.state.banner_arr.map((item, index) => {
                      return (
                        <View
                          style={{
                            width: (mobileW * 90) / 100,
                            alignSelf: "center",
                            marginTop: (mobileW * 5) / 100,
                            height: (mobileW * 55) / 100,
                          }}
                        >
                          <Image1
                            borderRadius={(mobileH * 1) / 100}
                            indicator={ProgressBar.Circle}
                            style={{
                              width: (mobileW * 90) / 100,
                              height: (mobileW * 45) / 100,
                              borderRadius: (mobileW * 2) / 100,
                              resizeMode: "cover",
                            }}
                            source={{
                              uri: config.img_url + item.image,
                            }}
                          ></Image1>
                        </View>
                      );
                    })}
                  </Carousel>
                )}
                {/* //=========Text View=====//*/}
                <View
                  style={{
                    width: (mobileW * 92) / 100,
                    alignSelf: "center",
                    justifyContent: "space-between",
                    flexDirection: "row",
                  }}
                >
                  <View
                    style={{
                      alignItems: "flex-start",
                      marginTop: (mobileH * 1.5) / 100,
                    }}
                  >
                    <Text
                      style={{
                        color: Colors.black_color,
                        fontFamily: Font.FontBold,
                        fontSize: (mobileW * 4.2) / 100,
                      }}
                    >
                      {Lang_chg.What_are_txt[config.language]}
                    </Text>
                  </View>
                </View>
                {/* //=============FlatList 1 ======// */}
                {this.state.category_arr != "NA" ? (
                  <FlatList
                    style={{
                      width: (mobileW * 97) / 100,
                      alignSelf: "flex-end",
                      marginTop: (mobileH * 1) / 100,
                    }}
                    data={this.state.category_arr}
                    numColumns={2}
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{
                      marginBottom: (mobileH * 30) / 100,
                    }}
                    renderItem={({ item, index }) => {
                      consolepro.consolelog("item...", item);
                      return (
                        <TouchableOpacity
                          activeOpacity={0.7}
                          onPress={() => {
                            if (item.subcategory_arr != "NA") {
                              this.props.navigation.navigate("SubCategorys", {
                                categoryDetails: item,
                              });
                            } else {
                              if (this.state.GuestUser == true) {
                                this.Checkuser();
                              } else {
                                this.props.navigation.navigate("Birthday", {
                                  categoryDetails: item,
                                  subcategory_arr: "NA",
                                });
                              }
                            }
                          }}
                          style={{
                            width: (mobileW * 49) / 100,
                            borderRadius: (mobileH * 0.5) / 100,
                            marginTop: (mobileH * 2) / 100,
                            flexDirection: "column",
                            alignSelf: "center",
                            justifyContent: "space-between",
                          }}
                        >
                          <View
                            style={{
                              flexDirection: "row",
                              alignItems: "flex-start",
                              borderRadius: (mobileH * 0.5) / 100,
                            }}
                          >
                            <Image1
                              indicator={ProgressBar.Circle}
                              borderRadius={(mobileH * 1) / 100}
                              style={{
                                height: (mobileW * 35) / 100,
                                width: (mobileW * 45) / 100,
                                resizeMode: "cover",
                              }}
                              source={{ uri: config.img_url + item.image }}
                            />
                          </View>
                          <Text
                            style={{
                              fontFamily: Font.FontSemiBold,
                              color: Colors.black_color,
                              fontSize: (mobileW * 4) / 100,
                              marginTop: (mobileH * 1) / 100,
                            }}
                          >
                            {item.category_name}
                          </Text>
                        </TouchableOpacity>
                      );
                    }}
                  />
                ) : (
                  <Nodata_foundimage />
                )}
              </KeyboardAwareScrollView>
            )}
          </View>
        </View>
        <HideWithKeyboard>
          <LinearGradient
            colors={[Colors.light_greencolor, Colors.voilet_color]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.linearGradient1}
          >
            <Footer
              activepage="Home"
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
              GuestUser={this.state.GuestUser}
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
    backgroundColor: Colors.white_color,
  },
  // otp pop start ===================
  otptitle: {
    fontFamily: Font.FontBold,
    fontSize: 26,
    textAlign: "center",
    marginTop: 10,
  },
  optTxt: {
    textAlign: "center",
    fontFamily: Font.FontSemiBold,
    fontSize: 14,
    color: "#CBC9C9",
  },
  otpInpoutType: {
    borderWidth: 1,
    borderColor: "#ccc",
    width: "80%",
    alignSelf: "center",
    textAlign: "center",
    height: 40,
    marginTop: 15,
    marginBottom: 20,
  },
  verifyBox: {
    flexDirection: "row",
    borderTopWidth: 1,
    borderColor: "#ccc",
    marginTop: 10,
  },
  resendboxLeft: {
    width: "50%",
    justifyContent: "center",
    alignSelf: "center",
    alignItems: "center",
    borderRightWidth: 1,
    borderColor: "#ccc",
    paddingTop: 15,
    paddingBottom: 15,
  },
  resendbox: {
    width: "50%",
    justifyContent: "center",
    alignSelf: "center",
    alignItems: "center",
    paddingTop: 15,
    paddingBottom: 15,
  },
  OTpLeftverify: {
    color: Colors.theme_color,
    fontFamily: Font.FontBold,
    fontSize: (mobileW * 4) / 100,
  },

  linearGradient: {
    height: (mobileH * 5) / 100,
    width: (mobileW * 30) / 100,
    alignSelf: "center",
    marginRight: (mobileW * 15) / 100,
  },
  linearGradient1: {
    marginTop: (mobileH * 1) / 100,
    height: (mobileH * 9) / 100,
    width: (mobileW * 100) / 100,
  },
  innerContainer: {
    borderRadius: (mobileW * 1.5) / 100, // <-- Inner Border Radius
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
});
