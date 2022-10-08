// modules imports
//use express framework to create a server and define routing
const http = require('http');
const express = require('express');
const app = express();
const port = process.env.PORT || 4000;
const path = require('path');
const bodyParser = require('body-parser');
const multer = require('multer');
const expressSession = require('express-session');
const passport = require('passport');
const passportLocal = require('passport-local');

// init database connection
const db = require('./db');

// import models
const {User} = require('./models/users.model');
// some require middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.urlencoded({ extended: true }));
const upload = multer();
app.use(upload.array());


// use express session for authentication
app.use(expressSession({
    secret:"sachin",
    resave:false,
    saveUninitialized:false
}));

// use passport js and passort local for authentication

passport.use(new passportLocal.Strategy({
    usernameField:'email',
    passwordField:'password'
},(email, password, done)=>{
    User.findOne({email:email}, (err, user)=>{
        if(err){
            return done(err);
        }
        if(!user){
            return done(null, false);
        }
        if(user.password !== password){
            return done(null, false);
        }
        return done(null, user);
    });

    // serlize and deserialize user
    passport.serializeUser((user, done)=>{
        done(null, user.id);
    })

    passport.deserializeUser((id, done)=>{
        User.findById(id, (err, user)=>{
            done(err, user);
        });
    })


}))

app.use(passport.initialize());

app.use(passport.session());


//define the path to the static files
app.use(express.static(path.join(__dirname, 'assets')));

// homepage route

app.get("/",(req,res,next)=>{
    // check user authenticated or not
    if(req.user){
        res.sendFile(path.join(__dirname,'/pages/index.html'));
    }else{
        res.redirect("/login");
    }
})
//login route
app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname + '/pages/login.html'));
});

//register route
app.get('/register', (req, res) => {
    res.sendFile(path.join(__dirname + '/pages/register.html'));
})

//login api route and authentication with passport and passport-local

app.post('/api/login',passport.authenticate('local', {
    successMessage:"Login Success",
    failureFlash: true,
    successRedirect: '/'
}))

// register api route

app.post('/api/register', (req, res) => {
    let data = req.body;
    if (data.firstName && data.lastName && data.email && data.password) {
        // check emial if exist in database or not
        User.findOne({ email: data.email }, (err, user) => {
            if (err) {
                res.send(err);
            } else {
                if (user) {
                    res.status(400).json({
                        status:"error",
                         message: 'email already exist' });
                } else {
                    // create user
                    let newUser = new User(data);
                    newUser.save((err, user) => {
                        if (err) {
                            res.send(err);
                        } else {
                            res.status(200).json({
                                status: 'success',
                                message: 'user created successfully',
                            })
                        }
                    })
                }
            }
        })
    }else{
        res.status(400).json({
            status: 'error',
            message: 'please fill all fields'
        });
    }
});
// app listen to port
app.listen(port, () => {
    console.log('Server is running on port ' + port);
});
