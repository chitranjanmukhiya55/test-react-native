import React, { Component } from "react";
import {
  Text,
  SafeAreaView,
  StatusBar,
  Alert,
  View,
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
} from "./Provider/utilslib/Utils";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import LinearGradient from "react-native-linear-gradient";

export default class Cuisines extends Component {
  constructor(props) {
    super(props);
    this.state = {
      report: "",
      image_change_gender: 0,
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
                {Lang_chg.Cuisines_txt[config.language]}
              </Text>
            </View>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate("Birthday")}
              activeOpacity={0.7}
              style={{ width: (mobileW * 15) / 100, alignItems: "center" }}
            >
              <Text
                style={{
                  color: Colors.whiteColor,
                  fontFamily: Font.FontSemiBold,
                  fontSize: (mobileW * 4) / 100,
                }}
              >
                {Lang_chg.Done_txt[config.language]}
              </Text>
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
          {/* ----for first view--------- */}
          <View
            style={{
              width: (mobileW * 90) / 100,
              alignSelf: "center",
              flexDirection: "row",
              marginTop: (mobileH * 3) / 100,
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
              {Lang_chg.Italian_txt[config.language]}
            </Text>
            <TouchableOpacity
              onPress={() => this.setState({ image_change_gender: 1 })}
              style={{ flexDirection: "row", alignItems: "center" }}
            >
              {this.state.image_change_gender == 1 ? (
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
            </TouchableOpacity>
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
              {Lang_chg.Welcome_drinks_txt[config.language]}
            </Text>
          </View>
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
          {/* ----for second view--------- */}
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
              {Lang_chg.British_txt[config.language]}
            </Text>
            <TouchableOpacity
              onPress={() => this.setState({ image_change_gender: 2 })}
              style={{ flexDirection: "row", alignItems: "center" }}
            >
              {this.state.image_change_gender == 2 ? (
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
            </TouchableOpacity>
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
              {Lang_chg.Welcome_drinks_txt[config.language]}
            </Text>
          </View>
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
          {/* ----for third view--------- */}
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
              {Lang_chg.American_txt[config.language]}
            </Text>
            <TouchableOpacity
              onPress={() => this.setState({ image_change_gender: 3 })}
              style={{ flexDirection: "row", alignItems: "center" }}
            >
              {this.state.image_change_gender == 3 ? (
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
            </TouchableOpacity>
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
              {Lang_chg.Welcome_drinks_txt[config.language]}
            </Text>
          </View>
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
          {/* ----for four view--------- */}
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
              {Lang_chg.Chinese_txt[config.language]}
            </Text>
            <TouchableOpacity
              onPress={() => this.setState({ image_change_gender: 4 })}
              style={{ flexDirection: "row", alignItems: "center" }}
            >
              {this.state.image_change_gender == 4 ? (
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
            </TouchableOpacity>
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
              {Lang_chg.Welcome_drinks_txt[config.language]}
            </Text>
          </View>
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
          {/* ----for five view--------- */}
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
              {Lang_chg.Indian_txt[config.language]}
            </Text>
            <TouchableOpacity
              onPress={() => this.setState({ image_change_gender: 5 })}
              style={{ flexDirection: "row", alignItems: "center" }}
            >
              {this.state.image_change_gender == 5 ? (
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
            </TouchableOpacity>
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
              {Lang_chg.Welcome_drinks_txt[config.language]}
            </Text>
          </View>
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

          {/* ----for six view--------- */}
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
              {Lang_chg.Russion_txt[config.language]}
            </Text>
            <TouchableOpacity
              onPress={() => this.setState({ image_change_gender: 6 })}
              style={{ flexDirection: "row", alignItems: "center" }}
            >
              {this.state.image_change_gender == 6 ? (
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
            </TouchableOpacity>
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
              {Lang_chg.Welcome_drinks_txt[config.language]}
            </Text>
          </View>
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

          {/* ----for sevan view--------- */}
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
              {Lang_chg.French_txt[config.language]}
            </Text>
            <TouchableOpacity
              onPress={() => this.setState({ image_change_gender: 7 })}
              style={{ flexDirection: "row", alignItems: "center" }}
            >
              {this.state.image_change_gender == 7 ? (
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
            </TouchableOpacity>
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
              {Lang_chg.Welcome_drinks_txt[config.language]}
            </Text>
          </View>
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
          {/* ----for four view--------- */}
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
              {Lang_chg.Chinese_txt[config.language]}
            </Text>
            <TouchableOpacity
              onPress={() => this.setState({ image_change_gender: 8 })}
              style={{ flexDirection: "row", alignItems: "center" }}
            >
              {this.state.image_change_gender == 8 ? (
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
            </TouchableOpacity>
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
              {Lang_chg.Welcome_drinks_txt[config.language]}
            </Text>
          </View>
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
