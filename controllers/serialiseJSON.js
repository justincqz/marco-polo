var fs = require('fs');

exports.saveFile = (req, res) => {
  var uniqueId = req.query.id;
  var data = req.query.data;
  fs.writeFile("/db/" + uniqueId, JSON.stringify(data), function(err) {
      if(err) {
          res.send(err);
      }
      res.send("Saved");
  });
};

exports.loadFile = (req, res) => {
  var uniqueId = req.query.id;
  fs.readFile('/etc/'+uniqueId, (err, data) => {
  if (err) {
    res.send(err);
  }
    res.send(data);
  });
}
