exports.getAccommodation = (req, res) => {
  
};

function getHotels(checkinDate, checkoutDate) {
  var username = 'booking_hackathon_ichack18';
  var password = 'WorkingAtBooking.com2018';
  var auth = 'Basic ' + Buffer.from(username + ':' + password).toString('base64');
  // new Buffer() is deprecated from v6

  // auth is: 'Basic VGVzdDoxMjM='
  'https://distribution-xml.booking.com/2.0/json/hotelAvailability?checkin=2018-04-27&checkout=2018-04-28&city_ids=-1565670&room1=A,A&extras=room_details,hotel_details'
  endpoint = 'hotelAvailability'
  parms = {
    checkin: checkinDate,
    checkout: checkoutDate,
    city_ids: ...,
    extras: 'room_details,hotel_details'
  }
  var header = {'Host': 'https://distribution-xml.booking.com/2.0/json/' + endpoint + '?[parameters]', 'Authorization': auth};
  var request = client.request('GET', '/', header);
}

function getCityId() {
  
  return city_id
}