import {Alert, ToastAndroid, I18nManager, Platform} from 'react-native';
import {localStorage} from './localStorageProvider';
import {AsyncStorage} from 'react-native';
import {config} from './configProvider';
import RNRestart from 'react-native-restart';
import {consolepro} from './Messageconsolevalidationprovider/Consoleprovider';
global.language_key = 1;
class Language_provider {
  language_get = async () => {
    var item = await localStorage.getItemObject('language');
    console.log('check launguage option', item);

    consolepro.consolelog('is rtl', I18nManager.isRTL);
    consolepro.consolelog('is rtl config', config.textalign);

    if (item != null) {
      console.log('kya bat h developer', config.language);
      config.language = item;
    }
    console.log('language_key123', config.language);
    if (item != null) {
      if (item == 0) {
        config.textalign = 'left';
        config.inverted = false;
      } else {
        config.textalign = 'right';
        config.inverted = true;
      }
    } else {
      I18nManager.forceRTL(false);
      I18nManager.allowRTL(false);
      config.textalign = 'left';
      config.inverted = false;
      localStorage.setItemObject('language', 0);
    }
  };

  language_set = async languagem => {
    console.log('I18nManager.isRTL Developer', I18nManager.isRTL);
    if (languagem == 0) {
      I18nManager.forceRTL(false);
      I18nManager.allowRTL(false);
      config.textalign = 'left';
      config.inverted = false;
      localStorage.setItemObject('language', 0);
      localStorage.removeItem('languagecathc');
      localStorage.removeItem('languagesetenglish');
      config.language = 0;
    } else {
      I18nManager.forceRTL(true);
      I18nManager.allowRTL(true);
      config.textalign = 'right';
      config.inverted = true;
      localStorage.setItemObject('language', 1);
      localStorage.setItemObject('languagecathc', 0);
      config.language = 1;
    }

    setTimeout(() => {
      RNRestart.Restart();
    }, 500);
  };
  // Media option ///////////////////
  MediaCamera = ['Camera', ''];
  Mediagallery = ['Gallery', ''];
  cancelmedia = ['Cancel', ''];

  //-----------not for developer use start ------------------//
  go_back_txt = ['Go back', 'Go back'];
  do_you_want_exit_txt = ['Do you want to exit app', 'Do you want to exit app'];
  do_you_want_goback_txt = ['Do you want to go back', 'Do you want to go back'];
  verify_txt = ['Verify', 'Verify'];
  resend_txt = ['Resend', 'Resend'];
  email_txt = ['Email', 'Email'];
  OTP_txt = ['OTP', 'OTP'];
  Logout_txt = ['Logout', 'Logout'];
  are_you_logout = [
    'Are you sure , you want to logout?',
    'Are you sure , you want to logout?',
  ];
  notification_arr = ['Notification', 'Notification'];
  terms_and_condition_txt = ['Terms & Conditions', 'Terms and Conditions'];
  privacy_policy_txt = ['Privacy Policy', 'Privacy Policy'];
  price = ['Price', 'Price'];
  about_us_txt = ['About Us', 'About Us'];
  delete_account_txt = ['Delete Account', 'حذف الحساب'];
  are_you_sure_delete_txt = ['Are you sure ?', 'هل انت متأكد من حذف الحساب؟'];
  content_not_found = ['Content Not Available', 'Content Not Available'];
  Contactus = ['Contact Us', 'Contact Us'];
  changepassword_txt = ['Change Password', 'Change Password'];
  Setting = ['Settings', 'Setting'];
  notification = ['Notifications', 'notifications'];
  rate_app = ['Rate App', 'Rate App'];
  share_app = ['Share App', 'Share App'];
  Logout = ['Logout', 'Logout'];
  Show = ['Show', 'Show'];
  Hide = ['Hide', 'Hide'];

  //--for chat start --------

  online_txt = ['Online'];
  offline_txt = ['Offline'];
  type_something_txt = ['Type Something'];

