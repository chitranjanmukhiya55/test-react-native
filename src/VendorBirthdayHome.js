import React, {Component} from 'react';
import {
  Text,
  SafeAreaView,
  StatusBar,
  Alert,
  View,
  StyleSheet,
  Keyboard,
  TouchableOpacity,
  Image,
  TextInput,
  ImageBackground,
  BackHandler,
  FlatList,
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
  apifuntion,
  localStorage,
  msgTitle,
  msgProvider,
} from './Provider/utilslib/Utils';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import LinearGradient from 'react-native-linear-gradient';
import DashedLine from 'react-native-dashed-line';
import StarRating from 'react-native-star-rating';
import {RefreshControl} from 'react-native';

export default class VendorBirthdayHome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      work: 0,
      event_arr: '',
      item: this.props.route.params.item,
      service_arr: 'NA',
      totalBudget: 0,
      acceptRejectStatus: false,
      buttonStatus: 0,
      rating_arr: 'NA',
      refresh: false,
    };
  }

  componentDidMount() {
    this.props.navigation.addListener('focus', () => {
      this.setState({item: this.props.route.params.item});
      this.getEventDetails(1);
    });
    this.getEventDetails(0);
  }
  //---------back handler funtion-------------//

  async getEventDetails(Display) {
    let user_arr = await localStorage.getItemObject('user_arr');
    consolepro.consolelog('user_arr>', user_arr);
    let user_id = user_arr.user_id;
    let url =
      config.baseURL +
      'get_vendor_event_detail.php?user_id=' +
      user_id +
      '&event_id=' +
      this.state.item;
    consolepro.consolelog('url', url);
    apifuntion
      .getApi(url, Display)
      .then(obj => {
        consolepro.consolelog('obj', obj);
        this.setState({refresh: false});
        if (obj.success == 'true') {
          this.setState({event_arr: obj.event_arr});
          this.setState({
            refresh: false,
          });
          if (obj.event_arr.service_arr != 'NA') {
            this.setState({
              service_arr: obj.event_arr.service_arr,
              rating_arr: obj.event_arr.rating_arr,
            });
            let data = obj.event_arr.service_arr;
            let totalBudget = 0;
            for (let i = 0; i < data.length; i++) {
              totalBudget += parseFloat(data[i].service_price);
            }
            consolepro.consolelog(
              'obj.event_arr.event_status',
              obj.event_arr.event_status,
            );
            this.setState({totalBudget: totalBudget.toFixed(2)});
            if (data[0].status == 'Pending') {
              this.setState({buttonStatus: 1});
            } else if (
              obj.event_arr.event_status == 'Pending' &&
              obj.event_arr.payment_status == 1
            ) {
              this.setState({buttonStatus: 2});
            } else if (
              obj.event_arr.event_status == 'Ongoing' &&
              data[0].work_status == 'Pending'
            ) {
              // this.setState({buttonStatus: 2});
            } else if (
              obj.event_arr.event_status == 'Ongoing' &&
              data[0].work_status == 'Work Start'
            ) {
              consolepro.consolelog('je=jofjsoid');
              this.setState({buttonStatus: 3});
            } else {
              this.setState({buttonStatus: 10});
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
                false,
              );
            }, 200);
          }
          return false;
        }
      })
      .catch(error => {
        consolepro.consolelog('-------- error ------- ' + error);
      });
  }

  async actionButton(item, status) {
    let user_arr = await localStorage.getItemObject('user_arr');
    consolepro.consolelog('user_arr>', user_arr);
    let user_id = user_arr.user_id;
    let url = config.baseURL + 'vendor_request_accept_reject.php';
    consolepro.consolelog('url', url);
    let data = new FormData();
    data.append('user_id', user_id);
    data.append('event_id', item);
    data.append('status', status);
    consolepro.consolelog('datadata', data);

    apifuntion
      .postApi(url, data)
      .then(obj => {
        consolepro.consolelog('obj', obj);
        if (obj.success == 'true') {
          if (status == 2) {
            this.props.navigation.goBack();
          }
          if (status == 1) {
            this.getEventDetails(1);
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
                false,
              );
            }, 200);
          }
          return false;
        }
      })
      .catch(error => {
        consolepro.consolelog('-------- error ------- ' + error);
      });
  }

  async startEndButton(status) {
    let user_arr = await localStorage.getItemObject('user_arr');
    consolepro.consolelog('user_arr>', user_arr);
    let user_id = user_arr.user_id;
    let url = config.baseURL + 'vendor_start_end_work.php';
    consolepro.consolelog('url', url);
    let data = new FormData();
    data.append('user_id', user_id);
    data.append('event_id', this.state.event_arr.event_id);
    data.append('work_status', status);
    consolepro.consolelog('datadata', data);

    apifuntion
      .postApi(url, data)
      .then(obj => {
        consolepro.consolelog('obj133', obj);
        if (obj.success == 'true') {
          this.getEventDetails(1);
          setTimeout(() => {
            msgProvider.toast(obj.msg[config.language], 'center');
          }, 300);
          this.getEventDetails(1);
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
                false,
              );
            }, 200);
          }
          return false;
        }
      })
      .catch(error => {
        consolepro.consolelog('-------- error ------- ' + error);
      });
  }

  _onRefresh = async () => {
    if (config.app_status == 1) {
      consolepro.consolelog('_onRefresh', '_onRefresh');
      this.setState({refresh: true});
      this.getEventDetails(1);
    }
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
        {/* ---------------for header--------------- */}
        <View style={{alignItems: 'center', alignSelf: 'center'}}>
          <LinearGradient
            colors={[Colors.purple_color, Colors.light_greencolor]}
            start={{x: 1, y: 1}}
            end={{x: 0, y: 1}}
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
                {this.state.event_arr.event_type}
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
        {this.state.event_arr != '' && (
          <KeyboardAwareScrollView
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{width: mobileW}}
            keyboardShouldPersistTaps="handled"
            refreshControl={
              <RefreshControl
                refreshing={this.state.refresh}
                onRefresh={this._onRefresh}
                tintColor={Colors.theme_color}
                colors={[Colors.theme_color]}
                //tintColor="#fff" titleColor="#fff" colors={[Colors.theme_color, "green", "blue"]}
              />
            }>
            <View
              style={{
                width: (mobileW * 95) / 100,
                // alignSelf: 'center',
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: (mobileH * 2) / 100,
                paddingHorizontal: (mobileW * 4) / 100,
              }}>
              <Text
                style={{
                  color: Colors.black_color,
                  fontFamily: Font.FontSemiBold,
                  fontSize: (mobileW * 3.5) / 100,
                }}>
                {Lang_chg.Request_txt[config.language]}
              </Text>
              <Text
                style={{
                  color: Colors.black_color,
                  fontFamily: Font.FontSemiBold,
                  fontSize: (mobileW * 3.5) / 100,
                }}>
                {this.state.event_arr.order_number}
              </Text>
            </View>
            {/* ================for grediant view---------------- */}
            <View style={{alignItems: 'center', alignSelf: 'center'}}>
              <LinearGradient
                colors={[Colors.light_greencolor, Colors.purple_color]}
                start={{x: 0, y: 0}}
                end={{x: 1, y: 1}}
                style={{
                  height: (mobileH * 6) / 100,
                  width: (mobileW * 100) / 100,
                  alignSelf: 'center',
                  alignItems: 'center',
                  marginTop: (mobileH * 2) / 100,
                }}>
                <View
                  style={{
                    width: (mobileW * 92) / 100,
                    alignSelf: 'center',
                    paddingVertical: (mobileH * 1.5) / 100,
                  }}>
                  <Text
                    style={{
                      color: Colors.whiteColor,
                      fontFamily: Font.FontSemiBold,
                      fontSize: (mobileW * 3.8) / 100,
                      paddingTop: (mobileH * 0.2) / 100,
                    }}>
                    {Lang_chg.Event_Details_txt[config.language]}
                  </Text>
                </View>
              </LinearGradient>
            </View>
            {/* -------for text view--------------------------------- */}
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                width: (mobileW * 92) / 100,
                alignSelf: 'center',
              }}>
              {/* for first view */}
              <View
                style={{
                  width: (mobileW * 50) / 100,
                  justifyContent: 'flex-start',
                  borderRadius: (mobileW * 1) / 100,
                  paddingVertical: (mobileH * 1) / 100,
                }}>
                <Text
                  style={{
                    fontSize: (mobileW * 3.5) / 100,
                    fontFamily: Font.FontSemiBold,
                    color: Colors.black_color,
                  }}>
                  {Lang_chg.Event_Title_txt[config.language]}
                </Text>
                <Text
                  style={{
                    fontSize: (mobileW * 3.2) / 100,
                    fontFamily: Font.FontRegular,
                    color: Colors.black_color,
                    width: (mobileW * 50) / 100,
                  }}>
                  {this.state.event_arr.title}
                </Text>
                <Text
                  style={{
                    fontSize: (mobileW * 3.5) / 100,
                    fontFamily: Font.FontSemiBold,
                    color: Colors.black_color,
                    paddingTop: (mobileH * 2) / 100,
                  }}>
                  {Lang_chg.Guest_txt[config.language]}
                </Text>
                <Text
                  style={{
                    fontSize: (mobileW * 3.2) / 100,
                    fontFamily: Font.FontRegular,
                    color: Colors.black_color,
                  }}>
                  {this.state.event_arr.no_of_guest}
                </Text>
              </View>
              {/* ----for second view */}
              <View
                style={{
                  width: (mobileW * 45) / 100,
                  justifyContent: 'flex-start',
                  borderRadius: (mobileW * 1) / 100,
                  paddingVertical: (mobileH * 1) / 100,
                }}>
                <Text
                  style={{
                    fontSize: (mobileW * 3.5) / 100,
                    fontFamily: Font.FontSemiBold,
                    color: Colors.black_color,
                  }}>
                  {Lang_chg.DateTime_txt[config.language]}
                </Text>
                <Text
                  style={{
                    fontSize: (mobileW * 3.2) / 100,
                    fontFamily: Font.FontRegular,
                    color: Colors.black_color,
                  }}>
                  {this.state.event_arr.event_date_time}
                </Text>
                <Text
                  style={{
                    fontSize: (mobileW * 3.5) / 100,
                    fontFamily: Font.FontSemiBold,
                    color: Colors.black_color,
                    paddingTop: (mobileH * 2) / 100,
                  }}>
                  {Lang_chg.location1_txt[config.language]}
                </Text>
                <Text
                  style={{
                    fontSize: (mobileW * 3.2) / 100,
                    fontFamily: Font.FontRegular,
                    color: Colors.black_color,
                  }}>
                  {this.state.event_arr.address}
                </Text>
              </View>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                width: (mobileW * 92) / 100,
                alignSelf: 'center',
              }}>
              {/* ----------3rd-----------*/}
              <View
                style={{
                  width: (mobileW * 50) / 100,
                  justifyContent: 'flex-start',
                  borderRadius: (mobileW * 1) / 100,
                  paddingVertical: (mobileH * 1) / 100,
                }}>
                <Text
                  style={{
                    fontSize: (mobileW * 3.5) / 100,
                    fontFamily: Font.FontSemiBold,
                    color: Colors.black_color,
                  }}>
                  {Lang_chg.VenueType[config.language]}
                </Text>
                <Text
                  style={{
                    fontSize: (mobileW * 3.2) / 100,
                    fontFamily: Font.FontRegular,
                    color: Colors.black_color,
                  }}>
                  {this.state.event_arr.venue_name}
                </Text>
                <Text
                  style={{
                    fontSize: (mobileW * 3.5) / 100,
                    fontFamily: Font.FontSemiBold,
                    color: Colors.black_color,
                    paddingTop: (mobileH * 2) / 100,
                  }}>
                  {Lang_chg.Cuisines_txt[config.language]}
                </Text>
                <Text
                  style={{
                    fontSize: (mobileW * 3.2) / 100,
                    fontFamily: Font.FontRegular,
                    color: Colors.black_color,
                  }}>
                  {this.state.event_arr.cuisine_name}
                </Text>
              </View>
              {/* ----------4th-----------*/}

              <View
                style={{
                  width: (mobileW * 45) / 100,
                  justifyContent: 'flex-start',
                  borderRadius: (mobileW * 1) / 100,
                  paddingVertical: (mobileH * 1) / 100,
                }}>
                <Text
                  style={{
                    fontSize: (mobileW * 3.5) / 100,
                    fontFamily: Font.FontSemiBold,
                    color: Colors.black_color,
                  }}>
                  {Lang_chg.Budget_txtuser[config.language]}
                </Text>
                <Text
                  style={{
                    fontSize: (mobileW * 3.2) / 100,
                    fontFamily: Font.FontRegular,
                    color: Colors.black_color,
                  }}>
                  {this.state.event_arr.user_budget}
                </Text>
              </View>
            </View>
            {/* ================for grediant 2nd view---------------- */}
            <View style={{alignItems: 'center', alignSelf: 'center'}}>
              <LinearGradient
                colors={[Colors.light_greencolor, Colors.purple_color]}
                start={{x: 0, y: 0}}
                end={{x: 1, y: 1}}
                style={{
                  height: (mobileH * 6) / 100,
                  width: (mobileW * 100) / 100,
                  alignSelf: 'center',
                  alignItems: 'center',
                  marginTop: (mobileH * 2) / 100,
                }}>
                <View
                  style={{
                    width: (mobileW * 92) / 100,
                    alignSelf: 'center',
                    paddingVertical: (mobileH * 1.5) / 100,
                  }}>
                  <Text
                    style={{
                      color: Colors.whiteColor,
                      fontFamily: Font.FontSemiBold,
                      fontSize: (mobileW * 3.8) / 100,
                      paddingTop: (mobileH * 0.2) / 100,
                    }}>
                    {Lang_chg.Services_txt[config.language]}
                  </Text>
                </View>
              </LinearGradient>
            </View>
            {/* -------------------for simple text view------- */}
            {this.state.service_arr != 'NA' && (
              <FlatList
                data={this.state.service_arr}
                renderItem={({item, index}) => {
                  return (
                    <View
                      style={{
                        width: (mobileW * 92) / 100,
                        alignSelf: 'center',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        marginTop: (mobileH * 2) / 100,
                      }}>
                      <Text
                        style={{
                          color: Colors.black_color,
                          fontFamily: Font.FontSemiBold,
                          fontSize: (mobileW * 3.5) / 100,
                        }}>
                        {item.service_name}
                      </Text>
                      <Text
                        style={{
                          color: Colors.black_color,
                          fontFamily: Font.FontSemiBold,
                          fontSize: (mobileW * 3.5) / 100,
                        }}>
                        {'$' + item.service_price}
                      </Text>
                    </View>
                  );
                }}
              />
            )}
            {/* ----------- for border dash view-----------*/}
            <View
              style={{
                paddingTop: (mobileW * 5) / 100,
                width: '93%',
                alignSelf: 'center',
              }}>
              <DashedLine dashLength={5} dashColor={Colors.greyColor} />
            </View>

            <View
              style={{
                width: (mobileW * 92) / 100,
                alignSelf: 'center',
                // marginTop: mobileH * 2 / 100,
                // borderTopColor: Colors.greyColor,
                // borderBottomColor:Colors.greyColor,
                // borderStyle: 'dashed',
                // borderTopWidth: 1,
                // borderBottomWidth:1 ,
                // borderWidth:1,
                flexDirection: 'row',

                justifyContent: 'space-between',
              }}>
              <Text
                style={{
                  color: Colors.black_color,
                  fontFamily: Font.FontSemiBold,
                  fontSize: (mobileW * 3.5) / 100,
                  paddingVertical: (mobileH * 2) / 100,
                }}>
                {Lang_chg.Budget_txt[config.language]}
              </Text>
              <Text
                style={{
                  color: Colors.black_color,
                  fontFamily: Font.FontSemiBold,
                  fontSize: (mobileW * 3.5) / 100,
                  paddingVertical: (mobileH * 2) / 100,
                }}>
                {'$' + this.state.totalBudget}
              </Text>
            </View>
            <View style={{width: '93%', alignSelf: 'center'}}>
              <DashedLine dashLength={5} dashColor={Colors.greyColor} />
            </View>

            {/* -----------------------for client view===================== */}
            <View
              style={{
                width: (mobileW * 92) / 100,
                alignSelf: 'center',
                marginTop: (mobileH * 3) / 100,
                borderColor: Colors.greyColor,
                borderStyle: 'dashed',
                borderWidth: (mobileW * 0.3) / 100,
                paddingVertical: (mobileH * 2) / 100,
                marginBottom: (mobileH * 3) / 100,
                backgroundColor: Colors.border_color,
                borderRadius: (mobileW * 1.5) / 100,
              }}>
              <Text
                style={{
                  color: Colors.black_color,
                  fontFamily: Font.FontSemiBold,
                  fontSize: (mobileW * 4) / 100,
                  // paddingTop: mobileH * 1 / 100,
                  paddingHorizontal: (mobileW * 3) / 100,
                }}>
                {Lang_chg.Client_txt[config.language]}
              </Text>

              {/* ----view ------------ */}
              <View
                style={{
                  width: (mobileW * 85) / 100,
                  alignSelf: 'center',
                  flexDirection: 'row',
                  justifyContent: 'center',
                  paddingVertical: (mobileH * 1.5) / 100,
                }}>
                <View
                  style={{
                    width: (mobileW * 85) / 100,
                    flexDirection: 'row',
                    alignSelf: 'center',
                    justifyContent: 'flex-start',
                  }}>
                  <View
                    style={{
                      width: (mobileW * 10) / 100,
                      alignItems: 'center',
                      borderRadius: (mobileW * 50) / 100,
                      marginTop: (mobileW * 1) / 100,
                    }}>
                    <Image
                      style={{
                        width: (mobileW * 10) / 100,
                        height: (mobileW * 10) / 100,
                        borderRadius: (mobileW * 50) / 100,
                      }}
                      resizeMode="cover"
                      source={
                        this.state.event_arr.user_image != 'NA'
                          ? {
                              uri:
                                config.img_url +
                                this.state.event_arr.user_image,
                            }
                          : localimag.userplaceholder
                      }></Image>
                  </View>
                  <View
                    style={{
                      width: (mobileW * 20) / 100,
                      marginLeft: (mobileW * 1.8) / 100,
                      paddingVertical: (mobileH * 1) / 100,
                    }}>
                    <Text
                      style={{
                        color: Colors.black_color,
                        fontFamily: Font.FontSemiBold,
                        fontSize: (mobileW * 4) / 100,
                      }}>
                      {this.state.event_arr.user_name}
                    </Text>
                  </View>
                  <View
                    style={{
                      width: (mobileW * 50) / 100,
                      flexDirection: 'row',
                      justifyContent: 'flex-end',
                    }}>
                    {this.state.buttonStatus >= 2 && (
                      <TouchableOpacity
                        onPress={() => {
                          this.props.navigation.navigate('ChatBooking', {
                            chatdata: {
                              other_user_id: this.state.event_arr.user_id,
                              booking_id: this.state.event_arr.event_id,
                              booking_number: this.state.event_arr.order_number,
                              other_user_name: this.state.event_arr.user_name,
                              image:
                                config.img_url3 +
                                this.state.event_arr.user_image,
                              blockstatus: 'no',
                              category_name: this.state.event_arr.event_type,
                            },
                          });
                        }}
                        activeOpacity={0.7}
                        style={{
                          width: (mobileW * 15) / 100,
                          alignSelf: 'center',
                          backgroundColor: Colors.green_color,
                          borderRadius: (mobileW * 1) / 100,
                          flexDirection: 'row',
                          justifyContent: 'center',
                        }}>
                        <Image
                          style={{
                            width: (mobileW * 3) / 100,
                            height: (mobileW * 3) / 100,
                            marginTop: (mobileH * 0.8) / 100,
                          }}
                          source={localimag.chat_provider}></Image>
                        <Text
                          style={{
                            color: Colors.whiteColor,
                            fontFamily: Font.FontSemiBold,
                            fontSize: (mobileW * 2.9) / 100,
                            textAlign: 'center',
                            paddingVertical: (mobileH * 0.5) / 100,
                            marginLeft: (mobileW * 1) / 100,
                          }}>
                          {Lang_chg.Chat_txt[config.language]}
                        </Text>
                      </TouchableOpacity>
                    )}
                  </View>
                </View>
              </View>
              {this.state.rating_arr != 'NA' && (
                <>
                  <View
                    style={{
                      width: (mobileW * 88) / 100,
                      alignSelf: 'center',
                      borderWidth: 0.5,
                      borderColor: Colors.black_color,
                    }}></View>
                  <Text
                    style={{
                      color: Colors.black_color,
                      fontFamily: Font.FontSemiBold,
                      marginTop: (mobileW * 3) / 100,
                      marginLeft: (mobileW * 3) / 100,
                      fontSize: (mobileW * 3.5) / 100,
                    }}>
                    {'Client Review'}
                  </Text>

                  <View
                    style={{
                      width: (mobileW * 88) / 100,
                      marginTop: (mobileW * 3) / 100,
                      alignSelf: 'center',
                      borderWidth: 0.5,
                      borderColor: Colors.black_color,
                    }}></View>
                  <View
                    style={{
                      width: (mobileW * 90) / 100,
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      paddingVertical: (mobileH * 1) / 100,
                    }}>
                    <View
                      style={{
                        width: (mobileW * 20) / 100,
                        marginLeft: (mobileW * 3) / 100,
                        flexDirection: 'row',
                        justifyContent: 'center',
                      }}>
                      <StarRating
                        containerStyle={{alignSelf: 'center'}}
                        // contentContainerStyle={{ marginLeft: mobileW * 10 / 100 }}
                        fullStar={localimag.star_Active}
                        emptyStar={localimag.star_Deactive}
                        // halfStar={localimag.star_Active}
                        halfStarColor={'#FFC815'}
                        disabled={true}
                        maxStars={5}
                        starSize={(mobileW * 3) / 100}
                        rating={this.state.rating_arr.rating}
                      />
                      <Text
                        style={{
                          color: Colors.black_color,
                          fontFamily: Font.FontSemiBold,
                          fontSize: (mobileW * 3) / 100,
                        }}>
                        {'(' + this.state.rating_arr.rating + ')'}
                      </Text>
                    </View>
                    <Text
                      style={{
                        color: Colors.black_color,
                        fontFamily: Font.FontSemiBold,
                        fontSize: (mobileW * 3) / 100,
                      }}>
                      {this.state.rating_arr.createtime}
                    </Text>
                  </View>
                  <View
                    style={{
                      width: (mobileW * 90) / 100,
                      marginLeft: (mobileW * 3) / 100,
                      alignSelf: 'center',
                    }}>
                    <Text
                      style={{
                        color: Colors.black_color,
                        fontFamily: Font.FontSemiBold,
                        fontSize: (mobileW * 3) / 100,
                      }}>
                      {this.state.rating_arr.review}
                    </Text>
                  </View>
                </>
              )}
            </View>
            {/* -----------for second view------------------ */}
            {this.state.buttonStatus == 1 && (
              <View
                style={{
                  width: (mobileW * 87) / 100,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignSelf: 'center',
                }}>
                <TouchableOpacity
                  onPress={() => {
                    this.actionButton(this.state.item, 2);
                  }}
                  activeOpacity={0.7}
                  style={{
                    width: (mobileW * 41) / 100,
                    alignSelf: 'center',
                    backgroundColor: Colors.redColor,
                    borderRadius: (mobileW * 1) / 100,
                    flexDirection: 'row',
                    justifyContent: 'center',
                  }}>
                  <Image
                    style={{
                      width: (mobileW * 3.4) / 100,
                      height: (mobileW * 3.4) / 100,
                      alignSelf: 'center',
                    }}
                    source={localimag.cross_64}></Image>
                  <Text
                    style={{
                      color: Colors.whiteColor,
                      fontFamily: Font.FontSemiBold,
                      fontSize: (mobileW * 3.5) / 100,
                      textAlign: 'center',
                      paddingVertical: (mobileH * 1) / 100,
                      marginLeft: (mobileW * 1.5) / 100,
                    }}>
                    {Lang_chg.Reject_txt[config.language]}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    this.actionButton(this.state.item, 1);
                  }}
                  // onPress={() => this.props.navigation.navigate('VendorBirthdayOngoing')}
                  activeOpacity={0.7}
                  style={{
                    width: (mobileW * 41) / 100,
                    alignSelf: 'center',
                    backgroundColor: Colors.green_color,
                    borderRadius: (mobileW * 1) / 100,
                    flexDirection: 'row',
                    justifyContent: 'center',
                  }}>
                  <Image
                    style={{
                      width: (mobileW * 3.6) / 100,
                      height: (mobileW * 3.6) / 100,
                      alignSelf: 'center',
                      tintColor: Colors.whiteColor,
                    }}
                    source={localimag.check}></Image>
                  <Text
                    style={{
                      color: Colors.whiteColor,
                      fontFamily: Font.FontBold,
                      fontSize: (mobileW * 3.5) / 100,
                      textAlign: 'center',
                      paddingVertical: (mobileH * 1) / 100,
                      marginLeft: (mobileW * 1.5) / 100,
                    }}>
                    {Lang_chg.Accept_txt[config.language]}
                  </Text>
                </TouchableOpacity>
              </View>
            )}

            {this.state.buttonStatus == 2 && (
              <TouchableOpacity
                onPress={() => {
                  this.startEndButton(1);
                }}
                activeOpacity={0.7}
                style={{
                  marginTop: (mobileH * 1) / 100,
                  alignItems: 'center',
                  alignSelf: 'center',
                  marginBottom: (mobileH * 2) / 100,
                }}>
                <LinearGradient
                  colors={[Colors.purple_color, Colors.light_greencolor]}
                  start={{x: 0, y: 1}}
                  end={{x: 1, y: 0}}
                  style={{
                    height: (mobileH * 6.7) / 100,
                    width: (mobileW * 92) / 100,
                    alignSelf: 'center',
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: (mobileW * 1.5) / 100,
                  }}>
                  <Text
                    style={{
                      color: '#f5f4f5',
                      fontFamily: Font.FontSemiBold,
                      fontSize: (mobileW * 4.3) / 100,
                    }}>
                    {Lang_chg.Start_Work_txt[config.language]}
                  </Text>
                </LinearGradient>
              </TouchableOpacity>
            )}

            {this.state.buttonStatus == 3 && (
              <TouchableOpacity
                onPress={() => {
                  this.startEndButton(2);
                }}
                activeOpacity={0.7}
                style={{
                  marginTop: (mobileH * 1) / 100,
                  alignItems: 'center',
                  alignSelf: 'center',
                  marginBottom: (mobileH * 2) / 100,
                }}>
                <LinearGradient
                  colors={[Colors.purple_color, Colors.light_greencolor]}
                  start={{x: 0, y: 1}}
                  end={{x: 1, y: 0}}
                  style={{
                    height: (mobileH * 6.7) / 100,
                    width: (mobileW * 92) / 100,
                    alignSelf: 'center',
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: (mobileW * 1.5) / 100,
                  }}>
                  <Text
                    style={{
                      color: '#f5f4f5',
                      fontFamily: Font.FontSemiBold,
                      fontSize: (mobileW * 4.3) / 100,
                    }}>
                    {Lang_chg.End_Work_txt[config.language]}
                  </Text>
                </LinearGradient>
              </TouchableOpacity>
            )}
          </KeyboardAwareScrollView>
        )}
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: Colors.whiteColor,
  },
});
