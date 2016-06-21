// simplesockclient to go with simplesockserver.js
//Author : Abhilash Malla

var sock = require('net').Socket();

sock.on('data', function(data) {
    console.log('Response: ' + data);
    sock.end();
    sock.destroy(); 
});
sock.on('close', function() {
    console.log('Connection closed');});

var connection = sock.connect(3000);
connection.on('error', function() {
    console.log('Error connecting to server');
});

var var1 = process.argv[3];
if (var1 == "q") {
    sock.write(process.argv[2] + " " + process.argv[3]);
} else {
    sock.write(process.argv[2] + " " + process.argv[3] + " " + process.argv[4]);
}
