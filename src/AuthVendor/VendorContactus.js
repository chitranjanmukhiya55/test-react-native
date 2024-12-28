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
} from "../Provider/utilslib/Utils";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import LinearGradient from "react-native-linear-gradient";

class VendorContactus extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      fullname: "",
      message: "",
      user_id: 0,
      maxLength: 250,
      textLength: 0,
    };
  }

  componentDidMount() {
    alert("hello");
    consolepro.consolelog("I am on student contact us  page");
    this._setUserProfile();
  }

  //-----------set user profile details from local------------------------
  _setUserProfile = async () => {
    let result = await localStorage.getItemObject("user_arr");
    console.log("result", result);
    if (result != null) {
      this.setState({
        name: result.name,
        user_id: result.user_id,
        email: result.email,
      });
    }
  };

  //------------submit btn------------//
  submitBtn = () => {
    consolepro.consolelog("I am in submit btn");
    if (config.app_status == 0) {
      this.props.navigation.goBack();
    } else {
      let { user_id, name, email, message } = this.state;
      consolepro.consolelog({ user_id, name, email, message });

      //------------------name===================
      if (name.trim().length <= 0) {
        msgProvider.toast(msgText.emptyName[config.language], "center");
        return false;
      }
      if (name.trim().length <= 2) {
        msgProvider.toast(msgText.nameMinLength[config.language], "center");
        return false;
      }
      //===========email============================
      if (email.length <= 0) {
        msgProvider.toast(msgText.emptyEmail[config.language], "center");
        return false;
      }
      var emailvalidation = config.emailvalidation;
      if (emailvalidation.test(email) !== true) {
        msgProvider.toast(msgText.validEmail[config.language], "center");
        return false;
      }
      //-----------------------message--------------
      if (message.trim().length <= 0) {
        msgProvider.toast(
          msgText.emptyContactMessage[config.language],
          "center"
        );
        return false;
      }
      if (message.trim().length <= 2) {
        msgProvider.toast(msgText.messageMinLength[config.language], "center");
        return false;
      }
      let url = config.baseURL + "contact_us.php";
      var data = new FormData();
      data.append("user_id", user_id);
      data.append("name", name.trim());
      data.append("email", email);
      data.append("message", message.trim());
      consolepro.consolelog("data", data);
      apifuntion
        .postApi(url, data)
        .then((obj) => {
          consolepro.consolelog("email_arr", obj);
          if (obj.success == "true") {
            let email_arr = obj.email_arr;
            setTimeout(() => {
              msgProvider.toast(obj.msg[config.language], "center");
            }, 300);
            this.props.navigation.goBack();
            return false;
          } else {
            if (obj.active_status == 0) {
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
                {Lang_chg.Contactus[config.language]}
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
                style={{ marginLeft: (mobileW * 2) / 100, alignSelf: "center" }}
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
                editable={this.state.fullname_edit}
                maxLength={50}
              />
            </View>
          </LinearGradient>
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
                style={{ marginLeft: (mobileW * 2) / 100, alignSelf: "center" }}
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
                placeholder={Lang_chg.email_txt[config.language]}
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
                editable={this.state.email_edit}
                maxLength={100}
              />
            </View>
          </LinearGradient>

          {/* //=========Massage======// */}
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
              {Lang_chg.Message_text[config.language]}
            </Text>
          </View>
          <LinearGradient
            colors={[Colors.bluegreen_color, Colors.voilet_color]}
            start={{ x: 0, y: 1 }}
            end={{ x: 0, y: 0 }}
            style={styles.linearGradient1}
          >
            <View style={styles.innerContainer}>
              <View
                style={{
                  marginLeft: (mobileW * 2.2) / 100,
                  marginTop: (mobileH * 2.3) / 100,
                }}
              >
                <Image
                  resizeMode="contain"
                  style={{
                    width: (mobileW * 4.2) / 100,
                    height: (mobileW * 4.2) / 100,
                  }}
                  source={localimag.edit}
                ></Image>
              </View>
              <View
                style={{
                  borderEndWidth: 1,
                  borderColor: Colors.greyColor,
                  alignItems: "flex-start",
                  justifyContent: "flex-start",
                  width: (mobileW * 3) / 100,
                  height: (mobileH * 3.5) / 100,
                  marginTop: (mobileH * 1.5) / 100,
                }}
              >
                <Text style={{}}></Text>
              </View>
              <TextInput
                style={styles.buttonText1}
                placeholderTextColor={Colors.greyColor}
                placeholder="Message"
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
                  this.setState({
                    textLength: this.state.maxLength - txt.length,
                    message: txt,
                  });
                }}
                value={this.state.message}
                maxLength={250}
              />
            </View>
          </LinearGradient>
          {/* {this.state.textLength != 0 && */}
          <Text
            style={{
              fontSize: (mobileW * 3) / 100,
              fontFamily: Font.FontPoppinsRegular,
              color: Colors.black_color,
              textAlign: "right",
              width: "95%",
            }}
          >
            {this.state.textLength + "/" + this.state.maxLength}
          </Text>
          {/* } */}
          {/* //=========button============// */}
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate("VendorSetting")}
            // onPress={() => this.props.navigation.navigate('CreatePassword')}
            // onPress={()=>{this.submitBtn()}}
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
                {Lang_chg.send_txt[config.language]}
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        </KeyboardAwareScrollView>
      </SafeAreaView>
    );
  }
}
export default VendorContactus;

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
  linearGradient1: {
    marginTop: (mobileH * 1) / 100,
    height: (mobileH * 20) / 100,
    width: (mobileW * 90) / 100,
    alignSelf: "center",
    borderRadius: (mobileW * 1.5) / 100, // <-- Outer Border Radius
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
    marginTop:
      config.device_type == "ios" ? (mobileH * 1.5) / 100 : (mobileH * 0) / 100,
    backgroundColor: Colors.whiteColor,
    paddingVertical: (mobileH * 1.5) / 100,
    width: (mobileW * 62) / 100,
    alignSelf: "flex-start",
    alignItems: "flex-start",
    // backgroundColor: 'transparent',
  },
});
