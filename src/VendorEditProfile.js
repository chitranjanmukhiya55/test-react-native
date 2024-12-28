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
  Lang_chg,
  Font,
  Colors,
  mobileH,
  mobileW,
  localimag,
  localStorage,
  consolepro,
  apifuntion,
  msgProvider,
  msgTitle,
  msgText,
  firebaseprovider,
} from "./Provider/utilslib/Utils";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import LinearGradient from "react-native-linear-gradient";
import Footer from "./Provider/Footer";
import { Nodata_foundimage } from "./Provider/Nodata_foundimage";

export default class VendorEditProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mobile: "",
      email: "",
      firstname: "",
      lastname: "",
      user_id: "",
      fullname: "",
      country_code: "1",
      country_code_modal: false,
      location: "",
      country_code_arr: [
        {
          code: "1",
          status: false,
          flag: localimag.canada,
          name: "Canada",
        },
        {
          code: "91",
          status: true,
          flag: localimag.india,
          name: "India",
        },
      ],
      address: "",
      latitude: "",
      longitude: "",
      phonecode_arr: "NA",
      phonecode_modal: false,
      searchPhoneCode: "",
      phonecode_arr_search: "",
      country_id: "",
      flag: "",
      phone_code: "",
      phonecode: "",
    };
  }
  componentDidMount() {
    this.props.navigation.addListener("focus", () => {
      consolepro.consolelog("868686868686868686886");
      if (global_user_address != "") {
        this.setState({
          address: global_user_address,
          latitude: global_user_address_lat,
          longitude: global_user_address_long,
        });
      }
      //   this.getProfileData();
    });
    this.getProfileData();
  }

  async getProfileData() {
    let user_details = await localStorage.getItemObject("user_arr");
    consolepro.consolelog("user_details47", user_details);
    this.setState({
      fullname: user_details.name,
      mobile: user_details.mobile,
      address: user_details.address,
      email: user_details.email,
      user_id: user_details.user_id,
      address: user_details.address,
      latitude: user_details.latitude,
      longitude: user_details.longitude,
      image: user_details.image,
      phone_code: user_details.country_id,
    });
    if (global_user_address != "") {
      this.setState({
        address: global_user_address,
        latitude: global_user_address_lat,
        longitude: global_user_address_long,
      });
    }
    this.getCountry();
  }

  profileUpdateButton() {
    Keyboard.dismiss();
    let { fullname, mobile, address } = this.state;
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
    if (address.length <= 0) {
      msgProvider.toast(msgText.emptyLocation[config.language], "center");
      return false;
    }

    let url = config.baseURL + "edit_profile.php";
    var data = new FormData();
    data.append("user_id", this.state.user_id);
    data.append("name", fullname);
    data.append("address", this.state.address);
    data.append("latitude", this.state.latitude);
    data.append("longitude", this.state.longitude);
    data.append("mobile", mobile);
    data.append("country_id", this.state.country_id);
    data.append("phonecode", this.state.phonecode);

    consolepro.consolelog("data", data);
    // return false
    apifuntion
      .postApi(url, data)
      .then((obj) => {
        consolepro.consolelog("user_arr", obj);
        if (obj.success == "true") {
          global_user_address = "";
          localStorage.setItemObject("user_arr", obj.user_details);
          setTimeout(() => {
            firebaseprovider.firebaseUserCreate();
          }, 1500);
          setTimeout(() => {
            msgProvider.toast(obj.msg[config.language], "center");
          }, 400);
          this.props.navigation.navigate("VendorProfile");
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
            if (this.state.phone_code != "") {
              if (data[i].country_id == this.state.phone_code) {
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
                          marginLeft: (mobileW * 1) / 100,
                        }}
                      >
                        <Text
                          style={{
                            fontSize: (mobileW * 4.5) / 100,
                            color: Colors.black_color,
                            fontFamily: Font.FontMulishMedium,
                          }}
                        >
                          {item.country_name}
                        </Text>
                        <Text
                          style={{
                            fontSize: (mobileW * 4.5) / 100,
                            color: Colors.black_color,
                            fontFamily: Font.FontMulishMedium,
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
                {Lang_chg.Edit_Profile_txt[config.language]}
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
              <Text
                style={{
                  fontFamily: Font.FontBold,
                  color: Colors.redColor,
                  fontSize: (mobileW * 4) / 100,
                }}
              >
                {"*"}
              </Text>
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
                style={{ marginLeft: (mobileW * 4) / 100, alignSelf: "center" }}
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
                placeholderTextColor={Colors.black_color}
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
              <Text
                style={{
                  fontFamily: Font.FontBold,
                  color: Colors.redColor,
                  fontSize: (mobileW * 4) / 100,
                }}
              >
                {"*"}
              </Text>
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
                    source={this.state.flag != "" && { uri: this.state.flag }}
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
                value={"" + this.state.mobile + ""}
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
              {Lang_chg.location1_txt[config.language]}
              <Text
                style={{
                  fontFamily: Font.FontBold,
                  color: Colors.redColor,
                  fontSize: (mobileW * 4) / 100,
                }}
              >
                {"*"}
              </Text>
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
                      color: Colors.black_color,
                      fontSize: (mobileW * 3.7) / 100,
                      width: (mobileW * 70) / 100,
                    }}
                  >
                    {this.state.address}
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
              <Text
                style={{
                  fontFamily: Font.FontBold,
                  color: Colors.redColor,
                  fontSize: (mobileW * 4) / 100,
                }}
              >
                {"*"}
              </Text>
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
                style={{ marginLeft: (mobileW * 4) / 100, alignSelf: "center" }}
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
                style={{
                  fontSize: (mobileW * 3.7) / 100,
                  fontFamily: Font.FontRegular,
                  marginLeft: (mobileW * 1.5) / 100,
                  color: Colors.greyColor,
                  backgroundColor: Colors.whiteColor,
                  paddingVertical: (mobileH * 1.8) / 100,
                  width: (mobileW * 62) / 100,
                  alignSelf: "center",
                  alignItems: "center",
                }}
                placeholderTextColor={Colors.black_color}
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
                editable={false}
                maxLength={100}
              />
            </View>
          </LinearGradient>
          {/* //==============Create Submit =========// */}
          <View style={{ alignItems: "center", alignSelf: "center" }}>
            <TouchableOpacity
              onPress={() => this.profileUpdateButton()}
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
                  {Lang_chg.update_txt[config.language]}
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
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
    paddingVertical: (mobileH * 1.8) / 100,
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
