const { nextISSTimesForMe } = require('./iss');


const printPassTimes = (passTimes) => {
  for (const pass of passTimes) {
    const datetime = new Date(0);
    datetime.setUTCSeconds(pass.risetime);
    const duration = pass.duration;
    console.log(`The ISS will pass you on ${datetime} for ${duration} seconds!`);
  }
};

nextISSTimesForMe((error, passTimes) => {
  if (error) {
    return console.log(`Something went wrong! Error:  `, error);
  }
  printPassTimes(passTimes);
});

