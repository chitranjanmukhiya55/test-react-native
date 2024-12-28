import React, { Component } from "react";
import {
  Text,
  SafeAreaView,
  StatusBar,
  Alert,
  View,
  StyleSheet,
  Keyboard,
  TouchableOpacity,
  Image,
  TextInput,
} from "react-native";
import {
  config,
  msgProvider,
  localStorage,
  apifuntion,
  msgText,
  msgTitle,
  consolepro,
  Lang_chg,
  Font,
  Colors,
  mobileH,
  mobileW,
  localimag,
  notification,
  firebaseprovider,
} from "./Provider/utilslib/Utils";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import LinearGradient from "react-native-linear-gradient";
import RBSheet from "react-native-raw-bottom-sheet";
import DatePicker from "react-native-date-picker";
global.date_1 = new Date();

export default class CustomizeTemplate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      title: "",
      date: "",
      location: "",
      Discription: "",
      row_date: date_1,
      selected_date: "NA",
      time: "",
      selected_date_for_api: "",
      longitude: "",
      latitude: "",
      template_image: this.props.route.params.template_image,
      template_id: this.props.route.params.template_id,
    };
  }
  componentDidMount() {
    const { navigation } = this.props;
    this.focusListener = navigation.addListener("focus", () => {
      consolepro.consolelog("itemitemitem", this.state.item);
      if (global_user_address != "") {
        this.setState({
          location: global_user_address,
          latitude: global.global_user_address_lat,
          longitude: global.global_user_address_long,
        });
      }
    });
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
  nextButton = async () => {
    consolepro.consolelog("-=--=-===========================");
    Keyboard.dismiss();
    let {
      title,
      name,
      selected_date_for_api,
      selected_date,
      location,
      Discription,
    } = this.state;
    consolepro.consolelog({
      title,
      name,
      selected_date_for_api,
      selected_date,
      location,
      Discription,
    });
    //  alert(fullname+email+mobile+password+confirmpassword)
    //------------------fullname===================
    if (title.length <= 0) {
      msgProvider.toast(msgText.emptyTitle[config.language], "center");
      return false;
    }
    if (name.length <= 0) {
      msgProvider.toast(msgText.emptyName[config.language], "center");
      return false;
    }
    if (selected_date == "NA") {
      msgProvider.toast(msgText.emptydatetime[config.language], "center");
      return false;
    }
    if (location.length <= 0) {
      msgProvider.toast(msgText.emptyLocation[config.language], "center");
      return false;
    }
    if (Discription.length <= 0) {
      msgProvider.toast(msgText.emptyDescription[config.language], "center");
      return false;
    }

    this.props.navigation.navigate("Preview", {
      item: this.state.template_image,
      template_id: this.state.template_id,
      Discription: Discription,
      location: location,
      selected_date_for_api: selected_date_for_api,
      title: title,
      name: name,
      longitude: this.state.longitude,
      latitude: this.state.latitude,
      selected_date: selected_date,
    });
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
              mode="date"
              // minimumDate={date_1}
              theme={"auto"}
              color={Colors.back_color}
            />
          </View>
        </RBSheet>
        {/* ---------------for header--------------- */}
        <View style={{ alignItems: "center", alignSelf: "center" }}>
          <LinearGradient
            colors={[Colors.purple_color, Colors.light_greencolor]}
            start={{ x: 1, y: 0 }}
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
                {Lang_chg.Customize_txt[config.language]}
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
                {"Title"}
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
                  placeholder="Enter Title"
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
                    this.setState({ title: txt });
                  }}
                  value={this.state.title}
                  maxLength={50}
                />
              </View>
            </LinearGradient>
          </View>
          {/* //=========Bride Name===========// */}
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
                {Lang_chg.name_txt[config.language]}
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
                  placeholder="Enter Name"
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
                    this.setState({ name: txt });
                  }}
                  value={this.state.name}
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
              activeOpacity={1}
              onPress={() => {
                this.DatePicker.open();
              }}
            >
              <LinearGradient
                colors={[Colors.bluegreen_color, Colors.voilet_color]}
                start={{ x: 0, y: 1 }}
                end={{ x: 0, y: 0 }}
                style={styles.linearGradient}
              >
                <View style={styles.innerContainer}>
                  <Text style={styles.buttonText1}>
                    {this.state.selected_date != "NA"
                      ? this.state.selected_date
                      : "Select Date & Time"}
                  </Text>
                  <View>
                    <Image
                      style={{
                        width: (mobileW * 4) / 100,
                        height: (mobileW * 4) / 100,
                        resizeMode: "contain",
                        marginLeft:
                          config.device_type == "ios"
                            ? (mobileW * 0) / 100
                            : mobileW * 0,
                        marginTop: (mobileH * 2) / 100,
                      }}
                      source={localimag.calender}
                    ></Image>
                  </View>
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
              activeOpacity={1}
              onPress={() => {
                this.props.navigation.navigate("LocationMap");
              }}
            >
              <LinearGradient
                colors={[Colors.bluegreen_color, Colors.voilet_color]}
                start={{ x: 0, y: 1 }}
                end={{ x: 0, y: 0 }}
                style={styles.linearGradient}
              >
                <View style={styles.innerContainer}>
                  <Text style={styles.buttonText}>
                    {this.state.location != ""
                      ? this.state.location
                      : "Enter Location"}
                  </Text>
                </View>
              </LinearGradient>
            </TouchableOpacity>
          </View>
          {/* //=========discription Name===========// */}
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
                {Lang_chg.Description_txt[config.language]}
              </Text>
            </View>
            <LinearGradient
              colors={[Colors.voilet_color, Colors.bluegreen_color]}
              start={{ x: 0, y: 0 }}
              end={{ x: 0, y: 1 }}
              style={{
                marginTop: (mobileH * 2) / 100,
                height: (mobileH * 15) / 100,
                width: (mobileW * 90) / 100,
                borderRadius: (mobileW * 1.5) / 100,
              }}
            >
              <View style={styles.innerContainer}>
                <TextInput
                  style={[
                    styles.buttonText2,
                    {
                      height: (mobileH * 13.5) / 100,
                      width: (mobileW * 85) / 100,
                      color: Colors.greyColor,
                    },
                  ]}
                  placeholderTextColor={Colors.greyColor}
                  placeholder="Description"
                  keyboardType="default"
                  returnKeyLabel="done"
                  returnKeyType="done"
                  multiline={true}
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
                    this.setState({ Discription: txt });
                  }}
                  value={this.state.Discription}
                  maxLength={250}
                />
              </View>
            </LinearGradient>
          </View>
          {/* ----------------for button--------- */}
          {/* //=========Login Submit============// */}
          <TouchableOpacity
            onPress={() => this.nextButton()}
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
                {Lang_chg.Next_txt[config.language]}
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

  buttonText: {
    fontSize: (mobileW * 3.7) / 100,
    fontFamily: Font.FontRegular,
    marginLeft: (mobileW * 1.5) / 100,
    color: Colors.greyColor,
    backgroundColor: Colors.whiteColor,
    paddingVertical: (mobileH * 1.8) / 100,
    width: (mobileW * 85) / 100,
    alignSelf: "center",
    alignItems: "center",
  },

  buttonText1: {
    fontSize: (mobileW * 3.7) / 100,
    fontFamily: Font.FontRegular,
    marginLeft: (mobileW * 1.5) / 100,
    color: Colors.greyColor,
    backgroundColor: Colors.whiteColor,
    paddingVertical: (mobileH * 1.5) / 100,
    width: (mobileW * 80) / 100,
    justifyContent: "center",
    alignSelf: "center",
  },
  buttonText2: {
    fontSize: (mobileW * 3.7) / 100,
    fontFamily: Font.FontRegular,
    marginLeft: (mobileW * 1.5) / 100,
    color: Colors.black_color,
    backgroundColor: Colors.whiteColor,
    // paddingVertical:config.device_type == 'ios' ? mobileH * 0.5 / 100 : mobileW*1.5/100,
    height: 150,
    textAlignVertical: "top",
    marginTop:
      config.device_type == "ios"
        ? (mobileH * 0.5) / 100
        : (mobileH * 0.2) / 100,
    width: (mobileW * 70) / 100,
    justifyContent: "flex-start",
    alignSelf: "flex-start",
  },
});
