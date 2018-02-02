module.exports = class TTS {
  constructor () {
    this.say = require('say')
  }
  play (file) {
    console.log('[TIMO-PLAYER]: TTS: ' + file)
    this.say.speak(file, 'kal_diphone', function (err) {
      if (err) {
        return console.error('[TIMO-PLAYER]: TTS: ' + err)
      } else {
        console.log('[TIMO-PLAYER]: TTS: Text has been spoken.')
      }
     
    })
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
