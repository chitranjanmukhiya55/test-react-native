import React, { Component } from "react";
import {
  Text,
  BackHandler,
  SafeAreaView,
  StatusBar,
  Alert,
  View,
  StyleSheet,
  Keyboard,
  Switch,
  TouchableOpacity,
  Image,
  TextInput,
  ImageBackground,
  FlatList,
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
  msgText,
  msgProvider,
  localStorage,
  apifuntion,
  msgTitle,
} from "./Provider/utilslib/Utils";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import LinearGradient from "react-native-linear-gradient";
import DatePicker from "react-native-date-picker";
import moment from "moment";
import { Nodata_foundimage } from "./Provider/Nodata_foundimage";
global.date_1 = new Date();

export default class VendorEditAvailaibility extends Component {
  constructor(props) {
    super(props);
    this.state = {
      celander: 0,
      change_view: 0,
      startDate: "",
      endDate: "",
      timeshow: false,
      endtimeshow: false,
      row_date: date_1,
      selected_date_for_api: "",
      selected_date_for_api1: "",
      availability_details: "NA",
    };
  }
  componentDidMount() {
    this.props.navigation.addListener("focus", () => {
      this.setState({
        selected_date_for_api: "",
        selected_date_for_api1: "",
        startDate: "",
        endDate: "",
        availability_details: "NA",
      });
    });
  }

