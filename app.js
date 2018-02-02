/**
 * @overview Player Microservice Server File
 * @module index
 * @author Dominik Sigmund
 * @version 0.1
 * @description Starts the Server and keeps it running
 * @memberof timo-player
 */

 // Require needed modules
 console.log('Starting up TIMO-Player-Service...')
 console.log('Pulling in dependencies...')
 var config = require('./config.json')
 var request = require('request-json')

 var express = require('express')
 var bodyParser = require('body-parser')
 var app = express()
 var server = require('http').createServer(app)

// Players
 var Local = require('./libs/local.js')
 var TTS = require('./libs/tts.js')

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
   local: new Local(),
   tts: new TTS()
 }

 var nowPlaying = {}

 var ioSock = require('socket.io-client')(config.ioservice)
 ioSock.on('connect', function () {
   console.log('[TIMO-PLAYER] Connected to IO-Service')
 })
 ioSock.on('io', function (data) {
   if (data.title === 'id') {
     console.log('[TIMO-PLAYER] Got ID from IO-Service: ' + data.body)
     dataClient.get(data.body, function (err, res, body) {
       if (err) {
         console.error('[TIMO-PLAYER] ' + JSON.stringify(err))
         // ioSock.emit('io', {title: 'setled', body: '#FF0000'})
       } else {
         nowPlaying = body
         console.log('[TIMO-PLAYER] ' + JSON.stringify(nowPlaying))
         players[body.source].play(body.link)
         // ioSock.emit('io', {title: 'setled', body: '#00FF00'})
       }
     })
   }
 })

// Routes
 app.get('/now', function (req, res) {
   res.json(nowPlaying)
 })
 app.put('/playpause', function (req, res) {
   players[nowPlaying].pause()
   // ioSock.emit('io', {title: 'setled', body: '#FF6600'})
   res.status(200).end()
 })
 app.put('/stop', function (req, res) {
   players[nowPlaying].stop()
   ioSock.emit('io', {title: 'setled', body: '#FF0000'})
   res.status(200).end()
 })
 app.put('/volup', function (req, res) {
   // ioSock.emit('io', {title: 'volup', body: ''})
 })
 app.put('/voldown', function (req, res) {
   // ioSock.emit('io', {title: 'voldown', body: ''})
 })
 app.post('/playthis', function (req, res) {
   if (req.body !== null || typeof req.body !== 'undefined') {
     nowPlaying = req.body
     players[req.body.source].play(req.body.link)
     // ioSock.emit('io', {title: 'setled', body: '#00FF00'})
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
   console.error(err)
   exitHandler(null, err)
 })

  // keep running
 process.stdin.resume()
