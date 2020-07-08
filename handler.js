'use strict';

module.exports.hello = async event => {
  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: 'Go Serverless v1.0! Your function executed successfully!',
        input: event,
      },
      null,
      2
    ),
  };

  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // return { message: 'Go Serverless v1.0! Your function executed successfully!', event };
};


// Your service account details
var credentials = {
  "type": "service_account",
  "project_id": "project-123451234512345123",
  "private_key_id": "my1private2key3id",
  "private_key": "-----BEGIN PRIVATE KEY-----InsertKeyHere-----END PRIVATE KEY-----\n",
  "client_email": "projectname@project-123451234512345123.iam.gserviceaccount.com",
  "client_id": "1111222223333344444",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://accounts.google.com/o/oauth2/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/projectname%40project-123451234512345123.iam.gserviceaccount.com"
};

firebase.initializeApp({
  serviceAccount: credentials,
  databaseURL: "https://project-123451234512345123.firebaseio.com"
});

exports.handler = function (event, context, callback) {

  // I use some data passed in from AWS API Gateway:
  if (!event.firebaseUid) {
    callback('Missing param for id');
  }

  firebase.database().ref().child('users').child(firebaseUid).child('at').set(newTokens.access_token).then(function (data) {
    console.log('Firebase data: ', data);
    firebase.database().goOffline();
    callback(null, 'Firebase data: ', data);
  }).catch(function (error) {
    callback('Database set error ' + error);
  });
 };