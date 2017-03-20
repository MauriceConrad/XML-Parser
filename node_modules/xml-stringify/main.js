module.exports = {
  stringify: function(xmlObj, spaces) {
    var result = createInner(xmlObj, spaces, 0);
    if (spaces == 0) {
      result = result.replace(/\n/g, "");
    }
    return result;
  }
}
function createInner(tagInner, spaces, layer) {
  var indent = (function() {
    var spaceStr = (function() {
      var result = "";
      for (var i = 0; i < spaces; i++) {
        result += " ";
      }
      return result;
    })();
    var result = "";
    for (var i = 0; i < layer; i++) {
      result += spaceStr;
    }
    return result;
  })();
  var tags = '';
  tagInner.forEach(function(inner) {
    inner.attributes = inner.attributes || {};
    var attributesStr = (function() {
      var attrs = " ";
      Object.keys(inner.attributes).forEach(function(attribute) {
        attrs += attribute + '="' + inner.attributes[attribute] + '" ';
      });
      return attrs.substring(0, attrs.length - 1);
    })();
    if (inner.type === "element") {
      tags += indent + '<' + inner.tagName + attributesStr + (inner.closingChar || "") +'>\n' + (inner.closing == false ? "" : (createInner(inner.childNodes || [], spaces, layer + 1) + indent + '</' + inner.tagName + '>\n'));
    }
    else if (inner.type === "text") {
      tags += (indent + inner.text.replace(/\n/g, "\n" + indent) + '\n');
    }
  });
  return tags;
}
