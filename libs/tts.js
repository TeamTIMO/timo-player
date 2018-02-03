module.exports = class TTS {
  constructor (Speaky, fs, OMXPlayer) {
    this.speaky = new Speaky('/usr/share/pico/lang/de-DE_ta.bin', '/usr/share/pico/lang/de-DE_gl0_sg.bin')
    this.fs = fs
    this.Omx = OMXPlayer
    this.player = this.Omx()
    this.player.on('close', function () {
      console.log('[TIMO-PLAYER]: TTS: player closed')
    })
    this.player.on('error', function (error) {
      console.log('[TIMO-PLAYER]: TTS: error: ' + error)
    })
  }
  play (file) {
    this.player.newSource(this.speaky.speak(file))
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
