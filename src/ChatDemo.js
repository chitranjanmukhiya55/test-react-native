import React, { Component } from "react";
import {
  FlatList,
  Text,
  Modal,
  View,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Image,
  Keyboard,
  TextInput,
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import {
  Colors,
  Font,
  localimag,
  mobileH,
  config,
  mobileW,
  consolepro,
  Lang_chg,
} from "./Provider/utilslib/Utils";
const Comments_data = [
  {
    // 'profile_image':require('../icons/Dollar-icon.png'),
    status: 1,
    user_name: "Benjamin Smiith",
    time: "20-Nov-22, 10:56 AM",
    message:
      "Hello Sir! Good Morning.   I want to know about my invested amount",
    Likes: "2 Likes",
    Comments: "3 Comments",
  },
  {
    //   'profile_image':require('../icons/Dollar-icon.png'),

    status: 0,
    read_status: 0,
    user_name: "William Doe",
    time: "20-Nov-22, 10:56 AM",
    message: "Ok let me see your invested details then i'll let you know",
    Likes: "2 Likes",
    Comments: "3 Comments",
  },
  {
    //   'profile_image':require('../icons/Dollar-icon.png'),
    status: 1,

    user_name: "Caleb Klein",
    time: "20-Nov-22, 10:57 AM",
    message: "Hello",
    Likes: "4 Likes",
    Comments: "5 Comments",
  },
  {
    //'profile_image':require('../icons/img_30.jpg'),
    status: 0,
    read_status: 0,
    user_name: "Darke Sawn",
    time: "20-Nov-22, 10:56 AM",
    message: "Caleb Klein commented on your answer ",
    Likes: "3 Likes",
    Comments: "7 Comments",
  },
];
export default class ChatDemo extends Component {
  _didFocusSubscription;
  _willBlurSubscription;

  constructor(props) {
    super(props);
    this.state = {
      msg: "",
      chat_popup: false,
      camera_gallery: false,
    };
  }

  Sharebtn = () => {
    Keyboard.dismiss();
    consolepro.consolelog("iamhere");
    let { msg } = this.state;
    consolepro.consolelog({ msg });
  };

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
        <SafeAreaView
          style={{ backgroundColor: Colors.statusbarcolor, flex: 0 }}
        />
        <StatusBar
          barStyle="dark-content"
          backgroundColor={Colors.whiteColor}
          hidden={false}
          translucent={false}
          networkActivityIndicatorVisible={true}
        />

        <Modal
          animationType="slide"
          transparent
          visible={this.state.chat_popup}
          onRequestClose={() => {}}
        >
          <View
            style={{
              flex: 1,

              backgroundColor: "#00000090",
              alignItems: "center",
              justifyContent: "flex-end",
              borderRadius: 0,
              paddingBottom: (mobileH * 2) / 100,
            }}
          >
            <SafeAreaView style={{ flex: 0 }} />
            <View
              style={{
                backgroundColor: Colors.whiteColor,
                alignItems: "center",
                width: "88%",
                borderRadius: 15,
                paddingVertical: (mobileH * 1) / 100,
              }}
            >
              <TouchableOpacity
                activeOpacity={1}
                onPress={() => {}}
                style={{
                  paddingVertical: (mobileH * 2) / 100,
                  width: "100%",
                  alignItems: "center",
                  borderBottomColor: Colors.whiteColor,
                  borderBottomWidth: 1,
                }}
              >
                <Text
                  style={{
                    fontSize: (mobileW * 4) / 100,
                    fontFamily: Font.FontMedium,
                    color: Colors.black_color,
                  }}
                >
                  {Lang_chg.select_option_txt[config.language]}
                </Text>
              </TouchableOpacity>
              <View style={styles.lineview} />

              <TouchableOpacity
                activeOpacity={1}
                onPress={() => {
                  this.setState({ chat_popup: false }),
                    this.props.navigation.navigate("ReportChat");
                }}
                style={{
                  paddingVertical: (mobileH * 2) / 100,
                  width: "100%",
                  alignItems: "center",
                  borderBottomColor: Colors.whiteColor,
                  borderBottomWidth: 1,
                }}
              >
                <Text
                  style={{
                    fontSize: (mobileW * 4) / 100,
                    fontFamily: Font.FontMedium,
                    color: Colors.black_color,
                  }}
                >
                  {Lang_chg.report_txt[config.language]}
                </Text>
              </TouchableOpacity>
            </View>

            <View
              style={{
                backgroundColor: Colors.whiteColor,
                alignItems: "center",
                width: "88%",
                borderRadius: 15,
                marginTop: (mobileH * 2) / 100,
                marginBottom: 10,
              }}
            >
              <TouchableOpacity
                activeOpacity={1}
                style={{
                  backgroundColor: Colors.whiteColor,
                  alignItems: "center",
                  width: "100%",
                  borderRadius: 15,
                  backgroundColor: "",
                }}
                onPress={() => {
                  this.setState({ popup: false });
                }}
              >
                <TouchableOpacity
                  onPress={() => this.setState({ chat_popup: false })}
                  style={{
                    paddingVertical: (mobileH * 2.5) / 100,
                    backgroundColor: Colors.whiteColor,
                    width: "100%",
                    alignItems: "center",
                    borderRadius: 15,
                  }}
                >
                  <Text
                    style={{
                      fontSize: (mobileW * 4.3) / 100,
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
        </Modal>

        <Modal
          animationType="slide"
          transparent
          visible={this.state.camera_gallery}
          onRequestClose={() => {}}
        >
          <View
            style={{
              flex: 1,
              backgroundColor: "#00000090",
              alignItems: "center",
              justifyContent: "flex-end",
              borderRadius: 0,
              paddingBottom: (mobileH * 2) / 100,
            }}
          >
            <SafeAreaView style={{ flex: 0 }} />
            <View
              style={{
                backgroundColor: Colors.whiteColor,
                alignItems: "center",
                width: "95%",
                borderRadius: (mobileW * 7) / 100,
              }}
            >
              <TouchableOpacity
                activeOpacity={1}
                onPress={() => {}}
                style={{
                  paddingVertical: (mobileH * 1.5) / 100,
                  width: "100%",
                  alignItems: "center",
                  borderBottomColor: Colors.GreyBorder,
                  borderBottomWidth: 1,
                }}
              >
                <Text
                  style={{
                    fontSize: (mobileW * 4) / 100,
                    fontFamily: Font.FontSemiBold,
                    color: Colors.black_color,
                  }}
                >
                  {Lang_chg.select_option_txt[config.language]}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                activeOpacity={1}
                onPress={() => {}}
                style={{
                  paddingVertical: (mobileH * 1.5) / 100,
                  width: "100%",
                  alignItems: "center",
                  borderBottomColor: Colors.greyColor,
                  borderBottomWidth: 1,
                }}
              >
                <Text
                  style={{
                    fontSize: (mobileW * 4) / 100,
                    fontFamily: Font.FontSemiBold,
                    color: Colors.greyColor,
                  }}
                >
                  {Lang_chg.MediaCamera[config.language]}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={1}
                onPress={() => {}}
                style={{
                  paddingVertical: (mobileH * 1.5) / 100,
                  width: "100%",
                  alignItems: "center",
                }}
              >
                <Text
                  style={{
                    fontSize: (mobileW * 4) / 100,
                    fontFamily: Font.FontSemiBold,
                    color: Colors.greyColor,
                  }}
                >
                  {Lang_chg.MediaCamera[config.language]}
                </Text>
              </TouchableOpacity>
            </View>
            <View
              style={{
                backgroundColor: Colors.whiteColor,
                alignItems: "center",
                width: "95%",
                borderRadius: 15,
                marginTop: (mobileH * 2) / 100,
                marginBottom: 10,
              }}
            >
              <TouchableOpacity
                activeOpacity={1}
                style={{
                  backgroundColor: Colors.whiteColor,
                  alignItems: "center",
                  width: "100%",
                  borderRadius: (mobileW * 6) / 100,
                  backgroundColor: "",
                }}
                onPress={() => {
                  this.setState({ popup: false });
                }}
              >
                <TouchableOpacity
                  onPress={() => this.setState({ camera_gallery: false })}
                  style={{
                    paddingVertical: (mobileH * 1.8) / 100,
                    width: "100%",
                    alignItems: "center",
                  }}
                >
                  <Text
                    style={{
                      fontSize: (mobileW * 4.5) / 100,
                      fontFamily: Font.FontSemiBold,
                      color: Colors.redColor,
                    }}
                  >
                    {Lang_chg.cancel_txt[config.language]}
                  </Text>
                </TouchableOpacity>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
        {/* =======================header========== */}
        <View style={styles.header_view}>
          <LinearGradient
            colors={[Colors.purple_color, Colors.light_greencolor]}
            start={{ x: 1, y: 0 }}
            end={{ x: 0, y: 0 }}
            style={{
              height: (mobileH * 17) / 100,
              width: (mobileW * 100) / 100,
              alignSelf: "center",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <View style={styles.backIcon}>
              <TouchableOpacity
                style={{}}
                onPress={() => this.props.navigation.navigate("Inbox1")}
              >
                <Image
                  style={{ width: 20, height: 20 }}
                  resizeMode="contain"
                  source={localimag.back}
                ></Image>
              </TouchableOpacity>
            </View>

            <Image
              style={{
                width: (mobileW * 12) / 100,
                height: (mobileW * 12) / 100,
                borderRadius: (mobileW * 15) / 100,
                borderWidth: (mobileW * 0.5) / 100,
              }}
              source={localimag.sharob_simmons_yYh5hf9atNw_unsplashre_app}
            ></Image>

            <View>
              <View style={styles.headerText}>
                <Text
                  style={{
                    width: (mobileW * 60) / 100,
                    fontSize: (mobileW * 4.5) / 100,
                    color: Colors.whiteColor,
                    fontFamily: Font.FontBold,
                    paddingLeft: (mobileW * 2) / 100,
                  }}
                >
                  Parties Galore
                </Text>
                <Text
                  style={{
                    width: (mobileW * 60) / 100,
                    fontSize: (mobileW * 3) / 100,
                    color: Colors.whiteColor,
                    fontFamily: Font.FontBold,
                    paddingLeft: (mobileW * 2) / 100,
                  }}
                >
                  Booking ID: 6574738382
                  <View
                    style={{
                      alignSelf: "center",
                      justifyContent: "center",
                      alignItems: "center",
                      padding:
                        config.device_type == "ios"
                          ? (mobileW * 0) / 100
                          : (mobileH * 0.2) / 100,
                      paddingHorizontal:
                        config.device_type == "ios"
                          ? (mobileW * 0) / 100
                          : (mobileW * 1.5) / 100,
                    }}
                  >
                    <Image
                      style={{
                        width: (mobileW * 1.3) / 100,
                        height: (mobileW * 1.3) / 100,
                        marginLeft:
                          config.device_type == "ios"
                            ? (mobileW * 3.5) / 100
                            : (mobileW * 0) / 100,
                      }}
                      source={localimag.white}
                    ></Image>
                  </View>
                  Decorators
                </Text>
              </View>
            </View>
            <View style={styles.dotIcon}>
              <TouchableOpacity
                onPress={() => {
                  this.setState({ chat_popup: true });
                }}
              >
                <Image
                  style={{ width: 20, height: 20 }}
                  resizeMode="contain"
                  source={localimag.dots}
                ></Image>
              </TouchableOpacity>
            </View>
          </LinearGradient>
        </View>
        <ScrollView
          keyboardDismissMode="interactive"
          keyboardShouldPersistTaps="always"
          showsVerticalScrollIndicator={false}
        >
          <TouchableOpacity
            style={{
              flex: 1,
              paddingBottom: (mobileW * 30) / 100,
              marginTop: (mobileW * 0.2) / 100,
              backgroundColor: Colors.whiteColor,
            }}
            activeOpacity={1}
          >
            <View
              style={{
                paddingTop: (mobileW * 5) / 100,
                paddingHorizontal: (mobileW * 2) / 100,
              }}
            >
              <FlatList
                data={Comments_data}
                keyExtractor={(item, index) => index.toString()}
                contentContainerStyle={{ paddingBottom: (mobileW * 20) / 100 }}
                showsHorizontalScrollIndicator={false}
                renderItem={({ item, index }) => (
                  <View
                    style={
                      item.status == 1
                        ? styles.rightcardView
                        : styles.leftcardView
                    }
                  >
                    <View
                      style={[
                        item.status == 1 ? styles.rightcard : styles.leftcard,
                        { flexDirection: "row" },
                      ]}
                    >
                      <Text
                        style={{
                          width: "100%",
                          fontSize: (mobileW * 3.3) / 100,
                          textAlignVertical: "top",
                          fontFamily: Font.FontSemiBold,
                          color:
                            item.status == 1
                              ? Colors.black_color
                              : Colors.black_color,
                        }}
                      >
                        {item.message}
                      </Text>
                      {item.read_status == 1 && (
                        <View
                          style={{
                            width: "10%",
                            justifyContent: "flex-end",
                            alignItems: "flex-end",
                            alignSelf: "flex-end",
                          }}
                        >
                          <Image
                            style={{
                              width: (mobileW * 5) / 100,
                              height: (mobileW * 5) / 100,
                            }}
                            resizeMode="contain"
                            source={localimag.shareapp}
                            //  pin
                          />
                        </View>
                      )}
                
                    </View>
      
                    <Text
                      style={{
                        fontSize: (mobileW * 3.3) / 100,
                        paddingTop: (mobileW * 1) / 100,
                        textAlign: "right",
                        fontFamily: Font.FontSemiBold,
                        color: Colors.greyColor,
                      }}
                    >
                      {item.time}
                    </Text>
                  </View>
                )}
              />
            </View>
          </TouchableOpacity>
        </ScrollView>

        {/* //-------------messagebox-----------// */}

        <View
          style={{
            height: (mobileW * 15) / 100,
            flexDirection: "row",
            justifyContent: "space-around",
            bottom: 0,
            position: "absolute",
            alignSelf: "center",
            width: (mobileW * 100) / 100,
          }}
        >
          <LinearGradient
            colors={[Colors.purple_color, Colors.light_greencolor]}
            start={{ x: 1, y: 0 }}
            end={{ x: 0, y: 0 }}
            style={{
              height: (mobileH * 10) / 100,
              width: (mobileW * 100) / 100,
              alignSelf: "center",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >

            <View
              style={{
                width: "80%",
                height: (mobileW * 10) / 100,
                //  borderRadius:mobileW*0.1/100,
                alignSelf: "center",
                alignItems: "center",
                //  borderWidth:1,borderColor:Colors.grey,
                paddingHorizontal: (mobileW * 2) / 100,
                justifyContent: "center",
              }}
            >
              <TextInput
                returnKeyLabel="done"
                returnKeyType="done"
                keyboardType="default"
                onSubmitEditing={() => {
                  Keyboard.dismiss();
                }}
                value={"" + this.state.msg + ""}
                onChangeText={(txt) => {
                  this.setState({ msg: txt });
                }}
                maxLength={200}              placeholder={"Write Message "}
                placeholderTextColor={Colors.whiteColor}
                multiline={true}
                style={{
                  paddingVertical: (mobileW * 1.5) / 100,
                  width: "95%",
                  fontFamily: Font.FontRegular,
                  fontSize: (mobileH * 2.3) / 100,
                  color: Colors.whiteColor,
                }}
              ></TextInput>
            </View>

            <View
              style={{
                alignSelf: "center",
                height: (mobileW * 7.3) / 100,
                width: (mobileW * 0.7) / 100,
                backgroundColor: Colors.whiteColor,
              }}
            ></View>

            <TouchableOpacity
              onPress={() => {
                this.Sharebtn();
                console.log("hello");
              }}
              style={{
                width: "10%",
                justifyContent: "center",
                alignContent: "flex-start",
                alignItems: "center",
              }}
            >
              <Image
                source={localimag.share}
                resizeMode="contain"
                style={{
                  height: (mobileW * 5) / 100,
                  width: (mobileW * 5) / 100,
                  justifyContent: "center",
                }}
              />
            </TouchableOpacity>
          </LinearGradient>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  ViewText: {
    flexDirection: "row",
    width: "95%",
    borderBottomWidth: 1.5,
    alignSelf: "center",
    borderBottomColor: Colors.greyColor,
    marginTop: (mobileW * 5) / 100,
    paddingLeft: (mobileW * 4) / 100,
    alignItems: "center",
    padding: (mobileW * 0.2) / 100,
    backgroundColor: Colors.whiteColor,
  },
  linearGradient: {
    marginTop: (mobileH * 1) / 100,
    height: (mobileH * 7) / 100,
    width: (mobileW * 90) / 100,
    borderRadius: (mobileW * 1.5) / 100, // <-- Outer Border Radius
  },
  card: {
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 1, height: 1 },
    shadowColor: "#000",
    backgroundColor: Colors.whiteColor,
    alignSelf: "center",
    marginBottom: 5,
    width: (mobileW * 94) / 100,
    marginHorizontal: (mobileW * 2) / 100,
    backgroundColor: Colors.whiteColor,
    paddingVertical: (mobileW * 2) / 100,
    paddingHorizontal: (mobileW * 1) / 100,
    marginTop: (mobileH * 1) / 100,
    borderRadius: (mobileW * 1) / 100,
  },
  rightcardView: {
    alignSelf: "flex-end",
    marginBottom: 5,
    width: (mobileW * 65) / 100,
    paddingVertical: (mobileW * 1) / 100,
    paddingHorizontal: (mobileW * 2) / 100,
  },
  leftcardView: {
    alignSelf: "flex-start",
    marginBottom: 5,
    width: (mobileW * 65) / 100,
    paddingVertical: (mobileW * 1) / 100,
    paddingHorizontal: (mobileW * 2) / 100,
  },
  rightcard: {

    backgroundColor: "#C9C2E0",
    // backgroundColor:Colors.theamcolor,
    paddingHorizontal: (mobileW * 3) / 100,
    width: "100%",
    justifyContent: "flex-start",
    paddingVertical: (mobileW * 4) / 100,
    marginTop: (mobileH * 1) / 100,

  },
  leftcard: {
    //  backgroundColor:'#8B64DB',
    backgroundColor: "#E0F0D5",

    paddingHorizontal: (mobileW * 3) / 100,
    width: "100%",
    justifyContent: "flex-start",
    paddingVertical: (mobileW * 4) / 100,
    marginTop: (mobileH * 1) / 100,

  },

  textInputView: {
    width: "70%",
    backgroundColor: Colors.whiteColor,
    justifyContent: "center",
    paddingLeft: (mobileW * 2) / 100,
    alignSelf: "center",
    fontSize: (mobileW * 4.3) / 100,

    fontFamily: Font.FontMedium,
    color: Colors.border_color,
    paddingVertical: (mobileW * 2) / 100,
    //   backgroundColor:'red'
  },

  header_view: {
    width: (mobileW * 100) / 100,
    flexDirection: "row",
    // paddingHorizontal: 6,
    alignItems: "center",
    height: (mobileH * 12) / 100,

    alignSelf: "center",
  },
  backIcon: {
    width: "10%",
    alignItems: "center",
  },
  dotIcon: {
    width: "15%",
    alignItems: "flex-end",
    marginRight: (mobileW * 5) / 100,
  },

  headerText: {
    width: "95%",

    //   alignItems:'center'
  },

  headerText2: {
    width: "15%",
    alignItems: "center",
  },

  logo: {
    width: (mobileW * 100) / 100,

    height: (mobileH * 100) / 100,
  },
  ImageView: {
    width: "8%",
  },
  buttonView1: {
    width: "65%",
    borderRadius: (mobileW * 6) / 100,
    paddingVertical: (mobileW * 3.5) / 100,
    padding: (mobileW * 0.5) / 100,
    backgroundColor: Colors.border_color,
    alignSelf: "center",
    justifyContent: "center",
    marginTop: (mobileW * 10) / 100,
    shadowColor: Colors.border_color,
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 3,
  },

  lineview: {
    width: (mobileW * 88) / 100,
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
  linearGradient1: {
    marginTop: (mobileH * 1) / 100,
    height: (mobileH * 9) / 100,
    width: (mobileW * 100) / 100,
    borderTopLeftRadius: (mobileW * 4.5) / 100, // <-- Outer Border Radius
    borderTopRightRadius: (mobileW * 4.5) / 100, // <-- Outer Border Radius
  },
  linearGradient: {
    // marginTop:mobileH*1/100,
    height: (mobileH * 23) / 100,
    width: (mobileW * 100) / 100,

  },
});
