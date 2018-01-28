const Client = require('node-rest-client').Client;
const client = new Client();
const GOOGLE_API_KEY = 'AIzaSyDx7O2y6ts1OPlnl9aux7lAAEoLAHAanY4';

exports.getThingsToDo = (req, res) => {
  var currentCity = req.query.destCity;
  var queryString = 'https://maps.googleapis.com/maps/api/place/textsearch/json?query=Things+to+do+in+' + currentCity+ '&key=' + GOOGLE_API_KEY;

  var r = [];
  client.get(queryString, '', function (data, response) {
    var destinations = data.results;
    //console.log(data.results);

    for (var i = 0; i < destinations.length; i++){
      r.push({
        name: destinations[i].name,
        location: destinations[i].formatted_address,
      })
    }
    res.json(r);
  });
};
