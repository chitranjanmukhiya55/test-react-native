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
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
import LinearGradient from "react-native-linear-gradient";

class VendorDeleteAccount extends Component {
  constructor(props) {
    super(props);

    this.state = {
      message: "",
      user_id: "",
    };
  }
  componentDidMount() {
    consolepro.consolelog("iamdelete 2323232account");
  }
  //-----------------------------function for submit report-------------

  submit_btn = async () => {
    if (config.app_status == 0) {
      this.props.navigation.navigate("Login");
      return false;
    } else {
      let { message } = this.state;
      let result = await localStorage.getItemString("user_id");
      consolepro.consolelog("result", result);
      let user_id_get = "";
      if (result != null) {
        if (result != null) {
          user_id_get = result;
        }
        this.setState({
          user_id: user_id_get,
        });
      }
      consolepro.consolelog({ message, user_id_get });
      //-----------------------message--------------
      if (message.trim().length <= 0) {
        msgProvider.toast(
          msgText.emptyDeleteReasonMessage[config.language],
          "center"
        );
        return false;
      }
      if (message.trim().length <= 2) {
        msgProvider.toast(msgText.enterMinimumThree[config.language], "center");
        return false;
      }
      //-------------------api calling--------------

      let url = config.baseURL + "delete_account.php";
      var data = new FormData();
      data.append("user_id", user_id_get);
      data.append("comment", message.trim());
      consolepro.consolelog("data", data);
      apifuntion
        .postApi(url, data)
        .then((obj) => {
          consolepro.consolelog("res_arr", obj);

          if (obj.success == "true") {
            setTimeout(() => {
              msgProvider.toast(obj.msg[config.language], "center");
            }, 300);
            this.props.navigation.navigate("Login");
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
            colors={[Colors.purple_color, Colors.light_greencolor]}
            start={{ x: 1, y: 1 }}
            end={{ x: 0, y: 1 }}
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
                {Lang_chg.delete_acc_txt[config.language]}
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
          contentContainerStyle={{ width: mobileW }}
          keyboardShouldPersistTaps="handled"
        >
          {/* //=========Reason======// */}

          <View
            style={{
              width: (mobileW * 90) / 100,
              alignItems: "flex-start",
              marginTop: (mobileH * 2) / 100,
              alignSelf: "center",
            }}
          >
            <Text
              style={{
                fontFamily: Font.FontSemiBold,
                color: Colors.black_color,
                fontSize: (mobileW * 4) / 100,
              }}
            >
              {Lang_chg.delete_Account_txt[config.language]}
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
                  borderColor: Colors.light_greencolor,
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
                style={styles.buttonText}
                multiline={true}
                placeholderTextColor={Colors.greyColor}
                placeholder="Reason"
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
                  this.setState({ message: txt });
                }}
                maxLength={250}
              />
            </View>
          </LinearGradient>

          {/* //=========Login Submit============// */}
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate("VendorSorry")}
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
                {Lang_chg.Submit_txt[config.language]}
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        </KeyboardAwareScrollView>
      </SafeAreaView>
    );
  }
}
export default VendorDeleteAccount;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.whiteColor,
  },

  linearGradient: {
    marginTop: (mobileH * 1) / 100,
    height: (mobileH * 20) / 100,
    width: (mobileW * 90) / 100,
    alignSelf: "center",
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
    color: Colors.black_color,
    backgroundColor: Colors.whiteColor,
    marginTop:
      config.device_type == "ios" ? (mobileH * 1.5) / 100 : (mobileH * 0) / 100,
    paddingVertical: (mobileH * 1.5) / 100,
    width: (mobileW * 62) / 100,
    alignSelf: "flex-start",
    alignItems: "flex-start",
  },
});
