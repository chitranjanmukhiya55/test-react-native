import React, { Component } from "react";
import {
  Text,
  SafeAreaView,
  StatusBar,
  View,
  StyleSheet,
  Keyboard,
  TouchableOpacity,
  Image,
  TextInput,
  FlatList,
  Modal,
} from "react-native";
import {
  config,
  Lang_chg,
  Font,
  Colors,
  mobileH,
  mobileW,
  localimag,
  msgText,
  msgProvider,
  consolepro,
  apifuntion,
  msgTitle,
  localStorage,
} from "./Provider/utilslib/Utils";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import LinearGradient from "react-native-linear-gradient";
import RBSheet from "react-native-raw-bottom-sheet";
import DatePicker from "react-native-date-picker";
import moment from "moment";
import { Nodata_foundimage } from "./Provider/Nodata_foundimage";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
global.date_1 = new Date();

export default class Birthday extends Component {
  constructor(props) {
    super(props);
    this.state = {
      image_change_gender: 4,
      event: "",
      area: "",
      budget: "",
      categoryDetails: this.props.route.params.categoryDetails,
      subcategory_arr: this.props.route.params.subcategory_arr,
      row_date: date_1,
      selected_date: "NA",
      time: "",
      selected_date_for_api: "",
      location: "",
      numberOfGuest: "",
      latitude: "",
      longitude: "",
      isVenueRequiredModalVisible: false,
      isSelectCuisinessModalVisible: false,
      customNumberOfGuest: "",
      vanue_arr: "NA",
      cuisine_arr: "NA",
      venueRequired: 0,
      vanueName: "",
      selectedVenue: "",
      selectedCuisines: "",
      selectedCuisinesShow: "",
      timeExpectedSend: "",
      timeExpected: "",
      numberOfGuestId: 4,
      cuisine_ids: [],
      seating_arrange_arr: [
        { id: 2, seat_arrange: "Seating", status: false },
        { id: 1, seat_arrange: "Standing", status: false },
        { id: 0, seat_arrange: "Not sure", status: false },
      ],
      seating_layout_arr: [
        { id: 0, seat_layout: "Boardroom", status: false },
        { id: 1, seat_layout: "Caberet", status: false },
        { id: 2, seat_layout: "Classroom", status: false },
        { id: 3, seat_layout: "Theatre", status: false },
        { id: 4, seat_layout: "U-shaped", status: false },
        { id: 5, seat_layout: "No preference", status: false },
      ],
      allseatarrangemodal: false,
      allseatlayoutmodal: false,
      seating_layout_name: "",
      seating_layout_id: "",

      seating_arrange_list_id: "",
      spacesetup: "",
      show_button: 0,
    };
  }
  componentDidMount() {
    this.props.navigation.addListener("focus", () => {
      consolepro.consolelog("12345", this.props.route.params.subcategory_arr);
      this.setState({
        categoryDetails: this.props.route.params.categoryDetails,
        subcategory_arr: this.props.route.params.subcategory_arr,
      });
      this.setState({
        location: global_user_address,
        latitude: global_user_address_lat,
        longitude: global_user_address_long,
      });
      this.getVanue();
      this.getAllCuisines();
      // this.getGender()
    });
  }

