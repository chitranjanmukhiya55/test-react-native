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

export default class SubCategorys extends Component {
  _didFocusSubscription;
  _willBlurSubscription;
  constructor(props) {
    super(props);
    this.state = {
      banner_arr: "NA",
      category_arr: "NA",
      category_arr_All: "NA",
      categoryDetails: this.props.route.params.categoryDetails,
      user_details: "NA",
      searchByCategory: "",
      refresh: false,
      GuestUser: false,
      notification_count: 0,
    };
  }
  componentDidMount() {
    localStorage.setItemObject("image_change_gender", null);
    localStorage.setItemObject("createEventJSON", null);
    global_user_address = "";

    this.props.navigation.addListener("focus", () => {
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
      this.setState({ refresh: true });
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
        <View
          style={{
            width: mobileW,
            alignItems: "center",
            alignSelf: "center",
            flex: 1,
          }}
        >
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
              <View
                style={{ width: (mobileW * 70) / 100, alignItems: "center" }}
              >
                <Text
                  style={{
                    color: Colors.whiteColor,
                    fontFamily: Font.FontSemiBold,
                    fontSize: (mobileW * 5) / 100,
                  }}
                >
                  {this.state.categoryDetails.category_name}
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
          <View
            style={{
              width: (mobileW * 100) / 100,
              alignItems: "center",
              alignSelf: "center",
            }}
          >
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

              {this.state.categoryDetails.subcategory_arr != "NA" ? (
                <FlatList
                  style={{
                    width: (mobileW * 97) / 100,
                    alignSelf: "flex-end",
                    marginTop: (mobileH * 1) / 100,
                  }}
                  data={this.state.categoryDetails.subcategory_arr}
                  numColumns={2}
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={{ marginBottom: (mobileH * 30) / 100 }}
                  renderItem={({ item, index }) => {
                    consolepro.consolelog("item...", item);
                    return (
                      <TouchableOpacity
                        activeOpacity={0.7}
                        onPress={() => {
                          if (this.state.GuestUser == true) {
                            this.Checkuser();
                          } else {
                            this.props.navigation.navigate("Birthday", {
                              categoryDetails: this.state.categoryDetails,
                              subcategory_arr: item,
                            });
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
                            source={{ uri: config.img_url + item.subimage }}
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
                          {item.event_sub_category_name}
                        </Text>
                      </TouchableOpacity>
                    );
                  }}
                />
              ) : (
                <Nodata_foundimage />
              )}
            </KeyboardAwareScrollView>
          </View>
        </View>
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
