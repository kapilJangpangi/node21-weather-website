const request = require("postman-request");

const forecast = (latitude, longitude, callback) => {

  const url = 'http://api.weatherstack.com/current?access_key=79704a20f4419d65baf010e965bb28f8&query=' + encodeURIComponent(latitude) + ',' + encodeURIComponent(longitude) + '&units=m';

  request({ url, json: true}, (error, { body }) => { //{ body this is destructuring otherwise reposne => }

    if(error) {
      callback('Unable to connect location services!', undefined);
    } else if(body.error) {
      callback('Unable to find the result. Try another Search!', undefined);
    } else {
      callback(undefined, body.current.weather_descriptions[0] + '. In ' + body.location.name + '. It is currently '  + body.current.temperature + ` degree. Time ` + body.current.observation_time + '.')
    }
  })

}

module.exports = forecast