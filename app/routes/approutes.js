'use strict';
var tracer = require('../../server.js');
var logger = require('../../logger.js');
const axios = require('axios');



module.exports = function(app) {
app.get("/", (req, res) => {
    res.send("Hi.  This is Brad's app that he's going to use to become an APM pro.");
    logger.log('info', 'The logger is working!');
  })
  
  app.get('/friends/:friend', (req, res) => {
    // Get the active span
    const span = tracer.scope().active()
    if (span !== null) {
    //   span.setTag('friends', req.params.friend);
      span.setTag('friend', req.params.friend)

    }
    console.log(span);
    res.send("Brad is glad to call you a friend, " + req.params.friend.toUpperCase() +"!");
  });
  
  app.get("/quote", (req, res) => {
    let quote = '';
    let author ='';
    axios.get('https://zenquotes.io/api/random')
      .then(response => {
        quote = JSON.stringify(response.data[0].q);
        author = JSON.stringify(response.data[0].a);
        console.log(quote);
        console.log(author);
        let sentence = quote + '-' + author;
        res.send(sentence);
      })
      .catch(error => {
        console.log(error);
      });
  });
  
  app.get("/wait", async (req, res) => {
    let randomNumber = Math.floor(Math.random() * 10000);
    logger.log('info', `Someone just hit the /wait endpoint, it took them over ${randomNumber / 1000} seconds to receive a response.`);
    //added brad_forLoop in hopes of seeing it in the profiler :/
    function brad_forLoop(randomNumber) {
      for (let i = 0; i < randomNumber * 1000; i++) { return i *= i; }
    }
    res.setTimeout(randomNumber, function () {
      res.send(`It took over ${randomNumber / 1000} seconds for you to receieve a response from the server thanks to Brad's setTimeout function.  Try again and see how long it takes!`);
    });
  });
    };
 
  