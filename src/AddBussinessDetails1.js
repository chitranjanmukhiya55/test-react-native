import React, { Component } from "react";
import {
  Text,
  SafeAreaView,
  BackHandler,
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
  msgProvider,
  localStorage,
  apifuntion,
  msgTitle,
} from "./Provider/utilslib/Utils";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import LinearGradient from "react-native-linear-gradient";
import CalendarPicker from "react-native-calendar-picker";
import DatePicker from "react-native-date-picker";
import { FlatList } from "react-native-gesture-handler";

export default class AddBussinessDetails1 extends Component {
  _didFocusSubscription;
  _willBlurSubscription;
  constructor(props) {
    super(props);
    this.state = {
      celander: 0,
      change_view: 0,
      timeshow: false,
      endtimeshow: false,
      start_work: "",
      end_work: "",
      timeSlots: [
        {
          id: 0,
          start_data: "",
          end_data: "",
          start_data_send: "",
          end_data_send: "",
        },
      ],
      allTimeSlots: [],
      index: 0,
      showSlot: false,
      selected_date: null,
      selected_date_add: null,
      onAddTimeSlot: false,
      startDate: "",
      endDate: "",
      startHours: "",
    };
    this.onDateChange = this.onDateChange.bind(this);
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
  }

  settime = (res) => {
    consolepro.consolelog("res", res);
    let date = res.getDate();
    let minutes = res.getMinutes();
    let hours = res.getHours();
    this.setState({ startHours: hours });
    consolepro.consolelog("minutes", minutes);
    consolepro.consolelog("hours", hours);
    var ampm = hours >= 12 ? "PM" : "AM";
    let sendtime = hours + ":" + minutes + ":00";
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? "0" + minutes : minutes;
    let time = hours + ":" + minutes + " " + ampm;
    consolepro.consolelog("270sendtime", sendtime);
    // this.setState({ start_work: time, sendstarttime: sendtime, timeshow: false })  //
    let data = this.state.timeSlots;
    consolepro.consolelog("this.state.timeSlots", this.state.timeSlots);

    consolepro.consolelog("data49", data);
    // data[0].start_data =
    let data1 = this.state.allTimeSlots;
    consolepro.consolelog("data154", data1);
    consolepro.consolelog("data155", this.state.index);
    for (let i = 0; i < data1.length; i++) {
      if (i == this.state.index) {
        data1[i].start_data = time;
        data1[i].start_data_send = sendtime;
      }
    }
    consolepro.consolelog("data178", data1);
    this.setState({ allTimeSlots: data1, timeshow: false });
  };

  setendtime = (res) => {
    consolepro.consolelog("res", res);
    let date = res.getDate();
    let minutes = res.getMinutes();
    let hours = res.getHours();
    let hoursuse = res.getHours();
    consolepro.consolelog("minutes", minutes);
    consolepro.consolelog("hours", hours);
    var ampm = hours >= 12 ? "PM" : "AM";
    let sendtime = hours + ":" + minutes + ":00";
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? "0" + minutes : minutes;
    let time = hours + ":" + minutes + " " + ampm;
    consolepro.consolelog("287sendtime", sendtime);

    // this.setState({ end_work: time, sendendtime: sendtime, endtimeshow: false })  //+
    consolepro.consolelog("hourshours", hoursuse);
    consolepro.consolelog("this.state.startHours", this.state.startHours);
    if (hoursuse <= this.state.startHours) {
      consolepro.consolelog("I am in start date check is less then end date ");
      this.setState({ endtimeshow: false });
      msgProvider.toast(
        Lang_chg.starttimegrethenendtime[config.language],
        "center"
      );
      return false;
    }

    let data = this.state.timeSlots;
    // data[0].end_data = time
    let data1 = this.state.allTimeSlots;

    for (let i = 0; i < data1.length; i++) {
      if (i == this.state.index) {
        data1[i].end_data = time;
        data1[i].end_data_send = sendtime;
      }
    }
    consolepro.consolelog("data178", data1);
    this.setState({ allTimeSlots: data1, endtimeshow: false });
  };

