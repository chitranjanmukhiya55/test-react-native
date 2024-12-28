import React, { Component } from "react";
import {
  Text,
  SafeAreaView,
  StatusBar,
  Alert,
  View,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Image,
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
  apifuntion,
  msgProvider,
  msgTitle,
  consolepro,
} from "./Provider/utilslib/Utils";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import LinearGradient from "react-native-linear-gradient";
import DashedLine from "react-native-dashed-line";
import StarRating from "react-native-star-rating";

export default class UserHistoryDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Tab: 0,
      item: this.props.route.params.item,
      event_arr: "",
      service_deatil: "NA",
      vendor_detail: "NA",
      grandTotal: 0,
      confirmPay: false,
      markAsCompleteShow: false,
    };
  }
  componentDidMount() {
    this.props.navigation.addListener("focus", () => {
      this.setState({ item: this.props.route.params.item });
      this.getProposedList(1);
    });
    this.getProposedList(0);
  }

  async getProposedList(Display) {
    var user_arr = await localStorage.getItemObject("user_arr");
    var user_id = user_arr.user_id;
    let url =
      config.baseURL +
      "get_user_pending_event_detail.php?user_id=" +
      user_id +
      "&event_id=" +
      this.state.item;
    consolepro.consolelog("url", url);
    apifuntion
      .getApi(url, Display)
      .then((obj) => {
        consolepro.consolelog("obj event_idevent_idevent_id", obj);
        if (obj.success == "true") {
          if (obj.event_arr != "NA") {
            consolepro.consolelog(
              "obj.event_arr.vendor_detail",
              obj.event_arr.vendor_detail
            );
            this.setState({
              event_arr: obj.event_arr,
              vendor_detail: obj.event_arr.vendor_detail,
              service_deatil: obj.event_arr.service_deatil,
            });
            let data = obj.event_arr.service_deatil;
            let data1 = obj.event_arr.vendor_detail;
            let totalAmount = 0;
            if (data != "NA") {
              for (let i = 0; i < data.length; i++) {
                for (let j = 0; j < data[i].service_arr.length; j++) {
                  if (data[i].category_name == "Caterers") {
                    totalAmount = parseFloat(
                      parseFloat(totalAmount) +
                        parseFloat(data[i].service_arr[j].service_price) *
                          parseInt(this.state.event_arr.no_of_guest)
                    ).toFixed(2);
                  } else {
                    totalAmount = parseFloat(
                      parseFloat(totalAmount) +
                        parseFloat(data[i].service_arr[j].service_price)
                    ).toFixed(2);
                  }
                }
              }
            }
            this.setState({ grandTotal: totalAmount });

            let state = false;
            let stateMark = false;
            if (data1 != "NA") {
              for (let i = 0; i < data1.length; i++) {
                if (
                  data1[i].status == "Pending" ||
                  data1[i].status == "Rejected"
                ) {
                  consolepro.consolelog("yes-----------------");
                  state = true;
                }
                if (
                  (data1[i].work_status == "Started" ||
                    data1[i].work_status == "Not started") &&
                  (obj.event_arr.event_status == "Ongoing" ||
                    obj.event_arr.event_status == "Pending")
                ) {
                  stateMark = true;
                }
              }
              if (state == false) {
                consolepro.consolelog("yes--yes---------------");
                this.setState({ confirmPay: true });
              }
              if (stateMark == false) {
                this.setState({ markAsCompleteShow: true });
              }
            }
            if (obj.event_arr.transaction_id != "NA") {
              this.setState({ confirmPay: false });
            }
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
                {Lang_chg.proposedeventvendorlist_txt[config.language]}
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
          {/* ----------------------- 1st flatlist--------------- */}

          <View>
            <View
              style={{
                width: (mobileW * 100) / 100,
                paddingVertical: (mobileW * 1.5) / 100,
              }}
            >
              <View
                style={{
                  borderBottomWidth: 1,
                  borderColor: Colors.greyColor,
                  width: (mobileW * 100) / 100,
                  alignSelf: "center",
                }}
              ></View>
              <View
                style={{
                  backgroundColor: Colors.light_graycolor,
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Text
                  style={{
                    fontSize: (mobileW * 3.7) / 100,
                    fontFamily: Font.FontBold,
                    color: Colors.black_color,
                    paddingVertical: (mobileH * 1) / 100,
                    paddingHorizontal: (mobileW * 2.5) / 100,
                  }}
                >
                  {Lang_chg.EventDetails[config.language]}
                </Text>
                <Text
                  style={{
                    fontSize: (mobileW * 3.7) / 100,
                    fontFamily: Font.FontBold,
                    color: "#69B6E7",
                    paddingVertical: (mobileH * 1) / 100,
                    paddingHorizontal: (mobileW * 2.5) / 100,
                  }}
                >
                  {this.state.event_arr.event_status}
                </Text>
              </View>
              <View
                style={{
                  borderBottomWidth: 1,
                  borderColor: Colors.greyColor,
                  width: (mobileW * 100) / 100,
                  alignSelf: "center",
                }}
              ></View>
              <View
                style={{
                  width: (mobileW * 75) / 100,
                  paddingHorizontal: (mobileW * 3) / 100,
                  width: mobileW,
                  alignSelf: "center",
                  paddingVertical: (mobileW * 1.5) / 100,
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    width: (mobileW * 96) / 100,
                  }}
                >
                  {/* for first view */}
                  <View
                    style={{
                      width: (mobileW * 46) / 100,
                      justifyContent: "flex-start",
                      borderRadius: (mobileW * 1) / 100,
                      paddingVertical: (mobileH * 1) / 100,
                    }}
                  >
                    <Text
                      style={{
                        fontSize: (mobileW * 3.5) / 100,
                        fontFamily: Font.FontSemiBold,
                        color: Colors.black_color,
                      }}
                    >
                      {Lang_chg.EventTitle[config.language]}
                    </Text>
                    <Text
                      style={{
                        fontSize: (mobileW * 3.5) / 100,
                        fontFamily: Font.FontRegular,
                        color: Colors.black_color,
                      }}
                    >
                      {this.state.event_arr.title}
                    </Text>
                    <Text
                      style={{
                        fontSize: (mobileW * 3.5) / 100,
                        fontFamily: Font.FontSemiBold,
                        color: Colors.black_color,
                        paddingTop: (mobileH * 2) / 100,
                      }}
                    >
                      {Lang_chg.NoofGuest[config.language]}
                    </Text>
                    <Text
                      style={{
                        fontSize: (mobileW * 3.5) / 100,
                        fontFamily: Font.FontRegular,
                        color: Colors.black_color,
                      }}
                    >
                      {this.state.event_arr.no_of_guest}
                    </Text>
                    <Text
                      style={{
                        fontSize: (mobileW * 3.5) / 100,
                        fontFamily: Font.FontSemiBold,
                        color: Colors.black_color,
                        paddingTop: (mobileH * 2) / 100,
                      }}
                    >
                      {Lang_chg.seat_arrange[config.language]}
                    </Text>
                    <Text
                      style={{
                        fontSize: (mobileW * 3.5) / 100,
                        fontFamily: Font.FontRegular,
                        color: Colors.black_color,
                      }}
                    >
                      {this.state.event_arr.seating_arrangement_name}
                    </Text>
                  </View>
                  {/* ----for second view */}
                  <View
                    style={{
                      width: (mobileW * 45) / 100,
                      justifyContent: "flex-start",
                      borderRadius: (mobileW * 1) / 100,
                      paddingVertical: (mobileH * 1) / 100,
                    }}
                  >
                    <Text
                      style={{
                        fontSize: (mobileW * 3.5) / 100,
                        fontFamily: Font.FontSemiBold,
                        color: Colors.black_color,
                      }}
                    >
                      {Lang_chg.DateTime[config.language]}{" "}
                    </Text>
                    <Text
                      style={{
                        fontSize: (mobileW * 3.5) / 100,
                        fontFamily: Font.FontSemiBold,
                        color: Colors.black_color,
                        right: (mobileW * 1) / 100,
                      }}
                    >
                      {this.state.event_arr.event_date_time}
                    </Text>
                    <Text
                      style={{
                        fontSize: (mobileW * 3.5) / 100,
                        fontFamily: Font.FontSemiBold,
                        color: Colors.black_color,
                        paddingTop: (mobileH * 2) / 100,
                      }}
                    >
                      {Lang_chg.location1_txt[config.language]}
                    </Text>
                    <Text
                      style={{
                        fontSize: (mobileW * 3.5) / 100,
                        fontFamily: Font.FontRegular,
                        color: Colors.black_color,
                      }}
                    >
                      {this.state.event_arr.address}
                    </Text>
                    <Text
                      style={{
                        fontSize: (mobileW * 3.5) / 100,
                        fontFamily: Font.FontSemiBold,
                        color: Colors.black_color,
                        paddingTop: (mobileH * 2) / 100,
                      }}
                    >
                      {Lang_chg.seat_layout[config.language]}
                    </Text>
                    <Text
                      style={{
                        fontSize: (mobileW * 3.5) / 100,
                        fontFamily: Font.FontRegular,
                        color: Colors.black_color,
                      }}
                    >
                      {this.state.event_arr.seating_layout_name}
                    </Text>
                  </View>
                </View>
              </View>
              {/* -for third view- */}
              <View
                style={{
                  borderBottomWidth: 1,
                  borderColor: Colors.greyColor,
                  width: (mobileW * 100) / 100,
                  alignSelf: "center",
                }}
              ></View>
              <View
                style={{
                  width: mobileW,
                  paddingVertical: (mobileH * 1) / 100,
                  backgroundColor: Colors.light_graycolor,
                  paddingHorizontal: (mobileW * 3) / 100,
                }}
              >
                <Text
                  style={{
                    color: Colors.black_color,
                    fontFamily: Font.FontBold,
                    fontSize: (mobileW * 4) / 100,
                  }}
                >
                  {Lang_chg.vendors_txt[config.language]}
                </Text>
              </View>
              <View
                style={{
                  borderBottomWidth: 1,
                  borderColor: Colors.greyColor,
                  width: (mobileW * 100) / 100,
                  alignSelf: "center",
                }}
              ></View>
            </View>
          </View>
          {/* ------------------------------------startflatlist------------------------- */}
          {/* //===========FlatList 2=======// */}
          <View style={{ marginBottom: (mobileW * 10) / 100 }}>
            {this.state.vendor_detail != "NA" && (
              <FlatList
                data={this.state.vendor_detail}
                renderItem={({ item, index }) => {
                  // consolepro.consolelog("item-=-=-=-", item)
                  return (
                    <>
                      <TouchableOpacity
                        activeOpacity={0.7}
                        onPress={() =>
                          this.props.navigation.navigate("VendorsDetails", {
                            business_id: item.business_id,
                          })
                        }
                        style={{
                          alignSelf: "center",
                          width: (mobileW * 95) / 100,
                        }}
                      >
                        <View
                          style={{
                            width: (mobileW * 95) / 100,
                            flexDirection: "row",
                            justifyContent: "space-between",
                            alignSelf: "center",
                            marginTop: (mobileH * 1) / 100,
                          }}
                        >
                          <Text
                            style={{
                              fontSize: (mobileW * 3.5) / 100,
                              fontFamily: Font.FontBold,
                              color: Colors.black_color,
                              paddingVertical: (mobileH * 0.5) / 100,
                            }}
                          >
                            {item.category_name}
                          </Text>

                          {this.state.event_arr.event_status == "Completed" && (
                            <>
                              {item.rating_arr == "NA" && (
                                <TouchableOpacity
                                  activeOpacity={0.7}
                                  onPress={() => {
                                    this.props.navigation.navigate("RateNow", {
                                      vendorDetails: item,
                                      fullDetails: this.state.event_arr,
                                    });
                                  }}
                                  style={{
                                    width: (mobileW * 23) / 100,
                                    backgroundColor: "#4B9AC8",
                                    elevation: 1,
                                  }}
                                >
                                  <Text
                                    style={{
                                      fontSize: (mobileW * 3.5) / 100,
                                      fontFamily: Font.FontBold,
                                      color: Colors.whiteColor,
                                      paddingVertical: (mobileH * 0.5) / 100,
                                      textAlign: "center",
                                    }}
                                  >
                                    {Lang_chg.Rate_Now_text[config.language]}
                                  </Text>
                                </TouchableOpacity>
                              )}
                            </>
                          )}
                        </View>
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
                                width: (mobileW * 27.5) / 100,
                                height: (mobileW * 24) / 100,
                                borderRadius: (mobileW * 1.5) / 100,
                                resizeMode: "center",
                              }}
                              source={{
                                uri: config.img_url + item.image,
                              }}
                            ></Image>
                          </View>
                          {/* //========Name ========// */}
                          <View style={{ width: (mobileW * 100) / 100 }}>
                            <View
                              style={{
                                flexDirection: "row",
                                justifyContent: "space-between",
                                marginTop: (mobileW * 1) / 100,
                                width: (mobileW * 65) / 100,
                              }}
                            >
                              <Text
                                style={{
                                  color: Colors.black_color,
                                  fontFamily: Font.FontBold,
                                  fontSize: (mobileW * 4) / 100,
                                  alignSelf: "flex-start",
                                }}
                              >
                                {item.vendor_name}
                              </Text>

                              {item.status == "Rejected" && (
                                <TouchableOpacity
                                  activeOpacity={0.7}
                                  onPress={() =>
                                    this.props.navigation.navigate(
                                      "EditVendorsDetails",
                                      {
                                        event_arr: this.state.event_arr,
                                        item: item,
                                      }
                                    )
                                  }
                                  style={{}}
                                >
                                  <Text
                                    style={{
                                      color: Colors.light_greencolor,
                                      fontFamily: Font.FontSemiBold,
                                      fontSize: (mobileW * 3.6) / 100,
                                      alignSelf: "flex-end",
                                      textDecorationLine: "underline",
                                    }}
                                  >
                                    {Lang_chg.FindNewVendor[config.language]}
                                  </Text>
                                </TouchableOpacity>
                              )}
                            </View>
                            <Text
                              style={{
                                color: Colors.black_color,
                                fontFamily: Font.FontBold,
                                fontSize: (mobileW * 4) / 100,
                                alignSelf: "flex-start",
                              }}
                            >
                              {item.business_name}
                            </Text>
                            <View
                              style={{
                                flexDirection: "row",
                                alignItems: "center",
                                justifyContent: "space-between",
                                paddingVertical: (mobileH * 0.6) / 100,
                              }}
                            >
                              <Text
                                style={{
                                  color: Colors.black_color,
                                  fontFamily: Font.FontSemiBold,
                                  fontSize: (mobileW * 3.1) / 100,
                                  width: (mobileW * 50) / 100,
                                }}
                              >
                                <Image
                                  style={{
                                    width: (mobileW * 3.1) / 100,
                                    height: (mobileW * 3.1) / 100,
                                  }}
                                  source={localimag.location_black}
                                ></Image>
                                {item.business_address}
                              </Text>
                            </View>
                            {/* --------------star view--------- */}
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
                                rating={item.avg_rating}
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
                                {"(" + item.avg_rating + ")"}
                              </Text>
                            </View>
                          </View>
                        </View>
                      </TouchableOpacity>
                      <View
                        style={{
                          marginTop: (mobileW * 3) / 100,
                          borderBottomWidth: 1,
                          borderColor: Colors.greyColor,
                          width: (mobileW * 100) / 100,
                          alignSelf: "flex-start",
                        }}
                      ></View>
                    </>
                  );
                }}
              />
            )}
            {/* //===========FlatList 3 =======// */}
            <View
              style={{
                width: mobileW,
                alignSelf: "center",
                marginTop: (mobileH * 1) / 100,
              }}
            >
   
              <View
                style={{
                  backgroundColor: Colors.light_graycolor,
                  paddingVertical: (mobileH * 1) / 100,
                  paddingHorizontal: (mobileW * 3) / 100,
                }}
              >
                <Text
                  style={{
                    color: Colors.black_color,
                    fontFamily: Font.FontBold,
                    fontSize: (mobileW * 4) / 100,
                    textAlignVertical: "center",
                  }}
                >
                  {Lang_chg.ServiceAndPrice[config.language]}
                </Text>
              </View>
              <View
                style={{
                  borderBottomWidth: 1,
                  borderColor: Colors.greyColor,
                  width: (mobileW * 100) / 100,
                  alignSelf: "flex-start",
                }}
              ></View>
            </View>
            {this.state.service_deatil != "NA" && (
              <FlatList
                contentContainerStyle={{
                  width: (mobileW * 100) / 100,
                  alignSelf: "center",
                }}
                data={this.state.service_deatil}
                renderItem={({ item, index }) => {
                  var item1 = item;
                  var index1 = index;
                  return (
                    //========Text View=========//
                    <View>
                      <View
                        style={{
                          marginTop: (mobileH * 0) / 100,
                        }}
                      >
                        {/* //=========Service Text View======// */}
                        <View
                          style={{
                            width: (mobileW * 94) / 100,
                            alignSelf: "center",
                            marginTop: (mobileH * 1) / 100,
                          }}
                        >
                          <Text
                            style={{
                              color: Colors.black_color,
                              fontFamily: Font.FontBold,
                              fontSize: (mobileW * 3.5) / 100,
                            }}
                          >
                            {"Service (" + item1.category_name + ")"}
                          </Text>
                        </View>

                        <FlatList
                          contentContainerStyle={{
                            width: (mobileW * 100) / 100,
                            alignSelf: "center",
                          }}
                          data={item1.service_arr}
                          renderItem={({ item, index }) => {
                            return (
                              <>
                                <View
                                  style={{
                                    width: (mobileW * 94) / 100,
                                    flexDirection: "row",
                                    justifyContent: "space-between",
                                    marginTop: (mobileH * 1) / 100,
                                    alignSelf: "center",
                                  }}
                                >
                                  <View>
                                    <Text
                                      style={{
                                        color: Colors.black_color,
                                        fontFamily: Font.FontBold,
                                        fontSize: (mobileW * 3) / 100,
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
                                          item.service_price +
                                          "x" +
                                          this.state.event_arr.no_of_guest +
                                          ")"}
                                      </Text>
                                    )}
                                  </View>

                                  <Text
                                    style={{
                                      color: Colors.black_color,
                                      fontFamily: Font.FontBold,
                                      fontSize: (mobileW * 3) / 100,
                                    }}
                                  >
                                    {"$" + parseFloat(item.service_price)}
                                  </Text>
                                </View>
                                {/* //========Plate/Hour==========// */}

                                <View
                                  style={{
                                    width: (mobileW * 94) / 100,
                                    alignSelf: "center",
                                  }}
                                >
                                  <Text
                                    style={{
                                      color: Colors.light_greencolor,
                                      fontFamily: Font.FontBold,
                                      fontSize: (mobileW * 3) / 100,
                                    }}
                                  >
                                    {item.get_price_type != "NA" &&
                                      "(" + item.get_price_type + ")"}
                                  </Text>
                                </View>
                              </>
                            );
                          }}
                        />
                 
                        <View
                          style={{
                            paddingTop: (mobileW * 3) / 100,
                            width: "95%",
                            alignSelf: "center",
                          }}
                        >
                          <DashedLine
                            dashLength={5}
                            dashColor={Colors.greyColor}
                          />
                        </View>
                      </View>
                    </View>
                  );
                }}
              />
            )}
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
  Active_View: {
    width: "100%",
    alignSelf: "center",
    alignItems: "center",
    borderBottomColor: Colors.whiteColor,
    borderBottomWidth: 4,
  },
  Deactive_View: {
    width: "100%",
    alignSelf: "center",
    alignItems: "center",
  },
  Active_txt: {
    fontSize: (mobileW * 3.8) / 100,
    fontFamily: Font.mediumFont,
    color: Colors.whiteColor,
  },
  Deactive_txt: {
    fontSize: (mobileW * 3.8) / 100,
    fontFamily: Font.mediumFont,
    color: Colors.black,
  },
  Maintab: {
    width: "100%",
    alignSelf: "center",
    backgroundColor: "white",
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: Colors.whiteColor,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.17,
    shadowRadius: 3.05,
    elevation: 4,
  },
});
