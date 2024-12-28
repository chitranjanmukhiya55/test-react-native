import React, { Component } from "react";
import {
  Text,
  BackHandler,
  SafeAreaView,
  StatusBar,
  Alert,
  View,
  StyleSheet,
  FlatList,
  Keyboard,
  TouchableOpacity,
  Image,
  TextInput,
  ImageBackground,
} from "react-native";
import {
  config,
  msgProvider,
  localStorage,
  apifuntion,
  msgText,
  msgTitle,
  consolepro,
  Lang_chg,
  Font,
  Colors,
  mobileH,
  mobileW,
  localimag,
  firebaseprovider,
} from "./Provider/utilslib/Utils";
import Fontisto from "react-native-vector-icons/Fontisto";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import LinearGradient from "react-native-linear-gradient";

export default class Einvites extends Component {
  constructor(props) {
    super(props);
    this.state = {
      near_all_arr: [
        // 1, 2, 3, 4, 5, 6
        {
          id: 0,
          image: localimag.wedding,
          name: "Wedding",
        },
        {
          id: 1,
          image: localimag.christmas,
          name: "Christmas",
        },
        {
          id: 2,
          image: localimag.birthday,
          name: "Birthday",
        },
        {
          id: 3,
          image: localimag.party,
          name: "Party",
        },
        {
          id: 4,
          image: localimag.baby_shower,
          name: "Baby Shower",
        },
        {
          id: 5,
          image: localimag.house_party,
          name: "Housewarming",
        },
        {
          id: 6,
          image: localimag.pool_party,
          name: "Summer & Pool\nParty",
        },
        {
          id: 7,
          image: localimag.engagement,
          name: "Anniversary",
        },
        {
          id: 8,
          image: localimag.wedding,
          name: "Graduation\nParty",
        },
        {
          id: 9,
          image: localimag.party,
          name: "Memorial \nAnnouncement",
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
            colors={[Colors.purple_color, Colors.bluegreen_color]}
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
                {Lang_chg.invites_txt[config.language]}
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
          {/*===========Search----------------------  */}

          <View
            style={{
              marginTop: (mobileH * 2) / 100,
              flexDirection: "row",
              width: (mobileW * 92) / 100,
              borderRadius: (mobileW * 1.5) / 100,
              backgroundColor: Colors.whiteColor,
              paddingVertical: (mobileH * 0.1) / 100,
              shadowColor: Colors.shadow_color,
              shadowOffset: { width: 2, height: 2 },
              shadowOpacity: 0.2,
              elevation: 1,
              alignSelf: "center",
              backgroundColor: Colors.border_color,
              paddingHorizontal: (mobileW * 3) / 100,
            }}
          >
            <Image
              style={{
                height: (mobileW * 6) / 100,
                width: (mobileW * 6) / 100,
                resizeMode: "contain",
                alignSelf: "center",
                justifyContent: "center",
                marginLeft: (mobileW * 0.5) / 100,
              }}
              source={localimag.grey_search}
            ></Image>
            <TextInput
              style={{
                width: "95%",
                justifyContent: "center",
                alignSelf: "center",
                fontFamily: Font.FontSemiBold,
                paddingVertical: (mobileW * 3) / 100,
                color: Colors.black_color,
                fontSize: (mobileW * 4.2) / 100,
                marginLeft: (mobileW * 1.5) / 100,
              }}
              onChangeText={(txt) => {
                this.setState({ enterreceipt: txt });
              }}
              maxLength={53}
              returnKeyLabel="done"
              returnKeyType="done"
              onSubmitEditing={() => {
                Keyboard.dismiss();
              }}
              placeholderTextColor={Colors.greyColor}
              placeholder={"Search "}
            />
          </View>
          {/* ==========================search end=============================== */}

          {/* ------------------flatlist----------------------- */}
          <View>
            <FlatList
              data={this.state.near_all_arr}
              contentContainerStyle={{
                width: (mobileW * 95) / 100,
                alignSelf: "center",
                marginTop: (mobileH * 2) / 100,
                marginLeft: (mobileW * 3) / 100,
              }}
              numColumns={2}
              renderItem={({ item, index }) => {
                console.log("237", item);
                return (
                  <View
                    style={{
                      width: (mobileW * 46) / 100,
                      marginRight: (mobileW * 1) / 100,
                      marginBottom: (mobileH * 0.3) / 100,
                      alignSelf: "center",
                      //  backgroundColor:'red'
                    }}
                  >
                    <View style={{ width: (mobileW * 50) / 100 }}>
                      <ImageBackground
                        resizeMode="contain"
                        style={{
                          width: (mobileW * 45) / 100,
                          height: (mobileW * 32) / 100,
                        }}
                        source={item.image}
                      >
                        <Text
                          style={{
                            fontSize: (mobileW * 3.4) / 100,
                            fontFamily: Font.FontBold,
                            color: Colors.whiteColor,
                            paddingTop: (mobileH * 2.5) / 100,
                            paddingHorizontal: (mobileW * 2) / 100,
                          }}
                        >
                          {item.name}
                        </Text>
                      </ImageBackground>
                    </View>
                  </View>
                );
              }}
            />
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
});
