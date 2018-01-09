var Player = require('player')
var player
exports.play = function (file) {
  player = new Player(file)
  player.play()
}
exports.stop = function () {
  player.pause()
}
