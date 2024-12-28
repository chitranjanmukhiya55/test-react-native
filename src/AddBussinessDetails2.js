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
} from "react-native";
import {
  config,
  Lang_chg,
  Font,
  Colors,
  mobileH,
  mobileW,
  localimag,
  apifuntion,
  consolepro,
  localStorage,
  msgText,
  msgTitle,
  msgProvider,
} from "./Provider/utilslib/Utils";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import LinearGradient from "react-native-linear-gradient";
import { Nodata_foundimage } from "./Provider/Nodata_foundimage";

export default class AddBussinessDetails2 extends Component {
  _didFocusSubscription;
  _willBlurSubscription;
  constructor(props) {
    super(props);
    this.state = {
      businessName: "",
      serviceName: "",
      serviceDetails: "",
      price: "",
      serviceNameMultiple: "",
      serviceDetailsMultiple: "",
      priceMultiple: "",
      baloon: 0,
      button: false,
      allCategory: "NA",
      allCategoryModal: false,
      category_id: 0,
      category_name: "",
      image: "",
      user_id: 0,
      serviceArray: [],
      seeDetails: false,
      testDetails: "",
      isSelectCuisinessModalVisible: false,
      cuisine_arr: "NA",
      selectedCuisinesShow: "",
      selectedCuisines: "",
      category_type: "",
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

      seating_arrange_list_id_arr: "",
      seating_arrange_list_id: "",
      spacesetup: "",
      show_button: 0,
    };
    this._didFocusSubscription = props.navigation.addListener(
      "focus",
      (payload) =>
        BackHandler.addEventListener("hardwareBackPress", this.handleBackPress)
    );
  }
  componentDidMount() {
    this._willBlurSubscription = this.props.navigation.addListener(
      "blur",
      (payload) =>
        BackHandler.removeEventListener(
          "hardwareBackPress",
          this.handleBackPress
        )
    );
    this.props.navigation.addListener("focus", () => {
      this.getAllCuisines(1);
    });

    this.getAllCuisines(1);
    global_user_address = "";
    this.getAllCategorys(1);
  }

