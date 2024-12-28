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
  FlatList,
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
  mediaprovider,
  consolepro,
  apifuntion,
  msgProvider,
  msgTitle,
  localStorage,
} from "./Provider/utilslib/Utils";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import LinearGradient from "react-native-linear-gradient";

export default class VendorEditServices extends Component {
  constructor(props) {
    super(props);
    this.state = {
      celander: 0,
      change_view: 0,
      servicesArray: "NA",
      seeDetails: false,
      testDetails: "",
    };
  }
  componentDidMount() {
    this.props.navigation.addListener("focus", () => {
      this.getServices();
    });
    // this.getServices()
  }

  async getServices() {
    let user_arr = await localStorage.getItemObject("user_arr");
    consolepro.consolelog("user_arr>", user_arr);
    let user_id = user_arr.user_id;
    let url = config.baseURL + "service_list.php";
    let data = new FormData();
    data.append("user_id", user_id);
    consolepro.consolelog("url", url);
    consolepro.consolelog("data", data);
    // return false
    apifuntion
      .postApi(url, data, 1)
      .then((obj) => {
        consolepro.consolelog("obj34343", obj);
        if (obj.success == "true") {
          this.setState({ servicesArray: obj.service_details });
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

  deleteButton = (business_service_id) => {
    Alert.alert(
      Lang_chg.DeleteSErvice[config.language],
      Lang_chg.areyouDeleteService[config.language],
      [
        {
          text: Lang_chg.no_txt[config.language],
          onPress: () => {
            consolepro.consolelog("nothing");
          },
        },
        {
          text: Lang_chg.yes_txt[config.language],
          onPress: () => this.finalDelete(business_service_id),
        },
      ],
      { cancelable: false }
    );
  };

  async finalDelete(business_service_id) {
    let user_arr = await localStorage.getItemObject("user_arr");
    consolepro.consolelog("user_arr>", user_arr);
    let user_id = user_arr.user_id;
    let url = config.baseURL + "delete_vendor_service.php";
    var data = new FormData();
    data.append("user_id", user_id);
    data.append("business_service_id", business_service_id);
    consolepro.consolelog("data", data);
    consolepro.consolelog("url", url);

    // return false
    apifuntion
      .postApi(url, data)
      .then((obj) => {
        consolepro.consolelog("successsssss", obj);
        if (obj.success == "true") {
          this.getServices();
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
          transparent={true}
          visible={this.state.seeDetails}
          onRequestClose={() => {
            this.setState({ seeDetails: false });
          }}
        >
          <SafeAreaView
            style={{
              flex: 1,
              backgroundColor: Colors.whiteColor,
            }}
          >
            <StatusBar
              hidden={false}
              translucent={false}
              backgroundColor={Colors.whiteColor}
              barStyle="dark-content"
              networkActivityIndicatorVisible={true}
            />

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
                  onPress={() => this.setState({ seeDetails: false })}
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
                    {Lang_chg.Service_Details_txt[config.language]}
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
            <KeyboardAwareScrollView>
              <View
                style={{
                  width: "95%",
                  alignSelf: "center",
                  marginTop: (mobileH * 2) / 100,
                }}
              >
                <Text
                  style={{
                    fontSize: (mobileW * 4) / 100,
                    fontFamily: Font.InterMedium,
                    color: Colors.black_color,
                    alignSelf: "flex-start",
                    textAlign: "justify",
                  }}
                >
                  {this.state.testDetails}
                </Text>
              </View>
            </KeyboardAwareScrollView>
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
                {Lang_chg.Edit_Services_txt[config.language]}
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
          contentContainerStyle={{ width: mobileW }}
          keyboardShouldPersistTaps="handled"
        >
          {/* ----------------for button Add Service--------- */}
          <TouchableOpacity
            onPress={() =>
              this.props.navigation.navigate("VendorAddNewServices")
            }
            style={{
              alignItems: "center",
              alignSelf: "flex-end",
              marginRight: (mobileW * 3) / 100,
            }}
          >
            <LinearGradient
              colors={[Colors.light_greencolor, Colors.purple_color]}
              start={{ x: 1, y: 0 }}
              end={{ x: 0, y: 1 }}
              style={{
                height: (mobileH * 5) / 100,
                width: (mobileW * 40) / 100,
                alignSelf: "center",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: (mobileW * 1) / 100,
                marginTop: (mobileH * 2) / 100,
              }}
            >
              <Text
                style={{
                  color: "#f5f4f5",
                  fontFamily: Font.FontSemiBold,
                  fontSize: (mobileW * 4) / 100,
                }}
              >
                {Lang_chg.Add_New_txt[config.language]}
              </Text>
            </LinearGradient>
          </TouchableOpacity>

          {/* ----------for baloone decoration service---------- */}
          {this.state.servicesArray != "NA" && (
            <FlatList
              data={this.state.servicesArray}
              renderItem={({ item, index }) => {
                return (
                  <View>
                    <View
                      style={{
                        width: (mobileW * 100) / 100,
                        alignSelf: "center",
                        // borderColor: Colors.greyColor,
                        // borderTopWidth: mobileW * 0.4 / 100,
                        marginTop: (mobileH * 2) / 100,
                      }}
                    >
                      <View
                        style={{
                          width: (mobileW * 85) / 100,
                          alignSelf: "center",
                          flexDirection: "row",
                          justifyContent: "space-between",
                          marginTop: (mobileH * 2) / 100,
                        }}
                      >
                        <View style={{ justifyContent: "flex-start" }}>
                          <Text
                            style={{
                              color: Colors.black_color,
                              fontFamily: Font.FontSemiBold,
                              fontSize: (mobileW * 3.8) / 100,
                            }}
                          >
                            {item.service_name}
                          </Text>
                          <Text
                            style={{
                              color: Colors.black_color,
                              fontFamily: Font.FontSemiBold,
                              fontSize: (mobileW * 3) / 100,
                            }}
                          >
                            {item.seating_arrangement_name}
                          </Text>
                          <Text
                            style={{
                              color: Colors.black_color,
                              fontFamily: Font.FontSemiBold,
                              fontSize: (mobileW * 3) / 100,
                            }}
                          >
                            {item.seating_layout_name}
                          </Text>
                          <TouchableOpacity
                            activeOpacity={0.7}
                            onPress={() => {
                              this.setState({
                                seeDetails: true,
                                testDetails: item.description,
                              });
                            }}
                            style={{
                              alignSelf: "flex-start",
                              flexDirection: "row",
                              paddingVertical: (mobileH * 1) / 1400,
                            }}
                          >
                            <Image
                              style={{
                                alignSelf: "center",
                                width: (mobileW * 3.3) / 100,
                                height: (mobileW * 3.3) / 100,
                                resizeMode: "contain",
                                tintColor: Colors.light_greencolor,
                                marginTop: (mobileH * 0.3) / 100,
                                // backgroundColor: 'red'
                              }}
                              source={localimag.about_us}
                            ></Image>
                            <Text
                              style={{
                                color: Colors.light_greencolor,
                                fontFamily: Font.FontRegular,
                                fontSize: (mobileW * 2.8) / 100,
                                marginLeft: (mobileW * 1) / 100,
                                textDecorationLine: "underline",
                              }}
                            >
                              {Lang_chg.See_Details_txt[config.language]}
                            </Text>
                          </TouchableOpacity>
                        </View>
                        <Text
                          style={{
                            color: Colors.black_color,
                            fontFamily: Font.FontSemiBold,
                            fontSize: (mobileW * 3) / 100,
                          }}
                        >
                          {"$" + item.price}
                        </Text>
                      </View>
                      {/* ---------2nd view------------------ */}
       
                      {/* -----------for second view------------------ */}
                      <View
                        style={{
                          width: (mobileW * 40) / 100,
                          flexDirection: "row",
                          justifyContent: "space-between",
                          alignSelf: "flex-end",
                          marginRight: (mobileW * 4) / 100,
                          marginTop: (mobileH * 1) / 100,
                        }}
                      >
                        <TouchableOpacity
                          onPress={() => {
                            this.deleteButton(item.business_service_id);
                          }}
                          activeOpacity={0.7}
                          style={{
                            width: (mobileW * 19) / 100,
                            alignSelf: "center",
                            backgroundColor: Colors.redColor,
                            borderRadius: (mobileW * 1) / 100,
                            flexDirection: "row",
                            justifyContent: "center",
                          }}
                        >
                          <Image
                            style={{
                              width: (mobileW * 2.9) / 100,
                              height: (mobileW * 2.9) / 100,
                              alignSelf: "center",
                              tintColor: Colors.whiteColor,
                            }}
                            source={localimag.delete}
                          ></Image>
                          <Text
                            style={{
                              color: Colors.whiteColor,
                              fontFamily: Font.FontSemiBold,
                              fontSize: (mobileW * 2.9) / 100,
                              textAlign: "center",
                              paddingVertical: (mobileH * 0.5) / 100,
                              marginLeft: (mobileW * 0.8) / 100,
                            }}
                          >
                            {Lang_chg.Delete_txt[config.language]}
                          </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                          onPress={() =>
                            this.props.navigation.navigate(
                              "VendorEditNewServices",
                              { item: item }
                            )
                          }
                          activeOpacity={0.7}
                          style={{
                            width: (mobileW * 19) / 100,
                            alignSelf: "center",
                            backgroundColor: Colors.green_color,
                            borderRadius: (mobileW * 1) / 100,
                            flexDirection: "row",
                            justifyContent: "center",
                          }}
                        >
                          <Image
                            style={{
                              width: (mobileW * 3) / 100,
                              height: (mobileW * 3) / 100,
                              alignSelf: "center",
                              tintColor: Colors.whiteColor,
                            }}
                            source={localimag.edit}
                          ></Image>
                          <Text
                            style={{
                              color: Colors.whiteColor,
                              fontFamily: Font.FontBold,
                              fontSize: (mobileW * 2.9) / 100,
                              textAlign: "center",
                              paddingVertical: (mobileH * 0.5) / 100,
                              marginLeft: (mobileW * 0.8) / 100,
                            }}
                          >
                            {Lang_chg.Edit1_txt[config.language]}
                          </Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                    {/* --for border view------------------- */}
                    <View
                      style={{
                        width: (mobileW * 95) / 100,
                        borderColor: Colors.border_color,
                        borderWidth: (mobileW * 0.2) / 100,
                        marginTop: (mobileH * 1) / 100,
                        backgroundColor: Colors.border_color,
                        marginLeft: (mobileW * 5.2) / 100,
                      }}
                    ></View>
                  </View>
                );
              }}
            />
          )}

          {/* ----------------for check button--------- */}

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
});
