const request = require('request');
const { fetchCoordsByIP } = require('./iss')


const fetchMyIP = (callback) => {
  request(`https://api.ipify.org/?format=json`, (error, response, body) => {
    if (!error) {
      const data = JSON.parse(body).ip;
      callback(null, data);
    }
    if (error) {
      callback((`The following error has occured: `, error), null);
      return;
    }
    if (response.statusCode !== 200) {
      const msg = `Oop, the status code ${response.statusCode} suddenly appeared! Response: ${body}`;
      callback(Error(msg), null);
      return;
    }
  });
};

fetchCoordsByIP("INVALID_IP", (error, data) => {
  if (error) {
    console.log(`Uh-oh! It didn't work :( here's your error: `, error);
    return;
  }
  console.log(data);
});



module.exports = {
  fetchMyIP
}



// fetchMyIP((error, ip) => {
//   if (error) {
//     console.log(`Uh-oh! It didn't work :( here's your error: `, error);
//     return;
//   }
//   console.log(`It worked! Here's your IPV4 address: `, ip);
// })