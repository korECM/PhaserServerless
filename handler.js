// 'use strict';

// module.exports.hello = async event => {
//   return {
//     statusCode: 200,
//     body: JSON.stringify(
//       {
//         message: 'Go Serverless v1.0! Your function executed successfully!',
//         input: event,
//       },
//       null,
//       2
//     ),
//   };

//   // Use this code if you don't use the http event with the LAMBDA-PROXY integration
//   // return { message: 'Go Serverless v1.0! Your function executed successfully!', event };
// };

var firebase = require("firebase");

var serviceAccount = require("./phaser-beb24-firebase-adminsdk-w31hu-8123f88851.json");

// Your service account details
// var credentials = {
//   apiKey: "AIzaSyCZ2GM7tXQOO2_5kb4wCeGg5JDCrZYhoe8",
//   authDomain: "phaser-beb24.firebaseapp.com",
//   databaseURL: "https://phaser-beb24.firebaseio.com",
//   projectId: "phaser-beb24",
//   storageBucket: "phaser-beb24.appspot.com",
//   messagingSenderId: "466733117172",
//   appId: "1:466733117172:web:2b974aaf1b48a9af6b78a1",
// };

firebase.initializeApp({
  serviceAccount: serviceAccount,
  databaseURL: "https://phaser-beb24.firebaseio.com",
});

exports.dataPush = function (event, context, callback) {
  context.callbackWaitsForEmptyEventLoop = false;

  firebase
    .database()
    .ref('roadDatas')
    .push({
      latitude: "3",
      longitude: "4",
      magnitude: "5",
      time: new Date().toISOString()
    })
    .then(function (data) {
      // console.log("Firebase data: ", data);
      firebase.database().goOffline();
      callback(null, "Firebase data: ", data);
    })
    .catch(function (error) {
      callback("Database set error " + error);
    });
};

exports.dataGet = function (event, context, callback) {
  context.callbackWaitsForEmptyEventLoop = false;

  firebase.database().ref('roadDatas').once('value').then(function (e) {

    console.log(Object.values(e.toJSON()));
    var message = e.val();
    console.log(message.userCollect);
  });
};