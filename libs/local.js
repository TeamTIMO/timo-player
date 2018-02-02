
module.exports = class Local {
  constructor () {
    this.player = null
    this.Omx = require('node-omxplayer')
  }
  play (file) {
    this.player = this.Omx(file)
    this.player.on('close', function () {
      console.log('[TIMO-PLAYER]: Local: player closed')
    })
    this.player.on('error', function (error) {
      console.log('[TIMO-PLAYER]: Local: error: ' + error)
    })
    console.log('[TIMO-PLAYER]: Local: ' + file)
    // this.player.play()
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