  //-----------------------chat page-------------------------------//
  chattextinputmessage = ['Message', ''];
  chataction = ['Action', 'Action', ''];
  chatreport = ['Report User', ''];
  chatclear = ['Clear Chat', ''];
  chatcancel = ['Cancel', ''];
  reportmessagepopup = ['Are your sure you want to ? report', ''];
  chatclearpopup = ['Are your sure you to ? clear chat', ''];
  ChooseMedia = ['Choose', ''];
  Confirm = ['Confirm', ''];
  block_permission = ['Are you sure? you want to block this user', ''];
  unblock_permission = ['Are you sure? you want to unblock this user', ''];
  select_option_txt = ['Select Option', ''];
  report_txt = ['Report', ''];
  chats_txt = ['Chats', ''];
  block_txt = ['Block', ''];
  unblock_txt = ['Unblock', ''];
  cancel_txt = ['Cancel', ''];
  Camera = ['Camera'];
  Gallery = ['Gallery'];
  submit_txt = ['Submit', ''];
  reason_txt = ['Reason', ''];
  search_here_txt = ['Search here'];
  you_blocked_this_user = ['You Block this person'];
  no_txt = ['No', 'No'];
  yes_txt = ['Yes', 'Yes'];
  indoor = ['Indoor', 'Indoor'];
  Outdoor = ['Out door', 'Out door'];
  //--for chat end --------

  //-------create password start-------------//
  create_password_txt = ['Create Password'];
  //-------create password end -------------//
  //-------Delete Account start-------------//
  delete_acc_txt = ['Delete Account'];
  //-------Delete Account end -------------//
  //-------FAQ's"start-------------//
  faq_txt = ["FAQ's"];
  //-------FAQ's"end -------------//

  //-----------notification start ---------//
  notifications_txt = ['Notification'];
  clear_all = ['Clear All'];
  info = ['Information'];
  areyousure_txt = ['Are you sure , you want to clear notifications?'];
  //-----------notification end

  //----------signup----------//
  signup_txt = ['Signup'];
  fullname_txt = ['Full Name'];
  mobile_no_txt = ['Mobile Number'];
  address_txt = ['Address'];
  pincode_txt = ['Pin Code'];
  cpass_txt = ['Confirm Password'];
  iaccept_txt = ['I Accept all'];
  terms_txt = ['Terms & Conditions'];
  changepassword_txt = ['Change Password'];
  and_txt = ['and'];
  Privacy_policy_txt = ['Privacy Policy'];
  you_already_txt = ['You already have an account?'];
  email_txt = ['Email'];
  india_txt = ['India'];
  canada_txt = ['Canada'];
  enter_password = ['Password'];
  login_txt = ['Login'];
  // ----------------------05/12/22-----------
  //----------signup----------//
  signup_txt = ['Signup'];
  fullname_txt = ['Full Name'];
  mobile_no_txt = ['Mobile Number'];
  address_txt = ['Address'];
  pincode_txt = ['Pin Code'];
  cpass_txt = ['Confirm Password'];
  iaccept_txt = ['I accept all'];
  terms_txt = ['Terms & Conditions'];
  changepassword_txt = ['Change Password'];
  and_txt = ['and'];
  Privacy_policy_txt = ['Privacy Policy'];
  you_already_txt = ['You already have an account?'];
  always_have_an_account_txt = ['Always have an account?'];
  email_txt = ['Email'];
  india_txt = ['India'];
  canada_txt = ['Canada'];
  enter_password = ['Password'];
  login_txt = ['Login'];
  signinwithfacebook_txt = ['Facebook'];
  signinwithgoogle_txt = ['Google'];
  email_txt = ['Email'];
  password_txt = ['Password'];
  Show_txt = ['Show'];
  forgotpassword_txt = ['Forgot Password?'];
  or_txt = ['OR'];
  dont_have_an_account_txt = ["Don't have an account?"];
  createaccount_txt = ['Create Account'];
  name_txt = ['Name'];
  phone_txt = ['Phone'];
  location_txt = ['Location'];
  location1_txt = ['Location'];
  confirmpassword_txt = ['Confirm Password'];
  name_txt = ['Name'];
  sign_in_to_your_reg_txt = ['Sign in to your registered account'];
  sign_in_txt = ['Sign In'];
  create_account_txt = ['Create Account'];
  create_an_account_txt = ['Create an account to get all features'];
  update_txt = ['Update'];

