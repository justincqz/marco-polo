const Client = require('node-rest-client').Client;
const client = new Client();
const MY_EVENTFUL_KEY = 'XK3fkGf76X6jM4Wt'

exports.getEvents = (req, res) => {
  var currentCity = req.query.destCity;
  var startDate = req.query.startDate + '00-';
  var endDate = req.query.endDate + '00';

  var queryString = 'http://api.eventful.com/rest/events/search?app_key=' + MY_EVENTFUL_KEY
              + '&location=' + currentCity + '&date=' + startDate + endDate
              + '&page_size=20';

  console.log(queryString);
  client.get(queryString, '', function (data, response) {
    var events = data.search.events.event;
    console.log(events);

    var r = [];
    console.log(events.length);
    for (var i = 0; i < events.length; i++){
      r.push({
        name: events[i].title,
        startTime: events[i].start_time,
        endTime: events[i].end_time,
        location: events[i].venue_name,
      })
    }
    console.log(data.search.total_items);
    res.json(r);
  });


};
