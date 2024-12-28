import React, { Component } from "react";
import {
  Text,
  BackHandler,
  SafeAreaView,
  StatusBar,
  KeyboardAvoidingView,
  Alert,
  View,
  StyleSheet,
  Keyboard,
  Dimensions,
  ImageBackground,
  TouchableOpacity,
  Image,
  Modal,
  FlatList,
  ScrollView,
  RadioButton,
  Button,
  TextInput,
  Linking,
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
  Cameragallery,
  mediaprovider,
  localStorage,
  consolepro,
  apifuntion,
  msgProvider,
  msgTitle,
} from "./Provider/utilslib/Utils";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
import { Nodata_foundimage } from "./Provider/Nodata_foundimage";
import LinearGradient from "react-native-linear-gradient";

class Notifications extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user_id: "",
      action_id: "",
      deleteAllConfirm: "",
      deleteModal1allnotification: "",
      notification_arr: "NA",
      refresh: false,
    };
  }

  componentDidMount() {
    this.props.navigation.addListener("focus", () => {
      this.getVendorNotification(1);
    });
    this.getVendorNotification(1);
  }
  //---------back handler funtion-------------//

  _onRefresh = async () => {
    consolepro.consolelog("_onRefresh", "_onRefresh");
    this.setState({ refresh: true });
    setTimeout(() => {
      this.getVendorNotification(1);
    }, 200);
  };
  async getVendorNotification(Display) {
    let user_arr = await localStorage.getItemObject("user_arr");
    consolepro.consolelog("user_arr>", user_arr);
    let user_id = user_arr.user_id;
    let url = config.baseURL + "get_notification.php";
    let data = new FormData();
    data.append("user_id", user_id);
    consolepro.consolelog("url", url);
    apifuntion
      .postApi(url, data, Display)
      .then((obj) => {
        consolepro.consolelog("obj", obj);
        this.setState({ refresh: false });
        if (obj.success == "true") {
          if (obj.notification_arr != "NA") {
            this.setState({ notification_arr: obj.notification_arr });
          } else {
            this.setState({ notification_arr: "NA" });
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

  async deleteSingleNotification(item) {
    let user_arr = await localStorage.getItemObject("user_arr");
    consolepro.consolelog("user_arr>", user_arr);
    let user_id = user_arr.user_id;
    let url = config.baseURL + "delete_single_notification.php";
    consolepro.consolelog("url", url);
    let data = new FormData();
    data.append("user_id", user_id);
    data.append("notification_id", item.notification_message_id);
    consolepro.consolelog("datadata", data);

    apifuntion
      .postApi(url, data)
      .then((obj) => {
        consolepro.consolelog("obj", obj);
        if (obj.success == "true") {
          this.getVendorNotification(1);
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

  async deleteAllNotification(item) {
    let user_arr = await localStorage.getItemObject("user_arr");
    consolepro.consolelog("user_arr>", user_arr);
    let user_id = user_arr.user_id;
    let url = config.baseURL + "delete_all_notification.php";
    consolepro.consolelog("url", url);
    let data = new FormData();
    data.append("user_id", user_id);
    consolepro.consolelog("datadata", data);

    apifuntion
      .postApi(url, data)
      .then((obj) => {
        consolepro.consolelog("obj", obj);
        if (obj.success == "true") {
          this.getVendorNotification(1);
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

  handleBackPress = () => {
    Alert.alert(
      Lang_chg.Delete_txt[config.language],
      Lang_chg.DoyouwanttodeleteBotification[config.language],
      [
        {
          text: Lang_chg.NoTxt[config.language],
          onPress: () => consolepro.consolelog("Cancel Pressed"),
          style: "Yes",
        },
        {
          text: Lang_chg.YesTxt[config.language],
          onPress: () => this.deleteAllNotification(),
        },
      ],
      {
        cancelable: false,
      }
    ); // works best when the goBack is async
    return true;
  };
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar
          barStyle="dark-content"
          backgroundColor={Colors.whiteColor}
          hidden={false}
          translucent={false}
          networkActivityIndicatorVisible={true}
        />
        {/* ---------------for header--------------- */}
        <View style={{ alignItems: "center", alignSelf: "center" }}>
          <LinearGradient
            colors={[Colors.purple_color, Colors.light_greencolor]}
            start={{ x: 1, y: 1 }}
            end={{ x: 0, y: 1 }}
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
              onPress={() => this.props.navigation.goBack()}
              activeOpacity={0.7}
              style={{ width: (mobileW * 20) / 100 }}
            >
              <Image
                style={{
                  // alignSelf: 'center',
                  width: (mobileW * 4.5) / 100,
                  height: (mobileW * 4.5) / 100,
                  paddingHorizontal: (mobileW * 6) / 100,
                  resizeMode: "contain",
                }}
                source={localimag.back}
              ></Image>
            </TouchableOpacity>
            <View style={{ width: (mobileW * 55) / 100, alignItems: "center" }}>
              <Text
                style={{
                  color: Colors.whiteColor,
                  fontFamily: Font.FontSemiBold,
                  fontSize: (mobileW * 5) / 100,
                  textAlign: "center",
                }}
              >
                {Lang_chg.notification[config.language]}
              </Text>
            </View>
            <View style={{ width: (mobileW * 20) / 100, alignItems: "center" }}>
              {this.state.notification_arr != "NA" && (
                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={() => {
                    this.handleBackPress();
                  }}
                  style={{
                    alignItems: "center",
                    justifyContent: "center",
                    height: (mobileW * 9) / 100,
                  }}
                >
                  <Text
                    style={{
                      fontSize: (mobileW * 3.5) / 100,
                      fontFamily: Font.FontBold,
                      color: Colors.whiteColor,
                    }}
                  >
                    {Lang_chg.clear_all[config.language]}
                  </Text>
                </TouchableOpacity>
              )}
            </View>
          </LinearGradient>
        </View>
        {/* ------------------header end ---------------- */}
        <KeyboardAwareScrollView
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            width: windowWidth,
            alignItems: "center",
            justifyContent: "center",
          }}
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
          {/* //===========FlatList=======// */}
          {this.state.notification_arr != "NA" ? (
            <FlatList
              data={this.state.notification_arr}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item, index }) => (
                <View>
                  <TouchableOpacity
                    onPress={() => {
                      if (
                        item.action == "vendor_work" &&
                        item.title == "Work Ended"
                      ) {
                        consolepro.consolelog("Hello 234");
                        this.props.navigation.navigate("UserHistoryDetails", {
                          item: item.action_id,
                        });
                      } else if (item.action == "vendor_request") {
                        this.props.navigation.navigate(
                          "ProposedEventVendorList1",
                          {
                            item: item.action_id,
                          }
                        );
                      }
                    }}
                    activeOpacity={0.7}
                    style={{
                      width: mobileW,
                      alignSelf: "flex-start",
                      flexDirection: "row",
                      justifyContent: "space-between",
                      paddingHorizontal: (mobileW * 5) / 100,
                      paddingVertical: (mobileW * 4.2) / 100,
                    }}
                  >
                    <View
                      style={{
                        width: (mobileW * 7) / 100,
                        height: (mobileW * 10) / 100,
                        borderRadius: (mobileW * 8) / 100,
                        alignSelf: "flex-start",
                      }}
                    >
                      <Image
                        style={{
                          width: (mobileW * 12.7) / 100,
                          height: (mobileW * 12.7) / 100,
                          borderRadius: (mobileW * 15) / 100,
                        }}
                        resizeMode="cover"
                        source={
                          item.image != null
                            ? { uri: config.img_url + item.image }
                            : localimag.userplaceholder
                        }
                      ></Image>
                    </View>
                    <View style={{ width: (mobileW * 75) / 100 }}>
                      <View
                        style={{
                          flexDirection: "row",
                          alignItems: "center",
                          justifyContent: "space-between",
                          marginTop: (mobileW * 1) / 100,
                        }}
                      >
                        <Text
                          style={{
                            color: Colors.black_color,
                            fontFamily: Font.FontBold,
                            fontSize: (mobileW * 3.5) / 100,
                          }}
                        >
                          {item.title}
                        </Text>
                        <Text
                          style={{
                            color: Colors.black_color,
                            fontFamily: Font.FontRegular,
                            fontSize: (mobileW * 3) / 100,
                          }}
                        >
                          {item.noti_date_time}
                        </Text>
                      </View>
                      <View
                        style={{
                          flexDirection: "row",
                          alignItems: "center",
                          justifyContent: "space-between",
                        }}
                      >
                        <Text
                          style={{
                            width: (mobileW * 65) / 100,
                            color: Colors.black_color,
                            fontFamily: Font.FontRegular,
                            fontSize: (mobileW * 2.8) / 100,
                          }}
                        >
                          {item.message}
                        </Text>
                        <TouchableOpacity
                          onPress={() => {
                            this.deleteSingleNotification(item);
                          }}
                          activeOpacity={0.7}
                          style={{
                            alignItems: "flex-end",
                            justifyContent: "center",
                            width: (mobileW * 7) / 100,
                            height: (mobileW * 6) / 100,
                          }}
                        >
                          <Image
                            style={{
                              width: (mobileW * 4) / 100,
                              height: (mobileW * 4) / 100,
                            }}
                            source={localimag.cancel}
                          ></Image>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </TouchableOpacity>
                  <View
                    style={{
                      width: (mobileW * 90) / 100,
                      borderColor: Colors.border_color,
                      borderWidth: (mobileW * 0.3) / 100,
                      alignSelf: "center",
                      backgroundColor: Colors.border_color,
                    }}
                  />
                </View>
              )}
            />
          ) : (
            <Nodata_foundimage />
          )}
        </KeyboardAwareScrollView>
      </SafeAreaView>
    );
  }
}
export default Notifications;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.whiteColor,
  },
});
