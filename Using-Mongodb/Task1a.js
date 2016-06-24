/*** Created by Abhilash Malla */

var express = require('express');
var jade = require('jade');
var url = require('url');
var app = express();
var cookieParser = require('cookie-parser')
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser())
app.listen(8081);
console.log("Server listening on port 8081");
app.set('views', './views');
app.set('view engine', 'jade');
app.engine('jade', jade.__express);

var arr = [];
var item = 0;
var data1 = [];

app.get('/', function(req, res){


    if (!req.cookies.firstname || !req.cookies.lastname){
        res.render('cookie_form');
    } else {

        data1 = [];
        var fnm = req.cookies.firstname;
        var lnm = req.cookies.lastname;
        //console.log(fnm);
        //console.log(lnm);

        for (var temp = 0; temp < arr.length; temp++) {

            if (arr[temp].firstname.toLowerCase() == fnm.toLowerCase() && arr[temp].lastname.toLowerCase() == lnm.toLowerCase()) {
                var lang = arr[temp].languages.toString().split(" ");
                var days = arr[temp].days;
                var email = arr[temp].email.toString();
            }
        }

        for (var i = 0; i < arr.length; i++) {

            if (arr[i].firstname.toLowerCase() == fnm.toLowerCase() && arr[i].lastname.toLowerCase() == lnm.toLowerCase()) {

            } else {

                var fname1 = arr[i].firstname.toString();
                var lname1 = arr[i].lastname.toString();
                var lang1 = arr[i].languages.toString().split(" ");
                var days1 = arr[i].days;
                var email1 = arr[i].email.toString();
                var str1 = false;
                var str2 = false;
                var count = 0;
                var emailcheck = false;


                if (lang != null) {
                    for (var k = 0; k < lang.length; k++) {
                        for (var j = 0; j < lang1.length; j++) {
                            if (lang[k].toLowerCase() == lang1[j].toLowerCase()) {
                                str1 = true;
                                count++;
                            }
                        }
                    }
                }

                if (days != null) {
                    for (var m = 0; m < days.length; m++) {
                        for (var j = 0; j < days1.length; j++) {
                            if (days[m].toLowerCase() == days1[j].toLowerCase()) {
                                str2 = true;
                                count++;
                            }
                        }
                    }
                }

                if (email != null) {
                    if (email1.toLowerCase() == email.toLowerCase()) {
                        emailcheck = true;
                        count++;
                    }
                }
                //console.log(count);
                if (count > 0) {
                    data1.push({
                        count: count,
                        Firstname: fname1,
                        Lastname: lname1,
                        Languages: lang1,
                        Days: days1,
                        Email: email1
                    });
                }
            }

        }
        // }

        data1.sort(function (a, b) {
            return b.count - a.count;
        });

        app.locals.message = data1.slice(0, 3);
        res.render('match', {title: "User did previously register ; below mentioned are the top 3 matches"});
    }
});

app.post('/cookie_ctlr', function(req, res) {

    if(req.body.firstname && req.body.lastname) {
        var fname = req.body.firstname;
        var lname = req.body.lastname;
    }

    res.cookie('firstname', fname, { maxAge: 60*60*1000, httpOnly: true, path:'/'});
    res.cookie('lastname', lname, { maxAge: 60*60*1000, httpOnly: true, path:'/'});

    res.send("Hello " + fname +" "+lname+ " Welcome !");
});

app.get('/enterdata', function(req, res){
    res.render('enterdata');
});


app.post('/post_coder', function(req, res) {

    arr[item] = req.body;
    item ++;

    res.render('enterdata', { param: 'Action was successful , total entries are :' + item });
    res.end();
});


app.post('/', function(req, res){
    res.status(405).send('Invalid request : post is not allowed');
});

app.get('/cookie_ctlr', function(req, res){
    res.status(405).send('Invalid request : get is not allowed');
});

app.get('/enterdata', function(req, res){
    res.status(405).send('Invalid request : get is not allowed');
});

app.get('/post_coder', function(req, res){
    res.status(405).send('Invalid request : get is not allowed');
});

app.use(function(req, res){
    res.status(404).send('404: Page not found');
});

app.use(function(err, req, res, next) {
    console.log(err);
    res.status(500).send('500: Internal Server Error');
});


