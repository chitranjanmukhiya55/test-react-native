import React, { Component } from 'react';
import { Text, BackHandler, SafeAreaView, StatusBar, KeyboardAvoidingView, Alert, View, StyleSheet, Keyboard, Dimensions, ImageBackground, TouchableOpacity, Image, Modal, FlatList, ScrollView, RadioButton, Button, TextInput, keyboardType } from 'react-native'
import { config, msgProvider, localStorage, apifuntion, msgText, msgTitle, consolepro, Lang_chg, Font, Colors, mobileH, mobileW, localimag, notification } from '../Provider/utilslib/Utils';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import LinearGradient from 'react-native-linear-gradient';

class Forgotpassword extends Component {
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            type: 1 //1=email,2=mobile
        }
    }
    componentDidMount() {
        consolepro.consolelog('I am on forgot password page')
    }

    forgot_btn = () => {
        Keyboard.dismiss()
        if (config.app_status == 0) {
            this.props.navigation.navigate('ForgotOTPVerify', {
                forgot_type: this.state.type,
                email_mobile: 'jack@mailinator.com',
                user_id: 0,
                forgot_id: 0,
                otp: 4512,
                otp_auto_fill: true
            })

        } else {
            let { email, type } = this.state;

            if (type == 1) {
                //=======================================email============================
                if (email.length <= 0) {
                    msgProvider.toast(msgText.emptyEmail[config.language], 'center')
                    return false
                }
                var reg = config.emailvalidation;
                if (reg.test(email) !== true) {
                    msgProvider.toast(msgText.validEmail[config.language], 'center')
                    return false
                }
            } else {
                if (email.length <= 0) {
                    msgProvider.toast(msgText.emptyMobile[config.language], 'center')
                    return false
                }
                if (email.length < 7) {
                    msgProvider.toast(msgText.mobileMinLength[config.language], 'center')
                    return false
                }
                var mobilevalidation = config.mobilevalidation;
                if (mobilevalidation.test(email) !== true) {
                    msgProvider.toast(msgText.validMobile[config.language], 'center')
                    return false
                }
            }

            let url = config.baseURL + "forgot_password.php";
            var data = new FormData();
            data.append('email_mobile', email)
            data.append('forgot_type', type) //----1=email,2=mobile
            consolepro.consolelog('data', data)
            apifuntion.postApi(url, data).then((obj) => {
                consolepro.consolelog('res', obj)
                if (obj.success == 'true') {

                    var user_id = obj.user_id;
                    var forgot_id = obj.forgot_id;
                    var otp = obj.otp;

                    var otp_auto_fill = obj.otp_auto_fill;

                    if (otp_auto_fill == false) {
                        otp = ''
                    }

                    consolepro.consolelog({ user_id })
                    this.props.navigation.navigate('ForgotOTPVerify', {
                        forgot_type: type,
                        email_mobile: email,
                        user_id: user_id,
                        forgot_id: forgot_id,
                        otp: otp,
                        otp_auto_fill: otp_auto_fill
                    })

                }
                else {
                    if (obj.active_status == 0) {
                        config.checkUserDeactivate(this.props.navigation);
                        return false;
                    }
                    setTimeout(() => {
                        msgProvider.alert(msgTitle.information[config.language], obj.msg[config.language], false);
                        return false;
                    }, 300);

                }
            }).catch((error) => {
                consolepro.consolelog("-------- error ------- " + error);

            });
        }
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

                <KeyboardAwareScrollView showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false} contentContainerStyle={{ width: mobileW, }} keyboardShouldPersistTaps='handled'>
                    {/* //===========ImageBackground ======// */}
                    <ImageBackground style={{ width: mobileW * 100 / 100, height: mobileH * 37 / 100, }} resizeMode='cover' source={localimag.login_design_with_logo}>
                    <TouchableOpacity
                            onPress={() => this.props.navigation.goBack()}
                            activeOpacity={0.7}
                            style={{ width: mobileW * 15 / 100,marginTop:mobileH*3.7/100 }}>
                            <Image style={{
                                alignSelf: 'center',
                                width: mobileW * 4.5 / 100,
                                height: mobileW * 4.5 / 100,
                                paddingHorizontal: mobileW * 4 / 100,
                                resizeMode: 'contain',
                            }}
                                source={localimag.back}>
                            </Image>
                        </TouchableOpacity>
                    </ImageBackground>
                    {/* //=========Signin text view==========// */}
                    <View style={{ width: mobileW * 90 / 100, marginTop: mobileH * 5 / 100, alignSelf: 'center', justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ fontFamily: Font.FontBold, fontSize: mobileW * 5.5 / 100, color: Colors.black_color }}>
                            {Lang_chg.Forgotpassword_txt[config.language]}
                        </Text>
                        <Text style={{ fontFamily: Font.FontSemiBold, fontSize: mobileW * 3.6 / 100, color: Colors.black_color,paddingVertical:mobileH*0.4/100 }}>
                            {Lang_chg.Enter_your_text[config.language]}
                        </Text>
                    </View>

                    <View style={{ width: mobileW, alignItems: 'center', alignSelf: 'center' }}>

                        {/* //=========Email===========// */}
                        <View style={{ width: mobileW * 90 / 100, alignItems: 'center', alignSelf: 'center', }}>

                            <View style={{ width: mobileW * 90 / 100, alignItems: 'flex-start', marginTop: mobileH * 3 / 100 }}>
                                <Text style={{ fontFamily: Font.FontBold, color: Colors.black_color, fontSize: mobileW * 4 / 100 }}>Email</Text>
                            </View>
                            <LinearGradient
                                colors={[Colors.bluegreen_color, Colors.voilet_color]}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 0, y: 1 }}
                                style={styles.linearGradient}
                            >
                                <View style={styles.innerContainer}>
                                    <View style={{ marginLeft: mobileW * 2.5 / 100, alignSelf: 'center' }}>
                                        <Image resizeMode='contain' style={{ width: mobileW * 5 / 100 }} source={localimag.email}></Image>
                                    </View>
                                    <View style={{ borderEndWidth: 1, borderColor: Colors.bluegreen_color, alignItems: 'flex-start', justifyContent: 'flex-start', width: mobileW * 3 / 100, alignSelf: 'center', height: mobileH * 3.5 / 100 }}>
                                        <Text style={{}}></Text>
                                    </View>
                                    <TextInput
                                        style={styles.buttonText}

                                        placeholderTextColor={Colors.greyColor}
                                        placeholder='Enter Email'
                                        keyboardType='email-address'
                                        returnKeyLabel='done'
                                        returnKeyType='done'
                                        ref={(input) => { this.mobilefield = input; }}
                                        onSubmitEditing={() => { Keyboard.dismiss() }}
                                        onFocus={() => { this.setState({ errorno: 0, activeinput: 1 }) }}
                                        onChangeText={(txt) => { this.setState({ email: txt }) }}
                                        value={this.state.email}
                                        maxLength={100}

                                    />
                                </View>

                            </LinearGradient>

                        </View>
                    </View>
                    {/* //=========Login Submit============// */}
                    <TouchableOpacity
                        onPress={() => this.props.navigation.navigate('ForgotOTPVerify')}
                        activeOpacity={0.7}
                        style={{ alignItems: 'center', alignSelf: 'center' }} >
                        <LinearGradient
                            colors={[Colors.purple_color, Colors.light_greencolor]}
                            start={{ x: 0, y: 1 }} end={{ x: 1, y: 0 }}
                            style={{
                                height: mobileH * 6.7 / 100,
                                width: mobileW * 90 / 100,
                                alignSelf: 'center',
                                justifyContent: 'center',
                                alignItems: 'center',
                                borderRadius: mobileW * 1.5 / 100,
                                marginTop: mobileH * 3 / 100
                            }}>
                            <Text style={{ color: '#f5f4f5', fontFamily: Font.FontBold, fontSize: mobileW * 4.3 / 100 }}>{Lang_chg.send_txt[config.language]}</Text>
                        </LinearGradient>
                    </TouchableOpacity>


                </KeyboardAwareScrollView>

            </SafeAreaView>


        )
    }
}
export default Forgotpassword

