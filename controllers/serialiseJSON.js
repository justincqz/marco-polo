var fs = require('fs');

exports.saveFile = (req, res) => {
  console.log(req.body);
  var uniqueId = req.body.id;
  var data = req.body.data;
  var path = "/db/" + uniqueId;
  var createStream = fs.createWriteStream(path, options);
  createStream.end
  fs.writeFile("/db/" + uniqueId, JSON.stringify(data), function(err) {
      if(err) {
          res.send(err);
      }
      res.send("Saved");
  });
};

exports.loadFile = (req, res) => {
  var uniqueId = req.query.id;
  fs.readFile('/db/'+uniqueId, (err, data) => {
  if (err) {
    res.send(err);
  }
    res.send(data);
  });
}
