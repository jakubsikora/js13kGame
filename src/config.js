export default [{
  id: 0,
  belts: 1,
  loop: 2,
  airport: 'Wroclaw Airport',
  luggage: {
    min: 3,
    max: 3,
  },
  flights: [{
    arrival: '09:00:00',
    origin: 'Warsaw',
    passengers: 1,
  }],
  lost: 0,
}, {
  id: 1,
  belts: 1,
  loop: 2,
  airport: 'Wroclaw Airport',
  luggage: {
    min: 1,
    max: 1,
  },
  flights: [{
    arrival: '09:01:00',
    origin: 'Warsaw',
    passengers: 2,
  }, {
    arrival: '09:10:00',
    origin: 'London sad sa',
    passengers: 1,
  }],
  lost: 3,
}];
