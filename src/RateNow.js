import React, { Component } from "react";
import {
  Text,
  SafeAreaView,
  StatusBar,
  View,
  StyleSheet,
  Keyboard,
  TouchableOpacity,
  Image,
  FlatList,
  TextInput,
} from "react-native";
import {
  config,
  Lang_chg,
  Font,
  Colors,
  mobileH,
  mobileW,
  localimag,
  consolepro,
  msgProvider,
  msgText,
  apifuntion,
  localStorage,
} from "./Provider/utilslib/Utils";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import LinearGradient from "react-native-linear-gradient";
import StarRating from "react-native-star-rating";

export default class RateNow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      event: "",
      vendorDetails: this.props.route.params.vendorDetails,
      fullDetails: this.props.route.params.fullDetails,
      starCount: "",
      message: "",
    };
  }
  componentDidMount() {
    this.props.navigation.addListener("focus", () => {
      this.setState({ vendorDetails: this.props.route.params.vendorDetails });
    });
    consolepro.consolelog("vendorDetails", this.state.vendorDetails);
    consolepro.consolelog("fullDetails", this.state.fullDetails);
  }

  selectedStar(rating) {
    this.setState({
      starCount: rating,
    });
  }
  async submitButton() {
    Keyboard.dismiss();
    var user_arr = await localStorage.getItemObject("user_arr");
    var user_id = user_arr.user_id;

    if (this.state.message.length <= 0) {
      msgProvider.toast(msgText.emptyMessage[config.language], "center");
      return false;
    }
    let url = config.baseURL + "rate_now.php";
    let data = new FormData();
    data.append("user_id", user_id);
    data.append("event_id", this.state.fullDetails.event_id);
    data.append("vendor_id", this.state.vendorDetails.business_id);
    data.append("review", this.state.message);
    data.append("rating", this.state.starCount);
    consolepro.consolelog("datadata", data);
    consolepro.consolelog("url", url);
    // return false
    apifuntion
      .postApi(url, data)
      .then((obj) => {
        consolepro.consolelog("obj event_idevent_idevent_id", obj);
        if (obj.success == "true") {
          this.props.navigation.goBack();
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
                {Lang_chg.Rate_Now_text[config.language]}
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
          {/* //===========FlatList 2 =======// */}
          <View style={{ marginBottom: (mobileW * 10) / 100 }}>
            <View
              style={{
                alignSelf: "center",
                width: (mobileW * 95) / 100,
                marginTop: (mobileH * 2) / 100,
              }}
            >
              <View
                style={{
                  width: (mobileW * 100) / 100,
                  flexDirection: "row",
                  justifyContent: "space-between",
                  paddingHorizontal: (mobileW * 2.5) / 100,
                  backgroundColor: Colors.whiteColor,
                  marginTop: (mobileH * 1) / 100,
                  alignSelf: "center",
                }}
              >
                {/* //==============Image View============// */}
                <View
                  style={{
                    alignItems: "center",
                    justifyContent: "center",
                    paddingRight: (mobileW * 2.5) / 100,
                  }}
                >
                  <Image
                    style={{
                      width: (mobileW * 24.5) / 100,
                      height: (mobileW * 22.5) / 100,
                      borderRadius: (mobileW * 1.5) / 100,
                    }}
                    resizeMode="cover"
                    // source={localimag.house_party}
                    source={
                      this.state.vendorDetails.image != "NA" && {
                        uri: config.img_url + this.state.vendorDetails.image,
                      }
                    }
                  ></Image>
                </View>
                {/* //========Name ========// */}
                <View style={{ width: (mobileW * 100) / 100 }}>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      marginTop: (mobileW * 1) / 100,
                      width: (mobileW * 67) / 100,
                    }}
                  >
                    <Text
                      style={{
                        color: Colors.black_color,
                        fontFamily: Font.FontBold,
                        fontSize: (mobileW * 4.3) / 100,
                        alignSelf: "flex-start",
                      }}
                    >
                      {this.state.vendorDetails.vendor_name}
                    </Text>
                  </View>
                  {/* //========Details=======// */}
                  <Text
                    style={{
                      width: (mobileW * 50) / 100,
                      color: Colors.black_color,
                      fontFamily: Font.FontSemiBold,
                      fontSize: (mobileW * 3.7) / 100,
                      marginTop: (mobileH * 0.5) / 100,
                    }}
                  >
                    {this.state.vendorDetails.business_name}
                  </Text>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      width: (mobileW * 60) / 100,
                      justifyContent: "center",
                      marginTop: (mobileW * 1) / 100,
                    }}
                  >
                    <Image
                      style={{
                        width: (mobileW * 3.2) / 100,
                        height: (mobileW * 3.2) / 100,
                        alignSelf: "center",
                        marginBottom: (mobileW * 3) / 100,
                      }}
                      source={localimag.location_black}
                    ></Image>
                    <Text
                      style={{
                        color: Colors.black_color,
                        fontFamily: Font.FontSemiBold,
                        fontSize: (mobileW * 3.1) / 100,
                      }}
                    >
                      {this.state.vendorDetails.business_address}
                    </Text>
                  </View>

                  <View
                    style={{
                      width: (mobileW * 40) / 100,
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    <StarRating
                      containerStyle={{}}
                      // contentContainerStyle={{ marginLeft: mobileW * 10 / 100 }}
                      fullStar={localimag.star_Active}
                      emptyStar={localimag.star_Deactive}
                      // halfStar={localimag.star_Active}
                      halfStarColor={"#FFC815"}
                      disabled={true}
                      maxStars={5}
                      starSize={(mobileW * 3) / 100}
                      rating={this.state.vendorDetails.avg_rating}
                    />
                    <Text
                      style={{
                        color: Colors.black_color,
                        fontFamily: Font.FontRegular,
                        fontSize: (mobileW * 2.6) / 100,
                        marginLeft: (mobileW * 0.5) / 100,
                        width: (mobileW * 47) / 100,
                      }}
                    >
                      {"(" + this.state.vendorDetails.avg_rating + ")"}
                    </Text>
                  </View>
                </View>
              </View>
              <View
                style={{
                  width: mobileW,
                  borderColor: Colors.border_color,
                  borderWidth: (mobileW * 0.3) / 100,
                  marginTop: (mobileH * 3) / 100,
                  alignSelf: "center",
                  backgroundColor: Colors.border_color,
                }}
              ></View>
            </View>
          </View>

          {/* -------------------for star------------------------ */}
          <View style={{ width: (mobileW * 75) / 100, alignSelf: "center" }}>
            <StarRating
              fullStar={localimag.star_Active}
              emptyStar={localimag.star_Deactive}
              halfStarColor={"#FFC815"}
              maxStars={5}
              starSize={(mobileW * 13) / 100}
              rating={this.state.starCount}
              selectedStar={(rating) => {
                this.selectedStar(rating);
              }}
            />
          </View>

          {/* //=========Massage======// */}
          <View
            style={{
              width: (mobileW * 90) / 100,
              alignSelf: "center",
              marginTop: (mobileH * 5) / 100,
            }}
          >
            <Text
              style={{
                color: Colors.black_color,
                fontFamily: Font.FontSemiBold,
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
                  this.setState({ message: txt });
                }}
                value={this.state.message}
                maxLength={250}
              />
            </View>
          </LinearGradient>

          {/* //========= Submit============// */}
          <TouchableOpacity
            onPress={() => this.submitButton()}
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
                {Lang_chg.Submit_txt}
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
    marginTop: (mobileH * 1) / 100,
    height: (mobileH * 17) / 100,
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
  innerContainer1: {
    backgroundColor: Colors.whiteColor,
    flexDirection: "row",
    justifyContent: "space-between",
    width: (mobileW * 85) / 100,
    alignSelf: "center",
    marginLeft: (mobileW * 2) / 100,
  },
  buttonText: {
    fontSize: (mobileW * 3.7) / 100,
    fontFamily: Font.FontRegular,
    marginLeft: (mobileW * 1.5) / 100,
    color: Colors.black_color,
    backgroundColor: Colors.whiteColor,
    paddingVertical: (mobileH * 1.8) / 100,
    width: (mobileW * 70) / 100,
    alignItems: "center",
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
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
});
