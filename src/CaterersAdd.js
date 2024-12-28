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
  r,
  config,
} from "./Provider/utilslib/Utils";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import LinearGradient from "react-native-linear-gradient";
import DashedLine from "react-native-dashed-line";

export default class CaterersAdd extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Tab: 0,
      Pending: [
        {
          event: "Event Details",
          name: "Event Title",
          message: "5th Birthday Celebration",
          text: "Date & Time",
          text1: "26-Nov-2022,11:00AM",
          guest: "No. of Guest",
          no: "50",
          Area: "Area(Suburb/Postcode)",
          Okemas: "Okemas, Michigan, 48864",
          budget: "Vendors",
          $: "$1650",
        },
      ],
      vendor_arr: [
        {
          text: "Caterers",
          name: "James William",
          date: "(4.0)",
          message: "Creamson Caterers",
          price: "$25/Plate",
          details: "Great Neck Gardens, New York, 11021",
          find: "Find New Vendor",
          img: localimag.img18_img,
          status: true,
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
                      borderWidth: (mobileW * 0.3) / 100,
                      borderColor: Colors.greyColor,
                      marginBottom: (mobileH * 2) / 100,
                    }}
                  >
                    <View
                      style={{
                        marginTop: (mobileH * 0.3) / 100,
                        borderBottomWidth: 1,
                        borderColor: Colors.greyColor,
                        width: (mobileW * 100) / 100,
                        alignSelf: "center",
                      }}
                    ></View>
                    <Text
                      style={{
                        fontSize: (mobileW * 3.7) / 100,
                        fontFamily: Font.FontBold,
                        color: Colors.black_color,
                        paddingVertical: (mobileH * 1) / 100,
                        paddingHorizontal: (mobileW * 2) / 100,
                      }}
                    >
                      {item.event}
                    </Text>

                    <View
                      style={{
                        width: (mobileW * 70) / 100,
                        paddingHorizontal: (mobileW * 2) / 100,
                        width: mobileW,
                        alignSelf: "center",
                        paddingVertical: (mobileW * 1.5) / 100,
                        borderBottomWidth: (mobileW * 3) / 100,
                        borderTopWidth: (mobileW * 0.3) / 100,
                        borderTopColor: Colors.greyColor,
                        borderBottomWidth: (mobileW * 0.3) / 100,
                        borderBottomColor: Colors.greyColor,
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
                            {/* {item.guest} */}
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
                            {/* {item.no} */}
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
                        width: (mobileW * 95) / 100,
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                        alignSelf: "center",
                        paddingVertical: (mobileH * 1) / 100,
                      }}
                    >
                      <Text
                        style={{
                          fontSize: (mobileW * 3.8) / 100,
                          fontFamily: Font.FontBold,
                          color: Colors.black_color,
                        }}
                      >
                        {item.budget}
                      </Text>
                    </View>
                  </View>
                );
              }}
            />
          </View>
          {/* ------------------------------------startflatlist------------------------- */}
          {/* //===========FlatList 2 =======// */}
          <View style={{ marginBottom: (mobileW * 10) / 100 }}>
            <FlatList
              data={this.state.vendor_arr}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item, index }) => (
                //=========Text View=========//
                <View
                  style={{ alignSelf: "center", width: (mobileW * 95) / 100 }}
                >
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
                          width: (mobileW * 24) / 100,
                          height: (mobileW * 22) / 100,
                          borderRadius: (mobileW * 1.5) / 100,
                        }}
                        resizeMode="cover"
                        source={localimag.saile_ilyas_SiwrpBnxDww_unsplash}
                      ></Image>
                    </View>
                    {/* //========Name ========// */}
                    <View style={{ width: (mobileW * 100) / 100 }}>
                      <View
                        style={{
                          flexDirection: "row",
                          justifyContent: "space-between",
                          marginTop: (mobileW * 1) / 100,
                          width: (mobileW * 67) / 100,
                        }}
                      >
                        <Text
                          style={{
                            color: Colors.black_color,
                            fontFamily: Font.FontBold,
                            fontSize: (mobileW * 4.3) / 100,
                            alignSelf: "flex-start",
                          }}
                        >
                          {item.name}
                        </Text>
                      </View>
                      {/* //========Details=======// */}
                      <Text
                        style={{
                          width: (mobileW * 50) / 100,
                          color: Colors.black_color,
                          fontFamily: Font.FontSemiBold,
                          fontSize: (mobileW * 3.7) / 100,
                          marginTop: (mobileH * 0.5) / 100,
                        }}
                      >
                        {item.message}
                      </Text>

                      <View
                        style={{
                          flexDirection: "row",
                          alignItems: "center",
                          justifyContent: "space-between",
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
                          paddingHorizontal: (mobileW * 0.5) / 100,
                          width: "27%",
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
                            fontSize: (mobileW * 2.9) / 100,
                          }}
                        >
                          {item.date}
                        </Text>
                      </View>
                    </View>
                  </TouchableOpacity>
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
                          marginTop: (mobileH * 3) / 100,
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
                          width: (mobileW * 90) / 100,
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
                          width: (mobileW * 90) / 100,
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
                            width: (mobileW * 90) / 100,
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
                            width: (mobileW * 90) / 100,
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
                            width: (mobileW * 90) / 100,
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

          {/* //=========Continue Submit============// */}
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate("CaterersAddSuccess")}
            activeOpacity={0.7}
            style={{
              alignItems: "center",
              alignSelf: "center",
              marginBottom: (mobileH * 1) / 100,
            }}
          >
            <LinearGradient
              colors={[Colors.purple_color, Colors.bluegreen_color]}
              start={{ x: 0, y: 1 }}
              end={{ x: 1, y: 0 }}
              style={{
                height: (mobileH * 6.7) / 100,
                width: (mobileW * 90) / 100,
                alignSelf: "center",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: (mobileW * 1.5) / 100,
                marginTop: (mobileH * 0) / 100,
                marginBottom: (mobileH * 10) / 100,
              }}
            >
              <Text
                style={{
                  color: "#f5f4f5",
                  fontFamily: Font.FontBold,
                  fontSize: (mobileW * 4.5) / 100,
                }}
              >
                Sent Request
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
  Active_View: {
    width: "100%",
    alignSelf: "center",
    alignItems: "center",
    borderBottomColor: Colors.whiteColor,
    borderBottomWidth: 4,
  },
  // Deactive_View: {
  //     width: '100%', alignSelf: 'center', alignItems: 'center',
  // },
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
