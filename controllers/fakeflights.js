var child_process = require('child_process');

exports.getFlights = (req, res) => {
  var dest = req.query.destLoc;
  var origin = req.query.origin;
  var pax = req.query.pax;
  var date = req.query.date;
  var r = [];
  console.log('python expedia.py '+dest+' '+origin+' '+date+' '+pax);
  child_process.exec('python expedia.py '+dest+' '+origin+' '+date+' '+pax,
  function(err, stdout, stderr) {
    console.log(stderr);
    res.send(stdout);
  });
}
