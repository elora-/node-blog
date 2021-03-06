var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var session = require('express-session');

var routes = require('./controllers/index');
var post = require('./controllers/post');
var newPost = require('./controllers/new-post');
var tags = require('./controllers/tags');
var login = require('./controllers/login');
var signup = require('./controllers/signup');
var users = require('./controllers/users');
var logout = require('./controllers/logout');

passport.use(new LocalStrategy(function(username, password, done) {
  User.findOne({ username: username }, function(err, user) {
    if(err) { return done(err); }
    if(!user) { return done(null, false); }
    if(user.password != password) { return done(null, false); }
    return done(null, user);
  });
}));

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});

mongoose.connect(process.env.MONGOLAB_URI);

var Post = require('./models/post');
var User = require('./models/user');

var app = express();

var port = process.env.PORT || 3000;


// view engine setup
app.set('port', (process.env.PORT || 5000));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session( { resave: false, saveUninitialized: false, secret: 'blog' } ));
app.use(passport.initialize());
app.use(passport.session());

app.use('/', routes);
app.use('/post', post);
app.use('/new', newPost);
app.use('/tags', tags);
app.use('/login', login);
app.use('/signup', signup);
app.use('/users', users);
app.use('/logout', logout);

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
