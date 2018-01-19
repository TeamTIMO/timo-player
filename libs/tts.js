module.exports = class TTS {
  constructor () {
    this.say = require('say')
  }
  play (file) {
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
