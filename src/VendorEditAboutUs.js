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
  TouchableOpacity,
  Image,
  TextInput,
  ImageBackground,
  Linking,
  Modal,
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
  mediaprovider,
  apifuntion,
  msgTitle,
  msgProvider,
  msgText,
} from "./Provider/utilslib/Utils";
import Fontisto from "react-native-vector-icons/Fontisto";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import LinearGradient from "react-native-linear-gradient";

export default class VendorEditAboutUs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user_id: 0,
      about: "",
      experience: "",
      team: "",
      Location: "",
      latitude: "",
      longitude: "",
      currentImage: "NA",
      isCameraPopupsVisible: false,
      status: false,
    };
  }
  componentDidMount() {
    this.props.navigation.addListener("focus", () => {
      this.getAboutUsDetails();
    });
  }
  async getAboutUsDetails() {
    let user_arr = await localStorage.getItemObject("user_arr");
    consolepro.consolelog("user_arr>", user_arr);
    this.setState({
      user_id: user_arr.user_id,
      about: user_arr.about_me,
      experience: user_arr.expertise,
      team: user_arr.team_size,
      Location: user_arr.business_address,
      currentImage: user_arr.image,
      latitude: user_arr.business_latitude,
      longitude: user_arr.business_longitude,
    });
    if (global_user_address != "") {
      this.setState({
        Location: global_user_address,
        longitude: global_user_address_long,
        latitude: global_user_address_lat,
      });
    }
  }

  openCamera = async () => {
    mediaprovider
      .launchCamera(true)
      .then((res) => {
        console.log("camerares", res);
        this.setState({
          status: true,
          currentImage: res.path,
          isCameraPopupsVisible: false,
        });
      })
      .catch((error) => {
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

  openGallery = () => {
    mediaprovider
      .launchGellery(true)
      .then((res) => {
        this.setState({
          status: true,
          currentImage: res.path,
          isCameraPopupsVisible: false,
        });
        consolepro.consolelog("currentImage", this.state.currentImage);
        consolepro.consolelog("statusstatus", this.state.status);
      })
      .catch((error) => {
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
  //----------------------------function for open setting of this app in device for permission----------------

  open_settings = () => {
    Alert.alert(
      "Alert",
      "This app need permissions,Please allow it",
      [
        {
          text: "Close",
          onPress: () => {
            consolepro.consolelog("nothing user cancle it ");
          },
          style: "cancel",
        },
        {
          text: "Open Settings",
          onPress: () => {
            Linking.openSettings();
          },
        },
      ],
      { cancelable: false }
    );
  };

  updateButton = async () => {
    Keyboard.dismiss();
    let user_arr = await localStorage.getItemObject("user_arr");

    let user_id = user_arr.user_id;
    let {
        experience,
        team,
        Location,
        about,
        currentImage,
        latitude,
        longitude,
        name,
      } = this.state,
      mobile;
    consolepro.consolelog({
      experience,
      team,
      Location,
      about,
      currentImage,
      latitude,
      longitude,
      name,
      mobile,
    });
    //  alert(fullname+email+mobile+password+confirmpassword)
    //------------------fullname===================
    if (currentImage == "NA") {
      msgProvider.toast(msgText.emptyProfile[config.language], "center");
      return false;
    }
    if (experience.length <= 0) {
      msgProvider.toast(msgText.emptyExperience[config.language], "center");
      return false;
    }
    if (team.length <= 0) {
      msgProvider.toast(msgText.emptyTeamSize[config.language], "center");
      return false;
    }
    if (Location.length <= 0) {
      msgProvider.toast(msgText.emptyLocation[config.language], "center");
      return false;
    }
    if (about.length <= 0) {
      msgProvider.toast(msgText.emptyAbout[config.language], "center");
      return false;
    }

    let url = config.baseURL + "edit_aboutus.php";
    var data = new FormData();
    data.append("user_id", user_id);
    data.append("expertice", experience);
    data.append("team_size", team);
    data.append("about_me", about);
    data.append("address", Location);
    data.append("longitude", longitude);
    data.append("latitude", latitude);

    {
      this.state.status == true &&
        data.append("image", {
          uri: currentImage,
          type: "image/jpg", // or photo.type
          name: "image.jpg",
        });
    }

    consolepro.consolelog("data", data);
    consolepro.consolelog("url", url);

    // return false
    apifuntion
      .postApi(url, data)
      .then((obj) => {
        consolepro.consolelog("user_arr", obj);
        if (obj.success == "true") {
          global.global_user_address = "";
          global.global_user_address_lat = 0;
          global.global_user_address_long = 0;
          var user_arr = obj.user_details;
          localStorage.setItemObject("user_arr", user_arr);
          //-------otp page redirection here....

          setTimeout(() => {
            msgProvider.toast(obj.msg[config.language], "center");
            this.props.navigation.goBack();
          }, 300);
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
        <View style={{ backgroundColor: "#00000090", flex: 1 }}>
          <Modal
            animationType="fade"
            transparent={true}
            visible={this.state.isCameraPopupsVisible}
            onRequestClose={this.state.isCameraPopupsVisible}
          >
            {/* -----------------views ---------- */}
            <TouchableOpacity
              activeOpacity={0.9}
              onPress={() => this.setState({ isCameraPopupsVisible: false })}
              style={styles.modalContainerStyle}
            >
              <View style={styles.modalSelectOptionContainerStyle}>
                {/* ---------text ---------------------- */}
                <View style={styles.selectOptionContainerStyle}>
                  <Text style={styles.selectOptionTextStyle}>
                    {" "}
                    {Lang_chg.select_option_txt[config.language]}
                  </Text>
                </View>
                <View style={styles.selectBorderStyle}></View>
                {/* ---------text ---------------------- */}
                <TouchableOpacity
                  style={styles.selectTextContainer}
                  onPress={() => {
                    this.openCamera();
                  }}
                >
                  <Text style={styles.selectTextStyle}>
                    {Lang_chg.Camera[config.language]}
                  </Text>
                </TouchableOpacity>
                <View style={styles.selectBorderStyle}></View>
                {/* ---------text ---------------------- */}
                <TouchableOpacity
                  onPress={() => {
                    this.openGallery();
                  }}
                  style={styles.selectTextContainer}
                >
                  <Text style={styles.selectTextStyle}>
                    {Lang_chg.Gallery[config.language]}
                  </Text>
                </TouchableOpacity>
              </View>
              {/* -----------------button--------------------- */}
              <View style={styles.buttonModalStyle}>
                <TouchableOpacity
                  onPress={() => {
                    this.setState({ isCameraPopupsVisible: false });
                  }}
                >
                  <View style={styles.buttonContainerStyle}>
                    <Text style={styles.buttonTextStyle}>
                      {Lang_chg.cancel_txt[config.language]}
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          </Modal>
        </View>
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
              onPress={() => {
                global.global_user_address = "";
                this.props.navigation.goBack();
              }}
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
                {Lang_chg.Edit_txt[config.language]}
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
          {/* -----------------for text and image-------------- */}
          <View style={{ width: (mobileW * 95) / 100, alignSelf: "center" }}>
            <Text
              style={{
                color: Colors.black_color,
                fontFamily: Font.FontSemiBold,
                fontSize: (mobileW * 3.5) / 100,
                marginTop: (mobileH * 2.5) / 100,
              }}
            >
              {Lang_chg.Add_Profile_Photo_txt[config.language]}
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
          {this.state.currentImage == "NA" ? (
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => {
                this.setState({ isCameraPopupsVisible: true });
              }}
              style={{
                alignSelf: "center",
                borderRadius: (mobileW * 2) / 100,
                width: (mobileW * 95) / 100,
                height: (mobileH * 22) / 100,
                borderWidth: (mobileW * 0.4) / 100,
                borderColor: Colors.greyColor,
                marginTop: (mobileH * 1) / 100,
                borderStyle: "dashed",
                backgroundColor: Colors.border_color,
              }}
            >
              <Image
                style={{
                  alignSelf: "center",
                  width: (mobileW * 7) / 100,
                  height: (mobileW * 7) / 100,
                  resizeMode: "contain",
                  marginTop: (mobileH * 7) / 100,
                }}
                source={localimag.attach_photos}
              ></Image>

              <Text
                style={{
                  color: Colors.greyColor,
                  fontFamily: Font.FontSemiBold,
                  fontSize: (mobileW * 3) / 100,
                  textAlign: "center",
                  paddingVertical: (mobileH * 0.5) / 100,
                }}
              >
                {Lang_chg.Upload_Profile_Photo_txt[config.language]}
              </Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => {
                this.setState({ isCameraPopupsVisible: true });
              }}
              style={{
                alignSelf: "center",
                borderRadius: (mobileW * 2) / 100,
                width: (mobileW * 95) / 100,
                height: (mobileH * 22) / 100,
                marginTop: (mobileH * 1) / 100,
              }}
            >
              <Image
                style={{
                  width: (mobileW * 95) / 100,
                  height: (mobileH * 21) / 100,
                  resizeMode: "cover",
                  borderRadius: (mobileW * 2) / 100,
                }}
                source={{
                  uri:
                    this.state.status == false
                      ? config.img_url + this.state.currentImage
                      : this.state.currentImage,
                }}
              ></Image>
            </TouchableOpacity>
          )}

          {/* -----------------------for icons -------------------------------- */}
          {/* //=========experience Name===========// */}
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
                marginTop: (mobileH * 3) / 100,
              }}
            >
              <Text
                style={{
                  fontFamily: Font.FontSemiBold,
                  color: Colors.black_color,
                  fontSize: (mobileW * 4) / 100,
                }}
              >
                {Lang_chg.Expertice_txt[config.language]}
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
              colors={[Colors.voilet_color, Colors.bluegreen_color]}
              start={{ x: 0, y: 0 }}
              end={{ x: 0, y: 1 }}
              style={styles.linearGradient}
            >
              <View style={styles.innerContainer}>
                <TextInput
                  style={styles.buttonText}
                  placeholderTextColor={Colors.greyColor}
                  placeholder="Enter Expertise"
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
                    this.setState({ experience: txt });
                  }}
                  value={this.state.experience}
                  maxLength={100}
                />
              </View>
            </LinearGradient>
          </View>

          {/* //=========team Name===========// */}
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
                marginTop: (mobileH * 3) / 100,
              }}
            >
              <Text
                style={{
                  fontFamily: Font.FontSemiBold,
                  color: Colors.black_color,
                  fontSize: (mobileW * 4) / 100,
                }}
              >
                {Lang_chg.Team_Size_txt[config.language]}
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
              colors={[Colors.voilet_color, Colors.bluegreen_color]}
              start={{ x: 0, y: 0 }}
              end={{ x: 0, y: 1 }}
              style={styles.linearGradient}
            >
              <View style={styles.innerContainer}>
                <TextInput
                  style={styles.buttonText}
                  placeholderTextColor={Colors.greyColor}
                  placeholder="Enter Team Size"
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
                    this.setState({ team: txt });
                  }}
                  value={this.state.team + ""}
                  maxLength={25}
                />
              </View>
            </LinearGradient>
          </View>
          {/* //=========Location Name===========// */}
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
                marginTop: (mobileH * 3) / 100,
              }}
            >
              <Text
                style={{
                  fontFamily: Font.FontSemiBold,
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

              <TouchableOpacity
                style={{}}
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
                    width: (mobileW * 95) / 100,
                    borderRadius: (mobileW * 1.5) / 100,
                    paddingVertical: (mobileH * 0.1) / 100,
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
                      paddingVertical: (mobileH * 1.5) / 100,
                    }}
                  >
                    <View style={styles.innerContainer1}>
                      <Text
                        numberOfLines={4}
                        style={{
                          fontFamily: Font.FontRegular,
                          color:
                            this.state.Location != ""
                              ? Colors.black_color
                              : Colors.greyColor,
                          fontSize: (mobileW * 3.7) / 100,
                          width: (mobileW * 70) / 100,
                        }}
                      >
                        {this.state.Location != ""
                          ? this.state.Location
                          : Lang_chg.Select_Location_txt[config.language]}
                      </Text>
                    </View>
                  </View>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </View>
          {/* //=========venue  Name===========// */}
          {/* //=========discription Name===========// */}
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
                marginTop: (mobileH * 2.5) / 100,
              }}
            >
              <Text
                style={{
                  fontFamily: Font.FontSemiBold,
                  color: Colors.black_color,
                  fontSize: (mobileW * 4) / 100,
                }}
              >
                {Lang_chg.About_txt[config.language]}
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
                  placeholder="About"
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
                    this.setState({ about: txt });
                  }}
                  value={this.state.about}
                  maxLength={250}
                />
              </View>
            </LinearGradient>
          </View>

          {/* ----------------for button--------- */}
          <TouchableOpacity
            onPress={() => this.updateButton()}
            activeOpacity={0.7}
            style={{
              alignItems: "center",
              alignSelf: "center",
              marginBottom: (mobileH * 2) / 100,
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
    width: (mobileW * 80) / 100,
    alignSelf: "center",
    alignItems: "center",
    //  backgroundColor: 'red',
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
  modalContainerStyle: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    marginBottom: (mobileW * 3) / 100,
    backgroundColor: "#00000090",
  },
  modalSelectOptionContainerStyle: {
    width: "92%",
    height: (mobileW * 37) / 100,
    backgroundColor: "#FAFAFA",
    borderRadius: (mobileW * 4) / 100,
  },
  selectOptionContainerStyle: {
    width: "100%",
    alignSelf: "center",
    justifyContent: "center",
  },
  selectOptionTextStyle: {
    alignSelf: "center",
    color: "#000000",
    paddingVertical: (mobileW * 3) / 100,
    fontSize: (mobileW * 3.8) / 100,
    fontFamily: Font.FontMedium,
  },
  selectBorderStyle: {
    width: "100%",
    height: (mobileH * 0.1) / 100,
    backgroundColor: Colors.greyColor,
  },
  selectTextContainer: {
    width: "100%",
    alignSelf: "center",
    justifyContent: "center",
    marginTop: (mobileW * 1) / 100,
  },
  selectTextStyle: {
    alignSelf: "center",
    fontSize: (mobileW * 4) / 100,
    color: Colors.black_color,
    paddingVertical: (mobileW * 3) / 100,
  },
  buttonContainerStyle: {
    width: "90%",
    justifyContent: "center",
    alignSelf: "center",
  },
  buttonTextStyle: {
    fontFamily: Font.FontMedium,
    fontSize: (mobileW * 4) / 100,
    alignSelf: "center",
    color: "#F80302",
    paddingVertical: (mobileW * 3) / 100,
  },
  buttonModalStyle: {
    width: "92%",
    backgroundColor: "#FAFAFA",
    borderRadius: (mobileW * 4) / 100,
    marginTop: (mobileW * 2) / 100,
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