  async getAllCuisines() {
    var user_arr = await localStorage.getItemObject("user_arr");
    var user_id = user_arr.user_id;
    let url = config.baseURL + "get_all_cuisine.php?user_id=" + user_id;
    consolepro.consolelog("url", url);
    apifuntion
      .getApi(url, 1)
      .then((obj) => {
        consolepro.consolelog("obj cuisines", obj);
        if (obj.success == "true") {
          if (obj.cuisine_arr != "NA") {
            this.setState({ cuisine_arr: obj.cuisine_arr });
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

  cuisinesClick(item) {
    let data = this.state.cuisine_arr;
    consolepro.consolelog("datadatadatadata123", data);
    for (let i = 0; i < data.length; i++) {
      if (data[i].cuisine_id == item.cuisine_id) {
        if (data[i].status == true) {
          data[i].status = false;
        } else {
          data[i].status = true;
        }
      }
    }
    consolepro.consolelog("datadatadatadata456", data);
    this.setState({ cuisine_arr: data });
  }

  doneButton() {
    let data1 = [];
    let cuisinesName = "";
    let data = this.state.cuisine_arr;
    consolepro.consolelog("datadatadatadata123", data);
    for (let i = 0; i < data.length; i++) {
      if (data[i].status == true) {
        consolepro.consolelog("data[i]", data[i]);
        data1.push(data[i]);
        cuisinesName += data[i].cuisine_name + ", ";
      }
    }

    consolepro.consolelog("cuisinesName", cuisinesName);
    consolepro.consolelog("datadatadatadata456", data1);
    this.setState({
      selectedCuisines: data1,
      selectedCuisinesShow: cuisinesName,
    });
    this.setState({ isSelectCuisinessModalVisible: false });
  }
  handleBackPress = () => {
    Alert.alert(
      Lang_chg.Gobacktxt[config.language],
      Lang_chg.Doyouwanttoexitsteptxt[config.language],
      [
        {
          text: Lang_chg.NoTxt[config.language],
          onPress: () => consolepro.consolelog("Cancel Pressed"),
          style: "Yes",
        },
        {
          text: Lang_chg.YesTxt[config.language],
          onPress: () => this.props.navigation.navigate("Login"),
        },
      ],
      {
        cancelable: false,
      }
    ); // works best when the goBack is async

    return true;
  };

  // ------------------------Api for get profile details -------------
  getAllCategorys = async () => {
    let user_arr = await localStorage.getItemObject("user_arr");
    consolepro.consolelog("user_arr", user_arr);
    this.setState({ user_id: user_arr.user_id });
    let user_id = user_arr.user_id;
    // ----------------- Make Url For Particular API ----------------
    let url = config.baseURL + "category_all_list.php?user_id=" + user_id;
    consolepro.consolelog("url", url);
    //----------- Call Get API OR POST To Send Your Request -------------
    apifuntion
      .getApi(url, 1)
      .then((obj) => {
        consolepro.consolelog("objallCategory", obj);
        if (obj.success == "true") {
          if (obj.category_arr != "NA") {
            this.setState({ allCategory: obj.category_arr });
          }
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
  };

  selectCategorys = (item, index) => {
    if (this.state.serviceArray.length > 0) {
      this.setState({
        serviceArray: [],
      });
    }
    consolepro.consolelog("I am in set sub arr");
    consolepro.consolelog({ item, index });
    let data1 = this.state.allCategory;
    consolepro.consolelog(" data1.length", data1);
    for (let i = 0; i < data1.length; i++) {
      data1[i].status = false;
      if (data1[i].category_id == item.category_id) {
        data1[i].status = true;
        this.setState({
          category_id: data1[i].category_id,
          category_name:
            data1[i].category_name +
            " (" +
            item.price_type_detail.price_type +
            ")",
          image: data1[i].image,
          category_type: data1[i].category_type,
        });
      }
    }
    this.setState({
      allCategoryModal: false,
      allCategory: data1,
    });
  };

  async submitButton() {
    Keyboard.dismiss();
    let {
      businessName,
      serviceName,
      serviceDetails,
      price,
      category_name,
      seating_layout_name,
      seating_layout_id,
      seating_arrange_list_id,
      spacesetup,
      serviceNameMultiple,
      serviceDetailsMultiple,
      selectedCuisinesShow,
      priceMultiple,
    } = this.state;
    consolepro.consolelog({
      businessName,
      serviceName,
      serviceDetails,
      seating_layout_name,
      seating_layout_id,
      seating_arrange_list_id,
      spacesetup,
      price,
      category_name,
      serviceNameMultiple,
      serviceDetailsMultiple,
      priceMultiple,
      selectedCuisinesShow,
    });
    //------------------fullname===================
    if (businessName.length <= 0) {
      msgProvider.toast(msgText.emptyBusiness[config.language], "center");
      return false;
    }
    //======================================mobile============================
    if (category_name.length <= 0) {
      msgProvider.toast(msgText.emptyCategory[config.language], "center");
      return false;
    }
    if (this.state.category_type == "food") {
      if (selectedCuisinesShow.length <= 0) {
        msgProvider.toast(msgText.emptycuisines[config.language], "center");
        return false;
      }
    }
    if (spacesetup.length <= 0) {
      msgProvider.toast(msgText.emptyspacesetup[config.language], "center");
      return false;
    }
    if (seating_layout_name.length <= 0) {
      msgProvider.toast(msgText.emptyseating[config.language], "center");
      return false;
    }
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
    let data1 = [];
    data1 = this.state.serviceArray;
    consolepro.consolelog("datadata135", data1);

    let arr = {
      price: price,
      service_name: serviceName,
      serviceDetails: serviceDetails,
      seating_arrange_list_id: seating_arrange_list_id,
      spacesetup: spacesetup,
      seating_layout_name: seating_layout_name,
      seating_layout_id: seating_layout_id,
    };
    data1.push(arr);

    consolepro.consolelog("datadata", data1);
    this.setState({ serviceArray: data1 });
    let category_arr1 = this.state.seating_layout_arr;
    for (var i = 0; i < category_arr1.length; i++) {
      category_arr1[i].status = false;
    }
    let category_arr2 = this.state.seating_arrange_arr;
    for (let i = 0; i < category_arr2.length; i++) {
      category_arr2[i].status = false;
    }
    this.setState({
      seating_layout_arr: category_arr1,
      seating_arrange_arr: category_arr2,
      serviceName: "",
      serviceDetails: "",
      price: "",
      seating_arrange_list_id: "",
      spacesetup: "",
      seating_layout_name: "",
      seating_layout_id: "",
    });
  }

  async continueButton() {
    let {
      businessName,
      serviceName,
      serviceDetails,
      price,
      category_name,
      serviceNameMultiple,
      serviceDetailsMultiple,
      seating_layout_name,
      seating_layout_id,
      seating_arrange_list_id,
      spacesetup,
      priceMultiple,
    } = this.state;
    consolepro.consolelog({
      businessName,
      serviceName,
      serviceDetails,
      price,
      seating_layout_name,
      seating_layout_id,
      seating_arrange_list_id,
      spacesetup,
      category_name,
      serviceNameMultiple,
      serviceDetailsMultiple,
      priceMultiple,
    });

    let sercive_arr = this.state.serviceArray;
    let service_name = [];
    let service_details = [];
    let pricestring = [];
    let spacesetupid = [];
    let seatinglayout = [];
    for (let i = 0; i < sercive_arr.length; i++) {
      service_name.push(sercive_arr[i].service_name);
      service_details.push(sercive_arr[i].serviceDetails);
      pricestring.push(sercive_arr[i].price);
      seatinglayout.push(sercive_arr[i].seating_layout_id);
      spacesetupid.push(sercive_arr[i].seating_arrange_list_id);
    }
    let selectedCuisines = this.state.selectedCuisines;
    let cuisine_id = [];
    for (let i = 0; i < selectedCuisines.length; i++) {
      cuisine_id.push(selectedCuisines[i].cuisine_id);
    }

    let url = config.baseURL + "service_signupstep2.php";
    var data = new FormData();
    data.append("user_id", this.state.user_id);
    data.append("business_name", businessName);
    data.append("category_id", this.state.category_id);
    data.append("service_name", service_name.join(","));
    data.append("service_details", service_details.join(","));
    data.append("cuisine_id", cuisine_id.join(","));
    data.append("price", pricestring.join(","));
    data.append("seating_arrangement", spacesetupid.join(","));
    data.append("seating_layout", seatinglayout.join(","));
    consolepro.consolelog("data", data);
    consolepro.consolelog("url", url);
    let Services = await localStorage.getItemObject("serviceDetails");
    // return false;
    apifuntion
      .postApi(url, data)
      .then((obj) => {
        consolepro.consolelog("successsssss", obj);
        if (obj.success == "true") {
          setTimeout(() => {
            this.props.navigation.navigate("AddBussinessDetails");
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

        <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.isSelectCuisinessModalVisible}
          onRequestClose={() => {
            this.setState({ isSelectCuisinessModalVisible: false });
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
            {/* ---------------for header--------------- */}
            <View
              style={{
                alignItems: "center",
                alignSelf: "center",
                backgroundColor: Colors.whiteColor,
                flex: 1,
              }}
            >
              <LinearGradient
                colors={[Colors.purple_color, Colors.bluegreen_color]}
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
                  onPress={() =>
                    this.setState({ isSelectCuisinessModalVisible: false })
                  }
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
                    {Lang_chg.Cuisines_txt[config.language]}
                  </Text>
                </View>
                <View
                  style={{
                    width: (mobileW * 15) / 100,
                    alignItems: "center",
                  }}
                ></View>
              </LinearGradient>
              <KeyboardAwareScrollView
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{
                  width: mobileW,
                  paddingBottom: (mobileH * 15) / 100,
                }}
                keyboardShouldPersistTaps="handled"
              >
                <View
                  style={{
                    marginTop: (mobileW * 0.5) / 100,
                    width: mobileW,
                    height: mobileH,
                  }}
                >
                  {this.state.cuisine_arr != "NA" ? (
                    <View style={{}}>
                      <FlatList
                        data={this.state.cuisine_arr}
                        showsVerticalScrollIndicator={false}
                        keyExtractor={(index) => {
                          index.toString();
                        }}
                        // contentContainerStyle={{ paddingBottom: mobileH * 5 / 100 }}
                        renderItem={({ item, index }) => {
                          return (
                            <>
                              <TouchableOpacity
                                activeOpacity={0.7}
                                onPress={() => {
                                  this.cuisinesClick(item);
                                }}
                              >
                                <View
                                  style={{
                                    width: (mobileW * 90) / 100,
                                    alignSelf: "center",
                                    flexDirection: "row",
                                    marginTop: (mobileH * 2) / 100,
                                    justifyContent: "space-between",
                                  }}
                                >
                                  <Text
                                    style={{
                                      color: Colors.black_color,
                                      fontFamily: Font.FontSemiBold,
                                      fontSize: (mobileW * 4) / 100,
                                    }}
                                  >
                                    {item.cuisine_name}
                                  </Text>
                                  <View
                                    // onPress={() => }
                                    style={{
                                      flexDirection: "row",
                                      alignItems: "center",
                                    }}
                                  >
                                    {item.status == true ? (
                                      <Image
                                        style={{
                                          width: (mobileW * 4.5) / 100,
                                          height: (mobileW * 4.5) / 100,
                                          marginTop: (mobileH * 0.6) / 100,
                                          resizeMode: "contain",
                                        }}
                                        source={localimag.check_1}
                                      ></Image>
                                    ) : (
                                      <Image
                                        style={{
                                          width: (mobileW * 4.5) / 100,
                                          height: (mobileW * 4.5) / 100,
                                          marginTop: (mobileH * 0.6) / 100,
                                          resizeMode: "contain",
                                        }}
                                        source={localimag.uncheck}
                                      ></Image>
                                    )}
                                  </View>
                                </View>
                                <View
                                  style={{
                                    width: (mobileW * 90) / 100,
                                    alignSelf: "center",
                                    marginTop: (mobileH * 0.5) / 100,
                                  }}
                                >
                                  <Text
                                    style={{
                                      color: Colors.black_color,
                                      fontFamily: Font.FontRegular,
                                      fontSize: (mobileW * 3.2) / 100,
                                    }}
                                  >
                                    {item.description}
                                  </Text>
                                </View>
                              </TouchableOpacity>
                              <View
                                style={{
                                  width: (mobileW * 92) / 100,
                                  alignSelf: "center",
                                  marginTop: (mobileH * 1.5) / 100,
                                  borderWidth: (mobileW * 0.3) / 100,
                                  borderColor: Colors.border_color,
                                  backgroundColor: Colors.border_color,
                                }}
                              ></View>
                            </>
                          );
                        }}
                      />
                    </View>
                  ) : (
                    <Nodata_foundimage />
                  )}
                </View>
              </KeyboardAwareScrollView>
              <TouchableOpacity
                onPress={() => this.doneButton()}
                activeOpacity={0.7}
                style={{
                  alignItems: "center",
                  alignSelf: "center",
                  bottom: (mobileH * 5) / 100,
                  position: "absolute",
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
                      fontSize: (mobileW * 4.5) / 100,
                    }}
                  >
                    Done
                  </Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </SafeAreaView>
        </Modal>

        <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.allCategoryModal}
          onRequestClose={() => {
            this.setState({ allCategoryModal: false });
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
                  onPress={() => this.setState({ allCategoryModal: false })}
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
                    {Lang_chg.Category_txt[config.language]}
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
              {this.state.allCategory != "NA" ? (
                <View style={{ paddingBottom: (mobileH * 18) / 100 }}>
                  <FlatList
                    data={this.state.allCategory}
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
                            this.selectCategorys(item, index);
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
                              source={{ uri: item.image }}
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
                              {item.category_name}
                              {" (" + item.price_type_detail.price_type + ")"}
                            </Text>
                          </View>

                          <View
                            style={{
                              width: "20%",
                              flexDirection: "row",
                              justifyContent: "space-around",
                              alignItems: "flex-end",
                            }}
                          >
                            <View></View>
                            <Image
                              style={{
                                height: (mobileW * 6) / 100,
                                width: (mobileW * 6) / 100,
                                resizeMode: "contain",
                              }}
                              source={
                                item.status == true ? localimag.Check : null
                              }
                            ></Image>
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

        {/* {----------------------------------------------------} */}
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
                  width: "92%",
                  alignSelf: "center",
                  marginTop: (mobileH * 2) / 100,
                }}
              >
                <Text
                  style={{
                    fontSize: (mobileW * 4) / 100,
                    fontFamily: Font.FontSemiBold,
                    color: Colors.black_color,
                    alignSelf: "flex-start",
                  }}
                >
                  {this.state.testDetails}
                </Text>
              </View>
            </KeyboardAwareScrollView>
          </SafeAreaView>
        </Modal>

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
              onPress={() => this.handleBackPress()}
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
                {Lang_chg.Add_Bussiness_Details_txt[config.language]}
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
          <View style={{ alignSelf: "center", marginTop: (mobileH * 1) / 100 }}>
            <Image
              style={{
                alignSelf: "center",
                width: (mobileW * 80) / 100,
                height: (mobileW * 12) / 100,
                resizeMode: "contain",
                // backgroundColor: 'red'
              }}
              source={localimag.addBussiness}
            ></Image>
            <View
              style={{
                width: (mobileW * 82) / 100,
                alignSelf: "center",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Text
                style={{
                  color: Colors.black_color,
                  fontFamily: Font.FontSemiBold,
                  fontSize: (mobileW * 3) / 100,
                }}
              >
                {Lang_chg.Services_txt[config.language]}
              </Text>
              <Text
                style={{
                  color: Colors.black_color,
                  fontFamily: Font.FontSemiBold,
                  fontSize: (mobileW * 3) / 100,
                }}
              >
                {Lang_chg.About_txt[config.language]}
              </Text>
              <Text
                style={{
                  color: Colors.black_color,
                  fontFamily: Font.FontSemiBold,
                  fontSize: (mobileW * 3) / 100,
                }}
              >
                {Lang_chg.Avelability_txt[config.language]}
              </Text>
              <Text
                style={{
                  color: Colors.greyColor,
                  fontFamily: Font.FontRegular,
                  fontSize: (mobileW * 3) / 100,
                }}
              >
                {Lang_chg.Photos_txt[config.language]}
              </Text>
            </View>
          </View>
          {/* ---------------border view----------- */}
          <View
            style={{
              width: mobileW,
              borderColor: Colors.border_color,
              borderWidth: (mobileW * 0.3) / 100,
              backgroundColor: Colors.border_color,
              marginTop: (mobileH * 4) / 100,
            }}
          ></View>
          {/* -----------------end----------- */}

          {/* //=========Category  Name===========// */}
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
                {Lang_chg.Bussiness_Name_txt[config.language]}
              </Text>
            </View>
            <LinearGradient
              colors={[Colors.voilet_color, Colors.light_greencolor]}
              start={{ x: 0, y: 0 }}
              end={{ x: 0, y: 1 }}
              style={styles.linearGradient}
            >
              <View style={styles.innerContainer}>
                <TextInput
                  style={styles.buttonText}
                  placeholderTextColor={Colors.greyColor}
                  placeholder={
                    Lang_chg.Enter_Bussiness_Name_txt[config.language]
                  }
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
                    this.setState({ businessName: txt });
                  }}
                  value={this.state.businessName}
                  maxLength={25}
                />
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
                {Lang_chg.Category_txt[config.language]}
              </Text>
            </View>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => {
                this.setState({ allCategoryModal: true });
              }}
            >
              <LinearGradient
                colors={[Colors.voilet_color, Colors.light_greencolor]}
                start={{ x: 0, y: 0 }}
                end={{ x: 0, y: 1 }}
                style={styles.linearGradient}
              >
                <View style={styles.innerContainer}>
                  {this.state.category_name != "" && (
                    <View
                      style={{
                        width: "8%",
                        justifyContent: "center",
                        alignSelf: "center",
                      }}
                    >
                      <Image
                        style={{
                          marginLeft: (mobileW * 3) / 100,
                          height: (mobileW * 6) / 100,
                          width: (mobileW * 6) / 100,
                          resizeMode: "contain",
                          borderRadius: (mobileW * 3) / 100,
                          alignSelf: "center",
                        }}
                        source={{ uri: this.state.image }}
                      ></Image>
                    </View>
                  )}
                  <Text style={styles.buttonText}>
                    {this.state.category_name != ""
                      ? this.state.category_name
                      : "Select Category"}
                  </Text>
                </View>
              </LinearGradient>
            </TouchableOpacity>
            {this.state.category_type == "food" && (
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
                    marginTop: (mobileH * 1) / 100,
                  }}
                >
                  <Text
                    style={{
                      fontFamily: Font.FontBold,
                      color: Colors.black_color,
                      fontSize: (mobileW * 4) / 100,
                    }}
                  >
                    {Lang_chg.Cuisines_txt[config.language]}
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
                      onPress={() =>
                        this.setState({ isSelectCuisinessModalVisible: true })
                      }
                      style={styles.innerContainer1}
                    >
                      <Text
                        numberOfLines={1}
                        style={{
                          fontFamily: Font.FontRegular,
                          color: Colors.greyColor,
                          fontSize: (mobileW * 3.7) / 100,
                        }}
                      >
                        {this.state.selectedCuisinesShow != ""
                          ? this.state.selectedCuisinesShow
                          : Lang_chg.Select_Cuisines_txt[config.language]}
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
            )}
          </View>
          {/* //=========service Name===========// */}
          {/* //=========seating arrangement Name===========// */}
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
            <TouchableOpacity
              activeOpacity={0.9}
              onPress={() => {
                this.setState({ allseatarrangemodal: true });
              }}
            >
              <LinearGradient
                colors={[Colors.voilet_color, Colors.light_greencolor]}
                start={{ x: 0, y: 0 }}
                end={{ x: 0, y: 1 }}
                style={styles.linearGradient}
              >
                <View style={styles.innerContainer}>
                  <Text style={styles.buttonText}>
                    {this.state.spacesetup != ""
                      ? this.state.spacesetup
                      : "Select Space Setup"}
                  </Text>
                </View>
              </LinearGradient>
            </TouchableOpacity>
          </View>
          {/* //=========seating arrangement Name===========// */}

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
            <TouchableOpacity
              activeOpacity={0.9}
              onPress={() => {
                this.setState({ allseatlayoutmodal: true });
              }}
            >
              <LinearGradient
                colors={[Colors.voilet_color, Colors.light_greencolor]}
                start={{ x: 0, y: 0 }}
                end={{ x: 0, y: 1 }}
                style={styles.linearGradient}
              >
                <View style={styles.innerContainer}>
                  <Text style={styles.buttonText}>
                    {this.state.seating_layout_name != ""
                      ? this.state.seating_layout_name
                      : "Select Seating Layout"}
                  </Text>
                </View>
              </LinearGradient>
            </TouchableOpacity>
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
                {Lang_chg.Service_Name_txt[config.language]}
              </Text>
            </View>
            <LinearGradient
              colors={[Colors.voilet_color, Colors.light_greencolor]}
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
                  maxLength={25}
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
              colors={[Colors.voilet_color, Colors.light_greencolor]}
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
              colors={[Colors.voilet_color, Colors.light_greencolor]}
              start={{ x: 0, y: 0 }}
              end={{ x: 0, y: 1 }}
              style={styles.linearGradient}
            >
              <View style={styles.innerContainer}>
                <TextInput
                  style={styles.buttonText}
                  placeholderTextColor={Colors.greyColor}
                  placeholder="Enter Price"
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
                    this.setState({ price: txt });
                  }}
                  value={this.state.price}
                  maxLength={25}
                />
              </View>
            </LinearGradient>
          </View>
          {/* ----------------for button submit--------- */}
          <TouchableOpacity
            onPress={() => {
              this.submitButton();
            }}
            activeOpacity={0.7}
            style={{
              alignItems: "center",
              alignSelf: "flex-end",
              marginRight: (mobileW * 3) / 100,
              bottom: (mobileW * 3) / 100,
              marginTop: (mobileH * 3) / 100,
            }}
          >
            <LinearGradient
              colors={[Colors.light_greencolor, Colors.purple_color]}
              start={{ x: 1, y: 1 }}
              end={{ x: 0, y: 1 }}
              style={{
                height: (mobileH * 5) / 100,
                width: (mobileW * 36) / 100,
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
                {Lang_chg.submit_txt[config.language]}
              </Text>
            </LinearGradient>
          </TouchableOpacity>

          {/* ----------for baloone decoration service---------- */}
          {this.state.serviceArray.length > 0 && (
            <>
              <View>
                <FlatList
                  data={this.state.serviceArray}
                  renderItem={({ item, index }) => {
                    return (
                      <>
                        <View
                          style={{
                            width: (mobileW * 100) / 100,
                            alignSelf: "center",
                            borderColor: Colors.greyColor,
                            borderTopWidth: (mobileW * 0.4) / 100,
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
                            <View style={{}}>
                              <Text
                                style={{
                                  color: Colors.black_color,
                                  fontFamily: Font.FontSemiBold,
                                  fontSize: (mobileW * 3) / 100,
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
                                {item.spacesetup}
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
                                    testDetails: item.serviceDetails,
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
                        </View>
                        {/* --for border view------------------- */}
                        <View
                          style={{
                            width: (mobileW * 85) / 100,
                            borderColor: Colors.border_color,
                            borderWidth: (mobileW * 0.2) / 100,
                            marginTop: (mobileH * 1) / 100,
                            alignSelf: "center",
                            backgroundColor: Colors.border_color,
                          }}
                        ></View>
                        {/* -------------------for button continue condition------------ */}
                      </>
                    );
                  }}
                />
                <TouchableOpacity
                  onPress={() => this.continueButton()}
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
                      marginTop: (mobileH * 4) / 100,
                    }}
                  >
                    <Text
                      style={{
                        color: "#f5f4f5",
                        fontFamily: Font.FontSemiBold,
                        fontSize: (mobileW * 4.3) / 100,
                      }}
                    >
                      {Lang_chg.Continue_txt[config.language]}
                    </Text>
                  </LinearGradient>
                </TouchableOpacity>
              </View>
            </>
          )}
        </KeyboardAwareScrollView>
      </SafeAreaView>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  innerContainer1: {
    backgroundColor: Colors.whiteColor,
    flexDirection: "row",
    justifyContent: "space-between",
    width: (mobileW * 87) / 100,
    alignSelf: "center",
    marginLeft: (mobileW * 2) / 100,
    paddingVertical: (mobileH * 1) / 100,
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
