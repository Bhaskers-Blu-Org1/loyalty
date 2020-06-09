/*eslint-env node*/

//------------------------------------------------------------------------------
// node.js starter application for Bluemix
//------------------------------------------------------------------------------

// This application uses express as its web server
// for more info, see: http://expressjs.com
var express = require('express');

// cfenv provides access to your Cloud Foundry environment
// for more info, see: https://www.npmjs.com/package/cfenv
var cfenv = require('cfenv');

// create a new express server
var app = express();

var port = process.env.PORT || 8060;

// serve the files out of ./public as our main files
app.use(express.static(__dirname + '/public'));

// get the app environment from Cloud Foundry
var appEnv = cfenv.getAppEnv();
var log4js = require('log4js');
var logger = log4js.getLogger();

var MODE = 'DEVMODE';

logger.level = 'debug';
logger.debug("launching loyalty simulated UI");

app.use(require("body-parser").json());
app.use(require("body-parser").urlencoded({extended: false}));
// use createUser route

if(MODE == 'INTEGRATED'){
    app.use('/demo', require('./routes/createUser'))
    // proxy for testing locally
    let proxy = require('express-http-proxy')
    let USER_MICROSREVICE = process.env.PROXY_USER_MICROSERVICE
    let EVENT_MICROSERVICE = process.env.PROXY_EVENT_MICROSERVICE
    app.use('/proxy_user', proxy(USER_MICROSREVICE))
    app.use('/proxy_event', proxy(EVENT_MICROSERVICE))
}

// start server on the specified port and binding host
app.listen(port);
logger.debug("Listening on port ", port);
