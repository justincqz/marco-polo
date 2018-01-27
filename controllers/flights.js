const googleApiKey = 'AIzaSyDx7O2y6ts1OPlnl9aux7lAAEoLAHAanY4';

exports.getFlights = (req, res) => {
  var fromAirportCodes = getAirportCodes(req.body.fromLoc);
  var toAirportCodes = getAirportCodes(req.body.toLoc);
  console.log(airportCodes);
  flightData = {
    fromLoc: 
    toLoc: 
    airlines: 
    date:
    timeDepart:
    timeArrive:
    airportFrom:
    airportTo:
    price:
  }
  res.json(flightData);
};

const Client = require('node-rest-client').Client;
const client = new Client();

function getAirportCodes(location) {
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
    }
    return airportCodes;
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

function scrapeGoogleTravelPage() {
  airports = 'LHR,LGW,STN,LTN,LCY,SEN,QQS'
  date = '2018-02-12'
  rDate = '2018-02-16'
  url = 'https://www.google.co.uk/flights/#search;f=' + airports + ';d=' + date + ';r=' + rDate + ';mc=m';
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