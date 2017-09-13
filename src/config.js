const cities = ['London', 'Warsaw', 'Paris', 'Berlin', 'Madrid', 'Moscow',
  'Rome', 'Chicago', 'Glasgow', 'Dublin'];

function checkTime(i) {
  if (i < 10) i = `0${i}`;
  return i;
}

function getTime(t) {
  const h = t.getHours();
  let m = t.getMinutes();
  let s = t.getSeconds();
  m = checkTime(m);
  s = checkTime(s);

  return `${h}:${m}:${s}`;
}

function generateLevel(id) {
  const time = new Date();
  time.setHours(9);
  time.setMinutes(0);
  time.setSeconds(0);

  const numberOfFlights = 1 + (id * 2);
  const flights = [];

  for (let i = 0; i < numberOfFlights; i++) {
    if (id === 0) {
      time.setMinutes(0);
    } else {
      time.setMinutes(time.getMinutes() + 10);
    }
    flights.push({
      arrival: getTime(time),
      origin: cities[Math.floor(Math.random() * cities.length)],
      passengers: id === 0 ? 1 : Math.ceil(id * 1.5),
    });
  }

  return {
    id,
    belts: id > 1 ? 2 : 1,
    loop: 2,
    luggage: {
      min: 1,
      max: id > 2 ? 3 : 1,
      speed: id > 2 ? 1 : 0.5,
    },
    flights,
    lost: id > 2 ? 2 : 3,
  };
}

const levels = [];

for (let i = 0; i < 5; i++) {
  levels.push(generateLevel(i));
}

export default levels;
