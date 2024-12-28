import React, { Component } from "react";
import {
  Text,
  SafeAreaView,
  StatusBar,
  Modal,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
  FlatList,
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
  notification,
  firebaseprovider,
} from "./Provider/utilslib/Utils";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import LinearGradient from "react-native-linear-gradient";
import { Nodata_foundimage } from "./Provider/Nodata_foundimage";
import { ProgressBar } from "react-native-paper";
import Image1 from "react-native-image-progress";

export default class SelectDesigns extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chat_popup: false,
      item: this.props.route.params.item,

      allSelectDesigns: "NA",
    };
  }

  componentDidMount() {
    this.props.navigation.addListener("focus", () => {
      let {
        name,
        title,
        selected_date_for_api,
        selected_date,
        location,
        Discription,
        longitude,
        latitude,
      } = this.state;
      consolepro.consolelog({
        name,
        title,
        selected_date_for_api,
        selected_date,
        location,
        Discription,
        longitude,
        latitude,
      });
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
                {Lang_chg.selectDesign[config.language]}
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
          {/* ------------------flatlist----------------------- */}
          <View>
            {this.state.item.template_arr != "NA" ? (
              <FlatList
                data={this.state.item.template_arr}
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
                        paddingVertical: (mobileW * 2) / 100,
                        marginBottom: (mobileH * 0.3) / 100,
                        alignSelf: "center",
                      }}
                    >
                      <TouchableOpacity
                        onPress={() => {
                          this.props.navigation.navigate("CustomizeTemplate", {
                            template_image: item.template_image,
                            template_id: item.template_id,
                          });
                        }}
                        style={{ width: (mobileW * 44) / 100 }}
                        activeOpacity={0.7}
                      >
                        <Image1
                          indicator={ProgressBar.Circle}
                          style={{
                            resizeMode: "contain",
                            width: (mobileW * 43) / 100,
                            height: (mobileW * 60) / 100,
                          }}
                          source={{
                            uri: config.img_url + item.template_image,
                          }}
                        ></Image1>
                      </TouchableOpacity>
                    </View>
                  );
                }}
              />
            ) : (
              <Nodata_foundimage />
            )}
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
  linearGradient1: {
    marginTop: (mobileH * 1) / 100,
    height: (mobileH * 9) / 100,
    width: (mobileW * 100) / 100,
  },
});
