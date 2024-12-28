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
export default class OtpVerification extends Component {
  constructor(props) {
    super(props);
    this.state = {
      otpText: "",
      otp: "",
      user_id: 0,
      showbtn: false,
      user_details: this.props.route.params.user_details,
    };
  }
  componentDidMount() {
    consolepro.consolelog("Iam otp page ");
    consolepro.consolelog("user_details", this.state.user_details);
  }

  //--------------------------resend funcation ---------------------
  Resendotpbtn = async () => {
    if (config.app_status == 0) {
      this.setState({ showbtn: false });
      return false;
    } else {
      Keyboard.dismiss();
      let url = config.baseURL + "resend_otp.php";
      var data = new FormData();
      data.append("user_id", this.state.user_details.user_id);
      consolepro.consolelog("data", data);
      apifuntion
        .postApi(url, data)
        .then((obj) => {
          consolepro.consolelog("user_arr", obj);
          if (obj.success == "true") {
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
      consolepro.consolelog("0000");
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
      data.append("user_id", this.state.user_details.user_id);
      data.append("otp", otp);
      consolepro.consolelog("data", data);
      apifuntion
        .postApi(url, data)
        .then((obj) => {
          consolepro.consolelog("otp res", obj);
          // return false
          if (obj.success == "true") {
            var user_arr = obj.user_details;
            let user_type = user_arr.user_type;
            let email = user_arr.email;
            let otp_verify = user_arr.otp_verify;
            let profile_complete = user_arr.profile_complete;
            var notification_arr = obj.notification_arr;
            localStorage.setItemObject("user_arr", user_arr);
            if (user_type == 1) {
              if (otp_verify == 1) {
                this.props.navigation.navigate("Home");
              }
            } else {
              if (otp_verify == 1) {
                this.props.navigation.navigate("AddBussinessDetails2");
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
          colors={[Colors.bluegreen_color, Colors.purple_color]}
          start={{ x: 1, y: 1 }}
          end={{ x: 0, y: 0 }}
          style={{
            flex: 1,
            //backgroundColor: Colors.theme_color,
            height: mobileH,
            width: mobileW,
          }}
        >
          <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
            <View
              style={{
                paddingHorizontal: (mobileW * 4) / 100,
                paddingVertical: (mobileW * 4) / 100,
                flexDirection: "row",
                marginTop: (mobileH * 10) / 100,
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
                {this.state.user_details.email}
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
              activeOpacity={0.7}
              onPress={() => {
                this.Otpveryfication();
              }}
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
                    color: Colors.theme_color,
                    fontFamily: Font.FontBold,
                  }}
                >
                  {Lang_chg.verify_txt[config.language]}
                </Text>
              </GradientText>
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => {
                this.props.navigation.goBack();
              }}
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
                  fontFamily: Font.FontBold,
                }}
              >
                Modify Email
              </Text>
            </TouchableOpacity>
            {this.state.showbtn == false ? (
              <CountDown
                until={5 * 24}
                size={(mobileW * 3.3) / 100}
                onFinish={() => {
                  this.setState({ showbtn: true });
                }}
                digitStyle={{ backgroundColor: Colors.blue1_color }}
                digitTxtStyle={{ color: Colors.redColor }}
                timeLabelStyle={{ color: Colors.redColor, fontSize: 1 }}
                timeToShow={["M", "S"]}
                timeLabels={{ m: "", s: "" }}
                showSeparator={true}
                separatorStyle={{ color: Colors.redColor }}
                style={{
                  marginTop: (mobileW * 7) / 100,
                  paddingBottom: (mobileH * 2) / 100,
                }}
              />
            ) : (
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => {
                  this.Resendotpbtn();
                }}
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
                    fontFamily: Font.FontBold,
                  }}
                >
                  {Lang_chg.resend_txt[config.language]}
                  {/* {Lang_chg.verify_txt[config.language]} */}
                </Text>
              </TouchableOpacity>
            )}
          </KeyboardAwareScrollView>
        </LinearGradient>
      </SafeAreaView>
    );
  }
}
