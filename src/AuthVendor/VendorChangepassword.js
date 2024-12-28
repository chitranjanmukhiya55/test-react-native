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

class VendorChangepassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      securetext1: true,
      securetext2: true,
      securetext3: true,
      oldpassword: "",
      newpassword: "",
      cpassword: "",
      user_id: 0,
    };
  }

  componentDidMount() {
    this.getUserDetails();
    consolepro.consolelog("iam change password");
  }

  //-------------------function for set user id-----------------

  getUserDetails = async () => {
    let result = await localStorage.getItemString("user_id");
    consolepro.consolelog("result", result);
    if (result != null) {
      let user_id_get = "";
      if (result != null) {
        user_id_get = result;
      }
      this.setState({
        user_id: user_id_get,
      });
    }
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

  //--------------------------function for update password---------------

  submit_btn = () => {
    if (config.app_status == 0) {
      //----for prototype----------//
      consolepro.consolelog("iam prototype");
      this.props.navigation.goBack();
      return false;
    } else {
      let { user_id, oldpassword, newpassword, confirmpassword } = this.state;
      consolepro.consolelog({
        user_id,
        oldpassword,
        newpassword,
        confirmpassword,
      });
      var pattern = config.passwordvalidation;
      // ===============================oldpassword===================
      if (oldpassword.length <= 0) {
        msgProvider.toast(msgText.emptyOldPassword[config.language], "center");
        return false;
      }
      if (oldpassword.length <= 5) {
        msgProvider.toast(
          msgText.oldPasswordMinLength[config.language],
          "center"
        );
        return false;
      }
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

      let url = config.baseURL + "change_password.php";
      var data = new FormData();
      data.append("user_id", user_id);
      data.append("password_old", oldpassword);
      data.append("password_new", newpassword);
      consolepro.consolelog("data", data);
      apifuntion
        .postApi(url, data)
        .then((obj) => {
          consolepro.consolelog("user_arr", obj);
          if (obj.success == "true") {
            localStorage.setItemString("password", newpassword);
            setTimeout(() => {
              msgProvider.toast(obj.msg[config.language], "center");
            }, 300);

            this.props.navigation.goBack();
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
                {Lang_chg.changepassword_txt[config.language]}
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
          contentContainerStyle={{ width: mobileW, alignItems: "center" }}
          keyboardShouldPersistTaps="handled"
        >
          {/* //=========Current Password======// */}
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
              {Lang_chg.Current_txt[config.language]}
            </Text>
          </View>
          <LinearGradient
            colors={[Colors.light_greencolor, Colors.voilet_color]}
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
                secureTextEntry={this.state.securetext1}
                placeholderTextColor={Colors.greyColor}
                placeholder="Current Password"
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
                  this.setState({ oldpassword: txt });
                }}
                maxLength={16}
              />
              <TouchableOpacity
                activeOpacity={0.7}
                style={{ justifyContent: "center", alignSelf: "center" }}
                onPress={() => {
                  this.eyepress1();
                }}
              >
                {this.state.securetext1 ? (
                  <Text
                    style={{
                      color: Colors.black_color,
                      fontFamily: Font.FontBold,
                      fontSize: (mobileW * 3) / 100,
                    }}
                  >
                    {Lang_chg.Show[config.language]}
                  </Text>
                ) : (
                  <Text
                    style={{
                      color: Colors.black_color,
                      fontFamily: Font.FontBold,
                      fontSize: (mobileW * 3) / 100,
                    }}
                  >
                    {Lang_chg.Hide[config.language]}
                  </Text>
                )}
              </TouchableOpacity>
            </View>
          </LinearGradient>

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
            colors={[Colors.light_greencolor, Colors.voilet_color]}
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
                      fontSize: (mobileW * 3) / 100,
                    }}
                  >
                    {Lang_chg.Show[config.language]}
                  </Text>
                ) : (
                  <Text
                    style={{
                      color: Colors.black_color,
                      fontFamily: Font.FontBold,
                      fontSize: (mobileW * 3) / 100,
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
            colors={[Colors.light_greencolor, Colors.voilet_color]}
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
                secureTextEntry={this.state.securetext3}
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
                  this.setState({ cpassword: txt });
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
                      fontSize: (mobileW * 3) / 100,
                    }}
                  >
                    {Lang_chg.Show[config.language]}
                  </Text>
                ) : (
                  <Text
                    style={{
                      color: Colors.black_color,
                      fontFamily: Font.FontBold,
                      fontSize: (mobileW * 3) / 100,
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
  
            onPress={() => {
              this.submit_btn();
            }}
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
                {Lang_chg.Update_Password_txt[config.language]}
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        </KeyboardAwareScrollView>
      </SafeAreaView>
    );
  }
}
export default VendorChangepassword;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.whiteColor,
  },
  view1: {
    backgroundColor: Colors.whiteColor,
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
  icon1s: {
    width: (mobileW * 7) / 100,
    height: (mobileW * 7) / 100,
    resizeMode: "contain",
  },
  createaccount: {
    color: Colors.light_greencolor,
    fontFamily: Font.FontBold,
    fontSize: (mobileW * 4.5) / 100,
  },
});
