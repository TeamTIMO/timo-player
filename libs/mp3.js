
module.exports = class Local {
  constructor (omx) {
    this.player = null
    this.Omx = omx
    this.player = this.Omx()
    this.player.on('close', function () {
      console.log('[TIMO-PLAYER]: mp3: player closed')
    })
    this.player.on('error', function (error) {
      console.log('[TIMO-PLAYER]: mp3: error: ' + error)
    })
  }
  play (subtype, file) {
    // TODO: use subtype for more info
    this.player.newSource(file)
    console.log('[TIMO-PLAYER]: mp3: ' + file)
  }
  next () {
    // TODO: next element, if possible
  }
  prev () {
    // TODO: last element, if possible
  }
  pause () {
    this.player.pause()
  }
  stop () {
    this.player.quit()
  }
}
