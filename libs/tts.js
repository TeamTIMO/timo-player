module.exports = class TTS {
  constructor (Speaky, Speaker) {
    this.speaky = new Speaky('/usr/share/pico/lang/de-DE_ta.bin', '/usr/share/pico/lang/de-DE_gl0_sg.bin')
    this.Speaker = Speaker
    this.speaker = new Speaker({
      channels: 2,          // 2 channels
      bitDepth: 16,         // 16-bit samples
      sampleRate: 44100     // 44,100 Hz sample rate
    })
  }
  play (subtype, file) {
    this.speaky.speak(file).pipe(this.speaker)
  }
  pause () {
    
  }
  togglePlay () {
    
  }
  stop () {
    
  }
  next () {
    return null
  }
  prev () {
    return null
  }
}
