var child_process = require('child_process');
const Client = require('node-rest-client').Client;
const client = new Client();
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var rp = require('request-promise');

exports.getFlights = (req, res) => {
  var dest = '"'+req.body.destLoc+'"';
  var origin = '"'+req.body.origin+'"';
  var pax = req.body.pax;
  var date = req.body.date;
  var newDate = date[5]+date[6]+'/'+date[8]+date[9]+'/'+date[0]+date[1]+date[2]+date[3];
  returnFlightData(res, origin, dest, newDate, pax);

}

function returnFlightData(res, fromLoc, toLoc, date, passengerCount) {
  getAirportCodes(fromLoc).then(function(fromAirportCodes) {
    getAirportCodes(toLoc).then(function(toAirportCodes) {
      var output;
      console.log('python expedia.py '+fromAirportCodes[0]+' '+toAirportCodes[0]+' '+date+' '+passengerCount);
      for (var i = 0; i < 2; i++){
        child_process.exec('python expedia.py '+fromAirportCodes[i]+' '+toAirportCodes[i]+' '+date+' '+passengerCount,
        function(err, stdout, stderr) {
          console.log(stderr);
          output += stdout;
        });
      }
      console.log(JSON.parse(output));
      res.send(JSON.parse(output));
    });
  });
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
