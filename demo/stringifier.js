const xml = require('../');

var xmlDoc = [
  {
    type: "element",
    tagName: "?xml",
    attributes: {
      version: "1.0",
      encoding: "UTF-8"
    },
    closing: false,
    closingChar: "?"
  },
  {
    type: "element",
    tagName: "root",
    attributes: {
      title: "Root Element",
      class: "Classes"
    },
    childNodes: [
      {
        type: "element",
        tagName: "element",
        attributes: {
          class: "element-1"
        },
        childNodes: [
          {
            type: "text",
            text: "Inhalt\nHahahaa"
          },
          {
            type: "element",
            tagName: "unClosedTag",
            closing: false,
            closingChar: "/"
          },
          {
            type: "element",
            tagName: "newTag",
            attributes: {
              test: "Hahahaaha Hahahaha Du Otto!"
            }
          }
        ]
      }
    ]
  }
];
var xmlString = xml.stringify(xmlDoc, 2);
console.log(xmlString);
