import React, { Component } from 'react';
import { Text, View, Image, TextInput, StyleSheet, ScrollView, Switch, Modal, TouchableOpacity, Dimensions, Alert, FlatList, BackHandler } from 'react-native';

import { config, msgProvider, localStorage, apifuntion, msgText, msgTitle, Colors, mobileH, consolepro, mobileW, Font, Lang_chg } from './utilslib/Utils';
import Icon1 from 'react-native-vector-icons/Entypo'

const screenHeight = Math.round(Dimensions.get('window').height);
const screenWidth = Math.round(Dimensions.get('window').width);
let user_id = 0;
export default class Footer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      color: '',
      modalVisible1: false,
      loading: false,
      isConnected: true,
    }
    BackHandler.removeEventListener('hardwareBackPress',
      () => { return true });
  }
  componentDidMount() {
    // firebaseprovider.messagecountforfooter()
  }
  messagecountforfooter = async () => {

    console.log('getMyInboxAllDatagetinboxaccount');
    userdata = await localStorage.getItemObject('user_arr')
    //------------------------------ firbase code get user inbox ---------------
    if (userdata != null) {
      // alert("himanshu");
      var id = 'u_' + userdata.user_id;
      if (inboxoffcheck > 0) {
        console.log('getMyInboxAllDatainboxoffcheck');
        var queryOffinbox = firebase.database().ref('users/' + id + '/myInbox/').child(userChatIdGlobal);
        //queryOff.off('child_added');
        queryOffinbox.off('child_changed');
      }

      var queryUpdatemyinbox = firebase.database().ref('users/' + id + '/myInbox/');
      queryUpdatemyinbox.on('child_changed', (data) => {
        console.log('inboxkachildchange', data.toJSON())
        //  this.showUserInbox()
        firebaseprovider.firebaseUserGetInboxCount();
      })
    }
  }
  usercheckbtn = async (page) => {
    this.props.functionremove
    const navigation = this.props.navigation;
    let userdata = await localStorage.getItemObject('user_arr')
    console.log('userdata', userdata)
    if (userdata != null) {
      if (this.props.usertype == 1) {
        navigation.navigate(page)
      }
      else {
        if (userdata.profile_complete == 0 && userdata.otp_verify == 1) {
          for (let i = 0; i < this.props.footerpage.length; i++) {
            if (page == this.props.footerpage[i].name) {
              navigation.navigate(page)
            }
          }
        }
        else {
          this.setState({ modalVisible1: true })
        }
      }
    } else {
      navigation.navigate(page)
    }
  }
  Checkuser = async (page) => {
    // consolepro.consolelog({redirect_page_id})
    const navigation = this.props.navigation;
    consolepro.consolelog({ page })
    if (page == 'Einvites' || page == 'Home') {
      navigation.navigate(page)
    } else {
      if (this.props.GuestUser == true) {

        Alert.alert(
          Lang_chg.login_txt[config.language],
          Lang_chg.PleaseLoginFirst[config.language],
          [
            {
              text: msgTitle.cancel[0],
            },
            {
              text: msgTitle.ok[0],
              onPress: () => {
                localStorage.setItemObject('ContinueAsaGuest', false)
                this.props.navigation.navigate('Login')
                // redirect_page_id=0,
                // redirect_page='' 
              }
            },
          ],
          { cancelable: false },
        );
      } else {
        navigation.navigate(page)
      }
    }
  }


  render() {

    //console.log('this.props.color',this.props.color+'/n')
    const navigation = this.props.navigation;
    user_id = this.props.user_id;
    let footerwidth = parseInt(100 / this.props.footerpage.length)
    return (
      <View style={[style1.footercontainer, { backgroundColor: this.props.imagestyle1.backgroundColor }]}>

        <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.modalVisible1}
          onRequestClose={() => {
            this.setState({ modalVisible1: false });
          }}
        >
          <TouchableOpacity style={{ flex: 1, backgroundColor: '#00000040', justifyContent: 'center', alignItems: 'center', }} onPress={() => { this.setState({ modalVisible1: false }) }}>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', alignSelf: 'center', width: screenWidth * 100 / 100, alignContent: 'center' }}>
              <View style={{ backgroundColor: '#FFFFFF', paddingHorizontal: 20, paddingTop: 15, alignContent: 'center', alignItems: 'center', elevation: 5, borderRadius: 5, width: screenWidth * 80 / 100, }}>
                <View style={{ position: 'absolute', left: -13, top: -13, }}>
                  <TouchableOpacity style={{ backgroundColor: 'white', borderRadius: 30, alignSelf: 'center', justifyContent: 'center', alignItems: 'center' }} onPress={() => { this.setState({ modalVisible1: false }) }}>
                    <Icon1 name='circle-with-cross' size={25} color={Colors.buttoncolor} style={{ alignSelf: 'center', padding: 1.5, paddingBottom: 0 }} />
                  </TouchableOpacity>
                </View>

                <Text style={{ fontWeight: 'bold', fontSize: 16, color: 'black', alignSelf: 'flex-start' }}>information</Text>
                <Text style={{ fontFamily: 'Poppins-Light', color: 'gray', fontSize: 15, paddingTop: 13, lineHeight: 22, alignSelf: 'center' }}>Please login first</Text>
                <View style={{ backgroundColor: Colors.buttoncolor, marginVertical: 20, width: '95%', borderRadius: 40 }}>
                  <TouchableOpacity activeOpacity={0.9} onPress={() => { this.setState({ modalVisible1: false }); this.props.navigation.navigate('Userlogin') }}>
                    <Text style={{ textAlign: 'center', paddingVertical: 13, color: '#FFFFFF', fontFamily: 'Poppins-SemiBold', fontSize: 13.5, letterSpacing: 1 }}>Login</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        </Modal>
        <FlatList
          data={this.props.footerpage}
          //horizontal={false}
          scrollEnabled={false}
          numColumns={this.props.footerpage.length}
          renderItem={({ item, index }) => {
            return (
              <View style={{ width: screenWidth * footerwidth / 100, alignSelf: 'center', alignItems: 'center', height: mobileH * 8 / 100, justifyContent: 'center' }}>
                {item.name == this.props.activepage ? <TouchableOpacity activeOpacity={0.8} style={style1.footericon}
                  onPress={() => { this.Checkuser(item.name) }}>
                  <View style={[style1.footericonview, { width: 75 }]}>
                    <Image source={item.activeimage} resizeMethod='resize' style={[style1.footerimage, {
                      width: this.props.imagestyle1.width,
                      height: this.props.imagestyle1.height,
                    }]} />
                    <Text style={{ color: Colors.whiteColor, textAlign: 'center', textAlignVertical: 'center', fontFamily: Font.FontBold, fontSize: mobileW * 3.5 / 100, marginTop: mobileH * 0.5 / 100 }}>{item.title}</Text>

                    {item.countshow > 0 && <View style={{ position: 'absolute', top: 5, left: 18, alignItems: 'center', justifyContent: 'center' }}>
                      {item.countshow > 0 &&
                        <View style={{ alignSelf: 'center', width: mobileW * 2.5 / 100, height: mobileW * 2.5 / 100, borderRadius: mobileW * 1.25 / 100, backgroundColor: this.props.imagestyle1.countbackground, justifyContent: 'center', alignContent: 'center', alignItems: 'center' }}>
                          {/* <Text style={{ color: this.props.imagestyle1.countcolor, textAlign: 'center', textAlignVertical: 'center', fontFamily: 'Piazzolla-Light', fontSize: 15, }}>{item.countshow > 9 ? '+9' : item.countshow}</Text> */}
                        </View>}

                    </View>}

                  </View>
                </TouchableOpacity> :
                  <TouchableOpacity activeOpacity={0.8} style={[style1.footericon]}
                    onPress={() => { this.Checkuser(item.name) }}>
                    <View style={style1.footericonview}>
                      <Image source={item.image} resizeMethod='resize' style={[style1.footerimage, {
                        width: this.props.imagestyle1.width,
                        height: this.props.imagestyle1.height,
                      }]} />
                      <Text style={{ color: Colors.whiteColor, textAlign: 'center', textAlignVertical: 'center', fontFamily: Font.FontBold, fontSize: mobileW * 3.5 / 100, marginTop: mobileH * 0.5 / 100 }}>{item.title}</Text>
                      {item.countshow > 0 && <View style={{ position: 'absolute', top: 5, left: 18, alignItems: 'center', justifyContent: 'center' }}>
                        {item.countshow > 0 &&
                          <View style={{ alignSelf: 'center', width: mobileW * 2.5 / 100, height: mobileW * 2.5 / 100, borderRadius: mobileW * 1.25 / 100, backgroundColor: this.props.imagestyle1.countbackground, justifyContent: 'center', alignContent: 'center', alignItems: 'center' }}>
                            {/* <Text style={{ color: this.props.imagestyle1.countcolor, textAlign: 'center', textAlignVertical: 'center', fontFamily: 'Piazzolla-Light', fontSize: 15, }}>{item.countshow > 9 ? '+9' : item.countshow}</Text> */}
                          </View>}

                      </View>}
                    </View>
                  </TouchableOpacity>
                }
              </View>
            )
          }}
        />
      </View>

    )
  }
}
const style1 = StyleSheet.create({

  footercontainer: {
    flexDirection: 'row', width: screenWidth,
    // backgroundColor:'#e6e6e6',
    position: 'absolute',
    elevation: 20,
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.4,
    // borderTopWidth:1,
    //borderTopColor:'#f7f7f7',
    shadowColor: 'black',
    bottom: 0
  },
  footericon: {
    width: screenWidth * 25 / 100,
    paddingTop: 8,
    paddingBottom: 6,


  },
  footericonview: {
    alignSelf: 'center',
    paddingVertical: 7,

  },
  footertext: {
    color: 'gray',
    fontSize: 13,
    fontFamily: 'Piazzolla-Light'
  },
  footerimage: {
    alignSelf: 'center',

    resizeMode: 'contain'
  }

})