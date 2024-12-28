import React, {Component} from 'react';
import {
  Modal,
  Text,
  View,
  StyleSheet,
  PermissionsAndroid,
  Platform,
  TouchableOpacity,
  Image,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import {
  Colors,
  mediaprovider,
  Font,
  config,
  localStorage,
  localimag,
  Currentltlg,
  Lang_chg,
  mobileW,
  mobileH,
  consolepro,
  msgProvider,
  msgText,
} from './Provider/utilslib/Utils';
import Geolocation from '@react-native-community/geolocation';
import Icon2 from 'react-native-vector-icons/Entypo';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import HideWithKeyboard from 'react-native-hide-with-keyboard';
import LinearGradient from 'react-native-linear-gradient';

export default class LocationMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // pagename: this.props.route.params.pagename,
      loading: false,
      modalVisible1: false,
      latitude: config.latitude,
      longitude: config.longitude,
      latdelta: '0.0421',
      longdelta: '0.0444',
      isConnected: true,
      addressbar: false,
      addressbar2: false,
      addressselected: 'Search',
      makermove: 0,
      username: '',
      address: '',
      address_map: '',
      continue_btn: false,
      address_get: '',
    };
    this.getlatlong();
    //global.props.showLoader();
  }
  componentDidMount() {
    consolepro.consolelog('I am in componentdidmount of map provider');
  }
  callLocation = async that => {
    // this.setState({ loading: true })
    localStorage.getItemObject('position').then(position => {
      console.log('position', position);
      if (position != null) {
        var pointcheck1 = 0;
        this.getalldata(position);
        Geolocation.getCurrentPosition(
          //Will give you the current location
          position => {
            localStorage.setItemObject('position', position);
            this.getalldata(position);
            pointcheck1 = 1;
          },
          error => {
            let position = {
              coords: {latitude: config.latitude, longitude: config.longitude},
            };

            this.getalldata(position);
          },
          {enableHighAccuracy: true, timeout: 1500000, maximumAge: 100000},
        );
        that.watchID = Geolocation.watchPosition(position => {
          //Will give you the location on location change
          console.log('data', position);

          if (pointcheck1 != 1) {
            localStorage.setItemObject('position', position);
            this.getalldata(position);
          }
        });
      } else {
        console.log('helo gkjodi');
        var pointcheck = 0;
        Geolocation.getCurrentPosition(
          //Will give you the current location
          position => {
            localStorage.setItemObject('position', position);

            this.getalldata(position);
            pointcheck = 1;
          },
          error => {
            let position = {
              coords: {latitude: config.latitude, longitude: config.longitude},
            };

            this.getalldata(position);
          },
          {enableHighAccuracy: true, timeout: 1500000, maximumAge: 100000},
        );
        that.watchID = Geolocation.watchPosition(position => {
          //Will give you the location on location change
          console.log('data', position);

          if (pointcheck != 1) {
            localStorage.setItemObject('position', position);
            this.getalldata(position);
          }
        });
      }
    });
  };
  getlatlong = async () => {
    consolepro.consolelog('I am in get lat long');

    let permission = await localStorage.getItemString('permission');
    if (permission != 'denied') {
      var that = this;
      //Checking for the permission just after component loaded
      if (Platform.OS === 'ios') {
        this.callLocation(that);
      } else {
        // this.callLocation(that);
        async function requestLocationPermission() {
          try {
            const granted = await PermissionsAndroid.request(
              PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
              {
                title: 'Location Access Required',
                message: 'This App needs to Access your location',
              },
            );
            console.log('granted', PermissionsAndroid.RESULTS.GRANTED);
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
              that.callLocation(that);
            } else {
              let position = {
                coords: {
                  latitude: that.state.latitude,
                  longitude: that.state.longitude,
                },
              };
              localStorage.setItemString('permission', 'denied');
              that.getalldata(position);
            }
          } catch (err) {
            console.warn(err);
          }
        }
        requestLocationPermission();
      }
    } else {
      let position = {
        coords: {latitude: config.latitude, longitude: config.longitude},
      };
      this.getalldata(position);
    }
  };
  getalldata = position => {
    let longitude = position.coords.longitude;
    let latitude = position.coords.latitude;
    console.log('positionlatitude', latitude);
    console.log('positionlongitude', longitude);

    this.setState({latitude: latitude, longitude: longitude, loading: false});
    let event = {
      latitude: latitude,
      longitude: longitude,
      latitudeDelta: this.state.latdelta,
      longitudeDelta: this.state.longdelta,
    };
    this.getadddressfromlatlong(event);
    setTimeout(() => {
      global.props.hideLoader();
    }, 300);

    //  if(address_map!='NA')
    //  {
    //    this.setState({latitude:address_map.latitude,longitude:address_map.longitude})
    //  }
    //  else if(filter_address!='NA')
    //  {
    //    this.setState({latitude:filter_address.latitude,longitude:filter_address.longitude})
    //  }
    //  else{
    //       this.setState({latitude:latitude,longitude:longitude})
    //  }
  };

  setMapRef = map => {
    this.map = map;
  };
  getCoordinates = region => {
    return {
      latitude: parseFloat(this.state.latitude),
      longitude: parseFloat(this.state.longitude),
      latitudeDelta: parseFloat(this.state.latdelta),
      longitudeDelta: parseFloat(this.state.longdelta),
    };
  };

  getadddressfromlatlong = event => {
    if (this.state.makermove != 0) {
      fetch(
        'https://maps.googleapis.com/maps/api/geocode/json?address=' +
          event.latitude +
          ',' +
          event.longitude +
          '&key=' +
          config.mapkey +
          '&language=' +
          config.maplanguage,
      )
        .then(response => response.json())
        .then(resp => {
          let responseJson = resp.results[0];
          let city = '';
          let administrative_area_level_1 = '';
          for (let i = 0; i < responseJson.address_components.length; i++) {
            if (responseJson.address_components[i].types[0] == 'locality') {
              city = responseJson.address_components[i].long_name;
              break;
            } else if (
              responseJson.address_components[i].types[0] ==
              'administrative_area_level_2'
            ) {
              city = responseJson.address_components[i].long_name;
            }
          }
          for (let j = 0; j < responseJson.address_components.length; j++) {
            if (
              responseJson.address_components[j].types[0] ==
              'administrative_area_level_1'
            ) {
              administrative_area_level_1 =
                responseJson.address_components[j].long_name;
            }
          }

          let details = responseJson;
          let data2 = {
            latitude: details.geometry.location.lat,
            longitude: details.geometry.location.lng,
            address: details.formatted_address,
            address_get: details.formatted_address,
            city: city,
            administrative_area_level_1: administrative_area_level_1,
          };
          // address_map = data2
          // filter_address = data2
          // consolepro.consolelog('responseJson1234', address_map)
          this.GooglePlacesRef &&
            this.GooglePlacesRef.setAddressText(details.formatted_address);
          this.setState({
            latdelta: event.latitudeDelta,
            longdelta: event.longitudeDelta,
            latitude: event.latitude,
            longitude: event.longitude,
            addressselected: details.formatted_address,
            address_get: details.formatted_address,
          });
          //return this.props.locationget(data2);
        });
    } else {
      this.setState({makermove: 1});
    }
  };

  continue_btn = () => {
    if (this.state.address_get != '') {
      global_user_address = this.state.address_get;
      global_user_address_lat = this.state.latitude;
      global_user_address_long = this.state.longitude;
      var address_get = this.state.address_get;
      localStorage.setItemString('address_get');
      consolepro.consolelog(global_user_address);
      consolepro.consolelog(global_user_address_lat);
      consolepro.consolelog(global_user_address_long);
      consolepro.consolelog(
        'global_user_addressglobal_user_addressglobal_user_address88888888',
        global_user_address,
      );
      // return false
      this.props.navigation.goBack();
    } else {
      msgProvider.toast(
        Lang_chg.emptyCurrentaddress[config.language],
        'center',
      );
      return false;
    }
  };
  goback = () => {
    this.props.navigation.goBack();
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

        {/* ......................App Bar .................. */}
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
                {Lang_chg.Location_txt[config.language]}
              </Text>
            </View>
            <View
              style={{
                width: (mobileW * 15) / 100,
                alignItems: 'center',
              }}></View>
          </LinearGradient>
        </View>
        {this.state.latitude != 'NA' && (
          <View style={{flex: 1, backgroundColor: Colors.white_color}}>
            <MapView
              followsUserLocation={true}
              // onUserLocationChange={event =>this.getCoordinates(this)}

              style={{flex: 1, color: Colors.black_color}}
              region={this.getCoordinates(this)}
              //  region={this.getCoordinates(this)}
              zoomEnabled={true}
              provider={PROVIDER_GOOGLE}
              minZoomLevel={2}
              maxZoomLevel={20}
              rotateEnabled={true}
              pitchEnabled={true}
              showsUserLocation={false}
              userLocationPriority="high"
              moveOnMarkerPress={true}

              showsScale={false} // also this is not working
    
              showsPointsOfInterest={true} // this is not working either
              showsBuildings={true} // and finally, this isn't working either
              onMapReady={this.onMapReady}
          
              ref={this.setMapRef}>
              <Marker.Animated
                coordinate={{
                  latitude: parseFloat(this.state.latitude),
                  longitude: parseFloat(this.state.longitude),
                  latitudeDelta: parseFloat(this.state.latdelta),
                  longitudeDelta: parseFloat(this.state.longdelta),
                }}
                isPreselected={true}
                // onDragEnd={(e) => {console.log("dragEnd",(e.nativeEvent.coordinate))}}
                //draggable
                title={
                  this.state.username != null
                    ? this.state.username
                    : 'Guest user'
                }
                description={'Your are here location'}>
                <Image
                  source={localimag.locationred}
                  style={{
                    height: (mobileW * 12) / 100,
                    width: (mobileW * 12) / 100,
                    resizeMode: 'contain',
                  }}
                />
              </Marker.Animated>
            </MapView>
            <View style={{position: 'absolute', width: mobileW, top: 0}}>
              <View style={{flex: 1}}>
                <GooglePlacesAutocomplete
                  placeholder="Search"
                  textInputProps={{
                    placeholderTextColor: Colors.placeholder_color,
                    color: Colors.black_color,
                  }}
                  minLength={1} // minimum length of text to search
                  autoFocus={false}
                  returnKeyType={'search'} // Can be left out for default return key https://facebook.github.io/react-native/docs/textinput.html#returnkeytype
                  listViewDisplayed={this.state.addressbar2} // true/false/undefined
                  fetchDetails={true}
                  ref={instance => {
                    (this.GooglePlacesRef = instance),
                      consolepro.consolelog('I am here..');
                  }}
                  renderDescription={row => row.description} // custom description render
                  onPress={(data, details = null) => {
                    //alert('hi pulkit')
                    this.setState({continue_btn: true});
                    console.log('datalocation', details);
                    let city = 'unknown';
                    for (
                      let i = 0;
                      i < details.address_components.length;
                      i++
                    ) {
                      if (
                        details.address_components[i].types[0] == 'locality'
                      ) {
                        city = details.address_components[i].long_name;
                      }
                    }
                    let data2 = {
                      latitude: details.geometry.location.lat,
                      longitude: details.geometry.location.lng,
                      address: details.formatted_address,
                      city: city,
                    };
                    var address_map = data2;
                    var filter_address = data2;
                    consolepro.consolelog('hellooooo', address_map);
                    this.setState({
                      addressbar: true,
                      latitude: details.geometry.location.lat,
                      longitude: details.geometry.location.lng,
                      address_get: details.formatted_address,
                    });
                    // return this.props.locationget(data2);
                  }}
       
                  query={{
                    // available options: https://developers.google.com/places/web-service/autocomplete
                    key: config.mapkey,
                    language: config.maplanguage, // language of the results
                    //  types: '(cities)',  default: 'geocode'
                  }}
                  styles={{
                    textInputContainer: {
                      backgroundColor: Colors.white_color,
                      marginTop: (2 * mobileH) / 100,
                      //  borderWidth:1,
                      // boderColor:'gray',
                      alignSelf: 'center',
                      height: (mobileH * 7) / 100,
                      width: (mobileW * 92) / 100,
                      alignItems: 'center',
                      elevation: 3,
                      shadowColor: '#000',
                      shadowOffset: {width: 1, height: 1},
                      shadowOpacity: 0.3,
                      justifyContent: 'center',
                      borderRadius: (mobileW * 2) / 100,
                      color: Colors.black_color,
                    },
                    textInput: {
                      // marginLeft: 7,
                      // marginRight: 10,
                      textAlign: 'left',
                      height: (mobileH * 5) / 100,
                      width: mobileW,
                      //borderRadius: 10,
                      backgroundColor: Colors.white_color,
                      color: '#5d5d5d',
                      fontSize: (mobileW * 4) / 100,
                    },
                    predefinedPlacesDescription: {
                      color: '#1faadb',
                    },
                    description: {
                      fontFamily: Font.Fontregular,
                      color: Colors.black_color,
                    },
                    container: {
                      borderRadius: 10,
                    },
                    poweredContainer: {
                      backgroundColor: Colors.app_bl_ack,
                      borderRadius: 25,
                      color: '#FFFFFF',
                    },
                    listView: {
                      backgroundColor: '#FFFFFF',
                      color: Colors.black_color,
                      // marginTop: 30,
                      // borderWidth: 1,
                      //  boderColor: 'black'
                    },
                  }}
                  currentLocation={false} // Will add a 'Current location' button at the top of the predefined places list
                  currentLocationLabel="Current location"
                  nearbyPlacesAPI="GooglePlacesSearch" // Which API to use: GoogleReverseGeocoding or GooglePlacesSearch
                  GoogleReverseGeocodingQuery={
                    {
                      // available options for GoogleReverseGeocoding API : https://developers.google.com/maps/documentation/geocoding/intro
                    }
                  }
                  GooglePlacesSearchQuery={{
                    // available options for GooglePlacesSearch API : https://developers.google.com/places/web-service/search
                    rankby: 'distance',
                    types: 'food',
                  }}
                  filterReverseGeocodingByTypes={[
                    'locality',
                    'administrative_area_level_3',
                    'postal_code',
                    'sublocality',
                    'country',
                  ]} // filter the reverse geocoding results by types - ['locality', 'administrative_area_level_3'] if you want to display only cities

                  debounce={100}
                  renderLeftButton={() => (
                    <Image
                      resizeMode="contain"
                      source={localimag.grey_search}
                      style={{
                        width: (mobileW * 6) / 100,
                        height: (mobileW * 6) / 100,
                        alignSelf: 'center',
                        paddingRight: 10,
                        marginLeft: (mobileW * 3) / 100,
                        bottom: 1.5,
                      }}
                    />
                  )}
                  renderRightButton={() =>
                    config.device_type == 'android' ? (
                      <TouchableOpacity
                        activeOpacity={0.7}
                        style={{alignSelf: 'center', paddingRight: 10}}
                        onPress={() => {
                          this.GooglePlacesRef.setAddressText('');
                          this.setState({
                            addressselected: 'search',
                            address: '',
                            address_get: '',
                          });
                        }}>
                        <Image
                          style={{
                            alignSelf: 'center',
                            width: (mobileW * 6) / 100,
                            height: (mobileW * 6) / 100,
                          }}
                          source={localimag.cancel}></Image>
                      </TouchableOpacity>
                    ) : null
                  }

    
                />
              </View>
            </View>
          </View>
        )}
        <View
          style={{
            position: 'absolute',
            bottom: (mobileH * 0) / 100,
            width: mobileW,
          }}>
          <HideWithKeyboard>
            <TouchableOpacity
              activeOpacity={0.7}
              style={{
                width: (mobileW * 15) / 100,
                alignSelf: 'flex-end',
                marginRight: (mobileW * 3) / 100,
                bottom: (mobileH * 5) / 100,
              }}
              onPress={() => {
                this.getlatlong();
              }}>
              <Image
                resizeMode="contain"
                style={{
                  width: (mobileW * 12) / 100,
                  height: (mobileW * 12) / 100,
                }}
                source={localimag.locate_shadow1}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                var getadd = this.GooglePlacesRef.getAddressText();
                var address_get = this.state.address_get;

                consolepro.consolelog({getadd, address_get});
                if (getadd == '' || address_get == '') {
                  msgProvider.toast(
                    Lang_chg.emptyCurrentaddress[config.language],
                    'top',
                  );
                  return false;
                }

                this.continue_btn();
              }}
              activeOpacity={0.7}
              style={{
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
                  width: (mobileW * 90) / 100,
                  alignSelf: 'center',
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: (mobileW * 1.5) / 100,
                }}>
                <Text
                  style={{
                    color: '#f5f4f5',
                    fontFamily: Font.FontBold,
                    fontSize: (mobileW * 4.3) / 100,
                  }}>
                  {Lang_chg.Continue_txt[config.language]}
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          </HideWithKeyboard>
        </View>
      </SafeAreaView>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  button: {
    backgroundColor: '#00a1e4',
    width: 180,
    borderRadius: 45,
    paddingVertical: 10,
  },
  searchbutton: {
    backgroundColor: '#00a1e4',

    borderRadius: 45,
    paddingVertical: 11,
    marginTop: 20,
    marginBottom: 8,
    textAlign: 'center',
    color: '#FFFFFF',
    position: 'absolute',
    bottom: 10,
    width: '80%',
    alignSelf: 'center',
  },
  searchbar: {
    flexDirection: 'row',
    width: '80%',
    marginHorizontal: 20,
    backgroundColor: '#FFFFFF',
    marginTop: 10,
    marginRight: 10,
    elevation: 10,
    borderRadius: 15,
    alignSelf: 'center',
    shadowOffset: {
      height: 7,
      width: 0,
    },
    shadowColor: 'rgba(0,0,0,1)',
    shadowOpacity: 0.49,
    shadowRadius: 5,
  },
});
