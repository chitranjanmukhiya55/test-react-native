import React from 'react';
import OneSignal from 'react-native-onesignal';
import {config} from './configProvider';
import {localStorage} from './localStorageProvider';
import {msgProvider, msgTitle, msgText} from './messageProvider';
import {notification} from './NotificationProvider';
global.propsnavigation;
class Pushnotificationredirection {
  //----------------- message buttons
  constructor() {}
  redirectfun(props) {
    propsnavigation = props;
    OneSignal.setNotificationOpenedHandler(notification => {
      console.log('notification', notification);
      this.onOpened(notification);
    });
  }

  onOpened = async openResult => {
    let navigation = propsnavigation;
    console.log('openResult: ', openResult.notification.additionalData);

    var datajson = openResult.notification.additionalData.action_json;
    var user_id = datajson.user_id;
    var other_user_id = datajson.other_user_id;
    var action_id = datajson.action_id;
    var action = datajson.action;
    var title = datajson.title;
    var userdata = await localStorage.getItemObject('user_arr');
    console.log('datajson_user_id', datajson.user_id);

    if (userdata.user_id == other_user_id) {
      other_user_id = datajson.user_id;
    }
    if (userdata != null) {
      console.log('navigation run');
      if (action == 'request' || action == 'rating') {
        navigation.navigation.navigate('VendorBirthdayHome', {item: action_id});
      } else {
        if (action == 'chat_booking') {
          var image = datajson.image;
          if (image != null) {
            image = config.img_url3 + image;
          }
          navigation.navigation.navigate('ChatBooking', {
            chatdata: {
              other_user_id: datajson.user_id,
              booking_id: datajson.booking_id,
              booking_number: datajson.booking_number,
              other_user_name: datajson.SenderName,
              image: image,
              blockstatus: 'no',
            },
          });
        }
      }
    } else {
      navigation.navigation.navigate('Login');
    }
  };
}

export const pushnotification = new Pushnotificationredirection();
