var express = require('express');
var jade = require('jade');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var app = express();
var url = require('url');
app.use(cookieParser());
app.use(session({secret: 'MAGICALEXPRESSKEY'}));
app.set('views', './views');
app.set('view engine', 'jade');
app.engine('jade', jade.__express);
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.listen(8081);
console.log("Server listening on port 8081");

var wer = [];
var data = [];
var data1 = [];
var item = 0;

app.locals.fvar = "hidden";
app.locals.lvar = "hidden";
app.locals.pvar = "hidden";
app.locals.dvar = "hidden";
app.locals.evar = "hidden";
app.locals.fname = " ";
app.locals.lname = " ";
app.locals.pname = " ";
app.locals.dname = " ";
app.locals.ename = " ";
app.locals.fval = "";
app.locals.lval = "";
app.locals.pval = "";
app.locals.dval = "";
app.locals.eval = "";
app.locals.submitvar = "submit";
app.locals.previousvar = "hidden";
app.locals.saction = "";
app.locals.paction = "";
app.locals.cancelvar = "hidden";
app.locals.caction = "";

var mongoClient=require('mongodb').MongoClient;
var mongoDbObj;


mongoClient.connect('mongodb://localhost/Userdb', function(err, db) {
    if (err)
        console.log(err);
    else {
        console.log("Connected to MongoDB");
        mongoDbObj = {
            db: db,
            users: db.collection('users')
        };
    }
});

app.get('/', function(req, res){

    //console.log(req.cookies);

    if (!req.cookies.firstname || !req.cookies.lastname){
        res.render('cookie_form');
    } else {

        data1 = [ ];
        mongoDbObj.users.find().toArray(function (err, data8) {
            if (err) {
                console.log(err);
            }
            else {
                console.log("success ");
                data = data8;

                var fnm = req.cookies.firstname;
                var lnm = req.cookies.lastname;

                console.log(fnm);
                console.log(lnm);

                for (var temp = 0; temp < data.length; temp++) {
                    if (data[temp].firstname.toLowerCase() == fnm.toLowerCase() && data[temp].lastname.toLowerCase() == lnm.toLowerCase()) {
                        var lang = data[temp].languages.toString().split(" ");
                        var days = data[temp].days.toString().split(" ");
                        var email = data[temp].email.toString();
                    }
                }


                for (var i = 0; i < data.length; i++) {

                    if (data[i].firstname.toLowerCase() == fnm.toLowerCase() && data[i].lastname.toLowerCase() == lnm.toLowerCase()) {

                    } else {

                        var fname1 = data[i].firstname.toString();
                        var lname1 = data[i].lastname.toString();
                        var lang1 = data[i].languages.toString().split(" ");
                        var days1 = data[i].days.toString().split(" ");
                        var email1 = data[i].email.toString();
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
                                for (var p = 0; p < days1.length; p++) {
                                    if (days[m].toLowerCase() == days1[p].toLowerCase()) {
                                        console.log(days[m].toLowerCase());
                                        console.log(days1[p].toLowerCase());
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

                data1.sort(function (a, b) {
                    return b.count - a.count;
                });
                app.locals.message = data1.slice(0, 3);

                res.render('match', {title: "User did previously register ; below mentioned are the top 3 matches"});
            } });
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



//---------------------------------------------------------------------------------

app.post('/', function(req, res){
    res.status(405).send('Invalid request : post is not allowed');
});

app.get('/cookie_ctlr', function(req, res){
    res.status(405).send('Invalid request : get is not allowed');
});



app.use(function(req, res){
    res.status(404).send('404: Page not found');
});

app.use(function(err, req, res, next) {
    console.log(err);
    res.status(500).send('500: Internal Server Error');
});

