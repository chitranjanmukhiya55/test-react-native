import React, { Component } from "react";
import {
  Text,
  SafeAreaView,
  StatusBar,
  View,
  StyleSheet,
  Keyboard,
  TouchableOpacity,
  Image,
  FlatList,
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
import HideWithKeyboard from "react-native-hide-with-keyboard";
import LinearGradient from "react-native-linear-gradient";
import Footer from "./Provider/Footer";

class VendorInbox1 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: "",
      search_txt: "",
      notification_arr: [
        {
          index: 1,
          name: "Andrew John",
          date: "20-Nov-22, 11:44 AM",
          details: "Booking ID: 66574738382 ",
          del: "Decorators",
          message: "Yes sir ! I have also some unique",
          img: localimag.Birthday_girl_img,
          pagename: "VendorChatDemo",
        },
        {
          index: 2,
          name: "James William",
          date: "20-Nov-22, 11:33 AM",
          details: "Booking ID: 66574738382 ",
          del: "Caterers",
          message: "Can you give me 2 starters dish and replace.....",
          img: localimag.saile_ilyas_SiwrpBnxDww_unsplash,
          pagename: "VendorChatDemo",
        },
        {
          index: 3,
          name: "Daniel Michael",
          date: "20-Nov-22, 11:20 AM",
          details: "Booking ID: 66574738382 ",
          del: "Dj & Sound",
          message: "Can you please add this songs because...",
          img: localimag.sharob_simmons_yYh5hf9atNw_unsplashre_app,
          pagename: "VendorChatDemo",
        },
      ],
    };
  }
  componentDidMount() {}

  SearchFilterFunction = (text) => {
    this.setState({ search_txt: text });
    console.log("in sided if");
    if (text == "") {
      console.log("in sided if");
    }
  };
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar
          barStyle="dark-content"
          backgroundColor={Colors.whiteColor}
          hidden={false}
          translucent={false}
          networkActivityIndicatorVisible={true}
        />
        {/* //=========Header=======// */}
        <View
          style={{
            width: mobileW,
            backgroundColor: Colors.whiteColor,
            alignItems: "center",
            shadowOffset: { width: 0 },
            shadowColor: "#000",
            shadowOpacity: 0.1,
            elevation: 1,
          }}
        >
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
            <View
              style={{
                height: (mobileW * 18) / 100,
                alignItems: "center",
                width: mobileW,
              }}
            >
              <View
                style={{
                  alignItems: "center",
                  alignSelf: "center",
                  marginTop: (mobileH * 2.5) / 100,
                }}
              >
                <Text
                  style={{
                    fontSize: (mobileW * 5.3) / 100,
                    fontFamily: Font.FontSemiBold,
                    color: Colors.whiteColor,
                    textAlign: "center",
                  }}
                >
                  {/* {Lang_chg.inbox_txt[config.language]} */}
                  {Lang_chg.Chat_txt[config.language]}
                </Text>
              </View>
            </View>
          </LinearGradient>
        </View>

        <KeyboardAwareScrollView
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            width: mobileW,
            alignItems: "center",
            justifyContent: "center",
          }}
          keyboardShouldPersistTaps="handled"
        >
          {/* //=========Search=======// */}
          <View
            style={{
              flexDirection: "row",
              width: "95%",
              alignSelf: "center",
              borderColor: Colors.border_color,
              borderWidth: 2,
              marginTop: (mobileW * 5) / 100,
              height:
                config.device_type == "ios"
                  ? (mobileH * 6) / 100
                  : (mobileH * 6) / 100,
              alignItems: "center",
              borderRadius: (mobileW * 1.5) / 100,
              backgroundColor: Colors.border_color,
            }}
          >
            <View style={{ width: "9%" }}>
              <Image
                style={{
                  width: (mobileW * 5) / 100,
                  height: (mobileW * 5) / 100,
                  marginLeft: (mobileW * 2) / 100,
                }}
                resizeMode="contain"
                source={localimag.grey_search}
              ></Image>
            </View>

            <TextInput
              style={{
                width: "90%",
                backgroundColor: Colors.border_color,
                justifyContent: "center",
                color: Colors.black_color,
                alignSelf: "center",
                fontSize: (mobileW * 4) / 100,
                borderRadius: (mobileW * 2) / 100,
                fontFamily: Font.FontRegular,

                paddingVertical: (mobileW * 2) / 100,
              }}
              onChangeText={(txt) => {
                this.SearchFilterFunction(txt);
              }}
              value={this.state.search_txt}
              maxLength={50}
              returnKeyLabel="done"
              returnKeyType="done"
              onSubmitEditing={() => {
                Keyboard.dismiss();
              }}
              placeholderTextColor={Colors.greyColor}
              placeholder={"Search "}
              ref={(input) => {
                this.searchfield = input;
              }}
            />
          </View>

          {/* //===========FlateList=========// */}
          <FlatList
            data={this.state.notification_arr}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item, index }) => (
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate(item.pagename)}
                activeOpacity={0.7}
                style={{
                  width: mobileW,
                  paddingHorizontal: (mobileW * 2) / 100,
                  marginTop: (mobileW * 5) / 100,
                }}
              >
                <View
                  style={{ alignItems: "flex-start", flexDirection: "row" }}
                >
                  <View style={{ paddingRight: (mobileW * 3) / 100 }}>
                    <Image
                      style={{
                        width: (mobileW * 12.5) / 100,
                        height: (mobileW * 12.5) / 100,
                        borderRadius: (mobileW * 15) / 100,
                      }}
                      source={item.img}
                    ></Image>
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      width: (mobileW * 79) / 100,
                      justifyContent: "space-between",
                    }}
                  >
                    <View style={{ alignItems: "flex-start" }}>
                      <Text
                        style={{
                          fontFamily: Font.FontBold,
                          color: Colors.black_color,
                          fontSize: (mobileW * 3.5) / 100,
                        }}
                      >
                        {item.name}
                      </Text>
                    </View>
                    <View style={{ alignItems: "flex-end" }}>
                      <Text
                        style={{
                          fontFamily: Font.FontBold,
                          color: Colors.black_color,
                          fontSize: (mobileW * 2.7) / 100,
                        }}
                      >
                        {item.date}
                      </Text>
                    </View>
                  </View>
                </View>

                <View
                  style={{
                    alignItems: "flex-start",
                    flexDirection: "row",
                    paddingLeft: (mobileW * 15) / 100,
                    bottom: (mobileW * 7) / 100,
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      width: (mobileW * 80) / 100,
                      justifyContent: "space-between",
                    }}
                  >
                    <View style={{ alignItems: "flex-start" }}>
                      <Text
                        style={{
                          fontFamily: Font.FontBold,
                          color: Colors.light_greencolor,
                          fontSize: (mobileW * 2.7) / 100,
                        }}
                      >
                        {item.details}{" "}
                        <View
                          style={{
                            width: (mobileW * 1.5) / 100,
                            height: (mobileW * 1.5) / 100,
                            backgroundColor: Colors.black_color,
                            borderRadius: (mobileW * 7) / 100,
                            alignSelf: "center",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        ></View>{" "}
                        {item.del}
                      </Text>
                      <Text
                        style={{
                          fontFamily: Font.FontBold,
                          color: Colors.black_color,
                          fontSize: (mobileW * 3) / 100,
                        }}
                      >
                        {item.message}
                      </Text>
                    </View>
                    <View
                      style={{
                        alignItems: "center",
                        marginTop: (mobileH * 1.5) / 100,
                        marginRight: (mobileW * 1.3) / 100,
                      }}
                    >
                      {item.index < 3 && (
                        <View
                          style={{
                            backgroundColor: Colors.redColor,
                            borderRadius: (mobileW * 10) / 100,
                            paddingHorizontal: (mobileW * 1.5) / 100,
                            paddingVertical: (mobileW * 0.1) / 100,
                            alignItems: "center",
                            alignSelf: "center",
                          }}
                        >
                          <Text
                            style={{
                              color: Colors.whiteColor,
                              fontFamily: Font.FontBold,
                              fontSize: (mobileW * 3.2) / 100,
                              textAlign: "center",
                            }}
                          >
                            1
                          </Text>
                        </View>
                      )}
                    </View>
                  </View>
                </View>
                <View
                  style={{
                    width: (mobileW * 100) / 100,
                    borderBottomWidth: 0.8,
                    borderBottomColor: Colors.greyColor,
                    alignSelf: "center",
                  }}
                />
              </TouchableOpacity>
            )}
          />
        </KeyboardAwareScrollView>
        <HideWithKeyboard>
          <LinearGradient
            colors={[Colors.voilet_color, Colors.light_greencolor]}
            start={{ x: 1, y: 1 }}
            end={{ x: 0, y: 0 }}
            style={styles.linearGradient1}
          >
            <Footer
              activepage="VendorInbox1"
              usertype={1}
              footerpage={[
                {
                  name: "VendorHome",
                  title: "Home",
                  countshow: false,
                  image: localimag.home_deactive,
                  activeimage: localimag.home,
                },
                {
                  name: "VendorMyEventsOngoing",
                  title: "My Events",
                  countshow: false,
                  image: localimag.manage_event,
                  activeimage: localimag.my_event_active,
                },
                {
                  name: "VendorInbox1",
                  title: "Chat",
                  countshow: false,
                  image: localimag.chat,
                  activeimage: localimag.chat_active,
                },
                {
                  name: "VendorEarning",
                  title: "Earning",
                  countshow: false,
                  image: localimag.earning,
                  activeimage: localimag.earning_active,
                },
                {
                  name: "VendorProfile",
                  title: "Profile",
                  countshow: false,
                  image: localimag.profile,
                  activeimage: localimag.profile_active,
                },
              ]}
              navigation={this.props.navigation}
              imagestyle1={{
                width: (mobileW * 6) / 100,
                height: (mobileW * 6) / 100,
                countcolor: "black",
                countbackground: "black",
              }}
              user_id={this.state.user_id}
            />
          </LinearGradient>
        </HideWithKeyboard>
      </SafeAreaView>
    );
  }
}
export default VendorInbox1;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.whiteColor,
  },
  linearGradient1: {
    marginTop: (mobileH * 1) / 100,
    height: (mobileH * 9) / 100,
    width: (mobileW * 100) / 100,
  },
});
