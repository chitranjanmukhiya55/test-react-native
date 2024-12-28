import React, {Component} from 'react';
import {
  Text,
  BackHandler,
  SafeAreaView,
  StatusBar,
  KeyboardAvoidingView,
  Alert,
  View,
  StyleSheet,
  Keyboard,
  Dimensions,
  ImageBackground,
  TouchableOpacity,
  Image,
  Modal,
  FlatList,
  ScrollView,
  RadioButton,
  Button,
  TextInput,
} from 'react-native';
import {
  config,
  Lang_chg,
  Font,
  Colors,
  mobileH,
  mobileW,
  localimag,
  consolepro,
  msgTitle,
  msgProvider,
  msgText,
  apifuntion,
  localStorage,
} from './Provider/utilslib/Utils';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import LinearGradient from 'react-native-linear-gradient';
import Footer from './Provider/Footer';
import HideWithKeyboard from 'react-native-hide-with-keyboard';
import StarRating from 'react-native-star-rating';
import {Nodata_foundimage} from './Provider/Nodata_foundimage';
import Image1 from 'react-native-image-progress';
import {ProgressBar} from 'react-native-paper';
import ImageZoom from 'react-native-image-pan-zoom';

export default class VendorDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Tab: 0,
      business_id: this.props.route.params.business_id,
      vendorAllDetails: '',
      service_details: 'NA',
      about_details: 'NA',
      image_arr: 'NA',
      seeDetails: false,
      testDetails: '',
      Reviews_arr: 'NA',
      enLargeImageModal: false,
      image: '',
    };
  }
  componentDidMount() {
    consolepro.consolelog('page252532323232323232');
    const {navigation} = this.props;
    this.focusListener = navigation.addListener('focus', () => {
      this.setState({business_id: this.props.route.params.business_id});
      this.getVenderProfile();
    });
    this.getVenderProfile();
  }
  //-------------- function for get content arr--------------//
  getVenderProfile = async () => {
    let url =
      config.baseURL +
      'get_profile_vendor.php?user_id=' +
      this.state.business_id;
    consolepro.consolelog('url', url);
    apifuntion
      .getApi(url, 1)
      .then(obj => {
        consolepro.consolelog(obj);
        if (obj.success == 'true') {
          this.setState({
            vendorAllDetails: obj.profile_arr,
            service_details: obj.service_details,
            about_details: obj.about_details,
            image_arr: obj.image_arr,
            Reviews_arr: obj.revie_arr,
          });
          consolepro.consolelog('obj.profile_arr', obj.profile_arr);
        } else {
          msgProvider.alert(
            msgTitle.information[config.language],
            obj.msg[config.language],
            false,
          );
          return false;
        }
      })
      .catch(error => {
        consolepro.consolelog('-------- error ------- ' + error);
        msgProvider.alert(
          msgTitle.internet[config.language],
          msgText.networkconnection[config.language],
          false,
        );
      });
  };

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

        <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.enLargeImageModal}
          onRequestClose={() => {
            this.setState({enLargeImageModal: false});
          }}>
          <SafeAreaView
            style={{
              backgroundColor: Colors.whiteColor,
            }}
          />
          <StatusBar
            hidden={false}
            translucent={false}
            backgroundColor={Colors.whiteColor}
            barStyle="dark-content"
            networkActivityIndicatorVisible={true}
          />
          <View style={{flex: 1, backgroundColor: Colors.black_color}}>
            <View
              style={{
                alignItems: 'flex-end',
                alignSelf: 'flex-end',
                right: (mobileW * 3) / 100,
                marginTop: (mobileW * 2) / 100,
              }}>
              <TouchableOpacity
                onPress={() => this.setState({enLargeImageModal: false})}
                activeOpacity={0.7}
                style={{width: (mobileW * 15) / 100}}>
                <Image
                  style={{
                    alignSelf: 'flex-end',
                    width: (mobileW * 4.5) / 100,
                    height: (mobileW * 4.5) / 100,
                    paddingHorizontal: (mobileW * 4) / 100,
                    resizeMode: 'contain',
                    // tintColor: Colors.greyColor
                  }}
                  source={localimag.cross_64}></Image>
              </TouchableOpacity>
            </View>
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                flex: 1,
              }}>
              <ImageZoom
                style={{flex: 1}}
                cropWidth={mobileW}
                cropHeight={mobileH}
                imageWidth={mobileW}
                imageHeight={mobileH}>
                <Image1
                  renderError={() => {
                    consolepro.consolelog('I am here in banner image error');
                    this.setState({image: null});
                  }}
                  indicator={ProgressBar.Circle}
                  resizeMode="contain"
                  style={{width: mobileW, height: mobileH, borderRadius: 5}}
                  source={{uri: this.state.image}}
                />
              </ImageZoom>
            </View>
          </View>
        </Modal>
        <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.seeDetails}
          onRequestClose={() => {
            this.setState({seeDetails: false});
          }}>
          <SafeAreaView
            style={{
              flex: 1,
              backgroundColor: Colors.whiteColor,
            }}>
            <StatusBar
              hidden={false}
              translucent={false}
              backgroundColor={Colors.whiteColor}
              barStyle="dark-content"
              networkActivityIndicatorVisible={true}
            />

            <View style={{alignItems: 'center', alignSelf: 'center'}}>
              <LinearGradient
                colors={[Colors.light_greencolor, Colors.purple_color]}
                start={{x: 0, y: 1}}
                end={{x: 1, y: 1}}
                style={{
                  height: (mobileH * 9) / 100,
                  width: (mobileW * 100) / 100,
                  alignSelf: 'center',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <TouchableOpacity
                  onPress={() => this.setState({seeDetails: false})}
                  activeOpacity={0.7}
                  style={{width: (mobileW * 15) / 100}}>
                  <Image
                    style={{
                      alignSelf: 'center',
                      width: (mobileW * 4.5) / 100,
                      height: (mobileW * 4.5) / 100,
                      paddingHorizontal: (mobileW * 4) / 100,
                      resizeMode: 'contain',
                    }}
                    source={localimag.back}></Image>
                </TouchableOpacity>
                <View
                  style={{width: (mobileW * 70) / 100, alignItems: 'center'}}>
                  <Text
                    style={{
                      color: Colors.whiteColor,
                      fontFamily: Font.FontSemiBold,
                      fontSize: (mobileW * 5) / 100,
                    }}>
                    {Lang_chg.Service_Details_txt[config.language]}
                  </Text>
                </View>
                <View
                  style={{
                    width: (mobileW * 15) / 100,
                    alignItems: 'center',
                  }}></View>
              </LinearGradient>
            </View>
            <KeyboardAwareScrollView>
              <View
                style={{
                  width: '95%',
                  alignSelf: 'center',
                  alignItems: 'flex-start',
                  marginTop: (mobileH * 2) / 100,
                }}>
                <Text
                  style={{
                    fontSize: (mobileW * 4) / 100,
                    fontFamily: Font.InterMedium,
                    color: Colors.black_color,
                  }}>
                  {this.state.testDetails}
                </Text>
              </View>
            </KeyboardAwareScrollView>
          </SafeAreaView>
        </Modal>
        <View style={{alignItems: 'center', alignSelf: 'center'}}>
          <LinearGradient
            colors={[Colors.purple_color, Colors.light_greencolor]}
            start={{x: 1, y: 1}}
            end={{x: 0, y: 0}}
            style={{
              height: (mobileH * 9) / 100,
              width: (mobileW * 100) / 100,
              alignSelf: 'center',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <TouchableOpacity
              onPress={() => this.props.navigation.goBack()}
              activeOpacity={0.7}
              style={{width: (mobileW * 15) / 100}}>
              <Image
                style={{
                  alignSelf: 'center',
                  width: (mobileW * 4.5) / 100,
                  height: (mobileW * 4.5) / 100,
                  paddingHorizontal: (mobileW * 4) / 100,
                  resizeMode: 'contain',
                }}
                source={localimag.back}></Image>
            </TouchableOpacity>
            <View style={{width: (mobileW * 70) / 100, alignItems: 'center'}}>
              <Text
                style={{
                  color: Colors.whiteColor,
                  fontFamily: Font.FontSemiBold,
                  fontSize: (mobileW * 5) / 100,
                }}>
                {Lang_chg.VendorDetails[config.language]}
              </Text>
            </View>
            <View
              style={{
                width: (mobileW * 15) / 100,
                alignItems: 'center',
              }}></View>
          </LinearGradient>
        </View>
        {/* ------------------header end ---------------- */}
        <KeyboardAwareScrollView
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{width: mobileW, alignItems: 'center'}}
          keyboardShouldPersistTaps="handled">
          <View
            style={{
              width: (mobileW * 90) / 100,
              alignSelf: 'center',
              marginTop: (mobileH * 4) / 100,
            }}>
            <Image
              style={{
                alignSelf: 'center',
                width: (mobileW * 95) / 100,
                height: (mobileW * 50) / 100,
                paddingHorizontal: (mobileW * 4) / 100,
                resizeMode: 'cover',
                borderRadius: (mobileW * 2) / 100,
              }}
              source={
                this.state.vendorAllDetails.user_image != null
                  ? {
                      uri:
                        config.img_url + this.state.vendorAllDetails.user_image,
                    }
                  : localimag.userplaceholder
              }></Image>
          </View>
          {/* ----------------------for tab view--------------------------- */}
          <View style={styles.Maintab}>
            <TouchableOpacity
              activeOpacity={1}
              onPress={() => {
                this.setState({Tab: 0});
              }}
              style={{
                width: '25%',
                alignSelf: 'center',
                paddingHorizontal: (mobileW * 0.5) / 100,
              }}>
              {this.state.Tab == 0 ? (
                <View style={styles.Active_View}>
                  <LinearGradient
                    colors={[Colors.light_greencolor, Colors.purple_color]}
                    start={{x: 1, y: 1}}
                    end={{x: 0, y: 1}}
                    style={{
                      width: '100%',
                      alignSelf: 'center',
                      alignItems: 'center',
                      borderBottomColor: Colors.whiteColor,
                      borderBottomWidth: 4,
                      paddingVertical: (mobileW * 2) / 100,
                      borderRadius: (mobileW * 1) / 100,
                    }}>
                    <Text
                      style={{
                        fontSize: (mobileW * 3.7) / 100,
                        fontFamily: Font.FontBold,
                        color: Colors.whiteColor,
                      }}>
                      {Lang_chg.About_Us_txt[config.language]}
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
                    }}>
                    {Lang_chg.About_Us_txt[config.language]}
                  </Text>
                </View>
              )}
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.08}
              onPress={() => {
                this.setState({Tab: 1});
              }}
              style={{
                width: '25%',
                alignSelf: 'center',
                paddingHorizontal: (mobileW * 0.5) / 100,
              }}>
              {this.state.Tab == 1 ? (
                <View style={styles.Active_View}>
                  <LinearGradient
                    colors={[Colors.light_greencolor, Colors.purple_color]}
                    start={{x: 1, y: 1}}
                    end={{x: 0, y: 1}}
                    style={{
                      width: '100%',
                      alignSelf: 'center',
                      alignItems: 'center',
                      borderBottomColor: Colors.whiteColor,
                      borderBottomWidth: 4,
                      paddingVertical: (mobileW * 2) / 100,
                      borderRadius: (mobileW * 1) / 100,
                    }}>
                    <Text
                      style={{
                        fontSize: (mobileW * 3.7) / 100,
                        fontFamily: Font.FontBold,
                        color: Colors.whiteColor,
                      }}>
                      {Lang_chg.Services_txt[config.language]}
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
                    }}>
                    {Lang_chg.Services_txt[config.language]}
                  </Text>
                </View>
              )}
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.08}
              onPress={() => {
                this.setState({Tab: 2});
              }}
              style={{
                width: '25%',
                alignSelf: 'center',
                paddingHorizontal: (mobileW * 0.5) / 100,
              }}>
              {this.state.Tab == 2 ? (
                <View style={styles.Active_View}>
                  <LinearGradient
                    colors={[Colors.light_greencolor, Colors.purple_color]}
                    start={{x: 1, y: 1}}
                    end={{x: 0, y: 1}}
                    style={{
                      width: '100%',
                      alignSelf: 'center',
                      alignItems: 'center',
                      borderRadius: (mobileW * 1) / 100,
                      borderBottomColor: Colors.whiteColor,
                      borderBottomWidth: 4,
                      paddingVertical: (mobileW * 2) / 100,
                    }}>
                    <Text
                      style={{
                        fontSize: (mobileW * 3.7) / 100,
                        fontFamily: Font.FontBold,
                        color: Colors.whiteColor,
                      }}>
                      {Lang_chg.Photos_txt[config.language]}
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
                    }}>
                    {Lang_chg.Photos_txt[config.language]}
                  </Text>
                </View>
              )}
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.08}
              onPress={() => {
                this.setState({Tab: 3});
              }}
              style={{
                width: '25%',
                alignSelf: 'center',
                paddingHorizontal: (mobileW * 0.5) / 100,
              }}>
              {this.state.Tab == 3 ? (
                <View style={styles.Active_View}>
                  <LinearGradient
                    colors={[Colors.light_greencolor, Colors.purple_color]}
                    start={{x: 1, y: 1}}
                    end={{x: 0, y: 1}}
                    style={{
                      width: '100%',
                      alignSelf: 'center',
                      alignItems: 'center',
                      borderBottomColor: Colors.whiteColor,
                      borderBottomWidth: 4,
                      paddingVertical: (mobileW * 2) / 100,
                      borderRadius: (mobileW * 1) / 100,
                    }}>
                    <Text
                      style={{
                        fontSize: (mobileW * 3.7) / 100,
                        fontFamily: Font.FontBold,
                        color: Colors.whiteColor,
                      }}>
                      {Lang_chg.Reviews_txt[config.language]}
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
                    }}>
                    {Lang_chg.Reviews_txt[config.language]}
                  </Text>
                </View>
              )}
            </TouchableOpacity>
          </View>
          {/*-------------------tab ended------------------------ */}
          {this.state.Tab == 0 && (
            <View
              style={{
                width: (mobileW * 90) / 100,
                alignSelf: 'center',
                marginTop: (mobileH * 1) / 100,
              }}>
              <Text
                style={{
                  fontSize: (mobileW * 3.8) / 100,
                  fontFamily: Font.FontSemiBold,
                  color: Colors.black_color,
                  paddingVertical: (mobileH * 0.5) / 100,
                }}>
                {Lang_chg.About_txt[config.language]}
              </Text>
              <Text
                style={{
                  fontSize: (mobileW * 3.2) / 100,
                  fontFamily: Font.FontRegular,
                  color: Colors.black_color,
                  textAlign: 'justify',
                }}>
                {this.state.about_details.about_me}
              </Text>
              {/* -----for location view-------- */}
              <Text
                style={{
                  fontSize: (mobileW * 3.8) / 100,
                  fontFamily: Font.FontSemiBold,
                  color: Colors.black_color,
                  paddingVertical: (mobileH * 0.3) / 100,
                  paddingTop:
                    config.device_type == 'ios'
                      ? (mobileH * 1.3) / 100
                      : (mobileH * 0.5) / 100,
                }}>
                {Lang_chg.Location_txt[config.language]}
              </Text>
              <Text
                style={{
                  fontSize: (mobileW * 3.2) / 100,
                  fontFamily: Font.FontRegular,
                  color: Colors.black_color,
                }}>
                {this.state.about_details.location}
              </Text>

              {/* ---second view----------- */}

              <View
                style={{
                  width: (mobileW * 80) / 100,
                  flexDirection: 'row',
                  marginTop: (mobileH * 2) / 100,
                }}>
                {/* ---first view----------- */}

                <View style={{width: (mobileW * 20) / 100}}>
                  <Text
                    style={{
                      fontSize: (mobileW * 3.8) / 100,
                      fontFamily: Font.FontSemiBold,
                      color: Colors.black_color,
                    }}>
                    {Lang_chg.Team_txt[config.language]}
                  </Text>
                  <Text
                    style={{
                      fontSize: (mobileW * 3.2) / 100,
                      fontFamily: Font.FontRegular,
                      color: Colors.black_color,
                      paddingVertical: (mobileH * 0.5) / 100,
                    }}>
                    {this.state.about_details.team_size +
                      ' ' +
                      Lang_chg.Members_txt[config.language]}
                  </Text>
                </View>
              </View>

              {/* ---Experience view----------- */}

              <View
                style={{
                  width: (mobileW * 80) / 100,
                  flexDirection: 'row',
                  marginTop: (mobileH * 2) / 100,
                }}>
                <View style={{width: (mobileW * 60) / 100}}>
                  <Text
                    style={{
                      fontSize: (mobileW * 3.8) / 100,
                      fontFamily: Font.FontSemiBold,
                      color: Colors.black_color,
                    }}>
                    {Lang_chg.Expertice_txt[config.language]}
                  </Text>
                  <Text
                    style={{
                      fontSize: (mobileW * 3.2) / 100,
                      fontFamily: Font.FontRegular,
                      color: Colors.black_color,
                      paddingVertical: (mobileH * 0.5) / 100,
                    }}>
                    {this.state.about_details.expertise}
                  </Text>
                </View>
              </View>
              <View
                style={{
                  width: (mobileW * 80) / 100,
                  flexDirection: 'row',
                  marginTop: (mobileH * 2) / 100,
                }}>
                <View style={{width: (mobileW * 60) / 100}}>
                  <Text
                    style={{
                      fontSize: (mobileW * 3.8) / 100,
                      fontFamily: Font.FontSemiBold,
                      color: Colors.black_color,
                    }}>
                    {Lang_chg.Category_txt[config.language]}
                  </Text>
                  <Text
                    style={{
                      fontSize: (mobileW * 3.2) / 100,
                      fontFamily: Font.FontRegular,
                      color: Colors.black_color,
                      paddingVertical: (mobileH * 0.5) / 100,
                    }}>
                    {this.state.about_details.category_name}
                  </Text>
                </View>
              </View>
              <View
                style={{
                  width: (mobileW * 80) / 100,
                  flexDirection: 'row',
                  marginTop: (mobileH * 2) / 100,
                }}>
                <View style={{width: (mobileW * 60) / 100}}>
                  <Text
                    style={{
                      fontSize: (mobileW * 3.8) / 100,
                      fontFamily: Font.FontSemiBold,
                      color: Colors.black_color,
                    }}>
                    {Lang_chg.seat_arrange[config.language]}
                  </Text>
                  <Text
                    style={{
                      fontSize: (mobileW * 3.2) / 100,
                      fontFamily: Font.FontRegular,
                      color: Colors.black_color,
                      paddingVertical: (mobileH * 0.5) / 100,
                    }}>
                    {this.state.about_details.category_name}
                  </Text>
                </View>
              </View>
              <View
                style={{
                  width: (mobileW * 80) / 100,
                  flexDirection: 'row',
                  marginTop: (mobileH * 2) / 100,
                }}>
                <View style={{width: (mobileW * 60) / 100}}>
                  <Text
                    style={{
                      fontSize: (mobileW * 3.8) / 100,
                      fontFamily: Font.FontSemiBold,
                      color: Colors.black_color,
                    }}>
                    {Lang_chg.seat_layout[config.language]}
                  </Text>
                  <Text
                    style={{
                      fontSize: (mobileW * 3.2) / 100,
                      fontFamily: Font.FontRegular,
                      color: Colors.black_color,
                      paddingVertical: (mobileH * 0.5) / 100,
                    }}>
                    {this.state.about_details.category_name}
                  </Text>
                </View>
              </View>
            </View>
          )}
          {/* ---for second tab------------------- */}
          {this.state.Tab == 1 && (
            <>
              {this.state.service_details != 'NA' ? (
                <View>
                  <FlatList
                    data={this.state.service_details}
                    renderItem={({item, index}) => {
                      return (
                        <>
                          <View
                            style={{
                              width: (mobileW * 100) / 100,
                              alignSelf: 'center',
                              marginTop: (mobileH * 2) / 100,
                            }}>
                            <View
                              style={{
                                width: (mobileW * 85) / 100,
                                alignSelf: 'center',
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                marginTop: (mobileH * 2) / 100,
                              }}>
                              <View style={{}}>
                                <Text
                                  style={{
                                    color: Colors.black_color,
                                    fontFamily: Font.FontSemiBold,
                                    fontSize: (mobileW * 3) / 100,
                                  }}>
                                  {item.service_name}
                                </Text>
                                <Text
                                  style={{
                                    color: Colors.black_color,
                                    fontFamily: Font.FontSemiBold,
                                    fontSize: (mobileW * 3) / 100,
                                  }}>
                                  {item.seating_arrangement_name}
                                </Text>
                                <Text
                                  style={{
                                    color: Colors.black_color,
                                    fontFamily: Font.FontSemiBold,
                                    fontSize: (mobileW * 3) / 100,
                                  }}>
                                  {item.seating_layout_name}
                                </Text>
                                <TouchableOpacity
                                  activeOpacity={0.7}
                                  onPress={() => {
                                    this.setState({
                                      seeDetails: true,
                                      testDetails: item.description,
                                    });
                                  }}
                                  style={{
                                    alignSelf: 'flex-start',
                                    flexDirection: 'row',
                                    paddingVertical: (mobileH * 1) / 1400,
                                  }}>
                                  <Image
                                    style={{
                                      alignSelf: 'center',
                                      width: (mobileW * 3.3) / 100,
                                      height: (mobileW * 3.3) / 100,
                                      resizeMode: 'contain',
                                      tintColor: Colors.light_greencolor,
                                      marginTop: (mobileH * 0.3) / 100,
                                      // backgroundColor: 'red'
                                    }}
                                    source={localimag.about_us}></Image>
                                  <Text
                                    style={{
                                      color: Colors.light_greencolor,
                                      fontFamily: Font.FontRegular,
                                      fontSize: (mobileW * 2.8) / 100,
                                      marginLeft: (mobileW * 1) / 100,
                                      textDecorationLine: 'underline',
                                    }}>
                                    {Lang_chg.See_Details_txt[config.language]}
                                  </Text>
                                </TouchableOpacity>
                              </View>
                              <Text
                                style={{
                                  color: Colors.black_color,
                                  fontFamily: Font.FontSemiBold,
                                  fontSize: (mobileW * 3) / 100,
                                }}>
                                {'$' + item.price}
                              </Text>
                            </View>
                          </View>
                          {/* --for border view------------------- */}
                          <View
                            style={{
                              width: (mobileW * 85) / 100,
                              borderColor: Colors.border_color,
                              borderWidth: (mobileW * 0.2) / 100,
                              marginTop: (mobileH * 1) / 100,
                              alignSelf: 'center',
                              backgroundColor: Colors.border_color,
                            }}></View>
                          {/* -------------------for button continue condition------------ */}
                        </>
                      );
                    }}
                  />
                </View>
              ) : (
                <Nodata_foundimage />
              )}
            </>
          )}

          {/* ---for third tab------------------- */}
          {this.state.Tab == 2 && (
            <View>
              <View
                style={{
                  width: (mobileW * 85) / 100,
                  alignSelf: 'center',
                  marginTop: (mobileH * 2) / 100,
                  flexDirection: 'row',
                }}>
                <View style={{width: '100%'}}>
                  <View
                    style={{
                      flexDirection: 'row',
                      marginTop: (mobileH * 3) / 100,
                    }}>
                    {this.state.image_arr != 'NA' && (
                      <FlatList
                        data={this.state.image_arr}
                        showsHorizontalScrollIndicator={false}
                        numColumns={3}
                        renderItem={({item, index}) => {
                          consolepro.consolelog('item--', item);
                          return (
                            <TouchableOpacity
                              activeOpacity={0.7}
                              onPress={() => {
                                this.setState({
                                  image: item.image,
                                  enLargeImageModal: true,
                                });
                              }}
                              style={{
                                alignSelf: 'center',
                                flexDirection: 'row',
                                marginTop: (mobileH * 1) / 100,
                              }}>
                              <View
                                style={{
                                  borderRadius: (mobileW * 2) / 100,
                                  alignSelf: 'center',
                                  width: (mobileW * 25) / 100,
                                  height: (mobileW * 25) / 100,
                                  marginLeft: (mobileW * 3) / 100,
                                  flexDirection: 'row',
                                }}>
                                <Image
                                  borderRadius={(mobileW * 2) / 100}
                                  style={{
                                    alignSelf: 'center',
                                    width: (mobileW * 25) / 100,
                                    height: (mobileW * 25) / 100,
                                  }}
                                  source={{uri: item.image}}></Image>
                              </View>
                            </TouchableOpacity>
                          );
                        }}
                      />
                    )}
                  </View>
                </View>
              </View>
            </View>
          )}

          {/* ---for third tab------------------- */}
          {this.state.Tab == 3 && (
            <View>
              {this.state.Reviews_arr != 'NA' ? (
                <FlatList
                  contentContainerStyle={{
                    width: (mobileW * 100) / 100,
                    alignSelf: 'center',
                  }}
                  data={this.state.Reviews_arr}
                  renderItem={({item, index}) => {
                    return (
                      <View
                        style={{
                          width: (mobileW * 90) / 100,
                          marginTop: (mobileH * 2) / 100,
                          alignSelf: 'center',
                        }}>
                        <View
                          style={{
                            width: (mobileW * 90) / 100,
                            flexDirection: 'row',
                            alignSelf: 'center',
                          }}>
                          {/* -----------------for image view---------------- */}
                          <View
                            style={{
                              width: (mobileW * 13) / 100,
                              alignSelf: 'center',
                            }}>
                            <Image
                              resizeMode="cover"
                              borderRadius={(mobileW * 25) / 100}
                              style={{
                                width: (mobileW * 10) / 100,
                                height: (mobileW * 10) / 100,
                              }}
                              source={
                                item.user_image != 'NA'
                                  ? {uri: config.img_url + item.user_image}
                                  : localimag.userplaceholder
                              }></Image>
                          </View>
                          {/* -----------------for second text view============== */}
                          <View
                            style={{
                              width: (mobileW * 48) / 100,
                              alignSelf: 'center',
                              paddingVertical: (mobileH * 1) / 100,
                            }}>
                            <Text
                              style={{
                                fontSize: (mobileW * 3.5) / 100,
                                fontFamily: Font.FontSemiBold,
                                color: Colors.black_color,
                              }}>
                              {item.user_name}
                            </Text>
                            <Text
                              style={{
                                fontSize: (mobileW * 3) / 100,
                                fontFamily: Font.FontSemiBold,
                                color: Colors.black_color,
                              }}>
                              {item.createtime}
                            </Text>
                          </View>
                          {/* =========================for star image view-------------------- */}

                          <View
                            style={{
                              width: (mobileW * 22) / 100,
                              flexDirection: 'row',
                              marginTop: (mobileH * 1.3) / 100,
                            }}>
                            <StarRating
                              containerStyle={{}}
                              // contentContainerStyle={{ marginLeft: mobileW * 10 / 100 }}
                              fullStar={localimag.star_Active}
                              emptyStar={localimag.star_Deactive}
                              // halfStar={localimag.star_Active}
                              halfStarColor={'#FFC815'}
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
                              }}>
                              {'(' + item.rating + ')'}
                            </Text>
                          </View>
                        </View>
                        {/* -----------------for last text view============== */}
                        <View
                          style={{
                            width: (mobileW * 88) / 100,
                            alignSelf: 'center',
                          }}>
                          <Text
                            style={{
                              fontSize: (mobileW * 3.2) / 100,
                              fontFamily: Font.FontSemiBold,
                              color: Colors.black_color,
                              paddingVertical: (mobileH * 0.5) / 100,
                              textAlign: 'justify',
                            }}>
                            {item.review}
                          </Text>
                        </View>
                        <View
                          style={{
                            width: mobileW,
                            borderColor: Colors.border_color,
                            borderWidth: (mobileW * 0.5) / 100,
                            alignSelf: 'center',
                            backgroundColor: Colors.border_color,
                            marginTop:
                              config.device_type == 'ios'
                                ? (mobileH * 1) / 100
                                : (mobileH * 0.5) / 100,
                          }}></View>
                      </View>
                    );
                  }}
                />
              ) : (
                <Nodata_foundimage />
              )}
            </View>
          )}

          {/* ------------view top to up------------------- */}
          <View
            style={{
              width: (mobileW * 90) / 100,
              alignSelf: 'center',
              borderRadius: (mobileW * 2) / 100,
              backgroundColor: Colors.whiteColor,
              height:
                config.device_type == 'ios'
                  ? (mobileH * 10.5) / 100
                  : (mobileH * 11) / 100,
              position: 'absolute',
              top:
                config.device_type == 'ios'
                  ? (mobileH * 22) / 100
                  : (mobileH * 24) / 100,
              elevation: 3,
              // backgroundColor: Colors.whiteColor,
              // shadowColor: "#000000",
              // shadowOffset: { width: 0, height: 13},
              // shadowOpacity: 0.17, shadowRadius: 3.05, elevation: 3
            }}>
            {/* ---Andrew view----------- */}

            <View
              style={{
                width: (mobileW * 85) / 100,
                flexDirection: 'row',
                marginTop: (mobileH * 1) / 100,
                alignSelf: 'center',
                justifyContent: 'space-between',
              }}>
              <View style={{width: (mobileW * 55) / 100}}>
                <Text
                  style={{
                    fontSize: (mobileW * 3.9) / 100,
                    fontFamily: Font.FontSemiBold,
                    color: Colors.black_color,
                  }}>
                  {this.state.vendorAllDetails.user_name}
                </Text>
              </View>
              {/* ---star view----------- */}
              <View
                style={{
                  width: (mobileW * 25) / 100,
                  flexDirection: 'row',
                  marginTop: (mobileH * 0.6) / 100,
                  alignItems: 'center',
                }}>
                <StarRating
                  containerStyle={{}}
                  // contentContainerStyle={{ marginLeft: mobileW * 10 / 100 }}
                  fullStar={localimag.star_Active}
                  emptyStar={localimag.star_Deactive}
                  // halfStar={localimag.star_Active}
                  halfStarColor={'#FFC815'}
                  disabled={true}
                  maxStars={5}
                  starSize={(mobileW * 3) / 100}
                  rating={this.state.vendorAllDetails.avg_rating}
                />
                <Text
                  style={{
                    color: Colors.black_color,
                    fontFamily: Font.FontRegular,
                    fontSize: (mobileW * 2.6) / 100,
                    marginLeft: (mobileW * 0.5) / 100,
                    width: (mobileW * 47) / 100,
                  }}>
                  {'(' + this.state.vendorAllDetails.avg_rating + ')'}
                </Text>
              </View>
            </View>
            {/* ---for second text----------- */}
            <View
              style={{
                width: (mobileW * 85) / 100,
                flexDirection: 'row',
                alignSelf: 'center',
              }}>
              <Text
                style={{
                  fontSize: (mobileW * 3.3) / 100,
                  fontFamily: Font.FontRegular,
                  color: Colors.black_color,
                }}>
                {this.state.vendorAllDetails.business_name}
              </Text>
            </View>
            {/* ---star view----------- */}
            <View
              style={{
                width: (mobileW * 85) / 100,
                flexDirection: 'row',
                marginTop: (mobileH * 1) / 100,
                alignSelf: 'center',
              }}>
              <Image
                style={{
                  width: (mobileW * 3.3) / 100,
                  height: (mobileW * 3.3) / 100,
                }}
                source={localimag.location_black}></Image>
              <Text
                style={{
                  width: (mobileW * 70) / 100,
                  color: Colors.black_color,
                  fontFamily: Font.FontRegular,
                  fontSize: (mobileW * 2.9) / 100,
                  marginLeft: (mobileW * 1) / 100,
                }}>
                {this.state.vendorAllDetails.business_address}
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
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.whiteColor,
  },
  Active_View: {
    width: '100%',
    alignSelf: 'center',
    alignItems: 'center',
    marginTop: (mobileH * 0.7) / 100,
    borderBottomColor: Colors.whiteColor,
    borderBottomWidth: 4,
  },
  Deactive_View: {
    width: '100%',
    alignSelf: 'center',
    alignItems: 'center',
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
    width: '90%',
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderRadius: (mobileW * 1) / 100,
    backgroundColor: Colors.whiteColor,
    shadowColor: '#000000',
    marginTop: (mobileH * 8) / 100,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.17,
    shadowRadius: 3.05,
    elevation: 4,
  },
  linearGradient1: {
    marginTop: (mobileH * 1) / 100,
    height: (mobileH * 9) / 100,
    width: (mobileW * 100) / 100,

  },
});
