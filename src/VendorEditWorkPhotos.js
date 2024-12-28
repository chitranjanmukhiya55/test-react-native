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
  Modal,
  FlatList,
  Linking,
} from "react-native";
import {
  config,
  Lang_chg,
  Font,
  Colors,
  mobileH,
  mobileW,
  localimag,
  mediaprovider,
  consolepro,
  apifuntion,
  msgProvider,
  msgTitle,
  localStorage,
} from "./Provider/utilslib/Utils";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import LinearGradient from "react-native-linear-gradient";

export default class VendorEditWorkPhotos extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chooseImage: "NA",
      isCameraGalleryModal: false,
    };
  }
  componentDidMount() {
    this.props.navigation.addListener("focus", () => {
      this.getWorkPhotos();
    });
    // this.getWorkPhotos()
  }
  async getWorkPhotos() {
    let user_arr = await localStorage.getItemObject("user_arr");
    consolepro.consolelog("user_arr>", user_arr);
    let user_id = user_arr.user_id;
    let url = config.baseURL + "get_vendor_photos.php?user_id=" + user_id;
    consolepro.consolelog("url", url);
    apifuntion
      .getApi(url, 1)
      .then((obj) => {
        consolepro.consolelog("obj", obj);
        if (obj.success == "true") {
          setTimeout(() => {
            this.setState({ chooseImage: obj.image_arr });
          }, 300);

          let data1 = obj.image_arr;
          data1.push({ image: localimag.View_dotted, status: true });
          this.setState({
            chooseImage: data1,
          });
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

  openCamera = async () => {
    mediaprovider
      .launchCamera(true)
      .then((res) => {
        let data1 = "NA";
        data1 = this.state.chooseImage;
        var arr = { image: res.path, status: false, user_image_id: 0 };
        consolepro.consolelog("data1", data1);
        data1.push(arr);
        let newarr = [];

        for (let i = 0; i < data1.length; i++) {
          if (data1[i].status == false || data1[i].type == 1) {
            newarr.push(data1[i]);
          } else {
            var item = data1[i];
          }
        }
        newarr.push(item);
        consolepro.consolelog("data 73", newarr);
        this.setState({
          chooseImage: newarr,
          isCameraGalleryModal: false,
        });

        this.updateButton();
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
        let data1 = "NA";
        data1 = this.state.chooseImage;
        var arr = { image: res.path, status: false, user_image_id: 0 };
        consolepro.consolelog("data1", data1);
        data1.push(arr);
        let newarr = [];

        for (let i = 0; i < data1.length; i++) {
          if (data1[i].status == false || data1[i].type == 1) {
            newarr.push(data1[i]);
          } else {
            var item = data1[i];
          }
        }
        newarr.push(item);
        consolepro.consolelog("data 73", newarr);
        this.setState({
          chooseImage: newarr,
          isCameraGalleryModal: false,
        });

        this.updateButton();
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

  async cancelButton(index, item) {
    consolepro.consolelog(
      "this.state.chooseImage.length ",
      this.state.chooseImage.length
    );
    if (this.state.chooseImage.length <= 2) {
      msgProvider.toast(Lang_chg.deletePhotos[config.language], "center");
      return false;
    }
    let user_arr = await localStorage.getItemObject("user_arr");
    let user_id = user_arr.user_id;

    let url = config.baseURL + "delete_image.php";
    let data = new FormData();
    data.append("user_id", user_id);
    data.append("image", item.image);

    consolepro.consolelog("url---=====", url);
    consolepro.consolelog("data---=====", data);
    // return false
    apifuntion
      .postApi(url, data)
      .then((obj) => {
        consolepro.consolelog("objobjobjobj", obj);
        if (obj.success == "true") {
          let data1 = this.state.chooseImage;
          let newarr = [];
          for (let i = 0; i < data1.length; i++) {
            if (i != index) {
              newarr.push(data1[i]);
            }
          }
          this.setState({ chooseImage: newarr });
        } else {
          if (obj.active_status == 0 || obj.account_active_status == 0) {
            config.checkUserDeactivate(this.props.navigation);
            return false;
          } else {
            msgProvider.toast(
              msgTitle.information[config.language],
              obj.msg[config.language],
              false
            );
            return false;
          }
        }
      })
      .catch((error) => {
        consolepro.consolelog(error);
      });
  }

  async updateButton() {
    let user_arr = await localStorage.getItemObject("user_arr");
    let user_id = user_arr.user_id;
    let chooseImage = this.state.chooseImage;
    consolepro.consolelog("chooseImage", chooseImage);
    if (chooseImage.length <= 1) {
      msgProvider.toast(Lang_chg.selectPhotos[config.language], "center");
      return false;
    }

    let url = config.baseURL + "add_image.php";
    let data = new FormData();
    data.append("user_id", user_id);
    for (let i = 0; i < chooseImage.length - 1; i++) {
      chooseImage[i].user_image_id == 0 &&
        data.append("image[]", {
          uri: chooseImage[i].image,
          type: "image/jpg",
          name: "image.jpg",
        });
    }

    consolepro.consolelog("url---=====", url);
    consolepro.consolelog("data---=====", data);
    // return false
    apifuntion
      .postApi(url, data, 1)
      .then((obj) => {
        consolepro.consolelog("objobjobjobj", obj);
        if (obj.success == "true") {
          this.getWorkPhotos();
        } else {
          if (obj.active_status == 0 || obj.account_active_status == 0) {
            config.checkUserDeactivate(this.props.navigation);
            return false;
          } else {
            msgProvider.toast(
              msgTitle.information[config.language],
              obj.msg[config.language],
              false
            );
            return false;
          }
        }
      })
      .catch((error) => {
        consolepro.consolelog(error);
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
        <Modal
          animationType="fade"
          transparent={true}
          visible={this.state.isCameraGalleryModal}
          onRequestClose={() => {
            this.setState({ isCameraGalleryModal: false });
          }}
        >
          {/* -----------------views ---------- */}
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => {
              this.setState({ isCameraGalleryModal: false });
            }}
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
                  this.setState({ isCameraGalleryModal: false });
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
                {Lang_chg.Edit_WorkPhoto_txt[config.language]}
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
          {this.state.chooseImage != "NA" && (
            <>
              <View
                style={{
                  width: (mobileW * 90) / 100,
                  alignSelf: "center",
                  marginTop: (mobileH * 2) / 100,
                  flexDirection: "row",
                }}
              >
                <View style={{ width: "100%" }}>
                  <View
                    style={{
                      flexDirection: "row",
                      marginTop: (mobileH * 3) / 100,
                    }}
                  >
                    {
                      <FlatList
                        data={this.state.chooseImage}
                        showsHorizontalScrollIndicator={false}
                        numColumns={3}
                        renderItem={({ item, index }) => {
                          consolepro.consolelog("item--", item);
                          return (
                            <View
                              style={{
                                alignSelf: "center",
                                flexDirection: "row",
                                marginTop: (mobileH * 1) / 100,
                              }}
                            >
                              {item.status == false && (
                                <View
                                  style={{
                                    borderRadius: (mobileW * 2) / 100,
                                    alignSelf: "center",
                                    width: (mobileW * 25) / 100,
                                    height: (mobileW * 25) / 100,
                                    marginLeft: (mobileW * 3) / 100,
                                    flexDirection: "row",
                                  }}
                                >
                                  <Image
                                    borderRadius={(mobileW * 2) / 100}
                                    style={{
                                      alignSelf: "center",
                                      width: (mobileW * 25) / 100,
                                      height: (mobileW * 25) / 100,
                                    }}
                                    source={
                                      item.user_image_id > 0
                                        ? { uri: config.img_url + item.image }
                                        : { uri: item.image }
                                    }
                                  ></Image>

                                  <TouchableOpacity
                                    onPress={() => {
                                      this.cancelButton(index, item);
                                    }}
                                    activeOpacity={0.7}
                                    style={{
                                      height: (mobileW * 7) / 100,
                                      right: (mobileW * 3) / 100,
                                    }}
                                  >
                                    <Image
                                      style={{
                                        alignSelf: "flex-start",
                                        width: (mobileW * 5) / 100,
                                        height: (mobileW * 5) / 100,
                                      }}
                                      source={localimag.multiply_2}
                                    ></Image>
                                  </TouchableOpacity>
                                </View>
                              )}
                              {item.status == true && (
                                <TouchableOpacity
                                  onPress={() => {
                                    this.setState({
                                      isCameraGalleryModal: true,
                                    });
                                  }}
                                  activeOpacity={0.7}
                                  style={{
                                    alignSelf: "flex-start",
                                    marginLeft: (mobileW * 3) / 100,
                                  }}
                                >
                                  <Image
                                    borderRadius={(mobileW * 1) / 100}
                                    style={{
                                      width: (mobileW * 25) / 100,
                                      height: (mobileW * 25) / 100,
                                      resizeMode: "stretch",
                                    }}
                                    source={localimag.View_dotted}
                                  ></Image>
                                </TouchableOpacity>
                              )}
                            </View>
                          );
                        }}
                      />
                    }
                  </View>
                </View>
              </View>
            </>
          )}
        </KeyboardAwareScrollView>
        {/* -------------------for button continue condition------------ */}

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
    backgroundColor: Colors.TextInputPlaceHolderColor,
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
});
