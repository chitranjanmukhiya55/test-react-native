import { Alert, ToastAndroid, Platform } from "react-native";
import { config } from "../configProvider";
import Toast from "react-native-simple-toast";
//--------------------------- Message Provider Start -----------------------
class messageFunctionsProviders {
  toast(message, position) {
    if (position == "center") {
      Toast.showWithGravity(message, Toast.SHORT, Toast.CENTER);
    } else if (position == "top") {
      Toast.showWithGravity(message, Toast.SHORT, Toast.TOP);
    } else if (position == "bottom") {
      Toast.showWithGravity(message, Toast.SHORT, Toast.BOTTOM);
    } else if (position == "long") {
      Toast.showWithGravity(message, Toast.LONG, Toast.CENTER);
    }
  }

  alert(title, message, callback) {
    if (callback === false) {
      Alert.alert(
        title,
        message,
        [
          {
            text: msgTitle.ok[config.language],
          },
        ],
        { cancelable: false }
      );
    } else {
      Alert.alert(
        title,
        message,
        [
          {
            text: msgTitle.ok[config.language],
            onPress: () => callback,
          },
        ],
        { cancelable: false }
      );
    }
  }

  confirm(title, message, callbackOk, callbackCancel) {
    if (callbackCancel === false) {
      Alert.alert(
        title,
        message,
        [
          {
            text: msgTitle.cancel[config.language],
          },
          {
            text: msgTitle.ok[config.language],
            onPress: () => this.btnPageLoginCall(),
          },
        ],
        { cancelable: false }
      );
    } else {
      Alert.alert(
        title,
        message,
        [
          {
            text: msgTitle.cancel[config.language],
            onPress: () => callbackCancel,
          },
          {
            text: msgTitle.ok[config.language],
            onPress: () => callbackOk,
          },
        ],
        { cancelable: false }
      );
    }
  }

  later(title, message, callbackOk, callbackCancel, callbackLater) {
    Alert.alert(
      title,
      message,
      [
        {
          text: "Ask me later",
          onPress: () => msgTitle.later[config.language],
        },
        {
          text: "Cancel",
          onPress: () => msgTitle.cancel[config.language],
        },
        {
          text: "OK",
          onPress: () => msgTitle.ok[config.language],
        },
      ],
      { cancelable: false }
    );
  }
}

//--------------------------- Title Provider Start -----------------------

class messageTitleProvider {
  //----------------- message buttons
  ok = ["Ok", "Okay", "Está bem"];
  cancel = ["Cancel", "Cancelar", "Cancelar"];
  later = ["Later", "Más tarde", "Mais tarde"];

  //--------------- message title
  information = [
    "Information Message",
    "Mensaje informativo",
    "Mensagem Informativa",
  ];
  alert = ["Alert", "Alerta", "Alerta"];
  confirm = [
    "Information Message",
    "Mensaje informativo",
    "Mensagem Informativa",
  ];
  validation = [
    "Information Message",
    "Mensaje informativo",
    "Mensagem Informativa",
  ];
  success = [
    "Information Message",
    "Mensaje informativo",
    "Mensagem Informativa",
  ];
  error = [
    "Information Message",
    "Mensaje informativo",
    "Mensagem Informativa",
  ];
  response = ["Response", "Respuesta", "Resposta"];
  server = ["Connection Error", "Error de conexión", "Erro de conexão"];
  internet = ["Connection Error", "Error de conexión", "Erro de conexão"];
  deactivate_msg = ["Account deactived"];
  deactivate = [0];
  usernotexit = ["User id does not exist"];
  account_deactivate_title = ["your account deactivated please try again"];
}

//--------------------------- Message Provider Start -----------------------

class messageTextProvider {
  // --------don't not change ---------------//
  loginFirst = ["Please login first", "التحقق من صحة"];
  networkconnection = [
    "Unable to connect. Please check that you are connected to the Internet and try again.",
    "Unable to connect. Please check that you are connected to the Internet and try again.",
  ];
  servermessage = [
    "An Unexpected error occured , Please try again .If the problem continues , Please do contact us",
    "An Unexpected error occured , Please try again .If the problem continues , Please do contact us",
  ];

  //----config------
  accountDeactivated = ["Your account deactivated", "Your account deactivated"];
  //-- login
  emptyEmail = ["Please enter email address", "Please enter email address"];
  validEmail = [
    "Email address is not correct , please enter a valid email address",
    "",
  ];
  emptyPassword = ["Please enter your password", ""];
  passwordMinLength = [
    "Password cannot be less then 6 characters",
    "Password cannot be less then 6 characters",
  ];
  wrongpaass = ["Wrong password", ""];
  passwordValid = ["Password must contain uppercase, lowercase & number", ""];
  passwordValidcurrent = [
    "Current password must contain uppercase, lowercase & number",
    "",
  ];
  passwordValidnew = [
    "New password must contain uppercase, lowercase & number",
    "",
  ];
  passwordValidconfirm = [
    "Confirm password must contain uppercase, lowercase & number",
    "",
  ];
  //--otp
  emptyOtp = ["Please enter OTP"];
  otpMinLength = ["OTP should be atleast 4 digit"];
  //---contact us
  emptyName = ["Please enter your name ", "Please enter your name "];
  emptyAmount = ["Please enter amount ", "Please enter amount "];
  emptyProfilePicture = ["Please select profile picture"];
  emptyLocation = ["Please select your location"];
  emptycustonguest = ["Please enter number of guest"];
  emptyVenueRequired = ["please select required venue"];
  emptyVenuetype = ["Please select venue type"];
  emptyVenueName = ["Please enter venue name"];
  emptyValidation = ["Please select at least one service"];
  budgetValidation = ["Your grand total should be under budget"];
  emptycuisines = ["Please select cuisines"];
  emptyspace = ["Please select space setup"];
  emptylayout = ["Please select seating layout"];
  emptyarea = ["Please enter area (postcode/suburb)"];
  emptyareavalid = ["Please enter valid area (postcode/suburb)"];
  emptyBudget = ["Please enter budget"];
  emptyBride = ["Please enter bride name"];
  emptyGroom = ["Please enter groom name"];
  emptyDescription = ["Please enter description"];

