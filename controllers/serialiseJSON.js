var fs = require('fs');

exports.saveFile = (req, res) => {
  console.log(req.body);
  var uniqueId = req.body.id;
  var lFlights = req.body.data.flights
  for (var i = 0; i < lFlights.length; i++){
    lFlights[i].votes = 0;
  }
  var lAccommodations = req.body.data.accommodations;
  for (var i = 0; i < lAccommodations.length; i++){
    lAccommodations[i].votes = 0;
  }
  var lTodos = req.body.data.todos;
  for (var i = 0; i < lTodos.length; i++){
    lTodos[i].votes = 0;
  }
  var lEvents = req.body.data.events;
  for (var i = 0; i < lEvents.length; i++){
    lEvents[i].votes = 0;
  }
  var finalData = {
    flights : lFlights,
    accommodations : lAccommodations,
    todos : lTodos,
    events : lEvents
  }
  console.log(finalData);
  var path = "./db/" + uniqueId;
  var createStream = fs.createWriteStream(path);
  createStream.end
  fs.writeFile("./db/" + uniqueId, JSON.stringify(finalData), function(err) {
      if(err) {
          res.send(err);
      }
      res.send("Saved");
  });
};

exports.loadFile = (req, res) => {
  var uniqueId = req.query.id;
  fs.readFile("./db/"+uniqueId, 'utf-8', (err, data) => {
  if (err) {
    res.send(err);
  }
    console.log(data);
    res.send(data);
  });
}

exports.updateFile = (req, res) => {
  var uniqueId = req.body.id;
  fs.readFile("./db/"+uniqueId, 'utf-8', (err, oldData) => {
  if (err) {
    res.send(err);
  }
    var updateData = JSON.parse(oldData);
    var newFlights = req.body.data.flights;
    for (var i = 0; i < newFlights.length; i++){
      updateData.flights[newFlights[i]].votes += 1;
    }
    var newAccommodations = req.body.data.accommodations;
    for (var i = 0; i < newAccommodations.length; i++){
      updateData.accommodations[newAccommodations[i]].votes += 1;
    }
    var newTodos = req.body.data.todos;
    for (var i = 0; i < newTodos; i++){
      updateData.todos[newTodos[i]].votes += 1;
    }
    var newEvents = req.body.data.events;
    for (var i = 0; i < newEvents; i++){
      updateData.events[newEvents[i]].vote += 1;
    }
    console.log(updateData);
    res.send(updateData);
  });


}