  onDateChange(date, type) {
    if (date != null) {
      consolepro.consolelog("datedate>>>>", date);
      consolepro.consolelog("typetype", type);
      consolepro.consolelog("I am date", date);
      var selected_date_arr = date._d;
      const monthNames = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "June",
        "July",
        "Aug",
        "Sept",
        "Octr",
        "Nov",
        "Dec",
      ];
      var getDate = selected_date_arr.getDate();
      if (getDate < 10) {
        getDate = "0" + getDate;
      } else {
        getDate;
      }
      var getMonth = monthNames[selected_date_arr.getMonth()];
      var get_month_add = selected_date_arr.getMonth() + 1;
      if (get_month_add < 10) {
        get_month_add = "0" + get_month_add;
      } else {
        get_month_add;
      }
      var getYear = selected_date_arr.getFullYear();

      var selected_date = getMonth + " " + getDate + " " + getYear;
      var selected_date_add = getYear + "-" + get_month_add + "-" + getDate;
      this.setState({
        selected_date: selected_date,
        selected_date_add: selected_date_add,
        showSlot: true,
        allTimeSlots: [
          {
            id: 0,
            start_data: "",
            end_data: "",
            start_data_send: "",
            end_data_send: "",
          },
        ],
      });
      if (type == "START_DATE") {
        this.setState({ startDate: selected_date_add });
      }
      if (type == "END_DATE") {
        this.setState({ endDate: selected_date_add });
      }
      consolepro.consolelog({ selected_date, selected_date_add });
    }
  }

  extraSlots() {
    let data = this.state.allTimeSlots;
    consolepro.consolelog("data===", data.length);
    consolepro.consolelog("index===", this.state.index);
    var arr = {
      id: data.length + 1,
      start_data: "",
      end_data: "",
      start_data_send: "",
      end_data_send: "",
    };
    data.push(arr);
    consolepro.consolelog("138data", data);
    this.setState({ allTimeSlots: data });
  }

  removeSlits(item, index) {
    let data1 = this.state.allTimeSlots;
    var length = data1.length;
    consolepro.consolelog("data146", data1);
    if (length == 1) {
      consolepro.consolelog("i am length 1");
      this.setState({
        allTimeSlots: [],
      });
    } else {
      data1.splice(index, 1);
      this.setState({
        allTimeSlots: data1,
      });
    }
    consolepro.consolelog("data159", data1);
  }

  handleBackPress = () => {
    Alert.alert(
      Lang_chg.Gobacktxt[config.language],
      Lang_chg.Doyouwanttoexitsteptxt[config.language],
      [
        {
          text: Lang_chg.NoTxt[config.language],
          onPress: () => consolepro.consolelog("Cancel Pressed"),
          style: "Yes",
        },
        {
          text: Lang_chg.YesTxt[config.language],
          onPress: () => this.props.navigation.navigate("Login"),
        },
      ],
      {
        cancelable: false,
      }
    ); // works best when the goBack is async

    return true;
  };
  async getDatesBetween() {
    let user_arr = await localStorage.getItemObject("user_arr");
    consolepro.consolelog("user_arr", user_arr);
    let user_id = user_arr.user_id;
    const dates = [];
    var startDate = this.state.startDate;
    var endDate = this.state.endDate;
    consolepro.consolelog("startDate", startDate);
    consolepro.consolelog("endDate", endDate);
    let currentDate = new Date(startDate);
    endDate = new Date(endDate);

    while (currentDate <= endDate) {
      dates.push(currentDate.toISOString().slice(0, 10));
      currentDate.setDate(currentDate.getDate() + 1);
    }
    consolepro.consolelog("mydatemydate", dates);
    if (dates.length == 0) {
      msgProvider.toast(Lang_chg.selectDatesDetails[config.language], "center");
      return false;
    }
    this.setState({
      date_range_arr: dates,
    });

    let allTimeSlots = this.state.allTimeSlots;
    consolepro.consolelog("200", allTimeSlots);
    if (allTimeSlots.length == 0) {
      msgProvider.toast(Lang_chg.selectDatesDetails[config.language], "center");
      return false;
    }
    let status = false;
    consolepro.consolelog("allTimeSlotsallTimeSlots206", allTimeSlots.length);
    for (let i = 0; i < allTimeSlots.length; i++) {
      if (allTimeSlots[i].start_data == "" || allTimeSlots[i].end_data == "") {
        status = true;
      }
    }
    consolepro.consolelog("statusstatusstatus", status);
    if (status == true) {
      msgProvider.toast(Lang_chg.selectDates[config.language], "center");
      return false;
    }

    let url = config.baseURL + "availablity.php";

    consolepro.consolelog("url00---=====", url);
    let data = new FormData();
    data.append("user_id", user_id);
    for (let i = 0; i < this.state.date_range_arr.length; i++) {
      consolepro.consolelog(
        "date_range_arr---=====",
        this.state.date_range_arr[i]
      );
      data.append("availability_date[]", this.state.date_range_arr[i]);
    }
    for (let i = 0; i < allTimeSlots.length; i++) {
      consolepro.consolelog(
        "allTimeSlots.start_data[i]---=====",
        allTimeSlots[i].start_data
      );
      data.append("start_time[]", allTimeSlots[i].start_data_send);
      data.append("end_time[]", allTimeSlots[i].end_data_send);
    }

    consolepro.consolelog("url---=====", url);
    consolepro.consolelog("data---=====", data);

    apifuntion
      .postApi(url, data)
      .then((obj) => {
        consolepro.consolelog("objobjobjobj", obj);
        if (obj.success == "true") {
          setTimeout(() => {
            this.props.navigation.navigate("AddBussinessDetails3");
          }, 300);
        } else {
          if (obj.active_status == 0 || obj.account_active_status == 0) {
            config.checkUserDeactivate(this.props.navigation);
            return false;
          } else {
            msgProvider.toast(
              msgTitle.information[config.language],
              obj.msg[config.language],
              false
            );
            return false;
          }
        }
      })
      .catch((error) => {
        consolepro.consolelog(error);
      });
  }

  doneButton() {
    this.getDatesBetween();
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
          mode="time"
          date={new Date()}
          // minimumDate={new Date()}
          title={"Select time"}
          titleIOS="Select time"
          open={this.state.timeshow}
          onConfirm={(start_work) => {
            this.settime(start_work);
          }}
          onCancel={() => {
            this.setState({ timeshow: false });
          }}
        />

        {/* ======================================== End work ================================= */}
        <DatePicker
          modal
          mode="time"
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
              onPress={() => this.handleBackPress()}
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
                {Lang_chg.Add_Bussiness_Details_txt[config.language]}
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
          <View style={{ alignSelf: "center", marginTop: (mobileH * 2) / 100 }}>
            <Image
              style={{
                alignSelf: "center",
                width: (mobileW * 79) / 100,
                height: (mobileW * 12) / 100,
                resizeMode: "contain",
                // backgroundColor: 'red'
              }}
              source={localimag.addBussiness3}
            ></Image>
            <View
              style={{
                width: (mobileW * 82) / 100,
                alignSelf: "center",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Text
                style={{
                  color: Colors.black_color,
                  fontFamily: Font.FontSemiBold,
                  fontSize: (mobileW * 3) / 100,
                }}
              >
                {Lang_chg.Services_txt[config.language]}
              </Text>
              <Text
                style={{
                  color: Colors.black_color,
                  fontFamily: Font.FontSemiBold,
                  fontSize: (mobileW * 3) / 100,
                }}
              >
                {Lang_chg.About_txt[config.language]}
              </Text>
              <Text
                style={{
                  color: Colors.black_color,
                  fontFamily: Font.FontSemiBold,
                  fontSize: (mobileW * 3) / 100,
                }}
              >
                {Lang_chg.Avelability_txt[config.language]}
              </Text>
              <Text
                style={{
                  color: Colors.greyColor,
                  fontFamily: Font.FontRegular,
                  fontSize: (mobileW * 3) / 100,
                }}
              >
                {Lang_chg.Photos_txt[config.language]}
              </Text>
            </View>
          </View>
          {/* ---------------border view----------- */}
          <View
            style={{
              width: mobileW,
              borderColor: Colors.border_color,
              borderWidth: (mobileW * 0.3) / 100,
              backgroundColor: Colors.border_color,
              marginTop: (mobileH * 4) / 100,
            }}
          ></View>

          <CalendarPicker
            startFromMonday={true}
            allowRangeSelection={true}
            nextTitle=">"
            previousTitle="<"
            previousTitleStyle={{
              fontSize: (mobileW * 6) / 100,
              width: (mobileW * 6) / 100,
              color: Colors.black_color,
            }}
            nextTitleStyle={{
              fontSize: (mobileW * 6) / 100,
              width: (mobileW * 6) / 100,
              color: Colors.black_color,
            }}
            minDate={new Date()}
            todayBackgroundColor="#f2e6ff"
            selectedDayColor="#7453CE"
            selectedDayTextColor="#FFFFFF"
            onDateChange={this.onDateChange}
          />

          <View
            style={{
              width: mobileW,
              borderColor: Colors.border_color,
              borderWidth: (mobileW * 0.3) / 100,
              backgroundColor: Colors.border_color,
              marginTop: (mobileH * 4) / 100,
            }}
          ></View>

          {this.state.showSlot == true && (
            <>
              <View
                style={{
                  marginTop: (mobileH * 1) / 100,
                  flexDirection: "row",
                  justifyContent: "space-around",
                  alignItems: "center",
                  width: (mobileW * 92) / 100,
                  alignSelf: "center",
                }}
              >
                <View
                  style={{
                    alignItems: "flex-start",
                    width: (mobileW * 42) / 100,
                  }}
                >
                  <Text style={styles.TimesOfWorktxt}>
                    {Lang_chg.startTime[config.language]}
                  </Text>
                </View>
                <View
                  style={{
                    alignItems: "flex-start",
                    width: (mobileW * 42) / 100,
                  }}
                >
                  <Text style={styles.TimesOfWorktxt}>
                    {" "}
                    {Lang_chg.endTime[config.language]}{" "}
                  </Text>
                </View>
                <TouchableOpacity
                  onPress={() => {
                    // this.setState({ onAddTimeSlot: true })
                    this.extraSlots();
                  }}
                  activeOpacity={0.7}
                  style={{
                    justifyContent: "center",
                    alignSelf: "flex-end",
                    height: (mobileW * 13) / 100,
                    width: (mobileW * 7) / 100,
                  }}
                >
                  <Image
                    style={{
                      height: (mobileW * 6) / 100,
                      width: (mobileW * 6) / 100,
                      resizeMode: "contain",
                      alignSelf: "center",
                    }}
                    source={localimag.plusIcon}
                  ></Image>
                </TouchableOpacity>
              </View>
              {this.state.allTimeSlots.length > 0 && (
                <FlatList
                  data={this.state.allTimeSlots}
                  contentContainerStyle={{ marginBottom: (mobileH * 12) / 100 }}
                  renderItem={({ item, index }) => {
                    consolepro.consolelog("item==========", item);
                    return (
                      <View
                        style={{
                          marginTop: (mobileH * 1) / 100,
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
                            style={{
                              alignItems: "flex-start",
                              width: (mobileW * 42) / 100,
                            }}
                          >
                            <LinearGradient
                              colors={[
                                Colors.voilet_color,
                                Colors.light_greencolor,
                              ]}
                              start={{ x: 0, y: 0 }}
                              end={{ x: 0, y: 1 }}
                              style={styles.linearGradient}
                            >
                              <TouchableOpacity
                                activeOpacity={0.7}
                                style={{
                                  height: (mobileW * 12) / 100,
                                  width: (mobileW * 39) / 100,
                                  backgroundColor: Colors.whiteColor,
                                  alignItems: "center",
                                  justifyContent: "center",
                                }}
                                onPress={() => {
                                  this.setState({
                                    timeshow: true,
                                    index: index,
                                  });
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
                                    {item.start_data != ""
                                      ? item.start_data
                                      : "Start Time"}
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
                                      height: (mobileW * 4) / 100,
                                      width: (mobileW * 4) / 100,
                                      resizeMode: "contain",
                                      alignSelf: "center",
                                    }}
                                    source={localimag.Time}
                                  ></Image>
                                </View>
                              </TouchableOpacity>
                            </LinearGradient>
                          </View>

                          <View
                            style={{
                              alignItems: "flex-start",
                              width: (mobileW * 42) / 100,
                            }}
                          >
                            <LinearGradient
                              colors={[
                                Colors.voilet_color,
                                Colors.light_greencolor,
                              ]}
                              start={{ x: 0, y: 0 }}
                              end={{ x: 0, y: 1 }}
                              style={styles.linearGradient}
                            >
                              <TouchableOpacity
                                activeOpacity={0.7}
                                style={{
                                  height: (mobileW * 12) / 100,
                                  width: (mobileW * 39) / 100,
                                  backgroundColor: Colors.whiteColor,
                                  alignItems: "center",
                                  justifyContent: "center",
                                }}
                                onPress={() => {
                                  this.setState({
                                    endtimeshow: true,
                                    index: index,
                                  });
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
                                    {item.end_data != ""
                                      ? item.end_data
                                      : "End Time"}
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
                                      height: (mobileW * 4) / 100,
                                      width: (mobileW * 4) / 100,
                                      resizeMode: "contain",
                                      alignSelf: "center",
                                    }}
                                    source={localimag.Time}
                                  ></Image>
                                </View>
                              </TouchableOpacity>
                            </LinearGradient>
                          </View>

                          <TouchableOpacity
                            onPress={() => {
                              this.removeSlits(item, index);
                            }}
                            activeOpacity={0.7}
                            style={{
                              justifyContent: "center",
                              alignSelf: "flex-end",
                              height: (mobileW * 13) / 100,
                              width: (mobileW * 7) / 100,
                            }}
                          >
                            <Image
                              style={{
                                height: (mobileW * 6) / 100,
                                width: (mobileW * 6) / 100,
                                resizeMode: "contain",
                                alignSelf: "center",
                              }}
                              source={localimag.cancel}
                            ></Image>
                          </TouchableOpacity>
                          {/* } */}
                        </View>
                      </View>
                    );
                  }}
                />
              )}
            </>
          )}
        </KeyboardAwareScrollView>

        <TouchableOpacity
          onPress={() => this.doneButton()}
          activeOpacity={0.7}
          style={{
            alignItems: "center",
            alignSelf: "center",
            position: "absolute",
            bottom: (mobileH * 3) / 100,
          }}
        >
          <LinearGradient
            colors={[Colors.purple_color, Colors.light_greencolor]}
            start={{ x: 0, y: 1 }}
            end={{ x: 1, y: 0 }}
            style={{
              height: (mobileH * 6.7) / 100,
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
                fontSize: (mobileW * 4.3) / 100,
              }}
            >
              {Lang_chg.Done_txt[config.language]}
            </Text>
          </LinearGradient>
        </TouchableOpacity>
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
    width: (mobileW * 40) / 100,
    borderRadius: (mobileW * 1.5) / 100, // <-- Outer Border Radius
    alignItems: "center",
    justifyContent: "center",
  },
});
