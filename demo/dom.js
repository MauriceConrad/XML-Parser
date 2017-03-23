const xml = require('../');
const fs = require('fs');

var xmlDoc = new xml.DOM(xml.parse(fs.readFileSync(__dirname + "/test.xml", "utf8")));

// Get elements by methods within themselfs
var element1 = xmlDoc.document.getElementsByTagName("element")[0];
var element2 = xmlDoc.document.getElementsByTagName("element")[1];

// Set properties directly like tagName, attributes
element1.tagName = "NewTagName";
element1.attributes.newAttribute = "New Attributes Content";

// Remove childs directly
element2.removeChild(element2.childNodes[1]);

// Append childs
var elementToAppend = {
  type: "element",
  tagName: "appendedElement",
  childNodes: [
    {
      type: "text",
      text: "Hello World :) I'm appended!"
    }
  ]
};
element2.appendChild(elementToAppend);

// Inserts childs before antother one
element2.insertBefore({
  type: "element",
  tagName: "insertedBeforeElement",
  childNodes: [
    {
      type: "text",
      text: "Hello World :) I'm inserted before another one!"
    }
  ]
}, elementToAppend); // Inserts the new element before the one we appended before (elementToAppend)


var xmlDocStr = xml.stringify(xmlDoc.document.childNodes, 2);

console.log(xmlDocStr);
