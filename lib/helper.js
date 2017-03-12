'use strict';

var axios = require('axios');

//const DB_PREFIX = process.env.IS_OFFLINE ? "dev" : process.env.REMOTE_STAGE;

var config = {
    headers: {
        'Authorization': 'Bearer 27037c67-f394-4cfd-ab51-069ac71132fb',
        'Content-Type': 'application/json'
    }
};

// TODO: coords and time
function getAllReservations() {
    console.log('entered get request');
    return axios.get('https://platform.otqa.com/availability?latitude=37.782256&longitude=%2D122.391273&party_size=2&radius=10&forward_minutes=180&backward_minutes=30&start_date_time=2017-03-13T20%3A00&include_unavailable=false', config)
        .then(function(response){
            return response.data.availabilities;
        });
}

function fetchRestaurantInfo(rid) {
  console.log('fetchRestaurantInfo', rid);
  return axios.get(`https://platform.otqa.com/sync/listings/${rid}`, config)
    .then(response => {
      console.log('response', response);
      if (!response || !response.data || !response.data.items) throw new Error('Could not fetch restaurant info.');
      return response.data.items;
    })
    .then(results => {
      return results[0];
    });
}

module.exports = {
    getAllReservations,
    fetchRestaurantInfo,
};
