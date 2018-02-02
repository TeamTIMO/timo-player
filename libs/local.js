
module.exports = class Local {
  constructor (omx) {
    this.player = null
    this.Omx = omx
    this.player = this.Omx()
  }
  play (file) {
    this.player.newSource(file)
    this.player.on('close', function () {
      console.log('[TIMO-PLAYER]: Local: player closed')
    })
    this.player.on('error', function (error) {
      console.log('[TIMO-PLAYER]: Local: error: ' + error)
    })
    console.log('[TIMO-PLAYER]: Local: ' + file)
    console.log('[TIMO-PLAYER]: Local: ' + this.player.info())
    console.log('[TIMO-PLAYER]: Local: Running? ' + this.player.running)
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
