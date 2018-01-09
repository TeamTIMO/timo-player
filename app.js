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

 var dataClient = request.createClient(config.dataservice)

 var players = {
   local: require('./libs/local.js'),
   tts: require('./libs/tts.js')
 }

 var ioSock = require('socket.io-client')(config.ioservice)
 ioSock.on('io', function (data) {
   if (data.title === 'id') {
     dataClient.get(data.body, function (err, res, body) {
       if (err) {
         console.error(err)
         ioSock.emit('io', {title: 'setled', body: '#FF0000'})
       } else {
         players[body.source].play(body.link)
       }
     })
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