  // -----------------25-11-22-----pooja------------
  EvelynHarper_txt = ['Evelyn Harper'];
  Profile_txt = ['Profile'];
  EvelynHarper123_txt = ['EvelynHarper123@gmail.com'];
  num123_txt = ['+1 9876578986'];
  edit_txt = ['Edit Profile'];
  Favourites_txt = ['My Favourites'];
  Bookings_txt = ['My Bookings'];
  Events_History_txt = ['Events History'];
  Propased_txt = ['Propased Vendor List'];
  Setting_txt = ['Setting'];
  Logout_txt = ['Logout'];
  Details_txt = ['Details'];
  Success_txt = ['Success!'];
  successfully_txt = ['You have successfully sent request'];
  to_vendors = ['to vendors'];
  successfullyhave_txt = ['You have successfully booked'];
  successfullypaid_txt = ['You have successfully paid'];
  Eventid_txt = ['Event ID : '];
  successfullySend_txt = ['You have successfully Send request\n to vendors'];
  vendors_txt = ['vendors'];
  vendorsto_txt = ['to vendors'];
  send_txt = ['Send'];
  Done_txt = ['Done'];
  invites_txt = ['E-invites'];
  Wedding_txt = ['Wedding'];
  Christmas_txt = ['Christmas'];
  Birthday_txt = ['Birthday'];
  Party_txt = ['Party'];
  Baby_txt = ['Baby Shower'];
  Housewarming_txt = ['Housewarming'];
  Summer_txt = ['Summer & Pool\nParty'];
  Anniversary_txt = ['Anniversary'];
  Graduation_txt = ['Graduation\nParty'];
  Memarial_txt = ['Memarial\nAnnouncement'];
  Customize_txt = ['Customize Template'];
  My_Events_txt = ['My Events'];
  Bride_txt = ['Bride Name'];
  Groom_txt = ['Groom Name'];
  Date_txt = ['Date & Time'];
  SelectDate_txt = ['Select Date & Time'];
  Location_txt = ['Location'];
  Enter_Location_txt = ['Select Location'];
  Description_txt = ['Description'];
  Next_txt = ['Next'];
  Pending_txt = ['Pending'];
  Ongoing_txt = ['Ongoing'];
  Sorry_txt = ['Sorry'];
  We_are_txt = ['We are sorry to see you leave us.'];
  We_hope_txt = ['We hope to see you again.'];
  Reason_txt = ['Reason'];
  delete_Account_txt = ['Reason to delete account'];
  Submit_txt = ['Submit'];
  Report_txt = ['Report'];
  of_Guest_txt = ['No. of Guest'];
  of_020_txt = ['0-20'];
  of_050_txt = ['20-50'];
  of_100_txt = ['50-100'];
  Custom_txt = ['Custom'];
  Continue_txt = ['Continue'];
  Cuisines_txt = ['Cuisines'];
  Select_Cuisines_txt = ['Select Cuisines'];
  Italian_txt = ['Italian Food'];
  British_txt = ['British Food'];
  American_txt = ['American Food'];
  Chinese_txt = ['Chinese Food'];
  Indian_txt = ['Indian Food'];
  Russion_txt = ['Russion Food'];
  French_txt = ['French Food'];
  Welcome_drinks_txt = [
    'Welcome drinks, Soup , Starter, Main course, Sweets\n&Desert ',
  ];
  Search_txt = ['Search'];
  Birthday_txt = ['Birthday'];
  Event_Title_txt = ['Event Title'];
  Enter_Title_txt = ['Enter Event Title'];
  Venue_txt = ['Venue'];
  Venue1_txt = ['Venue Required'];
  VenueType = ['Venue Type'];
  SelectVenueType = ['Select Venue Type'];
  Postcodce_txt = ['Area (Postcode/Suburb)'];
  Enter_Area_txt = ['Enter Area'];
  Budget_txt = ['Budget'];
  Enter_Budget_txt = ['Enter Budget ($)'];
  SelectDate_txt = ['Select Date & Time'];
  Location_txt = ['Location'];
  Select_Location_txt = ['Select Location'];
  Select_txt = ['Select No. of Guests'];
  Preview_txt = ['Preview'];
  Current_txt = ['Current Password'];
  New_txt = ['New Password'];
  ConfirmNew_txt = ['Confirm New Password'];
  Reset_txt = ['Reset Password'];
  New_Password_txt = ['New Password'];
  proposedeventvendorlist_txt = ['Proposed Event Vendor List'];
  Vendors_txt = [' Vendors '];
  VendorDetails = ['Vendor Details'];
  confirmpay_txt = ['Confirm & Pay'];
  sendrequest_txt = ['Send Request'];
  PleaseLoginFirst = ['Please Login First'];
  Confirm = ['Confirm'];

