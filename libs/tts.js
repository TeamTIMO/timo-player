const say = require('say')
exports.play = function (file) {
  say.speak(file)
}
exports.pause = function () {
  say.pause()
}
exports.playpause = function () {
  // if playing, pause, else play
}
exports.stop = function () {
  say.stop()
}
