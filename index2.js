const { nextISSTimesForMe } = require('./iss_promised');

const printPassTimes = (passTimes) => {
  for (const pass of passTimes) {
    const datetime = new Date(0);
    datetime.setUTCSeconds(pass.risetime);
    const duration = pass.duration;
    console.log(`The ISS will pass you on ${datetime} for ${duration} seconds!`);
  }
};

nextISSTimesForMe()
.then((passTimes) => {
  printPassTimes(passTimes);
})
.catch((error) => {
  console.log(`Something went wrong! Error:  `, error.message);
})