  // ----------------------30-11-22---------
  are_you_delete_text = [
    'Are you sure want to delete account?',
    'Are you sure , you want to logout?',
  ];
  Rate_Now_text = ['Rate Now'];
  Message_text = ['Message'];
  Enter_your_text = ['Enter your registered email'];
  Forgotpassword_txt = ['Forgot Password?'];
  About_Us_txt = ['About Us'];
  Services_txt = ['Services'];
  Photos_txt = ['Photos'];
  Reviews_txt = ['Reviews'];
  About_txt = ['About'];
  Great_txt = ['Great Neck Gardens,New York, 11021'];
  Working_txt = ['Working Hours'];
  Team_txt = ['Team'];
  Monday_txt = ['Monday - 10:00AM To 09:00PM'];
  Monday1_txt = ['Monday - 10:00AM To 09:00PM'];
  Members_txt = ['Members'];
  Experience_txt = ['Experience'];
  Outstation_txt = ['Outstation'];
  Years_txt = ['15 Years'];
  Yes_txt = ['Yes'];
  Andrew_txt = ['Andrew John'];
  num40_txt = ['(4.0)'];
  Parties_txt = ['Parties Galore'];
  Baloon_Decoration_txt = ['Baloon Decoration Service'];
  $200_txt = ['$200'];
  See_Details_txt = ['See Details'];
  Party_Decoration_txt = ['Party Decoration Service'];
  $300_txt = ['$300'];
  Revalving_txt = ['Revalving Stage'];
  StageFlower_txt = ['StageFlower Decoration services'];
  StageDecoration_txt = ['Stage Decoration'];
  Floral_Decoration_txt = ['Floral Decoration'];
  $100_txt = ['$100'];
  $150_txt = ['$150'];
  $550_txt = ['$550'];
  Send_request_txt = ['Send Request'];
  mark_your_event_complete_txt = ['Mark Your Event Complete'];
  saveimage_txt = ['Save Image'];
  sharelink_txt = ['Share Link'];
  // =========02-12-22---------
  Decorators_txt = ['Decorators'];
  Caterers_txt = ['Caterers'];
  DJ_txt = ['DJ & Sound'];
  Venu_txt = ['Venue'];
  What_are_txt = ['What are you Looking for'];
  Update_Password_txt = ['Update Password'];
  Terms_txt = ['Terms & Conditions'];
  Edit_Profile_txt = ['Edit Profile'];
  change_Profile_txt = ['Change Profile Pitcture'];
  // -----------05/12/22
  please_type_the_verification_txt = [
    'Please type the verification code Send to',
  ];
  Evelynhorpergmail_txt = ['Evelynhorper@gmail.com'];
  Modify_Email_txt = ['Modify Email'];
  // Modify_Email_txt = ['Modify Email']
  Otp_verification_txt = ['OTP Verification'];
  Add_Bussiness_Details_txt = ['Add Business Details'];
  Bussiness_Name_txt = ['Business name'];
  Enter_Bussiness_Name_txt = ['Enter Business Name'];
  About_Us1_txt = ['About Us'];
  Avelability_txt = ['Availability'];
  Add_Avelability_txt = ['Add Availability'];
  Services_txt = ['Services'];
  Photos_txt = ['Photos'];
  Add_Profile_Photo_txt = ['Add Profile Photo'];
  Upload_Profile_Photo_txt = ['Upload Profile Photo'];
  Sunday_txt = ['Sunday'];
  Monday_txt = ['Monday'];
  Tuesday_txt = ['Tuesday'];
  Wednesday_txt = ['Wednesday'];
  Thursday_txt = ['Thursday'];
  Friday_txt = ['Friday'];
  Saturday_txt = ['Saturday'];
  AM_txt = ['09.00 AM'];
  PM_txt = ['10.00 PM'];
  to_txt = ['To'];
  Service_Name_txt = ['Service Name'];
  Service_Details_txt = ['Service Details'];
  ServiceAndPrice = ['Services & Prices'];
  Service_Price_txt = ['Price'];
  Baloon_Decoration_Service_txt = ['Baloon Decoration Service'];
  $200_txt = ['$200'];
  Upload_Photo_txt = ['Upload Photo'];
  Add_Bank_Details_txt = ['Add Bank Details'];
  Bank_Details_txt = ['Bank Details'];
  Add_Card_txt = ['Add Card'];
  Profile_Created_txt = ['Please wait, until admin will approve your account'];
  Hello_txt = ['Hello!'];
  Your_Earning_txt = ['Your Earning'];
  $24_txt = ['$24,000'];
  $08_txt = ['02'];
  $20_txt = ['20'];
  Recent_Events_txt = ['Recent Events'];
  ViewAll_txt = ['View All'];
  Ongoing_Events_txt = ['Ongoing Events'];
  Completed_Events_txt = ['Completed Events'];
  Completed_txt = ['Completed'];
  Booking_txt = ['Booking ID'];
  Request_txt = ['Request ID'];
  Booking_ID_txt = ['#6574738382'];
  Service_txt = ['Service'];
  Event_Details_txt = ['Event Details'];
  Event_Title_txt = ['Event Title'];
  DateTime_txt = ['Date & Time'];
  startTime = ['Start Time'];
  startDate = ['Select Date'];
  EndDate = ['End Date'];
  endTime = ['End Time'];
  Birthday_Celebration_txt = ['5th Birthday Celebration'];
  Nov_txt = ['26-Nov-2022, 11:00 AM'];
  Guest_txt = ['No. of Guest'];
  Guest50_txt = ['50'];
  Areat_txt = ['Area (Suburb/Postcode)'];
  Okemas_txt = ['Okemas, Michigan,48864'];
  Budget_txtuser = ['User Budget'];
  Client_txt = ['Client'];
  Client_Review_txt = ['Client Review'];
  Chat_txt = ['Chat'];
  Start_Work_txt = ['Start Work'];
  End_Work_txt = ['End Work'];
  Expertice_txt = ['Expertise'];
  Experience_txt = ['Experience'];
  Team_Size_txt = ['Team Size'];
  Team_txt = ['Team'];
  Check_Availaibility_txt = ['Check Availability'];
  Update_Availaibility_txt = ['Update Availability'];
  Reject_txt = ['Reject'];
  Accept_txt = ['Accept'];
  Earning_txt = ['Earning'];
  Total_Earning_txt = ['Total Earnings'];
  $240_txt = ['$24,000'];
  Earning_History_txt = ['Earning History'];
  Withdrawl_History_txt = ['Withdrawl History'];
  Edit_txt = ['Edit About Us'];
  Edit_Availaibility_txt = ['Edit Availability'];
  Edit_Services_txt = ['Edit Services'];
  Edit_Services1_txt = ['Edit Service'];
  Edit_WorkPhoto_txt = ['Edit Work Photos'];
  Edit_BankDetails_txt = ['Edit Bank Details'];
  Withdrawl_Request_txt = ['Withdrawl Request'];
  Amount_txt = ['Amount'];
  Description_txt = ['Description'];
  Send_Withdrawl_txt = ['Send Withdrawl Request'];
  Add_New_txt = ['Add New Service'];
  Delete_txt = ['Delete'];
  Edit1_txt = ['Edit'];
  Skip = ['Skip'];
  // Edit_txt = ['Edit Service']
  Add_New_txt = ['Add New Service'];
  Add_txt = ['Add'];
  Chat_txt = ['Chat'];
  User_txt = ['User'];
  Vendor_txt = ['Vendor'];
  Location_txt = ['Location'];