  async getVanue() {
    let createEventJSON = await localStorage.getItemObject("createEventJSON");
    if (createEventJSON != null) {
      this.setState({
        event: createEventJSON.event,
        selected_date: createEventJSON.selected_date,
        location: createEventJSON.location,
        numberOfGuest: createEventJSON.numberOfGuest,
        customNumberOfGuest: createEventJSON.customNumberOfGuest,
        venueRequired: createEventJSON.venueRequired,
        vanueName: createEventJSON.vanueName,
        selectedVenue: createEventJSON.selectedVenue,
        selectedCuisines: createEventJSON.selectedCuisines,
        area: createEventJSON.area,
        budget: createEventJSON.budget,
        selected_date_for_api: createEventJSON.selected_date_for_api,
        latitude: createEventJSON.latitude,
        longitude: createEventJSON.longitude,
        numberOfGuestId: createEventJSON.numberOfGuestId,
      });
    }
    consolepro.consolelog("createEventJSON>>", createEventJSON);
    var user_arr = await localStorage.getItemObject("user_arr");
    var user_id = user_arr.user_id;
    let url = config.baseURL + "user_select_vanue.php?user_id=" + user_id;
    consolepro.consolelog("url", url);
    apifuntion
      .getApi(url, 1)
      .then((obj) => {
        consolepro.consolelog("obj", obj);
        if (obj.success == "true") {
          if (obj.vanue_arr != "NA") {
            this.setState({ vanue_arr: obj.vanue_arr });
            consolepro.consolelog("vanue_arr", obj.vanue_arr);
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

  async getAllCuisines() {
    var user_arr = await localStorage.getItemObject("user_arr");
    var user_id = user_arr.user_id;
    let url = config.baseURL + "get_all_cuisine.php?user_id=" + user_id;
    consolepro.consolelog("url", url);
    apifuntion
      .getApi(url, 1)
      .then((obj) => {
        consolepro.consolelog("obj cuisines", obj);
        if (obj.success == "true") {
          if (obj.cuisine_arr != "NA") {
            this.setState({ cuisine_arr: obj.cuisine_arr });
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

  async getGender() {
    let gender = await localStorage.getItemObject("image_change_gender");
    consolepro.consolelog("gendergendergender", gender);
    if (gender != null) {
      this.setState({ image_change_gender: gender, numberOfGuestId: gender });
      if (gender == 1) {
        this.setState({ numberOfGuest: "0-20" });
      }
      if (gender == 2) {
        this.setState({ numberOfGuest: "20-50" });
      }
      if (gender == 3) {
        this.setState({ numberOfGuest: "50-100" });
      }
      if (gender == 4) {
        this.setState({ numberOfGuest: "Custom" });
      }
    }
  }

  //----------------------select date function-------------------//
  dateSelect = (time) => {
    let date = moment(time).format("DD-MM-YYYY");
    consolepro.consolelog("date", date);

    this.setState({ dateOfBirth: date });
    this.DatePicker.close();
  };
  //------------for close date picker--------------//
  _closeDatePicker = () => {
    this.DatePicker.close();
  };
  // --------------------------------------------
  //-------for set date to variable----------
  setDate = (d) => {
    consolepro.consolelog({ d });
    this.setState({ row_date: d });
  };
  //----------------------select date function-------------------//
  Select_date_check = async (date) => {
    var dayname = "";
    var d = new Date(this.state.row_date);
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
      // var time = this.formatAMPM(d);
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
      // var time = this.formatAMPM(d);
      // var fulldate = day + ' ' + date + ' ' + m + ', ' + time;
      // var fulldate1 = day + ' ' + m + ' ' + date + ', ' + time;
      var fulldate = day + " " + date + " " + m;
      var fulldate1 = day + " " + m + " " + date;
      var fulldate2 = y + "-" + m1 + "-" + date;
    }

    let minutes = d.getMinutes();
    let hours = d.getHours();
    consolepro.consolelog("minutes", minutes);
    consolepro.consolelog("hours", hours);
    var ampm = hours >= 12 ? "PM" : "AM";
    let sendtime = hours + ":" + minutes + ":00";
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? "0" + minutes : minutes;
    let time = hours + ":" + minutes + " " + ampm;
    consolepro.consolelog("sendtime", sendtime);
    consolepro.consolelog("time", time);
    this.setState({ timeExpected: time, timeExpectedSend: sendtime });
    consolepro.consolelog("timeExpectedSend", sendtime);
    consolepro.consolelog("timeExpected", time);

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
      selected_date: fulldate2,
      selected_date_for_api: fulldate3,
      time: time,
    });
    setTimeout(() => {
      consolepro.consolelog(
        "selected_date_for_api",
        this.state.selected_date_for_api
      );
      consolepro.consolelog("selected_date_for_api", this.state.selected_date);
    }, 500);
    this.DatePicker.close();
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

  submitButton() {
    Keyboard.dismiss();
    let {
      event,
      selected_date_for_api,
      location,
      numberOfGuest,
      customNumberOfGuest,
      venueRequired,
      vanueName,
      selectedVenue,
      selectedCuisines,
      area,
      budget,
      longitude,
      latitude,
      selected_date,
      numberOfGuestId,
      seating_layout_name,
      seating_layout_id,
      spacesetup,
      seating_arrange_list_id,
    } = this.state;
    consolepro.consolelog({
      event,
      selected_date_for_api,
      location,
      numberOfGuest,
      customNumberOfGuest,
      venueRequired,
      vanueName,
      selectedVenue,
      selectedCuisines,
      area,
      budget,
      longitude,
      latitude,
      selected_date,
      numberOfGuestId,
      seating_layout_name,
      seating_layout_id,
      spacesetup,
      seating_arrange_list_id,
    });
    if (event.length <= 0) {
      msgProvider.toast(msgText.emptyEventTitle[config.language], "center");
      return false;
    }
    if (selected_date_for_api == "") {
      msgProvider.toast(msgText.emptydatetime[config.language], "center");
      return false;
    }
    if (location.length <= 0) {
      msgProvider.toast(msgText.emptyLocation[config.language], "center");
      return false;
    }
    if (customNumberOfGuest.length <= 0) {
      msgProvider.toast(msgText.emptycustonguest[config.language], "center");
      return false;
    }
    var mobilevalidation = config.mobilevalidation;
    if (mobilevalidation.test(customNumberOfGuest.trim()) !== true) {
      msgProvider.toast(msgText.validNumberofguest[config.language], "center");
      return false;
    }
    if (venueRequired == 0) {
      msgProvider.toast(msgText.emptyVenueRequired[config.language], "center");
      return false;
    }
    if (venueRequired == 1) {
      if (selectedVenue.length <= 0) {
        msgProvider.toast(msgText.emptyVenuetype[config.language], "center");
        return false;
      }
    } else {
      if (vanueName.length <= 0) {
        msgProvider.toast(msgText.emptyVenueName[config.language], "center");
        return false;
      }
    }
    if (selectedCuisines.length <= 0) {
      msgProvider.toast(msgText.emptycuisines[config.language], "center");
      return false;
    }
    if (spacesetup == "") {
      msgProvider.toast(msgText.emptyspace[config.language], "center");
      return false;
    }
    if (seating_layout_name == "") {
      msgProvider.toast(msgText.emptylayout[config.language], "center");
      return false;
    }
    if (area.length <= 0) {
      msgProvider.toast(msgText.emptyarea[config.language], "center");
      return false;
    }
    var mobilevalidation2 = config.namevalidation;
    if (mobilevalidation2.test(area.trim()) !== true) {
      msgProvider.toast(msgText.emptyareavalid[config.language], "center");
      return false;
    }
    if (budget.length <= 0) {
      msgProvider.toast(msgText.emptyBudget[config.language], "center");
      return false;
    }
    var mobilevalidation1 = config.mobilevalidation;
    if (mobilevalidation1.test(budget.trim()) !== true) {
      msgProvider.toast(msgText.emptyBudgetvalid[config.language], "center");
      return false;
    }
    // return false
    (global_user_address = ""),
      (global_user_address_lat = 0),
      (global_user_address_long = 0);
    // localStorage.setItemObject('image_change_gender', null)
    localStorage.setItemObject("createEventJSON", {
      event: event,
      selected_date_for_api:
        selected_date_for_api + " " + this.state.timeExpectedSend,
      selected_date: selected_date + ", " + this.state.timeExpected,
      location: location,
      numberOfGuest: numberOfGuest.trim(),
      numberOfGuestId: numberOfGuestId,
      customNumberOfGuest: customNumberOfGuest,
      venueRequired: venueRequired,
      vanueName: vanueName,
      selectedVenue: selectedVenue,
      selectedCuisines: selectedCuisines,
      area: area,
      budget: budget.trim(),
      longitude: longitude,
      latitude: latitude,
      categoryDetails: this.state.categoryDetails,
      subcategory_arr: this.state.subcategory_arr,
      seating_layout_name: seating_layout_name,
      seating_layout_id: seating_layout_id,
      seating_arrange_list: spacesetup,
      seating_arrange_list_id: seating_arrange_list_id,
    });

    this.props.navigation.navigate("VendorsTab0");
  }

  venueClick(item) {
    let data = this.state.vanue_arr;
    consolepro.consolelog("datadatadatadata123", data);
    for (let i = 0; i < data.length; i++) {
      data[i].status = false;
      if (data[i].vanue_id == item.vanue_id) {
        data[i].status = true;
      }
    }
    consolepro.consolelog("datadatadatadata456", data);
    this.setState({ vanue_arr: data });
  }

  cuisinesClick(item) {
    let data = this.state.cuisine_arr;
    consolepro.consolelog("datadatadatadata123", data);
    for (let i = 0; i < data.length; i++) {
      if (data[i].cuisine_id == item.cuisine_id) {
        if (data[i].status == true) {
          data[i].status = false;
        } else {
          data[i].status = true;
        }
      }
    }
    consolepro.consolelog("datadatadatadata456", data);
    this.setState({ cuisine_arr: data });
  }

  doneButton() {
    let data1 = [];
    let cuisine_ids = [];
    let cuisinesName = "";
    let data = this.state.cuisine_arr;
    consolepro.consolelog("datadatadatadata123", data);
    for (let i = 0; i < data.length; i++) {
      if (data[i].status == true) {
        consolepro.consolelog("data[i]", data[i]);
        data1.push(data[i]);
        cuisinesName += data[i].cuisine_name + ", ";
        cuisine_ids.push(data[i].cuisine_id);
      }
    }

    consolepro.consolelog("cuisinesName", cuisinesName);
    consolepro.consolelog("cuisine_ids560", cuisine_ids);
    this.setState({
      selectedCuisines: data1,
      selectedCuisinesShow: cuisinesName,
      cuisine_ids: cuisine_ids,
    });
    this.setState({ isSelectCuisinessModalVisible: false });
  }

  selectSeatingarrange = (item, index, status) => {
    let category_arr = "";
    let count = 0;
    let all = 0;
    if (status == 1) {
      category_arr = this.state.seating_arrange_arr;
      for (let i = 0; i < category_arr.length; i++) {
        category_arr[i].status = false;
      }
      category_arr[index].status = true;
      this.setState({
        seating_arrange_arr: category_arr,
        spacesetup: item.seat_arrange,
        seating_arrange_list_id: item.id,
        show_button: count,
        allseatarrangemodal: false,
      });
    } else {
      category_arr = this.state.seating_layout_arr;
      for (var i = 0; i < category_arr.length; i++) {
        category_arr[i].status = false;
      }
      category_arr[index].status = true;
      this.setState({
        seating_layout_arr: category_arr,
        seating_layout_name: item.seat_layout,
        seating_layout_id: item.id,
        allseatlayoutmodal: false,
      });
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
        {/* seating arrangement */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.allseatarrangemodal}
          onRequestClose={() => {
            this.setState({ allseatarrangemodal: false });
          }}
        >
          <SafeAreaView style={styles.container}>
            <StatusBar
              hidden={false}
              translucent={false}
              backgroundColor={Colors.whiteColor}
              barStyle="dark-content"
              networkActivityIndicatorVisible={true}
            />

            <View
              style={{
                alignItems: "center",
                alignSelf: "center",
                marginTop: (mobileH * 5) / 100,
              }}
            >
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
                  onPress={() => this.setState({ allseatarrangemodal: false })}
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
                    {Lang_chg.seat_arrange[config.language]}
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
                marginTop: (mobileW * 0.5) / 100,
                width: mobileW,
                alignSelf: "center",
                paddingVertical: (mobileW * 1) / 100,
                backgroundColor: Colors.FB_Color,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {this.state.seating_arrange_arr != "NA" ? (
                <View style={{ paddingBottom: (mobileH * 18) / 100 }}>
                  <FlatList
                    data={this.state.seating_arrange_arr}
                    showsVerticalScrollIndicator={false}
                    keyExtractor={(index) => {
                      index.toString();
                    }}
                    contentContainerStyle={{
                      paddingBottom: (mobileH * 5) / 100,
                    }}
                    renderItem={({ item, index }) => {
                      return (
                        <TouchableOpacity
                          activeOpacity={0.7}
                          onPress={() => {
                            this.selectSeatingarrange(item, index, 1);
                          }}
                          style={{
                            width: mobileW * 0.9,
                            backgroundColor: Colors.whiteColor,
                            alignSelf: "center",
                            marginTop: mobileW * 0.02,
                            flexDirection: "row",
                            paddingVertical: mobileW * 0.02,
                            alignItems: "center",
                            borderBottomColor: Colors.black_color,
                            borderBottomWidth: 0.7,
                          }}
                        >
                          <View style={{ width: "8%" }}>
                            <Image
                              style={{
                                height: (mobileW * 6) / 100,
                                width: (mobileW * 6) / 100,
                                resizeMode: "contain",
                                borderRadius: (mobileW * 3) / 100,
                              }}
                              source={
                                item.status == false
                                  ? localimag.radio_unactive
                                  : localimag.radio_active
                              }
                            ></Image>
                          </View>
                          <View
                            style={{
                              width: "72%",
                              flexDirection: "row",
                              justifyContent: "space-between",
                            }}
                          >
                            <Text
                              style={{
                                fontSize: mobileW * 0.04,
                                fontFamily: Font.InterMedium,
                                color: Colors.black_color,
                              }}
                            >
                              {item.seat_arrange}
                            </Text>
                          </View>
                        </TouchableOpacity>
                      );
                    }}
                  />
                </View>
              ) : (
                <Nodata_foundimage />
              )}
            </View>
          </SafeAreaView>
        </Modal>

        {/* seating layout */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.allseatlayoutmodal}
          onRequestClose={() => {
            this.setState({ allseatlayoutmodal: false });
          }}
        >
          <SafeAreaView style={styles.container}>
            <StatusBar
              hidden={false}
              translucent={false}
              backgroundColor={Colors.whiteColor}
              barStyle="dark-content"
              networkActivityIndicatorVisible={true}
            />

            <View
              style={{
                alignItems: "center",
                alignSelf: "center",
                marginTop: (mobileH * 5) / 100,
              }}
            >
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
                  onPress={() => this.setState({ allseatlayoutmodal: false })}
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
                    {Lang_chg.seat_layout[config.language]}
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
                marginTop: (mobileW * 0.5) / 100,
                width: mobileW,
                alignSelf: "center",
                paddingVertical: (mobileW * 1) / 100,
                backgroundColor: Colors.FB_Color,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {this.state.seating_layout_arr != "NA" ? (
                <View style={{ paddingBottom: (mobileH * 18) / 100 }}>
                  <FlatList
                    data={this.state.seating_layout_arr}
                    showsVerticalScrollIndicator={false}
                    keyExtractor={(index) => {
                      index.toString();
                    }}
                    contentContainerStyle={{
                      paddingBottom: (mobileH * 5) / 100,
                    }}
                    renderItem={({ item, index }) => {
                      return (
                        <TouchableOpacity
                          activeOpacity={0.7}
                          onPress={() => {
                            this.selectSeatingarrange(item, index, 2);
                          }}
                          style={{
                            width: mobileW * 0.9,
                            backgroundColor: Colors.whiteColor,
                            alignSelf: "center",
                            marginTop: mobileW * 0.02,
                            flexDirection: "row",
                            paddingVertical: mobileW * 0.02,
                            alignItems: "center",
                            borderBottomColor: Colors.black_color,
                            borderBottomWidth: 0.7,
                          }}
                        >
                          <View style={{ width: "8%" }}>
                            <Image
                              style={{
                                height: (mobileW * 6) / 100,
                                width: (mobileW * 6) / 100,
                                resizeMode: "contain",
                                borderRadius: (mobileW * 3) / 100,
                              }}
                              source={
                                item.status == false
                                  ? localimag.radio_unactive
                                  : localimag.radio_active
                              }
                            ></Image>
                          </View>
                          <View
                            style={{
                              width: "72%",
                              flexDirection: "row",
                              justifyContent: "space-between",
                            }}
                          >
                            <Text
                              style={{
                                fontSize: mobileW * 0.04,
                                fontFamily: Font.InterMedium,
                                color: Colors.black_color,
                              }}
                            >
                              {item.seat_layout}
                            </Text>
                          </View>
                        </TouchableOpacity>
                      );
                    }}
                  />
                </View>
              ) : (
                <Nodata_foundimage />
              )}
            </View>
          </SafeAreaView>
        </Modal>

        <RBSheet
          ref={(ref) => {
            this.DatePicker = ref;
          }}
          height={300}
          openDuration={200}
          closeDuration={200}
          customStyles={{
            container: {},
          }}
        >
          <LinearGradient
            colors={[Colors.light_greencolor, Colors.voilet_color]}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
            style={{
              height: (mobileH * 7) / 100,
              width: mobileW,
            }}
          >
            <View
              style={{
                paddingLeft: 20,
                paddingRight: 20,
                flexDirection: "row",
                justifyContent: "space-between",
                width: (mobileW * 90) / 100,
                alignSelf: "center",
              }}
            >
              <TouchableOpacity
                activeOpacity={0.7}
                style={{
                  width: (mobileW * 15) / 100,
                  alignItems: "center",
                  alignContent: "center",
                  paddingVertical: (mobileH * 2) / 100,
                }}
                onPress={() => {
                  this._closeDatePicker();
                }}
              >
                <Text
                  style={{
                    color: Colors.whiteColor,
                    fontFamily: Font.FontSemiBold,
                    fontSize: (mobileW * 4) / 100,
                    textAlign: "center",
                  }}
                >
                  {Lang_chg.Close[config.language]}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.7}
                style={{
                  width: (mobileW * 15) / 100,
                  alignSelf: "center",
                  paddingVertical: (mobileH * 2) / 100,
                }}
                onPress={() => {
                  this.Select_date_check();
                }}
              >
                <Text
                  style={{
                    color: Colors.whiteColor,
                    fontFamily: Font.FontSemiBold,
                    fontSize: (mobileW * 4) / 100,
                    alignSelf: "center",
                  }}
                >
                  {Lang_chg.Done[config.language]}
                </Text>
              </TouchableOpacity>
            </View>
          </LinearGradient>
          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <DatePicker
              date={new Date(this.state.row_date)}
              onDateChange={(date) => this.setDate(date)}
              mode="datetime"
              minimumDate={date_1}
              theme={"auto"}
              color={Colors.back_color}
            />
          </View>
        </RBSheet>

        <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.isVenueRequiredModalVisible}
          onRequestClose={() => {
            this.setState({ isVenueRequiredModalVisible: false });
          }}
        >
          <SafeAreaView style={styles.container}>
            <StatusBar
              hidden={false}
              translucent={false}
              backgroundColor={Colors.whiteColor}
              barStyle="dark-content"
              networkActivityIndicatorVisible={true}
            />
            {/* ---------------for header--------------- */}
            <View
              style={{
                alignItems: "center",
                alignSelf: "center",
                backgroundColor: Colors.whiteColor,
                flex: 1,
              }}
            >
              <LinearGradient
                colors={[Colors.purple_color, Colors.bluegreen_color]}
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
                  onPress={() =>
                    this.setState({ isVenueRequiredModalVisible: false })
                  }
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
                    {Lang_chg.VenueType[config.language]}
                  </Text>
                </View>
                <View
                  style={{
                    width: (mobileW * 15) / 100,
                    alignItems: "center",
                  }}
                ></View>
              </LinearGradient>

              <View
                style={{
                  marginTop: (mobileW * 0.5) / 100,
                  width: mobileW,
                }}
              >
                {this.state.vanue_arr != "NA" ? (
                  <View style={{ paddingBottom: (mobileH * 18) / 100 }}>
                    <FlatList
                      data={this.state.vanue_arr}
                      showsVerticalScrollIndicator={false}
                      keyExtractor={(index) => {
                        index.toString();
                      }}
                      contentContainerStyle={{
                        paddingBottom: (mobileH * 5) / 100,
                      }}
                      renderItem={({ item, index }) => {
                        return (
                          <>
                            <TouchableOpacity
                              onPress={() => {
                                this.venueClick(item);
                                this.setState({
                                  selectedVenue: item,
                                  isVenueRequiredModalVisible: false,
                                });
                              }}
                              style={{
                                width: (mobileW * 90) / 100,
                                alignSelf: "center",
                                flexDirection: "row",
                                marginTop: (mobileH * 2) / 100,
                                // justifyContent: 'space-between',
                              }}
                            >
                              <Image
                                style={{
                                  height: (mobileW * 6) / 100,
                                  width: (mobileW * 6) / 100,
                                  resizeMode: "contain",
                                  borderRadius: (mobileW * 3) / 100,
                                }}
                                source={
                                  item.status == false
                                    ? localimag.radio_unactive
                                    : localimag.radio_active
                                }
                              ></Image>
                              <Text
                                style={{
                                  marginLeft: (mobileW * 2) / 100,
                                  color: Colors.black_color,
                                  fontFamily: Font.FontSemiBold,
                                  fontSize: (mobileW * 4) / 100,
                                }}
                              >
                                {item.vanue_name}
                              </Text>
                             
                            </TouchableOpacity>
                            <View
                              style={{
                                width: (mobileW * 92) / 100,
                                alignSelf: "center",
                                marginTop: (mobileH * 1.5) / 100,
                                borderWidth: (mobileW * 0.2) / 100,
                                borderColor: Colors.border_color,
                                backgroundColor: Colors.border_color,
                              }}
                            ></View>
                          </>
                        );
                      }}
                    />
                  </View>
                ) : (
                  <Nodata_foundimage />
                )}
              </View>
            </View>
          </SafeAreaView>
        </Modal>

        <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.isSelectCuisinessModalVisible}
          onRequestClose={() => {
            this.setState({ isSelectCuisinessModalVisible: false });
          }}
        >
          <SafeAreaView style={styles.container}>
            <StatusBar
              hidden={false}
              translucent={false}
              backgroundColor={Colors.whiteColor}
              barStyle="dark-content"
              networkActivityIndicatorVisible={true}
            />
            {/* ---------------for header--------------- */}
            <View
              style={{
                alignItems: "center",
                alignSelf: "center",
                backgroundColor: Colors.whiteColor,
                flex: 1,
              }}
            >
              <LinearGradient
                colors={[Colors.purple_color, Colors.bluegreen_color]}
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
                  onPress={() =>
                    this.setState({ isSelectCuisinessModalVisible: false })
                  }
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
                    {Lang_chg.Cuisines_txt[config.language]}
                  </Text>
                </View>
                <View
                  style={{
                    width: (mobileW * 15) / 100,
                    alignItems: "center",
                  }}
                ></View>
              </LinearGradient>
              <KeyboardAwareScrollView
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{
                  width: mobileW,
                  paddingBottom: (mobileH * 15) / 100,
                }}
                keyboardShouldPersistTaps="handled"
              >
                <View
                  style={{
                    marginTop: (mobileW * 0.5) / 100,
                    width: mobileW,
                    height: mobileH,
                  }}
                >
                  {this.state.cuisine_arr != "NA" ? (
                    <View style={{}}>
                      <FlatList
                        data={this.state.cuisine_arr}
                        showsVerticalScrollIndicator={false}
                        keyExtractor={(index) => {
                          index.toString();
                        }}
                        // contentContainerStyle={{ paddingBottom: mobileH * 5 / 100 }}
                        renderItem={({ item, index }) => {
                          return (
                            <>
                              <TouchableOpacity
                                activeOpacity={0.7}
                                onPress={() => {
                                  this.cuisinesClick(item);
                                }}
                              >
                                <View
                                  style={{
                                    width: (mobileW * 90) / 100,
                                    alignSelf: "center",
                                    flexDirection: "row",
                                    marginTop: (mobileH * 2) / 100,
                                    justifyContent: "space-between",
                                  }}
                                >
                                  <Text
                                    style={{
                                      color: Colors.black_color,
                                      fontFamily: Font.FontSemiBold,
                                      fontSize: (mobileW * 4) / 100,
                                    }}
                                  >
                                    {item.cuisine_name}
                                  </Text>
                                  <View
                                    // onPress={() => }
                                    style={{
                                      flexDirection: "row",
                                      alignItems: "center",
                                    }}
                                  >
                                    {item.status == true ? (
                                      <Image
                                        style={{
                                          width: (mobileW * 4.5) / 100,
                                          height: (mobileW * 4.5) / 100,
                                          marginTop: (mobileH * 0.6) / 100,
                                          resizeMode: "contain",
                                        }}
                                        source={localimag.check_1}
                                      ></Image>
                                    ) : (
                                      <Image
                                        style={{
                                          width: (mobileW * 4.5) / 100,
                                          height: (mobileW * 4.5) / 100,
                                          marginTop: (mobileH * 0.6) / 100,
                                          resizeMode: "contain",
                                        }}
                                        source={localimag.uncheck}
                                      ></Image>
                                    )}
                                  </View>
                                </View>
                                <View
                                  style={{
                                    width: (mobileW * 90) / 100,
                                    alignSelf: "center",
                                    marginTop: (mobileH * 0.5) / 100,
                                  }}
                                >
                                  <Text
                                    style={{
                                      color: Colors.black_color,
                                      fontFamily: Font.FontRegular,
                                      fontSize: (mobileW * 3.2) / 100,
                                    }}
                                  >
                                    {item.description}
                                  </Text>
                                </View>
                              </TouchableOpacity>
                              <View
                                style={{
                                  width: (mobileW * 92) / 100,
                                  alignSelf: "center",
                                  marginTop: (mobileH * 1.5) / 100,
                                  borderWidth: (mobileW * 0.3) / 100,
                                  borderColor: Colors.border_color,
                                  backgroundColor: Colors.border_color,
                                }}
                              ></View>
                            </>
                          );
                        }}
                      />
                    </View>
                  ) : (
                    <Nodata_foundimage />
                  )}
                </View>
              </KeyboardAwareScrollView>
              <TouchableOpacity
                onPress={() => this.doneButton()}
                activeOpacity={0.7}
                style={{
                  alignItems: "center",
                  alignSelf: "center",
                  bottom: (mobileH * 5) / 100,
                  position: "absolute",
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
                      fontSize: (mobileW * 4.5) / 100,
                    }}
                  >
                    Done
                  </Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </SafeAreaView>
        </Modal>

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
                localStorage.setItemObject("image_change_gender", null);
                localStorage.setItemObject("createEventJSON", null);
                (global_user_address = ""),
                  (global_user_address_lat = 0),
                  (global_user_address_long = 0);
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
                {this.state.subcategory_arr == "NA"
                  ? this.state.categoryDetails.category_name
                  : this.state.subcategory_arr.event_sub_category_name}
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
          {/* //=========event Name===========// */}
          <View
            style={{
              width: (mobileW * 90) / 100,
              alignItems: "center",
              alignSelf: "center",
            }}
          >
            <View
              style={{
                width: (mobileW * 90) / 100,
                alignItems: "flex-start",
                marginTop: (mobileH * 3) / 100,
              }}
            >
              <Text
                style={{
                  fontFamily: Font.FontBold,
                  color: Colors.black_color,
                  fontSize: (mobileW * 4) / 100,
                }}
              >
                {Lang_chg.Event_Title_txt[config.language]}
              </Text>
            </View>
            <LinearGradient
              colors={[Colors.voilet_color, Colors.bluegreen_color]}
              start={{ x: 0, y: 0 }}
              end={{ x: 0, y: 1 }}
              style={styles.linearGradient}
            >
              <View style={styles.innerContainer}>
                <TextInput
                  style={{
                    fontSize: (mobileW * 3.7) / 100,
                    fontFamily: Font.FontRegular,
                    marginLeft: (mobileW * 1.5) / 100,
                    color: Colors.black_color,
                    backgroundColor: "white",
                    paddingVertical: (mobileH * 1.8) / 100,
                    width: (mobileW * 80) / 100,
                    alignSelf: "center",
                    alignItems: "center",
                  }}
                  placeholderTextColor={Colors.greyColor}
                  placeholder="Enter Event Title"
                  keyboardType="default"
                  returnKeyLabel="done"
                  returnKeyType="done"
                  ref={(input) => {
                    this.mobilefield = input;
                  }}
                  onSubmitEditing={() => {
                    Keyboard.dismiss();
                  }}
                  onFocus={() => {
                    this.setState({ errorno: 0, activeinput: 1 });
                  }}
                  onChangeText={(txt) => {
                    this.setState({ event: txt });
                  }}
                  value={this.state.event}
                  maxLength={50}
                />
              </View>
            </LinearGradient>
          </View>

          {/* //=========Date & time Name===========// */}
          <View
            style={{
              width: (mobileW * 90) / 100,
              alignItems: "center",
              alignSelf: "center",
            }}
          >
            <View
              style={{
                width: (mobileW * 90) / 100,
                alignItems: "flex-start",
                marginTop: (mobileH * 3) / 100,
              }}
            >
              <Text
                style={{
                  fontFamily: Font.FontBold,
                  color: Colors.black_color,
                  fontSize: (mobileW * 4) / 100,
                }}
              >
                {Lang_chg.Date_txt[config.language]}
              </Text>
            </View>

            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => {
                this.DatePicker.open();
              }}
            >
              <LinearGradient
                colors={[Colors.light_greencolor, Colors.voilet_color]}
                start={{ x: 0, y: 0 }}
                end={{ x: 0, y: 1 }}
                style={styles.linearGradient}
              >
                <View
                  style={{
                    borderRadius: (mobileW * 1.5) / 100, // <-- Inner Border Radius
                    flex: 1,
                    margin: (mobileW * 0.4) / 100, // <-- Border Width
                    backgroundColor: Colors.whiteColor,
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <Text
                    style={[styles.buttonText, { color: Colors.greyColor }]}
                  >
                    {this.state.selected_date != "NA"
                      ? this.state.selected_date +
                        ", " +
                        this.state.timeExpected
                      : "Select Date & Time"}
                  </Text>
                  <Image
                    style={{
                      width: (mobileW * 5) / 100,
                      height: (mobileW * 5) / 100,
                      resizeMode: "contain",
                      marginRight: (mobileH * 2) / 100,
                    }}
                    source={localimag.calender}
                  ></Image>
                </View>
              </LinearGradient>
            </TouchableOpacity>
          </View>
          {/* //=========Location Name===========// */}
          <View
            style={{
              width: (mobileW * 90) / 100,
              alignItems: "center",
              alignSelf: "center",
            }}
          >
            <View
              style={{
                width: (mobileW * 90) / 100,
                alignItems: "flex-start",
                marginTop: (mobileH * 3) / 100,
              }}
            >
              <Text
                style={{
                  fontFamily: Font.FontBold,
                  color: Colors.black_color,
                  fontSize: (mobileW * 4) / 100,
                }}
              >
                {Lang_chg.location_txt[config.language]}
              </Text>
            </View>

            <TouchableOpacity
              style={{}}
              activeOpacity={1}
              onPress={() => {
                this.props.navigation.navigate("LocationMap");
              }}
            >
              <LinearGradient
                colors={[Colors.voilet_color, Colors.bluegreen_color]}
                start={{ x: 0, y: 0 }}
                end={{ x: 0, y: 1 }}
                style={{
                  marginTop: (mobileH * 1) / 100,
                  // height: mobileH * 7 / 100,
                  width: (mobileW * 90) / 100,
                  borderRadius: (mobileW * 1.5) / 100,
                  paddingVertical: (mobileH * 0.1) / 100,
                }}
              >
                <View
                  style={{
                    borderRadius: (mobileW * 1.5) / 100, // <-- Inner Border Radius
                    flex: 1,
                    margin: (mobileW * 0.4) / 100, // <-- Border Width
                    backgroundColor: Colors.whiteColor,
                    flexDirection: "row",
                    alignItems: "flex-start",
                    paddingVertical: (mobileH * 1.5) / 100,
                  }}
                >
                  <View style={styles.innerContainer1}>
                    <Text
                      numberOfLines={4}
                      style={{
                        fontFamily: Font.FontRegular,
                        color:
                          this.state.location != ""
                            ? Colors.black_color
                            : Colors.greyColor,
                        fontSize: (mobileW * 3.7) / 100,
                        width: (mobileW * 70) / 100,
                      }}
                    >
                      {this.state.location != ""
                        ? this.state.location
                        : Lang_chg.Select_Location_txt[config.language]}
                    </Text>
                  </View>
                </View>
              </LinearGradient>
            </TouchableOpacity>
          </View>
          {/* //=========no of guests Name===========// */}
          <View
            style={{
              width: (mobileW * 90) / 100,
              alignItems: "center",
              alignSelf: "center",
            }}
          >
            <View
              style={{
                width: (mobileW * 90) / 100,
                alignItems: "flex-start",
                marginTop: (mobileH * 3) / 100,
              }}
            >
              <Text
                style={{
                  fontFamily: Font.FontBold,
                  color: Colors.black_color,
                  fontSize: (mobileW * 4) / 100,
                }}
              >
                {Lang_chg.of_Guest_txt[config.language]}
              </Text>
            </View>
           
            {this.state.image_change_gender == 4 && (
              <LinearGradient
                colors={[Colors.voilet_color, Colors.bluegreen_color]}
                start={{ x: 0, y: 0 }}
                end={{ x: 0, y: 1 }}
                style={styles.linearGradient}
              >
                <View style={styles.innerContainer}>
                  <TextInput
                    style={styles.buttonText}
                    placeholderTextColor={Colors.greyColor}
                    placeholder="Enter No. of Guest"
                    keyboardType="number-pad"
                    returnKeyLabel="done"
                    returnKeyType="done"
                    ref={(input) => {
                      this.mobilefield = input;
                    }}
                    onSubmitEditing={() => {
                      Keyboard.dismiss();
                    }}
                    onFocus={() => {
                      this.setState({ errorno: 0, activeinput: 1 });
                    }}
                    onChangeText={(txt) => {
                      this.setState({ customNumberOfGuest: txt });
                    }}
                    value={this.state.customNumberOfGuest}
                    maxLength={50}
                  />
                </View>
              </LinearGradient>
            )}
          </View>
          {/* //=========venue  Name===========// */}
          <View
            style={{
              width: (mobileW * 90) / 100,
              alignSelf: "center",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              justifyContent: "space-between",
              paddingVertical: (mobileH * 2) / 100,
            }}
          >
            <View style={{ width: (mobileW * 55) / 100 }}>
              <Text
                style={{
                  fontFamily: Font.FontBold,
                  color: Colors.black_color,
                  fontSize: (mobileW * 4) / 100,
                }}
              >
                {Lang_chg.Venue1_txt[config.language]}
              </Text>
            </View>
            {/* //===============for icons==================// */}
            <View
              style={{
                width: (mobileW * 45) / 100,
                flexDirection: "row",
                marginTop: (mobileH * 1) / 100,
              }}
            >
              <View
                style={{
                  width: (mobileW * 15) / 100,
                  flexDirection: "row",
                }}
              >
                <TouchableOpacity
                  style={{
                    width: (mobileW * 15) / 100,
                    flexDirection: "row",
                  }}
                  onPress={() =>
                    this.setState({
                      venueRequired: 1,
                      vanueName: "",
                      selectedVenue: "",
                    })
                  }
                >
                  {this.state.venueRequired == 1 ? (
                    <Image
                      style={{
                        width: (mobileW * 4.3) / 100,
                        height: (mobileW * 4.3) / 100,
                        resizeMode: "contain",
                        marginTop: (mobileH * 0.3) / 100,
                      }}
                      source={localimag.radio_active}
                    ></Image>
                  ) : (
                    <Image
                      style={{
                        width: (mobileW * 4.3) / 100,
                        height: (mobileW * 4.3) / 100,
                        resizeMode: "contain",
                        marginTop: (mobileH * 0.3) / 100,
                      }}
                      source={localimag.radio_unactive}
                    ></Image>
                  )}
                  <Text
                    style={{
                      fontFamily: Font.FontBold,
                      color: Colors.black_color,
                      fontSize: (mobileW * 4) / 100,
                      paddingHorizontal: (mobileW * 2) / 100,
                    }}
                  >
                    {Lang_chg.yes_txt[config.language]}
                  </Text>
                </TouchableOpacity>
              </View>
              {/* //===================for second icons=============== */}
              <View
                style={{
                  width: (mobileW * 15) / 100,
                  flexDirection: "row",
                }}
              >
                <TouchableOpacity
                  onPress={() =>
                    this.setState({
                      venueRequired: 2,
                      vanueName: "",
                      selectedVenue: "",
                    })
                  }
                  style={{
                    width: (mobileW * 15) / 100,
                    flexDirection: "row",
                  }}
                >
                  {this.state.venueRequired == 2 ? (
                    <Image
                      style={{
                        width: (mobileW * 4.3) / 100,
                        height: (mobileW * 4.3) / 100,
                        resizeMode: "contain",
                        marginTop: (mobileH * 0.3) / 100,
                      }}
                      source={localimag.radio_active}
                    ></Image>
                  ) : (
                    <Image
                      style={{
                        width: (mobileW * 4.3) / 100,
                        height: (mobileW * 4.3) / 100,
                        resizeMode: "contain",
                        marginTop: (mobileH * 0.3) / 100,
                      }}
                      source={localimag.radio_unactive}
                    ></Image>
                  )}
                  <Text
                    style={{
                      fontFamily: Font.FontBold,
                      color: Colors.black_color,
                      fontSize: (mobileW * 4) / 100,
                      paddingHorizontal: (mobileW * 2) / 100,
                    }}
                  >
                    {Lang_chg.no_txt[config.language]}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          {this.state.venueRequired == 2 && (
            // <View
            //   style={{
            //     width: (mobileW * 90) / 100,
            //     alignItems: 'center',
            //     alignSelf: 'center',
            //   }}>
            //   <LinearGradient
            //     colors={[Colors.voilet_color, Colors.bluegreen_color]}
            //     start={{x: 0, y: 0}}
            //     end={{x: 0, y: 1}}
            //     style={styles.linearGradient}>
            //     <View style={styles.innerContainer}>
            //       <TextInput
            //         style={styles.buttonText}
            //         placeholderTextColor={Colors.greyColor}
            //         placeholder="Enter Venue Name"
            //         keyboardType="default"
            //         returnKeyLabel="done"
            //         returnKeyType="done"
            //         ref={input => {
            //           this.mobilefield = input;
            //         }}
            //         onSubmitEditing={() => {
            //           Keyboard.dismiss();
            //         }}
            //         onFocus={() => {
            //           this.setState({errorno: 0, activeinput: 1});
            //         }}
            //         onChangeText={txt => {
            //           this.setState({vanueName: txt});
            //         }}
            //         value={this.state.vanueName}
            //         maxLength={50}
            //       />
            //     </View>
            //   </LinearGradient>
            // </View>
            <View
              style={{
                width: (mobileW * 90) / 100,
                alignItems: "center",
                alignSelf: "center",
              }}
            >
              <LinearGradient
                colors={[Colors.voilet_color, Colors.bluegreen_color]}
                start={{ x: 0, y: 0 }}
                end={{ x: 0, y: 1 }}
                style={{
                  marginTop: (mobileH * 2) / 100,
                  // height: (mobileH * 7) / 100,
                  width: (mobileW * 90) / 100,
                  borderRadius: (mobileW * 1.5) / 100,
                }}
              >
                <View
                  style={{
                    borderRadius: (mobileW * 1.5) / 100, // <-- Inner Border Radius
                    margin: (mobileW * 0.4) / 100, // <-- Border Width
                    backgroundColor: Colors.whiteColor,
                    flexDirection: "row",
                    alignItems: "flex-start",
                  }}
                >
                  <GooglePlacesAutocomplete
                    placeholder="Enter Venue Location"
                    textInputProps={{
                      placeholderTextColor: Colors.placeholder_color,
                      color: Colors.black_color,
                    }}
                    minLength={1} // minimum length of text to search
                    autoFocus={false}
                    returnKeyType={"search"} // Can be left out for default return key https://facebook.github.io/react-native/docs/textinput.html#returnkeytype
                    listViewDisplayed={this.state.addressbar2} // true/false/undefined
                    fetchDetails={true}
                    ref={(instance) => {
                      (this.GooglePlacesRef = instance),
                        consolepro.consolelog("I am here..");
                    }}
                    renderDescription={(row) => row.description} // custom description render
                    onPress={(data, details = null) => {
                      //alert('hi pulkit')
                      this.setState({ continue_btn: true });
                      console.log("datalocation", details);
                      let city = "unknown";
                      for (
                        let i = 0;
                        i < details.address_components.length;
                        i++
                      ) {
                        if (
                          details.address_components[i].types[0] == "locality"
                        ) {
                          city = details.address_components[i].long_name;
                        }
                      }
                      let data2 = {
                        latitude: details.geometry.location.lat,
                        longitude: details.geometry.location.lng,
                        address: details.formatted_address,
                        city: city,
                      };
                      this.setState({ search: city });
                      var address_map = data2;
                      var filter_address = data2;
                      consolepro.consolelog("hellooooo", address_map);
                      this.setState({
                        addressbar: true,
                        latitude: details.geometry.location.lat,
                        longitude: details.geometry.location.lng,
                        address_get: details.formatted_address,
                        vanueName: details.formatted_address,
                      });
                      let searchtxt = "";
                      searchtxt = city;

                      // return this.props.locationget(data2);
                    }}
                    // getDefaultValue={() => {
                    //   return  selleraddress!='NA'?selleraddress.address:'' // text input default value
                    // }}
                    query={{
                      // available options: https://developers.google.com/places/web-service/autocomplete
                      key: config.mapkey,
                      language: config.maplanguage, // language of the results
                      //  types: '(cities)',  default: 'geocode'
                    }}
                    styles={{
                      textInputContainer: {
                        backgroundColor: Colors.white_color,
                        alignSelf: "center",
                        height: (mobileH * 7) / 100,
                        width: (mobileW * 87) / 100,
                        alignItems: "center",
                        justifyContent: "center",
                        color: Colors.black_color,
                      },
                      textInput: {
                        // marginLeft: 7,
                        // marginRight: 10,
                        textAlign: "left",
                        height: (mobileH * 6) / 100,
                        width: mobileW,
                        //borderRadius: 10,
                        backgroundColor: Colors.white_color,
                        color: "#5d5d5d",
                        fontSize: (mobileW * 4) / 100,
                      },
                      predefinedPlacesDescription: {
                        color: "#1faadb",
                      },
                      description: {
                        fontFamily: Font.FontRegular,
                        color: Colors.black_color,
                      },
                      container: {
                        borderRadius: 10,
                      },
                      poweredContainer: {
                        backgroundColor: Colors.app_bl_ack,
                        borderRadius: 25,
                        color: "#FFFFFF",
                      },
                      listView: {
                        backgroundColor: "#FFFFFF",
                        color: Colors.black_color,
                        // marginTop: 30,
                        // borderWidth: 1,
                        //  boderColor: 'black'
                      },
                    }}
                    currentLocation={false} // Will add a 'Current location' button at the top of the predefined places list
                    currentLocationLabel="Current location"
                    nearbyPlacesAPI="GooglePlacesSearch" // Which API to use: GoogleReverseGeocoding or GooglePlacesSearch
                    GoogleReverseGeocodingQuery={
                      {
                        // available options for GoogleReverseGeocoding API : https://developers.google.com/maps/documentation/geocoding/intro
                      }
                    }
                    GooglePlacesSearchQuery={{
                      // available options for GooglePlacesSearch API : https://developers.google.com/places/web-service/search
                      rankby: "distance",
                      types: "food",
                    }}
                    filterReverseGeocodingByTypes={[
                      "locality",
                      "administrative_area_level_3",
                      "postal_code",
                      "sublocality",
                      "country",
                    ]} // filter the reverse geocoding results by types - ['locality', 'administrative_area_level_3'] if you want to display only cities
                    //   predefinedPlaces={[homePlace, workPlace]}
                    debounce={100}
                    renderLeftButton={() => (
                      <Image
                        resizeMode="contain"
                        source={localimag.grey_search}
                        style={{
                          width: (mobileW * 6) / 100,
                          height: (mobileW * 6) / 100,
                          alignSelf: "center",
                          paddingRight: 8,
                          marginLeft: (mobileW * 2) / 100,
                          bottom: 1.5,
                        }}
                      />
                    )}
                    renderRightButton={() => (
                      <TouchableOpacity
                        activeOpacity={0.7}
                        style={{ alignSelf: "center", paddingRight: 10 }}
                        onPress={() => {
                          this.GooglePlacesRef.setAddressText("");
                          this.setState({ search: "", vanueName: "" });
                          this.setState({
                            addressselected: "search",
                            address: "",
                            address_get: "",
                          });
                        }}
                      >
                        <Image
                          style={{
                            alignSelf: "center",
                            width: (mobileW * 6) / 100,
                            height: (mobileW * 6) / 100,
                          }}
                          source={localimag.cancel}
                        ></Image>
                      </TouchableOpacity>
                    )}
                  />
                </View>
              </LinearGradient>
            </View>
          )}

          {/* //=========venue selection Name===========// */}

          {this.state.venueRequired == 1 && (
            <View
              style={{
                width: (mobileW * 90) / 100,
                alignItems: "center",
                alignSelf: "center",
              }}
            >
              <View
                style={{
                  width: (mobileW * 90) / 100,
                  alignItems: "flex-start",
                  marginTop: (mobileH * 1) / 100,
                }}
              >
                <Text
                  style={{
                    fontFamily: Font.FontBold,
                    color: Colors.black_color,
                    fontSize: (mobileW * 4) / 100,
                  }}
                >
                  {Lang_chg.VenueType[config.language]}
                </Text>
              </View>
              <LinearGradient
                colors={[Colors.voilet_color, Colors.bluegreen_color]}
                start={{ x: 0, y: 0 }}
                end={{ x: 0, y: 1 }}
                style={styles.linearGradient}
              >
                <View style={styles.innerContainer}>
                  <TouchableOpacity
                    onPress={() =>
                      this.setState({ isVenueRequiredModalVisible: true })
                    }
                    style={styles.innerContainer1}
                  >
                    <Text
                      style={{
                        fontFamily: Font.FontRegular,
                        color: Colors.greyColor,
                        fontSize: (mobileW * 3.7) / 100,
                      }}
                    >
                      {this.state.selectedVenue != ""
                        ? this.state.selectedVenue.vanue_name
                        : Lang_chg.SelectVenueType[config.language]}
                    </Text>
                    <Image
                      style={{
                        width: (mobileW * 4) / 100,
                        height: (mobileW * 4) / 100,
                        resizeMode: "contain",
                        marginTop: (mobileH * 0.5) / 100,
                        tintColor: Colors.greyColor,
                      }}
                      source={localimag.backr}
                    ></Image>
                  </TouchableOpacity>
                </View>
              </LinearGradient>
            </View>
          )}

          {/* //=========cuisines Name===========// */}
          <View
            style={{
              width: (mobileW * 90) / 100,
              alignItems: "center",
              alignSelf: "center",
            }}
          >
            <View
              style={{
                width: (mobileW * 90) / 100,
                alignItems: "flex-start",
                marginTop: (mobileH * 1) / 100,
              }}
            >
              <Text
                style={{
                  fontFamily: Font.FontBold,
                  color: Colors.black_color,
                  fontSize: (mobileW * 4) / 100,
                }}
              >
                {Lang_chg.Cuisines_txt[config.language]}
              </Text>
            </View>
            <LinearGradient
              colors={[Colors.voilet_color, Colors.bluegreen_color]}
              start={{ x: 0, y: 0 }}
              end={{ x: 0, y: 1 }}
              style={styles.linearGradient}
            >
              <View style={styles.innerContainer}>
                <TouchableOpacity
                  onPress={() => {
                    consolepro.consolelog(
                      "cuisine_ids2222",
                      this.state.cuisine_ids
                    );
                    let cuisine_arr = this.state.cuisine_arr;
                    let cuisine_ids = this.state.cuisine_ids;
                    if (cuisine_ids.length != 0) {
                      for (let i = 0; i < cuisine_arr.length; i++) {
                        cuisine_arr[i].status = false;
                        for (let j = 0; j < cuisine_ids.length; j++) {
                          if (cuisine_arr[i].cuisine_id == cuisine_ids[j]) {
                            consolepro.consolelog(
                              "cuisine_id111",
                              cuisine_arr[i].cuisine_id
                            );
                            cuisine_arr[i].status = true;
                          }
                        }
                      }
                    } else {
                      for (let i = 0; i < cuisine_arr.length; i++) {
                        cuisine_arr[i].status = false;
                      }
                    }
                    this.setState({
                      isSelectCuisinessModalVisible: true,
                      cuisine_arr: cuisine_arr,
                    });
                  }}
                  style={styles.innerContainer1}
                >
                  <Text
                    numberOfLines={1}
                    style={{
                      fontFamily: Font.FontRegular,
                      color: Colors.greyColor,
                      fontSize: (mobileW * 3.7) / 100,
                    }}
                  >
                    {this.state.selectedCuisinesShow != ""
                      ? this.state.selectedCuisinesShow
                      : Lang_chg.Select_Cuisines_txt[config.language]}
                  </Text>
                  <Image
                    style={{
                      width: (mobileW * 4) / 100,
                      height: (mobileW * 4) / 100,
                      resizeMode: "contain",
                      marginTop: (mobileH * 0.5) / 100,
                      tintColor: Colors.greyColor,
                    }}
                    source={localimag.backr}
                  ></Image>
                </TouchableOpacity>
              </View>
            </LinearGradient>
          </View>

          {/* //=========seating arrangement Name===========// */}
          <View
            style={{
              width: (mobileW * 90) / 100,
              alignItems: "center",
              alignSelf: "center",
            }}
          >
            <View
              style={{
                width: (mobileW * 90) / 100,
                alignItems: "flex-start",
                marginTop: (mobileH * 2.5) / 100,
              }}
            >
              <Text
                style={{
                  fontFamily: Font.FontBold,
                  color: Colors.black_color,
                  fontSize: (mobileW * 4) / 100,
                }}
              >
                {Lang_chg.seat_arrange[config.language]}
              </Text>
            </View>
            <LinearGradient
              colors={[Colors.voilet_color, Colors.bluegreen_color]}
              start={{ x: 0, y: 0 }}
              end={{ x: 0, y: 1 }}
              style={styles.linearGradient}
            >
              <View style={styles.innerContainer}>
                <TouchableOpacity
                  onPress={() => this.setState({ allseatarrangemodal: true })}
                  style={styles.innerContainer1}
                >
                  <Text
                    numberOfLines={1}
                    style={{
                      fontFamily: Font.FontRegular,
                      color: Colors.greyColor,
                      fontSize: (mobileW * 3.7) / 100,
                    }}
                  >
                    {this.state.spacesetup != ""
                      ? this.state.spacesetup
                      : "Select Space Setup"}
                  </Text>
                  <Image
                    style={{
                      width: (mobileW * 4) / 100,
                      height: (mobileW * 4) / 100,
                      resizeMode: "contain",
                      marginTop: (mobileH * 0.5) / 100,
                      tintColor: Colors.greyColor,
                    }}
                    source={localimag.backr}
                  ></Image>
                </TouchableOpacity>
              </View>
            </LinearGradient>
          </View>


          {/* //=========seating layout Name===========// */}
          <View
            style={{
              width: (mobileW * 90) / 100,
              alignItems: "center",
              alignSelf: "center",
            }}
          >
            <View
              style={{
                width: (mobileW * 90) / 100,
                alignItems: "flex-start",
                marginTop: (mobileH * 2.5) / 100,
              }}
            >
              <Text
                style={{
                  fontFamily: Font.FontBold,
                  color: Colors.black_color,
                  fontSize: (mobileW * 4) / 100,
                }}
              >
                {Lang_chg.seat_layout[config.language]}
              </Text>
            </View>
            <LinearGradient
              colors={[Colors.voilet_color, Colors.bluegreen_color]}
              start={{ x: 0, y: 0 }}
              end={{ x: 0, y: 1 }}
              style={styles.linearGradient}
            >
              <View style={styles.innerContainer}>
                <TouchableOpacity
                  onPress={() => this.setState({ allseatlayoutmodal: true })}
                  style={styles.innerContainer1}
                >
                  <Text
                    numberOfLines={1}
                    style={{
                      fontFamily: Font.FontRegular,
                      color: Colors.greyColor,
                      fontSize: (mobileW * 3.7) / 100,
                    }}
                  >
                    {this.state.seating_layout_name != ""
                      ? this.state.seating_layout_name
                      : "Select Seating Layout"}
                  </Text>
                  <Image
                    style={{
                      width: (mobileW * 4) / 100,
                      height: (mobileW * 4) / 100,
                      resizeMode: "contain",
                      marginTop: (mobileH * 0.5) / 100,
                      tintColor: Colors.greyColor,
                    }}
                    source={localimag.backr}
                  ></Image>
                </TouchableOpacity>
              </View>
            </LinearGradient>
          </View>
          {/* //=========seating layout Name===========// */}

          {/* //=========Area Name===========// */}
          <View
            style={{
              width: (mobileW * 90) / 100,
              alignItems: "center",
              alignSelf: "center",
            }}
          >
            <View
              style={{
                width: (mobileW * 90) / 100,
                alignItems: "flex-start",
                marginTop: (mobileH * 3) / 100,
              }}
            >
              <Text
                style={{
                  fontFamily: Font.FontBold,
                  color: Colors.black_color,
                  fontSize: (mobileW * 4) / 100,
                }}
              >
                {Lang_chg.Postcodce_txt[config.language]}
              </Text>
            </View>
            <LinearGradient
              colors={[Colors.voilet_color, Colors.bluegreen_color]}
              start={{ x: 0, y: 0 }}
              end={{ x: 0, y: 1 }}
              style={styles.linearGradient}
            >
              <View style={styles.innerContainer}>
                <TextInput
                  style={styles.buttonText}
                  placeholderTextColor={Colors.greyColor}
                  placeholder="Enter Area"
                  keyboardType="default"
                  returnKeyLabel="done"
                  returnKeyType="done"
                  ref={(input) => {
                    this.mobilefield = input;
                  }}
                  onSubmitEditing={() => {
                    Keyboard.dismiss();
                  }}
                  onFocus={() => {
                    this.setState({ errorno: 0, activeinput: 1 });
                  }}
                  onChangeText={(txt) => {
                    this.setState({ area: txt });
                  }}
                  value={this.state.area}
                  maxLength={25}
                />
              </View>
            </LinearGradient>
          </View>

          {/* //=========Budget Name===========// */}
          <View
            style={{
              width: (mobileW * 90) / 100,
              alignItems: "center",
              alignSelf: "center",
            }}
          >
            <View
              style={{
                width: (mobileW * 90) / 100,
                alignItems: "flex-start",
                marginTop: (mobileH * 3) / 100,
              }}
            >
              <Text
                style={{
                  fontFamily: Font.FontBold,
                  color: Colors.black_color,
                  fontSize: (mobileW * 4) / 100,
                }}
              >
                {Lang_chg.Budget_txt[config.language]}
              </Text>
            </View>
            <LinearGradient
              colors={[Colors.voilet_color, Colors.bluegreen_color]}
              start={{ x: 0, y: 0 }}
              end={{ x: 0, y: 1 }}
              style={styles.linearGradient}
            >
              <View style={styles.innerContainer}>
                <TextInput
                  style={styles.buttonText}
                  placeholderTextColor={Colors.greyColor}
                  placeholder="Enter Budget ($)"
                  keyboardType="number-pad"
                  returnKeyLabel="done"
                  returnKeyType="done"
                  ref={(input) => {
                    this.mobilefield = input;
                  }}
                  onSubmitEditing={() => {
                    Keyboard.dismiss();
                  }}
                  onFocus={() => {
                    this.setState({ errorno: 0, activeinput: 1 });
                  }}
                  onChangeText={(txt) => {
                    this.setState({ budget: txt });
                  }}
                  value={this.state.budget}
                  maxLength={25}
                />
              </View>
            </LinearGradient>
          </View>

          {/* ----------------for button--------- */}
          <TouchableOpacity
            onPress={() => this.submitButton()}
            activeOpacity={0.7}
            style={{
              alignItems: "center",
              alignSelf: "center",
              marginBottom: (mobileH * 7) / 100,
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
                marginTop: (mobileH * 3) / 100,
              }}
            >
              <Text
                style={{
                  color: "#f5f4f5",
                  fontFamily: Font.FontBold,
                  fontSize: (mobileW * 4.3) / 100,
                }}
              >
                {Lang_chg.Submit_txt[config.language]}
              </Text>
            </LinearGradient>
          </TouchableOpacity>
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
  linearGradient: {
    marginTop: (mobileH * 2) / 100,
    height: (mobileH * 7) / 100,
    width: (mobileW * 90) / 100,
    borderRadius: (mobileW * 1.5) / 100, // <-- Outer Border Radius
  },
  innerContainer: {
    borderRadius: (mobileW * 1.5) / 100, // <-- Inner Border Radius
    flex: 1,
    margin: (mobileW * 0.4) / 100, // <-- Border Width
    backgroundColor: Colors.whiteColor,
    flexDirection: "row",
    alignItems: "flex-start",
  },
  innerContainer1: {
    backgroundColor: Colors.whiteColor,
    flexDirection: "row",
    justifyContent: "space-between",
    width: (mobileW * 85) / 100,
    alignSelf: "center",
    marginLeft: (mobileW * 2) / 100,
    paddingVertical: (mobileH * 1) / 100,
  },
  buttonText: {
    fontSize: (mobileW * 3.7) / 100,
    fontFamily: Font.FontRegular,
    marginLeft: (mobileW * 1.5) / 100,
    color: Colors.black_color,
    backgroundColor: Colors.whiteColor,
    paddingVertical: (mobileH * 1.8) / 100,
    width: (mobileW * 62) / 100,
    alignSelf: "center",
    alignItems: "center",
  },
  buttonText1: {
    fontSize: (mobileW * 3.7) / 100,
    fontFamily: Font.FontRegular,
    marginLeft: (mobileW * 1.5) / 100,
    color: Colors.black_color,
    backgroundColor: Colors.whiteColor,
    paddingVertical: (mobileH * 1.8) / 100,
    width: (mobileW * 80) / 100,
    alignSelf: "flex-start",
    textAlignVertical: "top",
    alignItems: "flex-start",
  },
});
