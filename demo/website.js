const http = require('http');
const https = require('https');
const xml = require('../');

https.request({
  host: "amina-koyim.de",
  method: "GET",
  path: "/"
}, function(response) {
  var result = "";
  response.on("data", function(chunk) {
    result += chunk;
  });
  response.on("end", function() {
    var doc = xml.parse(result);
    //console.log(JSON.stringify(doc, null, 2));
    console.log(doc);
  })
}).end();
