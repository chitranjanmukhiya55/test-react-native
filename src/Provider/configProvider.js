import {Platform} from 'react-native';
import base64 from 'react-native-base64';
import {
  msgProvider,
  localStorage,
  msgText,
  msgTitle,
  apifuntion,
  consolepro,
} from './utilslib/Utils';
// import firebase from 'firebase'
// import {
//     GoogleSignin,
//    } from 'react-native-google-signin';

global.player_id_me1 = '123456';
//--------------------------- Config Provider Start -----------------------
class configProvider {
  baseURL = 'https://budgetbashes.com/app/webservice/';
  img_url = 'https://budgetbashes.com/app/webservice/images/';
  img_url1 = 'https://budgetbashes.com/app/webservice/images/';
  img_url2 = 'https://budgetbashes.com/app/webservice/images/';
  img_url3 = 'https://budgetbashes.com/app/webservice/images/';
  login_type = 'app';
  onesignalappid = '60a60064-d111-4ac7-a7c4-e8b9e220a25d';
  oneSignalAuthorization = 'M2M0MjMzZGYtZjY1ZC00NjgwLWI0YzctOGZiNTkxNjlmY2Q2';
  firebaseServerKey =
    'AAAAmZnfzRc:APA91bFjsXn52u6PYy1BtotOFEsfkXCuTZNwJkyPKTylD96O1n_ejrNgAKMtm5JapttXsfn0COrKm6gt_RGcXCHF_p4G_jdPBxW_aJ2DqHaIe2V1bFHFeoVEkwUU0VtWeAbnkVpPtRFR';
  mapkey = 'AIzaSyA2FRQ4Vy_5fbpyCkvZ0mOdEFFAy10vz4s';
  maplanguage = 'en';
  language = 0;
  player_id = '123456';
  player_id_me = '123456';
  device_type = Platform.OS;
  loading_type = false;
  latitude = 37.09024;
  longitude = -95.712891;
  country_code = '(+1)';
  demoemail = 'demo@mailinator.com';
  password = '123456';
  namevalidation = /^[^-\s][a-zA-Z0-9_\s-]+$/;
  letters_pas = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/;
  emailvalidation =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  mobilevalidation = /^[0-9\_]+$/;
  amountvalidation = /^[0-9\_.]+$/;
  passwordvalidation = /^\S{3,}$/;
  messagevalidation = /^[^-\s][a-zA-Z0-9_\s- ,]+$/;
  url_validation = new RegExp('^(http|https)://', 'i');
  textalign = 'right';
  app_status = 1; //---0=prototype,1=dynamic
  appname = 'Demo';
  headersapi = {
    Authorization:
      'Basic ' +
      base64.encode(base64.encode('mario') + ':' + base64.encode('carbonell')),
    Accept: 'application/json',
    'Content-Type': 'multipart/form-data',
    'Cache-Control': 'no-cache,no-store,must-revalidate',
    Pragma: 'no-cache',
    Expires: 0,
  };
  GetPlayeridfunctin = player_id => {
    player_id_me1 = player_id;
  };

  checkUserDeactivate = async navigation => {
    msgProvider.toast(msgText.accountDeactivated[config.language], 'long');
    setTimeout(() => {
      this.AppLogout(navigation);
    }, 200);
    return false;
  };
  AppLogout = async navigation => {
    console.log('AppLogout');

    if (this.app_status == 0) {
      navigation.navigate('Login');
    } else {
      //----------------------- if get user login type -------------
      var userdata = await localStorage.getItemObject('user_arr');
      var password = await localStorage.getItemString('password');
      var email = await localStorage.getItemString('email');
      var remember_me = await localStorage.getItemString('remember_me');
      var language = await localStorage.getItemObject('language');
      var languagecathc = await localStorage.getItemObject('languagecathc');
      var languagesetenglish = await localStorage.getItemObject(
        'languagesetenglish',
      );
      //var id = 'u_' + userdata.user_id;
      //var queryOffinbox = firebase.database().ref('users/' + id + '/myInbox/');
      ////queryOff.off('child_added');
      //queryOffinbox.off();
      //// var queryOffLoginUsers = firebase.database().ref('users');
      ////  queryOffLoginUsers.off();

      //FirebaseInboxJson = [];

      console.log(password);
      console.log(email);
      console.log(remember_me);
      console.log(language);

      if (userdata != null) {
        if (userdata.login_type == 'app') {
          localStorage.clear();
          if (remember_me == 'yes') {
            localStorage.setItemString('password', password);
            localStorage.setItemString('email', email);
            localStorage.setItemString('remember_me', remember_me);
          } else {
            localStorage.setItemString('password', password);
            localStorage.setItemString('email', email);
          }
          localStorage.setItemObject('language', language);
          localStorage.setItemObject('languagecathc', languagecathc);
          localStorage.setItemObject('languagesetenglish', languagesetenglish);
          navigation.navigate('Login');
        } else if (userdata.login_type == 'facebook') {
          console.log('face boook login');
          LoginManager.logOut();
          localStorage.clear();
          localStorage.setItemObject('language', language);
          localStorage.setItemObject('languagecathc', languagecathc);
          localStorage.setItemObject('languagesetenglish', languagesetenglish);
          navigation.navigate('Login');
        } else if (userdata.login_type == 'google') {
          console.log('google login');
          try {
            await GoogleSignin.revokeAccess();
            await GoogleSignin.signOut();
          } catch (error) {
            consolepro.consolelog({error});
            //alert(error);
          }
          localStorage.clear();
          localStorage.setItemObject('language', language);
          localStorage.setItemObject('languagecathc', languagecathc);
          localStorage.setItemObject('languagesetenglish', languagesetenglish);
          navigation.navigate('Login');
        } else if (userdata.login_type == 'apple' || userdata.login_type == 2) {
          console.log('apple login');
          navigation.navigate('Login');
          localStorage.clear();
        } else if (userdata.login_type == 5) {
          console.log('face boook login');
        }
      } else {
        console.log('user arr not found');
      }
    }
  };

  //-----------------------email send function--------------
  mailsendfunction = email_arr => {
    console.log('email_arr', email_arr);
    for (let i = 0; i < email_arr.length; i++) {
      var email = email_arr[i].email;
      var mailcontent = email_arr[i].mailcontent;
      var mailsubject = email_arr[i].mailsubject;
      var fromName = email_arr[i].fromName;
      var url = this.baseURL + 'mailFunctionsSend.php';
      var data = new FormData();
      data.append('email', email);
      data.append('mailcontent', mailcontent);
      data.append('mailsubject', mailsubject);
      data.append('fromName', fromName);
      data.append('mail_file', 'NA');
      consolepro.consolelog('verification==', data);

      // api calling start==============================
      apifuntion.postApi(url, data, 1).then(obj => {
        consolepro.consolelog('email_arr', obj);

        if (obj.success == 'true') {
          consolepro.consolelog('Response', 'Mail Send Success');
        } else {
          consolepro.consolelog('Response', 'mail not send');
        }
        // api calling end==============================
      });
    }
  };
}
//--------------------------- Config Provider End -----------------------

export const config = new configProvider();
