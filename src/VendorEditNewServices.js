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
  Modal,
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
  msgText,
  msgProvider,
  apifuntion,
  localStorage,
  msgTitle,
} from "./Provider/utilslib/Utils";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import LinearGradient from "react-native-linear-gradient";
import HideWithKeyboard from "react-native-hide-with-keyboard";
import { Nodata_foundimage } from "./Provider/Nodata_foundimage";

export default class VendorEditNewServices extends Component {
  constructor(props) {
    super(props);
    this.state = {
      serviceName: "",
      serviceDetails: "",
      price: "",
      item: this.props.route.params.item,
      seating_arrange_arr: [
        { id: 2, seat_arrange: "Seating", status: false },
        { id: 1, seat_arrange: "Standing", status: false },
        { id: 0, seat_arrange: "Not sure", status: false },
      ],
      seating_layout_arr: [
        { id: 0, seat_layout: "Boardroom", status: false },
        { id: 1, seat_layout: "Caberet", status: false },
        { id: 2, seat_layout: "Classroom", status: false },
        { id: 3, seat_layout: "Theatre", status: false },
        { id: 4, seat_layout: "U-shaped", status: false },
        { id: 5, seat_layout: "No preference", status: false },
      ],
      allseatarrangemodal: false,
      allseatlayoutmodal: false,
      seating_layout_name: "",
      seating_layout_id: "",

      seating_arrange_list_id: "",
      spacesetup: "",
      show_button: 0,
    };
  }

