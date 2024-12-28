import React, { Component } from "react";
import {
  Text,
  BackHandler,
  SafeAreaView,
  StatusBar,
  Alert,
  View,
  StyleSheet,
  Keyboard,
  Switch,
  TouchableOpacity,
  Image,
  TextInput,
  ImageBackground,
} from "react-native";
import {
  config,
  Lang_chg,
  Font,
  Colors,
  mobileH,
  mobileW,
  localimag,
  localStorage,
  consolepro,
  msgProvider,
  msgTitle,
  apifuntion,
  msgText,
} from "./Provider/utilslib/Utils";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import LinearGradient from "react-native-linear-gradient";

export default class VendorWithdrawlRequest extends Component {
  constructor(props) {
    super(props);
    this.state = {
      amount: "",
      description: "",
      cardDetails: "NA",
      event_booking_id: this.props.route.params.event_booking_id,
    };
  }
  componentDidMount() {
    this.props.navigation.addListener("focus", () => {
      this.getwithdrawalcard(1);
    });
    this.getwithdrawalcard(1);
  }

  async getwithdrawalcard(Display) {
    Keyboard.dismiss();
    var user_arr = await localStorage.getItemObject("user_arr");
    var user_id = user_arr.user_id;
    let url =
      config.baseURL +
      "stripe_payment/get_bank_accounts.php?user_id=" +
      user_id;

    consolepro.consolelog("url", url);
    apifuntion
      .getApi(url, Display)
      .then((obj) => {
        consolepro.consolelog("earning_history_arr", obj);
        if (obj.success == "true") {
          if (obj.bank_arr != "NA") {
            this.setState({
              cardDetails: obj.bank_arr[0],
            });
          } else {
            this.setState({
              cardDetails: "NA",
            });
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

  async sendWithdrawalRequest() {
    Keyboard.dismiss();
    let { description, amount } = this.state;
    var user_arr = await localStorage.getItemObject("user_arr");
    var user_id = user_arr.user_id;
    if (amount.length <= 0) {
      msgProvider.toast(msgText.emptyAmount[config.language], "center");
      return false;
    }
    var mobilevalidation = config.mobilevalidation;
    if (mobilevalidation.test(amount) !== true) {
      msgProvider.toast(msgText.validAmount[config.language], "center");
      return false;
    }
    if (description.length <= 0) {
      msgProvider.toast(msgText.emptyDescription[config.language], "center");
      return false;
    }
    let url = config.baseURL + "sent_withdrawal_request.php";
    let data = new FormData();
    data.append("user_id", user_id);
    data.append("withdrawl_amount", amount);
    data.append("description", description);

    consolepro.consolelog("url", url);
    consolepro.consolelog("data", data);

    apifuntion
      .postApi(url, data)
      .then((obj) => {
        consolepro.consolelog("earning_history_arr", obj);
        if (obj.success == "true") {
          this.props.navigation.navigate("VendorEarning");
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
                {Lang_chg.Withdrawl_Request_txt[config.language]}
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

        {this.state.cardDetails != "NA" ? (
          <>
            <View style={{ marginTop: (mobileH * 2) / 100 }}>
              <ImageBackground
                borderRadius={(mobileW * 2) / 100}
                style={{
                  alignSelf: "center",
                  width: (mobileW * 95) / 100,
                  height: (mobileW * 45) / 100,
                  paddingHorizontal: (mobileW * 4) / 100,
                  resizeMode: "contain",
                }}
                source={localimag.bank_card}
              >
                <View
                  style={{
                    width: (mobileW * 12) / 100,
                    alignItems: "center",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    marginTop: (mobileH * 2) / 100,
                    alignSelf: "flex-end",
                    paddingHorizontal: (mobileW * 5) / 100,
                  }}
                >
                  <TouchableOpacity
                    style={{ width: (mobileW * 8) / 100 }}
                    onPress={() =>
                      this.props.navigation.navigate("AddBankDetails")
                    }
                  >
                    <Image
                      style={{
                        alignSelf: "center",
                        width: (mobileW * 7) / 100,
                        height: (mobileW * 7) / 100,
                        paddingHorizontal: (mobileW * 4) / 100,
                        resizeMode: "contain",
                      }}
                      source={localimag.edit_card}
                    ></Image>
                  </TouchableOpacity>
                </View>
                <Text
                  style={{
                    fontFamily: Font.FontSemiBold,
                    color: Colors.whiteColor,
                    bottom: (mobileW * 5) / 100,
                    marginLeft: (mobileW * 5) / 100,
                    position: "absolute",
                    alignSelf: "flex-start",
                    fontSize: (mobileW * 4) / 100,
                  }}
                >
                  {this.state.cardDetails.user_account}
                </Text>
              </ImageBackground>
            </View>

            {/* //=========Email===========// */}
            <View
              style={{
                width: (mobileW * 95) / 100,
                alignItems: "center",
                alignSelf: "center",
              }}
            >
              <View
                style={{
                  width: (mobileW * 95) / 100,
                  alignItems: "flex-start",
                  marginTop: (mobileH * 1.5) / 100,
                }}
              >
                <Text
                  style={{
                    fontFamily: Font.FontSemiBold,
                    color: Colors.black_color,
                    fontSize: (mobileW * 4) / 100,
                  }}
                >
                  {Lang_chg.Amount_txt[config.language]}
                </Text>
              </View>
              <LinearGradient
                colors={[Colors.light_greencolor, Colors.voilet_color]}
                start={{ x: 0, y: 0 }}
                end={{ x: 0, y: 1 }}
                style={styles.linearGradient}
              >
                <View style={styles.innerContainer}>
                  <TextInput
                    style={styles.buttonText}
                    placeholderTextColor={Colors.greyColor}
                    placeholder="Enter Amount"
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
                      this.setState({ amount: txt });
                    }}
                    value={this.state.amount}
                    maxLength={100}
                  />
                </View>
              </LinearGradient>
            </View>
            {/* //=========service details Name===========// */}
            <View
              style={{
                width: (mobileW * 95) / 100,
                alignItems: "center",
                alignSelf: "center",
              }}
            >
              <View
                style={{
                  width: (mobileW * 95) / 100,
                  alignItems: "flex-start",
                  marginTop: (mobileH * 2) / 100,
                }}
              >
                <Text
                  style={{
                    fontFamily: Font.FontSemiBold,
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
                  marginTop: (mobileH * 1) / 100,
                  height: (mobileH * 20) / 100,
                  width: (mobileW * 95) / 100,
                  borderRadius: (mobileW * 1.5) / 100,
                }}
              >
                <View style={styles.innerContainer}>
                  <TextInput
                    style={styles.buttonText1}
                    placeholderTextColor={Colors.greyColor}
                    placeholder="Enter Description"
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
                      this.setState({ description: txt });
                    }}
                    value={this.state.description}
                    maxLength={250}
                  />
                </View>
              </LinearGradient>
            </View>
            {/* -------------------for button continue condition------------ */}
            <TouchableOpacity
              onPress={() => this.sendWithdrawalRequest()}
              activeOpacity={0.7}
              style={{
                marginTop: (mobileH * 3) / 100,
                marginBottom: (mobileH * 10) / 100,
                width: (mobileW * 90) / 100,
                alignSelf: "center",
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
                  // marginTop: mobileH * 55 / 100
                }}
              >
                <Text
                  style={{
                    color: "#f5f4f5",
                    fontFamily: Font.FontSemiBold,
                    fontSize: (mobileW * 4.3) / 100,
                  }}
                >
                  {Lang_chg.Sent_Withdrawl_txt[config.language]}
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          </>
        ) : (
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate("AddBankDetails")}
            activeOpacity={0.7}
            style={{
              marginTop: (mobileH * 3) / 100,
              marginBottom: (mobileH * 10) / 100,
              width: (mobileW * 90) / 100,
              alignSelf: "center",
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
                // marginTop: mobileH * 55 / 100
              }}
            >
              <Text
                style={{
                  color: "#f5f4f5",
                  fontFamily: Font.FontSemiBold,
                  fontSize: (mobileW * 4.3) / 100,
                }}
              >
                {Lang_chg.Add_Bank_Details_txt[config.language]}
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        )}
      </SafeAreaView>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
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

  linearGradient: {
    marginTop: (mobileH * 1) / 100,
    height: (mobileH * 7) / 100,
    width: (mobileW * 95) / 100,
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
  icon1s: {
    width: (mobileW * 6.5) / 100,
    height: (mobileW * 6.5) / 100,
    resizeMode: "contain",
  },
  createaccount: {
    color: Colors.dark_greencolor,
    fontFamily: Font.FontBold,
    fontSize: (mobileW * 4.5) / 100,
  },
  buttonText1: {
    fontSize: (mobileW * 3.7) / 100,
    fontFamily: Font.FontRegular,
    marginLeft: (mobileW * 1.5) / 100,
    color: Colors.black_color,
    backgroundColor: Colors.whiteColor,
    height: (mobileH * 15) / 100,
    width: (mobileW * 83) / 100,
    alignSelf: "flex-start",
    textAlignVertical: "top",
    alignItems: "flex-start",
  },
});
