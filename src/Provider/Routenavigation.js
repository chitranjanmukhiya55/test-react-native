import React, {Component} from 'react';
import {
  createStackNavigator,
  TransitionPresets,
  CardStyleInterpolators,
} from '@react-navigation/stack';

// dont change auth page start---
import Splash from '../Provider/Splash';
import Login from '../AuthVendor/login';
import VendorOtpVerification from '../AuthVendor/VendorOtpVerification';
import VendorForgotpassword from '../AuthVendor/VendorForgotpassword';
import VendorContentpage from '../AuthVendor/VendorContentpage';
import VendorSetting from '../AuthVendor/VendorSetting';
import VendorContactus from '../AuthVendor/VendorContactus';
import VendorChangepassword from '../AuthVendor/VendorChangepassword';
import VendorDeleteAccount from '../AuthVendor/VendorDeleteAccount';
import VendorForgotOTPVerify from '../AuthVendor/VendorForgotOTPVerify';
import VendorCreatePassword from '../AuthVendor/VendorCreatePassword';
import Signup from '../AuthVendor/Signup';
import VendorFaq from '../AuthVendor/VendorFaq';
// import Notification from '../AuthVendor/Notification';

// dont change auth page start--- auth user-------------
// import Splash from '../Provider/Splash'
// import Login from '../Auth/login';
import OtpVerification from '../Auth/OtpVerification';
import Forgotpassword from '../Auth/Forgotpassword';
import Contentpage from '../Auth/Contentpage';
import Setting from '../Auth/Settings';
import Contactus from '../Auth/Contactus';
import Changepassword from '../Auth/Changepassword';
import DeleteAccount from '../Auth/DeleteAccount';
import ForgotOTPVerify from '../Auth/ForgotOtpVerify';
import CreatePassword from '../Auth/CreatePassword';
// import Signup from '../Auth/Signup';
import Faq from '../Auth/Faq';
import Notification from '../Auth/Notification';
import Editprofile from '../Auth/Editprofile';
import Home from '../Home';
// import EditProfile from '../EditProfile';
// ---------------25-11-22------pooja---
import Profile from '../Profile';
import Details from '../Details';
import SuccessfullySent from '../SuccessfullySent';
import SuccessfullyBooked from '../SuccessfullyBooked';
import Einvites from '../Einvites';
//--------------28-11-22---------
import CustomizeTemplate from '../CustomizeTemplate';
import MyEvents from '../MyEvents';
import Sorry from '../Sorry';
import Reason from '../Reason';
import Report from '../Report';
import NoOfGuest from '../NoOfGuest';
import Vendors from '../Vendors';
import ProposedEventVendorList from '../ProposedEventVendorList';
import SuccessProposedEvent from '../SuccessProposedEvent';
import ProposedEventVendorList1 from '../ProposedEventVendorList1';
import Cuisines from '../Cuisines';
import Birthday from '../Birthday';
// ------------29-11-22------------
// import Contactus from '../Auth/Contactus';
// import Changepassword from '../Auth/Changepassword';
import EventsHistory from '../EventsHistory';
import Preview from '../Preview';
import ProposedEventAcceptedRejected from '../ProposedEventAccepetedRejected';
import CaterersAdd from '../CaterersAdd';
import CaterersAddSuccess from '../CaterersAddSuccess';
import ProposedEventAccpetedRejectedSuccess from '../ProposedEventAccpetedRejectedSuccess';
import MyEventsOngoing from '../MyEventsOngoing';
import TransactionNumber from '../TransactionNumber';
import ChatDemo from '../ChatDemo';
import Inbox1 from '../Inbox1';

//  ------------------30-11-22---------

import RateNow from '../RateNow';
import VendorsDetails from '../VendorsDetails';
import Notifications from '../Notifications';
import TransactionNumber1 from '../TransactionNumber1';
import TransactionNumberClickRateNow from '../TransactionNumberClickRateNow';
import SuccessProposedEventRequest from '../SuccessProposedEventRequest';
import VendorsClear from '../VendorsClear';
import ProposedEventVendorListTab0 from '../ProposedEventVendorListTab0';
import VendorsTab0 from '../VendorsTab0';
import ReportChat from '../ReportChat';

//-------for chat section start ------------
// import Chat from '../ChatProvider/Chat'
// import Inbox from '../ChatProvider/Inbox'
// import ViewImage from '../ChatProvider/ViewImage'
// import ChatReport from '../ChatProvider/ChatReport'

//------- for booking chat
// import ChatBooking from '../ChatProvider/ChatBooking'
// import InboxBooking from '../ChatProvider/InboxBooking'
//-------for chat section end ------------

// import Editprofile from '../Auth/Editprofile';

