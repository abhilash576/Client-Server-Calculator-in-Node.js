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

var arr = [];
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
app.locals.sval = "Next";

app.get('/', function(req, res){

    if(req.session.page1) {
    } else {

        app.locals.fvar = "text";
        app.locals.lvar = "text";
        app.locals.pvar = "hidden";
        app.locals.dvar = "hidden";
        app.locals.evar = "hidden";
        app.locals.fname = "Firstname :";
        app.locals.lname = "Lastname :";
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
        app.locals.saction = "/form2";
        app.locals.paction = "";
        app.locals.cancelvar = "hidden";
        app.locals.caction = "";
        app.locals.sval = "Next";

    }
    res.render('userdata');
});

app.post('/form1', function(req, res){

    if(req.session.page1) {
        app.locals.fvar = "text";
        app.locals.lvar = "text";
        app.locals.pvar = "hidden";
        app.locals.dvar = "hidden";
        app.locals.evar = "hidden";
        app.locals.fname = "Firstname :";
        app.locals.lname = "Lastname :";
        app.locals.pname = " ";
        app.locals.dname = " ";
        app.locals.ename = " ";
        app.locals.fval = req.session.fname;
        app.locals.lval = req.session.lname;
        app.locals.pval = "";
        app.locals.dval = "";
        app.locals.eval = "";
        app.locals.submitvar = "submit";
        app.locals.previousvar = "hidden";
        app.locals.saction = "/form2";
        app.locals.paction = "";
        app.locals.cancelvar = "hidden";
        app.locals.caction = "";
        app.locals.sval = "Next";

    } else {
    }
    res.render('userdata');
});


app.post('/form2', function(req, res) {

    req.session.page1 = true;


    if(req.body.firstname && req.body.lastname) {
        var fname = req.body.firstname;
        var lname = req.body.lastname;
        req.session.fname = fname;
        req.session.lname = lname;
    }

    if(req.session.page2) {
        app.locals.fvar = "hidden";
        app.locals.lvar = "hidden";
        app.locals.pvar = "text";
        app.locals.dvar = "hidden";
        app.locals.evar = "hidden";
        app.locals.fname = " ";
        app.locals.lname = " ";
        app.locals.pname = "Programming Languages :";
        app.locals.dname = " ";
        app.locals.ename = " ";
        app.locals.fval = "";
        app.locals.lval = "";
        app.locals.pval = req.session.pval;
        app.locals.dval = "";
        app.locals.eval = "";
        app.locals.submitvar = "submit";
        app.locals.previousvar = "submit";
        app.locals.saction = "/form3";
        app.locals.paction = "/form1";
        app.locals.cancelvar = "hidden";
        app.locals.caction = "";
        app.locals.sval = "Next";

    } else {

        app.locals.fvar = "hidden";
        app.locals.lvar = "hidden";
        app.locals.pvar = "text";
        app.locals.dvar = "hidden";
        app.locals.evar = "hidden";
        app.locals.fname = " ";
        app.locals.lname = " ";
        app.locals.pname = "Programming Languages :";
        app.locals.dname = " ";
        app.locals.ename = " ";
        app.locals.fval = "";
        app.locals.lval = "";
        app.locals.pval = "";
        app.locals.dval = "";
        app.locals.eval = "";
        app.locals.submitvar = "submit";
        app.locals.previousvar = "submit";
        app.locals.saction = "/form3";
        app.locals.paction = "/form1";
        app.locals.cancelvar = "hidden";
        app.locals.caction = "";
        app.locals.sval = "Next";

    }
    res.render('userdata');

});


app.post('/form3', function(req, res) {

    req.session.page2 = true;

    if(req.body.languages) {
        var pval = req.body.languages;
        req.session.pval = pval;
    }

    if(req.session.page3) {
        app.locals.fvar = "hidden";
        app.locals.lvar = "hidden";
        app.locals.pvar = "hidden";
        app.locals.dvar = "text";
        app.locals.evar = "hidden";
        app.locals.fname = " ";
        app.locals.lname = " ";
        app.locals.pname = " ";
        app.locals.dname = "Days :";
        app.locals.ename = " ";
        app.locals.fval = "";
        app.locals.lval = "";
        app.locals.pval = "";
        app.locals.dval = req.session.dval;
        app.locals.eval = "";
        app.locals.submitvar = "submit";
        app.locals.previousvar = "submit";
        app.locals.saction = "/form4";
        app.locals.paction = "/form2";
        app.locals.cancelvar = "hidden";
        app.locals.caction = "";
        app.locals.sval = "Next";

    } else {
        app.locals.fvar = "hidden";
        app.locals.lvar = "hidden";
        app.locals.pvar = "hidden";
        app.locals.dvar = "text";
        app.locals.evar = "hidden";
        app.locals.fname = " ";
        app.locals.lname = " ";
        app.locals.pname = " ";
        app.locals.dname = "Days :";
        app.locals.ename = " ";
        app.locals.fval = "";
        app.locals.lval = "";
        app.locals.pval = "";
        app.locals.dval = "";
        app.locals.eval = "";
        app.locals.submitvar = "submit";
        app.locals.previousvar = "submit";
        app.locals.saction = "/form4";
        app.locals.paction = "/form2";
        app.locals.cancelvar = "hidden";
        app.locals.caction = "";
        app.locals.sval = "Next";
    }
    res.render('userdata');

});


