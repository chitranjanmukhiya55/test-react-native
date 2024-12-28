import React, { Component } from "react";
import {
  Text,
  SafeAreaView,
  StatusBar,
  Modal,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  ImageBackground,
  PermissionsAndroid,
  Keyboard,
  TextInput,
  FlatList,
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
  localStorage,
  apifuntion,
  msgProvider,
  msgTitle,
} from "./Provider/utilslib/Utils";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import LinearGradient from "react-native-linear-gradient";
import Draggable from "react-native-draggable";
import { captureRef } from "react-native-view-shot";
import RNFetchBlob from "rn-fetch-blob";
import { CameraRoll } from "@react-native-camera-roll/camera-roll";
import Share from "react-native-share";
import HideWithKeyboard from "react-native-hide-with-keyboard";
import { Platform } from "react-native";

export default class Preview extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chat_popup: false,
      item: this.props.route.params.item,
      template_id: this.props.route.params.template_id,
      Discription: this.props.route.params.Discription,
      selected_date_for_api: this.props.route.params.selected_date_for_api,
      name: this.props.route.params.name,
      title: this.props.route.params.title,
      longitude: this.props.route.params.longitude,
      latitude: this.props.route.params.latitude,
      selected_date: this.props.route.params.selected_date,
      location: this.props.route.params.location,
      focuskey: 0,
      selectFontModal: false,
      selectColorModal: false,
      selectSizeModal: false,
      nameFont: "Mulish-SemiBold",
      titleFont: "Mulish-SemiBold",
      dateFont: "Mulish-SemiBold",
      discriptionFont: "Mulish-SemiBold",
      locationFont: "Mulish-SemiBold",

      nameColor: "black",
      titleColor: "black",
      dateColor: "black",
      discriptionColor: "black",
      locationColor: "black",

      nameSize: 20,
      titleSize: 20,
      dateSize: 20,
      discriptionSize: 20,
      locationSize: 20,
      FontStayleArray: [
        {
          textFont: "Mulish-Bold",
          text: "Bold",
        },
        {
          textFont: "Mulish-BoldItalic",
          text: "BoldItalic",
        },
        {
          textFont: "Mulish-ExtraBold",
          text: "ExtraBold",
        },
        {
          textFont: "Mulish-ExtraBoldItalic",
          text: "ExtraBoldItalic",
        },

        {
          textFont: "Mulish-Italic",
          text: "Italic",
        },
        {
          textFont: "Mulish-Light",
          text: "Light",
        },

        {
          textFont: "Mulish-LightItalic",
          text: "LightItalic",
        },

        {
          textFont: "Mulish-Regular",
          text: "Regular",
        },

        {
          textFont: "Mulish-SemiBold",
          text: "SemiBold",
        },
        {
          textFont: "Mulish-SemiBoldItalic",
          text: "SemiBoldItalic",
        },
        {
          textFont: "Mulish-Black",
          text: "Black",
        },
        {
          textFont: "Mulish-BlackItalic",
          text: "BlackItalic",
        },
        {
          textFont: "Mulish-ExtraLight",
          text: "ExtraLight",
        },
        {
          textFont: "Mulish-ExtraLightItalic",
          text: "ExtraLightItalic",
        },
        {
          textFont: "Mulish-Medium",
          text: "Medium",
        },
        {
          textFont: "Mulish-MediumItalic",
          text: "MediumItalic",
        },
      ],
      ColorArray: [
        {
          textFont: "white",
          text: "White",
        },
        {
          textFont: "red",
          text: "Red",
        },
        {
          textFont: "green",
          text: "Green",
        },
        {
          textFont: "yellow",
          text: "Yellow",
        },

        {
          textFont: "grey",
          text: "Grey",
        },
        {
          textFont: "beige",
          text: "Beige",
        },

        {
          textFont: "blue",
          text: "Blue",
        },

        {
          textFont: "brown",
          text: "Brown",
        },

        {
          textFont: "black",
          text: "Black",
        },
      ],
      SizeArray: [
        {
          textFont: (mobileW * 0.5) / 100,
          text: "0.5",
        },
        {
          textFont: (mobileW * 1) / 100,
          text: "1",
        },
        {
          textFont: (mobileW * 1.5) / 100,
          text: "1.5",
        },
        {
          textFont: (mobileW * 2) / 100,
          text: "2",
        },
        {
          textFont: (mobileW * 2.5) / 100,
          text: "2.5",
        },

        {
          textFont: (mobileW * 3) / 100,
          text: "3",
        },
        {
          textFont: (mobileW * 3.5) / 100,
          text: "3.5",
        },

        {
          textFont: (mobileW * 4) / 100,
          text: "4",
        },

        {
          textFont: (mobileW * 4.5) / 100,
          text: "4.5",
        },

        {
          textFont: (mobileW * 5) / 100,
          text: "5",
        },
        {
          textFont: (mobileW * 5.5) / 100,
          text: "5.5",
        },
        {
          textFont: (mobileW * 6) / 100,
          text: "6",
        },
        {
          textFont: (mobileW * 6.5) / 100,
          text: "6.5",
        },
        {
          textFont: (mobileW * 7) / 100,
          text: "7",
        },
        {
          textFont: (mobileW * 7.5) / 100,
          text: "7.5",
        },
        {
          textFont: (mobileW * 8) / 100,
          text: "8",
        },
      ],
    };
  }

  componentDidMount() {
    const { navigation } = this.props;
    this.focusListener = navigation.addListener("focus", () => {
      consolepro.consolelog("itemitemitem", this.state.item);
      this.setState({
        item: this.props.route.params.item,
        template_id: this.props.route.params.template_id,
        Discription: this.props.route.params.Discription,
        selected_date_for_api: this.props.route.params.selected_date_for_api,
        name: this.props.route.params.name,
        title: this.props.route.params.title,
        longitude: this.props.route.params.longitude,
        latitude: this.props.route.params.latitude,
        selected_date: this.props.route.params.selected_date,
        location: this.props.route.params.location,
      });
    });
  }
  async saveDetailsButton() {
    var user_arr = await localStorage.getItemObject("user_arr");
    var user_id = user_arr.user_id;

    let {
      item,
      Discription,
      selected_date_for_api,
      name,
      title,
      latitude,
      longitude,
      location,
    } = this.state;
    consolepro.consolelog({
      item,
      Discription,
      selected_date_for_api,
      name,
      title,
      latitude,
      longitude,
      location,
    });

    let url = config.baseURL + "user_invite.php";
    var data = new FormData();
    data.append("user_id", user_id);
    data.append("template_id", this.state.template_id);
    data.append("title", title);
    data.append("name", name);
    data.append("datetime", selected_date_for_api);
    data.append("description", Discription);
    data.append("location", location);
    data.append("latitude", latitude);
    data.append("longitude", longitude);
    data.append("card_image", {
      uri: config.img_url + this.state.item,
      type: "image/jpg", // or photo.type
      name: "image.jpg",
    });
    consolepro.consolelog("data", data);
    consolepro.consolelog("url", url);
    // return false
    apifuntion
      .postApi(url, data, 1)
      .then((obj) => {
        consolepro.consolelog("details=>>>", obj);
        if (obj.success == "true") {
          setTimeout(() => {
            msgProvider.toast(obj.msg[config.language], "center");
          }, 300);
          this.props.navigation.navigate("Einvites");
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

  share_btn = (uri) => {
    var file = uri;
    if (file != null) {
      var image_url = file;
      consolepro.consolelog("image_url", image_url);

      Share.open({ url: image_url });
      this.saveDetailsButton();
    }
  };

  CaptureView = (status) => {
    consolepro.consolelog("Image saved to");
    captureRef(this.viewRef, {
      format: "jpg",
      quality: 0.8,
    }).then(
      (uri) => {
        consolepro.consolelog("Image saved to", uri);

        if (status == 0) {
          this.share_btn(uri);
        } else {
          // global.props.showLoader();
          this.savePicture(uri);
          // this.saveImage(uri)
        }
      },
      (error) => console.error("Oops, snapshot failed", error)
    );
  };

  async hasAndroidPermission(uri) {
    const permission = PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE;

    const hasPermission = await PermissionsAndroid.check(permission);
    if (hasPermission) {
      this.saveImage(uri);
      consolepro.consolelog("i am in if block 107");
      return true;
    }

    const status = await PermissionsAndroid.request(permission);
    consolepro.consolelog("i am in if block 111");
    // this.saveImage(uri)
    return status === "granted";
  }

  async savePicture(uri) {
    if (Platform.OS === "android" && !(await this.hasAndroidPermission(uri))) {
      consolepro.consolelog("i am in if block 116");
      return;
    }

    if (Platform.OS === "ios") {
      this.saveImageIos(uri);
    }
  }

  async saveImage(urlmain) {
    consolepro.consolelog("i am in if block 227");
    CameraRoll.save(urlmain)
      .then(() => {
        msgProvider.toast("Image saved successfully", "center");
        this.saveDetailsButton();
        consolepro.consolelog("rescamera 123");
      })
      .catch((err) => {
        global.props.hideLoader();
        console.log("err", err);
      });
  }

  async saveImageIos(uri) {
    try {
      if (Platform.OS === "ios") {
        await CameraRoll.save(uri, { type: "photo" })
          .then(() => {
            msgProvider.toast("Image saved successfully", "center");
            this.saveDetailsButton();
            consolepro.consolelog("rescamera 123");
          })
          .catch((err) => {
            global.props.hideLoader();
            console.log("err", err);
          });
        consolepro.consolelog("Saving image on iOS with uri:", uri);
      }
    } catch (error) {
      consolepro.consolelog("Error saving image:", error);
    }
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
        <Modal
          animationType="slide"
          transparent
          visible={this.state.chat_popup}
          onRequestClose={() => {}}
        >
          <SafeAreaView
            style={{ flex: 0, backgroundColor: Colors.whiteColor }}
          />
          <View
            style={{
              flex: 1,
              backgroundColor: "#00000090",
              alignItems: "flex-start",
              justifyContent: "flex-end",
              marginTop: (mobileH * 0) / 100,
              borderRadius: 0,
            }}
          >
            <SafeAreaView style={{ flex: 0 }} />
            <View
              style={{
                flexDirection: "column",
                justifyContent: "flex-start",
                backgroundColor: Colors.whiteColor,
                alignItems: "flex-start",
                width: "100%",
              }}
            >
              {/* //=============Message======// */}
              <TouchableOpacity
                activeOpacity={1}
                onPress={() => {
                  this.setState({ chat_popup: false });
                  this.CaptureView(1);
                }}
                style={{
                  flexDirection: "row",
                  paddingVertical: (mobileH * 1) / 100,
                  width: "90%",
                  alignItems: "flex-start",
                  borderBottomColor: Colors.whiteColor,
                  borderBottomWidth: 1,
                  alignSelf: "center",
                  marginTop: (mobileH * 1) / 100,
                }}
              >
                <Image
                  style={{
                    height: (mobileW * 7) / 100,
                    width: (mobileW * 7) / 100,
                    resizeMode: "contain",
                    alignSelf: "flex-start",
                    justifyContent: "flex-start",
                  }}
                  source={localimag.photo_2}
                ></Image>
                <Text
                  style={{
                    marginLeft: (mobileW * 5) / 100,
                    fontSize: (mobileW * 4.2) / 100,
                    fontFamily: Font.FontSemiBold,
                    color: Colors.black_color,
                  }}
                >
                  {Lang_chg.saveimage_txt[config.language]}
                </Text>
              </TouchableOpacity>
              <View style={styles.lineview} />
              {/* //=========Share========// */}
              <TouchableOpacity
                activeOpacity={1}
                onPress={() => {
                  this.setState({ chat_popup: false });
                  this.CaptureView(0);
                }}
                style={{
                  flexDirection: "row",
                  paddingVertical: (mobileH * 1) / 100,
                  width: "90%",
                  alignItems: "flex-start",
                  borderBottomColor: Colors.whiteColor,
                  borderBottomWidth: 1,
                  alignSelf: "center",
                  marginTop: (mobileH * 1) / 100,
                }}
              >
                <Image
                  style={{
                    height: (mobileW * 7) / 100,
                    width: (mobileW * 7) / 100,
                    resizeMode: "contain",
                    alignSelf: "flex-start",
                    justifyContent: "flex-start",
                  }}
                  source={localimag.share_link}
                ></Image>
                <Text
                  style={{
                    marginLeft: (mobileW * 5) / 100,
                    fontSize: (mobileW * 4.2) / 100,
                    fontFamily: Font.FontSemiBold,
                    color: Colors.black_color,
                  }}
                >
                  {Lang_chg.sharelink_txt[config.language]}
                </Text>
              </TouchableOpacity>

              <View style={styles.lineview} />

              <View
                style={{
                  backgroundColor: Colors.whiteColor,
                  alignItems: "flex-start",
                  width: "95%",
                  borderRadius: 15,
                  marginTop: (mobileH * 0) / 100,
                  marginBottom: 25,
                  paddingHorizontal: (mobileW * 2.3) / 100,
                }}
              >
                <TouchableOpacity
                  activeOpacity={1}
                  style={{
                    backgroundColor: Colors.whiteColor,
                    alignItems: "center",
                    width: "100%",
                  }}
                  onPress={() => {
                    this.setState({ popup: false });
                  }}
                >
                  {/* --for cancel button-----------*/}
                  <TouchableOpacity
                    onPress={() => this.setState({ chat_popup: false })}
                    style={{
                      paddingVertical: (mobileH * 0.8) / 100,
                      backgroundColor: Colors.whiteColor,
                      width: "90%",
                      alignItems: "flex-start",
                      alignSelf: "center",
                    }}
                  >
                    <Text
                      style={{
                        fontSize: (mobileW * 4.5) / 100,
                        fontFamily: Font.FontMedium,
                        color: Colors.redColor,
                      }}
                    >
                      {Lang_chg.cancel_txt[config.language]}
                    </Text>
                  </TouchableOpacity>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
        {/* ========================================selectFontModal=================================== */}
        <Modal
          animationType="slide"
          transparent
          visible={this.state.selectFontModal}
          onRequestClose={() => {
            this.setState({ selectFontModal: false });
          }}
        >
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => {
              this.setState({ selectFontModal: false });
            }}
          >
            <View
              style={{
                marginTop: (mobileH * 18) / 100,
                alignSelf: "flex-start",
                width: (mobileW * 50) / 100,
                borderRadius: (mobileW * 3) / 100,
                marginLeft: (mobileW * 3) / 100,
                backgroundColor: Colors.whiteColor,
              }}
            >
              <FlatList
                data={this.state.FontStayleArray}
                contentContainerStyle={{ paddingBottom: (mobileW * 2) / 100 }}
                showsVerticalScrollIndicator={false}
                renderItem={({ item, index }) => {
                  return (
                    <TouchableOpacity
                      activeOpacity={0.7}
                      onPress={() => {
                        consolepro.consolelog("hii");
                        this.setState({ selectFontModal: false });
                        if (this.state.focuskey == 0) {
                          this.setState({
                            nameFont: item.textFont,
                          });
                        } else if (this.state.focuskey == 1) {
                          this.setState({ dateFont: item.textFont });
                        } else if (this.state.focuskey == 2) {
                          this.setState({ discriptionFont: item.textFont });
                        } else if (this.state.focuskey == 3) {
                          this.setState({ titleFont: item.textFont });
                        } else if (this.state.focuskey == 4) {
                          this.setState({ locationFont: item.textFont });
                        }
                      }}
                      style={{
                        alignSelf: "center",
                        marginTop: (mobileW * 2) / 100,
                        height: (mobileH * 3.5) / 100,
                      }}
                    >
                      <Text
                        style={{
                          color: Colors.black_color,
                          fontSize: (mobileW * 4) / 100,
                          fontFamily: Font.FontSemiBold,
                        }}
                      >
                        {item.text}
                      </Text>
                    </TouchableOpacity>
                  );
                }}
              />
            </View>
          </TouchableOpacity>
        </Modal>

        {/* ========================================selectColorModal=================================== */}
        <Modal
          animationType="slide"
          transparent
          visible={this.state.selectColorModal}
          onRequestClose={() => {
            this.setState({ selectColorModal: false });
          }}
        >
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => {
              this.setState({ selectColorModal: false });
            }}
          >
            <View
              style={{
                marginTop: (mobileH * 18) / 100,
                alignSelf: "center",
                width: (mobileW * 40) / 100,
                borderRadius: (mobileW * 3) / 100,

                backgroundColor: Colors.whiteColor,
              }}
            >
              <FlatList
                data={this.state.ColorArray}
                contentContainerStyle={{ paddingBottom: (mobileW * 2) / 100 }}
                showsVerticalScrollIndicator={false}
                renderItem={({ item, index }) => {
                  return (
                    <TouchableOpacity
                      activeOpacity={0.7}
                      onPress={() => {
                        consolepro.consolelog("hii");
                        this.setState({ selectColorModal: false });
                        if (this.state.focuskey == 0) {
                          this.setState({
                            nameColor: item.textFont,
                          });
                        } else if (this.state.focuskey == 1) {
                          this.setState({ dateColor: item.textFont });
                        } else if (this.state.focuskey == 2) {
                          this.setState({ discriptionColor: item.textFont });
                        } else if (this.state.focuskey == 3) {
                          this.setState({ titleColor: item.textFont });
                        } else if (this.state.focuskey == 4) {
                          this.setState({ locationColor: item.textFont });
                        }
                      }}
                      style={{
                        alignSelf: "center",
                        marginTop: (mobileW * 2) / 100,
                        height: (mobileH * 3.5) / 100,
                      }}
                    >
                      <Text
                        style={{
                          color: Colors.black_color,
                          fontSize: (mobileW * 4) / 100,
                          fontFamily: Font.FontSemiBold,
                        }}
                      >
                        {item.text}
                      </Text>
                    </TouchableOpacity>
                  );
                }}
              />
            </View>
          </TouchableOpacity>
        </Modal>

        {/* ========================================selectSizeModal=================================== */}
        <Modal
          animationType="slide"
          transparent
          visible={this.state.selectSizeModal}
          onRequestClose={() => {
            this.setState({ selectSizeModal: false });
          }}
        >
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => {
              this.setState({ selectSizeModal: false });
            }}
          >
            <View
              style={{
                marginTop: (mobileH * 18) / 100,
                alignSelf: "flex-end",
                width: (mobileW * 30) / 100,
                borderRadius: (mobileW * 3) / 100,
                marginRight: (mobileW * 3) / 100,
                backgroundColor: Colors.whiteColor,
              }}
            >
              <FlatList
                data={this.state.SizeArray}
                contentContainerStyle={{ paddingBottom: (mobileW * 2) / 100 }}
                showsVerticalScrollIndicator={false}
                renderItem={({ item, index }) => {
                  return (
                    <TouchableOpacity
                      activeOpacity={0.7}
                      onPress={() => {
                        consolepro.consolelog("hii");
                        this.setState({ selectSizeModal: false });
                        if (this.state.focuskey == 0) {
                          this.setState({
                            nameSize: item.textFont,
                          });
                        } else if (this.state.focuskey == 1) {
                          this.setState({ dateSize: item.textFont });
                        } else if (this.state.focuskey == 2) {
                          this.setState({ discriptionSize: item.textFont });
                        } else if (this.state.focuskey == 3) {
                          this.setState({ titleSize: item.textFont });
                        } else if (this.state.focuskey == 4) {
                          this.setState({ locationSize: item.textFont });
                        }
                      }}
                      style={{
                        alignSelf: "center",
                        marginTop: (mobileW * 2) / 100,
                        height: (mobileH * 3.5) / 100,
                      }}
                    >
                      <Text
                        style={{
                          color: Colors.black_color,
                          fontSize: (mobileW * 4) / 100,
                          fontFamily: Font.FontSemiBold,
                        }}
                      >
                        {item.text}
                      </Text>
                    </TouchableOpacity>
                  );
                }}
              />
            </View>
          </TouchableOpacity>
        </Modal>

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
                {Lang_chg.Preview_txt[config.language]}
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
        {/* ----------------------------------header style--------------------- */}
        <View
          style={{
            width: (mobileW * 95) / 100,
            alignSelf: "center",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => {
              this.setState({ selectFontModal: true });
            }}
          >
            <LinearGradient
              colors={[Colors.bluegreen_color, Colors.voilet_color]}
              start={{ x: 0, y: 1 }}
              end={{ x: 0, y: 0 }}
              style={styles.linearGradient}
            >
              <View style={styles.innerContainer}>
                <Text style={styles.buttonText1}>{"Style"}</Text>
                <View
                  style={{
                    alignItems: "center",
                    justifyContent: "center",
                    alignSelf: "center",
                  }}
                >
                  <Image
                    style={{
                      width: (mobileW * 4) / 100,
                      height: (mobileW * 4) / 100,
                      resizeMode: "contain",

                      marginLeft:
                        config.device_type == "ios"
                          ? (mobileW * 0) / 100
                          : mobileW * 0,
                    }}
                    source={localimag.downward}
                  ></Image>
                </View>
              </View>
            </LinearGradient>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => {
              this.setState({ selectColorModal: true });
            }}
          >
            <LinearGradient
              colors={[Colors.bluegreen_color, Colors.voilet_color]}
              start={{ x: 0, y: 1 }}
              end={{ x: 0, y: 0 }}
              style={styles.linearGradient}
            >
              <View style={styles.innerContainer}>
                <Text style={styles.buttonText1}>{"Color"}</Text>
                <View
                  style={{
                    alignItems: "center",
                    justifyContent: "center",
                    alignSelf: "center",
                  }}
                >
                  <Image
                    style={{
                      width: (mobileW * 4) / 100,
                      height: (mobileW * 4) / 100,
                      resizeMode: "contain",

                      marginLeft:
                        config.device_type == "ios"
                          ? (mobileW * 0) / 100
                          : mobileW * 0,
                    }}
                    source={localimag.downward}
                  ></Image>
                </View>
              </View>
            </LinearGradient>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => {
              this.setState({ selectSizeModal: true });
            }}
          >
            <LinearGradient
              colors={[Colors.bluegreen_color, Colors.voilet_color]}
              start={{ x: 0, y: 1 }}
              end={{ x: 0, y: 0 }}
              style={styles.linearGradient}
            >
              <View style={styles.innerContainer}>
                <Text style={styles.buttonText1}>{"Size"}</Text>
                <View
                  style={{
                    alignItems: "center",
                    justifyContent: "center",
                    alignSelf: "center",
                  }}
                >
                  <Image
                    style={{
                      width: (mobileW * 4) / 100,
                      height: (mobileW * 4) / 100,
                      resizeMode: "contain",

                      marginLeft:
                        config.device_type == "ios"
                          ? (mobileW * 0) / 100
                          : mobileW * 0,
                    }}
                    source={localimag.downward}
                  ></Image>
                </View>
              </View>
            </LinearGradient>
          </TouchableOpacity>
        </View>

        <View
          collapsable={false}
          style={{ width: mobileW }}
          ref={(list) => {
            this.viewRef = list;
          }}
        >
          <ImageBackground
            resizeMode="contain"
            style={{
              width: (mobileW * 98) / 100,
              alignSelf: "center",
              height: (mobileH * 70) / 100,
              justifyContent: "center",
              alignItems: "center",
            }}
            source={{ uri: config.img_url + this.state.item }}
          >
            <View style={{ width: (mobileW * 80) / 100, alignSelf: "center" }}>
              <Draggable
                renderSize={80}
                x={120}
                y={-70}
                onDragRelease={this._changeFace}
                onLongPress={() => console.log("long press")}
                onShortPressRelease={() => console.log("press drag")}
                onPressIn={() => console.log("in press")}
                onPressOut={() => console.log("out press")}
              >
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => {
                    this.setState({ focuskey: 0 });
                  }}
                >
                  <Text
                    style={{
                      color: this.state.nameColor,
                      fontFamily: this.state.nameFont,
                      fontSize: this.state.nameSize,
                      alignSelf: "center",
                    }}
                  >
                    {this.state.name}
                  </Text>
                </TouchableOpacity>
              </Draggable>
              <Draggable
                renderSize={80}
                x={120}
                y={-40}
                onDragRelease={this._changeFace}
                onLongPress={() => console.log("long press")}
                onShortPressRelease={() => console.log("press drag")}
                onPressIn={() => console.log("in press")}
                onPressOut={() => console.log("out press")}
              >
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => {
                    this.setState({ focuskey: 1 });
                  }}
                >
                  <Text
                    style={{
                      color: this.state.dateColor,
                      fontFamily: this.state.dateFont,
                      fontSize: this.state.dateSize,
                      alignSelf: "center",
                    }}
                  >
                    {this.state.selected_date}
                  </Text>
                </TouchableOpacity>
              </Draggable>
              <Draggable
                renderSize={80}
                x={100}
                y={-10}
                onDragRelease={this._changeFace}
                onLongPress={() => console.log("long press")}
                onShortPressRelease={() => console.log("press drag")}
                onPressIn={() => console.log("in press")}
                onPressOut={() => console.log("out press")}
              >
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => {
                    this.setState({ focuskey: 2 });
                  }}
                >
                  <Text
                    style={{
                      color: this.state.discriptionColor,
                      fontFamily: this.state.discriptionFont,
                      fontSize: this.state.discriptionSize,
                      alignSelf: "center",
                    }}
                  >
                    {this.state.Discription}
                  </Text>
                </TouchableOpacity>
              </Draggable>
              <Draggable
                renderSize={80}
                x={100}
                y={20}
                onDragRelease={this._changeFace}
                onLongPress={() => console.log("long press")}
                onShortPressRelease={() => console.log("press drag")}
                onPressIn={() => console.log("in press")}
                onPressOut={() => console.log("out press")}
              >
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => {
                    this.setState({ focuskey: 3 });
                  }}
                >
                  <Text
                    style={{
                      color: this.state.titleColor,
                      fontFamily: this.state.titleFont,
                      fontSize: this.state.titleSize,
                      alignSelf: "center",
                    }}
                  >
                    {this.state.title}
                  </Text>
                </TouchableOpacity>
              </Draggable>
              <Draggable
                renderSize={80}
                x={100}
                y={50}
                onDragRelease={this._changeFace}
                onLongPress={() => console.log("long press")}
                onShortPressRelease={() => console.log("press drag")}
                onPressIn={() => console.log("in press")}
                onPressOut={() => console.log("out press")}
              >
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => {
                    this.setState({ focuskey: 4 });
                  }}
                >
                  <Text
                    style={{
                      color: this.state.locationColor,
                      fontFamily: this.state.locationFont,
                      fontSize: this.state.locationSize,
                      alignSelf: "center",
                    }}
                  >
                    {this.state.location}
                  </Text>
                </TouchableOpacity>
              </Draggable>
            </View>
          </ImageBackground>
        </View>

        {/* //=========button============// */}
        <HideWithKeyboard>
          <TouchableOpacity
            TouchableOpacity
            onPress={() => {
              this.setState({ chat_popup: true });
            }}
            activeOpacity={0.7}
            style={{
              position: "absolute",
              alignItems: "center",
              alignSelf: "center",
              bottom: (mobileH * 1) / 100,
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
              }}
            >
              <Text
                style={{
                  color: "#f5f4f5",
                  fontFamily: Font.FontBold,
                  fontSize: (mobileW * 4.3) / 100,
                }}
              >
                {Lang_chg.Next_txt}
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        </HideWithKeyboard>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.whiteColor,
  },
  lineview: {
    width: (mobileW * 90) / 100,
    marginTop: (mobileW * 0.5) / 100,
    borderBottomWidth: 0.8,
    borderBottomColor: Colors.greyColor,
    alignSelf: "center",
    justifyContent: "center",
    marginLeft:
      config.device_type == "android"
        ? (mobileW * 2) / 100
        : (mobileW * 1) / 100,
  },
  linearGradient: {
    marginTop: (mobileH * 1) / 100,
    height: (mobileH * 5.5) / 100,
    width: (mobileW * 25) / 100,
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
  buttonText1: {
    fontSize: (mobileW * 4) / 100,
    fontFamily: Font.FontBold,
    marginLeft: (mobileW * 1.5) / 100,
    color: Colors.greyColor,
    backgroundColor: Colors.whiteColor,
    paddingVertical: (mobileH * 1) / 100,
    width: (mobileW * 15) / 100,
    justifyContent: "center",
    alignSelf: "center",
  },
});