// ----------------05/12/22---------pooja----

import AddBussinessDetails from '../AddBussinessDetails';
import AddBussinessDetails1 from '../AddBussinessDetails1';
import AddBussinessDetails2 from '../AddBussinessDetails2';
import AddBussinessDetails3 from '../AddBussinessDetails3';
import AddBankDetails from '../AddBankDetails';
import EditBankDetails from '../EditBankDetails';
import VendorCreatedSuccess from '../VendorCreatedSuccess';
// =----------------06/12/22-----------
import VendorHome from '../VendorHome';
import VendorMyEventsOngoing from '../VendorMyEventsOngoing';
import VendorBirthdayOngoing from '../VendorBirthdayOngoing';
import VendorBirthdayCompleted from '../VendorBirthdayCompleted';
import VendorNotifications1 from '../VendorNotifications1';
// -------------------07/12/22---------------
import VendorBirthdayHome from '../VendorBirthdayHome';
import VendorEarning from '../VendorEarning';
import VendorProfile from '../VendorProfile';
import VendorEditWorkPhotos from '../VendorEditWorkPhotos';
// --------------------08/12/22--------------
import VendorWithdrawlRequest from '../VendorWithdrawlRequest';
import VendorEditAboutUs from '../VendorEditAboutUs';
import VendorEditAvailaibility from '../VendorEditAvailaibility';
import VendorEditServices from '../VendorEditServices';
import VendorAddNewServices from '../VendorAddNewServices';
import VendorEditNewServices from '../VendorEditNewServices';
import VendorInbox1 from '../VendorInbox1';
import VendorChatDemo from '../VendorChatDemo';
import VendorSorry from '../VendorSorry';
import VendorMyEventsCompleted from '../VendorMyEventsCompleted';
// ==========================09/12/11--------------
import VendorLocation from '../VendorLocation';
import VendorEarningHistory from '../VendorEarningHistory';
import VendorEditProfile from '../VendorEditProfile';
import LocationMap from '../LocationMap';
import VenderEditSlots from '../VenderEditSlots';
import VenderAddSlots from '../VenderAddSlots';
import AllEventsHome from '../AllEventsHome';
import EditVendorsDetails from '../EditVendorsDetails';
import proposedEventVedorlistEdit from '../proposedEventVedorlistEdit';
import UserHistoryDetails from '../UserHistoryDetails';
import ChatBooking from '../ChatProvider/ChatBooking';
import InboxBooking from '../ChatProvider/InboxBooking';
import ChatReport from '../ChatProvider/ChatReport';
import InboxBookingVendor from '../ChatProvider/InboxBookingVendor';
import ViewImage from '../ChatProvider/ViewImage';
import Add_card from '.././stripcode/src/Add_card';
import Payment_savecard from '.././stripcode/src/Payment_savecard';
import SelectDesigns from '../SelectDesigns';
import SubCategorys from '../SubCategorys';

// dont change auth page end---
const Stack = createStackNavigator();

