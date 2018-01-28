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
      var safe = false;
      var promise = [];

      for (var i = 0; i< fromAirportCodes.length; i++){
        for (var j = 0; j < toAirportCodes.length; j++){
          promise.push(new Promise(function(resolve, reject){child_process.exec('python expedia.py '+fromAirportCodes[i]+' '+toAirportCodes[j]+' '+date+' '+passengerCount,
          function(err, stdout, stderr) {

            if (stderr == ""){
              console.log("Break?")
                output = stdout;
                resolve(output);
            } else {
              resolve("");
            }
          })}));
        }
      }
      Promise.all(promise).then(function(data) {
        console.log("I resolved!");
        var output;
        var newArray = []
        for (var i = 0; i < data.length; i++){
          console.log(data[i]);
          if (data[i] != ""){
            output = JSON.parse(data[i]);
            newArray.push(output['0']);
            newArray.push(output['1']);
          }
        }
        res.redirect('/2?'+newArray);});
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
