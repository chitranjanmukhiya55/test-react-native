import {
  BackHandler,
  Linking,
  Alert,
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  ImageBackground,
  Image,
  Modal,
  StatusBar,
  FlatList,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React, {Component} from 'react';
import {
  Colors,
  config,
  mobileH,
  mobileW,
  Font,
  localStorage,
  Lang_chg,
  notification,
  localimag,
  consolepro,
  msgProvider,
  apifuntion,
  handleback,
  msgTitle,
} from '../../Provider/utilslib/Utils';
import LinearGradient from 'react-native-linear-gradient';
export default class Add_card extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user_id: '',
      stripe_card_id: 0,
      customer_id: '',
      card_id: '',
      token: '',
      exp_month: '',
      exst4: '',
      cap_year: '',
      lard_arr: 'NA',
      card_arr: 'NA',
      pay_amount: this.props.route.params.pay_amount,
      item: this.props.route.params.item,
      // job_payment_id: this.props.route.params.job_payment_id,
      // type: this.props.route.params.type,
      descriptor_suffix: 'Job payment',
      transaction_id: '',
    };
  }
  async componentDidMount() {
    this._willBlurSubscription = this.props.navigation.addListener(
      'blur',
      payload =>
        BackHandler.removeEventListener(
          'hardwareBackPress',
          this.handleBackPress,
        ),
    );
    var user_id = await localStorage.getItemString('user_id');
    consolepro.consolelog('user_id-----', user_id);
    this.setState({user_id: user_id});
    this.focusListener = this.props.navigation.addListener('focus', () => {
      this.get_card(0);
    });
    this.get_card(1);
  }

  get_card = async page => {
    consolepro.consolelog('I am in get card');
    let user_details = await localStorage.getItemObject('user_arr');

    let user_id = user_details.user_id;

    let url =
      config.baseURL + 'stripe_payment/get_stripe_card.php?user_id=' + user_id;

    consolepro.consolelog('url', url);

    apifuntion
      .getApi(url, page)
      .then(obj => {
        if (obj.success == 'true') {
          console.log('obj', obj);
          this.setState({
            card_arr: obj.card_arr,
            last4: obj.card_arr.last4,
            exp_year: obj.card_arr.exp_year,
            exp_month: obj.card_arr.exp_month,
            stripe_card_id: obj.card_arr.stripe_card_id,
            customer_id: obj.card_arr.customer_id,
            token: obj.card_arr.token,
          });
          console.log('obj.posted_job_arr mus', obj.card_arr);
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
            }, 300);
          }
          return false;
        }
      })
      .catch(error => {
        console.log('-------- error ------- ' + error);
      });
  };
  add_card_payment = async () => {
    let user_details1 = await localStorage.getItemObject('user_arr');
    let url = config.baseURL + 'stripe_payment/payment_using_card_id.php';
    var data = new FormData();
    data.append('user_id', user_details1.user_id);
    data.append('card_token_id', this.state.card_arr.token);
    data.append('customer_id', this.state.card_arr.customer_id);
    data.append('amount', this.state.pay_amount);
    data.append('descriptor_suffix', this.state.descriptor_suffix);
    consolepro.consolelog('dataaa', data);
    consolepro.consolelog('url', url);
    apifuntion
      .postApi(url, data)
      .then(obj => {
        consolepro.consolelog('Addcard123', obj);

        if (obj.success == 'true') {
          consolepro.consolelog('obj', obj);
          consolepro.consolelog('transaction_id', obj.transactions_id);
          this.setState({
            transaction_id: obj.transactions_id,
            user_id: this.state.user_id,
          });
          this.confirmPayButton(obj.transactions_id);
          //------next navigation
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
            }, 300);
          }
          return false;
        }
      })
      .catch(err => {
        consolepro.consolelog('err', err);
      });
  };

  async confirmPayButton(transactions_id) {
    var user_arr = await localStorage.getItemObject('user_arr');
    var user_id = user_arr.user_id;
    let url = config.baseURL + 'user_confirm_pay.php';
    let data = new FormData();
    data.append('user_id', user_id);
    data.append('event_id', this.state.item.event_id);
    data.append('amount', this.state.pay_amount);
    data.append('transaction_id', transactions_id);
    consolepro.consolelog('datadata', data);
    consolepro.consolelog('url', url);
    // return false
    apifuntion
      .postApi(url, data)
      .then(obj => {
        consolepro.consolelog('obj event_idevent_idevent_id', obj);
        if (obj.success == 'true') {
          this.props.navigation.navigate(
            'ProposedEventAccpetedRejectedSuccess',
            {transactions_id: transactions_id, item: this.state.item},
          );
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
  
  async delete_click() {
    var user_arr = await localStorage.getItemObject('user_arr');
    var user_id = user_arr.user_id;
    let url = config.baseURL + 'stripe_payment/delete_stripe_card.php';
    let data = new FormData();
    data.append('user_id', user_id);
    data.append('stripe_card_id', this.state.stripe_card_id);

    consolepro.consolelog('datadata', data);
    consolepro.consolelog('url', url);
    // return false
    apifuntion
      .postApi(url, data)
      .then(obj => {
        consolepro.consolelog('obj event_idevent_idevent_id', obj);
        if (obj.success == 'true') {
          this.get_card(1);
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
  render() {
    return (
      <SafeAreaView>
        <StatusBar
          hidden={false}
          backgroundColor={Colors.whiteColor}
          translucent={false}
          barStyle="dark-content"
          networkActivityIndicatorVisible={true}
        />

        {/* ----------------------------------header -------------------- */}
      
        <View style={{alignItems: 'center', alignSelf: 'center'}}>
          <LinearGradient
            colors={[Colors.purple_color, Colors.light_greencolor]}
            start={{x: 1, y: 0}}
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
        {this.state.card_arr == 'NA' && (
          <TouchableOpacity
            activeOpacity={1}
            onPress={() =>
              this.props.navigation.navigate('Payment_savecard', {
                pay_amount: this.state.pay_amount,
              })
            }
            style={{
              width: (mobileW * 80) / 100,
              alignSelf: 'center',
              marginTop: (mobileW * 6) / 100,
              borderRadius: (mobileW * 1) / 100,
            }}>
            <LinearGradient
              colors={[Colors.purple_color, Colors.light_greencolor]}
              start={{x: 1, y: 0}}
              end={{x: 0, y: 0}}
              style={{
                height: (mobileH * 7) / 100,
                width: (mobileW * 80) / 100,
                borderRadius: (mobileW * 1) / 100,
                alignSelf: 'center',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                paddingVertical: (mobileW * 2) / 100,
              }}>
              <Text
                style={{
                  color: Colors.whiteColor,
                  textAlign: 'center',
                  fontSize: (mobileW * 4.5) / 100,
                  fontFamily: Font.FontBold,
                }}>
                {Lang_chg.yourCard_txt[config.language]}
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        )}
        {/* =============================card ======================================================= */}
        {this.state.card_arr != 'NA' && (
          <View
            style={{
              width: (mobileW * 90) / 100,
              alignSelf: 'center',
              marginTop: (mobileW * 5) / 100,
              borderRadius: (mobileW * 2) / 100,
              paddingVertical: (mobileW * 2) / 100,
              borderWidth: 2,
              borderColor: Colors.blue2_color,
            }}>
            <View
              style={{
                flexDirection: 'row',
                width: '90%',
                alignSelf: 'center',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <Image
                style={{width: 35, height: 35, resizeMode: 'contain'}}
                source={localimag.Mastercard_logo}></Image>
              <TouchableOpacity
                onPress={() => {
                  this.delete_click();
                }}>
                <Image
                  style={{
                    width: 22,
                    height: 22,
                    resizeMode: 'contain',
                    tintColor: 'red',
                  }}
                  source={localimag.bin}></Image>
              </TouchableOpacity>
            </View>

            <Text
              style={{
                marginTop: (mobileH * 3) / 100,
                fontSize: (mobileW * 4.7) / 100,
                color: Colors.black_color,
                fontFamily: Font.FontBold,
                width: '90%',
                alignSelf: 'center',
              }}>
              **************{this.state.last4}
            </Text>
            <View
              style={{
                marginTop: (mobileH * 3) / 100,
                flexDirection: 'row',
                width: '90%',
                alignSelf: 'center',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  fontSize: (mobileW * 4.7) / 100,
                  color: Colors.black_color,
                  fontFamily: Font.FontBold,
                  width: '96%',
                  alignSelf: 'center',
                }}>
                {this.state.exp_month}/{this.state.exp_year}
              </Text>
              <Image
                style={{
                  width: 30,
                  height: 30,
                  resizeMode: 'contain',
                  alignSelf: 'flex-end',
                  right: 15,
                }}
                source={localimag.credit_icon}></Image>
            </View>
          </View>
        )}

        {this.state.card_arr != 'NA' && (
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => this.add_card_payment()}
            style={styles.login_btn}>
            <LinearGradient
              colors={[Colors.purple_color, Colors.light_greencolor]}
              start={{x: 1, y: 0}}
              end={{x: 0, y: 0}}
              style={{
                height: (mobileH * 7) / 100,
                width: (mobileW * 79) / 100,
                borderRadius: (mobileW * 1) / 100,
                alignSelf: 'center',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                paddingVertical: (mobileW * 2) / 100,
              }}>
              <Text
                style={{
                  color: Colors.whiteColor,
                  textAlign: 'center',
                  fontSize: (mobileW * 4.5) / 100,
                  fontFamily: Font.FontPoppinsBold,
                }}>
                {Lang_chg.contine_txt[config.language]}
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        )}
      </SafeAreaView>
    );
  }
}
const styles = StyleSheet.create({
  login_btn: {
    width: (mobileW * 80) / 100,
    alignSelf: 'center',
    marginTop: (mobileW * 6) / 100,
    borderRadius: (mobileW * 1) / 100,
  },
});