const Stacknav = navigation => {
  return (
    <Stack.Navigator
      initialRouteName={'Splash'}
      screenOptions={{
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      }}>
      <Stack.Screen
        name="Splash"
        component={Splash}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Login"
        component={Login}
        options={{headerShown: false, gestureEnabled: false}}
      />
      <Stack.Screen
        name="Signup"
        component={Signup}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="VendorOtpVerification"
        component={VendorOtpVerification}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="VendorForgotpassword"
        component={VendorForgotpassword}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="InboxBookingVendor"
        component={InboxBookingVendor}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ViewImage"
        component={ViewImage}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ChatReport"
        component={ChatReport}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Add_card"
        component={Add_card}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Payment_savecard"
        component={Payment_savecard}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="SubCategorys"
        component={SubCategorys}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="VendorForgotOTPVerify"
        component={VendorForgotOTPVerify}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="SelectDesigns"
        component={SelectDesigns}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="VendorCreatePassword"
        component={VendorCreatePassword}
        options={{headerShown: false, gestureEnabled: false}}
      />
      <Stack.Screen
        name="VendorDeleteAccount"
        component={VendorDeleteAccount}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="VendorHome"
        component={VendorHome}
        options={{headerShown: false, gestureEnabled: false}}
      />
      <Stack.Screen
        name="VendorFaq"
        component={VendorFaq}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="VenderEditSlots"
        component={VenderEditSlots}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="VenderAddSlots"
        component={VenderAddSlots}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="AllEventsHome"
        component={AllEventsHome}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="EditVendorsDetails"
        component={EditVendorsDetails}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="proposedEventVedorlistEdit"
        component={proposedEventVedorlistEdit}
        options={{headerShown: false}}
      />
      {/* <Stack.Screen name="Notification" component={Notification} options={{ headerShown: false }} /> */}
      {/* ======================05/12/22------------------------- */}
      <Stack.Screen
        name="AddBussinessDetails"
        component={AddBussinessDetails}
        options={{headerShown: false, gestureEnabled: false}}
      />
      <Stack.Screen
        name="AddBussinessDetails1"
        component={AddBussinessDetails1}
        options={{headerShown: false, gestureEnabled: false}}
      />
      <Stack.Screen
        name="AddBussinessDetails2"
        component={AddBussinessDetails2}
        options={{headerShown: false, gestureEnabled: false}}
      />
      <Stack.Screen
        name="AddBussinessDetails3"
        component={AddBussinessDetails3}
        options={{headerShown: false, gestureEnabled: false}}
      />
      <Stack.Screen
        name="AddBankDetails"
        component={AddBankDetails}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="EditBankDetails"
        component={EditBankDetails}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="VendorCreatedSuccess"
        component={VendorCreatedSuccess}
        options={{headerShown: false, gestureEnabled: false}}
      />
      {/* ----------------------------06/12/22------------------- */}
      <Stack.Screen
        name="VendorMyEventsOngoing"
        component={VendorMyEventsOngoing}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="VendorBirthdayOngoing"
        component={VendorBirthdayOngoing}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="VendorBirthdayCompleted"
        component={VendorBirthdayCompleted}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="VendorNotifications1"
        component={VendorNotifications1}
        options={{headerShown: false}}
      />
      {/* ----------------------------07/12/22------------------------- */}
      <Stack.Screen
        name="VendorBirthdayHome"
        component={VendorBirthdayHome}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="VendorEarning"
        component={VendorEarning}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="VendorProfile"
        component={VendorProfile}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="VendorSetting"
        component={VendorSetting}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="VendorContentpage"
        component={VendorContentpage}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="VendorContactus"
        component={VendorContactus}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="VendorChangepassword"
        component={VendorChangepassword}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="VendorEditWorkPhotos"
        component={VendorEditWorkPhotos}
        options={{headerShown: false}}
      />
      {/* -------------------------------08/12/22--------------------------- */}
      <Stack.Screen
        name="VendorWithdrawlRequest"
        component={VendorWithdrawlRequest}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="VendorEditAboutUs"
        component={VendorEditAboutUs}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="VendorEditAvailaibility"
        component={VendorEditAvailaibility}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="VendorEditServices"
        component={VendorEditServices}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="VendorAddNewServices"
        component={VendorAddNewServices}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="VendorEditNewServices"
        component={VendorEditNewServices}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="VendorInbox1"
        component={VendorInbox1}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="VendorChatDemo"
        component={VendorChatDemo}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="VendorSorry"
        component={VendorSorry}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="VendorMyEventsCompleted"
        component={VendorMyEventsCompleted}
        options={{headerShown: false}}
      />
      {/* ------------------------------09/12/22--------------------------- */}
      <Stack.Screen
        name="VendorLocation"
        component={VendorLocation}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="VendorEarningHistory"
        component={VendorEarningHistory}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ChatBooking"
        component={ChatBooking}
        options={{headerShown: false, gestureEnabled: false}}
      />
      <Stack.Screen
        name="InboxBooking"
        component={InboxBooking}
        options={{headerShown: false, gestureEnabled: false}}
      />
      {/* for chat start  */}
      {/* <Stack.Screen name="Chat" component={Chat} options={{ headerShown: false }} />
      <Stack.Screen name="ViewImage" component={ViewImage} options={{ headerShown: false }} />
      <Stack.Screen name="ChatReport" component={ChatReport} options={{ headerShown: false }} />
      <Stack.Screen name="Inbox" component={Inbox} options={{ headerShown: false }} />
      <Stack.Screen name="ChatBooking" component={ChatBooking} options={{ headerShown: false }} />
    <Stack.Screen name="InboxBooking" component={InboxBooking} options={{ headerShown: false }} /> */}
      {/* for chat end  */}
      {/* -----------------for user side page------------ */}
      {/* <Stack.Screen name="Signup" component={Signup} options={{ headerShown: false }} /> */}
      <Stack.Screen
        name="OtpVerification"
        component={OtpVerification}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Forgotpassword"
        component={Forgotpassword}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ForgotOTPVerify"
        component={ForgotOTPVerify}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="CreatePassword"
        component={CreatePassword}
        options={{headerShown: false, gestureEnabled: false}}
      />
      <Stack.Screen
        name="Setting"
        component={Setting}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Contentpage"
        component={Contentpage}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Contactus"
        component={Contactus}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Changepassword"
        component={Changepassword}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="DeleteAccount"
        component={DeleteAccount}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Home"
        component={Home}
        options={{headerShown: false, gestureEnabled: false}}
      />
      <Stack.Screen
        name="LocationMap"
        component={LocationMap}
        options={{headerShown: false}}
      />
      <Stack.Screen name="Faq" component={Faq} options={{headerShown: false}} />
      <Stack.Screen
        name="Notification"
        component={Notification}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Editprofile"
        component={Editprofile}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Notifications"
        component={Notifications}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Vendors"
        component={Vendors}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ProposedEventVendorList"
        component={ProposedEventVendorList}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="SuccessProposedEvent"
        component={SuccessProposedEvent}
        options={{headerShown: false, gestureEnabled: false}}
      />
      <Stack.Screen
        name="ProposedEventVendorList1"
        component={ProposedEventVendorList1}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ProposedEventAcceptedRejected"
        component={ProposedEventAcceptedRejected}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ChatDemo"
        component={ChatDemo}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Inbox1"
        component={Inbox1}
        options={{headerShown: false, gestureEnabled: false}}
      />
      <Stack.Screen
        name="CaterersAdd"
        component={CaterersAdd}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="CaterersAddSuccess"
        component={CaterersAddSuccess}
        options={{headerShown: false, gestureEnabled: false}}
      />
      <Stack.Screen
        name="ProposedEventAccpetedRejectedSuccess"
        component={ProposedEventAccpetedRejectedSuccess}
        options={{headerShown: false, gestureEnabled: false}}
      />
      <Stack.Screen
        name="MyEventsOngoing"
        component={MyEventsOngoing}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="TransactionNumber"
        component={TransactionNumber}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="TransactionNumber1"
        component={TransactionNumber1}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="TransactionNumberClickRateNow"
        component={TransactionNumberClickRateNow}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="SuccessProposedEventRequest"
        component={SuccessProposedEventRequest}
        options={{headerShown: false, gestureEnabled: false}}
      />
      <Stack.Screen
        name="VendorsClear"
        component={VendorsClear}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ProposedEventVendorListTab0"
        component={ProposedEventVendorListTab0}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="VendorsTab0"
        component={VendorsTab0}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ReportChat"
        component={ReportChat}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="UserHistoryDetails"
        component={UserHistoryDetails}
        options={{headerShown: false}}
      />

      {/* --------------------25-11-22----------pooja-- */}
      <Stack.Screen
        name="Profile"
        component={Profile}
        options={{headerShown: false, gestureEnabled: false}}
      />
      <Stack.Screen
        name="Details"
        component={Details}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="SuccessfullySent"
        component={SuccessfullySent}
        options={{headerShown: false, gestureEnabled: false}}
      />
      <Stack.Screen
        name="SuccessfullyBooked"
        component={SuccessfullyBooked}
        options={{headerShown: false, gestureEnabled: false}}
      />
      <Stack.Screen
        name="Einvites"
        component={Einvites}
        options={{headerShown: false, gestureEnabled: false}}
      />
      {/* ------------------28-11-22-------------------pooja */}
      <Stack.Screen
        name="CustomizeTemplate"
        component={CustomizeTemplate}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="MyEvents"
        component={MyEvents}
        options={{headerShown: false, gestureEnabled: false}}
      />
      <Stack.Screen
        name="Sorry"
        component={Sorry}
        options={{headerShown: false, gestureEnabled: false}}
      />
      <Stack.Screen
        name="Reason"
        component={Reason}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="NoOfGuest"
        component={NoOfGuest}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Report"
        component={Report}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Cuisines"
        component={Cuisines}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Birthday"
        component={Birthday}
        options={{headerShown: false}}
      />
      {/* ----------------------29-11-22-------------------pooja- */}
      {/* <Stack.Screen name="Contactus" component={Contactus} options={{ headerShown: false }} /> */}
      {/* <Stack.Screen name="CreatePassword" component={CreatePassword} options={{ headerShown: false,gestureEnabled:false }} /> */}
      {/* <Stack.Screen name="Setting" component={Setting} options={{ headerShown: false }} /> */}
      {/* <Stack.Screen name="Changepassword" component={Changepassword} options={{ headerShown: false }} /> */}
      <Stack.Screen
        name="EventsHistory"
        component={EventsHistory}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Preview"
        component={Preview}
        options={{headerShown: false}}
      />
      {/* =========================30-11-22-------------------pooja= */}

      <Stack.Screen
        name="RateNow"
        component={RateNow}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="VendorsDetails"
        component={VendorsDetails}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="VendorEditProfile"
        component={VendorEditProfile}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};
export default Stacknav;
