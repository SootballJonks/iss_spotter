const request = require('request');

const fetchMyIP = (callback) => {
  request(`https://api.ipify.org/?format=json`, (error, response, body) => {
    if (error) {
      callback((`The following error has occured: `, error), null);
      return;
    }
    if (response.statusCode !== 200) {
      const msg = `Oop, the status code ${response.statusCode} suddenly appeared! Response: ${body}`;
      callback(Error(msg), null);
      return;
    }
    const data = JSON.parse(body).ip;
    callback(null, data);
  });
};

const fetchCoordsByIP = (ip, callback) => {
  request(`https://freegeoip.app/json/${ip}`, (error, response, body) => {

    if (error) {
      callback(`The following error has occured: ${error}`, null);
      return;
    }

    if (response.statusCode !== 200) {
      const msg = `Status code ${response.statusCode} suddenly appeared! Response: ${body}`;
      callback(Error(msg), null);
      return;
    }

    const { latitude, longitude } = JSON.parse(body);

    callback(null, { latitude, longitude });
  });
};

const fetchISSFlyOverTimes = (coords, callback) => {
  const url = `http://api.open-notify.org/iss-pass.json?lat=${coords.latitude}&lon=${coords.longitude}`;

  request(url, (error, response, body) => {
    if (error) {
      callback(`The following error has occured: ${error}`, null);
      return;
    }

    if (response.statusCode !== 200) {
      const msg = `Status code ${response.statusCode} suddenly appeared! Response: ${body}`;
      callback(Error(msg), null);
      return;
    }
    
    const data = JSON.parse(body).response;
    callback(null, data);
  });
};


const nextISSTimesForMe = (callback) => {
  fetchMyIP((error, ip) => {
    if (error) {
      return callback(error, null);
    }

    fetchCoordsByIP(ip, (error, loc) => {
      if (error) {
        return callback(error, null);
      }

      fetchISSFlyOverTimes(loc, (error, nextPasses) => {
        if (error) {
          return callback(error, null);
        }

        callback(null, nextPasses);
      });
    });
  });
};

module.exports = {
  nextISSTimesForMe
};