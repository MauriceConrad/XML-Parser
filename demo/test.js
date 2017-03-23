const xml = require('../');

var xmlDoc = new xml.DOM(xml.parse('<?xml version="1.0" encoding="UTF-8"?>' +
                                     '<root class="class-1 class-2">Root Element</root>'));

var e = xmlDoc.document.getElementsByCheckFunction(function(element) {
  if (element.type === "element" && element.childNodes.length == 30) {
    return true;
  }
});

console.log(e);
