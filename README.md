# TIMO - Player Microservice

Plays Something to the speakers.

Reacts on sockets from the IO-Microservice with title "qr" by asking the data-service for information.

Then plays the file, using various Libs.

## Libs

Every Lib has a method "play", that finally sends the file to the speakers

### lib-local

Plays local files using the mplayer

### lib-youtube

Streams YouTube Audio

### lib-soundcloud

Streams Soundcloud Audio

### lib-tts

Uses a TTS-Service to play written text

### lib-spotify

Streams Spotify File

### lib-podcast

Plays latest file of given podcast

### lib-stream

Plays mp3 behind url

### lib-rss2tts

Reads out latest rss files (info in link)

### lib-midi

Plays a sequence of notes

---

## TODO

* puml for libs
* sequence puml
* testing
* jsdoc
* code app
* libs
  * make objects