  async getAvailavility() {
    let { selected_date_for_api, selected_date_for_api1 } = this.state;
    if (selected_date_for_api == "") {
      msgProvider.toast(msgText.emptyStartDate[config.language], "center");
      return false;
    }
    if (selected_date_for_api1 == "") {
      msgProvider.toast(msgText.emptyEndDate[config.language], "center");
      return false;
    }
    var user_arr = await localStorage.getItemObject("user_arr");
    var user_id = user_arr.user_id;
    let url =
      config.baseURL +
      "availablity_list.php?user_id=" +
      user_id +
      "&from_date=" +
      selected_date_for_api +
      "&to_date=" +
      selected_date_for_api1;
    consolepro.consolelog("url", url);
    apifuntion
      .getApi(url)
      .then((obj) => {
        consolepro.consolelog("obj", obj);
        if (obj.success == "true") {
          if (obj.availability_details != "NA") {
            this.setState({ availability_details: obj.availability_details });
          } else {
            this.setState({ availability_details: "NA" });
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

  settime = async (date) => {
    consolepro.consolelog("date>>>>", date);
    var dayname = "";
    // var d = new Date(this.state.date);
    var d = date;
    consolepro.consolelog({ d });
    var WeekArr = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    var WeekArr1 = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    var MonthArr = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    if (d != "") {
      consolepro.consolelog("date>>>>if");
      var m = d.getMonth() + 1;
      var m1 = d.getMonth() + 1;
      var y = d.getFullYear();
      var date = d.getDate();
      var day = d.getDay();
      var dayname = d.getDay();
      m = MonthArr[d.getMonth()];

      day = WeekArr[day];
      dayname = WeekArr1[dayname];
      if (date.toString().length == 1) {
        date = "0" + date;
      }
      var time = this.formatAMPM(d);
      // var fulldate = day + ' ' + date + ' ' + m + ', ' + time;
      // var fulldate1 = day + ' ' + m + ' ' + date + ', ' + time;
      var fulldate = day + " " + date + " " + m;
      var fulldate1 = day + " " + m + " " + date;
      var fulldate2 = y + "-" + m1 + "-" + date;
      var fulldate2 = date + "-" + m1 + "-" + y;
      var fulldate3 = y + "-" + m1 + "-" + date;
    } else {
      consolepro.consolelog("date>>>>else");
      let d = new Date();
      var m = d.getMonth() + 1;
      var m1 = d.getMonth() + 1;
      var y = d.getFullYear();
      var date = d.getDate();
      var day = d.getDay();
      var dayname = d.getDay();
      m = MonthArr[d.getMonth()];
      if (date.toString().length == 1) {
        date = "0" + date;
      }
      day = WeekArr[day];
      dayname = WeekArr1[dayname];
      var time = this.formatAMPM(d);
      // var fulldate = day + ' ' + date + ' ' + m + ', ' + time;
      // var fulldate1 = day + ' ' + m + ' ' + date + ', ' + time;
      var fulldate = day + " " + date + " " + m;
      var fulldate1 = day + " " + m + " " + date;
      var fulldate2 = y + "-" + m1 + "-" + date;
    }
    consolepro.consolelog({
      fulldate,
      fulldate1,
      dayname,
      time,
      fulldate2,
      fulldate3,
    });
    consolepro.consolelog(" i am in select date time ");

    var d = new Date(fulldate);

    this.setState({
      startDate: fulldate2,
      selected_date_for_api: fulldate3,
      timeshow: false,
    });
  };
  //--------to get time format----------//

  formatAMPM(date) {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? "0" + minutes : minutes;
    var strTime = hours + ":" + minutes + " " + ampm;
    return strTime;
  }

  setendtime = async (date) => {
    var dayname = "";
    // var d = new Date(this.state.date);
    var d = date;
    consolepro.consolelog({ d });
    var WeekArr = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    var WeekArr1 = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    var MonthArr = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    if (d != "") {
      var m = d.getMonth() + 1;
      var m1 = d.getMonth() + 1;
      var y = d.getFullYear();
      var date = d.getDate();
      var day = d.getDay();
      var dayname = d.getDay();
      m = MonthArr[d.getMonth()];

      day = WeekArr[day];
      dayname = WeekArr1[dayname];
      if (date.toString().length == 1) {
        date = "0" + date;
      }
      var time = this.formatAMPM(d);
      // var fulldate = day + ' ' + date + ' ' + m + ', ' + time;
      // var fulldate1 = day + ' ' + m + ' ' + date + ', ' + time;
      var fulldate = day + " " + date + " " + m;
      var fulldate1 = day + " " + m + " " + date;
      var fulldate2 = y + "-" + m1 + "-" + date;
      var fulldate2 = date + "-" + m1 + "-" + y;
      var fulldate3 = y + "-" + m1 + "-" + date;
    } else {
      let d = new Date();
      var m = d.getMonth() + 1;
      var m1 = d.getMonth() + 1;
      var y = d.getFullYear();
      var date = d.getDate();
      var day = d.getDay();
      var dayname = d.getDay();
      m = MonthArr[d.getMonth()];
      if (date.toString().length == 1) {
        date = "0" + date;
      }
      day = WeekArr[day];
      dayname = WeekArr1[dayname];
      var time = this.formatAMPM(d);
      // var fulldate = day + ' ' + date + ' ' + m + ', ' + time;
      // var fulldate1 = day + ' ' + m + ' ' + date + ', ' + time;
      var fulldate = day + " " + date + " " + m;
      var fulldate1 = day + " " + m + " " + date;
      var fulldate2 = y + "-" + m1 + "-" + date;
    }
    consolepro.consolelog({
      fulldate,
      fulldate1,
      dayname,
      time,
      fulldate2,
      fulldate3,
    });
    consolepro.consolelog(" i am in select date time ");

    var d = new Date(fulldate);

    this.setState({
      endDate: fulldate2,
      selected_date_for_api1: fulldate3,
      time: time,
      endtimeshow: false,
    });
  };

  deleteAvailability = (availability_date) => {
    Alert.alert(
      Lang_chg.DeleteSErvice[config.language],
      Lang_chg.areyouDeleteService[config.language],
      [
        {
          text: Lang_chg.no_txt[config.language],
          onPress: () => {
            consolepro.consolelog("nothing");
          },
        },
        {
          text: Lang_chg.yes_txt[config.language],
          onPress: () => this.finalDelete(availability_date),
        },
      ],
      { cancelable: false }
    );
  };

  async finalDelete(availability_date) {
    let date = moment(availability_date).format("YYYY-MM-DD");

    let user_arr = await localStorage.getItemObject("user_arr");
    consolepro.consolelog("user_arr>", user_arr);
    let user_id = user_arr.user_id;
    let url = config.baseURL + "delete_slot_by_date.php";
    var data = new FormData();
    data.append("user_id", user_id);
    data.append("availability_date", date);
    consolepro.consolelog("data", data);
    consolepro.consolelog("date", date);
    consolepro.consolelog("url", url);

    // return false
    apifuntion
      .postApi(url, data)
      .then((obj) => {
        consolepro.consolelog("successsssss", obj);
        if (obj.success == "true") {
          this.getAvailavility();
        } else {
          setTimeout(() => {
            msgProvider.alert(
              msgTitle.information[config.language],
              obj.msg[config.language],
              false
            );
            return false;
          }, 300);
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
        {/* // ================================= Start work ========================  */}
        <DatePicker
          modal
          mode="date"
          date={new Date()}
          // minimumDate={new Date()}
          title={"Select time"}
          titleIOS="Select time"
          open={this.state.timeshow}
          onConfirm={(startDate) => {
            this.settime(startDate);
          }}
          onCancel={() => {
            this.setState({ timeshow: false });
          }}
        />

        {/* ======================================== End work ================================= */}
        <DatePicker
          modal
          mode="date"
          date={new Date()}
          // minimumDate={new Date()}
          title={"Select time"}
          titleIOS="Select time"
          open={this.state.endtimeshow}
          onConfirm={(end_work) => {
            this.setendtime(end_work);
          }}
          onCancel={() => {
            this.setState({ endtimeshow: false });
          }}
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
            <TouchableOpacity
              onPress={() => this.props.navigation.goBack()}
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
                {Lang_chg.Edit_Availaibility_txt[config.language]}
              </Text>
            </View>
            <View style={{ width: (mobileW * 15) / 100, alignItems: "center" }}>
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => {
                  this.props.navigation.navigate("VenderAddSlots");
                }}
                style={{
                  paddingHorizontal: (mobileW * 1) / 100,
                  paddingVertical: (mobileW * 0.8) / 100,
                  borderRadius: (mobileW * 2) / 100,
                  alignItems: "center",
                  flexDirection: "row",
                  justifyContent: "space-evenly",
                }}
              >
                <Text
                  style={{
                    color: Colors.whiteColor,
                    fontFamily: Font.FontSemiBold,
                    fontSize: (mobileW * 4) / 100,
                  }}
                >
                  {Lang_chg.Add_txt[config.language]}
                </Text>
              </TouchableOpacity>
            </View>
          </LinearGradient>
        </View>

        {/* -------for fill celander--------- */}
        <View
          style={{
            marginTop: (mobileH * 3) / 100,
            width: (mobileW * 98) / 100,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-around",
              alignItems: "center",
              width: (mobileW * 92) / 100,
              alignSelf: "center",
            }}
          >
            <View
              style={{ alignItems: "flex-start", width: (mobileW * 42) / 100 }}
            >
              <Text
                style={{
                  fontSize: (mobileW * 4) / 100,
                  color: Colors.black_color,
                  fontStyle: Font.FontSemiBold,
                }}
              >
                {Lang_chg.startDate[config.language]}
              </Text>
              <LinearGradient
                colors={[Colors.voilet_color, Colors.light_greencolor]}
                start={{ x: 0, y: 0 }}
                end={{ x: 0, y: 1 }}
                style={styles.linearGradient}
              >
                <TouchableOpacity
                  activeOpacity={0.7}
                  style={{
                    height: (mobileW * 12) / 100,
                    width: (mobileW * 42) / 100,
                    backgroundColor: Colors.whiteColor,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                  onPress={() => {
                    this.setState({ timeshow: true });
                    // this.select_start_time(item, index)
                  }}
                >
                  <View
                    style={{
                      width: (mobileW * 35) / 100,
                      flexDirection: "row",
                      justifyContent: "space-around",
                      alignSelf: "center",
                    }}
                  >
                    <Text
                      style={{
                        fontSize: (mobileW * 4) / 100,
                        color: Colors.greyColor,
                      }}
                    >
                      {this.state.startDate != ""
                        ? this.state.startDate
                        : "Start Date"}
                    </Text>
                    <View
                      style={{
                        height: (mobileW * 7) / 100,
                        width: (mobileW * 0.3) / 100,
                        backgroundColor: Colors.greyColor,
                      }}
                    ></View>
                    <Image
                      style={{
                        height: (mobileW * 5) / 100,
                        width: (mobileW * 5) / 100,
                        resizeMode: "contain",
                        alignSelf: "center",
                      }}
                      source={localimag.calender}
                    ></Image>
                  </View>
                </TouchableOpacity>
              </LinearGradient>
            </View>

            <View
              style={{ alignItems: "flex-start", width: (mobileW * 42) / 100 }}
            >
              <Text
                style={{
                  fontSize: (mobileW * 4) / 100,
                  color: Colors.black_color,
                  fontStyle: Font.FontSemiBold,
                }}
              >
                {Lang_chg.EndDate[config.language]}
              </Text>
              <LinearGradient
                colors={[Colors.voilet_color, Colors.light_greencolor]}
                start={{ x: 0, y: 0 }}
                end={{ x: 0, y: 1 }}
                style={styles.linearGradient}
              >
                <TouchableOpacity
                  activeOpacity={0.7}
                  style={{
                    height: (mobileW * 12) / 100,
                    width: (mobileW * 42) / 100,
                    backgroundColor: Colors.whiteColor,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                  onPress={() => {
                    this.setState({ endtimeshow: true });
                  }}
                >
                  <View
                    style={{
                      width: (mobileW * 35) / 100,
                      flexDirection: "row",
                      justifyContent: "space-around",
                      alignSelf: "center",
                    }}
                  >
                    <Text
                      style={{
                        fontSize: (mobileW * 4) / 100,
                        color: Colors.greyColor,
                      }}
                    >
                      {this.state.endDate != ""
                        ? this.state.endDate
                        : "End Date"}
                    </Text>
                    <View
                      style={{
                        height: (mobileW * 7) / 100,
                        width: (mobileW * 0.3) / 100,
                        backgroundColor: Colors.greyColor,
                      }}
                    ></View>
                    <Image
                      style={{
                        height: (mobileW * 5) / 100,
                        width: (mobileW * 5) / 100,
                        resizeMode: "contain",
                        alignSelf: "center",
                      }}
                      source={localimag.calender}
                    ></Image>
                  </View>
                </TouchableOpacity>
              </LinearGradient>
            </View>
          </View>
        </View>
        {/* ----------------for check button--------- */}

        <TouchableOpacity
          onPress={() => this.getAvailavility()}
          activeOpacity={0.7}
          style={{
            alignItems: "center",
            alignSelf: "center",
            marginBottom: (mobileH * 2) / 100,
            marginTop: (mobileH * 3) / 100,
          }}
        >
          <LinearGradient
            colors={[Colors.purple_color, Colors.light_greencolor]}
            start={{ x: 0, y: 1 }}
            end={{ x: 1, y: 0 }}
            style={{
              height: (mobileH * 6.5) / 100,
              width: (mobileW * 90) / 100,
              alignSelf: "center",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: (mobileW * 1.5) / 100,
            }}
          >
            <Text
              style={{
                color: "#f5f4f5",
                fontFamily: Font.FontBold,
                fontSize: (mobileW * 4) / 100,
              }}
            >
              {Lang_chg.submit_txt[config.language]}
            </Text>
          </LinearGradient>
        </TouchableOpacity>
        {/* ------------------header end ---------------- */}
        <KeyboardAwareScrollView
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ width: mobileW }}
          keyboardShouldPersistTaps="handled"
        >
          {
            this.state.availability_details != "NA" ? (
              <FlatList
                data={this.state.availability_details}
                contentContainerStyle={{ marginBottom: (mobileH * 12) / 100 }}
                renderItem={({ item, index }) => {
                  consolepro.consolelog("item==========", item);
                  return (
                    <View style={{ width: mobileW }}>
                      <View
                        style={{
                          flexDirection: "row",
                          justifyContent: "space-between",
                          width: (mobileW * 90) / 100,
                          alignSelf: "center",
                        }}
                      >
                        <View
                          style={{
                            backgroundColor: "#ECEFF0",
                            paddingVertical: (mobileW * 2) / 100,
                            borderRadius: (mobileW * 2) / 100,
                            width: (mobileW * 30) / 100,
                            alignItems: "center",
                            marginTop: (mobileH * 1) / 100,
                          }}
                        >
                          <Text
                            style={{
                              color: Colors.back_color,
                              fontSize: (mobileW * 3.4) / 100,
                              fontFamily: Font.FontSemiBold,
                            }}
                          >
                            {item.availability_date}
                          </Text>
                        </View>
                        <View
                          style={{
                            width: (mobileW * 40) / 100,
                            alignItems: "center",
                            marginTop: (mobileH * 1) / 100,
                            flexDirection: "row",
                            justifyContent: "space-around",
                          }}
                        >
                          <TouchableOpacity
                            activeOpacity={0.7}
                            onPress={() => {
                              this.deleteAvailability(item.availability_date);
                            }}
                            style={{
                              alignSelf: "flex-end",
                              width: (mobileW * 17) / 100,
                              backgroundColor: "#C52726",
                              paddingVertical: (mobileW * 0.8) / 100,
                              borderRadius: (mobileW * 2) / 100,
                              alignItems: "center",
                              flexDirection: "row",
                              justifyContent: "space-evenly",
                            }}
                          >
                            <Image
                              style={{
                                width: (mobileW * 3) / 100,
                                height: (mobileW * 3) / 100,
                                resizeMode: "contain",
                                tintColor: Colors.whiteColor,
                              }}
                              source={localimag.delete}
                            ></Image>
                            <Text
                              style={{
                                color: Colors.whiteColor,
                                fontFamily: Font.FontSemiBold,
                              }}
                            >
                              {Lang_chg.Delete_txt[config.language]}
                            </Text>
                          </TouchableOpacity>
                          <TouchableOpacity
                            activeOpacity={0.7}
                            onPress={() => {
                              this.props.navigation.navigate(
                                "VenderEditSlots",
                                { item: item }
                              );
                            }}
                            style={{
                              alignSelf: "flex-end",
                              width: (mobileW * 17) / 100,
                              backgroundColor: "#2EA133",
                              paddingVertical: (mobileW * 0.8) / 100,
                              borderRadius: (mobileW * 2) / 100,
                              alignItems: "center",
                              flexDirection: "row",
                              justifyContent: "space-evenly",
                            }}
                          >
                            <Image
                              style={{
                                width: (mobileW * 3) / 100,
                                height: (mobileW * 3) / 100,
                                resizeMode: "contain",
                              }}
                              source={localimag.edit_avail}
                            ></Image>
                            <Text
                              style={{
                                color: Colors.whiteColor,
                                fontFamily: Font.FontSemiBold,
                              }}
                            >
                              {Lang_chg.Edit1_txt[config.language]}
                            </Text>
                          </TouchableOpacity>
                        </View>
                      </View>
                      <View
                        style={{
                          flexDirection: "row",
                          width: (mobileW * 90) / 100,
                          alignSelf: "center",
                          marginTop: (mobileH * 1) / 100,
                        }}
                      >
                        {item.availability_time.length > 0 && (
                          <FlatList
                            data={item.availability_time}
                            contentContainerStyle={{
                              marginBottom: (mobileH * 12) / 100,
                            }}
                            numColumns={2}
                            renderItem={({ item, index }) => {
                              consolepro.consolelog(
                                "item.item.availability_time",
                                item
                              );
                              return (
                                <View
                                  style={{
                                    flexDirection: "row",
                                    alignSelf: "center",
                                  }}
                                >
                                  <View
                                    style={{
                                      paddingVertical: (mobileW * 2) / 100,
                                      borderRadius: (mobileW * 2) / 100,
                                      paddingHorizontal: (mobileW * 2) / 100,
                                      alignItems: "center",
                                      marginTop: (mobileH * 1) / 100,
                                      borderWidth: (mobileW * 0.5) / 100,
                                      borderColor: "#ECEFF0",
                                    }}
                                  >
                                    <Text
                                      style={{
                                        color: Colors.back_color,
                                        fontSize: (mobileW * 3.4) / 100,
                                        fontFamily: Font.FontSemiBold,
                                      }}
                                    >
                                      {item.slot_time}
                                    </Text>
                                  </View>
                    
                                </View>
                              );
                            }}
                          />
                        )}
                      </View>
                      <View
                        style={{
                          marginTop: (mobileH * 3) / 100,
                          backgroundColor: "#ECEFF0",
                          width: mobileW,
                          height: (mobileH * 0.2) / 100,
                        }}
                      ></View>
                    </View>
                  );
                }}
              />
            ) : (
              <></>
            )
            // <Nodata_foundimage />
          }
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

  labelText: {
    fontSize: (mobileW * 2.8) / 100,
    fontFamily: Font.Semibold,
    color: Colors.whiteColor,
    marginTop: (mobileH * 1.8) / 100,
  },
  TimesOfWorktxt: {
    paddingVertical: (mobileH * 1) / 100,
    fontSize: (mobileW * 4) / 100,
    fontFamily: Font.FontSemiBold,
    color: Colors.black_color,
    alignSelf: "flex-start",
  },
  linearGradient: {
    marginTop: (mobileH * 1) / 100,
    height: (mobileW * 13) / 100,
    width: (mobileW * 43) / 100,
    borderRadius: (mobileW * 1.5) / 100, // <-- Outer Border Radius
    alignItems: "center",
    justifyContent: "center",
  },
});
