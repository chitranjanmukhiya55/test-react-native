import React, { Component } from "react";
import {
  Text,
  SafeAreaView,
  StatusBar,
  View,
  StyleSheet,
  FlatList,
  Keyboard,
  TouchableOpacity,
  Image,
  TextInput,
  ImageBackground,
  Alert,
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
  msgTitle,
  msgProvider,
  apifuntion,
} from "./Provider/utilslib/Utils";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import LinearGradient from "react-native-linear-gradient";
import Footer from "./Provider/Footer";
import HideWithKeyboard from "react-native-hide-with-keyboard";
import { Nodata_foundimage } from "./Provider/Nodata_foundimage";
import Image1 from "react-native-image-progress";
import { ProgressBar } from "react-native-paper";

export default class Einvites extends Component {
  constructor(props) {
    super(props);
    this.state = {
      GuestUser: false,
      card_arr: "NA",
      searchText: "",
      card_arr_All: "NA",
      show_details: false,
    };
  }

  componentDidMount() {
    this.props.navigation.addListener("focus", () => {
      global_user_address = "";
      this.checkuser();
      this.getAllEinvites(1);
    });
    this.checkuser();
    this.getAllEinvites(1);
  }

  async checkuser() {
    let GuestUser = await localStorage.getItemObject("ContinueAsaGuest");
    consolepro.consolelog("GuestUserGuestUserGuestUser", GuestUser);
    if (GuestUser != null) {
      this.setState({ GuestUser: GuestUser });
    }
  }

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
            // redirect_page_id=0,
            // redirect_page=''
          },
        },
      ],
      { cancelable: false }
    );
  };

  async getAllEinvites(Display) {
    let GuestUser = await localStorage.getItemObject("ContinueAsaGuest");
    consolepro.consolelog("GuestUserGuestUserGuestUser", GuestUser);
    if (GuestUser != null) {
      this.setState({ GuestUser: GuestUser });
    }
    let url;
    if (GuestUser == true) {
      url = config.baseURL + "get_invite_card_list.php?user_id=" + 0;
    } else {
      var user_arr = await localStorage.getItemObject("user_arr");
      var user_id = user_arr.user_id;
      url = config.baseURL + "get_invite_card_list.php?user_id=" + user_id;
    }

    consolepro.consolelog("url", url);
    apifuntion
      .getApi(url, Display)
      .then((obj) => {
        consolepro.consolelog("get_invite", obj);
        this.setState({ show_details: true });
        if (obj.success == "true") {
          this.setState({ card_arr: obj.card_arr, card_arr_All: obj.card_arr });
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

  searchbyTitle = (text) => {
    this.setState({ searchText: text });

    let data1 = this.state.card_arr_All;
    if (data1 != "NA") {
      consolepro.consolelog("data1108", data1);
      if (data1 != "NA") {
        let newData = data1.filter(function (item) {
          return item.title.toString().toLowerCase().indexOf(text) >= 0;
        });

        consolepro.consolelog("newData", newData);
        consolepro.consolelog("this.state.card_arr", this.state.card_arr);
        if (newData.length > 0) {
          this.setState({ card_arr: newData });
        } else if (newData.length <= 0) {
          this.setState({ card_arr: "NA" });
        }
      }
    }
  };

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
            colors={[Colors.light_greencolor, Colors.voilet_color]}
            start={{ x: 0, y: 0 }}
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
                {Lang_chg.invites_txt[config.language]}
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
          {/*===========Search----------------------  */}

          <View
            style={{
              marginTop: (mobileH * 2) / 100,
              flexDirection: "row",
              width: (mobileW * 92) / 100,
              borderRadius: (mobileW * 1.5) / 100,
              backgroundColor: Colors.whiteColor,
              paddingVertical: (mobileH * 0.1) / 100,
              shadowColor: Colors.shadow_color,
              shadowOffset: { width: 2, height: 2 },
              shadowOpacity: 0.2,
              elevation: 1,
              alignSelf: "center",
              backgroundColor: Colors.border_color,
              paddingHorizontal: (mobileW * 3) / 100,
            }}
          >
            <Image
              style={{
                height: (mobileW * 6) / 100,
                width: (mobileW * 6) / 100,
                resizeMode: "contain",
                alignSelf: "center",
                justifyContent: "center",
                marginLeft: (mobileW * 0.5) / 100,
              }}
              source={localimag.grey_search}
            ></Image>
            <TextInput
              style={{
                width: "95%",
                justifyContent: "center",
                alignSelf: "center",
                fontFamily: Font.FontSemiBold,
                paddingVertical: (mobileW * 3) / 100,
                color: Colors.black_color,
                fontSize: (mobileW * 4.2) / 100,
                marginLeft: (mobileW * 1.5) / 100,
              }}
              onChangeText={(txt) => {
                this.searchbyTitle(txt);
              }}
              maxLength={100}
              returnKeyLabel="done"
              returnKeyType="done"
              onSubmitEditing={() => {
                Keyboard.dismiss();
              }}
              placeholderTextColor={Colors.greyColor}
              placeholder={"Search "}
              value={this.state.searchText}
            />
          </View>
          {/* ==========================search end=============================== */}
          {this.state.show_details != false && (
            <View>
              {this.state.card_arr != "NA" ? (
                <FlatList
                  data={this.state.card_arr}
                  contentContainerStyle={{
                    width: (mobileW * 95) / 100,
                    alignSelf: "center",
                    marginTop: (mobileH * 2) / 100,
                    marginLeft: (mobileW * 3) / 100,
                  }}
                  numColumns={2}
                  renderItem={({ item, index }) => {
                    console.log("237", item);
                    return (
                      <View
                        style={{
                          width: (mobileW * 46) / 100,
                          marginRight: (mobileW * 1) / 100,
                          marginBottom: (mobileH * 0.3) / 100,
                          alignSelf: "center",
                        }}
                      >
                        <TouchableOpacity
                          onPress={() => {
                            if (this.state.GuestUser == true) {
                              this.Checkuser();
                            } else {
                              this.props.navigation.navigate("SelectDesigns", {
                                item: item,
                              });
                            }
                          }}
                          style={{ width: (mobileW * 50) / 100 }}
                          activeOpacity={0.7}
                        >
                          <Image1
                            indicator={ProgressBar.Circle}
                            resizeMode="contain"
                            style={{
                              width: (mobileW * 45) / 100,
                              height: (mobileW * 32) / 100,
                            }}
                            source={{ uri: config.img_url + item.image }}
                          >
                            <Text
                              style={{
                                fontSize: (mobileW * 3.4) / 100,
                                fontFamily: Font.FontBold,
                                color: Colors.whiteColor,
                                paddingTop: (mobileH * 2.5) / 100,
                                paddingHorizontal: (mobileW * 2) / 100,
                              }}
                            >
                              {item.title}
                            </Text>
                          </Image1>
                        </TouchableOpacity>
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
              activepage="Einvites"
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
    backgroundColor: Colors.whiteColor,
  },
  linearGradient1: {
    marginTop: (mobileH * 1) / 100,
    height: (mobileH * 9) / 100,
    width: (mobileW * 100) / 100,
  },
});
