var port = 1496
var startServer = true

var express = require('express')
var app = express()
var http = require('http').createServer()
var websocket = require('ws').WebSocketServer
var ws = new websocket({ server: http })

ws.on('connection', function (f) {
    var state; // main
    f.on('message', function (msg) {
        array = new Uint8Array(msg);
        let cmd = "";
        array.forEach(function (h) {
            let char = String.fromCharCode(h);
            cmd += char
        });
        cmd = JSON.parse(cmd);

        if (cmd[0] == 'play') {
            client = mc.createClient(cmd[1])
            client.on('packet', function (p, p2) {
                console.log('Server packet: ' + JSON.stringify(['read', p, p2]))
                f.send(JSON.stringify(['read', p, p2]))
            })
        }
        f.on('close', function () {
        })
    })
})
app.use(express.static('app'))
http.on('request', app)
http.listen(port)