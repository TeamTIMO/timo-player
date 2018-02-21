
module.exports = class Local {
  constructor (omx) {
    this.player = null
    this.Omx = omx
    this.player = this.Omx()
    this.player.on('close', function () {
      console.log('[TIMO-PLAYER]: Local: player closed')
    })
    this.player.on('error', function (error) {
      console.log('[TIMO-PLAYER]: Local: error: ' + error)
    })
  }
  play (file) {
    this.player.newSource(file)
    console.log('[TIMO-PLAYER]: Local: ' + file)
  }
  pause () {
    this.player.pause()
  }
  stop () {
    this.player.quit()
  }
}
