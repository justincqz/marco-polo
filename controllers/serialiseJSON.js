var fs = require('fs');

exports.saveFile = (req, res) => {
  console.log(req.body);
  var uniqueId = req.body.id;
  var lFlights = req.body.data.flights
  if (!isEmptyObject(lFlights)){
    for (var i = 0; i < lFlights.length; i++){
      lFlights[i].votes = 0;
    }
  } else {
    lFlights = [];
  }

  var lAccommodations = req.body.data.accommodations;
  if (!isEmptyObject(lAccommodations)){
    for (var i = 0; i < lAccommodations.length; i++){
      lAccommodations[i].votes = 0;
    }
  } else {
    lAccommodations = [];
  }

  var lTodos = req.body.data.todos;
  if (!isEmptyObject(lTodos)){
    for (var i = 0; i < lTodos.length; i++){
      lTodos[i].votes = 0;
    }
  } else {
    lTodos = [];
  }

  var lEvents = req.body.data.events;
  if (!isEmptyObject(lEvents)){
    for (var i = 0; i < lEvents.length; i++){
      lEvents[i].votes = 0;
    }
  } else {
    lEvents = [];
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
  var uniqueId = req.query.id;
  fs.readFile("./db/"+uniqueId, 'utf-8', (err, oldData) => {
  if (err) {
    res.send(err);
  }
  var updateData = JSON.parse(oldData);

  var parsedData = JSON.parse(req.query.data);
  for (var i = 0; i < parsedData.flights.length; i++){
    updateData.flights[parsedData.flights[i]].votes += 1 ;
  }
  if (!isEmptyObject(parsedData.accommodations)){
    for (var i = 0; i < parsedData.accommodations.length; i++){
      updateData.accommodations[parsedData.accommodations[i]].votes += 1;
    }
  }
  if (!isEmptyObject(parsedData.todos)){
    for (var i = 0; i < parsedData.todos.length; i++){
      updateData.todos[parsedData.todos[i]].votes += 1;
    }
  }
  if (!isEmptyObject(parsedData.events)){
    for (var i = 0; i < parsedData.events.length; i++){
      updateData.events[parsedData.events[i]].vote += 1;
    }
  }
    fs.writeFile("./db/" + uniqueId, JSON.stringify(updateData), function(err) {
        if(err) {
            res.send(err);
        }
        res.send("Saved");
    });
  });
}

exports.downvoteFile = (req, res) => {
  var uniqueId = req.body.id;
  fs.readFile("./db/"+uniqueId, 'utf-8', (err, oldData) => {
  if (err) {
    res.send(err);
  }
  var updateData = JSON.parse(oldData);
  var newFlights = req.body.data.flights;
  if (!isEmptyObject(newFlights)){
    for (var i = 0; i < newFlights.length; i++){
      updateData.flights[newFlights[i]].votes -= 1;
    }
  }

  var newAccommodations = req.body.data.accommodations;
  if (!isEmptyObject(newAccommodations)){
    for (var i = 0; i < newAccommodations.length; i++){
      updateData.accommodations[newAccommodations[i]].votes -= 1;
    }
  }

  var newTodos = req.body.data.todos;
  if (!isEmptyObject(newTodos)){
    for (var i = 0; i < newTodos; i++){
      updateData.todos[newTodos[i]].votes -= 1;
    }
  }

  var newEvents = req.body.data.events;
  if (!isEmptyObject(newEvents)){
    for (var i = 0; i < newEvents; i++){
      updateData.events[newEvents[i]].vote -= 1;
    }
  }

  console.log(updateData);
  res.send(updateData);
});
}

function isEmptyObject(obj) {
  for (var key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      return false;
    }
  }
  return true;
}
