import Firebase from 'firebase';
const config = {
  apiKey: 'AIzaSyCFvqo55Mgv1KG-uWrOPRA-tMt1R_YfxKA',
  authDomain: 'budgetbashes-f2f10.firebaseapp.com',
  databaseURL: 'https://budgetbashes-f2f10-default-rtdb.firebaseio.com',
  projectId: 'budgetbashes-f2f10',
  storageBucket: 'budgetbashes-f2f10.appspot.com',
  messagingSenderId: '659711577367',
  appId: '1:659711577367:web:67e5e9ce87206c06cbfb52',
};
let firebase = Firebase.initializeApp(config);
export default firebase;
