const Client = require('node-rest-client').Client;
const client = new Client();
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var rp = require('request-promise');

const googleApiKey = 'AIzaSyDx7O2y6ts1OPlnl9aux7lAAEoLAHAanY4';

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

function returnFlightData(res, fromLoc, toLoc, date, passengerCount) {
  getAirportCodes(fromLoc).then(function(fromAirportCodes) {
    getAirportCodes(toLoc).then(function(toAirportCodes) {
      console.log(fromAirportCodes);
      console.log(toAirportCodes);
      promises = [];
      for (var i = 0; i < fromAirportCodes.length; i++) {
        for (var j = 0; j < toAirportCodes.length; j++) {
          promises.push(getFlights(fromAirportCodes[i], fromAirportCodes[i], date, passengerCount));
        }
      }
      Promise.all([promise1, promise2, promise3]).then(function(values) {
        console.log(values);
      });
      res.json(flightData);
    });
  });
}

let fetch = require('node-fetch');

function getFlights(fromAirportCode, toAirportCode, date, passengerCount) {
  args = {
    "request": {
      "passengers": {
        "kind": "qpxexpress#passengerCounts",
        "adultCount": passengerCount,
        "childCount": 0,
        "infantInLapCount": 0,
        "infantInSeatCount": 0,
        "seniorCount": 0
      },
      "slice": [
        {
          "kind": "qpxexpress#sliceInput",
          "origin": fromAirportCode,
          "destination": toAirportCode,
          "date": date, // YYYY-MM-DD format
          "maxStops": 1,
          "maxConnectionDuration": 3*60,
          "preferredCabin": 'COACH',
          // "permittedDepartureTime": {
          //   "kind": "qpxexpress#timeOfDayRange",
          //   "earliestTime": string,
          //   "latestTime": string
          // },
          // "permittedCarrier": [
          //   string
          // ],
          // "alliance": string,
          // "prohibitedCarrier": [
          //   string
          // ]
        }
      ],
      // "maxPrice": string,
      // "saleCountry": string,
      // "ticketingCountry": string,
      // "refundable": boolean,
      // "solutions": integer
    }
  }

  client.post("https://www.googleapis.com/qpxExpress/v1/trips/search", args, function (data, response) {
    // parsed response body as js object 
    console.log(data);
    // raw response 
    // console.log(response);
  });

  // fetch('https://www.googleapis.com/qpxExpress/v1/trips/search', {
  //   method: 'POST',
  //   headers: {'Content-Type': 'application/json'},
  //   body: body
  // }).then(response => {
  //   console.log(response.json());
  // }).catch(err => {console.log(err);});

}

function getAirportCodes(location) {
  return new Promise(function(resolve, reject) {
    location = location.replace(' ', '+');
    url = 'https://www.travelmath.com/nearest-airport/'+location;
    request(url, function(error, response, html) {
      var airportCodes = [];
      if(!error) {
        // use cheerio library on returned html for essential jQuery functionality
        var $ = cheerio.load(html);

        // variables to capture
        var title, release, rating;
        var json = { title : "", release : "", rating : ""};
        var resText = ""
        $('.mainbox').filter(function() {
          var data = $(this);
          resText = resText + data.text();
        });
        var re = /\(([^\)]+)\//g;
        var found = resText.match(re);
        for (var i = 0; i < found.length; i++) {
          found[i];
          airportCodes.push(found[i].slice(1,-2));
        }
      } else {
        reject(error);
      }
      resolve(airportCodes);
    });
  });
}