const Client = require('node-rest-client').Client;
const client = new Client();
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var rp = require('request-promise');

const googleApiKey = 'AIzaSyDx7O2y6ts1OPlnl9aux7lAAEoLAHAanY4';

exports.getFlights = (req, res) => {
  var fromAirportCodes = getAirportCodes(req.body.fromLoc);
  var toAirportCodes = getAirportCodes(req.body.toLoc);
  console.log(airportCodes);
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

  returnFlightData(res);
};

function returnFlightData(res, fromLoc, toLoc, date, passengerCount) {
  getAirportCodes(fromLoc).then(function(fromAirportCodes) {
    getAirportCodes(toLoc).then(function(toAirportCodes) {
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

function getFlights(fromAirportCode, toAirportCode, date, passengerCount) {
  body = {
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
        "date": date,
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
}

function getAirportCodes(location) {
  return new Promise(function(resolve, reject) {
    location = location.replace(' ', '+');
    var airportCodes = [];
    url = 'https://www.travelmath.com/nearest-airport/'+location;
    console.log(url);
    request(url, function(error, response, html) {
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
        console.log(found);
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





/**
 * GET /
 * Recommend destions
 */
exports.getPossibleDestinations = (req, res) => {
  // req.body.duration
  // req.body.locaction
  // req.body.purpose
  var airportCodes = getAirportCodes('London, Canada');
  console.log(airportCodes);
  // recommendLocations(req.body.duration, req.body.locaction, req.body.purpose);

  // res.render('??', {
  //   title: '???'
  // });
};

function recommendLocations(duration, location, purpose) {
  
}

var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var rp = require('request-promise');

function scrapeGoogleTravelPage() {
  airports = 'LHR,LGW,STN,LTN,LCY,SEN,QQS'
  date = '2018-02-12'
  rDate = '2018-02-16'
  url = 'https://www.google.co.uk/flights/#search;f=' + airports + ';d=' + date + ';r=' + rDate + ';mc=m';
  rp(url)
    .then(function (html) {
      if(!error){
        // use cheerio library on returned html for essential jQuery functionality
        var $ = cheerio.load(html);

        // variables to capture
        var title, release, rating;
        var json = { title : "", release : "", rating : ""};
      }
    })
    .catch(function (err) {
        // Crawling failed...
    });
  request(url, function(error, response, html){
    if(!error){
      // use cheerio library on returned html for essential jQuery functionality
      var $ = cheerio.load(html);

      // variables to capture
      var title, release, rating;
      var json = { title : "", release : "", rating : ""};
    }
  });
}