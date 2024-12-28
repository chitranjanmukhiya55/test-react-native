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
  ActivityIndicator,
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
} from "../Provider/utilslib/Utils";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import LinearGradient from "react-native-linear-gradient";
import { Tab } from "react-native-elements";
import { Nodata_foundimage } from "../Provider/Nodata_foundimage";

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Tab: 0,
      mobile: "",
      btn: true,
      email: "",
      password: "",
      securetext1: true,
      securetext2: true,
      password: "",
      confirmpassword: "",
      firstname: "",
      lastname: "",
      remember_me: false,
      user_id: "",
      otp: "",
      showbtn: false,
      fullname: "",
      country_code: "1",
      country_code_modal: false,
      location: "",
      social_data: "NA",
      password_hide: false,
      email_edit: true,
      fullname_edit: true,
      otp_loader: false,
      phonecode_arr: "NA",
      phonecode_modal: false,
      searchPhoneCode: "",
      phonecode_arr_search: "",
      country_id: "",
      flag: "",
      phonecode: "",
    };
  }
  componentDidMount() {
    const { navigation } = this.props;
    this.focusListener = navigation.addListener("focus", () => {
      consolepro.consolelog(
        "global_user_addressglobal_user_address",
        global_user_address
      );
      if (global_user_address != "") {
        this.setState({ location: global_user_address });
      }
    });
    this.setProfileData();
    this.getCountry();
    this.setState({ social_data: "NA" });
  }
  //---------set profile while social login---------//
  setProfileData = async () => {
    let result = await localStorage.getItemObject("socialdata");
    // alert(JSON.stringify(result))
    consolepro.consolelog({ result });
    if (result != null) {
      let email = result.social_email;
      let fullname = result.social_name;
      if (email != null) {
        this.setState({
          email: email,
          email_edit: false,
          social_data: result,
          password_hide: true,
        });
      }
      if (fullname != null) {
        this.setState({
          fullname: fullname,
          fullname_edit: false,
          social_data: result,
          password_hide: true,
        });
      }
    }
  };

  selectPhoneCode = (index) => {
    let data = this.state.phonecode_arr;
    let data1 = this.state.phonecode_arr_search;
    for (let i = 0; i < data.length; i++) {
      data[i].status = false;
    }
    for (let i = 0; i < data1.length; i++) {
      data1[i].status = false;
    }
    data[index].status = true;
    this.setState({
      phonecode_arr: data,
      phonecode_arr_search: data1,
      phonecode: data[index].phonecode,
      phonecode_modal: false,
      country_id: data[index].country_id,
      flag: data[index].flag,
    });
  };
  //---------for password-------------
  eyepress1 = () => {
    if (this.state.securetext1) {
      this.setState({ securetext1: false });
    } else {
      this.setState({ securetext1: true });
    }
  };

  //-----------------for confirm password-----------------
  eyepress2 = () => {
    if (this.state.securetext2) {
      this.setState({ securetext2: false });
    } else {
      this.setState({ securetext2: true });
    }
  };

  //-------------for accept terms and conditions---------------
  remember_me = () => {
    if (this.state.remember_me) {
      this.setState({ remember_me: false });
    } else {
      this.setState({ remember_me: true });
    }
  };
  getCountry = () => {
    let url = config.baseURL + "get_country.php?user_id=0";
    consolepro.consolelog("get_country.php", url);
    apifuntion
      .getApi(url, 1)
      .then((obj) => {
        consolepro.consolelog(obj);
        if (obj.success == "true") {
          consolepro.consolelog("all country", obj);
          // return false
          let data = obj.country_arr;
          for (let i = 0; i < data.length; i++) {
            if (data[i].country_id == 38) {
              data[i].status = true;
              this.setState({
                phonecode: data[i].phonecode,
                country_id: data[i].country_id,
                flag: data[i].flag,
              });
              consolepro.consolelog("data[i].flag", data[i].flag);
              consolepro.consolelog("data[i].phonecode", data[i].phonecode);
              consolepro.consolelog("data[i].country_id", data[i].country_id);
            }
          }
          this.setState({ phonecode_arr: data, phonecode_arr_search: data });
        } else {
          msgProvider.alert(
            msgTitle.information[config.language],
            obj.msg[config.language],
            false
          );
          return false;
        }
      })
      .catch((error) => {
        consolepro.consolelog("-------- error ------- " + error);
        msgProvider.alert(
          msgTitle.internet[config.language],
          msgText.networkconnection[config.language],
          false
        );
      });
  };

  // ...................select country ...............
  selectCountry = (index) => {
    let data = this.state.country_arr;
    let data1 = this.state.country_arr_search;

    for (let i = 0; i < data.length; i++) {
      data[i].status = false;
    }
    for (let i = 0; i < data1.length; i++) {
      data1[i].status = false;
    }
    data[index].status = true;
    this.setState({
      country_arr: data,
      country_arr_search: data1,
      country_id: data[index].country_id,
      country_model: false,
      country_name: data[index].country_name,
    });
  };
  // =========================search function country=============================
  searchFilterFunction_country = (text) => {
    this.setState({ searchCountry: text });
    let data1 = this.state.country_arr_search;
    if (data1 != "NA") {
      const newData = data1.filter((item) => {
        const textData = text.trim().toLowerCase();
        return (
          item.country_name.toLowerCase().indexOf(textData) >= 0 ||
          item.phonecode.toString().indexOf(textData) >= 0 ||
          item.sortname.toLowerCase().indexOf(textData) >= 0
        );
      });
      console.log("newData", newData);
      if (newData.length > 0) {
        this.setState({ country_arr: newData });
      } else if (newData.length <= 0) {
        this.setState({ country_arr: "NA" });
      }
    }
  };
  //------------------signup function--------------
  signup_btn = () => {
    consolepro.consolelog("-=--=-===========================");
    Keyboard.dismiss();
    let {
      fullname,
      email,
      mobile,
      password,
      confirmpassword,
      remember_me,
      address,
      pincode,
      country_code,
      location,
    } = this.state;
    consolepro.consolelog({
      fullname,
      email,
      mobile,
      password,
      confirmpassword,
      remember_me,
      address,
      pincode,
      country_code,
    });
    //  alert(fullname+email+mobile+password+confirmpassword)
    //------------------fullname===================
    if (fullname.length <= 0) {
      msgProvider.toast(msgText.emptyName[config.language], "center");
      return false;
    }
    //======================================mobile============================
    if (mobile.length <= 0) {
      msgProvider.toast(msgText.emptyMobile[config.language], "center");
      return false;
    }
    if (mobile.length < 7) {
      msgProvider.toast(msgText.mobileMinLength[config.language], "center");
      return false;
    }
    var mobilevalidation = config.mobilevalidation;
    if (mobilevalidation.test(mobile) !== true) {
      msgProvider.toast(msgText.validMobile[config.language], "center");
      return false;
    }
    if (location.length <= 0) {
      msgProvider.toast(msgText.emptyLocation[config.language], "center");
      return false;
    }
    //=======================================email============================
    if (email.length <= 0) {
      msgProvider.toast(msgText.emptyEmail[config.language], "center");
      return false;
    }
    var emailvalidation = config.emailvalidation;
    if (emailvalidation.test(email) !== true) {
      msgProvider.toast(msgText.validEmail[config.language], "center");
      return false;
    }

    //==================================password===================
    if (password.length <= 0) {
      msgProvider.toast(msgText.emptyPassword[config.language], "center");
      return false;
    }
    if (password.length <= 5) {
      msgProvider.toast(msgText.passwordMinLength[config.language], "center");
      return false;
    }
    var letters_pas = config.letters_pas;
    if (letters_pas.test(password) !== true) {
      msgProvider.toast(msgText.passwordValid[config.language], "center");
      return false;
    }
    //==================================confirmpassword===================
    if (confirmpassword.length <= 0) {
      msgProvider.toast(
        msgText.emptyConfirmPassword[config.language],
        "center"
      );
      return false;
    }
    if (confirmpassword.length <= 5) {
      msgProvider.toast(
        msgText.confirmPasswordMinLength[config.language],
        "center"
      );
      return false;
    }
    var letters_pas1 = config.letters_pas;
    if (letters_pas1.test(confirmpassword) !== true) {
      msgProvider.toast(
        msgText.passwordValidconfirm[config.language],
        "center"
      );
      return false;
    }
    if (confirmpassword !== password) {
      msgProvider.toast(msgText.passwordNotMatch[config.language], "center");
      return false;
    }
    if (remember_me == false) {
      msgProvider.toast(msgText.acceptTerms[config.language], "center");
      return false;
    }
    let url = config.baseURL + "signup.php";
    var data = new FormData();
    data.append("name", fullname);
    data.append("email", email);
    data.append("mobile", mobile);
    data.append("password", password);
    data.append("login_type", config.login_type);
    data.append("device_type", config.device_type);
    data.append("player_id", player_id_me1);
    data.append("user_type", this.state.Tab + 1);
    data.append("address", global.global_user_address);
    data.append("latitude", global.global_user_address_lat);
    data.append("longitude", global.global_user_address_long);
    data.append("country_id", this.state.country_id);
    data.append("phonecode", this.state.phonecode);
    consolepro.consolelog("data", data);
    consolepro.consolelog("url", url);

    // return false
    apifuntion
      .postApi(url, data)
      .then((obj) => {
        consolepro.consolelog("user_arr", obj);
        if (obj.success == "true") {
          var user_arr = obj.user_details;
          var user_id = user_arr.user_id;
          localStorage.setItemString("user_id", JSON.stringify(user_id));
          localStorage.setItemObject("user_arr", user_arr);
          localStorage.setItemString("password", this.state.password);
          localStorage.setItemString("email", this.state.email);
          setTimeout(() => {
            firebaseprovider.firebaseUserCreate();
          }, 1500);
          this.props.navigation.navigate("OtpVerification", {
            user_details: user_arr,
          });
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
  };
  //----------function for social login ----------------//

  _btnSocialDataSubmit = () => {
    Keyboard.dismiss();
    let {
      fullname,
      email,
      mobile,
      password,
      confirmpassword,
      remember_me,
      address,
      pincode,
      country_code,
      location,
    } = this.state;
    consolepro.consolelog({
      fullname,
      email,
      mobile,
      password,
      confirmpassword,
      remember_me,
      address,
      pincode,
      country_code,
    });
    //  alert(fullname+email+mobile+password+confirmpassword)
    //------------------fullname===================
    if (fullname.length <= 0) {
      msgProvider.toast(msgText.emptyName[config.language], "center");
      return false;
    }
    //======================================mobile============================
    if (mobile.length <= 0) {
      msgProvider.toast(msgText.emptyMobile[config.language], "center");
      return false;
    }
    if (mobile.length < 7) {
      msgProvider.toast(msgText.mobileMinLength[config.language], "center");
      return false;
    }
    var mobilevalidation = config.mobilevalidation;
    if (mobilevalidation.test(mobile) !== true) {
      msgProvider.toast(msgText.validMobile[config.language], "center");
      return false;
    }
    if (location.length <= 0) {
      msgProvider.toast(msgText.emptyLocation[config.language], "center");
      return false;
    }
    //=======================================email============================
    if (email.length <= 0) {
      msgProvider.toast(msgText.emptyEmail[config.language], "center");
      return false;
    }
    var emailvalidation = config.emailvalidation;
    if (emailvalidation.test(email) !== true) {
      msgProvider.toast(msgText.validEmail[config.language], "center");
      return false;
    }
    if (remember_me == false) {
      msgProvider.toast(msgText.acceptTerms[config.language], "center");
      return false;
    }

    let url = config.baseURL + "signup.php";
    var data = new FormData();
    data.append("name", fullname);
    data.append("email", email);
    data.append("mobile", mobile);
    data.append("login_type", this.state.social_data.logintype);
    data.append("social_id", this.state.social_data.social_id);
    data.append("device_type", config.device_type);
    data.append("player_id", player_id_me1);
    data.append("user_type", this.state.Tab + 1);
    data.append("address", global.global_user_address);
    data.append("latitude", global.global_user_address_lat);
    data.append("longitude", global.global_user_address_long);
    data.append("country_id", this.state.country_id);
    data.append("phonecode", this.state.phonecode);

    consolepro.consolelog("data", data);
    apifuntion
      .postApi(url, data)
      .then((obj) => {
        consolepro.consolelog("user_arr", obj);
        // alert(JSON.stringify(obj))
        if (obj.success == "true") {
          var user_arr = obj.user_details;
          var user_id = user_arr.user_id;
          let user_type = user_arr.user_type;
          localStorage.setItemString("user_id", JSON.stringify(user_id));
          localStorage.setItemObject("user_arr", user_arr);
          localStorage.setItemString("password", this.state.password);
          localStorage.setItemString("email", this.state.email);
          if (user_type == 1) {
            //if (otp_verify == 1) {
            this.props.navigation.navigate("Home");
            // }
          } else {
            this.props.navigation.navigate("AddBussinessDetails2");
          }
        } else {
          msgProvider.alert(
            msgTitle.information[config.language],
            obj.msg[config.language],
            false
          );
          return false;
        }
      })
      .catch((error) => {
        consolepro.consolelog("-------- error ------- " + error);
      });
  };

  searchFilterFunction_phonecode = (text) => {
    this.setState({ searchPhoneCode: text });
    let data1 = this.state.phonecode_arr_search;
    if (data1 != "NA") {
      const newData = data1.filter((item) => {
        const textData = text.trim().toLowerCase();
        return (
          item.country_name.toLowerCase().indexOf(textData) >= 0 ||
          item.phonecode.toString().indexOf(textData) >= 0 ||
          item.sortname.toLowerCase().indexOf(textData) >= 0
        );
      });
      console.log("newData", newData);
      if (newData.length > 0) {
        this.setState({ phonecode_arr: newData });
      } else if (newData.length <= 0) {
        this.setState({ phonecode_arr: "NA" });
      }
    }
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

        <Modal
          animationType="slide"
          visible={this.state.phonecode_modal}
          onRequestClose={() => {
            this.setState({ phonecode_modal: false });
          }}
        >
          <SafeAreaView
            style={{
              flex: 1,
              alignItems: "center",
              backgroundColor: Colors.whiteColor,
            }}
          >
            <StatusBar
              hidden={false}
              backgroundColor={Colors.whiteColor}
              translucent={false}
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
                  onPress={() => this.setState({ phonecode_modal: false })}
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
                    {Lang_chg.selectCountry[config.language]}
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
                width: (mobileW * 85) / 100,
                alignSelf: "center",
                marginTop: (mobileH * 3) / 100,
              }}
            >
              {/*===========Search----------------------  */}
              <LinearGradient
                colors={[Colors.purple_color, Colors.light_greencolor]}
                start={{ x: 1, y: 1 }}
                end={{ x: 0, y: 0 }}
                style={{
                  width: (mobileW * 90) / 100,
                  alignSelf: "center",
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  height: (mobileH * 8) / 100,
                  borderRadius: (mobileW * 50) / 100,
                }}
              >
                <View
                  style={{
                    width: (mobileW * 89) / 100,
                    alignSelf: "center",
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                    height: (mobileH * 7.5) / 100,
                    borderRadius: (mobileW * 50) / 100,
                    backgroundColor: Colors.whiteColor,
                  }}
                >
                  <View
                    style={{
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Image
                      resizeMode="contain"
                      style={{
                        paddingHorizontal: (mobileW * 6) / 100,
                        width: (mobileW * 6) / 100,
                        height: (mobileW * 6) / 100,
                      }}
                      source={localimag.grey_search}
                    ></Image>
                  </View>

                  <TextInput
                    keyboardType="default"
                    returnKeyType="done"
                    onChangeText={(value) => {
                      this.searchFilterFunction_phonecode(value);
                    }}
                    maxLength={50}
                    style={{
                      color: Colors.black_color,
                      width: (mobileW * 75) / 100,
                      // backgroundColor: 'green',
                      fontSize: (mobileW * 3.75) / 100,
                      fontFamily: Font.FontMedium,
                    }}
                    placeholder={Lang_chg.search_here_txt[config.language]}
                    placeholderTextColor={Colors.black_color}
                    value={"" + this.state.searchPhoneCode + ""}
                  ></TextInput>
                </View>
              </LinearGradient>
              {/* ==========================search end=============================== */}
            </View>
            {this.state.phonecode_arr != "NA" ? (
              <FlatList
                contentContainerStyle={{ paddingBottom: (mobileW * 30) / 100 }}
                showsVerticalScrollIndicator={false}
                data={this.state.phonecode_arr}
                renderItem={({ item, index }) => {
                  return (
                    <TouchableOpacity
                      activeOpacity={0.9}
                      onPress={() => {
                        this.selectPhoneCode(index);
                      }}
                      style={{
                        width: (mobileW * 90) / 100,
                        alignSelf: "center",
                        borderBottomColor: Colors.border_color,
                        borderBottomWidth: 0.5,
                        flexDirection: "row",
                        paddingVertical: (mobileH * 1) / 100,
                        marginTop: (mobileH * 4) / 100,
                      }}
                    >
                      <View
                        style={{
                          width: (mobileW * 10) / 100,
                          alignItems: "center",
                          alignSelf: "center",
                          marginTop: (mobileH * 0.3) / 100,
                        }}
                      >
                        <Image
                          resizeMode="contain"
                          onError={() => {
                            let data = this.state.phonecode_arr;
                            (item.flag = "NA"),
                              this.setState({ phonecode_arr: data });
                          }}
                          style={{
                            height: (mobileW * 7) / 100,
                            width: (mobileW * 7) / 100,
                          }}
                          source={item.flag != "NA" ? { uri: item.flag } : ""}
                        ></Image>
                      </View>
                      <View
                        style={{
                          width: (mobileW * 70) / 100,
                          alignSelf: "center",
                          alignItems: "flex-start",
                          flexDirection: "row",
                        }}
                      >
                        <Text
                          style={{
                            fontSize: (mobileW * 4.5) / 100,
                            color: Colors.light_black_color,
                            fontFamily: Font.FontMedium,
                          }}
                        >
                          {item.country_name}
                        </Text>
                        <Text
                          style={{
                            fontSize: (mobileW * 4.5) / 100,
                            color: Colors.light_black_color,
                            fontFamily: Font.FontMedium,
                          }}
                        >
                          {" (+" + item.phonecode + ")"}
                        </Text>
                      </View>
                      <View
                        style={{
                          width: (mobileW * 10) / 100,
                          alignSelf: "center",
                        }}
                      >
                        {item.status == true ? (
                          <View style={{}}>
                            <Image
                              resizeMode="contain"
                              style={{
                                height: (mobileW * 7) / 100,
                                width: (mobileW * 7) / 100,
                                resizeMode: "contain",
                                resizeMode: "cover",
                              }}
                              source={localimag.success}
                            ></Image>
                          </View>
                        ) : (
                          <View style={{}}></View>
                        )}
                      </View>
                    </TouchableOpacity>
                  );
                }}
              />
            ) : (
              <Nodata_foundimage />
            )}
          </SafeAreaView>
        </Modal>
        <KeyboardAwareScrollView
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ width: mobileW }}
          keyboardShouldPersistTaps="handled"
        >
          {/* //===========ImageBackground ======// */}
          <ImageBackground
            style={{
              width: (mobileW * 100) / 100,
              height: (mobileH * 37) / 100,
            }}
            resizeMode="cover"
            source={localimag.login_design_with_logo}
          ></ImageBackground>
          {/* //==========Create Account======// */}
          <View
            style={{
              width: (mobileW * 90) / 100,
              marginTop: (mobileH * 1) / 100,
              alignSelf: "center",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                fontFamily: Font.FontBold,
                fontSize: (mobileW * 5.7) / 100,
                color: Colors.black_color,
              }}
            >
              {Lang_chg.create_account_txt[config.language]}
            </Text>
            <Text
              style={{
                fontFamily: Font.FontSemiBold,
                fontSize: (mobileW * 4.3) / 100,
                color: Colors.black_color,
              }}
            >
              {Lang_chg.create_an_account_txt[config.language]}
            </Text>
          </View>
          {/* //==================for tab ============= */}

          <View style={styles.Maintab}>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => {
                this.setState({ Tab: 0 });
              }}
              style={{
                width: "50%",
                alignSelf: "center",
                paddingHorizontal: (mobileW * 0.5) / 100,
              }}
            >
              {this.state.Tab == 0 ? (
                <View style={styles.Active_View}>
                  <LinearGradient
                    colors={[Colors.light_greencolor, Colors.purple_color]}
                    start={{ x: 1, y: 0 }}
                    end={{ x: 0, y: 1 }}
                    style={{
                      width: "100%",
                      alignSelf: "center",
                      alignItems: "center",
                      borderBottomColor: Colors.whiteColor,
                      borderBottomWidth: 4,
                      paddingVertical: (mobileH * 1.4) / 100,
                      borderRadius: (mobileW * 1) / 100,
                    }}
                  >
                    <Text
                      style={{
                        fontSize: (mobileW * 3.7) / 100,
                        fontFamily: Font.FontBold,
                        color: Colors.whiteColor,
                      }}
                    >
                      {Lang_chg.User_txt[config.language]}
                    </Text>
                  </LinearGradient>
                </View>
              ) : (
                <View style={styles.Deactive_View}>
                  <Text
                    style={{
                      fontSize: (mobileW * 3.7) / 100,
                      fontFamily: Font.FontBold,
                      color: Colors.greyColor,
                    }}
                  >
                    {Lang_chg.User_txt[config.language]}
                  </Text>
                </View>
              )}
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => {
                this.setState({ Tab: 1 });
              }}
              style={{
                width: "50%",
                alignSelf: "center",
                paddingHorizontal: (mobileW * 0.5) / 100,
              }}
            >
              {this.state.Tab == 1 ? (
                <View style={styles.Active_View}>
                  <LinearGradient
                    colors={[Colors.light_greencolor, Colors.purple_color]}
                    start={{ x: 1, y: 0 }}
                    end={{ x: 0, y: 1 }}
                    style={{
                      width: "100%",
                      alignSelf: "center",
                      alignItems: "center",
                      borderBottomColor: Colors.whiteColor,
                      borderBottomWidth: 4,
                      paddingVertical: (mobileH * 1.4) / 100,
                      borderRadius: (mobileW * 1) / 100,
                    }}
                  >
                    <Text
                      style={{
                        fontSize: (mobileW * 3.7) / 100,
                        fontFamily: Font.FontBold,
                        color: Colors.whiteColor,
                      }}
                    >
                      {Lang_chg.Vendor_txt[config.language]}
                    </Text>
                  </LinearGradient>
                </View>
              ) : (
                <View style={styles.Deactive_View}>
                  <Text
                    style={{
                      fontSize: (mobileW * 3.7) / 100,
                      fontFamily: Font.FontBold,
                      color: Colors.greyColor,
                    }}
                  >
                    {Lang_chg.Vendor_txt[config.language]}
                  </Text>
                </View>
              )}
            </TouchableOpacity>
          </View>
          {/* ------------------------------for tab 0--------------- */}
          <View>
            <View
              style={{
                width: mobileW,
                alignItems: "center",
                alignSelf: "center",
              }}
            >
              <View
                style={{
                  width: (mobileW * 90) / 100,
                  alignItems: "center",
                  alignSelf: "center",
                }}
              >
                {/* //==========Name========// */}
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
                  colors={[Colors.bluegreen_color, Colors.voilet_color]}
                  start={{ x: 0, y: 1 }}
                  end={{ x: 0, y: 0 }}
                  style={styles.linearGradient}
                >
                  <View style={styles.innerContainer}>
                    <View
                      style={{
                        marginLeft: (mobileW * 4) / 100,
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
                        borderColor: Colors.black_color,
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
                      placeholder={"Enter Name"}
                      //placeholder={Lang_chg.fullname_txt[config.language]}
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
                        this.setState({ fullname: txt });
                      }}
                      value={this.state.fullname}
                      // editable={this.state.fullname_edit}
                      maxLength={50}
                    />
                  </View>
                </LinearGradient>

                {/* //==========Phone======// */}
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
                    {Lang_chg.phone_txt[config.language]}
                  </Text>
                </View>
                <LinearGradient
                  colors={[Colors.bluegreen_color, Colors.voilet_color]}
                  start={{ x: 0, y: 1 }}
                  end={{ x: 0, y: 0 }}
                  style={styles.linearGradient}
                >
                  <View style={styles.innerContainer}>
                    <TouchableOpacity
                      activeOpacity={0.7}
                      onPress={() => {
                        this.setState({
                          phonecode_modal: true,
                          searchPhoneCode: "",
                          phonecode_arr: this.state.phonecode_arr_search,
                        });
                      }}
                      style={{
                        alignSelf: "center",
                        flexDirection: "row",
                        justifyContent: "flex-start",
                        paddingHorizontal: (mobileW * 0.5) / 100,
                      }}
                    >
                      <View
                        style={{
                          marginLeft: (mobileW * 2.5) / 100,
                          alignSelf: "center",
                          flexDirection: "row",
                          justifyContent: "flex-start",
                        }}
                      >
                        <Image
                          resizeMode="contain"
                          style={{ width: (mobileW * 4.5) / 100 }}
                          // source={require('./Icons/phone.png')}
                          source={localimag.mobile_number}
                        ></Image>
                        <Image
                          resizeMode="contain"
                          style={{
                            width: (mobileW * 4.9) / 100,
                            alignSelf: "center",
                            marginLeft: (mobileW * 1) / 100,
                            height: (mobileW * 4.9) / 100,
                          }}
                          source={
                            this.state.flag != "" && { uri: this.state.flag }
                          }
                        ></Image>
                      </View>
                      {/* {config.device_type == 'android' ? */}
                      <View
                        style={{
                          height: (mobileH * 4) / 100,
                          borderEndWidth: 1,
                          borderColor: Colors.black_color,
                          alignItems: "center",
                          justifyContent: "center",
                          paddingHorizontal: (mobileW * 0.2) / 100,
                          alignSelf: "center",
                          flexDirection: "row",
                          justifyContent: "flex-start",
                          marginLeft: (mobileW * 1) / 100,
                        }}
                      >
                        <Text
                          style={{
                            fontFamily: Font.FontRegular,
                            fontSize: (mobileW * 3.5) / 100,
                            color: Colors.black_color,
                            marginLeft: (mobileW * 0.8) / 100,
                          }}
                        >
                          {"(+" + this.state.phonecode + ")"}
                        </Text>
                        <Image
                          resizeMode="contain"
                          style={{
                            width: (mobileW * 2.3) / 100,
                            height: (mobileH * 2) / 100,
                            alignItems: "center",
                            marginLeft: (mobileW * 0.5) / 100,
                          }}
                          source={localimag.dropdown_black}
                        ></Image>
                      </View>
                    </TouchableOpacity>
                    <TextInput
                      style={{
                        fontSize: (mobileW * 3.7) / 100,
                        fontFamily: Font.FontRegular,
                        marginLeft: (mobileW * 1.5) / 100,
                        color: Colors.black_color,
                        backgroundColor: Colors.whiteColor,
                        paddingVertical: (mobileH * 1.8) / 100,
                        width: (mobileW * 55) / 100,
                        alignSelf: "center",
                        alignItems: "center",
                      }}
                      placeholderTextColor={Colors.edit_border_color}
                      placeholder="Enter Number"
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
                      maxLength={15}
                    />
                  </View>
                </LinearGradient>
                {/* //========Location=====// */}
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
                    {Lang_chg.Location_txt[config.language]}
                  </Text>
                </View>
                <TouchableOpacity
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
                      // paddingVertical: mobileW * 1 / 100
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
                        // paddingVertical: mobileW * 0.5 / 100
                      }}
                    >
                      <View
                        style={{
                          marginLeft: (mobileW * 4) / 100,
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
                          borderColor: Colors.bluegreen_color,
                          alignItems: "flex-start",
                          justifyContent: "flex-start",
                          width: (mobileW * 3) / 100,
                          alignSelf: "center",
                          height: (mobileH * 3.5) / 100,
                        }}
                      >
                        <Text style={{}}></Text>
                      </View>
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
                        <Image
                          style={{
                            width: (mobileW * 4) / 100,
                            height: (mobileW * 4) / 100,
                            resizeMode: "contain",
                            marginTop: (mobileH * 0.5) / 100,
                            tintColor: Colors.greyColor,
                            alignSelf: "center",
                          }}
                          source={localimag.backr}
                        ></Image>
                      </View>
                    </View>
                  </LinearGradient>
                </TouchableOpacity>
                {/* //==============Email=========// */}
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
                    {Lang_chg.email_txt[config.language]}
                  </Text>
                </View>
                <LinearGradient
                  colors={[Colors.bluegreen_color, Colors.voilet_color]}
                  start={{ x: 0, y: 1 }}
                  end={{ x: 0, y: 0 }}
                  style={styles.linearGradient}
                >
                  <View style={styles.innerContainer}>
                    <View
                      style={{
                        marginLeft: (mobileW * 4) / 100,
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
                        borderColor: Colors.bluegreen_color,
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
                      style={{
                        fontSize: (mobileW * 3.7) / 100,
                        fontFamily: Font.FontRegular,
                        marginLeft: (mobileW * 1.5) / 100,
                        color:
                          this.state.social_data.social_type == "google"
                            ? Colors.greyColor
                            : Colors.black_color,
                        backgroundColor: Colors.whiteColor,
                        paddingVertical: (mobileH * 1.8) / 100,
                        width: (mobileW * 62) / 100,
                        alignSelf: "center",
                        alignItems: "center",
                      }}
                      placeholderTextColor={Colors.black_color}
                      placeholder={"Enter Email"}
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
                      editable={
                        this.state.social_data.social_type == "google"
                          ? false
                          : true
                      }
                      maxLength={100}
                    />
                  </View>
                </LinearGradient>

                {/* //==============Password=========// */}
                {this.state.password_hide != true && (
                  <>
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
                        {Lang_chg.password_txt[config.language]}
                      </Text>
                    </View>

                    <LinearGradient
                      colors={[Colors.voilet_color, Colors.bluegreen_color]}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 0, y: 1 }}
                      style={styles.linearGradient}
                    >
                      <View style={styles.innerContainer}>
                        <View
                          style={{
                            marginLeft: (mobileW * 3.5) / 100,
                            alignSelf: "center",
                          }}
                        >
                          <Image
                            resizeMode="contain"
                            style={{
                              width: (mobileW * 5) / 100,
                              height: (mobileW * 5) / 100,
                            }}
                            source={localimag.password}
                          ></Image>
                        </View>

                        <View
                          style={{
                            borderEndWidth: 1,
                            borderColor: Colors.bluegreen_color,
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
                          secureTextEntry={this.state.securetext1}
                          placeholderTextColor={Colors.black_color}
                          placeholder={Lang_chg.enter_password[config.language]}
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
                            this.setState({ password: txt });
                          }}
                          maxLength={16}
                        />
                        <TouchableOpacity
                          activeOpacity={0.7}
                          style={{
                            justifyContent: "center",
                            alignSelf: "center",
                          }}
                          onPress={() => {
                            this.eyepress1();
                          }}
                        >
                          {this.state.securetext1 ? (
                            <Text
                              style={{
                                color: Colors.black_color,
                                fontFamily: Font.FontBold,
                                fontSize: (mobileW * 3.5) / 100,
                              }}
                            >
                              {Lang_chg.Show[config.language]}
                            </Text>
                          ) : (
                            <Text
                              style={{
                                color: Colors.black_color,
                                fontFamily: Font.FontBold,
                                fontSize: (mobileW * 3.5) / 100,
                              }}
                            >
                              {" "}
                              {Lang_chg.Hide[config.language]}
                            </Text>
                          )}
                        </TouchableOpacity>
                      </View>
                    </LinearGradient>
                  </>
                )}

                {/* //==============Confirm Password=========// */}
                {this.state.password_hide != true && (
                  <>
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
                        {Lang_chg.confirmpassword_txt[config.language]}
                      </Text>
                    </View>

                    <LinearGradient
                      colors={[Colors.bluegreen_color, Colors.voilet_color]}
                      start={{ x: 0, y: 1 }}
                      end={{ x: 0, y: 0 }}
                      style={styles.linearGradient}
                    >
                      <View style={styles.innerContainer}>
                        <View
                          style={{
                            marginLeft: (mobileW * 3.5) / 100,
                            alignSelf: "center",
                          }}
                        >
                          <Image
                            resizeMode="contain"
                            style={{
                              width: (mobileW * 5) / 100,
                              height: (mobileW * 5) / 100,
                            }}
                            source={localimag.password}
                          ></Image>
                        </View>
                        <View
                          style={{
                            borderEndWidth: 1,
                            borderColor: Colors.bluegreen_color,
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
                          secureTextEntry={this.state.securetext2}
                          placeholderTextColor={Colors.black_color}
                          placeholder={Lang_chg.cpass_txt[config.language]}
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
                            this.setState({ confirmpassword: txt });
                          }}
                          maxLength={16}
                        />
                        <TouchableOpacity
                          activeOpacity={0.7}
                          style={{
                            justifyContent: "center",
                            alignSelf: "center",
                          }}
                          onPress={() => {
                            this.eyepress2();
                          }}
                        >
                          {this.state.securetext2 ? (
                            <Text
                              style={{
                                color: Colors.black_color,
                                fontFamily: Font.FontBold,
                                fontSize: (mobileW * 3.5) / 100,
                              }}
                            >
                              {Lang_chg.Show[config.language]}
                            </Text>
                          ) : (
                            <Text
                              style={{
                                color: Colors.black_color,
                                fontFamily: Font.FontBold,
                                fontSize: (mobileW * 3.5) / 100,
                              }}
                            >
                              {" "}
                              {Lang_chg.Hide[config.language]}
                            </Text>
                          )}
                        </TouchableOpacity>
                      </View>
                    </LinearGradient>
                  </>
                )}

                {/* //==============Accept Terms & Privacy=========// */}
                <View
                  style={{
                    width: (mobileW * 88) / 100,
                    marginTop: (mobileH * 2) / 100,
                    //  backgroundColor: 'green',
                    flexDirection: "row",
                    // justifyContent: 'space-between',
                    alignItems: "center",
                  }}
                >
                  <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={() => this.remember_me()}
                    style={{ flexDirection: "row", alignItems: "center" }}
                  >
                    {this.state.remember_me ? (
                      <Image
                        resizeMode="contain"
                        style={{
                          width: (mobileW * 4) / 100,
                          height: (mobileW * 4) / 100,
                        }}
                        source={localimag.check_box}
                      ></Image>
                    ) : (
                      <Image
                        resizeMode="contain"
                        style={{
                          width: (mobileW * 4) / 100,
                          height: (mobileW * 4) / 100,
                        }}
                        source={localimag.uncheck}
                      ></Image>
                    )}
                    {/* <MaterialCommunityIcons name='check-box-outline' size={25} color={Colors.theme_color} /> :
                                     <MaterialCommunityIcons name='checkbox-blank-outline' size={25} color={Colors.theme_color} />} */}
                    <Text
                      style={{
                        color: Colors.black_color,
                        fontFamily: Font.FontBold,
                        fontSize: (mobileW * 3.5) / 100,
                        marginLeft: (mobileW * 2) / 100,
                      }}
                    >
                      {Lang_chg.iaccept_txt[config.language]}
                    </Text>
                  </TouchableOpacity>

                  {/* <Text style={{ color: Colors.black_color, fontFamily: Font.FontBold, fontSize: mobileW * 3 / 100, marginLeft: mobileW * 2 / 100 }}>{Lang_chg.iaccept_txt[config.language]}</Text> */}
                  <TouchableOpacity
                    onPress={() => {
                      if (this.state.Tab == 0) {
                        consolepro.consolelog("TAb----------0");
                        this.props.navigation.navigate("Contentpage", {
                          pagename: Lang_chg.terms_txt[config.language],
                          contentpage: 2,
                        });
                      } else {
                        consolepro.consolelog("TAb----------1");
                        this.props.navigation.navigate("VendorContentpage", {
                          pagename: Lang_chg.terms_txt[config.language],
                          contentpage: 2,
                        });
                      }
                    }}
                    style={{
                      borderBottomWidth: 1,
                      marginLeft: (mobileW * 1) / 100,
                      height: (mobileH * 2.5) / 100,
                    }}
                  >
                    <Text
                      style={{
                        color: Colors.black_color,
                        fontFamily: Font.FontBold,
                        fontSize: (mobileW * 3.5) / 100,
                      }}
                    >
                      {Lang_chg.terms_txt[config.language]}
                    </Text>
                  </TouchableOpacity>
                  <Text
                    style={{
                      color: Colors.black_color,
                      fontFamily: Font.FontBold,
                      fontSize: (mobileW * 3.5) / 100,
                      marginLeft: (mobileW * 1) / 100,
                    }}
                  >
                    {Lang_chg.and_txt[config.language]}
                  </Text>
                  <TouchableOpacity
                    onPress={() => {
                      if (this.state.Tab == 0) {
                        consolepro.consolelog("TAb----------0");

                        this.props.navigation.navigate("Contentpage", {
                          pagename:
                            Lang_chg.Privacy_policy_txt[config.language],
                          contentpage: 1,
                        });
                      } else {
                        consolepro.consolelog("TAb----------1");
                        this.props.navigation.navigate("VendorContentpage", {
                          pagename:
                            Lang_chg.Privacy_policy_txt[config.language],
                          contentpage: 1,
                        });
                      }
                    }}
                    style={{}}
                  >
                    <View
                      style={{
                        borderBottomWidth: 1,
                        marginLeft: (mobileW * 1) / 100,
                        height: (mobileH * 2.5) / 100,
                      }}
                    >
                      <Text
                        style={{
                          color: Colors.black_color,
                          fontFamily: Font.FontBold,
                          fontSize: (mobileW * 3.5) / 100,
                          marginLeft: (mobileW * 1) / 100,
                        }}
                      >
                        {Lang_chg.Privacy_policy_txt[config.language]}
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>

                {/* //==============Create Submit =========// */}
                <View style={{ alignItems: "center", alignSelf: "center" }}>
                  <TouchableOpacity
                    onPress={() =>
                      this.state.social_data == "NA"
                        ? this.signup_btn()
                        : this._btnSocialDataSubmit()
                    }
                    activeOpacity={0.7}
                    style={{ alignItems: "center", alignSelf: "center" }}
                  >
                    <LinearGradient
                      colors={[Colors.purple_color, Colors.light_greencolor]}
                      start={{ x: 0, y: 1 }}
                      end={{ x: 1, y: 0 }}
                      // onPress={() => this.loginBtn()}
                      // activeOpacity={0.7}
                      style={{
                        //backgroundColor: Colors.theme_color,
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
                        {Lang_chg.create_account_txt[config.language]}
                      </Text>
                    </LinearGradient>
                  </TouchableOpacity>
                </View>

                {/* //==============Always have an account text=========// */}
                <View
                  style={{
                    alignItems: "center",
                    alignSelf: "center",
                    flexDirection: "row",
                    marginTop: (mobileH * 2) / 100,
                    marginBottom: (mobileH * 4) / 100,
                  }}
                >
                  <Text
                    style={{
                      color: Colors.black_color,
                      fontFamily: Font.FontSemiBold,
                      fontSize: (mobileW * 4) / 100,
                    }}
                  >
                    {Lang_chg.already_txt[config.language]}
                  </Text>
                  <TouchableOpacity
                    onPress={() => {
                      global_user_address = "";
                      localStorage.setItemObject("socialdata", null);
                      this.props.navigation.navigate("Login");
                    }}
                    activeOpacity={0.7}
                    style={{
                      marginLeft: (mobileW * 1) / 100,
                    }}
                  >
                    <Text
                      style={{
                        color: Colors.dark_greencolor,
                        fontFamily: Font.FontSemiBold,
                        fontSize: (mobileW * 4) / 100,
                      }}
                    >
                      {Lang_chg.sign_in_txt[config.language]}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </KeyboardAwareScrollView>
      </SafeAreaView>
    );
  }
}
export default Signup;

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
    color: Colors.black_color,
    backgroundColor: Colors.whiteColor,
    paddingVertical: (mobileH * 1.8) / 100,
    width: (mobileW * 62) / 100,
    alignSelf: "center",
    alignItems: "center",
    // backgroundColor: 'transparent',
  },
  buttonText1: {
    fontSize: (mobileW * 3.7) / 100,
    fontFamily: Font.FontRegular,
    marginLeft: (mobileW * 1.5) / 100,
    color: Colors.black_color,
    backgroundColor: Colors.whiteColor,
    paddingVertical: (mobileH * 3) / 100,
    width: (mobileW * 70) / 100,
    alignSelf: "center",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    // alignItems: 'center'
    // backgroundColor: 'transparent',
  },
  Active_View: {
    width: "100%",
    alignSelf: "center",
    alignItems: "center",
    marginTop: (mobileH * 0.7) / 100,
    borderBottomColor: Colors.whiteColor,
    borderBottomWidth: 4,
  },
  Deactive_View: {
    width: "100%",
    alignSelf: "center",
    alignItems: "center",
    backgroundColor: Colors.border_color,
    paddingVertical: (mobileH * 1.4) / 100,
    borderRadius: (mobileW * 1) / 100,
    //  paddingHorizontal:mobileW*2/100
  },
  Active_txt: {
    fontSize: (mobileW * 3.4) / 100,
    fontFamily: Font.mediumFont,
    color: Colors.whiteColor,
  },
  Deactive_txt: {
    fontSize: (mobileW * 3.4) / 100,
    fontFamily: Font.mediumFont,
    color: Colors.black,
  },
  Maintab: {
    width: "90%",
    alignSelf: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    borderRadius: (mobileW * 1) / 100,
    backgroundColor: Colors.whiteColor,
    // shadowColor: "#000000",
    marginTop: (mobileH * 4) / 100,
    // shadowOffset: { width: 0, height: 13, backgroundColor:'red'},
    // shadowOpacity: 0.17, shadowRadius: 3.05, elevation: 3
  },
  linearGradient1: {
    marginTop: (mobileH * 1) / 100,
    height: (mobileH * 9) / 100,
    width: (mobileW * 100) / 100,

  },
  innerContainer1: {
    backgroundColor: Colors.whiteColor,
    flexDirection: "row",
    justifyContent: "space-between",
    width: (mobileW * 72) / 100,
    alignSelf: "center",
    marginLeft: (mobileW * 2) / 100,
    paddingVertical: (mobileW * 1) / 100,
  },
});
