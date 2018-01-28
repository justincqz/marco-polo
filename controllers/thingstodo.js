const GOOGLE_API_KEY = 'AIzaSyDx7O2y6ts1OPlnl9aux7lAAEoLAHAanY4';
createRequest = function(cityName){
  var options = {
      host: 'maps.googleapis.com/',
      port: 443,
      path: '/maps/api/place/textsearch/json',
      method: 'GET',
      headers: {
          'Content-Type': 'application/json',
          'query' : 'Things+to+do+in+' + cityName,
          'key' : GOOGLE_API_KEY
      }
  };
  return options;
}
//Set Options

exports.getThingsToDo = (req, res) => {
  var currentCity = req.body.destCity;
  rest.getJSON(createRequest(currentCity), function(statusCode, result) {
      // I could work with the result html/json here.  I could also just return it
      //console.log("onResult: (" + statusCode + ")" + JSON.stringify(result));
      res.statusCode = statusCode;
      res.send(result);
  });
};


//get Json function
getJSON = function(options, onResult)
{
    //console.log("rest::getJSON");

    var port = options.port == 443 ? https : http;
    var req = port.request(options, function(res)
    {
        var output = '';
        c//onsole.log(options.host + ':' + res.statusCode);
        res.setEncoding('utf8');

        res.on('data', function (chunk) {
            output += chunk;
        });

        res.on('end', function() {
            var obj = JSON.parse(output);
            onResult(res.statusCode, obj);
        });
    });

    req.on('error', function(err) {
        //res.send('error: ' + err.message);
    });

    req.end();
};
