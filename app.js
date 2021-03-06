/**
 * @overview Player Microservice Server File
 * @module index
 * @author Dominik Sigmund
 * @version 0.1
 * @description Starts the Server and keeps it running
 * @memberof timo-player
 */

// Require needed modules
console.log('[TIMO-PLAYER] Starting up TIMO-Player-Service...')
console.log('[TIMO-PLAYER] Pulling in dependencies...')
var config = require('./config.json')
var request = require('request-json')
var express = require('express')
var bodyParser = require('body-parser')
var app = express()
var server = require('http').createServer(app)

// Players
var MP3 = require('./libs/mp3.js')
var OMXPlayer = require('node-omxplayer')
var TTS = require('./libs/tts.js')
var Speaky = require('speaky')
const Speaker = require('speaker')

// Accept JSON Body
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: true
}))

// Listen to Port
if (process.argv.length >= 4) {
  config.port = process.argv[3]
}
server.listen(config.port)
console.log('[TIMO-PLAYER] TIMO-Playerservice running on ' + config.port)

var dataClient = request.createClient(config.dataservice)

var players = {
  mp3: new MP3(OMXPlayer),
  tts: new TTS(Speaky, Speaker)
}

var nowPlaying = {}

var ioSock = require('socket.io-client')(config.ioservice + '?token=TIMO-PLAYER')
ioSock.on('connect', function () {
  console.log('[TIMO-PLAYER] Connected to IO-Service')
})
ioSock.on('disconnect', function () {
  console.log('[TIMO-PLAYER] Disconnected to IO-Service')
})
ioSock.on('error', function (error) {
  console.log('[TIMO-PLAYER] Error with IO-Service: ' + error)
})
ioSock.on('io', function (data) {
  if (data.t1 === 1) {
    players[nowPlaying.type].prev()
  } else if (data.t2 === 1) {
    players[nowPlaying.type].next()
  } else {
    console.log('[TIMO-PLAYER] Got ID from IO-Service: ' + JSON.stringify(data.body))
    if (data.rfiddata === '' || data.rfiddata === nowPlaying.id) {
      players[nowPlaying.type].pause()
    } else {
      players[nowPlaying.type].stop()
      if (data.rfiddata.startsWith('http')) { // Online Database
        request.createClient(data.rfiddata).get('', function (err, res, body) {
          if (err) {
            console.error('[TIMO-PLAYER] Error with Remote-Web-Service: ' + JSON.stringify(err))
            ioSock.emit('io', {title: 'setled', body: '#FF0000'})
          } else {
            players[nowPlaying.type].stop()
            nowPlaying = body
            console.log('[TIMO-PLAYER] From Remote-Web-Service: ' + JSON.stringify(nowPlaying))
            players[body.type].play(body.subtype, body.link)
            ioSock.emit('io', {title: 'setled', body: '#00FF00'})
          }
        })
      } else { // Local Database
        dataClient.get(data.rfiddata, function (err, res, body) {
          if (err) {
            console.error('[TIMO-PLAYER] Error with Data-Service: ' + JSON.stringify(err))
            ioSock.emit('io', {title: 'setled', body: '#FF0000'})
          } else {
            players[nowPlaying.type].stop()
            nowPlaying = body
            console.log('[TIMO-PLAYER] From Data-Service: ' + JSON.stringify(nowPlaying))
            players[body.type].play(body.subtype, body.link)
            ioSock.emit('io', {title: 'setled', body: '#00FF00'})
          }
        })
      }
    }
  }
})

// Routes
app.get('/now', function (req, res) {
  res.json(nowPlaying)
})
app.put('/togglePlay', function (req, res) {
  players[nowPlaying.type].togglePlay()
  ioSock.emit('io', {title: 'setled', body: '#FF6600'})
  res.status(200).end()
})
app.put('/stop', function (req, res) {
  players[nowPlaying.type].stop()
  ioSock.emit('io', {title: 'setled', body: '#FF0000'})
  res.status(200).end()
})
app.put('/volup', function (req, res) {
  // TODO: Vol up?
  ioSock.emit('io', {title: 'volup', body: ''})
})
app.put('/voldown', function (req, res) {
  // TODO: Vol Down?
  ioSock.emit('io', {title: 'voldown', body: ''})
})
app.post('/playthis', function (req, res) {
  if (req.body !== null || typeof req.body !== 'undefined') {
    nowPlaying = req.body
    players[req.body.type].play(req.body.subtype, req.body.link)
    ioSock.emit('io', {title: 'setled', body: '#00FF00'})
  } else {
    res.status(400).end()
  }
})

/** Handles exitEvents by destroying open connections first
 * @function
* @param {object} options - Some Options
* @param {object} err - An Error Object
*/
function exitHandler (options, err) {
  console.log('Exiting...')
  process.exit()
}
// catches ctrl+c event
process.on('SIGINT', exitHandler)
// catches uncaught exceptions
process.on('uncaughtException', function (err) {
  console.error('[TIMO-PLAYER] uE: ' + err)
  exitHandler(null, err)
})

// keep running
process.stdin.resume()
