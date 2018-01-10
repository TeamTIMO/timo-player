var Player = require('player')
var player
exports.play = function (file) {
  player = new Player(file)
  player.play()
}
exports.pause = function () {
  player.pause()
}
exports.playpause = function () {
  // if playing, pause, else play
}
exports.stop = function () {
  player.pause()
}
