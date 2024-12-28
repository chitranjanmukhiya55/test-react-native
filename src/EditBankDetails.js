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
  RefreshControl,
} from "react-native";
import HideWithKeyboard from "react-native-hide-with-keyboard";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
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
  pushnotification1,
  notification,
  firebaseprovider,
  mediaprovider,
} from "./Provider/utilslib/Utils";
import RBSheet from "react-native-raw-bottom-sheet";
import DatePicker from "react-native-date-picker";
import moment from "moment";
import LinearGradient from "react-native-linear-gradient";
global.date_1 = new Date().setFullYear(new Date().getFullYear() - 18);

export default class EditBankDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      email: "",
      mobile: "",
      dateOfBirth: "",
      bankName: "",
      bankAddressLine1: "",
      bankAddressLine2: "",
      zipCode: "",
      city: "",
      state: "",
      bankAccountNumber: "",
      routingNumber: "",
      SSN: "",
      dateSelected: "",
      row_date: date_1,
      selected_date: "",
      selected_date1: "",
      time: "",
      selected_date_for_api: "",
      bank_arr: this.props.route.params.bank_arr,
    };
    this.setState({ bank_arr: this.props.route.params.bank_arr });
  }
  componentDidMount() {
    this.props.navigation.addListener("focus", () => {
      this.setState({ bank_arr: this.props.route.params.bank_arr });
      let data = this.state.bank_arr;
      this.setState({
        firstName: data.first_name,
        lastName: data.last_name,
        bankAddressLine1: data.address_line_1,
        bankAddressLine2: data.address_line_2,
        bankName: data.bank_name,
        selected_date:
          data.dob_day + "-" + data.dob_month + "-" + data.dob_year,
        email: data.email,
        mobile: data.mobile,
        SSN: data.ssn_number,
        state: data.state,
        bankAccountNumber: data.user_account,
        routingNumber: data.user_routing,
        zipCode: data.zip_code,
        city: data.city,
        selected_date_for_api:
          +data.dob_year + "-" + data.dob_month + "-" + data.dob_day,
      });
      consolepro.consolelog("==++++++++++", data.first_name);
    });
    let data = this.state.bank_arr;
    this.setState({
      firstName: data.first_name,
      lastName: data.last_name,
      bankAddressLine1: data.address_line_1,
      bankAddressLine2: data.address_line_2,
      bankName: data.bank_name,
      selected_date: data.dob_day + "-" + data.dob_month + "-" + data.dob_year,
      email: data.email,
      mobile: data.mobile,
      SSN: data.ssn_number,
      state: data.state,
      bankAccountNumber: data.user_account,
      routingNumber: data.user_routing,
      zipCode: data.zip_code,
      city: data.city,
      selected_date_for_api:
        +data.dob_year + "-" + data.dob_month + "-" + data.dob_day,
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

  updateBankDetails = async () => {
    consolepro.consolelog("iamhere");
    let {
      firstName,
      lastName,
      email,
      mobile,
      selected_date_for_api,
      bankName,
      bankAddressLine1,
      bankAddressLine2,
      zipCode,
      city,
      state,
      bankAccountNumber,
      routingNumber,
      SSN,
    } = this.state;
    consolepro.consolelog({
      firstName,
      lastName,
      email,
      mobile,
      selected_date_for_api,
      bankName,
      bankAddressLine1,
      bankAddressLine2,
      zipCode,
      city,
      state,
      bankAccountNumber,
      routingNumber,
      SSN,
    });

    //====================================first Name============================

    if (firstName.length <= 0 || firstName.trim().length <= 0) {
      msgProvider.toast(msgText.emptyFirstName[config.language], "center");
      return false;
    }

    if (firstName.length < 3) {
      msgProvider.toast(
        msgText.emptyMinNameOfBusiness[config.language],
        "center"
      );
      return false;
    }
    //====================================last Name============================

    if (lastName.length <= 0) {
      msgProvider.toast(msgText.emptyLastName[config.language], "center");
      return false;
    }

    if (lastName.length < 3) {
      msgProvider.toast(
        msgText.emptyMinNameOfBusiness[config.language],
        "center"
      );
      return false;
    }

    //    ==================================email=============================================
    if (email.length <= 0 || email.trim().length <= 0) {
      msgProvider.toast(msgText.emptyEmail[config.language], "center");
      return false;
    }
    var emailvalidation = config.emailvalidation;
    if (emailvalidation.test(email) !== true) {
      msgProvider.toast(msgText.validEmail[config.language], "center");
      return false;
    }

    //  =================================mobile_number==========================================
    if (mobile.length <= 0) {
      msgProvider.toast(msgText.emptyMobile[config.language], "center");
      return false;
    }

    if (mobile.length < 7) {
      msgProvider.toast(msgText.mobileMinLength[config.language], "center");
      return false;
    }
    //   =========================DOB======================================
    if (selected_date_for_api == "") {
      msgProvider.toast(msgText.emptyDOB[config.language], "center");
      return false;
    }
    //    ====================bank name================================
    if (bankName <= 0 || bankName.trim().length <= 0) {
      msgProvider.toast(msgText.emptybank[config.language], "center");
      return false;
    }

    //    ========================address 1=======================
    if (bankAddressLine1 <= 0 || bankAddressLine1.trim().length <= 0) {
      msgProvider.toast(msgText.emptyAddress[config.language], "center");
      return false;
    }

    //    =======================address 2===============================
    if (bankAddressLine2 <= 0 || bankAddressLine2.trim().length <= 0) {
      msgProvider.toast(msgText.emptyAddress[config.language], "center");
      return false;
    }

    //=======================Zip code=========================================
    if (zipCode <= 0 || zipCode.trim().length <= 0) {
      msgProvider.toast(msgText.emptyPostalCode[config.language], "center");
      return false;
    }

    // ===================City=============================
    if (city <= 0 || city.trim().length <= 0) {
      msgProvider.toast(msgText.emptyCity[config.language], "center");
      return false;
    }

    //    ====================State==================================
    if (state <= 0 || state.trim().length <= 0) {
      msgProvider.toast(msgText.emptystate[config.language], "center");
      return false;
    }

    //    ======================Account===============================
    if (bankAccountNumber.trim().length <= 0) {
      msgProvider.toast(msgText.emptyAccount[config.language], "center");
      return false;
    }

    // ====================Routing=====================================
    if (routingNumber.trim().length <= 0) {
      msgProvider.toast(msgText.emptyrout[config.language], "center");
      return false;
    }

    //    ==============ssn========================
    if (SSN.trim().length <= 0) {
      msgProvider.toast(msgText.emptyssn[config.language], "center");
      return false;
    }

    // ======================image 1======================================

    let url = config.baseURL + "stripe_payment/add_edit_bank_account_US.php";
    var data = new FormData();
    var user_arr = await localStorage.getItemObject("user_arr");
    var user_id = user_arr.user_id;
    data.append("user_id", user_id);
    data.append("firstname", firstName);
    data.append("lastname", lastName);
    data.append("email", email);
    data.append("phone_number", mobile);
    data.append("dateofbirth", selected_date_for_api);
    data.append("user_account", bankAccountNumber);
    data.append("user_routing", routingNumber);
    data.append("ssn_number", SSN);
    data.append("bank_name", bankName);
    data.append("bank_address_line_1", bankAddressLine1);
    data.append("bank_address_line_2", bankAddressLine2);
    data.append("bank_city_name", city);
    data.append("bank_state_name", state);
    data.append("bank_zip_code", zipCode);
    consolepro.consolelog("data", data);
    consolepro.consolelog("url", url);
    // return false
    apifuntion
      .postApi(url, data)
      .then((obj) => {
        consolepro.consolelog("obj", obj);
        if (obj.success == "true") {
          setTimeout(() => {
            msgProvider.toast(obj.msg[config.language], "center");
            this.props.navigation.goBack();
          }, 300);
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
  };

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
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
                  {Lang_chg.Edit_BankDetails_txt[config.language]}
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

          <KeyboardAwareScrollView
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
            showsHorizontalScrollIndicator={false}
          >

            <View
              style={{
                width: "90%",
                marginTop: (mobileW * 4) / 100,
                alignSelf: "center",
              }}
            >
              <Text numberOfLines={1} style={styles.text}>
                {Lang_chg.FirstName[config.language]}
              </Text>
            </View>
            <View
              style={{
                width: "90%",
                marginTop: (mobileW * 1) / 100,
                alignSelf: "center",
              }}
            >
              <LinearGradient
                colors={[Colors.light_greencolor, Colors.voilet_color]}
                start={{ x: 0, y: 0 }}
                end={{ x: 0, y: 1 }}
                style={styles.linearGradient}
              >
                <View style={styles.innerContainer}>
                  <View
                    style={{
                      marginLeft: (mobileW * 2.5) / 100,
                      alignSelf: "center",
                    }}
                  >
                    <Image
                      resizeMode="contain"
                      style={{ width: (mobileW * 5) / 100 }}
                      source={localimag.profile_signup}
                    ></Image>
                  </View>
                  <View
                    style={{
                      borderEndWidth: 1,
                      borderColor: Colors.light_greencolor,
                      alignItems: "flex-start",
                      justifyContent: "flex-start",
                      width: (mobileW * 3) / 100,
                      alignSelf: "center",
                      height: (mobileH * 3.5) / 100,
                    }}
                  >
                    <Text style={{}}></Text>
                  </View>
                  <TextInput
                    style={styles.buttonText}
                    placeholderTextColor={Colors.greyColor}
                    placeholder="Enter First Name"
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
                      this.setState({ firstName: txt });
                    }}
                    value={this.state.firstName}
                    maxLength={25}
                  />
                </View>
              </LinearGradient>
            </View>

            <View
              style={{
                width: "90%",
                marginTop: (mobileW * 4) / 100,
                alignSelf: "center",
              }}
            >
              <Text numberOfLines={1} style={styles.text}>
                {Lang_chg.LastName[config.language]}
              </Text>
            </View>
            <View
              style={{
                width: "90%",
                marginTop: (mobileW * 1) / 100,
                alignSelf: "center",
              }}
            >
              <LinearGradient
                colors={[Colors.light_greencolor, Colors.voilet_color]}
                start={{ x: 0, y: 0 }}
                end={{ x: 0, y: 1 }}
                style={styles.linearGradient}
              >
                <View style={styles.innerContainer}>
                  <View
                    style={{
                      marginLeft: (mobileW * 2.5) / 100,
                      alignSelf: "center",
                    }}
                  >
                    <Image
                      resizeMode="contain"
                      style={{ width: (mobileW * 5) / 100 }}
                      source={localimag.profile_signup}
                    ></Image>
                  </View>
                  <View
                    style={{
                      borderEndWidth: 1,
                      borderColor: Colors.light_greencolor,
                      alignItems: "flex-start",
                      justifyContent: "flex-start",
                      width: (mobileW * 3) / 100,
                      alignSelf: "center",
                      height: (mobileH * 3.5) / 100,
                    }}
                  >
                    <Text style={{}}></Text>
                  </View>
                  <TextInput
                    style={styles.buttonText}
                    placeholderTextColor={Colors.greyColor}
                    placeholder="Enter Last Name"
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
                      this.setState({ lastName: txt });
                    }}
                    value={this.state.lastName}
                    maxLength={25}
                  />
                </View>
              </LinearGradient>
            </View>

            <View
              style={{
                width: "90%",
                marginTop: (mobileW * 4) / 100,
                alignSelf: "center",
              }}
            >
              <Text numberOfLines={1} style={styles.text}>
                {Lang_chg.Email[config.language]}
              </Text>

              <LinearGradient
                colors={[Colors.light_greencolor, Colors.voilet_color]}
                start={{ x: 0, y: 0 }}
                end={{ x: 0, y: 1 }}
                style={styles.linearGradient}
              >
                <View style={styles.innerContainer}>
                  <View
                    style={{
                      marginLeft: (mobileW * 2.5) / 100,
                      alignSelf: "center",
                    }}
                  >
                    <Image
                      resizeMode="contain"
                      style={{ width: (mobileW * 5) / 100 }}
                      source={localimag.email}
                    ></Image>
                  </View>
                  <View
                    style={{
                      borderEndWidth: 1,
                      borderColor: Colors.light_greencolor,
                      alignItems: "flex-start",
                      justifyContent: "flex-start",
                      width: (mobileW * 3) / 100,
                      alignSelf: "center",
                      height: (mobileH * 3.5) / 100,
                    }}
                  >
                    <Text style={{}}></Text>
                  </View>
                  <TextInput
                    style={styles.buttonText}
                    placeholderTextColor={Colors.greyColor}
                    placeholder="Enter Email"
                    keyboardType="email-address"
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
                      this.setState({ email: txt });
                    }}
                    value={this.state.email}
                    maxLength={100}
                    //editable={this.state.bank_arr == 'NA' ? true : false}
                  />
                </View>
              </LinearGradient>
            </View>

            <View
              style={{
                width: "90%",
                marginTop: (mobileW * 4) / 100,
                alignSelf: "center",
              }}
            >
              <Text numberOfLines={1} style={styles.text}>
                {Lang_chg.mobile_no_txt[config.language]}
              </Text>

              <LinearGradient
                colors={[Colors.light_greencolor, Colors.voilet_color]}
                start={{ x: 0, y: 0 }}
                end={{ x: 0, y: 1 }}
                style={styles.linearGradient}
              >
                <View style={styles.innerContainer}>
                  <View
                    style={{
                      marginLeft: (mobileW * 2.5) / 100,
                      alignSelf: "center",
                    }}
                  >
                    <Image
                      resizeMode="contain"
                      style={{ width: (mobileW * 5) / 100 }}
                      source={localimag.mobile_number}
                    ></Image>
                  </View>
                  <View
                    style={{
                      borderEndWidth: 1,
                      borderColor: Colors.light_greencolor,
                      alignItems: "flex-start",
                      justifyContent: "flex-start",
                      width: (mobileW * 3) / 100,
                      alignSelf: "center",
                      height: (mobileH * 3.5) / 100,
                    }}
                  >
                    <Text style={{}}></Text>
                  </View>
                  <TextInput
                    style={styles.buttonText}
                    placeholderTextColor={Colors.greyColor}
                    placeholder="Enter Mobile Number"
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
                      this.setState({ mobile: txt });
                    }}
                    value={"" + this.state.mobile + ""}
                    maxLength={15}
                    //editable={this.state.bank_arr == 'NA' ? true : false}
                  />
                </View>
              </LinearGradient>
            </View>

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
                  maximumDate={new Date(date_1)}
                  theme={"auto"}
                  color={Colors.back_color}
                />
              </View>
            </RBSheet>

            <View
              style={{
                width: "90%",
                marginTop: (mobileW * 4) / 100,
                alignSelf: "center",
              }}
            >
              <Text numberOfLines={1} style={styles.text}>
                {Lang_chg.DateOfBirth[config.language]}
              </Text>
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => {
                  // this.state.bank_arr == 'NA' &&
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
                    }}
                  >
                    <View
                      style={{
                        marginLeft: (mobileW * 2.5) / 100,
                        alignSelf: "center",
                      }}
                    >
                      <Image
                        resizeMode="contain"
                        style={{ width: (mobileW * 5) / 100 }}
                        source={localimag.birthday_cake}
                      ></Image>
                    </View>
                    <View
                      style={{
                        borderEndWidth: 1,
                        borderColor: Colors.light_greencolor,
                        alignItems: "flex-start",
                        justifyContent: "flex-start",
                        width: (mobileW * 3) / 100,
                        alignSelf: "center",
                        height: (mobileH * 3.5) / 100,
                      }}
                    ></View>
                    <Text style={styles.buttonText}>
                      {this.state.selected_date != "NA"
                        ? this.state.selected_date
                        : "Enter Date of Birth"}
                    </Text>
                  </View>
                </LinearGradient>
              </TouchableOpacity>
            </View>

            <View
              style={{
                width: "90%",
                marginTop: (mobileW * 4) / 100,
                alignSelf: "center",
              }}
            >
              <Text numberOfLines={1} style={styles.text}>
                {Lang_chg.BankName[config.language]}
              </Text>

              <LinearGradient
                colors={[Colors.light_greencolor, Colors.voilet_color]}
                start={{ x: 0, y: 0 }}
                end={{ x: 0, y: 1 }}
                style={styles.linearGradient}
              >
                <View style={styles.innerContainer}>
                  <View
                    style={{
                      marginLeft: (mobileW * 2.5) / 100,
                      alignSelf: "center",
                    }}
                  >
                    <Image
                      resizeMode="contain"
                      style={{ width: (mobileW * 5) / 100 }}
                      source={localimag.bankCredit}
                    ></Image>
                  </View>
                  <View
                    style={{
                      borderEndWidth: 1,
                      borderColor: Colors.light_greencolor,
                      alignItems: "flex-start",
                      justifyContent: "flex-start",
                      width: (mobileW * 3) / 100,
                      alignSelf: "center",
                      height: (mobileH * 3.5) / 100,
                    }}
                  >
                    <Text style={{}}></Text>
                  </View>
                  <TextInput
                    style={styles.buttonText}
                    placeholderTextColor={Colors.greyColor}
                    placeholder="Bank Name or credit Union"
                    keyboardType="email-address"
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
                      this.setState({ bankName: txt });
                    }}
                    maxLength={100}
                    value={"" + this.state.bankName + ""}
                    //editable={this.state.bank_arr == 'NA' ? true : false}
                  />
                </View>
              </LinearGradient>
            </View>

            <View
              style={{
                width: "90%",
                marginTop: (mobileW * 4) / 100,
                alignSelf: "center",
              }}
            >
              <Text numberOfLines={1} style={styles.text}>
                {Lang_chg.EnterBankAddress1[config.language]}
              </Text>

              <LinearGradient
                colors={[Colors.light_greencolor, Colors.voilet_color]}
                start={{ x: 0, y: 0 }}
                end={{ x: 0, y: 1 }}
                style={styles.linearGradient}
              >
                <View style={styles.innerContainer}>
                  <View
                    style={{
                      marginLeft: (mobileW * 2.5) / 100,
                      alignSelf: "center",
                    }}
                  >
                    <Image
                      resizeMode="contain"
                      style={{ width: (mobileW * 5) / 100 }}
                      source={localimag.location_black}
                    ></Image>
                  </View>
                  <View
                    style={{
                      borderEndWidth: 1,
                      borderColor: Colors.light_greencolor,
                      alignItems: "flex-start",
                      justifyContent: "flex-start",
                      width: (mobileW * 3) / 100,
                      alignSelf: "center",
                      height: (mobileH * 3.5) / 100,
                    }}
                  >
                    <Text style={{}}></Text>
                  </View>
                  <TextInput
                    style={styles.buttonText}
                    placeholderTextColor={Colors.greyColor}
                    placeholder="Enter Bank Address Line 1"
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
                      this.setState({ bankAddressLine1: txt });
                    }}
                    maxLength={100}
                    value={this.state.bankAddressLine1}
                    //editable={this.state.bank_arr == 'NA' ? true : false}
                  />
                </View>
              </LinearGradient>
            </View>

            <View
              style={{
                width: "90%",
                marginTop: (mobileW * 4) / 100,
                alignSelf: "center",
              }}
            >
              <Text numberOfLines={1} style={styles.text}>
                {Lang_chg.EnterBankAddress2[config.language]}
              </Text>

              <LinearGradient
                colors={[Colors.light_greencolor, Colors.voilet_color]}
                start={{ x: 0, y: 0 }}
                end={{ x: 0, y: 1 }}
                style={styles.linearGradient}
              >
                <View style={styles.innerContainer}>
                  <View
                    style={{
                      marginLeft: (mobileW * 2.5) / 100,
                      alignSelf: "center",
                    }}
                  >
                    <Image
                      resizeMode="contain"
                      style={{ width: (mobileW * 5) / 100 }}
                      source={localimag.location_black}
                    ></Image>
                  </View>
                  <View
                    style={{
                      borderEndWidth: 1,
                      borderColor: Colors.light_greencolor,
                      alignItems: "flex-start",
                      justifyContent: "flex-start",
                      width: (mobileW * 3) / 100,
                      alignSelf: "center",
                      height: (mobileH * 3.5) / 100,
                    }}
                  >
                    <Text style={{}}></Text>
                  </View>
                  <TextInput
                    style={styles.buttonText}
                    placeholderTextColor={Colors.greyColor}
                    placeholder="Enter Bank Address Line 2"
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
                      this.setState({ bankAddressLine2: txt });
                    }}
                    maxLength={100}
                    value={this.state.bankAddressLine2}
                    //editable={this.state.bank_arr == 'NA' ? true : false}
                  />
                </View>
              </LinearGradient>
            </View>

            <View
              style={{
                width: "90%",
                marginTop: (mobileW * 4) / 100,
                alignSelf: "center",
              }}
            >
              <Text numberOfLines={1} style={styles.text}>
                {Lang_chg.ZipCode[config.language]}
              </Text>
              <LinearGradient
                colors={[Colors.light_greencolor, Colors.voilet_color]}
                start={{ x: 0, y: 0 }}
                end={{ x: 0, y: 1 }}
                style={styles.linearGradient}
              >
                <View style={styles.innerContainer}>
                  <View
                    style={{
                      marginLeft: (mobileW * 2.5) / 100,
                      alignSelf: "center",
                    }}
                  >
                    <Image
                      resizeMode="contain"
                      style={{ width: (mobileW * 5) / 100 }}
                      source={localimag.ZipCode}
                    ></Image>
                  </View>
                  <View
                    style={{
                      borderEndWidth: 1,
                      borderColor: Colors.light_greencolor,
                      alignItems: "flex-start",
                      justifyContent: "flex-start",
                      width: (mobileW * 3) / 100,
                      alignSelf: "center",
                      height: (mobileH * 3.5) / 100,
                    }}
                  >
                    <Text style={{}}></Text>
                  </View>
                  <TextInput
                    style={styles.buttonText}
                    placeholderTextColor={Colors.greyColor}
                    placeholder="Enter Zip Code"
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
                      this.setState({ zipCode: txt });
                    }}
                    maxLength={10}
                    value={"" + this.state.zipCode + ""}
                    //editable={this.state.bank_arr == 'NA' ? true : false}
                  />
                </View>
              </LinearGradient>
            </View>

            <View
              style={{
                width: "90%",
                marginTop: (mobileW * 4) / 100,
                alignSelf: "center",
              }}
            >
              <Text numberOfLines={1} style={styles.text}>
                {Lang_chg.City[config.language]}
              </Text>
              <LinearGradient
                colors={[Colors.light_greencolor, Colors.voilet_color]}
                start={{ x: 0, y: 0 }}
                end={{ x: 0, y: 1 }}
                style={styles.linearGradient}
              >
                <View style={styles.innerContainer}>
                  <View
                    style={{
                      marginLeft: (mobileW * 2.5) / 100,
                      alignSelf: "center",
                    }}
                  >
                    <Image
                      resizeMode="contain"
                      style={{ width: (mobileW * 5) / 100 }}
                      source={localimag.location_black}
                    ></Image>
                  </View>
                  <View
                    style={{
                      borderEndWidth: 1,
                      borderColor: Colors.light_greencolor,
                      alignItems: "flex-start",
                      justifyContent: "flex-start",
                      width: (mobileW * 3) / 100,
                      alignSelf: "center",
                      height: (mobileH * 3.5) / 100,
                    }}
                  >
                    <Text style={{}}></Text>
                  </View>
                  <TextInput
                    style={styles.buttonText}
                    placeholderTextColor={Colors.greyColor}
                    placeholder="Enter City"
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
                      this.setState({ city: txt });
                    }}
                    maxLength={50}
                    value={this.state.city}
                    //editable={this.state.bank_arr == 'NA' ? true : false}
                  />
                </View>
              </LinearGradient>
            </View>

            <View
              style={{
                width: "90%",
                marginTop: (mobileW * 4) / 100,
                alignSelf: "center",
              }}
            >
              <Text numberOfLines={1} style={styles.text}>
                {Lang_chg.State[config.language]}
              </Text>

              <LinearGradient
                colors={[Colors.light_greencolor, Colors.voilet_color]}
                start={{ x: 0, y: 0 }}
                end={{ x: 0, y: 1 }}
                style={styles.linearGradient}
              >
                <View style={styles.innerContainer}>
                  <View
                    style={{
                      marginLeft: (mobileW * 2.5) / 100,
                      alignSelf: "center",
                    }}
                  >
                    <Image
                      resizeMode="contain"
                      style={{ width: (mobileW * 5) / 100 }}
                      source={localimag.location_black}
                    ></Image>
                  </View>
                  <View
                    style={{
                      borderEndWidth: 1,
                      borderColor: Colors.light_greencolor,
                      alignItems: "flex-start",
                      justifyContent: "flex-start",
                      width: (mobileW * 3) / 100,
                      alignSelf: "center",
                      height: (mobileH * 3.5) / 100,
                    }}
                  >
                    <Text style={{}}></Text>
                  </View>
                  <TextInput
                    style={styles.buttonText}
                    placeholderTextColor={Colors.greyColor}
                    placeholder="Enter State"
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
                      this.setState({ state: txt });
                    }}
                    maxLength={50}
                    value={this.state.state}
                    //editable={this.state.bank_arr == 'NA' ? true : false}
                  />
                </View>
              </LinearGradient>
            </View>

            <View
              style={{
                width: "90%",
                marginTop: (mobileW * 4) / 100,
                alignSelf: "center",
              }}
            >
              <Text numberOfLines={1} style={styles.text}>
                {Lang_chg.BankAccuntNumber[config.language]}
              </Text>
              <LinearGradient
                colors={[Colors.light_greencolor, Colors.voilet_color]}
                start={{ x: 0, y: 0 }}
                end={{ x: 0, y: 1 }}
                style={styles.linearGradient}
              >
                <View style={styles.innerContainer}>
                  <View
                    style={{
                      marginLeft: (mobileW * 2.5) / 100,
                      alignSelf: "center",
                    }}
                  >
                    <Image
                      resizeMode="contain"
                      style={{ width: (mobileW * 5) / 100 }}
                      source={localimag.bankCredit}
                    ></Image>
                  </View>
                  <View
                    style={{
                      borderEndWidth: 1,
                      borderColor: Colors.light_greencolor,
                      alignItems: "flex-start",
                      justifyContent: "flex-start",
                      width: (mobileW * 3) / 100,
                      alignSelf: "center",
                      height: (mobileH * 3.5) / 100,
                    }}
                  >
                    <Text style={{}}></Text>
                  </View>
                  <TextInput
                    style={styles.buttonText}
                    placeholderTextColor={Colors.greyColor}
                    placeholder="Enter Bank Account Number"
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
                      this.setState({ bankAccountNumber: txt });
                    }}
                    maxLength={50}
                    value={"" + this.state.bankAccountNumber + ""}
                    //editable={this.state.bank_arr == 'NA' ? true : false}
                  />
                </View>
              </LinearGradient>
            </View>

            <View
              style={{
                width: "90%",
                marginTop: (mobileW * 4) / 100,
                alignSelf: "center",
              }}
            >
              <Text numberOfLines={1} style={styles.text}>
                {Lang_chg.RoutingNumber[config.language]}
              </Text>
              <LinearGradient
                colors={[Colors.light_greencolor, Colors.voilet_color]}
                start={{ x: 0, y: 0 }}
                end={{ x: 0, y: 1 }}
                style={styles.linearGradient}
              >
                <View style={styles.innerContainer}>
                  <View
                    style={{
                      marginLeft: (mobileW * 2.5) / 100,
                      alignSelf: "center",
                    }}
                  >
                    <Image
                      resizeMode="contain"
                      style={{ width: (mobileW * 5) / 100 }}
                      source={localimag.routeNumber}
                    ></Image>
                  </View>
                  <View
                    style={{
                      borderEndWidth: 1,
                      borderColor: Colors.light_greencolor,
                      alignItems: "flex-start",
                      justifyContent: "flex-start",
                      width: (mobileW * 3) / 100,
                      alignSelf: "center",
                      height: (mobileH * 3.5) / 100,
                    }}
                  >
                    <Text style={{}}></Text>
                  </View>
                  <TextInput
                    style={styles.buttonText}
                    placeholderTextColor={Colors.greyColor}
                    placeholder="Enter Routing No."
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
                      this.setState({ routingNumber: txt });
                    }}
                    maxLength={50}
                    value={"" + this.state.routingNumber + ""}
                    //editable={this.state.bank_arr == 'NA' ? true : false}
                  />
                </View>
              </LinearGradient>
            </View>

            <View
              style={{
                marginBottom: (mobileW * 4) / 100,
                width: "90%",
                marginTop: (mobileW * 4) / 100,
                alignSelf: "center",
              }}
            >
              <Text numberOfLines={1} style={styles.text}>
                {Lang_chg.SSN[config.language]}
              </Text>
              <LinearGradient
                colors={[Colors.light_greencolor, Colors.voilet_color]}
                start={{ x: 0, y: 0 }}
                end={{ x: 0, y: 1 }}
                style={styles.linearGradient}
              >
                <View style={styles.innerContainer}>
                  <View
                    style={{
                      marginLeft: (mobileW * 2.5) / 100,
                      alignSelf: "center",
                    }}
                  >
                    <Image
                      resizeMode="contain"
                      style={{ width: (mobileW * 5) / 100 }}
                      source={localimag.SSNID}
                    ></Image>
                  </View>
                  <View
                    style={{
                      borderEndWidth: 1,
                      borderColor: Colors.light_greencolor,
                      alignItems: "flex-start",
                      justifyContent: "flex-start",
                      width: (mobileW * 3) / 100,
                      alignSelf: "center",
                      height: (mobileH * 3.5) / 100,
                    }}
                  >
                    <Text style={{}}></Text>
                  </View>
                  <TextInput
                    style={styles.buttonText}
                    placeholderTextColor={Colors.greyColor}
                    placeholder="Enter SSN (Last 4), EIN or Tax ID"
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
                      this.setState({ SSN: txt });
                    }}
                    maxLength={50}
                    value={"" + this.state.SSN + ""}
                    //editable={this.state.bank_arr == 'NA' ? true : false}
                  />
                </View>
              </LinearGradient>
            </View>
            {
              <View
                style={{
                  width: "90%",
                  marginTop: (mobileW * 10) / 100,
                  alignSelf: "center",
                  marginBottom: (mobileW * 5) / 100,
                }}
              >
                <TouchableOpacity
                  onPress={() => this.updateBankDetails()}
                  activeOpacity={0.7}
                  style={{
                    alignItems: "center",
                    alignSelf: "center",
                    marginBottom: (mobileH * 2) / 100,
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
                      {Lang_chg.update_txt[config.language]}
                    </Text>
                  </LinearGradient>
                </TouchableOpacity>
              </View>
            }
          </KeyboardAwareScrollView>
        </SafeAreaView>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  text: {
    color: Colors.black_color,
    fontSize: (mobileW * 3.5) / 100,
    fontFamily: Font.FontSemiBold,
  },
  textInput: {
    fontFamily: Font.FontRegular,
    width: "95%",
    fontSize: (mobileW * 3.5) / 100,
    alignSelf: "center",
    color: Colors.black_color,
    paddingVertical: (mobileW * 2.5) / 100,
  },
  textInputView: {
    width: "100%",
    marginTop: (mobileW * 2) / 100,
    height: (mobileH * 6.5) / 100,
    borderRadius: (mobileW * 1) / 100,
    borderWidth: (mobileW * 0.3) / 100,
    borderColor: Colors.black_color,
    justifyContent: "center",
  },
  cameraView: {
    width: (mobileW * 89.9) / 100,
    height: (mobileH * 17.9) / 100,
    borderRadius: (mobileW * 1.5) / 100,
    borderWidth: (mobileW * 0.3) / 100,
    borderStyle: "dashed",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.whiteColor,
  },

  modalContainerStyle: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    marginBottom: (mobileW * 3) / 100,
    backgroundColor: "#00000090",
  },
  modalSelectOptionContainerStyle: {
    width: "92%",
    height: (mobileW * 37) / 100,
    backgroundColor: "#FAFAFA",
    borderRadius: (mobileW * 4) / 100,
  },
  selectOptionContainerStyle: {
    width: "100%",
    alignSelf: "center",
    justifyContent: "center",
  },
  selectOptionTextStyle: {
    alignSelf: "center",
    color: "#000000",
    paddingVertical: (mobileW * 3) / 100,
    fontSize: (mobileW * 3.8) / 100,
    fontFamily: Font.FontMedium,
  },
  selectBorderStyle: {
    width: "100%",
    height: (mobileH * 0.1) / 100,
    backgroundColor: Colors.TextInputPlaceHolderColor,
  },
  selectTextContainer: {
    width: "100%",
    alignSelf: "center",
    justifyContent: "center",
    marginTop: (mobileW * 1) / 100,
  },
  selectTextStyle: {
    alignSelf: "center",
    fontSize: (mobileW * 4) / 100,
    color: "#7D7979",
    paddingVertical: (mobileW * 3) / 100,
  },
  buttonContainerStyle: {
    width: "90%",
    justifyContent: "center",
    alignSelf: "center",
  },
  buttonTextStyle: {
    fontFamily: Font.FontMedium,
    fontSize: (mobileW * 4) / 100,
    alignSelf: "center",
    color: "#F80302",
    paddingVertical: (mobileW * 3) / 100,
  },
  buttonModalStyle: {
    width: "92%",
    backgroundColor: "#FAFAFA",
    borderRadius: (mobileW * 4) / 100,
    marginTop: (mobileW * 2) / 100,
  },
  linearGradient: {
    marginTop: (mobileH * 1) / 100,
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
    //justifyContent: 'center',
  },
  buttonText: {
    fontSize: (mobileW * 3.7) / 100,
    fontFamily: Font.FontRegular,
    marginLeft: (mobileW * 1.5) / 100,
    color: Colors.greyColor,
    backgroundColor: Colors.whiteColor,
    paddingVertical: (mobileH * 1.8) / 100,
    width: (mobileW * 62) / 100,
    alignSelf: "center",
    alignItems: "center",
    // backgroundColor: 'transparent',
  },
});
