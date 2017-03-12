'use strict';

var helper = require('./helper');

module.exports.getAllReservations = (event, context) => {
    return helper.getAllReservations(event.data).then(data => {
        return data; 
    });
};

// TODO: coords and time
module.exports.getSurpriseReservation = () => {
    return helper.getAllReservations().then(available => {

      let promises = available.map((a, i) => {
        return new Promise((resolve, reject) => {
          return helper.fetchRestaurantInfo(a.rid).then(resturant => {
            if (resturant) {
              resolve({
                resturant,
                time: a.time,
              });
            } else if (i === available.length-1) {
              reject(new Error('Could not provide any surprise. Try again...maybe.'));
            }
          });
        });
      });

      return Promise.race(promises);
    });
};
