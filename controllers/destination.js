Const googleApiKey = 'AIzaSyDx7O2y6ts1OPlnl9aux7lAAEoLAHAanY4';

/**
 * GET /
 * Recommend destions
 */
exports.getPossibleDestinations = (req, res) => {
  // req.body.duration
  // req.body.locaction
  // req.body.purpose

  getAirportCode();
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

var Client = require('node-rest-client').Client;
 
var client = new Client();
function getAirportCode() {
  url = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=40.712784,-74.005941&radius=50000&type=airport&key=' + googleApiKey;
  client.get(url, function (data, response) {
    // parsed response body as js object 
    console.log(data);
    // raw response 
    console.log(response);
  });

  var airports = [];

  for (var i = 0; i < res.length; i++) {
    place = res[i];
    airports.push(airportName = place.name);
  }

}