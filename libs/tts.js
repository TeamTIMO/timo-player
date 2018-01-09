const say = require('say')
exports.play = function (file) {
  say.speak(file)
}
exports.stop = function () {
  say.stop()
}
