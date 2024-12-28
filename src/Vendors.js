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
} from "./Provider/utilslib/Utils";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import LinearGradient from "react-native-linear-gradient";
import { LinearTextGradient } from "react-native-text-gradient";

export default class Vendors extends Component {
  constructor(props) {
    super(props);
    this.state = {
      report: "",
      Tab: 1,
      // Tab: 1,
      addstatus: false,
      vendor_arr: [
        {
          name: "Andrew John",
          namet0: "Andrew John",
          namet1: "Andrew John",
          namet2: "Daniel Michael",
          date: "(4.0)",
          messagetap0: "Parties Galore",
          messagetap1: "Creamson Caterers",
          messagetap2: "DJ Flipbeat",
          price: "$20/Plate",
          price1: "Price :",
          price2: " $600",
          price3: " $50/Hour",
          remove: " Remove",
          added: "+ Added",
          add: " + Add",
          details: "Great Neck Gardens, New York, 11021",
          img: localimag.saile_ilyas_SiwrpBnxDww_unsplash,
          imgt0: localimag.Birthday_girl_img,
          imgt1: localimag.saile_ilyas_SiwrpBnxDww_unsplash,
          imgt2: localimag.min26,
          addstatus: true,
          addTab: 1,
        },
        {
          namet0: "Jonas Liam",
          namet1: "Jonas Liam",
          namet2: "Jonas Liam",
          name: "James William",
          messagetap0: "Party Decor Express ",
          messagetap1: "Tost The Host ",
          messagetap2: "DJ Flipbeat",
          date: "(4.0)",
          message: "Creamson Caterers",
          price: "$25/Plate",
          price1: "Price :",
          price2: " $800",
          price3: " $60/Hour",
          remove: " Remove",
          add: "+ Add",
          added: "+ Add",
          details: "Great Neck Gardens, New York, 11021",
          find: "Find New Vendor",
          img: localimag.storiesun,
          imgt0: localimag.Birthday2_img,
          imgt1: localimag.min_22,
          imgt2: localimag.min_25,
          addstatus: false,
        },
        {
          namet0: "Lucas Benjamin",
          namet1: "Lucas Benjamin",
          namet2: "Lucas Benjamin",
          name: "Daniel Michael",
          messagetap0: "Decor & More",
          messagetap1: "A chef's Touch",
          messagetap2: "Feel the Beat",
          date: "(5.0)",
          message: "DJ Ocean",
          price: "$28/Plate",
          price1: "Price :",
          price2: " $800",
          price3: " $65/Hour",
          remove: " Remove",
          add: "+ Add",
          added: "+ Add",
          // cancle: localimag.cancle_icon,
          details: "Great Neck Gardens, New York, 11021",
          img: localimag.saile_ilyas_SiwrpBnxDww_unsplash,
          imgt0: localimag.sirioun,
          imgt1: localimag.alexander_kovacs_uo9TCt61o30_unsplash,
          imgt2: localimag.min_32,
          addstatus: false,
        },
      ],

      Decorators_arr: [
        {
          name: "Andrew John",
          namet0: "Andrew John",
          namet1: "Andrew John",
          namet2: "Daniel Michael",
          date: "(4.0)",
          messagetap0: "Parties Galore",
          messagetap1: "Creamson Caterers",
          messagetap2: "DJ Flipbeat",
          price: "$20/Plate",
          price1: "Price :",
          price2: " $600",
          price3: " $50/Hour",
          remove: " Remover",
          add: "+ Add",
          added: "+ Added",
          details: "Great Neck Gardens, New York, 11021",
          img: localimag.saile_ilyas_SiwrpBnxDww_unsplash,
          imgt0: localimag.Birthday_girl_img,
          imgt1: localimag.saile_ilyas_SiwrpBnxDww_unsplash,
          imgt2: localimag.min26,
          AddTab: 0,
          addstatus: true,
        },
        {
          namet0: "Jonas Liam",
          namet1: "Jonas Liam",
          namet2: "Jonas Liam",
          name: "James William",
          messagetap0: "Party Decor Express ",
          messagetap1: "Tost The Host ",
          messagetap2: "DJ Flipbeat",
          date: "(4.0)",
          message: "Creamson Caterers",
          price: "$25/Plate",
          price1: "Price :",
          price2: " $800",
          price3: " $60/Hour",
          remove: " Remover",
          add: "+ Add",
          added: "+ Add",
          details: "Great Neck Gardens, New York, 11021",
          find: "Find New Vendor",
          img: localimag.storiesun,
          imgt0: localimag.Birthday2_img,
          imgt1: localimag.min_22,
          imgt2: localimag.min_25,
          addstatus: false,
        },
        {
          namet0: "Lucas Benjamin",
          namet1: "Lucas Benjamin",
          name: "Daniel Michael",
          messagetap0: "Decor & More",
          messagetap1: "A chef's Touch",
          messagetap2: "Feel the Beat",
          date: "(5.0)",
          message: "DJ Ocean",
          price: "$28/Plate",
          price1: "Price :",
          price2: " $800",
          price3: " $65/Hour",
          remove: " Remover",
          add: "+ Add",
          added: "+ Add",
          // cancle: localimag.cancle_icon,
          details: "Great Neck Gardens, New York, 11021",
          img: localimag.saile_ilyas_SiwrpBnxDww_unsplash,
          imgt0: localimag.sirioun,
          imgt1: localimag.alexander_kovacs_uo9TCt61o30_unsplash,
          imgt2: localimag.min_32,
          addstatus: false,
        },
      ],
      Caterers_arr: [
        {
          name: "Andrew John",
          namet0: "Andrew John",
          namet1: "Andrew John",
          namet2: "Daniel Michael",
          date: "(4.0)",
          messagetap0: "Parties Galore",
          messagetap1: "Creamson Caterers",
          messagetap2: "DJ Flipbeat",
          price: "$20/Plate",
          price1: "Price :",
          price2: " $600",
          price3: " $50/Hour",
          remove: " Remover",
          added: "+ Added",
          add: "+ Add",
          details: "Great Neck Gardens, New York, 11021",
          img: localimag.saile_ilyas_SiwrpBnxDww_unsplash,
          imgt0: localimag.Birthday_girl_img,
          imgt1: localimag.saile_ilyas_SiwrpBnxDww_unsplash,
          imgt2: localimag.min26,
          AddTab: 1,
          addstatus: true,
        },
        {
          namet0: "Jonas Liam",
          namet1: "Jonas Liam",
          namet2: "Jonas Liam",
          name: "James William",
          messagetap0: "Party Decor Express ",
          messagetap1: "Tost The Host ",
          messagetap2: "DJ Flipbeat",
          date: "(4.0)",
          message: "Creamson Caterers",
          price: "$25/Plate",
          price1: "Price :",
          price2: " $800",
          price3: " $60/Hour",
          remove: " Remover",
          add: "+ Add",
          added: "+ Add",
          details: "Great Neck Gardens, New York, 11021",
          find: "Find New Vendor",
          img: localimag.storiesun,
          imgt0: localimag.Birthday2_img,
          imgt1: localimag.min_22,
          imgt2: localimag.min_25,
          addstatus: false,
        },
        {
          namet0: "Lucas Benjamin",
          namet1: "Lucas Benjamin",
          name: "Daniel Michael",
          messagetap0: "Decor & More",
          messagetap1: "A chef's Touch",
          messagetap2: "Feel the Beat",
          date: "(5.0)",
          message: "DJ Ocean",
          price: "$28/Plate",
          price1: "Price :",
          price2: " $800",
          price3: " $65/Hour",
          remove: " Remover",
          add: "+ Add",
          added: "+ Add",
          // cancle: localimag.cancle_icon,
          details: "Great Neck Gardens, New York, 11021",
          img: localimag.saile_ilyas_SiwrpBnxDww_unsplash,
          imgt0: localimag.sirioun,
          imgt1: localimag.alexander_kovacs_uo9TCt61o30_unsplash,
          imgt2: localimag.min_32,
          addstatus: false,
        },
      ],
      DJSound_arr: [
        {
          name: "Andrew John",
          namet0: "Andrew John",
          namet1: "Andrew John",
          namet2: "Daniel Michael",
          date: "(4.0)",
          messagetap0: "Parties Galore",
          messagetap1: "Creamson Caterers",
          messagetap2: "DJ Flipbeat",
          price: "$20/Plate",
          price1: "Price :",
          price2: " $600",
          price3: " $50/Hour",
          remove: " Remover",
          add: "+ Added",
          added: "+ Add",
          details: "Great Neck Gardens, New York, 11021",
          img: localimag.saile_ilyas_SiwrpBnxDww_unsplash,
          imgt0: localimag.Birthday_girl_img,
          imgt1: localimag.saile_ilyas_SiwrpBnxDww_unsplash,
          imgt2: localimag.min26,
          AddTab: 2,
          addstatus: true,
        },
        {
          namet0: "Jonas Liam",
          namet1: "Jonas Liam",
          namet2: "Jonas Liam",
          name: "James William",
          messagetap0: "Party Decor Express ",
          messagetap1: "Tost The Host ",
          messagetap2: "DJ Flipbeat",
          date: "(4.0)",
          message: "Creamson Caterers",
          price: "$25/Plate",
          price1: "Price :",
          price2: " $800",
          price3: " $60/Hour",
          remove: " Remover",
          add: "+ Add",
          added: "+ Add",
          details: "Great Neck Gardens, New York, 11021",
          find: "Find New Vendor",
          img: localimag.storiesun,
          imgt0: localimag.Birthday2_img,
          imgt1: localimag.min_22,
          imgt2: localimag.min_25,
          addstatus: false,
        },
        {
          namet0: "Lucas Benjamin",
          namet1: "Lucas Benjamin",
          namet2: "Lucas Benjamin",
          name: "Daniel Michael",
          messagetap0: "Decor & More",
          messagetap1: "A chef's Touch",
          messagetap2: "Feel the Beat",
          date: "(5.0)",
          message: "DJ Ocean",
          price: "$28/Plate",
          price1: "Price :",
          price2: " $800",
          price3: " $65/Hour",
          remove: " Remover",
          add: "+ Add",
          added: "+ Add",
          // cancle: localimag.cancle_icon,
          details: "Great Neck Gardens, New York, 11021",
          img: localimag.saile_ilyas_SiwrpBnxDww_unsplash,
          imgt0: localimag.sirioun,
          imgt1: localimag.alexander_kovacs_uo9TCt61o30_unsplash,
          imgt2: localimag.min_32,
          addstatus: false,
        },
      ],
      add_arr: [
        {
          service: "Service (Decoration)",
          baloon: "Baloon Decoration Service",
          party: "Party Decoration Service",
          cost: "$200",
          cost1: "$400",
        },
        {
          service: "Service (Caterers)",
          baloon: "Italian Cuisine ($20*50)",
          cost: "$1000",
          //party : 'Party Decoration Service'
        },
        {
          service: "Service (DJ & Sound)",
          baloon: "DJ & Sound (1 Hour)",
          cost: "$50",
          // party : 'Party Decoration Service'
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
          {/* ----------------------for tab view--------------------------- */}
          <View style={styles.Maintab}>
            <TouchableOpacity
              activeOpacity={1}
              onPress={() => {
                this.setState({ Tab: 0, addstatus: !this.state.addstatus });
              }}
              style={{ width: "24%", alignSelf: "center" }}
            >
              {this.state.Tab == 0 ? (
                <View style={styles.Active_View}>
                  <LinearGradient
                    colors={[Colors.light_greencolor, Colors.purple_color]}
                    start={{ x: 0, y: 1 }}
                    end={{ x: 1, y: 1 }}
                    style={{
                      width: "100%",
                      alignSelf: "center",
                      alignItems: "center",
                      borderBottomColor: Colors.whiteColor,
                      borderBottomWidth: 4,
                      paddingVertical: (mobileW * 2) / 100,
                      borderRadius: (mobileW * 1) / 100,
                    }}
                  >
                    <Text
                      style={{
                        fontSize: (mobileW * 3.7) / 100,
                        fontFamily: Font.FontBold,
                        color: Colors.whiteColor,
                      }}
                    >
                      {Lang_chg.Decorators_txt[config.language]}
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
                    {Lang_chg.Decorators_txt[config.language]}
                  </Text>
                </View>
              )}
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.08}
              onPress={() => {
                this.setState({ Tab: 1, addstatus: !this.state.addstatus });
              }}
              style={{ width: "24%", alignSelf: "center" }}
            >
              {this.state.Tab == 1 ? (
                <View style={styles.Active_View}>
                  <LinearGradient
                    colors={[Colors.light_greencolor, Colors.purple_color]}
                    start={{ x: 0, y: 1 }}
                    end={{ x: 1, y: 1 }}
                    style={{
                      width: "100%",
                      alignSelf: "center",
                      alignItems: "center",
                      borderBottomColor: Colors.whiteColor,
                      borderBottomWidth: 4,
                      paddingVertical: (mobileW * 2) / 100,
                      borderRadius: (mobileW * 1) / 100,
                    }}
                  >
                    <Text
                      style={{
                        fontSize: (mobileW * 3.7) / 100,
                        fontFamily: Font.FontBold,
                        color: Colors.whiteColor,
                      }}
                    >
                      {Lang_chg.Caterers_txt[config.language]}
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
                    {Lang_chg.Caterers_txt[config.language]}
                  </Text>
                </View>
              )}
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.08}
              onPress={() => {
                this.setState({ Tab: 2, addstatus: !this.state.addstatus });
              }}
              style={{ width: "24%", alignSelf: "center" }}
            >
              {this.state.Tab == 2 ? (
                <View style={styles.Active_View}>
                  <LinearGradient
                    colors={[Colors.light_greencolor, Colors.purple_color]}
                    start={{ x: 0, y: 1 }}
                    end={{ x: 1, y: 1 }}
                    style={{
                      width: "100%",
                      alignSelf: "center",
                      alignItems: "center",
                      borderRadius: (mobileW * 1) / 100,
                      borderBottomColor: Colors.whiteColor,
                      borderBottomWidth: 4,
                      paddingVertical: (mobileW * 2) / 100,
                    }}
                  >
                    <Text
                      style={{
                        fontSize: (mobileW * 3.7) / 100,
                        fontFamily: Font.FontBold,
                        color: Colors.whiteColor,
                      }}
                    >
                      {Lang_chg.DJ_txt[config.language]}
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
                    {Lang_chg.DJ_txt[config.language]}
                  </Text>
                </View>
              )}
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.08}
              onPress={() => {
                this.setState({ Tab: 3 });
              }}
              style={{ width: "24%", alignSelf: "center" }}
            >
              {this.state.Tab == 3 ? (
                <View style={styles.Active_View}>
                  <LinearGradient
                    colors={[Colors.light_greencolor, Colors.purple_color]}
                    start={{ x: 0, y: 1 }}
                    end={{ x: 1, y: 1 }}
                    style={{
                      width: "100%",
                      alignSelf: "center",
                      alignItems: "center",
                      borderBottomColor: Colors.whiteColor,
                      borderBottomWidth: 4,
                      paddingVertical: (mobileW * 2) / 100,
                      borderRadius: (mobileW * 1) / 100,
                    }}
                  >
                    <Text
                      style={{
                        fontSize: (mobileW * 3.7) / 100,
                        fontFamily: Font.FontBold,
                        color: Colors.whiteColor,
                      }}
                    >
                      {Lang_chg.Venu_txt[config.language]}
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
                    {Lang_chg.Venu_txt[config.language]}
                  </Text>
                </View>
              )}
            </TouchableOpacity>
          </View>

          {/*-------------------tab ended------------------------ */}

          {/* ------------------------------------startflatlist------------------------- */}
          {/* //===========FlatList=======// */}
          {this.state.Tab == 0 && (
            <FlatList
              data={this.state.vendor_arr}
              showsHorizontalScrollIndicator={false}
              renderItem={({ item, index }) => {
                return (
                  <View>
                    <View
                      style={{
                        width: (mobileW * 95) / 100,
                        alignSelf: "center",
                        marginTop: (mobileH * 1.2) / 100,
                        flexDirection: "row",
                      }}
                    >
                      {/* --------------------------for vendor cod------------- */}
                      {/* ------------------for image----------------- */}
                      <TouchableOpacity
                        onPress={() =>
                          this.props.navigation.navigate("VendorsDetails")
                        }
                        activeOpacity={0.7}
                        style={{ width: (mobileW * 23) / 100 }}
                      >
                        <Image
                          resizeMode="cover"
                          borderRadius={(mobileW * 2) / 100}
                          style={{
                            width: (mobileW * 22) / 100,
                            height: (mobileW * 16) / 100,
                          }}
                          source={item.imgt0}
                        ></Image>
                      </TouchableOpacity>
                      {/* ------- */}
                      {/* ---Andrew view----------- */}
                      <View
                        style={{
                          width: (mobileW * 50) / 100,
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
                            {item.namet0}
                          </Text>
                          {/* ---for second text----------- */}
                          <Text
                            style={{
                              fontSize: (mobileW * 3.2) / 100,
                              fontFamily: Font.FontSemiBold,
                              color: Colors.black_color,
                              paddingVertical: (mobileH * 0.5) / 100,
                            }}
                          >
                            {item.messagetap0}
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
                              }}
                            >
                              {Lang_chg.Great_txt[config.language]}
                            </Text>
                          </View>
                        </View>
                        {/* ---star view----------- */}
                        <View
                          style={{
                            width: (mobileW * 12) / 100,
                            flexDirection: "row",
                            marginTop: (mobileH * 0.6) / 100,
                            height: (mobileH * 3) / 100,
                          }}
                        >
                          <Image
                            style={{
                              width: (mobileW * 3.3) / 100,
                              height: (mobileW * 3.3) / 100,
                              marginLeft: (mobileW * 1) / 100,
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
                            source={localimag.star_deactive}
                          ></Image>
                          <Text
                            style={{
                              color: Colors.black_color,
                              fontFamily: Font.FontBold,
                              fontSize: (mobileW * 2.9) / 100,
                              marginLeft: (mobileW * 1) / 100,
                            }}
                          >
                            {Lang_chg.num40_txt[config.language]}
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
                            colors={[
                              Colors.voilet_color,
                              Colors.dark_greencolor,
                            ]}
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
                              {item.price1}
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
                            {item.price2}
                          </Text>
                        </View>

                        {/* -----------for second view------------------ */}
                        <View
                          style={{
                            width: (mobileW * 43) / 100,
                            flexDirection: "row",
                            justifyContent: "space-between",
                          }}
                        >
                          <TouchableOpacity
                            style={{
                              width: (mobileW * 20) / 100,
                              alignSelf: "center",
                              backgroundColor: Colors.redColor,
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
                              {item.remove}
                            </Text>
                          </TouchableOpacity>
                          <TouchableOpacity
                            onPress={() => {
                              this.setState({
                                AddTab: 0,
                                addstatus: !this.state.addstatus,
                              });
                            }}
                            //  onPress={() => this.props.navigation.navigate('')}
                            activeOpacity={0.7}
                            style={{
                              width: (mobileW * 20) / 100,
                              alignSelf: "center",
                              backgroundColor: Colors.green_color,
                              borderRadius: (mobileW * 1) / 100,
                            }}
                          >
                            {this.state.addstatus == false ? (
                              <Text
                                style={{
                                  color: Colors.whiteColor,
                                  fontFamily: Font.FontBold,
                                  fontSize: (mobileW * 2.9) / 100,
                                  textAlign: "center",
                                  paddingVertical: (mobileH * 0.5) / 100,
                                }}
                              >
                                {item.add}
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
                                {item.added}
                                {/* Added  */}
                              </Text>
                            )}
                          </TouchableOpacity>
                        </View>
                      </View>
                    </View>
                  </View>
                );
              }}
            />
          )}

          {/* ----for tab 1------------------ */}
          {this.state.Tab == 1 && (
            <FlatList
              data={this.state.vendor_arr}
              showsHorizontalScrollIndicator={false}
              renderItem={({ item, index }) => {
                return (
                  <View style={{ paddingVertical: (mobileH * 0.5) / 100 }}>
                    <View
                      style={{
                        width: (mobileW * 95) / 100,
                        alignSelf: "center",
                        marginTop: (mobileH * 1.2) / 100,
                        flexDirection: "row",
                      }}
                    >
                      {/* --------------------------for vendor cod------------- */}
                      {/* ------------------for image----------------- */}
                      <TouchableOpacity
                        onPress={() =>
                          this.props.navigation.navigate("VendorsDetails")
                        }
                        activeOpacity={0.7}
                        style={{ width: (mobileW * 23) / 100 }}
                      >
                        <Image
                          resizeMode="cover"
                          borderRadius={(mobileW * 2) / 100}
                          style={{
                            width: (mobileW * 22) / 100,
                            height: (mobileW * 16) / 100,
                          }}
                       
                          source={item.imgt1}
                        ></Image>
                      </TouchableOpacity>
                      {/* ------- */}
                      {/* ---Andrew view----------- */}
                      <View
                        style={{
                          width: (mobileW * 50) / 100,
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
                            {item.namet1}
                          </Text>
                          {/* ---for second text----------- */}
                          <Text
                            style={{
                              fontSize: (mobileW * 3.2) / 100,
                              fontFamily: Font.FontSemiBold,
                              color: Colors.black_color,
                              paddingVertical: (mobileH * 0.5) / 100,
                            }}
                          >
                            {item.messagetap1}
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
                              }}
                            >
                              {Lang_chg.Great_txt[config.language]}
                            </Text>
                          </View>
                        </View>
                        {/* ---star view----------- */}
                        <View
                          style={{
                            width: (mobileW * 12) / 100,
                            flexDirection: "row",
                            marginTop: (mobileH * 0.6) / 100,
                            height: (mobileH * 3) / 100,
                          }}
                        >
                          <Image
                            style={{
                              width: (mobileW * 3.3) / 100,
                              height: (mobileW * 3.3) / 100,
                              marginLeft: (mobileW * 1) / 100,
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
                            source={localimag.star_deactive}
                          ></Image>
                          <Text
                            style={{
                              color: Colors.black_color,
                              fontFamily: Font.FontBold,
                              fontSize: (mobileW * 2.9) / 100,
                              marginLeft: (mobileW * 1) / 100,
                            }}
                          >
                            {Lang_chg.num40_txt[config.language]}
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
                            colors={[
                              Colors.voilet_color,
                              Colors.dark_greencolor,
                            ]}
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
                              {item.price1}
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
                            {item.price2}
                          </Text>
                        </View>
                        {/* -----------for second view------------------ */}
                        <View
                          style={{
                            width: (mobileW * 43) / 100,
                            flexDirection: "row",
                            justifyContent: "space-between",
                          }}
                        >
                          <TouchableOpacity
                            style={{
                              width: (mobileW * 20) / 100,
                              alignSelf: "center",
                              backgroundColor: Colors.redColor,
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
                              {item.remove}
                            </Text>
                          </TouchableOpacity>
                          <TouchableOpacity
                            onPress={() => {
                              this.setState({
                                AddTab: 1,
                                addstatus: !this.state.addstatus,
                              });
                            }}
                            //  onPress={() => this.props.navigation.navigate('')}
                            activeOpacity={0.7}
                            style={{
                              width: (mobileW * 20) / 100,
                              alignSelf: "center",
                              backgroundColor: Colors.green_color,
                              borderRadius: (mobileW * 1) / 100,
                            }}
                          >
                            {this.state.addstatus == false ? (
                              <Text
                                style={{
                                  color: Colors.whiteColor,
                                  fontFamily: Font.FontBold,
                                  fontSize: (mobileW * 2.9) / 100,
                                  textAlign: "center",
                                  paddingVertical: (mobileH * 0.5) / 100,
                                }}
                              >
                                {item.add}
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
                                {item.added}
                                {/* Added  */}
                              </Text>
                            )}
                          </TouchableOpacity>
                        </View>
                      </View>
                    </View>
                  </View>
                );
              }}
            />
          )}
          {/* ==================for tab 2------------------ */}
          {this.state.Tab == 2 && (
            <FlatList
              data={this.state.vendor_arr}
              showsHorizontalScrollIndicator={false}
              renderItem={({ item, index }) => {
                return (
                  <View>
                    <View
                      style={{
                        width: (mobileW * 95) / 100,
                        alignSelf: "center",
                        marginTop: (mobileH * 1.2) / 100,
                        flexDirection: "row",
                      }}
                    >
                      {/* --------------------------for vendor cod------------- */}
                      {/* ------------------for image----------------- */}
                      <TouchableOpacity
                        onPress={() =>
                          this.props.navigation.navigate("VendorsDetails")
                        }
                        activeOpacity={0.7}
                        style={{ width: (mobileW * 23) / 100 }}
                      >
                        <Image
                          resizeMode="cover"
                          borderRadius={(mobileW * 2) / 100}
                          style={{
                            width: (mobileW * 22) / 100,
                            height: (mobileW * 16) / 100,
                          }}
                          //</View> source={localimag.Birthday_girl_img}>
                          source={item.imgt2}
                        ></Image>
                      </TouchableOpacity>
                      {/* ------- */}
                      {/* ---Andrew view----------- */}
                      <View
                        style={{
                          width: (mobileW * 50) / 100,
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
                            {item.namet2}
                            {/* {Lang_chg.Andrew_txt[config.language]} */}
                          </Text>
                          {/* ---for second text----------- */}
                          <Text
                            style={{
                              fontSize: (mobileW * 3.2) / 100,
                              fontFamily: Font.FontSemiBold,
                              color: Colors.black_color,
                              paddingVertical: (mobileH * 0.5) / 100,
                            }}
                          >
                            {item.messagetap2}
                            {/* {Lang_chg.Parties_txt[config.language]} */}
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
                              }}
                            >
                              {Lang_chg.Great_txt[config.language]}
                            </Text>
                          </View>
                        </View>
                        {/* ---star view----------- */}
                        <View
                          style={{
                            width: (mobileW * 12) / 100,
                            flexDirection: "row",
                            marginTop: (mobileH * 0.6) / 100,
                            height: (mobileH * 3) / 100,
                          }}
                        >
                          <Image
                            style={{
                              width: (mobileW * 3.3) / 100,
                              height: (mobileW * 3.3) / 100,
                              marginLeft: (mobileW * 1) / 100,
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
                            source={localimag.star_deactive}
                          ></Image>
                          <Text
                            style={{
                              color: Colors.black_color,
                              fontFamily: Font.FontBold,
                              fontSize: (mobileW * 2.9) / 100,
                              marginLeft: (mobileW * 1) / 100,
                            }}
                          >
                            {Lang_chg.num40_txt[config.language]}
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
                            colors={[
                              Colors.voilet_color,
                              Colors.dark_greencolor,
                            ]}
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
                              {item.price1}
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
                            {item.price}
                          </Text>
                        </View>
                        {/* -----------for second view------------------ */}
                        <View
                          style={{
                            width: (mobileW * 43) / 100,
                            flexDirection: "row",
                            justifyContent: "space-between",
                          }}
                        >
                          <TouchableOpacity
                            style={{
                              width: (mobileW * 20) / 100,
                              alignSelf: "center",
                              backgroundColor: Colors.redColor,
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
                              {item.remove}
                            </Text>
                          </TouchableOpacity>
                          <TouchableOpacity
                            onPress={() => {
                              this.setState({
                                AddTab: 2,
                                addstatus: !this.state.addstatus,
                              });
                            }}
                            //  onPress={() => this.props.navigation.navigate('')}
                            activeOpacity={0.7}
                            style={{
                              width: (mobileW * 20) / 100,
                              alignSelf: "center",
                              backgroundColor: Colors.green_color,
                              borderRadius: (mobileW * 1) / 100,
                            }}
                          >
                            {this.state.addstatus == false ? (
                              <Text
                                style={{
                                  color: Colors.whiteColor,
                                  fontFamily: Font.FontBold,
                                  fontSize: (mobileW * 2.9) / 100,
                                  textAlign: "center",
                                  paddingVertical: (mobileH * 0.5) / 100,
                                }}
                              >
                                {item.add}
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
                                {item.added}
                                {/* Added  */}
                              </Text>
                            )}
                          </TouchableOpacity>
                        </View>
                      </View>
                    </View>
                  </View>
                );
              }}
            />
          )}
          {/* ------------------------for tab 3-------------------- */}
          {this.state.Tab == 3 && (
            <FlatList
              data={this.state.vendor_arr}
              showsHorizontalScrollIndicator={false}
              renderItem={({ item, index }) => {
                return (
                  <View>
                    <View
                      style={{
                        width: (mobileW * 95) / 100,
                        alignSelf: "center",
                        marginTop: (mobileH * 1.2) / 100,
                        flexDirection: "row",
                      }}
                    >
                      {/* --------------------------for vendor cod------------- */}
                      {/* ------------------for image----------------- */}
                      <TouchableOpacity
                        onPress={() =>
                          this.props.navigation.navigate("VendorsDetails")
                        }
                        activeOpacity={0.7}
                        style={{ width: (mobileW * 23) / 100 }}
                      >
                        <Image
                          resizeMode="cover"
                          borderRadius={(mobileW * 2) / 100}
                          style={{
                            width: (mobileW * 22) / 100,
                            height: (mobileW * 16) / 100,
                          }}
                          //</View> source={localimag.Birthday_girl_img}>
                          source={item.imgt2}
                        ></Image>
                      </TouchableOpacity>
                      {/* ------- */}
                      {/* ---Andrew view----------- */}
                      <View
                        style={{
                          width: (mobileW * 50) / 100,
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
                            {item.namet2}
                            {/* {Lang_chg.Andrew_txt[config.language]} */}
                          </Text>
                          {/* ---for second text----------- */}
                          <Text
                            style={{
                              fontSize: (mobileW * 3.2) / 100,
                              fontFamily: Font.FontSemiBold,
                              color: Colors.black_color,
                              paddingVertical: (mobileH * 0.5) / 100,
                            }}
                          >
                            {item.messagetap2}
                            {/* {Lang_chg.Parties_txt[config.language]} */}
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
                              }}
                            >
                              {Lang_chg.Great_txt[config.language]}
                            </Text>
                          </View>
                        </View>
                        {/* ---star view----------- */}
                        <View
                          style={{
                            width: (mobileW * 12) / 100,
                            flexDirection: "row",
                            marginTop: (mobileH * 0.6) / 100,
                            height: (mobileH * 3) / 100,
                          }}
                        >
                          <Image
                            style={{
                              width: (mobileW * 3.3) / 100,
                              height: (mobileW * 3.3) / 100,
                              marginLeft: (mobileW * 1) / 100,
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
                            source={localimag.star_deactive}
                          ></Image>
                          <Text
                            style={{
                              color: Colors.black_color,
                              fontFamily: Font.FontBold,
                              fontSize: (mobileW * 2.9) / 100,
                              marginLeft: (mobileW * 1) / 100,
                            }}
                          >
                            {Lang_chg.num40_txt[config.language]}
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
                            colors={[
                              Colors.voilet_color,
                              Colors.dark_greencolor,
                            ]}
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
                              {item.price1}
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
                            {item.price3}
                          </Text>
                        </View>

                        {/* -----------for second view------------------ */}
                        <View
                          style={{
                            width: (mobileW * 43) / 100,
                            flexDirection: "row",
                            justifyContent: "space-between",
                          }}
                        >
                          <TouchableOpacity
                            style={{
                              width: (mobileW * 20) / 100,
                              alignSelf: "center",
                              backgroundColor: Colors.redColor,
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
                              {item.remove}
                            </Text>
                          </TouchableOpacity>
                          <TouchableOpacity
                            activeOpacity={0.7}
                            style={{
                              width: (mobileW * 20) / 100,
                              alignSelf: "center",
                              backgroundColor: Colors.green_color,
                              borderRadius: (mobileW * 1) / 100,
                            }}
                          >
                            <Text
                              style={{
                                color: Colors.whiteColor,
                                fontFamily: Font.FontBold,
                                fontSize: (mobileW * 2.9) / 100,
                                textAlign: "center",
                                paddingVertical: (mobileH * 0.5) / 100,
                              }}
                            >
                              {item.add}
                            </Text>
                          </TouchableOpacity>
                        </View>
                      </View>
                    </View>
                  </View>
                );
              }}
            />
          )}
          {/* ------------------------------------endflatlist------------------------- */}
     

          {this.state.AddTab == 0 && this.state.Tab == 0 && (
            <View style={{}}>
              <View
                style={{
                  width: (mobileW * 90) / 100,
                  alignSelf: "center",
                  marginTop: (mobileH * 5) / 100,
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
              {/* ---------budeget view------------- */}
              <View style={{ marginTop: (mobileH * 0) / 100 }}>
                <View
                  style={{
                    width: (mobileW * 90) / 100,
                    alignSelf: "center",
                    paddingVertical: (mobileH * 1) / 100,
                  }}
                >
                  <Text
                    style={{
                      color: Colors.black_color,
                      fontFamily: Font.FontBold,
                      fontSize: (mobileW * 4) / 100,
                    }}
                  >
                    Service (Decoration)
                  </Text>
                </View>
                <View
                  style={{
                    width: (mobileW * 90) / 100,
                    flexDirection: "row",
                    justifyContent: "space-between",
                    paddingVertical: (mobileH * 0.7) / 100,
                    paddingHorizontal: (mobileW * 5) / 100,
                  }}
                >
                  <Text
                    style={{
                      color: Colors.black_color,
                      fontFamily: Font.FontBold,
                      fontSize: (mobileW * 3) / 100,
                    }}
                  >
                    Baloon Decoration Service
                  </Text>
                  <Text
                    style={{
                      color: Colors.black_color,
                      fontFamily: Font.FontBold,
                      fontSize: (mobileW * 3) / 100,
                    }}
                  >
                    $200
                  </Text>
                </View>
                <View
                  style={{
                    width: (mobileW * 90) / 100,
                    flexDirection: "row",
                    justifyContent: "space-between",
                    paddingVertical: (mobileH * 0.7) / 100,
                    paddingHorizontal: (mobileW * 5) / 100,
                  }}
                >
                  <Text
                    style={{
                      color: Colors.black_color,
                      fontFamily: Font.FontBold,
                      fontSize: (mobileW * 3) / 100,
                    }}
                  >
                    Party Decoration Services
                  </Text>
                  <Text
                    style={{
                      color: Colors.black_color,
                      fontFamily: Font.FontBold,
                      fontSize: (mobileW * 3) / 100,
                    }}
                  >
                    $400
                  </Text>
                </View>

                <View
                  style={{
                    marginTop: (mobileH * 1) / 100,
                    borderBottomWidth: 1,
                    borderColor: Colors.greyColor,
                    width: (mobileW * 90) / 100,
                    alignSelf: "center",
                  }}
                ></View>
                {/* -------------grand total------------ */}
                <View
                  style={{
                    width: (mobileW * 90) / 100,
                    flexDirection: "row",
                    justifyContent: "space-between",
                    paddingVertical: (mobileH * 0.7) / 100,
                    paddingHorizontal: (mobileW * 5) / 100,
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
                    $600
                  </Text>
                </View>
                <View
                  style={{
                    marginTop: (mobileH * 1) / 100,
                    borderBottomWidth: 1,
                    borderColor: Colors.greyColor,
                    width: (mobileW * 90) / 100,
                    alignSelf: "center",
                  }}
                ></View>
              </View>

              {/* //=========Continue Submit============// */}
              <TouchableOpacity
                onPress={() =>
                  this.props.navigation.navigate("ProposedEventVendorListTab0")
                }
                // onPress={() => this.props.navigation.navigate('CaterersAdd')}

                activeOpacity={0.7}
                style={{
                  alignItems: "center",
                  alignSelf: "center",
                  marginBottom: (mobileH * 1) / 100,
                  marginTop: (mobileH * 3) / 100,
                }}
              >
                <LinearGradient
                  colors={[Colors.purple_color, Colors.light_greencolor]}
                  start={{ x: 0, y: 1 }}
                  end={{ x: 1, y: 0 }}
                  // onPress={() => this.loginBtn()}
                  // activeOpacity={0.7}
                  style={{
                    //backgroundColor: Colors.theme_color,
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
                    {Lang_chg.Continue_txt[config.language]}
                  </Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          )}

          {this.state.AddTab == 1 && this.state.Tab == 1 && (
            <View style={{}}>
              <View
                style={{
                  width: (mobileW * 90) / 100,
                  alignSelf: "center",
                  marginTop: (mobileH * 5) / 100,
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
              {/* ---------budeget view------------- */}
              <View style={{ marginTop: (mobileH * 0) / 100 }}>
                <View
                  style={{
                    width: (mobileW * 90) / 100,
                    alignSelf: "center",
                    paddingVertical: (mobileH * 1) / 100,
                  }}
                >
                  <Text
                    style={{
                      color: Colors.black_color,
                      fontFamily: Font.FontBold,
                      fontSize: (mobileW * 4) / 100,
                    }}
                  >
                    Service (Decoration)
                  </Text>
                </View>
                <View
                  style={{
                    width: (mobileW * 90) / 100,
                    flexDirection: "row",
                    justifyContent: "space-between",
                    paddingVertical: (mobileH * 0.7) / 100,
                    paddingHorizontal: (mobileW * 5) / 100,
                  }}
                >
                  <Text
                    style={{
                      color: Colors.black_color,
                      fontFamily: Font.FontBold,
                      fontSize: (mobileW * 3) / 100,
                    }}
                  >
                    Baloon Decoration Service
                  </Text>
                  <Text
                    style={{
                      color: Colors.black_color,
                      fontFamily: Font.FontBold,
                      fontSize: (mobileW * 3) / 100,
                    }}
                  >
                    $200
                  </Text>
                </View>
                <View
                  style={{
                    width: (mobileW * 90) / 100,
                    flexDirection: "row",
                    justifyContent: "space-between",
                    paddingVertical: (mobileH * 0.7) / 100,
                    paddingHorizontal: (mobileW * 5) / 100,
                  }}
                >
                  <Text
                    style={{
                      color: Colors.black_color,
                      fontFamily: Font.FontBold,
                      fontSize: (mobileW * 3) / 100,
                    }}
                  >
                    Party Decoration Services
                  </Text>
                  <Text
                    style={{
                      color: Colors.black_color,
                      fontFamily: Font.FontBold,
                      fontSize: (mobileW * 3) / 100,
                    }}
                  >
                    $400
                  </Text>
                </View>
                {/* -----decoration view end ------------ */}
                <View
                  style={{
                    width: (mobileW * 90) / 100,
                    alignSelf: "center",
                    paddingVertical: (mobileH * 1) / 100,
                  }}
                >
                  <Text
                    style={{
                      color: Colors.black_color,
                      fontFamily: Font.FontBold,
                      fontSize: (mobileW * 4) / 100,
                    }}
                  >
                    Service (Caterers)
                  </Text>
                </View>
                <View
                  style={{
                    width: (mobileW * 90) / 100,
                    flexDirection: "row",
                    justifyContent: "space-between",
                    paddingVertical: (mobileH * 0.7) / 100,
                    paddingHorizontal: (mobileW * 5) / 100,
                  }}
                >
                  <Text
                    style={{
                      color: Colors.black_color,
                      fontFamily: Font.FontBold,
                      fontSize: (mobileW * 3) / 100,
                    }}
                  >
                    Italian Cuisine ($20*50)
                  </Text>
                  <Text
                    style={{
                      color: Colors.black_color,
                      fontFamily: Font.FontBold,
                      fontSize: (mobileW * 3) / 100,
                    }}
                  >
                    $1000
                  </Text>
                </View>

                <View
                  style={{
                    marginTop: (mobileH * 1) / 100,
                    borderBottomWidth: 1,
                    borderColor: Colors.greyColor,
                    width: (mobileW * 90) / 100,
                    alignSelf: "center",
                  }}
                ></View>
                {/* -------------grand total------------ */}
                <View
                  style={{
                    width: (mobileW * 90) / 100,
                    flexDirection: "row",
                    justifyContent: "space-between",
                    paddingVertical: (mobileH * 0.7) / 100,
                    paddingHorizontal: (mobileW * 5) / 100,
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
                    $1650
                  </Text>
                </View>
                <View
                  style={{
                    marginTop: (mobileH * 1) / 100,
                    borderBottomWidth: 1,
                    borderColor: Colors.greyColor,
                    width: (mobileW * 90) / 100,
                    alignSelf: "center",
                  }}
                ></View>
              </View>

              {/* //=========Continue Submit============// */}
              <TouchableOpacity
           
                onPress={() =>
                  this.props.navigation.navigate("ProposedEventVendorList")
                }
                activeOpacity={0.7}
                style={{
                  alignItems: "center",
                  alignSelf: "center",
                  marginBottom: (mobileH * 1) / 100,
                  marginTop: (mobileH * 3) / 100,
                }}
              >
                <LinearGradient
                  colors={[Colors.purple_color, Colors.light_greencolor]}
                  start={{ x: 0, y: 1 }}
                  end={{ x: 1, y: 0 }}
                  // onPress={() => this.loginBtn()}
                  // activeOpacity={0.7}
                  style={{
                    //backgroundColor: Colors.theme_color,
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
                    {Lang_chg.Continue_txt[config.language]}
                  </Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          )}

          {this.state.AddTab == 2 && this.state.Tab == 2 && (
            <View style={{}}>
              <View
                style={{
                  width: (mobileW * 90) / 100,
                  alignSelf: "center",
                  marginTop: (mobileH * 5) / 100,
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
              {/* ---------budeget view------------- */}
              <View style={{ marginTop: (mobileH * 0) / 100 }}>
                <View
                  style={{
                    width: (mobileW * 90) / 100,
                    alignSelf: "center",
                    paddingVertical: (mobileH * 1) / 100,
                  }}
                >
                  <Text
                    style={{
                      color: Colors.black_color,
                      fontFamily: Font.FontBold,
                      fontSize: (mobileW * 4) / 100,
                    }}
                  >
                    Service (Decoration)
                  </Text>
                </View>
                <View
                  style={{
                    width: (mobileW * 90) / 100,
                    flexDirection: "row",
                    justifyContent: "space-between",
                    paddingVertical: (mobileH * 0.7) / 100,
                    paddingHorizontal: (mobileW * 5) / 100,
                  }}
                >
                  <Text
                    style={{
                      color: Colors.black_color,
                      fontFamily: Font.FontBold,
                      fontSize: (mobileW * 3) / 100,
                    }}
                  >
                    Baloon Decoration Service
                  </Text>
                  <Text
                    style={{
                      color: Colors.black_color,
                      fontFamily: Font.FontBold,
                      fontSize: (mobileW * 3) / 100,
                    }}
                  >
                    $200
                  </Text>
                </View>
                <View
                  style={{
                    width: (mobileW * 90) / 100,
                    flexDirection: "row",
                    justifyContent: "space-between",
                    paddingVertical: (mobileH * 0.7) / 100,
                    paddingHorizontal: (mobileW * 5) / 100,
                  }}
                >
                  <Text
                    style={{
                      color: Colors.black_color,
                      fontFamily: Font.FontBold,
                      fontSize: (mobileW * 3) / 100,
                    }}
                  >
                    Party Decoration Services
                  </Text>
                  <Text
                    style={{
                      color: Colors.black_color,
                      fontFamily: Font.FontBold,
                      fontSize: (mobileW * 3) / 100,
                    }}
                  >
                    $400
                  </Text>
                </View>
                {/* -----decoration view end ------------ */}
                <View
                  style={{
                    width: (mobileW * 90) / 100,
                    alignSelf: "center",
                    paddingVertical: (mobileH * 1) / 100,
                  }}
                >
                  <Text
                    style={{
                      color: Colors.black_color,
                      fontFamily: Font.FontBold,
                      fontSize: (mobileW * 4) / 100,
                    }}
                  >
                    Service (Caterers)
                  </Text>
                </View>
                <View
                  style={{
                    width: (mobileW * 90) / 100,
                    flexDirection: "row",
                    justifyContent: "space-between",
                    paddingVertical: (mobileH * 0.7) / 100,
                    paddingHorizontal: (mobileW * 5) / 100,
                  }}
                >
                  <Text
                    style={{
                      color: Colors.black_color,
                      fontFamily: Font.FontBold,
                      fontSize: (mobileW * 3) / 100,
                    }}
                  >
                    Italian Cuisine ($20*50)
                  </Text>
                  <Text
                    style={{
                      color: Colors.black_color,
                      fontFamily: Font.FontBold,
                      fontSize: (mobileW * 3) / 100,
                    }}
                  >
                    $1000
                  </Text>
                </View>
                <View
                  style={{
                    width: (mobileW * 90) / 100,
                    alignSelf: "center",
                    paddingVertical: (mobileH * 1) / 100,
                  }}
                >
                  <Text
                    style={{
                      color: Colors.black_color,
                      fontFamily: Font.FontBold,
                      fontSize: (mobileW * 4) / 100,
                    }}
                  >
                    Service (DJ & Sound)
                  </Text>
                </View>
                {/* ------------dj view---------- */}
                <View
                  style={{
                    width: (mobileW * 90) / 100,
                    flexDirection: "row",
                    justifyContent: "space-between",
                    paddingVertical: (mobileH * 0.7) / 100,
                    paddingHorizontal: (mobileW * 5) / 100,
                  }}
                >
                  <Text
                    style={{
                      color: Colors.black_color,
                      fontFamily: Font.FontBold,
                      fontSize: (mobileW * 3) / 100,
                    }}
                  >
                    DJ & Sound(1 Hour)
                  </Text>
                  <Text
                    style={{
                      color: Colors.black_color,
                      fontFamily: Font.FontBold,
                      fontSize: (mobileW * 3) / 100,
                    }}
                  >
                    $50
                  </Text>
                </View>
                <View
                  style={{
                    marginTop: (mobileH * 1) / 100,
                    borderBottomWidth: 1,
                    borderColor: Colors.greyColor,
                    width: (mobileW * 90) / 100,
                    alignSelf: "center",
                  }}
                ></View>

                {/* -------------grand total------------ */}
                <View
                  style={{
                    width: (mobileW * 90) / 100,
                    flexDirection: "row",
                    justifyContent: "space-between",
                    paddingVertical: (mobileH * 0.7) / 100,
                    paddingHorizontal: (mobileW * 5) / 100,
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
                    $1650
                  </Text>
                </View>
                <View
                  style={{
                    marginTop: (mobileH * 1) / 100,
                    borderBottomWidth: 1,
                    borderColor: Colors.greyColor,
                    width: (mobileW * 90) / 100,
                    alignSelf: "center",
                  }}
                ></View>
              </View>

              {/* //=========Continue Submit============// */}
              <TouchableOpacity
                onPress={() =>
                  this.props.navigation.navigate("ProposedEventVendorList")
                }
              

                activeOpacity={0.7}
                style={{
                  alignItems: "center",
                  alignSelf: "center",
                  marginBottom: (mobileH * 1) / 100,
                  marginTop: (mobileH * 3) / 100,
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
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.whiteColor,
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
    marginTop: (mobileH * 0.3) / 100,
  },
  Deactive_View: {
    width: "100%",
    alignSelf: "center",
    alignItems: "center",
    backgroundColor: Colors.border_color,
    marginLeft: (mobileW * 1) / 100,
    borderRadius: (mobileW * 1) / 100,
    paddingVertical: (mobileH * 1.1) / 100,
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
