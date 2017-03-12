'use strict';

var helper = require('./helper');

module.exports.currentReservations = (event, context) => {
    helper.currentReservations(event.data).then(result => {
        context.succeed({});
    }).catch(err => {
        context.fail("Error: " + err);
    })
};

module.exports.updateReservations = (event, context) => {
    helper.updateReservations(event.data).then(result => {
        context.succeed({});
    }).catch(err => {
        context.fail("Error: " + err);
    })
};

module.exports.getAllReservations = (event, context) => {
    helper.getAllReservations(event.data).then(result => {
        context.succeed({});
    }).catch(err => {
        context.fail("Error: " + err);
    })
};