module.exports = {
  parse: require(__dirname + "/resources/parser.js").parseFromString,
  stringify: require(__dirname + "/resources/stringifier.js").stringify,
  DOM: require(__dirname + "/resources/dom.js").DOM
}
