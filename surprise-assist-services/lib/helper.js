'use strict';

var axios = require('axios');

//const DB_PREFIX = process.env.IS_OFFLINE ? "dev" : process.env.REMOTE_STAGE;

var config = {
    headers: {
        'Authorization': 'Bearer 27037c67-f394-4cfd-ab51-069ac71132fb',
        'Content-Type': 'application/json'
    }
};

function getAllReservations() {
    console.log('entered get request');
    return axios.get('https://platform.otqa.com/availability?latitude=42.360082&longitude=71.058880&party_size=10&radius=200&forward_minutes=180&backward_minutes=30&start_date_time=2017-03-13T20%3A00&include_unavailable=true', config)
        .then(function(response){
            return response.data;
        });
}

function updateReservations() {
    axios.get('https://platform.otqa.com/availability?latitude=42.360082&longitude=71.058880&party_size=10&radius=200&forward_minutes=180&backward_minutes=30&start_date_time=2017-03-13T20%3A00&include_unavailable=true', config)
        .then(function(response){
            console.log(response.data); // ex.: { user: 'Your User'}
            console.log(response.status); // ex.: 200
          }); 
}
function currentReservations() {
    axios.get('https://platform.otqa.com/availability?latitude=42.360082&longitude=71.058880&party_size=10&radius=200&forward_minutes=180&backward_minutes=30&start_date_time=2017-03-13T20%3A00&include_unavailable=true', config)
        .then(function(response){
            console.log(response.data); // ex.: { user: 'Your User'}
            console.log(response.status); // ex.: 200
          }); 
}

module.exports = {
    getAllReservations: getAllReservations,
    updateReservations: updateReservations,
    currentReservations: currentReservations    
};