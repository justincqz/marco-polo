/**
 * GET /
 * Recommend destions
 */
exports.index = (req, res) => {
  req.body.duration
  req.body.locaction
  req.body.purpose


  // res.render('??', {
  //   title: '???'
  // });
};

var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var csv = require('csv-parser');

function scrapeGoogleTravelPage() {

}

function recommendLocation(duration, location, purpose) {
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