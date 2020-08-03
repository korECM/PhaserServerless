var firebase = require("firebase");

var serviceAccount = require("./phaser-beb24-firebase-adminsdk-w31hu-8123f88851.json");

exports.dataPush = function (event, context, callback) {
  context.callbackWaitsForEmptyEventLoop = false;

  if (!event.body) {
    callback("No event Body " + event.body);
    return;
  }

  const bodyData = {};

  event.body
    .split("&")
    .map((data) => data.split("="))
    .forEach((dataObject) => (bodyData[dataObject[0]] = dataObject[1]));

  console.log(bodyData);

  const {
    latitude,
    longitude,
    magnitude
  } = bodyData;

  if (!latitude || !longitude || !magnitude) {
    callback("No Data " + latitude + " " + longitude + " " + magnitude);
    return;
  }

  if (firebase.apps.length === 0) {
    firebase.initializeApp({
      serviceAccount: serviceAccount,
      databaseURL: "https://phaser-beb24.firebaseio.com",
    });
  }

  firebase
    .database()
    .ref("roadDatas")
    .push({
      latitude: "3",
      longitude: "4",
      magnitude: "5",
      time: new Date().toISOString(),
    }, (error) => {
      if (error) {
        console.error(error);
        callback("Database set error " + error);
        context.fail();
      }
      const response = {
        statusCode: 200,
        body: "OK",
      };
      console.log("RETURN : ", response);
      callback(null, response);
      context.succeed();
    })
};

exports.dataGet = function (event, context, callback) {
  context.callbackWaitsForEmptyEventLoop = false;

  firebase
    .database()
    .ref("roadDatas")
    .once("value")
    .then(function (e) {
      const response = {
        statusCode: 200,
        body: Object.values(e.toJSON()),
      };
      callback(null, response);
    });
};