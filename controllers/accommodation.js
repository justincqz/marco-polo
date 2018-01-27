exports.getAccommodation = (req, res) => {
  console.log("Getting accommodations...");
  getCityId("london").then(function(cityId) {
    console.log("City id", cityId);
    getHotels(-1, -1, cityId).then(function(data) {
      res.json(data);
    });
  });
};

var querystring = require('querystring');
var request = require('request');
var username = 'booking_hackathon_ichack18';
var password = 'WorkingAtBooking.com2018';

function getHotels(checkinDate, checkoutDate, cityId) {
  return new Promise(function(resolve, reject) {
    var auth = 'Basic ' + Buffer.from(username + ':' + password).toString('base64');

    var args = {
      checkin: '2018-04-27',
      checkout: '2018-04-28',
      city_ids: -1565670,
      room1: 'A,A',
      extras: 'room_details,hotel_details'
    };

    var argsData = querystring.stringify(args);
    var contentLength = argsData.length;

    request({
    headers: {
      'Content-Length': contentLength,
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'Basic ' + new Buffer(username + ':' + password).toString('base64')
    },
      uri: 'https://distribution-xml.booking.com/2.0/json/hotelAvailability',
      body: argsData,
      method: 'GET'
    }, function (err, res, body) {
      resolve(JSON.parse(body));
    });

  });
  
}

function getCityId(city) {
  return new Promise(function(resolve, reject) {
    request({
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Basic ' + new Buffer(username + ':' + password).toString('base64')
      },
      uri: 'https://distribution-xml.booking.com/2.0/json/autocomplete?language=en&text='+city,
      method: 'GET'
    }, function (err, res, body) {
      resolve(JSON.parse(body).result[0].id);
    });
  });
}