  //----------signup----------//----------for user
  signup_txt = ['Signup'];
  fullname_txt = ['Full Name'];
  // mobile_no_txt = ['Mobile Number']
  // mobile_no_txt = ['Enter Phone Number']
  address_txt = ['Address'];
  pincode_txt = ['Pin Code'];
  cpass_txt = ['Confirm Password'];
  iaccept_txt = ['I accept all'];
  terms_txt = ['Terms & Conditions'];
  changepassword_txt = ['Change Password'];
  and_txt = ['and'];
  Privacy_policy_txt = ['Privacy Policy'];
  you_already_txt = ['You already have an account?'];
  already_txt = [' Already have an account?'];
  always_have_an_account_txt = ['Always have an account?'];
  email_txt = ['Email'];
  india_txt = ['India'];
  canada_txt = ['Canada'];
  enter_password = ['Password'];
  login_txt = ['Login'];
  signinwithfacebook_txt = ['Facebook'];
  signinwithgoogle_txt = ['Google'];
  signinwithapple_txt = ['Apple'];
  email_txt = ['Email'];
  enter_email_txt = ['Enter Email'];
  password_txt = ['Password'];
  Show_txt = ['Show'];
  forgotpassword_txt = ['Forgot Password?'];
  or_txt = ['OR'];
  dont_have_an_account_txt = ["Don't have an account?"];
  createaccount_txt = ['Create Account'];
  name_txt = ['Name'];
  phone_txt = ['Phone'];
  location_txt = ['Select Location'];
  confirmpassword_txt = ['Confirm Password'];
  name_txt = ['Name'];
  sign_in_to_your_reg_txt = ['Sign in to your registered account'];
  sign_in_txt = ['Sign In'];
  create_account_txt = ['Create Account'];
  create_an_account_txt = ['Create an account to get all features'];
  update_txt = ['Update'];

