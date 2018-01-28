exports.getFlights = (req, res) => {
  var r = [];
  r.push({fromLoc: 'Lyon',
toLoc : 'London',
airline : 'BAW',
date : '20180129',
timeDepart : '1300',
timeArrive : '1700',
airportFrom : 'LYS',
airportTo : 'LGW',
price : '300'});
r.push({
  fromLoc : 'Kuala Lumpur',
toLoc : 'New York',
airline : 'MAH',
date : '20180203',
timeDepart : '0700',
timeArrive : '1600',
airportFrom : 'KUL',
airportTo : 'NYR',
price : '1800'
});
res.send(r);
}
