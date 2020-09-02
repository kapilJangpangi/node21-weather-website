const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geocode = require('../src/utils/geocode');
const forecast = require('../src/utils/forecast');


const app = express();
const port = process.env.PORT || 3000;
//THis is for heroku to getting the access of the PORT from environment variable

//Define paths for Express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

//Setup handlerbars engine and views loction
app.set("view engine", "hbs"); // getting handlerbars setup, creating dynamic template
app.set("views", viewPath);
hbs.registerPartials(partialsPath);

//Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather App",
    name: "Kapil",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Me",
    name: "Kapil",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    text: "I am not able to login",
    title: "Help",
    name: "Kapil",
  });
});

app.get("/weather", (req, res) => {
  const address = req.query.address
  if(!address) {
    return res.send({
      error: 'You must provide a address'
    })
  }


  geocode(address, (error, {latitude, longitude, location} = {}) => {//THis is impo {} destructuring  

    if(error) {
      return res.send({
        error: error
      })
    }
    forecast(latitude, longitude, (error, forecastData) => {
      if(error) {
        return res.send({
          error
        })
      }
      res.send({
        location,
        forecast: forecastData,
        address
      })
    })
  })
  // res.send({
  //   forecast: "temperature",
  //   loaction: "Not Provided",
  //   address
  // });
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "You must provide a search term",
    });
  }
  console.log(req.query.search);
  res.send({
    products: [],
  });
});
//it let us configure what the server should do when someone tries to get the resources at a specific URL, maybe we sending back html or maybe JSON
//app.com, app.com/help

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "Help 404",
    name: "Kapil",
    errorMessage: "Help Page not found",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Kapil",
    errorMessage: "Requested Page Not Exist!",
  });
});

app.listen(port, () => {
  console.log('Server is up on port' + port);
});

// app.get('', (req, res) => {
//   res.send("<h1>weather</h1>")
//

// app.get('/help', (req, res) => {
//   res.send([
//     {
//     name: 'Kapil',
//     age: 27
//   },
//   {
//     occupiation: 'Full Stack Developer'
//   }
// ])
// })

// app.get('/about', (req,res) => {
//   res.send('<h3>About Page</h3>');
// })