  // -----------------25-11-22-----pooja------------
  EvelynHarper_txt = ['Evelyn Harper'];
  Profile_txt = ['Profile'];
  EvelynHarper123_txt = ['EvelynHarper123@gmail.com'];
  num123_txt = ['+1 9876578986'];
  edit_txt = ['Edit Profile'];
  Favourites_txt = ['My Favourites'];
  Bookings_txt = ['My Bookings'];
  Events_History_txt = ['Events History'];
  Propased_txt = ['Propased Vendor List'];
  Setting_txt = ['Setting'];
  Logout_txt = ['Logout'];
  Details_txt = ['Details'];
  Success_txt = ['Success!'];
  successfully_txt = ['You have successfully sent request'];
  to_vendors = ['to vendors'];
  successfullyhave_txt = ['You have successfully booked'];
  successfullypaid_txt = ['You have successfully paid'];
  transactionid_txt = ['Transaction ID : '];
  successfullySend_txt = ['You have successfully Send request\n to vendors'];
  vendors_txt = ['vendors'];
  vendorsto_txt = ['to vendors'];
  send_txt = ['Send'];
  Done_txt = ['Done'];
  invites_txt = ['E-invites'];
  Wedding_txt = ['Wedding'];
  Christmas_txt = ['Christmas'];
  Birthday_txt = ['Birthday'];
  Party_txt = ['Party'];
  Baby_txt = ['Baby Shower'];
  Housewarming_txt = ['Housewarming'];
  Summer_txt = ['Summer & Pool\nParty'];
  Anniversary_txt = ['Anniversary'];
  Graduation_txt = ['Graduation\nParty'];
  Memarial_txt = ['Memarial\nAnnouncement'];
  Customize_txt = ['Customize Template'];
  My_Events_txt = ['My Events'];
  Bride_txt = ['Bride Name'];
  Groom_txt = ['Groom Name'];
  Date_txt = ['Date & Time'];
  SelectDate_txt = ['Select Date & Time'];
  Location_txt = ['Location'];
  Enter_Location_txt = ['Select Location'];
  Description_txt = ['Description'];
  Next_txt = ['Next'];
  Pending_txt = ['Pending'];
  Ongoing_txt = ['Ongoing'];
  Sorry_txt = ['Sorry'];
  We_are_txt = ['We are sorry to see you leave us.'];
  We_hope_txt = ['We hope to see you again.'];
  Reason_txt = ['Reason'];
  delete_Account_txt = ['Reason to delete account'];
  Submit_txt = ['Submit'];
  Report_txt = ['Report'];
  of_Guest_txt = ['No. of Guest'];
  of_020_txt = ['0-20'];
  of_050_txt = ['20-50'];
  of_100_txt = ['50-100'];
  Custom_txt = ['Custom'];
  Continue_txt = ['Continue'];
  Cuisines_txt = ['Cuisines'];
  Select_Cuisines_txt = ['Select Cuisines'];
  Italian_txt = ['Italian Food'];
  British_txt = ['British Food'];
  American_txt = ['American Food'];
  Chinese_txt = ['Chinese Food'];
  Indian_txt = ['Indian Food'];
  Russion_txt = ['Russion Food'];
  French_txt = ['French Food'];
  Welcome_drinks_txt = [
    'Welcome drinks, Soup , Starter, Main course, Sweets\n&Desert ',
  ];
  Search_txt = ['Search'];
  Birthday_txt = ['Birthday'];
  Event_Title_txt = ['Event Title'];
  Enter_Title_txt = ['Enter Event Title'];
  Venue_txt = ['Venue'];
  Postcodce_txt = ['Area (Postcode/Suburb)'];
  Enter_Area_txt = ['Enter Area'];
  Budget_txt = ['Budget'];
  Enter_Budget_txt = ['Enter Budget ($)'];
  SelectDate_txt = ['Select Date & Time'];
  Location_txt = ['Location'];
  Select_Location_txt = ['Select Location'];
  Select_txt = ['Select No. of Guest'];
  Preview_txt = ['Preview'];
  Current_txt = ['Current Password'];
  New_txt = ['New Password'];
  ConfirmNew_txt = ['Confirm New Password'];
  Reset_txt = ['Reset Password'];
  New_Password_txt = ['New Password'];
  proposedeventvendorlist_txt = ['Proposed Event Vendor List'];
  Vendors_txt = [' Vendors '];
  confirmpay_txt = ['Confirm & Pay'];
  sendrequest_txt = ['Send Request'];

