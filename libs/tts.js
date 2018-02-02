module.exports = class TTS {
  constructor () {
    this.say = require('say')
  }
  play (file) {
    console.log('[TIMO-PLAYER]: TTS: ' + file)
    this.say.speak(file)
  }
  pause () {
    this.say.pause()
  }
  playpause () {
    this.say.pause()
  }
  stop () {
    this.say.stop()
  }
}
