'use strict';

const helper = require('./helper');
const landmark = require('./landmark/fetchLandmarks');

module.exports.getAllReservations = (event, context) => {
    return helper.getAllReservations(event.data).then(data => {
            return data;
});
};

// TODO: coords and time
module.exports.getSurpriseReservation = (queryParams) => {

    let lat = queryParams.latitude,
        location,
        long = queryParams.longitude,
        start_date_time = encodeURIComponent(queryParams.start_date_time);

    return helper.getAllReservations(lat, long, start_date_time).then(available => {

            let promises = available.map((a, i) => {
                    return new Promise((resolve, reject) => {
                        return helper.fetchRestaurantInfo(a.rid).then(resturant => {

                            if(resturant){
                                location = [resturant.latitude,resturant.longitude];

                                return landmark(location).then(landmarkObj =>{
                                if(landmarkObj){
                                    resolve({
                                        resturant,
                                        time: "foo",
                                        landmark: landmarkObj,
                                    });
                                }
                                else{
                                    reject(new Error('Could not find any landmarks near the specified restaurant'));
                                }
                            })

                            } else if (i === available.length-1) {
        reject(new Error('Could not provide any surprise. Try again...maybe.'));
    }
});
});
});
    return Promise.race(promises);
});
};


