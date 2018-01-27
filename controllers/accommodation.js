exports.getAccommodation = (req, res) => {
  
};

function getHotels() {
  var username = 'booking_hackathon_ichack18';
  var password = 'WorkingAtBooking.com2018';
  var auth = 'Basic ' + Buffer.from(username + ':' + password).toString('base64');
  // new Buffer() is deprecated from v6

  // auth is: 'Basic VGVzdDoxMjM='

  var header = {'Host': 'https://[domain]/[version]/json/[endpoint]?[parameters]', 'Authorization': auth};
  var request = client.request('GET', '/', header);
}