/*** Created by Abhilash Malla */

var http = require('http');
var url = require('url');
var qs = require('querystring');

var page = '<html><head><title>Insert title here</title></head>' +
    '<body>' +
    '<form action="/post_coder" method="post">' +
    '<fieldset><legend>Personal information:</legend>' +
    'First Name: <input type="text" name="firstname" required><br />' +
    'Last Name: <input type="text" name="lastname" required><br />' +
    '</fieldset>' +
    '<br />' +
    'Programming Languages: <input type="text" name="languages" textarea rows="4" cols="50" required>' +
    '<br />' +
    '<br />' +
    '<legend>Please select the days you are available:</legend><br>' +
    '<input type="checkbox" name="days" value="Monday">Monday<br>' +
    '<input type="checkbox" name="days" value="Tuesday">Tuesday<br>' +
    '<input type="checkbox" name="days" value="Wednesday">Wednesday<br>' +
    '<input type="checkbox" name="days" value="Thursday">Thursday<br>' +
    '<input type="checkbox" name="days" value="Friday">Friday<br>' +
    '<input type="checkbox" name="days" value="Saturday">Saturday<br>' +
    '<input type="checkbox" name="days" value="Sunday">Sunday<br>' +
    '<br />' +
    'E-mail: <input type="email" name="email" required>' +
    '<br />' +
    '<br />' +
    '<input type="submit" value="Submit" />' +
    '</form>' +
    '</body>' +
    '</html>';

var arr = [];
var item = 0;

var server = http.createServer(function (req, res) {

    var url_parts = url.parse(req.url,true);
    var url_path = url_parts.pathname;

    if (req.method.toLowerCase() == 'get' && url_path == "/"){
        res.writeHead(200, {"Content-Type": "text/html"});
        res.write(page);
        res.end();
    }

    if (req.method.toLowerCase() == 'post' && url_path == "/post_coder"){

        var formdata = "";
        req.on('data', function (chunk) {
            formdata += chunk;
        });

        req.on('end', function () {
            var POST = qs.parse(formdata.toString());
            arr[item] = POST;
            item ++;

            res.writeHead(200, {"Content-Type": "text/html"});
            res.write("Action was successful , total entries are : " + item + '<br>');
            res.write(page);
            res.end();
        });
    }

    if (req.method.toLowerCase() == 'get' && url_path == "/coders"){

        res.writeHead(200, {"Content-Type": "text/html", "Cache-Control": "no-cache, no-store, must-revalidate"});
        var ua = req.headers['user-agent'];

        if(ua.indexOf("Chrome")!=-1)
             var htmlResponse = '<html><head><title></title></head><body bgcolor=\"#FAAFBE\"></body></html>';
        else
            var htmlResponse = '<html><head><title></title></head><body></body></html>';

        res.write(htmlResponse);

        var url_parts = url.parse(req.url,true);

        var fname = url_parts.query.firstname;
        var lname = url_parts.query.lastname;
        var lang = url_parts.query.languages;
        if (lang != undefined) {
             lang = url_parts.query.languages.split(" ");
        }
        var days = url_parts.query.days;
        if (days != undefined) {
             days = url_parts.query.days.split(" ");
        }
        var email = url_parts.query.email;


        if ( (fname != undefined && fname == "") || (lname != undefined && lname == "") || (lang != undefined && lang == "") || (days != undefined && days == "") || (email != undefined && email == "")) {

            res.write("Please enter the value of the query parameters or remove all the query parameter to get the list of all entries");

        } else if ( fname == undefined && lname == undefined && lang == undefined && days == undefined && email == undefined) {

            var j = 0;
            for( var i=0; i < arr.length; i++ ){

                j++;
                var out1 = '<html><head><title></title></head><body>Entry' +j+ '\: \"' +'Firstname :'+ arr[i].firstname.toString() + '\";\"' +'Lastname :'+ arr[i].lastname.toString() + '\";\"' +'Languages :'+ arr[i].languages.toString() + '\";\"' +'Days :'+ arr[i].days + '\";\"' +'Email :'+ arr[i].email.toString() + '\"' +  '<br />' + '</body></html>';
                res.write(out1);
            }
        } else if ((fname != undefined && fname != "") || (lname != undefined && lname != "") || (lang != undefined && lang != "") || (days != undefined && days != "") || (email != undefined && email != "")) {


            for( var temp=0; temp < arr.length; temp++ ){

                var fname1 = arr[temp].firstname.toString();
                var lname1 = arr[temp].lastname.toString();
                var lang1 = arr[temp].languages.toString().split(" ");
                var days1 = arr[temp].days;
                var email1 = arr[temp].email.toString();
                var str1 = false ;
                var str2 = false;
                var fnamecheck = false;
                var lnamecheck = false;
                var emailcheck = false;


                if (lang !=null) {
                    for(var i =0;i<lang.length;i++) {
                        for(var j=0;j<lang1.length;j++) {
                            if (lang[i].toLowerCase() == lang1[j].toLowerCase()) {
                                str1 = true;
                            }
                        }
                    }
                }

                if (days !=null) {
                    for(var i =0;i<days.length;i++) {
                        for(var j=0;j<days1.length;j++) {
                            if (days[i].toLowerCase() == days1[j].toLowerCase()) {
                                str2 = true;
                            }
                        }
                    }
                }
                if(fname != null){
                    if(fname1.toLowerCase().indexOf(fname.toLowerCase()) > -1) {
                        fnamecheck = true;
                    }
                }
                if(lname != null){
                    if(lname1.toLowerCase().indexOf(lname.toLowerCase()) > -1) {
                        lnamecheck = true;
                    }
                }

                if(email !=null){
                    if(email1 === email) {
                        emailcheck = true;
                    }
                }

                if (fnamecheck || (fname == null)) {
                    if (lnamecheck || (lname == null)) {
                        if (emailcheck || (email == null)) {
                            if ((str1) || (lang == null)) {
                                if ((str2) || (days == null)) {
                                    var out = '<html><head><title></title></head><body>Query result \: \"' +'firstname :'+ fname1 + '\";\"' +'Lastname :' + lname1 + '\";\"' +'Languages :'+ lang1.toString() + '\";\"' +'Days :'+ days1.toString() + '\";\"' +'Email :' + email1 + '\"' +  '<br />' + '</body></html>';
                                    res.write(out);
                                }
                            }
                        }
                    }
                }
            }
        }

        res.end();
    }
});

server.listen(8081);
console.log("Server listening on port 8081");
