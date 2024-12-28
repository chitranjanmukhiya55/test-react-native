import React, {Component} from 'react';
import {Text, View, Image, StyleSheet, StatusBar} from 'react-native';
import {
  config,
  msgProvider,
  localStorage,
  apifuntion,
  msgText,
  msgTitle,
  consolepro,
  Font,
  Colors,
  mobileH,
  mobileW,
  localimag,
  firebaseprovider,
} from './utilslib/Utils';
import OneSignal from 'react-native-onesignal';
// import auth from '@react-native-firebase/auth';
global.content_arr = 'NA';
global.notification_count_1 = 0;
global.bankPage = 0;
global.global_user_address = '';
global.global_user_address_lat = 0;
global.global_user_address_long = 0;
export default class Splash extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      player_id: '',
      isConnected: true,
    };

    /* O N E S I G N A L   S E T U P */
    OneSignal.setAppId(config.onesignalappid);
    OneSignal.setLogLevel(6, 0);
    OneSignal.setRequiresUserPrivacyConsent(false);
    OneSignal.promptForPushNotificationsWithUserResponse(response => {
      //this.OSLog("Prompt response:", response);
      // consolepro.consolelog("Prompt response:", response);
    });
  }

  //----------for auth start ----------------------//
  firstlogin = async () => {
    auth()
      .createUserWithEmailAndPassword(config.demoemail, config.password)
      .then(user => {
        consolepro.consolelog('user199', user);
        console.log('User account created & signed in!');
      })
      .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
          console.log('That email address is already in use!');
          this.loginbtn();
        }

        if (error.code === 'auth/invalid-email') {
          console.log('That email address is invalid!');
        }

        console.error(error);
      });
  };

  loginbtn = () => {
    auth()
      .signInWithEmailAndPassword(config.demoemail, config.password)
      .then(user => {
        // consolepro.consolelog('user199', user)
        console.log('User account created & signed in!');
      })
      .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
          console.log('That email address is already in use!');
          //this.loginbtn()
        }

        if (error.code === 'auth/invalid-email') {
          console.log('That email address is invalid!');
        }

        console.error(error);
      });
  };
  //----------for auth end ----------------------//

  async componentDidMount() {
    this.firstlogin();
    firebaseprovider.getAllUsers();
    //--------for one signal start ----------
    // consolepro.consolelog("helllllllllllllllllllllll")
    OneSignal.addEmailSubscriptionObserver(event => {
      // consolepro.consolelog("OneSignal: email subscription changed:", event);
    });
    OneSignal.addSubscriptionObserver(event => {
      // consolepro.consolelog("OneSignal: subscription changed:", event);
    });
    OneSignal.addPermissionObserver(event => {
      // consolepro.consolelog("addPermissionObserver", event);
    });

    var interval = setInterval(async () => {
      await OneSignal.getDeviceState()
        .then(state => {
          // consolepro.consolelog({ state })
          // consolepro.consolelog('hii player', state.userId)
          if (state.isSubscribed == true) {
            clearInterval(interval);
          }
          player_id_me1 = state.userId;
        })
        .catch(error => {
          consolepro.consolelog({error});
        });
    }, 500);

    //--------for one signal end ----------

    setTimeout(() => {
      consolepro.consolelog('id', player_id_me1);
      this.authenticateSession();
    }, 2000);
  }
  authenticateSession = async () => {
    //this.props.navigation.navigate('Home')
    // this.props.navigation.navigate('Login')
    //return false

    let result = await localStorage.getItemObject('user_arr');
    consolepro.consolelog('splasedata', result);
    if (result != null) {
      if (result.login_type == 'app') {
        if (result.otp_verify == 1) {
          if (result.profile_complete == 1) {
            let password = await localStorage.getItemString('password');
            let url = config.baseURL + 'login.php';
            var data = new FormData();
            data.append('email', result.email);
            data.append('password', password);
            data.append('login_type', config.login_type);
            data.append('device_type', config.device_type);
            data.append('player_id', player_id_me1);

            consolepro.consolelog('data', data);
            apifuntion
              .postApi(url, data, 1)
              .then(obj => {
                consolepro.consolelog('user_arr', obj);
                // alert(JSON.stringify(obj))
                if (obj.success == 'true') {
                  var user_arr = obj.user_details;
                  var user_id = user_arr.user_id;
                  var mobile = user_arr.mobile;
                  localStorage.setItemString(
                    'user_id',
                    JSON.stringify(user_id),
                  );
                  localStorage.setItemObject('user_arr', user_arr);
                  localStorage.setItemString('mobile', mobile);
                  if (result.user_type == 1) {
                    this.props.navigation.navigate('Home');
                  } else {
                    this.props.navigation.navigate('VendorHome');
                  }
                  setTimeout(() => {
                    firebaseprovider.firebaseUserCreate();
                  }, 1500);
                  // firebaseprovider.getMyInboxAllData();
                  firebaseprovider.getMyInboxAllDataBooking();
                } else {
                  msgProvider.toast(
                    msgTitle.information[config.language],
                    obj.msg[config.language],
                    false,
                  );
                  this.props.navigation.navigate('Login');
                  return false;
                }
              })
              .catch(error => {
                consolepro.consolelog('-------- error ------- ' + error);
              });
          } else {
            this.props.navigation.navigate('Login');
          }
        } else {
          this.props.navigation.navigate('Login');
        }
      } else {
        //this.props.navigation.navigate('ChooseUser')

        let login_type = result.login_type;
        var profile_complete = result.profile_complete;

        if (profile_complete == 1) {
          let id = '';
          if (login_type == 'apple') {
            id = result.apple_id;
          } else if (login_type == 'google') {
            id = result.google_id;
          }
          {
            var data = new FormData();
            data.append('social_email', result.email);
            data.append('social_id', id);
            data.append('device_type', config.device_type);
            data.append('player_id', player_id_me1);
            data.append('social_type', result.login_type);
            localStorage.setItemObject('socialdata', result);
            var url = config.baseURL + 'social_login.php';
            console.log('home', data);
            console.log('url', url);

            apifuntion
              .postApi(url, data, 1)
              .then(obj => {
                console.log(obj);
                if (obj.success == 'true') {
                  if (obj.user_exist == 'yes') {
                    var user_arr = obj.user_details;
                    var user_id = user_arr.user_id;
                    var mobile = user_arr.mobile;
                    localStorage.setItemString(
                      'user_id',
                      JSON.stringify(user_id),
                    );
                    localStorage.setItemObject('user_arr', user_arr);
                    localStorage.setItemString('mobile', mobile);
                    firebaseprovider.firebaseUserCreate();
                    if (result.user_type == 1) {
                      this.props.navigation.navigate('Home');
                    } else {
                      this.props.navigation.navigate('VendorHome');
                    }
                  } else {
                    this.props.navigation.navigate('Login');
                  }
                } else {
                  this.props.navigation.navigate('Login');
                }
              })
              .catch(error => {
                console.log('-------- error ------- ' + error);
                this.props.navigation.navigate('Login');
              });
          }
        } else {
          this.props.navigation.navigate('Login');
        }
      }
    } else {
      this.props.navigation.navigate('Login');
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <StatusBar
          hidden={false}
          backgroundColor={Colors.whiteColor}
          translucent={false}
          barStyle="dark-content"
          networkActivityIndicatorVisible={true}
        />
        <View
          style={{
            flexDirection: 'row',
            alignSelf: 'center',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Image
            style={styles.logo}
            source={localimag.splash_with_logo}></Image>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.whiteColor,
  },
  logo: {
    resizeMode: 'contain',
    width: (mobileW * 100) / 100,
  },
});