  componentDidMount() {
    this.props.navigation.addListener("focus", () => {
      this.setState({ item: this.props.route.params.item });
      consolepro.consolelog("itemm,,,,", this.state.item);
      this.setState({
        serviceName: this.state.item.service_name,
        serviceDetails: this.state.item.description,
        price: this.state.item.price,
      });
      let seating_arrange_arr = this.state.seating_arrange_arr;
      for (let i = 0; i < seating_arrange_arr.length; i++) {
        if (this.state.item.seating_arrangement == seating_arrange_arr[i].id) {
          seating_arrange_arr[i].status = true;
        }
      }
      let seating_layout_arr = this.state.seating_layout_arr;
      for (let i = 0; i < seating_layout_arr.length; i++) {
        if (this.state.item.seating_layout == seating_layout_arr[i].id) {
          seating_layout_arr[i].status = true;
        }
      }
      this.setState({
        seating_layout_arr: seating_layout_arr,
        seating_arrange_arr: seating_arrange_arr,
        seating_layout_name: this.state.item.seating_layout_name,
        seating_layout_id: this.state.item.seating_layout,
        seating_arrange_list_id: this.state.item.seating_arrangement,
        spacesetup: this.state.item.seating_arrangement_name,
      });
    });
  }
  async updateNewService() {
    let user_arr = await localStorage.getItemObject("user_arr");
    consolepro.consolelog("user_arr>", user_arr);
    let user_id = user_arr.user_id;
    Keyboard.dismiss();
    let {
      serviceName,
      serviceDetails,
      price,
      seating_layout_id,
      seating_arrange_list_id,
    } = this.state;
    consolepro.consolelog({
      serviceName,
      serviceDetails,
      price,
    });

    if (serviceName.length <= 0) {
      msgProvider.toast(msgText.emptyService[config.language], "center");
      return false;
    }
    if (serviceDetails.length <= 0) {
      msgProvider.toast(msgText.emptyServiceDetails[config.language], "center");
      return false;
    }
    if (price.length <= 0) {
      msgProvider.toast(msgText.emptyPrice[config.language], "center");
      return false;
    }

    let url = config.baseURL + "edit_services.php";
    var data = new FormData();
    data.append("user_id", user_id);
    data.append("service_name", serviceName);
    data.append("service_details", serviceDetails);
    data.append("business_service_id", this.state.item.business_service_id);
    data.append("price", price);
    data.append("seating_arrangement", seating_arrange_list_id);
    data.append("seating_layout", seating_layout_id);
    consolepro.consolelog("data", data);
    consolepro.consolelog("url", url);

    // return false
    apifuntion
      .postApi(url, data)
      .then((obj) => {
        consolepro.consolelog("successsssss", obj);
        if (obj.success == "true") {
          setTimeout(() => {
            msgProvider.toast(obj.msg[config.language], "center");
          }, 300);
          this.props.navigation.goBack();
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

  selectSeatingarrange = (item, index, status) => {
    let category_arr = "";
    let count = 0;
    let all = 0;
    if (status == 1) {
      category_arr = this.state.seating_arrange_arr;
      for (let i = 0; i < category_arr.length; i++) {
        category_arr[i].status = false;
      }
      category_arr[index].status = true;
      this.setState({
        seating_arrange_arr: category_arr,
        spacesetup: item.seat_arrange,
        seating_arrange_list_id: item.id,
        show_button: count,
        allseatarrangemodal: false,
      });
    } else {
      category_arr = this.state.seating_layout_arr;
      for (var i = 0; i < category_arr.length; i++) {
        category_arr[i].status = false;
      }
      category_arr[index].status = true;
      this.setState({
        seating_layout_arr: category_arr,
        seating_layout_name: item.seat_layout,
        seating_layout_id: item.id,
        allseatlayoutmodal: false,
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
        {/* seating arrangement */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.allseatarrangemodal}
          onRequestClose={() => {
            this.setState({ allseatarrangemodal: false });
          }}
        >
          <SafeAreaView style={styles.container}>
            <StatusBar
              hidden={false}
              translucent={false}
              backgroundColor={Colors.whiteColor}
              barStyle="dark-content"
              networkActivityIndicatorVisible={true}
            />

            <View
              style={{
                alignItems: "center",
                alignSelf: "center",
                marginTop: (mobileH * 5) / 100,
              }}
            >
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
                  onPress={() => this.setState({ allseatarrangemodal: false })}
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
                    {Lang_chg.seat_arrange[config.language]}
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
                marginTop: (mobileW * 0.5) / 100,
                width: mobileW,
                alignSelf: "center",
                paddingVertical: (mobileW * 1) / 100,
                backgroundColor: Colors.FB_Color,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {this.state.seating_arrange_arr != "NA" ? (
                <View style={{ paddingBottom: (mobileH * 18) / 100 }}>
                  <FlatList
                    data={this.state.seating_arrange_arr}
                    showsVerticalScrollIndicator={false}
                    keyExtractor={(index) => {
                      index.toString();
                    }}
                    contentContainerStyle={{
                      paddingBottom: (mobileH * 5) / 100,
                    }}
                    renderItem={({ item, index }) => {
                      return (
                        <TouchableOpacity
                          activeOpacity={0.7}
                          onPress={() => {
                            this.selectSeatingarrange(item, index, 1);
                          }}
                          style={{
                            width: mobileW * 0.9,
                            backgroundColor: Colors.whiteColor,
                            alignSelf: "center",
                            marginTop: mobileW * 0.02,
                            flexDirection: "row",
                            paddingVertical: mobileW * 0.02,
                            alignItems: "center",
                            borderBottomColor: Colors.black_color,
                            borderBottomWidth: 0.7,
                          }}
                        >
                          <View style={{ width: "8%" }}>
                            <Image
                              style={{
                                height: (mobileW * 6) / 100,
                                width: (mobileW * 6) / 100,
                                resizeMode: "contain",
                                borderRadius: (mobileW * 3) / 100,
                              }}
                              source={
                                item.status == false
                                  ? localimag.radio_unactive
                                  : localimag.radio_active
                              }
                            ></Image>
                          </View>
                          <View
                            style={{
                              width: "72%",
                              flexDirection: "row",
                              justifyContent: "space-between",
                            }}
                          >
                            <Text
                              style={{
                                fontSize: mobileW * 0.04,
                                fontFamily: Font.InterMedium,
                                color: Colors.black_color,
                              }}
                            >
                              {item.seat_arrange}
                            </Text>
                          </View>
                        </TouchableOpacity>
                      );
                    }}
                  />
                </View>
              ) : (
                <Nodata_foundimage />
              )}
            </View>
          </SafeAreaView>
        </Modal>

        {/* seating layout */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.allseatlayoutmodal}
          onRequestClose={() => {
            this.setState({ allseatlayoutmodal: false });
          }}
        >
          <SafeAreaView style={styles.container}>
            <StatusBar
              hidden={false}
              translucent={false}
              backgroundColor={Colors.whiteColor}
              barStyle="dark-content"
              networkActivityIndicatorVisible={true}
            />

            <View
              style={{
                alignItems: "center",
                alignSelf: "center",
                marginTop: (mobileH * 5) / 100,
              }}
            >
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
                  onPress={() => this.setState({ allseatlayoutmodal: false })}
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
                    {Lang_chg.seat_layout[config.language]}
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
                marginTop: (mobileW * 0.5) / 100,
                width: mobileW,
                alignSelf: "center",
                paddingVertical: (mobileW * 1) / 100,
                backgroundColor: Colors.FB_Color,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {this.state.seating_layout_arr != "NA" ? (
                <View style={{ paddingBottom: (mobileH * 18) / 100 }}>
                  <FlatList
                    data={this.state.seating_layout_arr}
                    showsVerticalScrollIndicator={false}
                    keyExtractor={(index) => {
                      index.toString();
                    }}
                    contentContainerStyle={{
                      paddingBottom: (mobileH * 5) / 100,
                    }}
                    renderItem={({ item, index }) => {
                      return (
                        <TouchableOpacity
                          activeOpacity={0.7}
                          onPress={() => {
                            this.selectSeatingarrange(item, index, 2);
                          }}
                          style={{
                            width: mobileW * 0.9,
                            backgroundColor: Colors.whiteColor,
                            alignSelf: "center",
                            marginTop: mobileW * 0.02,
                            flexDirection: "row",
                            paddingVertical: mobileW * 0.02,
                            alignItems: "center",
                            borderBottomColor: Colors.black_color,
                            borderBottomWidth: 0.7,
                          }}
                        >
                          <View style={{ width: "8%" }}>
                            <Image
                              style={{
                                height: (mobileW * 6) / 100,
                                width: (mobileW * 6) / 100,
                                resizeMode: "contain",
                                borderRadius: (mobileW * 3) / 100,
                              }}
                              source={
                                item.status == false
                                  ? localimag.radio_unactive
                                  : localimag.radio_active
                              }
                            ></Image>
                          </View>
                          <View
                            style={{
                              width: "72%",
                              flexDirection: "row",
                              justifyContent: "space-between",
                            }}
                          >
                            <Text
                              style={{
                                fontSize: mobileW * 0.04,
                                fontFamily: Font.InterMedium,
                                color: Colors.black_color,
                              }}
                            >
                              {item.seat_layout}
                            </Text>
                          </View>
                        </TouchableOpacity>
                      );
                    }}
                  />
                </View>
              ) : (
                <Nodata_foundimage />
              )}
            </View>
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
                {Lang_chg.Edit_Services1_txt[config.language]}
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
          contentContainerStyle={{
            width: mobileW,
            paddingBottom: (mobileH * 5) / 100,
          }}
          keyboardShouldPersistTaps="handled"
        >
          {/* //=========service Name===========// */}
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
                {Lang_chg.seat_arrange[config.language]}
              </Text>
            </View>
            <LinearGradient
              colors={[Colors.voilet_color, Colors.bluegreen_color]}
              start={{ x: 0, y: 0 }}
              end={{ x: 0, y: 1 }}
              style={styles.linearGradient}
            >
              <View style={styles.innerContainer}>
                <TouchableOpacity
                  onPress={() => this.setState({ allseatarrangemodal: true })}
                  style={styles.innerContainer1}
                >
                  <Text
                    numberOfLines={1}
                    style={{
                      fontFamily: Font.FontRegular,
                      color: Colors.black_color,
                      fontSize: (mobileW * 3.7) / 100,
                    }}
                  >
                    {this.state.spacesetup != ""
                      ? this.state.spacesetup
                      : "Select Space Setup"}
                  </Text>
                  <Image
                    style={{
                      width: (mobileW * 4) / 100,
                      height: (mobileW * 4) / 100,
                      resizeMode: "contain",
                      marginTop: (mobileH * 0.5) / 100,
                      tintColor: Colors.greyColor,
                    }}
                    source={localimag.backr}
                  ></Image>
                </TouchableOpacity>
              </View>
            </LinearGradient>
          </View>
          {/* //=========seating layout Name===========// */}
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
                {Lang_chg.seat_layout[config.language]}
              </Text>
            </View>
            <LinearGradient
              colors={[Colors.voilet_color, Colors.bluegreen_color]}
              start={{ x: 0, y: 0 }}
              end={{ x: 0, y: 1 }}
              style={styles.linearGradient}
            >
              <View style={styles.innerContainer}>
                <TouchableOpacity
                  onPress={() => this.setState({ allseatlayoutmodal: true })}
                  style={styles.innerContainer1}
                >
                  <Text
                    numberOfLines={1}
                    style={{
                      fontFamily: Font.FontRegular,
                      color: Colors.black_color,
                      fontSize: (mobileW * 3.7) / 100,
                    }}
                  >
                    {this.state.seating_layout_name != ""
                      ? this.state.seating_layout_name
                      : "Select Seating Layout"}
                  </Text>
                  <Image
                    style={{
                      width: (mobileW * 4) / 100,
                      height: (mobileW * 4) / 100,
                      resizeMode: "contain",
                      marginTop: (mobileH * 0.5) / 100,
                      tintColor: Colors.greyColor,
                    }}
                    source={localimag.backr}
                  ></Image>
                </TouchableOpacity>
              </View>
            </LinearGradient>
          </View>
          {/* //=========service Name===========// */}
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
                {Lang_chg.Service_Name_txt[config.language]}
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
                  placeholder="Enter Service Name"
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
                    this.setState({ serviceName: txt });
                  }}
                  value={this.state.serviceName}
                  maxLength={50}
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
                {Lang_chg.Service_Details_txt[config.language]}
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
                  placeholder="Enter Service Details"
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
                    this.setState({ serviceDetails: txt });
                  }}
                  value={this.state.serviceDetails}
                  maxLength={250}
                />
              </View>
            </LinearGradient>
          </View>
          {/* //=========Price Name===========// */}
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
                {Lang_chg.Service_Price_txt[config.language]}
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
                  placeholder="Enter Price"
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
                    this.setState({ price: txt });
                  }}
                  value={this.state.price}
                  maxLength={25}
                />
              </View>
            </LinearGradient>
          </View>
          {/* ----------------for button continue--------- */}
        </KeyboardAwareScrollView>
        <HideWithKeyboard>
          <TouchableOpacity
            onPress={() => this.updateNewService()}
            activeOpacity={0.7}
            style={{
              alignItems: "center",
              alignSelf: "center",
              marginBottom: (mobileH * 1) / 100,
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
                // marginTop: mobileH * 10 / 100
              }}
            >
              <Text
                style={{
                  color: "#f5f4f5",
                  fontFamily: Font.FontSemiBold,
                  fontSize: (mobileW * 4.3) / 100,
                }}
              >
                {Lang_chg.update_txt[config.language]}
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
    // backgroundColor: 'transparent',
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
  innerContainer1: {
    backgroundColor: Colors.whiteColor,
    flexDirection: "row",
    justifyContent: "space-between",
    width: (mobileW * 85) / 100,
    alignSelf: "center",
    marginLeft: (mobileW * 2) / 100,
    paddingVertical: (mobileH * 1) / 100,
  },
});