const styles = StyleSheet.create({
    container:
    {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.whiteColor


    },
    view1:
    {
        backgroundColor: Colors.back_color,
        height: mobileH * 8 / 100,

        flexDirection: 'row',
        width: mobileW * 88 / 100,
        alignSelf: 'center',
        alignItems: 'center',

    },
    linearGradient: {
        marginTop: mobileH * 1 / 100,
        height: mobileH * 7 / 100,
        width: mobileW * 90 / 100,
        borderRadius: mobileW * 1.5 / 100, // <-- Outer Border Radius
    },
    innerContainer: {
        borderRadius: mobileW * 1.5 / 100, // <-- Inner Border Radius
        flex: 1,
        margin: mobileW * 0.4 / 100, // <-- Border Width
        backgroundColor: Colors.whiteColor,
        flexDirection: 'row',
        alignItems: 'flex-start',

    },
    buttonText: {
        fontSize: mobileW * 3.7 / 100,
        fontFamily: Font.FontRegular,
        marginLeft: mobileW * 1.5 / 100,
        color: Colors.black_color,
        backgroundColor: Colors.whiteColor,
        paddingVertical: mobileH * 1.8 / 100,
        width: mobileW * 62 / 100,
        alignSelf: 'center', alignItems: 'center'
    },



})
