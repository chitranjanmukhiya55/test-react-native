import React, { Component } from 'react';
import {
  Text,
  SafeAreaView,
  StatusBar,
  View,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Image,
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
  localStorage,
  apifuntion,
  msgTitle,
  msgProvider,
} from './Provider/utilslib/Utils';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import LinearGradient from 'react-native-linear-gradient';
import DashedLine from 'react-native-dashed-line';
import StarRating from 'react-native-star-rating';

export default class ProposedEventVendorListTab0 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Tab: 0,
      addedItemArray: this.props.route.params.addedItemArray,
      totalPrice: '',
      eventDetails: 'NA',
      budget: '',
    };
  }
  componentDidMount() {
    this.props.navigation.addListener('focus', () => {
      this.setState({ addedItemArray: this.props.route.params.addedItemArray });
      consolepro.consolelog(
        'this.props.route.params.category',
        this.props.route.params.addedItemArray,
      );
      this.getData();
    });
  }
  async getData() {
    let createEventJSON = await localStorage.getItemObject('createEventJSON');
    consolepro.consolelog('createEventJSON545454', createEventJSON);
    if (createEventJSON != null) {
      this.setState({
        eventDetails: createEventJSON,
        event: createEventJSON.event,
        selected_date: createEventJSON.selected_date,
        location: createEventJSON.location,
        numberOfGuest: createEventJSON.numberOfGuest,
        customNumberOfGuest: createEventJSON.customNumberOfGuest,
        venueRequired: createEventJSON.venueRequired,
        vanueName: createEventJSON.vanueName,
        selectedVenue: createEventJSON.selectedVenue,
        selectedCuisines: createEventJSON.selectedCuisines,
        area: createEventJSON.area,
        budget: createEventJSON.budget,
        selected_date_for_api: createEventJSON.selected_date_for_api,
        latitude: createEventJSON.latitude,
        longitude: createEventJSON.longitude,
        seating_layout_id: createEventJSON.seating_layout_id,
        space_setup_id: createEventJSON.space_setup_id,
      });

      let addedItemArray = this.state.addedItemArray;
      let data = 0;
      for (let i = 0; i < addedItemArray.length; i++) {
        for (let j = 0; j < addedItemArray[i].service_arr.length; j++) {
          if (addedItemArray[i].service_arr[j].status == true)
            if (addedItemArray[i].category_name == 'Caterers') {
              data +=
                parseFloat(addedItemArray[i].service_arr[j].price) *
                parseInt(this.state.eventDetails.customNumberOfGuest);
            } else {
              data += parseFloat(addedItemArray[i].service_arr[j].price);
            }
        }
      }
      this.setState({
        totalPrice: data.toFixed(2),
      });
    }
  }

  async sendRequest() {
    let user_arr = await localStorage.getItemObject('user_arr');
    consolepro.consolelog('user_arr>', user_arr);
    let user_id = user_arr.user_id;
    let createEventJSON = this.state.eventDetails;
    let url = config.baseURL + 'add_event.php';
    var data = new FormData();
    data.append('user_id', user_id);
    data.append(
      'category_id',
      createEventJSON.subcategory_arr == 'NA'
        ? createEventJSON.categoryDetails.category_id
        : createEventJSON.subcategory_arr.event_sub_category_id,
    );
    data.append('event_title', createEventJSON.event);
    data.append('grand_total', this.state.totalPrice);
    data.append('date_time', createEventJSON.selected_date_for_api);
    data.append('address', createEventJSON.location);
    data.append('latitude', createEventJSON.latitude);
    data.append('longitude', createEventJSON.longitude);
    data.append('num_of_guest', createEventJSON.numberOfGuestId - 1);
    data.append(
      'category_type',
      createEventJSON.subcategory_arr == 'NA' ? 0 : 1,
    );

    data.append(
      'custom_guest',
      createEventJSON.numberOfGuestId == 4
        ? createEventJSON.customNumberOfGuest
        : '',
    );
    if (createEventJSON.venueRequired == 2) {
      data.append('venue_required', 0);
    } else {
      data.append('venue_required', 1);
    }
    if (createEventJSON.selectedVenue != '') {
      data.append('vanue_id', createEventJSON.selectedVenue.vanue_id);
      data.append('venue_type', createEventJSON.selectedVenue.vanue_name);
    } else {
      data.append('vanue_id', '');
      data.append('venue_type', createEventJSON.vanueName);
    }
    let vender = this.state.addedItemArray;
    let business_id = [];
    let service_name = [];
    let business_service_id = [];
    let price = [];
    for (let i = 0; i < vender.length; i++) {
      for (let j = 0; j < vender[i].service_arr.length; j++) {
        if (vender[i].service_arr[j].status == true) {
          business_id.push(vender[i].business_id);
          service_name.push(vender[i].service_arr[j].service_name);
          business_service_id.push(
            vender[i].service_arr[j].business_service_id,
          );
          price.push(vender[i].service_arr[j].price);
        }
      }
    }
    let selectedCuisines = createEventJSON.selectedCuisines;
    let cuisine_id = [];
    for (let i = 0; i < selectedCuisines.length; i++) {
      cuisine_id.push(selectedCuisines[i].cuisine_id);
    }

    data.append('vendor_id', business_id.join(','));
    data.append('cuisine_ids', cuisine_id.join(','));
    data.append('postal_code', createEventJSON.area);
    data.append('budget', createEventJSON.budget);
    data.append('business_service_ids', business_service_id.join(','));
    data.append('service_price', price.join(','));
    data.append('service_name', service_name.join(','));
    data.append('seating_arrangement', createEventJSON.seating_arrange_list_id);
    data.append('seating_layout', createEventJSON.seating_layout_id);
    consolepro.consolelog('data', data);
    consolepro.consolelog('url', url);
    // return false
    apifuntion
      .postApi(url, data)
      .then(obj => {
        consolepro.consolelog('successsssss', obj);
        if (obj.success == 'true') {
          localStorage.setItemObject('image_change_gender', null);
          localStorage.setItemObject('createEventJSON', null);
          this.props.navigation.navigate('SuccessfullySent');
        } else {
          setTimeout(() => {
            msgProvider.alert(
              msgTitle.information[config.language],
              obj.msg[config.language],
              false,
            );
            return false;
          }, 300);
        }
      })
      .catch(error => {
        consolepro.consolelog('-------- error ------- ' + error);
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
        <View style={{ alignItems: 'center', alignSelf: 'center' }}>
          <LinearGradient
            colors={[Colors.purple_color, Colors.light_greencolor]}
            start={{ x: 1, y: 0 }}
            end={{ x: 0, y: 0 }}
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
              style={{ width: (mobileW * 15) / 100 }}>
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
            <View style={{ width: (mobileW * 70) / 100, alignItems: 'center' }}>
              <Text
                style={{
                  color: Colors.whiteColor,
                  fontFamily: Font.FontSemiBold,
                  fontSize: (mobileW * 5) / 100,
                }}>
                {Lang_chg.proposedeventvendorlist_txt[config.language]}
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
          contentContainerStyle={{ width: mobileW }}
          keyboardShouldPersistTaps="handled">
          {/* ----------------------- 1st flatlist--------------- */}

          <View>
            <View
              style={{
                width: (mobileW * 100) / 100,
                paddingVertical: (mobileW * 1.5) / 100,
              }}>
              <View
                style={{
                  borderBottomWidth: 1,
                  borderColor: Colors.greyColor,
                  width: (mobileW * 100) / 100,
                  alignSelf: 'center',
                }}></View>
              <View style={{ backgroundColor: Colors.light_graycolor }}>
                <Text
                  style={{
                    fontSize: (mobileW * 3.7) / 100,
                    fontFamily: Font.FontBold,
                    color: Colors.black_color,
                    paddingVertical: (mobileH * 1) / 100,
                    paddingHorizontal: (mobileW * 2.5) / 100,
                  }}>
                  {Lang_chg.EventDetails[config.language]}
                </Text>
              </View>
              <View
                style={{
                  borderBottomWidth: 1,
                  borderColor: Colors.greyColor,
                  width: (mobileW * 100) / 100,
                  alignSelf: 'center',
                }}></View>
              <View
                style={{
                  width: (mobileW * 70) / 100,
                  paddingHorizontal: (mobileW * 2.5) / 100,
                  width: mobileW,
                  alignSelf: 'center',
                  paddingVertical: (mobileW * 1.5) / 100,
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    width: (mobileW * 96) / 100,
                  }}>
                  <View
                    style={{
                      width: (mobileW * 45) / 100,
                      justifyContent: 'flex-start',
                      borderRadius: (mobileW * 1) / 100,
                      marginTop: (mobileH * 1) / 100,
                    }}>
                    <Text
                      style={{
                        fontSize: (mobileW * 3.5) / 100,
                        fontFamily: Font.FontSemiBold,
                        color: Colors.black_color,
                      }}>
                      {Lang_chg.EventTitle[config.language]}
                    </Text>
                    <Text
                      numberOfLines={1}
                      style={{
                        fontSize: (mobileW * 3.5) / 100,
                        fontFamily: Font.FontRegular,
                        color: Colors.black_color,
                      }}>
                      {this.state.eventDetails.event}
                    </Text>
                    <Text
                      style={{
                        fontSize: (mobileW * 3.5) / 100,
                        fontFamily: Font.FontSemiBold,
                        color: Colors.black_color,
                        paddingTop: (mobileH * 2) / 100,
                      }}>
                      {Lang_chg.NoofGuest[config.language]}{' '}
                    </Text>
                    <Text
                      numberOfLines={1}
                      style={{
                        fontSize: (mobileW * 3.5) / 100,
                        fontFamily: Font.FontRegular,
                        color: Colors.black_color,
                      }}>
                      {this.state.eventDetails.numberOfGuestId == 4
                        ? this.state.eventDetails.customNumberOfGuest
                        : this.state.eventDetails.numberOfGuest}
                    </Text>
                    <Text
                      style={{
                        fontSize: (mobileW * 3.5) / 100,
                        fontFamily: Font.FontSemiBold,
                        color: Colors.black_color,
                        paddingTop: (mobileH * 2) / 100,
                      }}>
                      {Lang_chg.seat_arrange[config.language]}{' '}
                    </Text>
                    <Text
                      numberOfLines={1}
                      style={{
                        fontSize: (mobileW * 3.5) / 100,
                        fontFamily: Font.FontRegular,
                        color: Colors.black_color,
                      }}>
                      {this.state.eventDetails.seating_arrange_list}
                    </Text>
                  </View>

                  <View
                    style={{
                      width: (mobileW * 45) / 100,
                      justifyContent: 'flex-start',
                      borderRadius: (mobileW * 1) / 100,
                      marginTop: (mobileH * 1) / 100,
                    }}>
                    <Text
                      style={{
                        fontSize: (mobileW * 3.5) / 100,
                        fontFamily: Font.FontSemiBold,
                        color: Colors.black_color,
                      }}>
                      {Lang_chg.DateTime[config.language]}{' '}
                    </Text>
                    <Text
                      numberOfLines={1}
                      style={{
                        fontSize: (mobileW * 3.5) / 100,
                        fontFamily: Font.FontSemiBold,
                        color: Colors.black_color,
                        right: (mobileW * 1) / 100,
                      }}>
                      {' '}
                      {this.state.eventDetails.selected_date}
                    </Text>
                    <Text
                      style={{
                        fontSize: (mobileW * 3.5) / 100,
                        fontFamily: Font.FontSemiBold,
                        color: Colors.black_color,
                        paddingTop: (mobileH * 2) / 100,
                      }}>
                      {Lang_chg.Area[config.language]}{' '}
                    </Text>
                    <Text
                      style={{
                        fontSize: (mobileW * 3.5) / 100,
                        fontFamily: Font.FontRegular,
                        color: Colors.black_color,
                      }}>
                      {this.state.eventDetails.area}
                    </Text>
                    <Text
                      style={{
                        fontSize: (mobileW * 3.5) / 100,
                        fontFamily: Font.FontSemiBold,
                        color: Colors.black_color,
                        paddingTop: (mobileH * 2) / 100,
                      }}>
                      {Lang_chg.seat_layout[config.language]}{' '}
                    </Text>
                    <Text
                      style={{
                        fontSize: (mobileW * 3.5) / 100,
                        fontFamily: Font.FontRegular,
                        color: Colors.black_color,
                      }}>
                      {this.state.eventDetails.seating_layout_name}
                    </Text>
                  </View>
                </View>
              </View>

              <View
                style={{
                  borderBottomWidth: 1,
                  borderColor: Colors.greyColor,
                  width: (mobileW * 100) / 100,
                  alignSelf: 'center',
                }}></View>
              <View
                style={{
                  width: mobileW,
                  paddingVertical: (mobileH * 1) / 100,
                  backgroundColor: Colors.light_graycolor,
                  paddingHorizontal: (mobileW * 3) / 100,
                }}>
                <Text
                  style={{
                    color: Colors.black_color,
                    fontFamily: Font.FontBold,
                    fontSize: (mobileW * 4) / 100,
                  }}>
                  {'Vendors'}
                </Text>
              </View>
              <View
                style={{
                  borderBottomWidth: 1,
                  borderColor: Colors.greyColor,
                  width: (mobileW * 100) / 100,
                  alignSelf: 'center',
                }}></View>
            </View>
          </View>
          {/* ------------------------------------startflatlist------------------------- */}
          {/* //===========FlatList 2 =======// */}
          <View style={{ marginBottom: (mobileW * 4) / 100 }}>
            <FlatList
              data={this.state.addedItemArray}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item, index }) => (
                //=========Text View=========//
                <TouchableOpacity
                  onPress={() =>
                    this.props.navigation.navigate('VendorsDetails', {
                      business_id: item.business_id,
                    })
                  }
                  activeOpacity={0.7}
                  style={{ alignSelf: 'center', width: (mobileW * 95) / 100 }}>
                  <Text
                    style={{
                      fontSize: (mobileW * 4.2) / 100,
                      fontFamily: Font.FontBold,
                      color: Colors.black_color,
                      paddingVertical: (mobileH * 0.5) / 100,
                    }}>
                    {item.category_name}
                  </Text>
                  <View
                    style={{
                      width: (mobileW * 100) / 100,
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      paddingHorizontal: (mobileW * 2.5) / 100,
                      backgroundColor: Colors.whiteColor,
                      marginTop: (mobileH * 1) / 100,
                      alignSelf: 'center',
                    }}>
                    <View
                      style={{
                        alignItems: 'center',
                        justifyContent: 'center',
                        paddingRight: (mobileW * 2.5) / 100,
                      }}>
                      <Image
                        style={{
                          width: (mobileW * 24) / 100,
                          height: (mobileW * 22) / 100,
                          borderRadius: (mobileW * 1.5) / 100,
                        }}
                        resizeMode="cover"
                        source={
                          item.business_image != null
                            ? { uri: config.img_url + item.business_image }
                            : localimag.App_icon
                        }></Image>
                    </View>

                    <View style={{ width: (mobileW * 100) / 100 }}>
                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                          marginTop: (mobileW * 1) / 100,
                          width: (mobileW * 67) / 100,
                        }}>
                        <Text
                          style={{
                            color: Colors.black_color,
                            fontFamily: Font.FontBold,
                            fontSize: (mobileW * 4.3) / 100,
                            alignSelf: 'flex-start',
                          }}>
                          {item.vendor_name}
                        </Text>
                      </View>

                      <Text
                        style={{
                          width: (mobileW * 50) / 100,
                          color: Colors.black_color,
                          fontFamily: Font.FontSemiBold,
                          fontSize: (mobileW * 3.7) / 100,
                          marginTop: (mobileH * 0.5) / 100,
                        }}>
                        {item.business_name}
                      </Text>

                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                        }}>
                        <Text
                          style={{
                            color: Colors.black_color,
                            fontFamily: Font.FontSemiBold,
                            fontSize: (mobileW * 3.1) / 100,
                            width: (mobileW * 60) / 100,
                          }}>
                          <Image
                            style={{
                              width: (mobileW * 3.1) / 100,
                              height: (mobileW * 3.1) / 100,
                            }}
                            source={localimag.location_black}></Image>
                          {item.business_address}
                        </Text>
                      </View>
                      <View
                        style={{
                          width: (mobileW * 15) / 100,
                          flexDirection: 'row',
                          marginTop: (mobileH * 0.6) / 100,
                          height: (mobileH * 3) / 100,
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
                  </View>
                  <View
                    style={{
                      marginTop: (mobileH * 2) / 100,
                      borderBottomWidth:
                        (item.status == true && 1) ||
                        (item.status == false && 0),
                      borderColor: Colors.greyColor,
                      width: (mobileW * 95) / 100,
                      alignSelf: 'flex-start',
                    }}></View>
                </TouchableOpacity>
              )}
            />
            <View
              style={{
                width: mobileW,
                alignSelf: 'center',
                marginTop: (mobileH * 3) / 100,
              }}>
              <View
                style={{
                  borderBottomWidth: 1.9,
                  borderColor: Colors.greyColor,
                  width: (mobileW * 100) / 100,
                  alignSelf: 'center',
                }}></View>
              <View
                style={{
                  backgroundColor: Colors.light_graycolor,
                  paddingVertical: (mobileH * 1) / 100,
                  paddingHorizontal: (mobileW * 3) / 100,
                }}>
                <Text
                  style={{
                    color: Colors.black_color,
                    fontFamily: Font.FontBold,
                    fontSize: (mobileW * 4) / 100,
                    textAlignVertical: 'center',
                  }}>
                  {Lang_chg.ServicesPrice[config.language]}
                </Text>
              </View>
              <View
                style={{
                  borderBottomWidth: 1.9,
                  borderColor: Colors.greyColor,
                  width: (mobileW * 100) / 100,
                  alignSelf: 'center',
                }}></View>
            </View>
            {/* //===========FlatList 3 =======// */}
            <FlatList
              contentContainerStyle={{
                width: (mobileW * 100) / 100,
                alignSelf: 'center',
              }}
              data={this.state.addedItemArray}
              renderItem={({ item, index }) => {
                var item1 = item;
                return (
                  <View>
                    <View
                      style={{
                        marginTop: (mobileH * 0) / 100,
                      }}>
                      {/* //=========Service Text View======// */}
                      <View
                        style={{
                          width: (mobileW * 94) / 100,
                          alignSelf: 'center',
                          marginTop: (mobileH * 1) / 100,
                        }}>
                        <Text
                          style={{
                            color: Colors.black_color,
                            fontFamily: Font.FontBold,
                            fontSize: (mobileW * 3.5) / 100,
                          }}>
                          {'Service (' + item1.category_name + ')'}
                        </Text>
                      </View>
                      <FlatList
                        contentContainerStyle={{
                          width: (mobileW * 100) / 100,
                          alignSelf: 'center',
                        }}
                        data={item1.service_arr}
                        renderItem={({ item, index }) => {
                          return (
                            <>
                              {item.status == true && (
                                <>
                                  <View
                                    style={{
                                      width: (mobileW * 94) / 100,
                                      flexDirection: 'row',
                                      justifyContent: 'space-between',
                                      alignSelf: 'center',
                                      marginTop: (mobileW * 1) / 100,
                                    }}>
                                    <View>
                                      <Text
                                        style={{
                                          color: Colors.black_color,
                                          fontFamily: Font.FontBold,
                                          fontSize: (mobileW * 3) / 100,
                                        }}>
                                        {item.service_name != 'NA' &&
                                          item.service_name}
                                      </Text>
                                      {item1.category_name == 'Caterers' && (
                                        <Text
                                          style={{
                                            color: Colors.black_color,
                                            fontFamily: Font.FontSemiBold,
                                            fontSize: (mobileW * 3) / 100,
                                            width: (mobileW * 25) / 100,
                                          }}>
                                          {'($' +
                                            item.price +
                                            'x' +
                                            this.state.eventDetails
                                              .customNumberOfGuest +
                                            ')'}
                                        </Text>
                                      )}
                                    </View>
                                    {item1.category_name == 'Caterers' ?
                                      <Text
                                        style={{
                                          color: Colors.black_color,
                                          fontFamily: Font.FontBold,
                                          fontSize: (mobileW * 3) / 100,
                                        }}>
                                        {item.price != 'NA' &&
                                          '$' +
                                          parseFloat(item.price) *
                                          parseInt(
                                            this.state.eventDetails
                                              .customNumberOfGuest,
                                          )}
                                      </Text> :
                                      <Text
                                        style={{
                                          color: Colors.black_color,
                                          fontFamily: Font.FontBold,
                                          fontSize: (mobileW * 3) / 100,
                                        }}>
                                        {item.price != 'NA' &&
                                          '$' +
                                          parseFloat(item.price).toFixed(2)}
                                      </Text>
                                    }
                                  </View>
                                  {item1.price_type != 'NA' && (
                                    <View
                                      style={{
                                        width: (mobileW * 94) / 100,
                                        alignSelf: 'center',
                                      }}>
                                      <Text
                                        style={{
                                          color: Colors.light_greencolor,
                                          fontFamily: Font.FontBold,
                                          fontSize: (mobileW * 3) / 100,
                                        }}>
                                        {item1.price_type}{' '}
                                      </Text>
                                    </View>
                                  )}
                                </>
                              )}
                            </>
                          );
                        }}
                      />
                      <View
                        style={{
                          marginTop: (mobileW * 1) / 100,
                          width: '95%',
                          alignSelf: 'center',
                        }}>
                        <DashedLine
                          dashLength={5}
                          dashColor={Colors.greyColor}
                        />
                      </View>
                    </View>
                  </View>
                );
              }}
            />
          </View>
          <View
            style={{
              width: (mobileW * 94) / 100,
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: (mobileH * 1) / 100,
              alignSelf: 'center',
            }}>
            <Text
              style={{
                color: Colors.black_color,
                fontFamily: Font.FontBold,
                fontSize: (mobileW * 4) / 100,
              }}>
              {'Grand Total'}{' '}
            </Text>
            <Text
              style={{
                color: Colors.black_color,
                fontFamily: Font.FontBold,
                fontSize: (mobileW * 3) / 100,
              }}>
              {'$' + this.state.totalPrice}
            </Text>
          </View>
          <View
            style={{
              marginTop: (mobileH * 1) / 100,
              width: '95%',
              alignSelf: 'center',
            }}>
            <DashedLine dashLength={5} dashColor={Colors.greyColor} />
          </View>
          {/* ------------------------------------endflatlist------------------------- */}

          {/* //=========Continue Submit============// */}
          <TouchableOpacity
            onPress={() => this.sendRequest()}
            activeOpacity={0.7}
            style={{
              alignItems: 'center',
              alignSelf: 'center',
              marginTop: (mobileH * 4) / 100,
            }}>
            <LinearGradient
              colors={[Colors.purple_color, Colors.light_greencolor]}
              start={{ x: 0, y: 1 }}
              end={{ x: 1, y: 0 }}
              style={{
                height: (mobileH * 6.7) / 100,
                width: (mobileW * 90) / 100,
                alignSelf: 'center',
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: (mobileW * 1.5) / 100,
                marginTop: (mobileH * 0) / 100,
                marginBottom: (mobileH * 5) / 100,
              }}>
              <Text
                style={{
                  color: '#f5f4f5',
                  fontFamily: Font.FontBold,
                  fontSize: (mobileW * 4.5) / 100,
                }}>
                Confirm Hosting
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
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.whiteColor,
  },
  Active_View: {
    width: '100%',
    alignSelf: 'center',
    alignItems: 'center',
    borderBottomColor: Colors.whiteColor,
    borderBottomWidth: 4,
  },
  Deactive_View: {
    width: '100%',
    alignSelf: 'center',
    alignItems: 'center',
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
    width: '100%',
    alignSelf: 'center',
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: Colors.whiteColor,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.17,
    shadowRadius: 3.05,
    elevation: 4,
  },
});
