const xml = require('../');
const fs = require('fs');

var xmlObj = xml.parse('<?xml version="1.0" encoding="UTF-8"?><root name="Root   > Element    1" class="test" hallo="ss" attr1 was=hahaha  attr2 ?><div>hahaha</div></root>');

console.log(xmlObj);
