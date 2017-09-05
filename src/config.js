export default [{
  id: 1,
  belts: 2,
  airport: 'Wroclaw Airport',
  luggage: {
    min: 1,
    max: 1,
  },
  flights: [{
    code: 'foo1',
    arrival: '09:01:00',
    origin: 'Warsaw',
    passengers: 2,
  }, {
    code: 'foo2',
    arrival: '09:02:00',
    origin: 'Warsaw',
    passengers: 1,
  }],
  lost: 2,
}];