app.post('/form4', function(req, res) {

    req.session.page3 = true;

    if(req.body.days) {
        var dval = req.body.days;
        req.session.dval = dval;
    }

    if(req.session.page4) {
        app.locals.fvar = "hidden";
        app.locals.lvar = "hidden";
        app.locals.pvar = "hidden";
        app.locals.dvar = "hidden";
        app.locals.evar = "email";
        app.locals.fname = " ";
        app.locals.lname = " ";
        app.locals.pname = " ";
        app.locals.dname = " ";
        app.locals.ename = "Email :";
        app.locals.fval = "";
        app.locals.lval = "";
        app.locals.pval = "";
        app.locals.dval = "";
        app.locals.eval = req.session.eval;
        app.locals.submitvar = "submit";
        app.locals.previousvar = "submit";
        app.locals.saction = "/form5";
        app.locals.paction = "/form3";
        app.locals.cancelvar = "hidden";
        app.locals.caction = "";
        app.locals.sval = "Next";
    } else {
        app.locals.fvar = "hidden";
        app.locals.lvar = "hidden";
        app.locals.pvar = "hidden";
        app.locals.dvar = "hidden";
        app.locals.evar = "email";
        app.locals.fname = " ";
        app.locals.lname = " ";
        app.locals.pname = " ";
        app.locals.dname = " ";
        app.locals.ename = "Email :";
        app.locals.fval = "";
        app.locals.lval = "";
        app.locals.pval = "";
        app.locals.dval = "";
        app.locals.eval = "";
        app.locals.submitvar = "submit";
        app.locals.previousvar = "submit";
        app.locals.saction = "/form5";
        app.locals.paction = "/form3";
        app.locals.cancelvar = "hidden";
        app.locals.caction = "";
        app.locals.sval = "Next";
    }

    res.render('userdata');
});


app.post('/form5', function(req, res) {

    req.session.page4 = true;

    if(req.body.email) {
        var eval = req.body.email;
        req.session.eval = eval;
    }


    app.locals.fvar = "hidden";
    app.locals.lvar = "hidden";
    app.locals.pvar = "hidden";
    app.locals.dvar = "hidden";
    app.locals.evar = "hidden";
    app.locals.fname = "Firstname :" + req.session.fname;
    app.locals.lname = "Lastname :"+req.session.lname;
    app.locals.pname = "Programming Languages :"+req.session.pval;
    app.locals.dname = "Days :"+req.session.dval;
    app.locals.ename = "Email :"+req.session.eval;
    app.locals.fval = "";
    app.locals.lval = "";
    app.locals.pval = "";
    app.locals.dval = "";
    app.locals.eval = "";
    app.locals.sval = "Submit";
    app.locals.submitvar = "submit";
    app.locals.previousvar = "submit";
    app.locals.cancelvar = "submit";
    app.locals.saction = "/submit";
    app.locals.paction = "/form4";
    app.locals.caction = "/cancel";

    res.render('userdata');

});

app.post('/submit', function(req, res) {

    if (req.session.fname && req.session.lname && req.session.pval && req.session.dval && req.session.eval) {

        var userdata = [{
            "firstname": req.session.fname,
            "lastname" : req.session.lname ,
            "languages" : req.session.pval ,
            "days" :  req.session.dval,
            "email" : req.session.eval
        }];

        arr[item] = userdata;
        item ++;

        req.session.destroy();
        res.redirect('..');

    } else {
        res.status(403).send('403: Session  not found');
    }


});


app.post('/cancel', function(req, res) {

    if (req.session.fname && req.session.lname && req.session.pval && req.session.dval && req.session.eval) {

        req.session.destroy();
        res.redirect('..');

    } else {
        res.status(403).send('403: Session  not found');
    }

});

//----------------------------------------------------------------------------------


app.post('/', function(req, res){
    res.status(405).send('Invalid request : post is not allowed');
});

app.get('/form1', function(req, res){
    res.status(405).send('Invalid request : get is not allowed');
});

app.get('/form2', function(req, res){
    res.status(405).send('Invalid request : get is not allowed');
});

app.get('/form3', function(req, res){
    res.status(405).send('Invalid request : get is not allowed');
});

app.get('/form4', function(req, res){
    res.status(405).send('Invalid request : get is not allowed');
});

app.get('/form5', function(req, res){
    res.status(405).send('Invalid request : get is not allowed');
});


app.get('/submit', function(req, res){
    res.status(405).send('Invalid request : get is not allowed');
});

app.get('/cancel', function(req, res){
    res.status(405).send('Invalid request : get is not allowed');
});

app.use(function(req, res){
    res.status(404).send('404: Page not found');
});

app.use(function(err, req, res, next) {
    console.log(err);
    res.status(500).send('500: Internal Server Error');
});