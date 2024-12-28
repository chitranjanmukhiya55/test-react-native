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
} from "../Provider/utilslib/Utils";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import LinearGradient from "react-native-linear-gradient";

class CreatePassword extends Component {
  _didFocusSubscription;
  _willBlurSubscription;

  constructor(props) {
    super(props);
    this.state = {
      securetext1: true,
      securetext2: true,
      securetext3: true,
      oldpassword: "",
      newpassword: "",
      cpassword: "",
      confirmpassword: "",
      // user_id:this.props.route.params.user_id
    };
    this._didFocusSubscription = props.navigation.addListener(
      "focus",
      (payload) =>
        BackHandler.addEventListener("hardwareBackPress", this.handleBackPress)
    );
  }

  componentDidMount() {
    consolepro.consolelog("iam create password");
    this._willBlurSubscription = this.props.navigation.addListener(
      "blur",
      (payload) =>
        BackHandler.removeEventListener(
          "hardwareBackPress",
          this.handleBackPress
        )
    );
  }

  //    for backhandler
  handleBackPress = () => {
    Alert.alert(
      Lang_chg.go_back_txt[config.language],
      Lang_chg.do_you_want_goback_txt[config.language],
      [
        {
          text: Lang_chg.no_txt[config.language],
          onPress: () => consolepro.consolelog("Cancel Pressed"),
        },
        {
          text: Lang_chg.yes_txt[config.language],
          onPress: () => this.props.navigation.navigate("Login"),
        },
      ],
      {
        cancelable: false,
      }
    ); // works best when the goBack is async
    return true;
  };

  eyepress1 = () => {
    if (this.state.securetext1) {
      this.setState({ securetext1: false });
    } else {
      this.setState({ securetext1: true });
    }
  };
  eyepress2 = () => {
    if (this.state.securetext2) {
      this.setState({ securetext2: false });
    } else {
      this.setState({ securetext2: true });
    }
  };
  eyepress3 = () => {
    if (this.state.securetext3) {
      this.setState({ securetext3: false });
    } else {
      this.setState({ securetext3: true });
    }
  };

  onSubmit = () => {
    consolepro.consolelog("Iamonsubmit...");

    if (config.app_status == 0) {
      //----for prototype----------//
      consolepro.consolelog("iam prototype");
      this.props.navigation.navigate("Login");
      return false;
    } else {
      let { user_id, newpassword, confirmpassword } = this.state;
      consolepro.consolelog({ user_id, newpassword, confirmpassword });
      var pattern = config.passwordvalidation;
      //======================================= newpassword===================
      if (newpassword.length <= 0) {
        msgProvider.toast(msgText.emptyNewPassword[config.language], "center");
        return false;
      }
      if (newpassword.length <= 5) {
        msgProvider.toast(
          msgText.newPasswordMinLength[config.language],
          "center"
        );
        return false;
      }
      //================================confirmpassword===================
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

      if (confirmpassword !== newpassword) {
        msgProvider.toast(msgText.passwordNotMatch[config.language], "center");
        return false;
      }
      //----------------------api calling----------

      let url = config.baseURL + "create_password.php";
      var data = new FormData();
      data.append("user_id", user_id);
      data.append("password", newpassword);
      consolepro.consolelog("data", data);
      // return false
      apifuntion
        .postApi(url, data)
        .then((obj) => {
          consolepro.consolelog("user_arr", obj);
          if (obj.success == "true") {
            setTimeout(() => {
              msgProvider.toast(obj.msg[config.language], "center");
            }, 300);
            this.props.navigation.navigate("Login");
          } else {
            if (obj.account_active_status == 0) {
              config.checkUserDeactivate(this.props.navigation);
              return false;
            }
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
          
            <View
              style={{ width: (mobileW * 100) / 100, alignItems: "center" }}
            >
              <Text
                style={{
                  color: Colors.redColor,
                  fontFamily: Font.FontSemiBold,
                  fontSize: (mobileW * 5) / 100,
                }}
              >
                {Lang_chg.New_Password_txt[config.language]}
              </Text>
            </View>
            <View
              style={{ width: (mobileW * 15) / 100, alignItems: "center" }}
            ></View>
          </LinearGradient>
        </View>
        {/* ------------------header end ---------------- */}

        <KeyboardAwareScrollView
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ width: mobileW, alignItems: "center" }}
          keyboardShouldPersistTaps="handled"
        >
          {/* //========new Password======// */}
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
              {Lang_chg.New_txt[config.language]}
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
                  marginLeft: (mobileW * 2.5) / 100,
                  alignSelf: "center",
                }}
              >
                <Image
                  resizeMode="contain"
                  style={{ width: (mobileW * 5) / 100 }}
                  source={localimag.password}
                ></Image>
              </View>
              <View
                style={{
                  borderEndWidth: 1,
                  borderColor: Colors.greyColor,
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
                placeholderTextColor={Colors.greyColor}
                placeholder="New Password"
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
                  this.setState({ newpassword: txt });
                }}
                maxLength={16}
              />
              <TouchableOpacity
                activeOpacity={0.7}
                style={{ justifyContent: "center", alignSelf: "center" }}
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
                    {Lang_chg.Hide[config.language]}
                  </Text>
                )}
              </TouchableOpacity>
            </View>
          </LinearGradient>

          {/* //=========Cunfirm new Password======// */}
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
                  marginLeft: (mobileW * 2.5) / 100,
                  alignSelf: "center",
                }}
              >
                <Image
                  resizeMode="contain"
                  style={{ width: (mobileW * 5) / 100 }}
                  source={localimag.password}
                ></Image>
              </View>
              <View
                style={{
                  borderEndWidth: 1,
                  borderColor: Colors.greyColor,
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
                placeholder="Confirm Password"
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
                style={{ justifyContent: "center", alignSelf: "center" }}
                onPress={() => {
                  this.eyepress3();
                }}
              >
                {this.state.securetext3 ? (
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
                    {Lang_chg.Hide[config.language]}
                  </Text>
                )}
              </TouchableOpacity>
            </View>
          </LinearGradient>

          {/* //=========button============// */}
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate("Login")}
            // onPress={()=>{
            //     this.onSubmit()
            // }}
            activeOpacity={0.7}
            style={{ alignItems: "center", alignSelf: "center" }}
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
                {Lang_chg.Reset_txt}
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        </KeyboardAwareScrollView>
      </SafeAreaView>
    );
  }
}
export default CreatePassword;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.whiteColor,
  },
  view1: {
    backgroundColor: Colors.back_color,
    height: (mobileH * 8) / 100,

    flexDirection: "row",
    width: (mobileW * 88) / 100,
    alignSelf: "center",
    alignItems: "center",
  },
  setting_icons: {
    height: (mobileH * 6) / 100,
    width: (mobileW * 11) / 100,
    borderRadius: 10,
    backgroundColor: Colors.theme_color,
    alignItems: "center",
    justifyContent: "center",
  },
  setting_view: {
    flexDirection: "row",
    height: (mobileH * 8) / 100,
    justifyContent: "space-between",
    width: (mobileW * 90) / 100,
    alignItems: "center",
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
    width: (mobileW * 65) / 100,
    alignSelf: "center",
    alignItems: "center",
    // backgroundColor: 'transparent',
  },
});
