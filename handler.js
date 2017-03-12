'use strict';

// const uuid = require('uuid');
const surprises = require('./lib/surprises');
const parser = require('./parser');

module.exports.hello = (event, context, callback) => {
  console.log('test hello');
  const response = {
    statusCode: 200,
    body: JSON.stringify({
      message: 'Go Serverless v1.0! Your function executed successfully!',
      input: event,
    }),
  };

  callback(null, response);

  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // callback(null, { message: 'Go Serverless v1.0! Your function executed successfully!', event });
};

module.exports.surpriseAssist = (event, context, cb) => {
    var event = parser.parseEvent(event),
        path = event.path;

    surprises.getAllReservations(event, context).then(result=>{
        const response = {
          statusCode: 200,
          body: JSON.stringify(result),
        };
        cb(null, response);
    })
};

module.exports.surpriseReservation = (event, context, cb) => {
  
  
  // var event  = parser.parseEvent(event),
  //     path   = event.path,
  var    queryParams = event.queryStringParameters;

  surprises.getSurpriseReservation(queryParams).then(r => {
    const response = {
      statusCode: 200,
      body: JSON.stringify(r),
    };

    cb(null, response);
  }).catch(err => {
    context.fail("Error: " + err);
  });
};