  // ----------------------30-11-22---------
  are_you_delete_text = [
    'Are you sure want to delete account?',
    'Are you sure , you want to logout?',
  ];
  Rate_Now_text = ['Rate Now'];
  Message_text = ['Message'];
  Enter_your_text = ['Enter your registered email'];
  Forgotpassword_txt = ['Forgot Password?'];
  About_Us_txt = ['About Us'];
  Services_txt = ['Services'];
  Photos_txt = ['Photos'];
  Reviews_txt = ['Reviews'];
  About_txt = ['About'];
  Great_txt = ['Great Neck Gardens,New York, 11021'];
  Working_txt = ['Working Hours'];
  Team_txt = ['Team'];
  Monday_txt = ['Monday - 10:00AM To 09:00PM'];
  Members_txt = ['Members'];
  Experience_txt = ['Experience'];
  Outstation_txt = ['Outstation'];
  Years_txt = ['15 Years'];
  Yes_txt = ['Yes'];
  Andrew_txt = ['Andrew John'];
  num40_txt = ['(4.0)'];
  Parties_txt = ['Parties Galore'];
  Baloon_Decoration_txt = ['Baloon Decoration Service'];
  $200_txt = ['$200'];
  See_Details_txt = ['See Details'];
  Party_Decoration_txt = ['Party Decoration Service'];
  $300_txt = ['$300'];
  Revalving_txt = ['Revalving Stage'];
  StageFlower_txt = ['StageFlower Decoration services'];
  Floral_Decoration_txt = ['Floral Decoration'];
  $100_txt = ['$100'];
  $150_txt = ['$150'];
  $550_txt = ['$550'];
  Send_request_txt = ['Send Request'];
  mark_your_event_complete_txt = ['Mark Your Event Complete'];
  saveimage_txt = ['Save Image'];
  sharelink_txt = ['Share Link'];
  // =========02-12-22---------
  Decorators_txt = ['Decorators'];
  Category_txt = ['Category'];
  DJ_txt = ['DJ & Sound'];
  Venu_txt = ['Venue'];
  What_are_txt = ['What are you Looking for'];
  Update_Password_txt = ['Update Password'];
  Terms_txt = ['Terms & Conditions'];
  Edit_Profile_txt = ['Edit Profile'];
  change_Profile_txt = ['Change Profile Picture'];
  welcome_back_txt = ['Welcome Back!'];
  evelyn_harper__txt = ['Evelyn Harper'];
  Gobacktxt = ['Go back'];
  Doyouwanttoexitapptxt = ['Do you want to exit app'];
  DoyouwanttodeleteBotification = ['Do you want to delete all notification'];
  Doyouwanttoexitsteptxt = ['Do you want to exit step'];
  NoTxt = ['No'];
  YesTxt = ['Yes'];
  OkTxt = ['Ok'];
  chat_txt = ['Chat'];
  Sent_Withdrawl_txt = ['Send Withdrawl Request'];
  emptyCurrentaddress = ['Please enter location'];
  starttimegrethenendtime = ['Please select valid time'];
  selectDates = ['Please select time'];
  selectCountry = ['Select Country'];
  selectRange = ['Select the range'];
  selectPhotos = ['Please select photos'];
  deletePhotos = ['photo cannot be delete'];
  selectDatesDetails = ['Please select date'];
  selectDesign = ['Select Design'];