  emptynoofGuest = ["Please select number of guest"];
  nameMinLength = [
    "Please enter minimum 3 characters",
    "Please enter minimum 3 characters",
  ];
  emptyContactMessage = ["Please enter message"];
  messageMinLength = [
    "Please enter minimum 3 characters",
    "Please enter minimum 3 characters",
  ];

  emptyProfile = ["Please upload profile photo"];
  emptyExperience = ["Please enter expertise"];
  emptyTeamSize = ["Please enter team size"];
  emptyAbout = ["Please enter about"];
  information = [
    "Information Message",
    "Mensaje informativo",
    "Mensagem Informativa",
  ];

  // -------------------------------------Add Business details ------
  emptyBusiness = ["Please enter business name"];
  emptyCategory = ["Please select category"];
  emptyService = ["Please enter service name"];
  emptyspacesetup = ["Please select space setup"];
  emptyseating = ["Please select seating layout"];
  emptyServiceDetails = ["Please enter service details"];
  emptyPrice = ["Please enter price"];
  emptyEventTitle = ["Please enter event title"];
  emptyTitle = ["Please enter title"];
  emptyGuiest = ["Please enter number of Guest"];
  emptyCuisines = ["Please select cuisines"];
  emptyArea = ["Please enter area"];
  emptyBudget = ["Please enter budget"];
  emptyBudgetvalid = ["Please enter valid budget"];

  //--------for chat start----------------//
  emptyReportMessage = ["Please enter report reason"];
  emptyMessage = ["Please enter message"];
  validReportMessage = ["Please enter valid report reason"];
  minimumReportMessage = ["Please enter minimum 3 characters"];
  //--------for chat end----------------//

  //---------for mobile start--------------
  emptyMobile = ["Please enter a mobile number"];
  mobileMaxLength = ["Enter a valid mobile number"];
  mobileMinLength = ["Enter a valid mobile number"];
  validMobile = ["Enter a valid mobile number"];
  validNumberofguest = ["Enter a valid number of guest"];
  validAmount = ["Enter a valid amount"];
  //---------for mobile end--------------

  //-------for create password start ------------

  emptyNewPassword = ["Please enter your new password"];
  newPasswordMinLength = ["New password cannot be less then 6 characters"];
  emptyConfirmPassword = ["Please enter confirm new password"];
  emptyConfirmPasswordvalid = [
    "Confirm new password must contain uppercase, lowercase & number",
  ];
  confirmPasswordMinLength = [
    "Confirm new password cannot be less then 6 characters",
  ];
  passwordNotMatch = ["New password and confirm new password must be same"];
  //-------for create password end ------------

  // for change password start--------------
  emptyOldPassword = ["Please enter current password"];
  oldPasswordMaxLength = ["Old Password Too Long"];
  oldPasswordMinLength = [" Old Password Should Be Atleast 6 Digit"];
  // for change password end--------------

  //----for delete start
  emptyDeleteReasonMessage = ["Please Enter Delete Reason"];
  enterMinimumThree = ["Please enter minimum 3 characters"];
  //----for delete end

  //---for signup
  acceptTerms = ["Please accept Terms & Conditions and Privacy Policy"];
  starttimegrethenendtime = ["Please select valid time"];
  emptyMinNameOfBusiness = ["Please enter minimum 3 characters"];
  emptyFirstName = ["Please enter first name"];
  emptyLastName = ["Please enter last name"];
  emptyDOB = ["Please enter date of birth"];
  emptydatetime = ["Please select date and time"];
  emptyStartDate = ["Please enter start date"];
  emptyEndDate = ["Please enter end date"];
  emptybank = ["Please enter bank name"];
  emptyAddress = ["Please enter address"];
  emptyPostalCode = ["Please enter postal code"];
  emptyCity = ["Please enter city"];
  emptystate = ["Please enter state"];
  emptyadd = ["Please select additional document"];
  emptyback = ["Please select back photo"];
  emptyfront = ["Please select front photo"];
  emptyssn = ["Please enter SSN number"];
  emptyrout = ["Please enter routing number"];
  emptyAccount = ["Please enter account number"];

  //-----------new message for this project --------------//
}

export const msgText = new messageTextProvider();
export const msgTitle = new messageTitleProvider();
export const msgProvider = new messageFunctionsProviders();
//--------------------------- Message Provider End -----------------------
