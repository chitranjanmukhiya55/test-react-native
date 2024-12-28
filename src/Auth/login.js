import React, {Component} from 'react';
import {
  Text,
  BackHandler,
  SafeAreaView,
  StatusBar,
  ImageBackground,
  Alert,
  View,
  StyleSheet,
  Keyboard,
  TouchableOpacity,
  Image,
  TextInput,
} from 'react-native';
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
} from '../Provider/utilslib/Utils';
import Fontisto from 'react-native-vector-icons/Fontisto';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import LinearGradient from 'react-native-linear-gradient';

class Login extends Component {
  _didFocusSubscription;
  _willBlurSubscription;
  constructor(props) {
    super(props);

    this.state = {
      //predefined don't change
      securetext: true,
      remember_me: false,
      email: '',
      password: '',
      //your variable start here
    };
    this._didFocusSubscription = props.navigation.addListener(
      'focus',
      payload =>
        BackHandler.addEventListener('hardwareBackPress', this.handleBackPress),
    );
  }
  componentDidMount() {
    this.checkRememberMe();
    this._willBlurSubscription = this.props.navigation.addListener(
      'blur',
      payload =>
        BackHandler.removeEventListener(
          'hardwareBackPress',
          this.handleBackPress,
        ),
    );
  }
  //-------do not change ------------//
  //--------------remember me check function---------------------
  checkRememberMe = async () => {
    var remember_me = await localStorage.getItemString('remember_me');
    consolepro.consolelog('rememberme', remember_me);
    if (remember_me == 'yes') {
      let email = await localStorage.getItemString('email');
      let password = await localStorage.getItemString('password');
      consolepro.consolelog('email', email);
      consolepro.consolelog('password', password);
      this.setState({
        email: email,
        password: password,
        remember_me: true,
      });
    } else {
      this.setState({
        email: '',
        password: '',
        remember_me: false,
      });
    }
  };
  //    for backhandler
  handleBackPress = () => {
    Alert.alert(
      Lang_chg.go_back_txt[config.language],
      Lang_chg.do_you_want_exit_txt[config.language],
      [
        {
          text: Lang_chg.no_txt[config.language],
          onPress: () => consolepro.consolelog('Cancel Pressed'),
        },
        {
          text: Lang_chg.yes_txt[config.language],
          onPress: () => BackHandler.exitApp(),
        },
      ],
      {
        cancelable: false,
      },
    ); // works best when the goBack is async
    return true;
  };
  // for password hide show
  eyepress = () => {
    if (this.state.securetext) {
      this.setState({securetext: false});
    } else {
      this.setState({securetext: true});
    }
  };
  // for remember me
  remember_me = () => {
    if (this.state.remember_me) {
      this.setState({remember_me: false});
    } else {
      this.setState({remember_me: true});
    }
  };
  //-------function for login start---
  loginBtn = () => {
    Keyboard.dismiss();
    if (config.app_status == 0) {
      //----for prototype----------//
      consolepro.consolelog('iam prototype');
      this.props.navigation.navigate('Home');
      return false;
    } else {
      //----for dynamic----------//
      consolepro.consolelog('iam dynamic');
      let {email, password, remember_me} = this.state;
      consolepro.consolelog({email, password, remember_me});

      //======================================email============================
      if (email.length <= 0) {
        msgProvider.toast(msgText.emptyEmail[config.language], 'center');
        return false;
      }
      var reg = config.emailvalidation;
      if (reg.test(email) !== true) {
        msgProvider.toast(msgText.validEmail[config.language], 'center');
        return false;
      }
      //=====================================password===================
      if (password.length <= 0) {
        msgProvider.toast(msgText.emptyPassword[config.language], 'center');
        return false;
      }
      if (password.length <= 5) {
        msgProvider.toast(msgText.passwordMinLength[config.language], 'center');
        return false;
      }
      let url = config.baseURL + 'login.php';
      var data = new FormData();
      data.append('email', email);
      data.append('password', password);
      data.append('login_type', config.login_type);
      data.append('device_type', config.device_type);
      data.append('player_id', player_id_me1);

      consolepro.consolelog('data', data);
      consolepro.consolelog('url', url);
      apifuntion
        .postApi(url, data)
        .then(obj => {
          consolepro.consolelog('user_arr', obj);

          if (obj.success == 'true') {
            var user_arr = obj.user_details;
            var user_id = user_arr.user_id;
            var email_arr = obj.email_arr;
            var otp_verfiy = user_arr.otp_verify;
            if (remember_me) {
              localStorage.setItemString('remember_me', 'yes');
            } else {
              localStorage.setItemString('remember_me', 'no');
            }
            localStorage.setItemString('user_id', JSON.stringify(user_id));
            localStorage.setItemObject('user_arr', user_arr);
            localStorage.setItemString('password', this.state.password);
            localStorage.setItemString('email', this.state.email);
            setTimeout(() => {
              firebaseprovider.firebaseUserCreate();
            }, 1500);
            // firebaseprovider.getMyInboxAllData();
            firebaseprovider.getMyInboxAllDataBooking();
            if (otp_verfiy == 1) {
              this.props.navigation.navigate('Home');
            } else {
              //-------otp page redirection here....
              this.props.navigation.navigate('OtpVerification');
            }
          } else {
            if (obj.active_status == 0) {
              config.checkUserDeactivate(this.props.navigation);
              return false;
            }
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
  };

  //-------function for login end---

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

        <KeyboardAwareScrollView
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{width: mobileW}}
          keyboardShouldPersistTaps="handled">
          {/* //===========ImageBackground ======// */}
          <View style={{marginBottom: (mobileH * 1) / 100}}>
            <ImageBackground
              style={{
                width: (mobileW * 100) / 100,
                height: (mobileH * 37) / 100,
              }}
              resizeMode="cover"
              source={localimag.login_design_with_logo}></ImageBackground>
          </View>
          {/* //=========Signin text view==========// */}
          <View
            style={{
              width: (mobileW * 90) / 100,
              marginTop: (mobileH * 1) / 100,
              alignSelf: 'center',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text
              style={{
                fontFamily: Font.FontExtraBold,
                fontSize: (mobileW * 5.7) / 100,
                color: Colors.black_color,
              }}>
              {Lang_chg.sign_in_txt[config.language]}
            </Text>
            <Text
              style={{
                fontFamily: Font.FontSemiBold,
                fontSize: (mobileW * 4.3) / 100,
                color: Colors.black_color,
              }}>
              {Lang_chg.sign_in_to_your_reg_txt[config.language]}
            </Text>
          </View>

          <View
            style={{width: mobileW, alignItems: 'center', alignSelf: 'center'}}>
         


            {/* //=========Email===========// */}
            <View
              style={{
                width: (mobileW * 90) / 100,
                alignItems: 'center',
                alignSelf: 'center',
              }}>
              <View
                style={{
                  width: (mobileW * 90) / 100,
                  alignItems: 'flex-start',
                  marginTop: (mobileH * 3) / 100,
                }}>
                <Text
                  style={{
                    fontFamily: Font.FontBold,
                    color: Colors.black_color,
                    fontSize: (mobileW * 4) / 100,
                  }}>
                  Email
                </Text>
              </View>
              <LinearGradient
                colors={[Colors.bluegreen_color, Colors.voilet_color]}
                start={{x: 0, y: 0}}
                end={{x: 0, y: 1}}
                style={styles.linearGradient}>
                <View style={styles.innerContainer}>
                  <View
                    style={{
                      marginLeft: (mobileW * 2.5) / 100,
                      alignSelf: 'center',
                    }}>
                    <Image
                      resizeMode="contain"
                      style={{width: (mobileW * 5) / 100}}
                      source={localimag.email}></Image>
                  </View>
                  <View
                    style={{
                      borderEndWidth: 1,
                      borderColor: Colors.bluegreen_color,
                      alignItems: 'flex-start',
                      justifyContent: 'flex-start',
                      width: (mobileW * 3) / 100,
                      alignSelf: 'center',
                      height: (mobileH * 3.5) / 100,
                    }}>
                    <Text style={{}}></Text>
                  </View>
                  <TextInput
                    style={styles.buttonText}
                    placeholderTextColor={Colors.greyColor}
                    placeholder="Enter Email"
                    keyboardType="email-address"
                    returnKeyLabel="done"
                    returnKeyType="done"
                    ref={input => {
                      this.mobilefield = input;
                    }}
                    onSubmitEditing={() => {
                      Keyboard.dismiss();
                    }}
                    onFocus={() => {
                      this.setState({errorno: 0, activeinput: 1});
                    }}
                    onChangeText={txt => {
                      this.setState({email: txt});
                    }}
                    value={this.state.email}
                    maxLength={100}
                  />
                </View>
              </LinearGradient>

              {/* //=========Password======// */}

              <View
                style={{
                  width: (mobileW * 90) / 100,
                  alignItems: 'flex-start',
                  marginTop: (mobileH * 3) / 100,
                }}>
                <Text
                  style={{
                    fontFamily: Font.FontBold,
                    color: Colors.black_color,
                    fontSize: (mobileW * 4) / 100,
                  }}>
                  Password
                </Text>
              </View>
              <LinearGradient
                colors={[Colors.voilet_color, Colors.bluegreen_color]}
                start={{x: 0, y: 1}}
                end={{x: 0, y: 0}}
                style={styles.linearGradient}>
                <View style={styles.innerContainer}>
                  <View
                    style={{
                      marginLeft: (mobileW * 2.5) / 100,
                      alignSelf: 'center',
                    }}>
                    <Image
                      resizeMode="contain"
                      style={{width: (mobileW * 5) / 100}}
                      source={localimag.password}></Image>
                  </View>
                  <View
                    style={{
                      borderEndWidth: 1,
                      borderColor: Colors.bluegreen_color,
                      alignItems: 'flex-start',
                      justifyContent: 'flex-start',
                      width: (mobileW * 3) / 100,
                      alignSelf: 'center',
                      height: (mobileH * 3.5) / 100,
                    }}>
                    <Text style={{}}></Text>
                  </View>

                  <TextInput
                    style={styles.buttonText}
                    // style={{
                    //     fontFamily: Font.FontRegular, width: mobileW * 62 / 100, fontSize: mobileW * 4 / 100, backgroundColor: Colors.back_color,
                    //     // backgroundColor:'red',
                    //     marginLeft: mobileW * 2 / 100
                    // }}
                    secureTextEntry={this.state.securetext}
                    placeholderTextColor={Colors.greyColor}
                    placeholder="Password"
                    keyboardType="default"
                    returnKeyLabel="done"
                    returnKeyType="done"
                    ref={input => {
                      this.mobilefield = input;
                    }}
                    onSubmitEditing={() => {
                      Keyboard.dismiss();
                    }}
                    onFocus={() => {
                      this.setState({errorno: 0, activeinput: 1});
                    }}
                    onChangeText={txt => {
                      this.setState({password: txt});
                    }}
                    maxLength={16}
                  />
                  <TouchableOpacity
                    activeOpacity={0.7}
                    style={{justifyContent: 'center', alignSelf: 'center'}}
                    onPress={() => {
                      this.eyepress();
                    }}>
                    {this.state.securetext ? (
                      <Text
                        style={{
                          color: Colors.black_color,
                          fontFamily: Font.FontBold,
                          fontSize: (mobileW * 3.7) / 100,
                        }}>
                        {Lang_chg.Show_txt[config.language]}
                      </Text>
                    ) : (
                      <Text
                        style={{
                          color: Colors.black_color,
                          fontFamily: Font.FontBold,
                          fontSize: (mobileW * 3.7) / 100,
                        }}>
                        {Lang_chg.Hide[config.language]}
                      </Text>
                    )}
                  </TouchableOpacity>
                </View>
              </LinearGradient>
         
              {/* //=========Login Submit============// */}
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate('Home')}
   
                activeOpacity={0.7}
                style={{alignItems: 'center', alignSelf: 'center'}}>
                <LinearGradient
                  colors={[Colors.purple_color, Colors.light_greencolor]}
                  start={{x: 0, y: 1}}
                  end={{x: 1, y: 0}}
      
                  style={{
                    //backgroundColor: Colors.theme_color,
                    height: (mobileH * 6.7) / 100,
                    width: (mobileW * 90) / 100,
                    alignSelf: 'center',
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: (mobileW * 1.5) / 100,
                    marginTop: (mobileH * 3) / 100,
                  }}>
                  <Text
                    style={{
                      color: '#f5f4f5',
                      fontFamily: Font.FontBold,
                      fontSize: (mobileW * 4.3) / 100,
                    }}>
                    Sign In
                  </Text>
                </LinearGradient>
              </TouchableOpacity>
              {/* //======ForgotpasswordText=======// */}
              <View
                style={{
                  width: (mobileW * 85) / 100,
                  marginTop: (mobileH * 3) / 100,
                  flexDirection: 'row',
                  alignSelf: 'center',
                  justifyContent: 'center',
                }}>
                <TouchableOpacity
                  onPress={() =>
                    this.props.navigation.navigate('Forgotpassword')
                  }>
                  <Text
                    style={{
                      color: Colors.text_color2,
                      fontFamily: Font.FontBold,
                      fontSize: (mobileW * 3.9) / 100,
                      marginLeft: (mobileW * 2) / 100,
                    }}>
                    Forgot Password?
                  </Text>
                </TouchableOpacity>
              </View>

              {/* //=========OR======// */}
              <View
                style={{
                  alignSelf: 'center',
                  width: (mobileW * 78) / 100,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginTop: (mobileH * 3) / 100,
                  alignItems: 'center',
                }}>
                <View
                  style={{
                    height: (mobileW * 0.3) / 100,
                    backgroundColor: Colors.greyColor,
                    width: (mobileW * 32) / 100,
                  }}></View>
                <View style={{}}>
                  <Text
                    style={{
                      fontFamily: Font.FontSemiBold,
                      fontSize: (mobileW * 4.7) / 100,
                      color: Colors.black_color,
                    }}>
                    {Lang_chg.or_txt[config.language]}
                  </Text>
                </View>
                <View
                  style={{
                    height: (mobileW * 0.3) / 100,
                    backgroundColor: Colors.greyColor,
                    width: (mobileW * 32) / 100,
                  }}></View>
              </View>
            </View>
          </View>

          {/* //===========Google======// */}
          {/* {config.device_type=='android' && */}
          <View
            style={{
              width: (mobileW * 82) / 100,
              flexDirection: 'row',
              justifyContent: 'space-around',
              alignSelf: 'center'
            }}>
            <TouchableOpacity
              activeOpacity={0.7}
              style={{
                height: (mobileH * 7) / 100,
                width: '49%',
                alignSelf: 'center',
                borderColor: Colors.border_color,
                borderWidth: 2,
                justifyContent: 'center',
                alignItems: 'center',

                borderRadius: (mobileW * 2.5) / 100,
                marginTop: (mobileH * 3.5) / 100,
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  width: (mobileW * 17.5) / 100,
                  alignSelf: 'center',
                  justifyContent: 'center',
                }}>
                <View style={{}}>
                  <Image
                    style={styles.icon1s}
                    source={localimag.google}></Image>
                </View>

                <View
                  style={{
                    width: '100%',
                    justifyContent: 'center',
                    marginLeft: (mobileW * 1) / 100,
                  }}>
                  <Text
                    style={{
                      width: '90%',
                      color: Colors.black_color,
                      fontSize: (mobileW * 4.9) / 100,
                      fontFamily: Font.FontMedium,
                      textAlign: 'center',
                    }}>
                    {Lang_chg.signinwithgoogle_txt[config.language]}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>

            {/* //===========Facebook======// */}

            {/* 
                        <TouchableOpacity

                            activeOpacity={0.7} style={{

                                height: mobileH * 7 / 100,
                                width: '49%',
                                alignSelf: 'center',
                                borderColor: Colors.border_color,
                                borderWidth: 2,
                                justifyContent: 'center',
                                alignItems: 'center',

                                borderRadius: mobileW * 2.5 / 100,
                                marginTop: mobileH * 3.5 / 100
                            }}>


                            <View style={{ flexDirection: 'row', width: mobileW * 25 / 100, alignSelf: 'center', justifyContent: 'center' }}>


                                <View style={{}}>
                                    <Image style={styles.icon1s}
                                        source={localimag.facebook_1}>

                                    </Image>
                                </View>

                                <View style={{ width: '100%', justifyContent: 'center', marginLeft: mobileW * 1 / 100 }}>
                                    <Text style={{ width: '90%', color: Colors.black_color, fontSize: mobileW * 4.9 / 100, fontFamily: Font.FontMedium, textAlign: 'center' }}>
                                        {Lang_chg.signinwithfacebook_txt[config.language]}
                                    </Text>
                                </View>
                            </View>
                        </TouchableOpacity> */}
          </View>

          {/* //===========Create Account======// */}

          <View
            style={{
              alignItems: 'center',
              alignSelf: 'center',
              flexDirection: 'row',
              marginTop: (mobileH * 7) / 100,
              paddingBottom: (mobileW * 3) / 100,
            }}>
            <Text
              style={{
                color: Colors.black_color,
                fontFamily: Font.FontRegular,
                fontSize: (mobileW * 4.5) / 100,
              }}>
              {Lang_chg.dont_have_an_account_txt[config.language]}
            </Text>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('Signup')}
              activeOpacity={0.7}
              style={{
                marginLeft: (mobileW * 1) / 100,
              }}>
              <Text style={[styles.createaccount]}>
                {Lang_chg.createaccount_txt[config.language]}
              </Text>
            </TouchableOpacity>
          </View>
        </KeyboardAwareScrollView>
      </SafeAreaView>
    );
  }
}
export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.whiteColor,
  },
  view1: {
    backgroundColor: Colors.whiteColor,
    height: (mobileH * 8) / 100,

    flexDirection: 'row',
    width: (mobileW * 88) / 100,
    alignSelf: 'center',
    alignItems: 'center',
  },

  linearGradient: {
    marginTop: (mobileH * 1) / 100,
    height: (mobileH * 7) / 100,
    width: (mobileW * 90) / 100,
    borderRadius: (mobileW * 1.5) / 100, // <-- Outer Border Radius
  },
  innerContainer: {
    borderRadius: (mobileW * 1.5) / 100, // <-- Inner Border Radius
    flex: 1,
    margin: (mobileW * 0.4) / 100, // <-- Border Width
    backgroundColor: Colors.whiteColor,
    flexDirection: 'row',
    alignItems: 'flex-start',
    //justifyContent: 'center',
  },
  buttonText: {
    fontSize: (mobileW * 3.7) / 100,
    fontFamily: Font.FontRegular,
    marginLeft: (mobileW * 1.5) / 100,
    color: Colors.black_color,
    backgroundColor: Colors.whiteColor,
    paddingVertical: (mobileH * 1.8) / 100,
    width: (mobileW * 62) / 100,
    alignSelf: 'center',
    alignItems: 'center',
    // backgroundColor: 'transparent',
  },
  icon1s: {
    width: (mobileW * 6.5) / 100,
    height: (mobileW * 6.5) / 100,
    resizeMode: 'contain',
  },
  createaccount: {
    color: Colors.dark_greencolor,
    fontFamily: Font.FontBold,
    fontSize: (mobileW * 4.5) / 100,
  },
});
