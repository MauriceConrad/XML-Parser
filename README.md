# XML Parser, Stringifier and DOM

Parse XML, HTML and more with a very tolerant XML parser and convert it into a DOM.

These three components are separated from each other as won modules.

|Component|Size|
|---|---|
|Parser|4.7 KB|
|Stringifier|1.3 KB|
|DOM|3.1 KB|

## Install
```bash
npm install xml-parse
```
## Require
```javascript
const xml = require("xml-parse");
```

## Parser

Parsing is very simple.

Just call the ```parse``` method of the *xml-parse* instance.

```javascript
const xml = require("xml-parse");

// Valid XML string
var parsedXML = xml.parse('<?xml version="1.0" encoding="UTF-8"?>' +
                          '<root>Root Element</root>');
console.log(parsedXML);

// Invalid XML string
var parsedInavlidXML = xml.parse('<root></root>' +
                                 '<secondRoot>' +
                                   '<notClosedTag>' +
                                 '</secondRoot>');
console.log(parsedInavlidXML);
```

### Parsed Object Structure

The result of ```parse``` is JavaScript object that maybe looks like this:

(In this case we have the xml string of the valid xml example)
```javascript
[
  {
    type: 'element',
    tagName: '?xml',
    attributes: {
      version: '1.0',
      encoding: 'UTF-8'
    },
    childNodes: [],
    innerXML: '>',
    closing: false,
    closingChar: '?'
  },
  {
    type: 'element',
    tagName: 'root',
    attributes: {},
    childNodes: [
      {
        type: 'text',
        text: 'Root Element'
      }
    ],
    innerXML: 'Root Element',
    closing: true,
    closingChar: null
  }
]
```
**The root object is always an array because of the fact that it handles invalid xml with more than one root element.**

#### Object Nodes

There two kinds of objects. *element* and *text*.
A object has always the key ```type```.
The other keys depends from this *type*.

##### 'Element' Object Node

```javascript
{
  type: [String], // "element"
  tagName: [String], // The tag name of the tag
  attributes: [Object], // Object containing attributes as keys
  childNodes: [Array], // Array containing child nodes as object nodes ("element" or "text")
  innerXML: [String], // The inner XML of the tag
  closing: [Boolean], // If the tag is closed typically (</tagName>)
  closingChar: [String] || null // If it's not closed typically, the char that closes it ("!" or "?")
}
```

##### 'Text' Object Node
```javascript
{
  type: [String], // "text"
  text: [String] // Text contents of the text node
}
```

## Stringifier

The stringifier is the simplest component. Just pass a parsed object structure.

```javascript
const xml = require("xml-parse");

var xmlDoc = [
  {
    type: 'element',
    tagName: '?xml',
    attributes: {
      version: '1.0',
      encoding: 'UTF-8'
    },
    childNodes: [],
    innerXML: '>',
    closing: false,
    closingChar: '?'
  },
  {
    type: 'element',
    tagName: 'root',
    attributes: {},
    childNodes: [
      {
        type: 'text',
        text: 'Root Element'
      }
    ],
    innerXML: 'Root Element',
    closing: true,
    closingChar: null
  }
]

var xmlStr = xml.stringify(xmlDoc, 2); // 2 spaces

console.log(xmlStr);
```


## DOM

The ```DOM``` method of the *xml-parser* instance returns a Document Object Model with some methods.
It's orientated by the DOM of W3 but in this case it's not so complex.

```javascript
const xml = require("xml-parse");

var xmlDoc = new xml.DOM(xml.parse('<?xml version="1.0" encoding="UTF-8"?>' +
                                     '<root>Root Element</root>')); // Can also be file path.

dom.document; // Document Object. (Root)
```

### 'Element' Object Node

```javascript
// A element (e.g the 'document' object) has the following prototype methods and keys:

var objectNode = document.childNodes[1]; // Just an example

// This is the return of a object node element

objectNode = {
  type: 'element',
  tagName: 'tagName',
  attributes: [Object],
  childNodes: [Object],
  innerXML: 'innerXML',
  closing: true,
  closingChar: null,
  getElementsByTagName: [Function], // Returns all child nodes with a specific tagName
  getElementsByAttribute: [Function], // Returns all child nodes with a specific attribute value
  removeChild: [Function], // Removes a child node
  appendChild: [Function], // Appends a child node
  insertBefore: [Function], // Inserts a child node
  getElementsByCheckFunction: [Function], // Returns all child nodes that are validated by validation function
  parentNode: [Circular] // Parent Node
}
```

### Handling with child nodes

With ```appendChild``` or ```insertBefore``` methods of every object node you can append a child node. You don't have to do something like ```createElement```.

Because a child node is just a object node, with some properties like ```type```, ```tagName```, ```attributes```and more you just have to pass such an object to the function.

#### appendChild

```javascript
element.appendChild(childNode); // ChildNode is just a object node
```

##### Example

```javascript
const xml = require('xml-parse');

var xmlDoc = new xml.DOM(xml.parse('<?xml version="1.0" encoding="UTF-8"?>' +
                                     '<root>Root Element</root>'));

var root = xmlDoc.document.getElementsByTagName("root")[0];

root.appendChild({
  type: "element",
  tagName: "appendedElement",
  childNodes: [
    {
      type: "text",
      text: "Hello World :) I'm appended!"
    }
  ]
});
```

#### insertBefore

```javascript
element.insertBefore(childNode, elementAfter); // ChildNode is just a object node, elementAfter is just a child node of the parent 'element'
```

##### Example

```javascript
const xml = require('xml-parse');

var xmlDoc = new xml.DOM(xml.parse('<?xml version="1.0" encoding="UTF-8"?>' +
                                     '<root>Root Element</root>'));

var root = xmlDoc.document.getElementsByTagName("root")[0];

root.insertBefore({
  type: "element",
  tagName: "insertedElement",
  childNodes: [
    {
      type: "text",
      text: "Hello World :) I'm appended!"
    }
  ]
}, root.childNodes[0]);
```

#### removeChild

```javascript
element.removeChild(childNode); // ChildNode is juts a childNode of the parent 'element'
```

##### Example

```javascript
const xml = require('xml-parse');

var xmlDoc = new xml.DOM(xml.parse('<?xml version="1.0" encoding="UTF-8"?>' +
                                     '<root>Root Element</root>'));

var root = xmlDoc.document.getElementsByTagName("root")[0];

root.removeChild(root.childNodes[0]);

```

### parentNode

The ```parentNode``` of a object node represents the parent element. It's ```[Circular]``` reference in javascript's object structure.

```javascript
const xml = require('xml-parse');

var xmlDoc = new xml.DOM(xml.parse('<?xml version="1.0" encoding="UTF-8"?>' +
                                     '<root>Root Element</root>'));

var root = xmlDoc.document.getElementsByTagName("root")[0];

console.log(root.childNodes[0].parentNode); // Returns the 'root' element
```

## Get child nodes

### getElementsByTagName

```javascript
element.getElementsByTagName("myTagName"); // Returns all elements whose tag name is 'myTagName'
```

### getElementsByAttribute

```javascript
element.getElementsByAttribute("myAttribute", "myAttributeValue"); // Returns all elements whose attribute 'myAttribute' is 'myAttributeValue'
```

### getElementsByCheckFunction

```javascript
// With this method you can set custom 'get' methods.
element.getElementsByCheckFunction(function(element) {
  if (element.type === "element" && element.childNodes.length == 30) {
    return true;
  }
}); // Returns all elements that have exactly 30 childNodes
```
