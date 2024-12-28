import React, { Component } from "react";
import {
  Text,
  SafeAreaView,
  FlatList,
  StatusBar,
  View,
  StyleSheet,
  Keyboard,
  TouchableOpacity,
  Image,
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
  localStorage,
  apifuntion,
  msgTitle,
  msgProvider,
  msgText,
} from "./Provider/utilslib/Utils";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import LinearGradient from "react-native-linear-gradient";
import { LinearTextGradient } from "react-native-text-gradient";
import { Nodata_foundimage } from "./Provider/Nodata_foundimage";
import StarRating from "react-native-star-rating";
import { Item } from "react-native-paper/lib/typescript/components/List/List";

export default class VendorsTab0 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      report: "",
      Tab: 0,
      addstatus: false,
      category_arr: "NA",
      vendor_arr: "NA",
      addedItem: [],
      addedItemArray: "NA",
      category: "",
      grandTotal: 0,
      addedItemVisible: false,
      customNumberOfGuest: "",
      service_arr: [],
      budget: 0,
      selectedCuisines: [],
      latitude: "",
      longitude: "",
      budgetExcced: false,
      createEventJSON: "",
    };
  }
  componentDidMount() {
    this.props.navigation.addListener("focus", () => {
      // this.getVendersByCategory()
    });
    this.getBudget();
  }

  async getBudget() {
    let createEventJSON = await localStorage.getItemObject("createEventJSON");
    consolepro.consolelog("createEventJSON123", createEventJSON);

    if (createEventJSON != null) {
      consolepro.consolelog(
        "createEventJSON.selectedCuisines",
        createEventJSON.selectedCuisines
      );

      let data1 = createEventJSON.selectedCuisines;

      let latitude = createEventJSON.latitude;
      let longitude = createEventJSON.longitude;

      consolepro.consolelog("data1data1", data1);
      consolepro.consolelog("latitude", latitude);
      consolepro.consolelog("longitude", longitude);
      let data = [];
      consolepro.consolelog("data116", data);
      for (let i = 0; i < data1.length; i++) {
        data.push(data1[i].cuisine_id);
      }
      consolepro.consolelog("datadata", data);
      this.setState(
        {
          customNumberOfGuest: createEventJSON.customNumberOfGuest,
          budget: createEventJSON.budget,
          createEventJSON: createEventJSON,
          selectedCuisines: data.join(","),
          latitude: latitude,
          longitude: longitude,
        },
        () => {
          this.getVendersByCategory();
        }
      );
    }
  }

  async getVendersByCategory() {
    // return false
    var user_arr = await localStorage.getItemObject("user_arr");
    let { latitude, longitude } = this.state;
    var user_id = user_arr.user_id;
    let url = "";
    if (this.state.createEventJSON.subcategory_arr == "NA") {
      url =
        config.baseURL +
        "select_catagory_vendor.php?user_id=" +
        user_id +
        "&category_id=0" +
        "&cuisine_id=" +
        this.state.selectedCuisines +
        "&latitude=" +
        latitude +
        "&longitude=" +
        longitude +
        "&budget_amount=" +
        this.state.budget +
        "&event_category_id=" +
        this.state.createEventJSON.categoryDetails.category_id +
        "&type=" +
        0;
    } else {
      url =
        config.baseURL +
        "select_catagory_vendor.php?user_id=" +
        user_id +
        "&category_id=0" +
        "&cuisine_id=" +
        this.state.selectedCuisines +
        "&latitude=" +
        latitude +
        "&longitude=" +
        longitude +
        "&budget_amount=" +
        this.state.budget +
        "&event_category_id=" +
        this.state.createEventJSON.subcategory_arr.event_sub_category_id +
        "&type=" +
        1;
    }

    consolepro.consolelog("url", url);
    apifuntion
      .getApi(url, 1)
      .then((obj) => {
        consolepro.consolelog("obj cuisines", obj);
        if (obj.success == "true") {
          if (obj.category_arr != "NA") {
            this.setState({ category_arr: obj.category_arr });
            let data = obj.category_arr;
            data[0].status = true;
            let venders = data[0].vendor_arr;

            consolepro.consolelog("54545neder", venders);
            this.setState({ category_arr: data, vendor_arr: venders });
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

  tabSwitch(item) {
    let data = this.state.category_arr;
    consolepro.consolelog("datadatadatadata123", data);
    for (let i = 0; i < data.length; i++) {
      data[i].status = false;
      if (data[i].category_id == item.category_id) {
        data[i].status = true;
        this.setState({ vendor_arr: data[i].vendor_arr, category: data[i] });
      }
    }
    consolepro.consolelog("vendor_arr", this.state.vendor_arr);
    this.setState({ category_arr: data });
  }

  addButton(item) {
    let data = this.state.vendor_arr;
    let data1 = [];
    data1 = this.state.addedItem;
    for (let i = 0; i < data.length; i++) {
      data[i].status = false;
      if (data[i].business_id == item.business_id) {
        data[i].status = true;
      }

      if (data1.length == 0) {
        data1.push(item);
      } else {
        for (let i = 0; i < data1.length; i++) {
          if (data1[i].category_id == item.category_id) {
            if (i == 0) {
              data1.splice(i, i + 1);
            } else {
              data1.splice(i, i);
            }
            data1[i] = item;
          } else {
            data1.push(item);
          }
        }
      }
      let addedItem = this.state.addedItem;
      for (let i = 0; i < addedItem.length; i++) {
        for (let j = 0; j < addedItem[i].service_arr.length; j++) {
          if (data1[i].category_id == item.category_id) {
            if (addedItem[i].service_arr[j].status == true) {
              addedItem[i].service_arr[j].status = false;
            }
          }
        }
        consolepro.consolelog(
          "add_statusadd_status240",
          addedItem[i].add_status
        );
      }
      consolepro.consolelog("datadatadatadata456", data);
      this.setState({
        vendor_arr: data,
        addedItemVisible: true,
        addedItem: data1,
      });
    }
    this.totalAmount();
  }

  //---------function for totalamount start ---------------
  totalAmount = () => {
    let addedItem = this.state.addedItem;
    consolepro.consolelog("addedItem203", addedItem);
    var totalAmount = 0;
    for (let i = 0; i < addedItem.length; i++) {
      if (addedItem[i].status == true) {
        for (let j = 0; j < addedItem[i].service_arr.length; j++) {
          if (addedItem[i].service_arr[j].status == true) {
            if (addedItem[i].category_name == "Caterers") {
              totalAmount = parseFloat(
                parseFloat(totalAmount) +
                  parseFloat(addedItem[i].service_arr[j].price).toFixed(2) *
                    parseInt(this.state.customNumberOfGuest)
              );
            } else {
              totalAmount = parseFloat(
                parseFloat(totalAmount) +
                  parseFloat(addedItem[i].service_arr[j].price)
              ).toFixed(2);
            }
          }
        }
      }
    }
    consolepro.consolelog("budgetExcced", this.state.budget);
    consolepro.consolelog("totalAmount", totalAmount);
    if (parseInt(totalAmount) > parseInt(this.state.budget)) {
      this.setState({ budgetExcced: true });
    } else {
      this.setState({ budgetExcced: false });
    }
    this.setState({ grandTotal: totalAmount });
  };
  //---------function for totalamount end ---------------

  removeButton(item) {
    let data1 = [];
    let data2 = [];
    data1 = this.state.addedItem;
    let data = this.state.vendor_arr;
    for (let i = 0; i < data.length; i++) {
      if (data[i].business_service_id == item.business_service_id) {
        data[i].status = false;
        consolepro.consolelog("addedItemremove", item);
      }
    }
    for (let i = 0; i < data1.length; i++) {
      if (data1[i].category_id != item.category_id) {
        data2.push(data1[i]);
      }
    }
    if (data2.length == 0) {
      this.setState({ addedItemVisible: false });
    }
    consolepro.consolelog("data1data188====", data1);
    consolepro.consolelog("datadatadatadata456", data);
    this.setState({ vendor_arr: data, addedItem: data2 });
    this.totalAmount();
  }

  continueButton() {
    let addedItem = this.state.addedItem;
    consolepro.consolelog("182", addedItem);
    for (let i = 0; i < addedItem.length; i++) {
      for (let j = 0; j < addedItem[i].service_arr.length; j++) {
        consolepro.consolelog(
          "addedItem[i].service_arr[j].add_status",
          addedItem[i].add_status
        );
        if (addedItem[i].add_status != undefined) {
          if (addedItem[i].add_status == false) {
            msgProvider.toast(
              msgText.emptyValidation[config.language],
              "center"
            );
            return false;
          }
        } else {
          msgProvider.toast(msgText.emptyValidation[config.language], "center");
          return false;
        }
      }
    }

    let data = [];
    consolepro.consolelog("data116", data);
    let category_arr = this.state.category_arr;
    consolepro.consolelog("category_arr", category_arr);
    for (let i = 0; i < category_arr.length; i++) {
      if (category_arr.vendor_arr != "NA") {
        for (let j = 0; j < category_arr[i].vendor_arr.length; j++) {
          if (category_arr[i].vendor_arr[j].status == true) {
            data.push(category_arr[i].vendor_arr[j]);
          }
        }
      }
    }
    consolepro.consolelog("this.state.grandTotal", this.state.grandTotal);
    consolepro.consolelog("this.state.budget", this.state.budget);

    // if (parseInt(this.state.budget) < this.state.grandTotal) {
    //     msgProvider.toast(msgText.budgetValidation[config.language], 'center')
    //     return false
    // }

    consolepro.consolelog("data126", data);
    this.setState({ addedItemArray: data });
    // return false
    this.props.navigation.navigate("ProposedEventVendorListTab0", {
      addedItemArray: data,
    });
  }

  isSelected(item, index, item1, index1) {
    consolepro.consolelog({ item, index, item1, index1 });
    let addedItem = this.state.addedItem;
    for (let i = 0; i < addedItem.length; i++) {
      for (let j = 0; j < addedItem[i].service_arr.length; j++) {
        if (
          item.business_service_id ==
          addedItem[i].service_arr[j].business_service_id
        ) {
          if (addedItem[i].service_arr[j].status == true) {
            addedItem[i].service_arr[j].status = false;
            addedItem[i].add_status = false;
          } else {
            addedItem[i].service_arr[j].status = true;
            addedItem[i].add_status = true;
          }
        }
        consolepro.consolelog(
          "add_statusadd_status240",
          addedItem[i].add_status
        );
      }
    }
    for (let i = 0; i < addedItem.length; i++) {
      for (let j = 0; j < addedItem[i].service_arr.length; j++) {
        if (addedItem[i].service_arr[j].status == true) {
          addedItem[i].add_status = true;
        }
      }
      consolepro.consolelog("add_statusadd_status240", addedItem[i].add_status);
    }
    this.setState({ addedItem: addedItem });
    this.totalAmount();
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
                {Lang_chg.Vendors_txt[config.language]}
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

        {/* ----------------------for tab view--------------------------- */}
        <View style={styles.Maintab}>
          {this.state.category_arr != "NA" && (
            <FlatList
              data={this.state.category_arr}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              renderItem={({ item, index }) => {
                return (
                  <TouchableOpacity
                    activeOpacity={1}
                    onPress={() => {
                      this.tabSwitch(item);
                    }}
                    style={{
                      paddingVertical: (mobileW * 1) / 100,
                      alignSelf: "center",
                      justifyContent: "space-around",
                      paddingHorizontal: (mobileW * 1) / 100,
                    }}
                  >
                    {item.status == true ? (
                      <View style={styles.Active_View}>
                        <LinearGradient
                          colors={[
                            Colors.light_greencolor,
                            Colors.purple_color,
                          ]}
                          start={{ x: 0, y: 1 }}
                          end={{ x: 1, y: 1 }}
                          style={{
                            width: "100%",
                            alignSelf: "center",
                            alignItems: "center",
                            borderBottomColor: Colors.whiteColor,
                            paddingVertical: (mobileW * 2.2) / 100,
                            borderRadius: (mobileW * 1) / 100,
                            paddingHorizontal: (mobileW * 1.8) / 100,
                          }}
                        >
                          <Text
                            style={{
                              fontSize: (mobileW * 3.7) / 100,
                              fontFamily: Font.FontBold,
                              color: Colors.whiteColor,
                            }}
                          >
                            {item.category_name}
                          </Text>
                        </LinearGradient>
                      </View>
                    ) : (
                      <View style={styles.Deactive_View}>
                        <Text
                          style={{
                            fontSize: (mobileW * 3.7) / 100,
                            fontFamily: Font.FontBold,
                            color: Colors.greyColor,
                          }}
                        >
                          {item.category_name}
                        </Text>
                      </View>
                    )}
                  </TouchableOpacity>
                );
              }}
            />
          )}
        </View>

        {/* //===========FlatList=======// */}

        {this.state.vendor_arr != "NA" ? (
          <FlatList
            data={this.state.vendor_arr}
            contentContainerStyle={{ paddingBottom: (mobileH * 10) / 100 }}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            renderItem={({ item, index }) => {
              return (
                <TouchableOpacity
                  onPress={() =>
                    this.props.navigation.navigate("VendorsDetails", {
                      business_id: item.business_id,
                    })
                  }
                  activeOpacity={0.7}
                  style={{
                    width: (mobileW * 95) / 100,
                    alignSelf: "center",
                    marginTop: (mobileW * 2) / 100,
                    marginBottom: (mobileH * 5) / 100,
                  }}
                >
                  <View
                    style={{
                      width: (mobileW * 95) / 100,
                      alignSelf: "center",
                      marginTop: (mobileH * 1.2) / 100,
                      flexDirection: "row",
                    }}
                  >
                    {/* ------------------for image----------------- */}
                    <View style={{ width: (mobileW * 23) / 100 }}>
                      <Image
                        resizeMode="cover"
                        borderRadius={(mobileW * 2) / 100}
                        style={{
                          width: (mobileW * 22) / 100,
                          height: (mobileW * 16) / 100,
                        }}
                        source={
                          item.business_image != null
                            ? { uri: config.img_url + item.business_image }
                            : localimag.App_icon
                        }
                      ></Image>
                    </View>
                    {/* ---Andrew view----------- */}
                    <View
                      style={{
                        width: (mobileW * 47) / 100,
                        flexDirection: "row",
                        alignSelf: "center",
                      }}
                    >
                      <View style={{ width: (mobileW * 48) / 100 }}>
                        <Text
                          style={{
                            fontSize: (mobileW * 3.7) / 100,
                            fontFamily: Font.FontBold,
                            color: Colors.black_color,
                          }}
                        >
                          {item.vendor_name}
                        </Text>
                        <Text
                          style={{
                            fontSize: (mobileW * 3.2) / 100,
                            fontFamily: Font.FontSemiBold,
                            color: Colors.black_color,
                            paddingVertical: (mobileH * 0.5) / 100,
                          }}
                        >
                          {item.business_name}
                        </Text>
                        {/* ---star view----------- */}
                        <View
                          style={{
                            width: (mobileW * 49) / 100,
                            flexDirection: "row",
                            alignSelf: "center",
                          }}
                        >
                          <Image
                            style={{
                              width: (mobileW * 3.2) / 100,
                              height: (mobileW * 3.3) / 100,
                            }}
                            source={localimag.location_black}
                          ></Image>
                          <Text
                            style={{
                              color: Colors.black_color,
                              fontFamily: Font.FontRegular,
                              fontSize: (mobileW * 2.6) / 100,
                              marginLeft: (mobileW * 0.5) / 100,
                              width: (mobileW * 47) / 100,
                            }}
                          >
                            {item.business_address}
                          </Text>
                        </View>
                      </View>
                      {/* ---star view----------- */}
                      <View
                        style={{
                          width: (mobileW * 15) / 100,
                          flexDirection: "row",
                          marginTop: (mobileH * 0.6) / 100,
                          height: (mobileH * 3) / 100,
                        }}
                      >
                        <StarRating
                          containerStyle={{}}
                          fullStar={localimag.star_Active}
                          emptyStar={localimag.star_Deactive}
                          // halfStar={localimag.star_Active}
                          halfStarColor={"#FFC815"}
                          disabled={true}
                          maxStars={5}
                          starSize={(mobileW * 3) / 100}
                          rating={item.rating}
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
                          {"(" + item.rating + ")"}
                        </Text>
                      </View>
                    </View>
                  </View>
                  {/* ---------------for outer view---------- */}
                  <View
                    style={{
                      width: mobileW,
                      borderColor: Colors.greyColor,
                      borderTopWidth: (mobileW * 0.3) / 100,
                      borderBottomWidth: (mobileW * 0.3) / 100,
                      alignSelf: "center",
                      alignItems: "center",
                      marginTop: (mobileH * 2) / 100,
                    }}
                  >
                    <View
                      style={{
                        width: (mobileW * 95) / 100,
                        flexDirection: "row",
                        paddingVertical: (mobileH * 1) / 100,
                      }}
                    >
                      <View
                        style={{
                          width: (mobileW * 52) / 100,
                          flexDirection: "row",
                          marginTop: (mobileH * 0.5) / 100,
                        }}
                      >
                        <LinearTextGradient
                          style={{ fontWeight: "bold", fontSize: 72 }}
                          locations={[0, 1]}
                          colors={[Colors.voilet_color, Colors.dark_greencolor]}
                          start={{ x: 0, y: 0 }}
                          end={{ x: 0, y: 1 }}
                        >
                          <Text
                            style={{
                              fontFamily: Font.FontBold,
                              fontSize: (mobileW * 3.7) / 100,
                              marginLeft: (mobileW * 1) / 100,
                            }}
                          >
                            {Lang_chg.price[config.language]}
                          </Text>
                        </LinearTextGradient>
                        <Text
                          style={{
                            color: Colors.black_color,
                            fontFamily: Font.FontBold,
                            fontSize: (mobileW * 3.7) / 100,
                            marginLeft: (mobileW * 1) / 100,
                          }}
                        >
                          {item.price_type != "NA" && item.price_type}
                        </Text>
                      </View>

                      {/* -----------for second view------------------ */}
                      <View
                        style={{
                          width: (mobileW * 43) / 100,
                          flexDirection: "row",
                          justifyContent: "flex-end",
                        }}
                      >
                        {item.status == true && (
                          <TouchableOpacity
                            onPress={() => {
                              this.removeButton(item);
                            }}
                            style={{
                              width: (mobileW * 20) / 100,
                              alignSelf: "center",
                              backgroundColor: Colors.redColor,
                              borderRadius: (mobileW * 1) / 100,
                              flexDirection: "row",
                              justifyContent: "center",
                              marginRight: (mobileW * 3) / 100,
                            }}
                          >
                            <Image
                              style={{
                                width: (mobileW * 2) / 100,
                                height: (mobileW * 2) / 100,
                                marginTop: (mobileH * 1) / 100,
                              }}
                              source={localimag.cross_64}
                            ></Image>
                            <Text
                              style={{
                                color: Colors.whiteColor,
                                fontFamily: Font.FontBold,
                                fontSize: (mobileW * 2.9) / 100,
                                textAlign: "center",
                                paddingVertical: (mobileH * 0.5) / 100,
                              }}
                            >
                              {" Remove"}
                            </Text>
                          </TouchableOpacity>
                        )}
                        <TouchableOpacity
                          onPress={() => {
                            this.addButton(item);
                          }}
                          activeOpacity={0.7}
                          style={{
                            width: (mobileW * 20) / 100,
                            alignSelf: "flex-end",
                            backgroundColor: Colors.green_color,
                            borderRadius: (mobileW * 1) / 100,
                            flexDirection: "row",
                            justifyContent: "center",
                          }}
                        >
                          <Image
                            style={{
                              width: (mobileW * 2) / 100,
                              height: (mobileW * 2) / 100,
                              marginTop: (mobileH * 1) / 100,
                            }}
                            source={localimag.plus}
                          ></Image>
                          {item.status == false ? (
                            <Text
                              style={{
                                color: Colors.whiteColor,
                                fontFamily: Font.FontBold,
                                fontSize: (mobileW * 2.9) / 100,
                                textAlign: "justify",
                                paddingVertical: (mobileH * 0.5) / 100,
                              }}
                            >
                              {" Add"}
                              {/* Add */}
                            </Text>
                          ) : (
                            <Text
                              style={{
                                color: Colors.whiteColor,
                                fontFamily: Font.FontBold,
                                fontSize: (mobileW * 2.9) / 100,
                                textAlign: "center",
                                paddingVertical: (mobileH * 0.5) / 100,
                              }}
                            >
                              {" Added"}
                              {/* Added  */}
                            </Text>
                          )}
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>
              );
            }}
          />
        ) : (
          <Nodata_foundimage />
        )}

        {/* ------------------------------------endflatlist------------------------- */}

        <KeyboardAwareScrollView
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            width: mobileW,
            paddingBottom: (mobileH * 12) / 100,
          }}
          keyboardShouldPersistTaps="handled"
        >
          {this.state.addedItemVisible == true && (
            <View
              style={{
                backgroundColor: Colors.whiteColor,
                width: mobileW,
                // height: (mobileH * 60) / 100,
                alignSelf: "flex-end",
                elevation: 2,
                shadowColor: "#000",
                shadowOpacity: 0.1,
                shadowOffset: { width: 1, height: 1 },
              }}
            >
              <View
                style={{
                  width: (mobileW * 90) / 100,
                  alignSelf: "center",
                  marginTop: (mobileH * 2) / 100,
                }}
              >
                <Text
                  style={{
                    color: Colors.black_color,
                    fontFamily: Font.FontBold,
                    fontSize: (mobileW * 4) / 100,
                  }}
                >
                  Event Budget
                </Text>
              </View>
              <View style={{}}>
                <FlatList
                  showsVerticalScrollIndicator={false}
                  data={this.state.addedItem}
                  renderItem={({ item, index }) => {
                    var item1 = item;
                    var index1 = index;
                    return (
                      <View style={{}}>
                        <View
                          style={{
                            width: (mobileW * 90) / 100,
                            alignSelf: "center",
                            paddingVertical: (mobileH * 1) / 100,
                            flexDirection: "row",
                            justifyContent: "space-between",
                          }}
                        >
                          <Text
                            style={{
                              color: Colors.black_color,
                              fontFamily: Font.FontBold,
                              fontSize: (mobileW * 4) / 100,
                            }}
                          >
                            {"Service (" + item1.category_name + ")"}
                          </Text>
                        </View>
                        {item1.service_arr.length > 0 && (
                          <FlatList
                            data={item1.service_arr}
                            renderItem={({ item, index }) => {
                              return (
                                <>
                                  <TouchableOpacity
                                    activeOpacity={0.7}
                                    onPress={() => {
                                      this.isSelected(
                                        item,
                                        index,
                                        item1,
                                        index1
                                      );
                                    }}
                                    style={{
                                      width: (mobileW * 90) / 100,
                                      alignSelf: "center",
                                      paddingVertical: (mobileH * 1) / 100,
                                      flexDirection: "row",
                                    }}
                                  >
                                    <View>
                                      <Text
                                        style={{
                                          color: Colors.black_color,
                                          fontFamily: Font.FontBold,
                                          fontSize: (mobileW * 3.8) / 100,
                                          width: (mobileW * 60) / 100,
                                        }}
                                      >
                                        {item.service_name}
                                      </Text>
                                      {item1.category_name == "Caterers" && (
                                        <Text
                                          style={{
                                            color: Colors.black_color,
                                            fontFamily: Font.FontSemiBold,
                                            fontSize: (mobileW * 3) / 100,
                                            width: (mobileW * 25) / 100,
                                          }}
                                        >
                                          {"($" +
                                            item.price +
                                            "x" +
                                            this.state.customNumberOfGuest +
                                            ")"}
                                        </Text>
                                      )}
                                    </View>
                                    <Text
                                      style={{
                                        color: Colors.black_color,
                                        fontFamily: Font.FontSemiBold,
                                        fontSize: (mobileW * 4.3) / 100,
                                        width: (mobileW * 25) / 100,
                                      }}
                                    >
                                      {"$" + item.price}
                                    </Text>

                                    {item.status == true ? (
                                      <View
                                        style={{
                                          width: (mobileW * 5) / 100,
                                          height: (mobileW * 5) / 100,
                                        }}
                                      >
                                        <Image
                                          style={{
                                            width: (mobileW * 4) / 100,
                                            height: (mobileW * 4) / 100,
                                            tintColor: Colors.purple_color,
                                          }}
                                          source={localimag.check_1}
                                        ></Image>
                                      </View>
                                    ) : (
                                      <View
                                        style={{
                                          width: (mobileW * 5) / 100,
                                          height: (mobileW * 5) / 100,
                                        }}
                                      >
                                        <Image
                                          style={{
                                            width: (mobileW * 4) / 100,
                                            height: (mobileW * 4) / 100,
                                            tintColor: Colors.purple_color,
                                          }}
                                          source={localimag.uncheck}
                                        ></Image>
                                      </View>
                                    )}
                                  </TouchableOpacity>
                                </>
                              );
                            }}
                          />
                        )}
                      </View>
                    );
                  }}
                />

                <View
                  style={{
                    marginTop: (mobileH * 1) / 100,
                    borderBottomWidth: 1,
                    borderColor: Colors.greyColor,
                    width: (mobileW * 90) / 100,
                    alignSelf: "center",
                  }}
                ></View>

                {this.state.budgetExcced == true ? (
                  <>
                    <View
                      style={{
                        width: (mobileW * 90) / 100,
                        flexDirection: "row",
                        justifyContent: "space-between",
                        paddingVertical: (mobileH * 0.7) / 100,
                        alignSelf: "center",
                      }}
                    >
                      <Text
                        style={{
                          color: Colors.redColor,
                          fontFamily: Font.FontSemiBold,
                          fontSize: (mobileW * 4.3) / 100,
                        }}
                      >
                        Grand Total
                      </Text>
                      <Text
                        style={{
                          color: Colors.redColor,
                          fontFamily: Font.FontSemiBold,
                          fontSize: (mobileW * 4.3) / 100,
                        }}
                      >
                        {"$" + this.state.grandTotal}
                      </Text>
                    </View>
                    <View
                      style={{
                        width: (mobileW * 90) / 100,
                        alignSelf: "center",
                      }}
                    >
                      <Text
                        style={{
                          color: Colors.redColor,
                          fontFamily: Font.FontSemiBold,
                          fontSize: (mobileW * 3) / 100,
                        }}
                      >
                        {
                          "Booking charge exceeds your budget. Please adjust your budget or choose a different event."
                        }
                      </Text>
                    </View>
                  </>
                ) : (
                  <View
                    style={{
                      width: (mobileW * 90) / 100,
                      flexDirection: "row",
                      justifyContent: "space-between",
                      paddingVertical: (mobileH * 0.7) / 100,
                      alignSelf: "center",
                    }}
                  >
                    <Text
                      style={{
                        color: Colors.black_color,
                        fontFamily: Font.FontSemiBold,
                        fontSize: (mobileW * 4.3) / 100,
                      }}
                    >
                      Grand Total
                    </Text>
                    <Text
                      style={{
                        color: Colors.black_color,
                        fontFamily: Font.FontSemiBold,
                        fontSize: (mobileW * 4.3) / 100,
                      }}
                    >
                      {"$" + this.state.grandTotal}
                    </Text>
                  </View>
                )}
              </View>

              <TouchableOpacity
                onPress={() => this.continueButton()}
                activeOpacity={0.7}
                style={{
                  alignItems: "center",
                  alignSelf: "center",
                  marginBottom: (mobileH * 1) / 100,
                  marginTop: (mobileH * 2) / 100,
                  marginBottom: (mobileH * 3) / 100,
                }}
              >
                <LinearGradient
                  colors={[Colors.purple_color, Colors.light_greencolor]}
                  start={{ x: 0, y: 1 }}
                  end={{ x: 1, y: 0 }}
                  style={{
                    //backgroundColor: Colors.theme_color,
                    height: (mobileH * 6.7) / 100,
                    width: (mobileW * 90) / 100,
                    alignSelf: "center",
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: (mobileW * 1.5) / 100,
                    marginBottom: (mobileH * 2) / 100,
                  }}
                >
                  <Text
                    style={{
                      color: "#f5f4f5",
                      fontFamily: Font.FontBold,
                      fontSize: (mobileW * 4.5) / 100,
                    }}
                  >
                    {Lang_chg.Continue_txt[config.language]}
                  </Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          )}
        </KeyboardAwareScrollView>
      </SafeAreaView>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9F9F9",
  },

  linearGradient: {
    marginTop: (mobileH * 4) / 100,
    height: (mobileH * 20) / 100,
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
  Active_View: {
    width: "100%",
    alignSelf: "center",
    alignItems: "center",
    borderRadius: (mobileW * 1) / 100,
  },
  Deactive_View: {
    width: "100%",
    alignSelf: "center",
    alignItems: "center",
    backgroundColor: Colors.border_color,
    borderRadius: (mobileW * 1) / 100,
    paddingVertical: (mobileH * 1) / 100,
    paddingHorizontal: (mobileW * 1) / 100,
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
    width: "98%",
    alignSelf: "center",
    backgroundColor: "white",
    flexDirection: "row",
    justifyContent: "space-between",
    borderRadius: (mobileW * 1) / 100,
    backgroundColor: Colors.whiteColor,
    // shadowColor: "#000000",
    marginTop: (mobileH * 1.5) / 100,
  },

  linearGradient1: {
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 18,
    fontFamily: "Gill Sans",
    textAlign: "center",
    margin: 10,
    color: "#ffffff",
    backgroundColor: "transparent",
  },
});
