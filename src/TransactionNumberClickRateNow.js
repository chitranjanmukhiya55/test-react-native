import React, { Component } from "react";
import {
  Text,
  SafeAreaView,
  StatusBar,
  View,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";
import {
  Font,
  Colors,
  mobileH,
  mobileW,
  localimag,
} from "./Provider/utilslib/Utils";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import LinearGradient from "react-native-linear-gradient";
import DashedLine from "react-native-dashed-line";

export default class TransactionNumberClickRateNow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Tab: 0,
      Pending: [
        {
          transaction: "#6574738382",
          completed: "Completed",
          event: "Event Details",
          name: "Event Title",
          message: "5th Birthday Celebration",
          text: "Date & Time",
          text1: "26-Nov-2022, 11:00AM",
          guest: "No. of Guest",
          no: "50",
          Area: "Area(Postcode/Suburb)",
          Okemas: "Okemas, Michigan, 48864",
          budget: "Vendors",
          $: "$1650",
        },
      ],
      vendor_arr: [
        {
          text: "Decorator",
          sr: "no",
          name: "Andrew John",
          date: "(4.0)",
          message: "Parties Galore",
          price: "$20/Plate",
          details: "Great Neck Gardens, New York, 11021",
          img: localimag.Birthday_girl_img,
          status: 1,
          st: "open",
          yourreview: "Your Review",
          pimg: localimag.image_17,
          pname: "Michael Jonas",
          time: "26-Nov-22, 02:00 PM",
        },
        {
          text: "Caterers",
          ratenow: "Rate Now",
          name: "James William",
          find: "Find New Vendor",
          date: "(4.0)",
          sr: "yes",
          message: "Creamson Caterers",
          price: "$25/Plate",
          details: "Great Neck Gardens, New York, 11021",
          find: "Find New Vendor",
          img: localimag.saile_ilyas_SiwrpBnxDww_unsplash,
          status: 0,
          st: "open",
        },
        {
          text: "DJ & Sound",
          ratenow: "Rate Now",
          sr: "yes",
          name: "Daniel Michael",
          date: "(4.0)",
          message: "DJ Ocean",
          price: "$28/Plate",
          details: "Great Neck Gardens, New York, 11021",
          img: localimag.min26,
          status: 1,
          st: "close",
        },
      ],
      add_arr: [
        {
          text: "Services & Price",
          service: "Service (Decoration)",
          baloon: "Baloon Decoration Service",
          party: "Party Decoration Service",
          cost: "$200",
          status: 0,
          st: "true",
          cost1: "$300",
        },
        {
          service: "Service (Caterers)",
          baloon: "Italian Cuisine ($20*50)",
          cost: "$1000",
          status: 0,
          $: "($20/Plate)",
          st: "false",
        },
        {
          service: "Service (DJ & Sound)",
          baloon: "DJ & Sound (1 Hour)",
          cost: "$50",
          grand: "Grand Total",
          costt: "$1650",
          status: 1,
          $: "($50/Hour)",
          st: "false",
        },
      ],
    };
  }
  componentDidMount() {}

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
              onPress={() => this.props.navigation.navigate("EventsHistory")}
              activeOpacity={0.7}
              style={{ width: (mobileW * 18) / 100 }}
            >
              <Image
                style={{
                  alignSelf: "center",
                  width: (mobileW * 4.5) / 100,
                  height: (mobileW * 4.5) / 100,
                  // paddingHorizontal: mobileW * 2 / 100,
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
                #6574738382{" "}
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
          {/* ----------------------- 1st flatlist--------------- */}

          <View>
            <FlatList
              contentContainerStyle={{
                width: (mobileW * 100) / 100,
                alignSelf: "center",
              }}
              data={this.state.Pending}
              renderItem={({ item, index }) => {
                return (
                  <View
                    style={{
                      width: (mobileW * 100) / 100,
                      paddingVertical: (mobileW * 1.5) / 100,
                    }}
                  >
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        width: (mobileW * 94) / 100,
                        alignSelf: "center",
                        paddingVertical: (mobileH * 1) / 100,
                      }}
                    >
                      <Text
                        style={{
                          color: Colors.black_color,
                          fontFamily: Font.FontSemiBold,
                          fontSize: (mobileW * 3.9) / 100,
                        }}
                      >
                        {item.transaction}
                      </Text>
                      <Text
                        style={{
                          color: Colors.light_greencolor,
                          fontFamily: Font.FontBold,
                          fontSize: (mobileW * 3.9) / 100,
                        }}
                      >
                        {item.completed}
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
                    <View style={{ backgroundColor: Colors.light_graycolor }}>
                      <Text
                        style={{
                          fontSize: (mobileW * 3.7) / 100,
                          fontFamily: Font.FontBold,
                          color: Colors.black_color,
                          paddingVertical: (mobileH * 1) / 100,
                          paddingHorizontal: (mobileW * 2.5) / 100,
                        }}
                      >
                        {item.event}
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
                          marginTop: (mobileH * 1) / 100,
                        }}
                      >
                        {/* for first view */}
                        <View
                          style={{
                            width: (mobileW * 45) / 100,
                            justifyContent: "flex-start",
                            borderRadius: (mobileW * 1) / 100,
                          }}
                        >
                          <Text
                            style={{
                              fontSize: (mobileW * 3.5) / 100,
                              fontFamily: Font.FontSemiBold,
                              color: Colors.black_color,
                            }}
                          >
                            {item.name}
                          </Text>
                          <Text
                            style={{
                              fontSize: (mobileW * 3.5) / 100,
                              fontFamily: Font.FontRegular,
                              color: Colors.black_color,
                            }}
                          >
                            {item.message}
                          </Text>
                          <Text
                            style={{
                              fontSize: (mobileW * 3.5) / 100,
                              fontFamily: Font.FontSemiBold,
                              color: Colors.black_color,
                              paddingTop: (mobileH * 2) / 100,
                            }}
                          >
                            {item.guest}{" "}
                          </Text>
                          <Text
                            style={{
                              fontSize: (mobileW * 3.5) / 100,
                              fontFamily: Font.FontRegular,
                              color: Colors.black_color,
                            }}
                          >
                            {item.no}{" "}
                          </Text>
                        </View>
                        {/* ----for second view */}
                        <View
                          style={{
                            width: (mobileW * 45) / 100,
                            justifyContent: "flex-start",
                            borderRadius: (mobileW * 1) / 100,
                          }}
                        >
                          <Text
                            style={{
                              fontSize: (mobileW * 3.5) / 100,
                              fontFamily: Font.FontSemiBold,
                              color: Colors.black_color,
                            }}
                          >
                            {item.text}{" "}
                          </Text>
                          <Text
                            style={{
                              fontSize: (mobileW * 3.5) / 100,
                              fontFamily: Font.FontSemiBold,
                              color: Colors.black_color,
                              right: (mobileW * 1) / 100,
                            }}
                          >
                            {" "}
                            {item.text1}
                          </Text>
                          <Text
                            style={{
                              fontSize: (mobileW * 3.5) / 100,
                              fontFamily: Font.FontSemiBold,
                              color: Colors.black_color,
                              paddingTop: (mobileH * 2) / 100,
                            }}
                          >
                            {item.Area}
                          </Text>
                          <Text
                            style={{
                              fontSize: (mobileW * 3.5) / 100,
                              fontFamily: Font.FontRegular,
                              color: Colors.black_color,
                            }}
                          >
                            {item.Okemas}
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
                          fontSize: (mobileW * 3.5) / 100,
                          fontFamily: Font.FontBold,
                          color: Colors.black_color,
                        }}
                      >
                        {item.budget}
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
                );
              }}
            />
          </View>
          {/* ------------------------------------startflatlist------------------------- */}
          {/* //===========FlatList 2=======// */}
          <View style={{ marginBottom: (mobileW * 10) / 100 }}>
            <FlatList
              data={this.state.vendor_arr}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item, index }) => (
                <View
                  style={{ alignSelf: "center", width: (mobileW * 95) / 100 }}
                >
                  {/* //=========Text Accepted/Rejected View=========// */}
                  <View
                    style={{
                      width: (mobileW * 95) / 100,
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignSelf: "center",
                      marginTop: (mobileH * 2) / 100,
                    }}
                  >
                    <Text
                      style={{
                        fontSize: (mobileW * 4.3) / 100,
                        fontFamily: Font.FontBold,
                        color: Colors.black_color,
                        paddingVertical: (mobileH * 0.5) / 100,
                      }}
                    >
                      {item.text}
                    </Text>
                    {item.sr == "yes" && (
                      <TouchableOpacity
                        activeOpacity={0.7}
                        onPress={() =>
                          this.props.navigation.navigate("RateNow")
                        }
                        style={{}}
                      >
                        <LinearGradient
                          colors={[Colors.blue3_color, Colors.voiletblue_color]}
                          start={{ x: 1, y: 1 }}
                          end={{ x: 0, y: 0 }}
                          style={styles.linearGradient1}
                        >
                          <Text
                            style={{
                              fontSize: (mobileW * 3.7) / 100,
                              fontFamily: Font.FontBold,
                              color: Colors.whiteColor,
                              paddingVertical: (mobileH * 0.5) / 100,
                              paddingHorizontal: (mobileW * 1) / 100,
                              borderRadius: (mobileW * 1) / 100,
                            }}
                          >
                            {item.ratenow}
                          </Text>
                        </LinearGradient>
                      </TouchableOpacity>
                    )}
                  </View>
                  <TouchableOpacity
                    activeOpacity={0.7}
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
                          width: (mobileW * 25.5) / 100,
                          height: (mobileW * 24) / 100,
                          borderRadius: (mobileW * 1.5) / 100,
                        }}
                        resizeMode="cover"
                        source={item.img}
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
                          {item.name}
                        </Text>
                      </View>
                      <Text
                        style={{
                          width: (mobileW * 50) / 100,
                          color: Colors.black_color,
                          fontFamily: Font.FontSemiBold,
                          fontSize: (mobileW * 3.7) / 100,
                          marginTop: (mobileH * 0.3) / 100,
                        }}
                      >
                        {item.message}
                      </Text>
                      {/* //========Details=======// */}
                      <View
                        style={{
                          flexDirection: "row",
                          alignItems: "center",
                          justifyContent: "space-between",
                          marginTop: (mobileH * 0.7) / 100,
                        }}
                      >
                        <Text
                          style={{
                            color: Colors.black_color,
                            fontFamily: Font.FontSemiBold,
                            fontSize: (mobileW * 3.1) / 100,
                          }}
                        >
                          <Image
                            style={{
                              width: (mobileW * 3.1) / 100,
                              height: (mobileW * 3.1) / 100,
                            }}
                            source={localimag.location_black}
                          ></Image>
                          {item.details}
                        </Text>
                      </View>
                      <View
                        style={{
                          width: "25%",
                          flexDirection: "row",
                          justifyContent: "space-between",
                          marginTop: (mobileH * 0.7) / 100,
                        }}
                      >
                        <Image
                          style={{
                            width: (mobileW * 3.3) / 100,
                            height: (mobileW * 3.3) / 100,
                          }}
                          source={localimag.star_Active}
                        ></Image>
                        <Image
                          style={{
                            width: (mobileW * 3.3) / 100,
                            height: (mobileW * 3.3) / 100,
                          }}
                          source={localimag.star_Active}
                        ></Image>
                        <Image
                          style={{
                            width: (mobileW * 3.3) / 100,
                            height: (mobileW * 3.3) / 100,
                          }}
                          source={localimag.star_Active}
                        ></Image>
                        <Image
                          style={{
                            width: (mobileW * 3.3) / 100,
                            height: (mobileW * 3.3) / 100,
                          }}
                          source={localimag.star_Active}
                        ></Image>
                        <Image
                          style={{
                            width: (mobileW * 3.4) / 100,
                            height: (mobileW * 3.3) / 100,
                          }}
                          source={localimag.star_Deactive}
                        ></Image>
                        <Text
                          style={{
                            color: Colors.black_color,
                            fontFamily: Font.FontBold,
                            fontSize: (mobileW * 2.7) / 100,
                          }}
                        >
                          {item.date}
                        </Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                  {item.sr == "no" && (
                    <View
                      style={{
                        width: (mobileW * 94) / 100,
                        alignSelf: "center",
                        marginTop: (mobileH * 1.5) / 100,
                      }}
                    >
                      <Text
                        style={{
                          color: Colors.black_color,
                          fontFamily: Font.FontBold,
                          fontSize: (mobileW * 3.1) / 100,
                        }}
                      >
                        {item.yourreview}
                      </Text>
                    </View>
                  )}
                  {item.sr == "no" && (
                    <View
                      style={{
                        width: (mobileW * 94) / 100,
                        alignSelf: "center",
                        marginTop: (mobileH * 1.5) / 100,
                        flexDirection: "row",
                      }}
                    >
                      <Image
                        style={{
                          width: (mobileW * 10) / 100,
                          height: (mobileW * 10) / 100,
                          borderRadius: (mobileW * 15) / 100,
                        }}
                        source={item.pimg}
                      ></Image>
                      <View
                        style={{
                          flexDirection: "column",
                          paddingHorizontal: (mobileW * 2) / 100,
                          width: "90%",
                        }}
                      >
                        <View
                          style={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                          }}
                        >
                          <Text
                            style={{
                              color: Colors.black_color,
                              fontFamily: Font.FontBold,
                              fontSize: (mobileW * 3.2) / 100,
                            }}
                          >
                            {item.pname}
                          </Text>

                          <View
                            style={{
                              width: "29%",
                              flexDirection: "row",
                              justifyContent: "space-between",
                            }}
                          >
                            <Image
                              style={{
                                width: (mobileW * 3.3) / 100,
                                height: (mobileW * 3.3) / 100,
                              }}
                              source={localimag.star_Active}
                            ></Image>
                            <Image
                              style={{
                                width: (mobileW * 3.3) / 100,
                                height: (mobileW * 3.3) / 100,
                              }}
                              source={localimag.star_Active}
                            ></Image>
                            <Image
                              style={{
                                width: (mobileW * 3.3) / 100,
                                height: (mobileW * 3.3) / 100,
                              }}
                              source={localimag.star_Active}
                            ></Image>
                            <Image
                              style={{
                                width: (mobileW * 3.3) / 100,
                                height: (mobileW * 3.3) / 100,
                              }}
                              source={localimag.star_Active}
                            ></Image>
                            <Image
                              style={{
                                width: (mobileW * 3.4) / 100,
                                height: (mobileW * 3.3) / 100,
                              }}
                              source={localimag.star_Deactive}
                            ></Image>
                            <Text
                              style={{
                                color: Colors.black_color,
                                fontFamily: Font.FontBold,
                                fontSize: (mobileW * 2.7) / 100,
                              }}
                            >
                              {item.date}
                            </Text>
                          </View>
                        </View>
                        <Text
                          style={{
                            color: Colors.black_color,
                            fontFamily: Font.FontBold,
                            fontSize: (mobileW * 3.2) / 100,
                          }}
                        >
                          {item.time}
                        </Text>
                      </View>
                    </View>
                  )}
                  {item.sr == "no" && (
                    <View
                      style={{
                        width: "93%",
                        alignSelf: "center",
                        marginTop: (mobileH * 1) / 100,
                      }}
                    >
                      <Text
                        style={{
                          color: Colors.black_color,
                          fontFamily: Font.FontBold,
                          fontSize: (mobileW * 3) / 100,
                        }}
                      >
                        Thanks to everyone who posted “happy birthday” messages
                        for me today! I read every one of them, and they totally
                        made me smile. I'm overwhelmed with love and gratitude
                        for all the birthday wishes{" "}
                      </Text>
                    </View>
                  )}

                  <View
                    style={{
                      marginTop: (mobileH * 2.5) / 100,
                      borderBottomWidth:
                        (item.st == "open" && 1) || (item.st == "close" && 0),
                      borderColor: Colors.greyColor,
                      width: (mobileW * 95) / 100,
                      alignSelf: "flex-start",
                    }}
                  ></View>
                </View>
              )}
            />

            {/* //===========FlatList 3 =======// */}
            <FlatList
              contentContainerStyle={{
                width: (mobileW * 100) / 100,
                alignSelf: "center",
              }}
              data={this.state.add_arr}
              renderItem={({ item, index }) => {
                return (
                  //========Text View=========//
                  <View>
                    {item.st == "true" && (
                      <View
                        style={{
                          width: mobileW,
                          alignSelf: "center",
                          marginTop: (mobileH * 1) / 100,
                        }}
                      >
                        <View
                          style={{
                            borderBottomWidth: 1.9,
                            borderColor: Colors.greyColor,
                            width: (mobileW * 100) / 100,
                            alignSelf: "center",
                          }}
                        ></View>
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
                            {item.text}
                          </Text>
                        </View>
                      </View>
                    )}
                    {item.st == "true" && (
                      <View
                        style={{
                          borderBottomWidth: 1.9,
                          borderColor: Colors.greyColor,
                          width: (mobileW * 100) / 100,
                          alignSelf: "flex-start",
                        }}
                      ></View>
                    )}
                    <View
                      style={{
                        marginTop: (mobileH * 0) / 100,
                      }}
                    >
                      {/* //=========Service Text View======// */}
                      <View
                        style={{
                          width: (mobileW * 93) / 100,
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
                          {item.service}
                        </Text>
                      </View>
                      {/* //=========Baloon & Cost Text View======// */}
                      <View
                        style={{
                          width: (mobileW * 93) / 100,
                          flexDirection: "row",
                          justifyContent: "space-between",
                          marginTop: (mobileH * 1) / 100,
                          alignSelf: "center",
                        }}
                      >
                        <Text
                          style={{
                            color: Colors.black_color,
                            fontFamily: Font.FontBold,
                            fontSize: (mobileW * 3) / 100,
                          }}
                        >
                          {item.baloon}{" "}
                        </Text>

                        <Text
                          style={{
                            color: Colors.black_color,
                            fontFamily: Font.FontBold,
                            fontSize: (mobileW * 3) / 100,
                          }}
                        >
                          {item.cost}
                        </Text>
                      </View>
                      {/* //========Plate/Hour==========// */}
                      {item.st == "false" && (
                        <View
                          style={{
                            width: (mobileW * 93) / 100,
                            alignSelf: "center",
                          }}
                        >
                          <Text
                            style={{
                              color: Colors.bluegreen_color,
                              fontFamily: Font.FontBold,
                              fontSize: (mobileW * 3) / 100,
                            }}
                          >
                            {item.$}{" "}
                          </Text>
                        </View>
                      )}
                      {/* //========Party & Coast  Text View==========// */}
                      {item.st == "true" && (
                        <View
                          style={{
                            width: (mobileW * 93) / 100,
                            flexDirection: "row",
                            justifyContent: "space-between",
                            marginTop: (mobileH * 1) / 100,
                            alignSelf: "center",
                          }}
                        >
                          <Text
                            style={{
                              color: Colors.black_color,
                              fontFamily: Font.FontBold,
                              fontSize: (mobileW * 3) / 100,
                            }}
                          >
                            {item.party}
                          </Text>
                          <Text
                            style={{
                              color: Colors.black_color,
                              fontFamily: Font.FontBold,
                              fontSize: (mobileW * 3) / 100,
                            }}
                          >
                            {item.cost1}
                          </Text>
                        </View>
                      )}
                      {/* //======Border View=======// */}
                   
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
                      {/* //========Grand/Cost Text View==========// */}
                      {item.status == 1 && (
                        <View
                          style={{
                            width: (mobileW * 93) / 100,
                            flexDirection: "row",
                            justifyContent: "space-between",
                            marginTop: (mobileH * 1) / 100,
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
                            {item.grand}
                          </Text>
                          <Text
                            style={{
                              color: Colors.black_color,
                              fontFamily: Font.FontSemiBold,
                              fontSize: (mobileW * 4.3) / 100,
                            }}
                          >
                            {item.costt}
                          </Text>
                        </View>
                      )}
                      {item.status == 1 && (
                   
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
                      )}
                    </View>
                  </View>
                );
              }}
            />
          </View>
          {/* ------------------------------------endflatlist------------------------- */}
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
  linearGradient1: {
    marginTop: (mobileH * 1) / 100,
    opacity: 0.8,
    width: (mobileW * 27) / 100,
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: (mobileW * 1) / 100,
  },
});
