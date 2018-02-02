
module.exports = class Local {
  constructor () {
    this.player = null
    this.Omx = require('node-omxplayer')
  }
  play (file) {
    this.player = this.Omx(file)
    this.player.play()
  }
  pause () {
    this.player.pause()
  }
  playpause () {
    this.player.pause()
  }
  stop () {
    this.player.quit()
  }
}
