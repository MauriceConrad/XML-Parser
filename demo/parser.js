const xml = require('../');
const fs = require('fs');

var xmlObj = xml.parse('<?xml version="1.0" encoding="UTF-8"?>' +
                          '<root>Root Element</root>');

console.log(xmlObj[1]);
