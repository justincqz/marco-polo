const Client = require('node-rest-client').Client;
const client = new Client();
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var rp = require('request-promise');

exports.getFlights = (req, res) => {
  flightData = {
    // fromLoc:
    // toLoc:
    // airlines:
    // date:
    // timeDepart:
    // timeArrive:
    // airportFrom:
    // airportTo:
    // price:
  }

  console.log(req.query);
  returnFlightData(res, req.query.fromLoc, req.query.toLoc, req.query.date, req.query.passengerCount);
};

var googleQPXapi = require('qpx-express');
var apiKey = 'yourApiKey';
const googleApiKey = 'AIzaSyCrKE4pBuEY7T7XqAgyAI0N9BjK4S0IcBY';
var qpx = new googleQPXapi(googleApiKey);

function getFlights(fromAirportCodes, toAirportCodes, date, passengerCount) {

  return new Promise(function(resolve, reject) {
    var body = {
      "request": {
          "passengers": { "adultCount": passengerCount },
          "slice": []
        }
      };
    for (var i = 0; i < fromAirportCodes.length; i++) {
      for (var j = 0; j < toAirportCodes.length; j++) {
        body.request.slice.push({
          "origin": fromAirportCodes[i],
          "destination": toAirportCodes[j],
          "date": date // YYYY-MM-DD
        });
      }
    }

    qpx.getInfo(body, function(error, data) {
      console.log('Heyy!', data);
    });
  });
}