  LastName = ['Last Name'];
  FirstName = ['First Name'];
  FindNewVendor = ['Find New Vendor'];
  Email = ['Email'];
  Close = ['Close'];
  Done = ['Done'];
  DateOfBirth = ['Date Of Birth'];
  BankName = ['Bank Name or credit Union'];
  EnterBankAddress1 = ['Enter Bank Address Line 1'];
  EnterBankAddress2 = ['Enter Bank Address Line 2'];
  ZipCode = ['Zip Code'];
  City = ['City'];
  State = ['State'];
  BankAccuntNumber = ['Bank Accunt No.'];
  RoutingNumber = ['Routing No.'];
  SSN = ['SSN (Last 4), EIN or Tax ID'];
  PhotoIdFrontPhoto = ['Photo ID Front Photo'];
  PhotoIdBackPhoto = ['Photo ID Back Photo'];
  AdditionalDocument = ['Additional Document ID, Address Proof'];
  emptyMinNameOfBusiness = ['Please enter minimum 3 characters'];
  DeleteSErvice = ['Delete Service'];
  areyouDeleteService = ['Are you sure, you want to delete service'];
  EventDetails = ['Event Details'];
  Event = ['Event : '];
  EventTitle = ['Event Title'];
  DateTime = ['Date & Time'];
  NoofGuest = ['No. of Guest'];
  Area = ['Area(Suburb/Postcode)'];
  ServicesPrice = ['Services & Price'];

  contine_txt = ['Continue', 'Continue'];
  yourCard_txt = ['+ Your Card'];
  payment_processing_txt = ['Payment processing', ''];
  AddCard_txt = ['Manage card'];
  seat_arrange = ['Space Setup'];
  seat_layout = ['Seating Layout'];

  //-----------not for developer use end ------------------//
}
export const Lang_chg = new Language_provider();
