'use strict';

// const uuid = require('uuid');
const surprises = require('./lib/surprises');
const parser = require('parser');

module.exports.hello = (event, context, callback) => {
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

    switch (path) {
        case '/surprises/currentReservations':
            surprises.update(event, context);
            break;
        case '/surprises/updateReservations':
            surprises.status(event, context);
            break;
        case '/surprises/getAllReservations':
            surprises.getAll(event, context);
            break;
        default:
            //surprises.getAllReservations(event, context);
            console.log('event ** ', event);
            //context.fail('Invalid api call');
    };

    const response = {
    statusCode: 200,
      body: JSON.stringify({
        message: 'Go Serverless v1.0! Your function executed successfully!',
        input: event,
      }),
    };

    console.log('response ** '+response);

    cb(null, response);
};
