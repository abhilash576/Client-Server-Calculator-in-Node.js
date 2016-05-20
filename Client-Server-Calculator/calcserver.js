// simple socket server
// Author : Abhilash Malla

var net = require('net');
var EventEmitter = require("events").EventEmitter;
var ee = new EventEmitter();
var result = 0;
var HashMap = require('hashmap');
var map = new HashMap;

ee.on("test", function() {
    console.log("I saw a lumberjack!");
});

net.createServer(function (sock) {
    console.log("Incoming connection accepted");

    sock.on('data', function (d) {

        var query = new String(d);
        var pair = query.split(" ");
        var cltid = pair[0];
        var opr = pair[1];
        var num = parseInt(pair[2]);

        if (!(opr == "q")  && (isNaN(num))) {
            sock.write("Invalid request specification");
        } else {
            if (!(opr == "a") && !(opr == "m") && !(opr == "s" ) && !(opr == "q" )) {
               sock.write("Invalid request specification");

            } else {

                if (cltid == 'ASU') {

                    setTimeout(f1, 30000);

                } else if (cltid == 'UA') {

                    process.nextTick(function () {
                        f1();
                    });

                } else if (cltid == 'NAU') {

                    f1();
                    ee.emit("test");

                } else {

                    f1();
                }

                function f1() {

                    if (map.get(cltid) == undefined) {
                        map.set(cltid, 0);
                    }

                    result = map.get(cltid);

                    if(opr == "a") {
                        result = result + num;
                    } else if(opr == "m") {
                        result = result - num;
                    } else if(opr == "s") {
                        result = num;
                    } else  if (opr == "q") {
                        map.forEach(function (value, key) {
                            console.log(key + " : " + value + " ");
                        });
                        sock.write("Server closed");
                        process.exit();
                    }

                    map.set(cltid, result);

                    sock.write(result.toString(), function () {
                        console.log("Finished response to client :" + cltid);
                    })

                }
            }
        }

    }).on('error', function (e) {
        console.log("Some kind of server error");
    });

}).listen(3000);