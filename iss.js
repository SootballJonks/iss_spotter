const request = require('request');

const fetchCoordsByIP = (ip, callback) => {
  request (`https://freegeoip.app/json/${ip}`, (error, response, body) => {

    if (error) {
    callback(`The following error has occured: ${error}`, null);
    return;
    }

    if (response.statusCode !== 200) {
    const msg = `Status code ${response.statusCode} suddenly appeared! Response: ${body}`;
    callback(Error(msg), null);
    return;
    }

    const data = { Latitude: JSON.parse(body).latitude, Longitude: JSON.parse(body).longitude }

      callback(null, data);
  })
}

module.exports = {
  fetchCoordsByIP
}