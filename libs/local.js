
module.exports = class Local {
  constructor () {
    this.player = null
    this.Player = require('player')
  }
  play (file) {
    this.player = new this.Player(file)
    this.player.play()
  }
  pause () {
    this.player.pause()
  }
  playpause () {
    this.player.pause()
  }
  stop () {
    this.player.pause()
  }
}
