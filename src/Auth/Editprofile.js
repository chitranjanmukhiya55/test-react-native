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
//import { TextInput } from 'react-native-paper';
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
  mediaprovider,
  Cameragallery,
  localimag,
  firebaseprovider,
} from "../Provider/utilslib/Utils";
import Icon from "react-native-vector-icons/FontAwesome";
import Fontisto from "react-native-vector-icons/Fontisto";
import { CheckBox } from "react-native-elements";
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
import { Switch } from "react-native-paper";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import LinearGradient from "react-native-linear-gradient";
import { color } from "react-native-reanimated";
import { Nodata_foundimage } from "../Provider/Nodata_foundimage";

class Editprofile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user_id: 0,
      mobile: "",
      btn: true,
      securetext: true,
      remember_me: false,
      pagename: "Edit Profile",
      isSwitchOn: false,
      firstname: "",
      lastname: "",
      email: "",
      profile_img: "",
      mediamodal: false,
      imagefile: "",
      image: "NA",
      fullname: "",
      address: "",
      latitude: "",
      longitude: "",
      status: false,
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
  logoutbtn = () => {
    Alert.alert(
      "Logging Out",
      "Are you sure",
      [
        {
          text: "No",
          onPress: () => {
            consolepro.consolelog("nothing");
          },
          style: "cancel",
        },
        { text: "Yes", onPress: () => this.props.navigation.navigate("Login") },
        // { text: 'Yes', onPress: () =>  {config.AppLogout(this.props.navigation)}}
      ],
      { cancelable: false }
    );
  };
  //-----------------------------------for camera open----------------------

  Camerapopen = async () => {
    mediaprovider
      .launchCamera(true)
      .then((res) => {
        console.log("camerares", res);
        this.setState({
          mediamodal: false,
          cameraon: true,
          image: res.path,
          status: true,
        });
      })
      .catch((error) => {
        this.setState({ mediamodal: false });
        consolepro.consolelog(" camera error ", error);
        if (config.device_type == "ios") {
          if (
            error ==
            "Error: Cannot access images. Please allow access if you want to be able to select images."
          ) {
            consolepro.consolelog("i am here ");
            setTimeout(() => {
              this.open_settings();
            }, 1000);
          }
        } else {
          if (error == "Error: Required permission missing") {
            this.open_settings();
          }
        }
      });
  };

  //-----------------------------function to access images from gallery

  Galleryopen = () => {
    mediaprovider
      .launchGellery(true)
      .then((res) => {
        console.log("camerares", res);
        this.setState({
          mediamodal: false,
          cameraon: true,
          image: res.path,
          status: true,
        });
      })
      .catch((error) => {
        this.setState({ mediamodal: false });
        consolepro.consolelog("gallery error", error);
        if (config.device_type == "ios") {
          if (
            error ==
            "Error: Cannot access images. Please allow access if you want to be able to select images."
          ) {
            consolepro.consolelog("i am here ");
            setTimeout(() => {
              this.open_settings();
            }, 1000);
          }
        } else {
          if (error == "Error: Required permission missing") {
            this.open_settings();
          }
        }
      });
  };
  profileUpdateButton() {
    Keyboard.dismiss();
    let { fullname, mobile, address, image } = this.state;
    if (image == "NA" || image == null) {
      msgProvider.toast(msgText.emptyProfilePicture[config.language], "center");
      return false;
    }
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
    data.append("image", {
      uri:
        this.state.status == true
          ? this.state.image
          : config.img_url + this.state.image,
      type: "image/jpg", // or photo.type
      name: "image.jpg",
    });

    consolepro.consolelog("data", data);
    // return false
    apifuntion
      .postApi(url, data)
      .then((obj) => {
        consolepro.consolelog("user_arr", obj);
        if (obj.success == "true") {
          localStorage.setItemObject("user_arr", obj.user_details);
          setTimeout(() => {
            firebaseprovider.firebaseUserCreate();
          }, 1500);
          setTimeout(() => {
            msgProvider.toast(obj.msg[config.language], "center");
          }, 300);
          this.props.navigation.navigate("Profile");
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
        <Cameragallery
          mediamodal={this.state.mediamodal}
          Camerapopen={() => {
            this.Camerapopen();
          }}
          Galleryopen={() => {
            this.Galleryopen();
          }}
          Canclemedia={() => {
            this.setState({ mediamodal: false });
          }}
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

        {/* -----------------------------for background---------------- */}
        <KeyboardAwareScrollView
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ width: windowWidth }}
          keyboardShouldPersistTaps="handled"
        >
          <TouchableOpacity
            onPress={() => this.setState({ mediamodal: true })}
            activeOpacity={0.7}
            style={{
              width: (mobileW * 30) / 100,
              alignSelf: "center",
              marginTop: (mobileH * 5) / 100,
              paddingVertical: (mobileH * 0.6) / 100,
            }}
          >
            <View
              style={{
                width: (mobileW * 27) / 100,
                alignSelf: "center",
                backgroundColor: Colors.whiteColor,
                borderRadius: (mobileW * 50) / 100,
              }}
            >
              <Image
                style={{
                  width: (mobileW * 27.5) / 100,
                  height: (mobileW * 27.5) / 100,
                  alignSelf: "center",
                  borderRadius: (mobileH * 25) / 100,
                  resizeMode: "cover",
                }}
                source={
                  this.state.image != null
                    ? {
                        uri:
                          this.state.status == true
                            ? this.state.image
                            : config.img_url + this.state.image,
                      }
                    : localimag.userplaceholder
                }
              ></Image>
            </View>
            <View
              style={{
                alignSelf: "center",
                alignItems: "center",
                marginTop: (mobileH * 1) / 100,
              }}
            >
              <View style={{ width: (mobileW * 38) / 100 }}>
                <Text
                  style={{
                    fontFamily: Font.FontSemiBold,
                    fontSize: (mobileW * 3.4) / 100,
                    color: Colors.light_greencolor,
                  }}
                >
                  {Lang_chg.change_Profile_txt[config.language]}
                </Text>
                <View
                  style={{
                    width: (mobileW * 37.8) / 100,
                    alignSelf: "center",
                    borderColor: Colors.light_greencolor,
                    backgroundColor: Colors.light_greencolor,
                    borderWidth: (mobileW * 0.1) / 100,
                  }}
                ></View>
              </View>
            </View>
          </TouchableOpacity>
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
              {/* //==========First Name========// */}
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
                    value={"" + this.state.mobile + ""}
                  />
                </View>
              </LinearGradient>

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
                </Text>
              </View>
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate("LocationMap")}
                activeOpacity={0.7}
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
                    placeholderTextColor={Colors.greyColor}
                    placeholder={Lang_chg.enter_email_txt[config.language]}
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
            </View>
            {/* //==============Update Submit =========// */}
            <View
              style={{
                alignItems: "center",
                alignSelf: "center",
                marginBottom: (mobileH * 10) / 100,
              }}
            >
              <TouchableOpacity
                onPress={() => {
                  this.profileUpdateButton();
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
                    {Lang_chg.update_txt}
                  </Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAwareScrollView>
      </SafeAreaView>
    );
  }
}
export default Editprofile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.whiteColor,
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
  view1: {
    backgroundColor: Colors.whiteColor,
    height: (mobileH * 8) / 100,
    flexDirection: "row",
    width: (windowWidth * 88) / 100,
    alignSelf: "center",
    alignItems: "center",
  },
  setting_icons: {
    height: (windowHeight * 6) / 100,
    width: (windowWidth * 11) / 100,
    borderRadius: 10,
    backgroundColor: Colors.theme_color,
    alignItems: "center",
    justifyContent: "center",
  },
  setting_view: {
    flexDirection: "row",
    height: (windowHeight * 8) / 100,
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

  },
});
