var firebase = require('firebase-admin');
var serviceAccount = require('../../cert/firebase-cert.json');

firebase.initializeApp({
  credential: firebase.credential.cert(serviceAccount)
});

module.exports = firebase;