var os = require('os');
var net = require('net');

var host = null;
var port = 9000;

var checkAndSetHost = function(intf) {
    if (!intf.internal && intf.family === 'IPv4') {
	host = i.address;
    };
};

var determineIP = function() {
    var interfaces = os.networkInterfaces();
    for (var ifName in interfaces) {
	interfaces[ifName).forEach(checkAndSetHost);
    };
};

determineIP();
var server = net.createServer();
server.listen(host, port);
console.log('Server listening on ' + server.address().address + ':' + server.address().port);

server.on('connection', function(sock) {
    console.log('CONNECTED: ' + sock.remoteAddress + ':' + sock.remotePort);
    
    sock.on('data', function(data) {
	console.log('DATA' + sock.remoteAddress + ': ' + data);
	sock.write('You said "' + data + '"');
    });

    sock.on('close', function(data) {
	console.log('CLOSED: ' + sock.remoteAddress + ' ' + sock.remotePort);
    });
}
