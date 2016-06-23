/*** Created by Abhilash Malla */

var express = require('express');
var jade = require('jade');
var url = require('url');
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.listen(8081);
console.log("Server listening on port 8081");
app.set('views', './views');
app.set('view engine', 'jade');
app.engine('jade', jade.__express);

var arr = [];
var item = 0;

app.get('/', function(req, res){
    res.render('form1');
});

app.post('/post_coder', function(req, res) {

    arr[item] = req.body;
    item ++;

    res.render('form1', { param: 'Action was successful , total entries are :' + item });
    res.end();
});

app.get('/coders', function(req, res) {

    res.set({"Cache-Control": "no-cache, no-store, must-revalidate"});
    var ua = req.headers['user-agent'];

       if(ua.indexOf("Chrome")!=-1)
           var clr = "FAAFBE";
       else
           var clr = '';

    var fname = req.query.firstname;
    var lname = req.query.lastname;
    var lang = req.query.languages;
    if (lang != undefined) {
        lang = req.query.languages.split(" ");
    }
    var days = req.query.days;
    if (days != undefined) {
        days = req.query.days.split(" ");
    }
    var email = req.query.email;


    if ( (fname != undefined && fname == "") || (lname != undefined && lname == "") || (lang != undefined && lang == "") || (days != undefined && days == "") || (email != undefined && email == "")) {

        res.send('Please enter the value of the query parameters or remove all the query parameter to get the list of all entries');

    } else if ( fname == undefined && lname == undefined && lang == undefined && days == undefined && email == undefined) {

        app.locals.data = arr;
        res.render('form2', {colorp: clr});
    } else if ((fname != undefined && fname != "") || (lname != undefined && lname != "") || (lang != undefined && lang != "") || (days != undefined && days != "") || (email != undefined && email != "")) {

        var data2 = [];

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
                if(email1.toLowerCase().indexOf(email.toLowerCase()) > -1) {
                    emailcheck = true;
                }
            }

            if (fnamecheck || (fname == null)) {
                if (lnamecheck || (lname == null)) {
                    if (emailcheck || (email == null)) {
                        if ((str1) || (lang == null)) {
                            if ((str2) || (days == null)) {

                                data2.push(arr[temp]);

                            }
                        }
                    }
                }
            }
        }
        app.locals.data = data2;
        res.render('form2', {colorp: clr});
    }
});

app.get('/get_coder/firstname/:name', function (req, res) {
});

app.get('/get_coder/lastname/:name', function (req, res) {
});

app.param('name', function(req, res, next, value){

    var urldata = req.url;
    var data2 = [];
    var clr = '';

    if(urldata.toLowerCase().indexOf("firstname") > -1) {

        var fname = value;
    }
    if(urldata.toLowerCase().indexOf("lastname") > -1) {

        var lname = value;
    }

    if ((lname != undefined && lname != "") || (fname != undefined && fname != "")) {
        for( var temp=0; temp < arr.length; temp++ ){
            var lname1 = arr[temp].lastname.toString().toLowerCase();
            var fname1 = arr[temp].firstname.toString().toLowerCase();
            var lnamecheck = false;
            var fnamecheck = false;

            if(lname != null){
                if (lname1 == lname.toLowerCase()) {
                    lnamecheck = true;
                }
            }
            if(fname != null){
                if (fname1 == fname.toLowerCase()) {
                    fnamecheck = true;
                }
            }
            if (lnamecheck || fnamecheck) {

                data2.push(arr[temp]);

            }
        }
    }

    app.locals.data = data2;
    res.render('form2', {colorp: clr});
    next();
});


app.get('/error', function (req, res) {
    res.status(400);
    res.send("This is a bad request.");
});