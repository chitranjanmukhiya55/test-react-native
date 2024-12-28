import React, { Component } from "react";
import {
  Text,
  SafeAreaView,
  StatusBar,
  FlatList,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";
import {
  config,
  Lang_chg,
  Font,
  Colors,
  mobileH,
  mobileW,
  localimag,
  localStorage,
  consolepro,
  msgTitle,
  msgProvider,
  apifuntion,
} from "./Provider/utilslib/Utils";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import LinearGradient from "react-native-linear-gradient";
import { Nodata_foundimage } from "./Provider/Nodata_foundimage";

export default class EventsHistory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      image_change_gender: 0,
      event: "",
      area: "",
      budget: "",
      event_arr: "NA",
    };
  }
  componentDidMount() {
    this.props.navigation.addListener("focus", () => {
      this.getEventHistory(1);
    });
    this.getEventHistory(0);
  }
  //---------back handler funtion-------------//

  _onRefresh = async () => {
    consolepro.consolelog("_onRefresh", "_onRefresh");
    this.setState({ refresh: true });
    setTimeout(() => {
      this.getEventHistory(1);
    }, 200);
  };

  async getEventHistory(Display) {
    let user_arr = await localStorage.getItemObject("user_arr");
    consolepro.consolelog("user_arr>", user_arr);
    let user_id = user_arr.user_id;
    let url = config.baseURL + "event_history.php?user_id=" + user_id;
    consolepro.consolelog("url", url);
    apifuntion
      .getApi(url, Display)
      .then((obj) => {
        consolepro.consolelog("obj", obj);
        this.setState({ refresh: false });
        if (obj.success == "true") {
          if (obj.event_arr != "NA") {
            this.setState({ event_arr: obj.event_arr });
          } else {
            this.setState({ event_arr: "NA" });
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
              onPress={() => this.props.navigation.navigate("Profile")}
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
                {Lang_chg.Events_History_txt[config.language]}
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
          {/* //===================for flatlist===================== */}

          <View>
            {this.state.event_arr != "NA" ? (
              <FlatList
                contentContainerStyle={{
                  width: (mobileW * 100) / 100,
                  alignSelf: "center",
                  marginTop: (mobileH * 1) / 100,
                  marginBottom: (mobileH * 7) / 100,
                }}
                data={this.state.event_arr}
                renderItem={({ item, index }) => {
                  return (
                    <TouchableOpacity
                      onPress={() =>
                        this.props.navigation.navigate("UserHistoryDetails", {
                          item: item.event_id,
                        })
                      }
                      activeOpacity={0.7}
                      style={{
                        width: (mobileW * 100) / 100,
                        paddingVertical: (mobileW * 1.5) / 100,
                        // marginTop: mobileH * 1 / 100 ,
                        marginBottom: (mobileH * 1.5) / 100,
                      }}
                    >
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
                          width: mobileW,
                          flexDirection: "row",
                          justifyContent: "space-between",
                          alignItems: "center",
                          alignSelf: "center",
                          paddingVertical: (mobileH * 1.5) / 100,
                          backgroundColor: Colors.light_graycolor,
                          paddingHorizontal: (mobileW * 3) / 100,
                        }}
                      >
                        <Text
                          style={{
                            fontSize: (mobileW * 3.5) / 100,
                            fontFamily: Font.FontSemiBold,
                            color: Colors.black_color,
                          }}
                        >
                          {item.request_number}
                        </Text>
                        <Text
                          style={{
                            fontSize: (mobileW * 3.5) / 100,
                            fontFamily: Font.FontBold,
                            color: Colors.dark_greencolor,
                          }}
                        >
                          {item.status}
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
                      {/* //========================for inner view===============// */}
                      <View
                        style={{
                          width: (mobileW * 70) / 100,
                          paddingHorizontal: (mobileW * 2) / 100,
                          width: mobileW,
                          alignSelf: "center",
                          paddingVertical: (mobileW * 3.5) / 100,
                        }}
                      >
                        <View
                          style={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                            width: (mobileW * 94) / 100,
                            alignSelf: "center",
                          }}
                        >
                          {/* for first view */}
                          <View
                            style={{
                              width: (mobileW * 50) / 100,
                              justifyContent: "flex-start",
                              borderRadius: (mobileW * 1) / 100,
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
                              {item.event_type}
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
                              width: (mobileW * 44) / 100,
                              justifyContent: "flex-start",
                              borderRadius: (mobileW * 1) / 100,
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
                              numberOfLines={2}
                              style={{
                                fontSize: (mobileW * 3.5) / 100,
                                fontFamily: Font.FontRegular,
                                color: Colors.black_color,
                              }}
                            >
                              {item.address}
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
                          width: mobileW,
                          flexDirection: "row",
                          justifyContent: "space-between",
                          alignItems: "center",
                          alignSelf: "center",
                          paddingVertical: (mobileW * 0.1) / 100,
                          backgroundColor: Colors.light_graycolor,
                          paddingHorizontal: (mobileW * 4) / 100,
                        }}
                      >
                        <Text
                          style={{
                            marginTop: (mobileH * 0.7) / 100,
                            fontSize: (mobileW * 3.5) / 100,
                            fontFamily: Font.FontSemiBold,
                            color: Colors.black_color,
                          }}
                        >
                          {Lang_chg.Budget_txt[config.language]}
                        </Text>
                        <Text
                          style={{
                            marginTop: (mobileH * 0.7) / 100,
                            fontSize: (mobileW * 3.5) / 100,
                            fontFamily: Font.FontSemiBold,
                            color: Colors.black_color,
                          }}
                        >
                          {"$" + item.budget}
                        </Text>
                      </View>
                      <View
                        style={{
                          width: mobileW,
                          flexDirection: "row",
                          justifyContent: "space-between",
                          alignItems: "center",
                          alignSelf: "center",
                          paddingVertical: (mobileW * 1.3) / 100,
                          backgroundColor: Colors.light_graycolor,
                          paddingHorizontal: (mobileW * 4) / 100,
                        }}
                      >
                        <Text
                          style={{
                            fontSize: (mobileW * 3) / 100,
                            fontFamily: Font.FontRegular,
                            color: Colors.bluegreen_color,
                          }}
                        >
                          {Lang_chg.transactionid_txt[config.language]}
                        </Text>
                        <Text
                          style={{
                            fontSize: (mobileW * 3) / 100,
                            fontFamily: Font.FontRegular,
                            color: Colors.bluegreen_color,
                          }}
                        >
                          {item.transaction_id}
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
});
