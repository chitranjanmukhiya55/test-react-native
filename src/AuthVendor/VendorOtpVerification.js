import React, { Component, useRef } from "react";
import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  ImageBackground,
  Image,
  TouchableOpacity,
  TextInput,
  BackHandler,
  Alert,
  Keyboard,
} from "react-native";
import OTPTextView from "react-native-otp-textinput";
import {
  GradientText,
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
} from "../Provider/utilslib/Utils";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import CountDown from "react-native-countdown-component";
import LinearGradient from "react-native-linear-gradient";
import { LinearTextGradient } from "react-native-text-gradient";

export default class VendorOtpVerification extends Component {
  constructor(props) {
    super(props);
    this.state = {
      otpText: "",
      otp: "",
      showbtn: false,
      email: this.props.route.params.email,
      user_id: this.props.route.params.user_id,
    };
  }
  componentDidMount() {
    this.props.navigation.addListener("focus", () => {
      consolepro.consolelog("email", email);
      consolepro.consolelog("user_id", user_id);
    });
  }

  //--------------------------resend funcation ---------------------
  Resendotpbtn = async () => {
    if (config.app_status == 0) {
      this.setState({ showbtn: false });
      return false;
    } else {
      Keyboard.dismiss();
      let result = await localStorage.getItemString("user_id");
      consolepro.consolelog("result", result);
      let user_id_get = 0;
      if (result != null) {
        user_id_get = result;
        this.setState({
          user_id: user_id_get,
        });
      }
      let url = config.baseURL + "resend_otp.php";
      var data = new FormData();
      data.append("user_id", user_id_get);
      consolepro.consolelog("data", data);
      apifuntion
        .postApi(url, data, 1)
        .then((obj) => {
          consolepro.consolelog("user_arr", obj);
          if (obj.success == "true") {
            let otp = obj.otp.toString();
            var email_arr = obj.email_arr;
            consolepro.consolelog("resend", obj);
            this.setState({ showbtn: false });
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
    }
  };

  //-------------------otp verification funcation----------------------

  Otpveryfication = async () => {
    if (config.app_status == 0) {
      this.props.navigation.navigate("Home");
      return false;
    } else {
      Keyboard.dismiss();
      let result = await localStorage.getItemString("user_id");
      consolepro.consolelog("result", result);
      let user_id_get = 0;
      if (result != null) {
        user_id_get = result;
        this.setState({
          user_id: user_id_get,
        });
      }
      var otp = this.state.otp;
      if (otp.length <= 0) {
        msgProvider.toast(msgText.emptyOtp[config.language], "center");
        return false;
      }
      if (otp.length < 4) {
        msgProvider.toast(msgText.otpMinLength[config.language], "center");
        return false;
      }
      let url = config.baseURL + "otp_verify.php";
      var data = new FormData();
      data.append("user_id", user_id_get);
      data.append("otp", otp);
      consolepro.consolelog("data", data);
      apifuntion
        .postApi(url, data, 1)
        .then((obj) => {
          consolepro.consolelog("otp res", obj);
          if (obj.success == "true") {
            var user_arr = obj.user_details;
            let user_id = user_arr.user_id;
            let email = user_arr.email;
            let otp_verify = user_arr.otp_verify;
            let profile_complete = user_arr.profile_complete;
            var notification_arr = obj.notification_arr;
            consolepro.consolelog({ notification_arr });
            if (otp_verify == 0) {
              this.setState({
                user_id: user_id,
                email: email,
                showbtn: false,
              });
            }
            if (otp_verify == 1) {
              {
                consolepro.consolelog({ notification_arr });
                if (notification_arr != "NA") {
                  consolepro.consolelog({ notification_arr });
                  notification.notification_arr(notification_arr);
                }
                this.setState({
                  otppopup: false,
                });
                localStorage.setItemString("user_id", JSON.stringify(user_id));
                localStorage.setItemObject("user_arr", user_arr);
                localStorage.setItemString("email", this.state.email);
                this.props.navigation.navigate("Home");
              }
            }
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
  };

  render() {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: Colors.theme_color }}>
        <StatusBar
          barStyle="dark-content"
          backgroundColor={Colors.whiteColor}
          hidden={false}
          translucent={false}
          networkActivityIndicatorVisible={true}
        />
        {/* ........................Background...................... */}

        <LinearGradient
          colors={[Colors.purple_color, Colors.light_greencolor]}
          start={{ x: 1, y: 1 }}
          end={{ x: 0, y: 0 }}
          // onPress={() => this.loginBtn()}
          // activeOpacity={0.7}
          style={{
            flex: 1,
            //backgroundColor: Colors.theme_color,
            height: mobileH,
            width: mobileW,
          }}
        >
          <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
            <TouchableOpacity
              onPress={() => {
                this.props.navigation.goBack();
              }}
              style={{
                flexDirection: "row",
                padding: (mobileW * 4) / 100,
              }}
            >
              <Image
                style={{
                  height: (mobileW * 5) / 100,
                  width: (mobileW * 5) / 100,
                  resizeMode: "contain",
                }}
                source={localimag.back}
              ></Image>
            </TouchableOpacity>
            <View
              style={{
                paddingHorizontal: (mobileW * 4) / 100,
                paddingVertical: (mobileW * 4) / 100,
                flexDirection: "row",
                justifyContent: "center",
              }}
            >
              <Text
                style={{
                  color: Colors.whiteColor,
                  fontSize: (mobileW * 5) / 100,
                  fontFamily: Font.FontSemiBold,
                }}
              >
                {Lang_chg.Otp_verification_txt[config.language]}
              </Text>
            </View>
            <View
              style={{
                paddingHorizontal: (mobileW * 4) / 100,
                paddingVertical: (mobileW * 1) / 100,
                flexDirection: "row",
                justifyContent: "center",
              }}
            >
              <Text
                style={{
                  color: Colors.whiteColor,
                  fontSize: (mobileW * 3.9) / 100,
                  fontFamily: Font.FontSemiBold,
                }}
              >
                {Lang_chg.please_type_the_verification_txt[config.language]}
              </Text>
            </View>

            <View
              style={{
                flexDirection: "row",
                paddingHorizontal: (mobileW * 4) / 100,
                paddingVertical: (mobileW * 1) / 100,
                justifyContent: "center",
              }}
            >
              <Text
                style={{
                  color: Colors.whiteColor,
                  fontFamily: Font.FontRegular,
                  fontSize: (mobileW * 3.9) / 100,
                }}
              >
                {Lang_chg.Evelynhorpergmail_txt[config.language]}
              </Text>
            </View>
            {/* .....................Text input............... */}

            <OTPTextView
              handleTextChange={(text) => {
                this.setState({ otp: text }), console.log(text);
              }}
              containerStyle={{
                marginVertical: (mobileW * 10) / 100,
                width: (mobileW * 55) / 100,
                alignSelf: "center",
                justifyContent: "center",
              }}
              textInputStyle={{
                borderRadius: (mobileW * 30) / 100,
                borderWidth: (mobileW * 0.2) / 100,
                height: (mobileW * 13.3) / 100,
                width: (mobileW * 13.3) / 100,
                color: Colors.black_color,
                backgroundColor: Colors.whiteColor,
              }}
              inputCount={4}
              inputCellLength={1}
              // tintColor={Colors.orange}
              tintColor={Colors.whiteColor}
              offTintColor={Colors.whiteColor}
            />
            {/* ..............button............. */}
            <TouchableOpacity
              onPress={() =>
                this.props.navigation.navigate("AddBussinessDetails2")
              }
              activeOpacity={0.7}
              style={{
                height: (mobileW * 13) / 100,
                width: (mobileW * 77) / 100,
                backgroundColor: Colors.whiteColor,
                alignSelf: "center",
                borderRadius: (mobileW * 1.5) / 100,
                alignItems: "center",
                justifyContent: "center",
                marginTop: (mobileW * 7) / 100,
              }}
            >
              <GradientText
                colors={[Colors.voilet_color, Colors.dark_greencolor]}
              >
                <Text
                  style={{
                    fontSize: (mobileW * 5) / 100,
                    color: Colors.purple_color,
                    fontFamily: Font.FontSemiBold,
                  }}
                >
                  {Lang_chg.verify_txt[config.language]}
                </Text>
              </GradientText>
            </TouchableOpacity>

            <TouchableOpacity
              // onPress={() => {
              //     this.Otpveryfication()
              // }}
              activeOpacity={0.7}
              style={{
                height: (mobileW * 13) / 100,
                width: (mobileW * 77) / 100,
                backgroundColor: "transparent",
                alignSelf: "center",
                borderRadius: (mobileW * 1.5) / 100,
                alignItems: "center",
                justifyContent: "center",
                marginTop: (mobileW * 7) / 100,
                borderColor: Colors.whiteColor,
                borderWidth: (mobileW * 0.4) / 100,
              }}
            >
              <Text
                style={{
                  fontSize: (mobileW * 4.7) / 100,
                  color: Colors.whiteColor,
                  fontFamily: Font.FontSemiBold,
                }}
              >
                {Lang_chg.Modify_Email_txt[config.language]}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              // onPress={() => {
              //     this.Otpveryfication()
              // }}
              activeOpacity={0.7}
              style={{
                height: (mobileW * 13) / 100,
                width: (mobileW * 77) / 100,
                backgroundColor: "transparent",
                alignSelf: "center",
                borderRadius: (mobileW * 1.5) / 100,
                alignItems: "center",
                justifyContent: "center",
                marginTop: (mobileW * 7) / 100,
                borderColor: Colors.whiteColor,
                borderWidth: (mobileW * 0.4) / 100,
              }}
            >
              <Text
                style={{
                  fontSize: (mobileW * 4.7) / 100,
                  color: Colors.whiteColor,
                  fontFamily: Font.FontSemiBold,
                }}
              >
                {Lang_chg.resend_txt[config.language]}
                {/* {Lang_chg.verify_txt[config.language]} */}
              </Text>
            </TouchableOpacity>

      
          </KeyboardAwareScrollView>
        </LinearGradient>
      </SafeAreaView>
    );
  }
}
