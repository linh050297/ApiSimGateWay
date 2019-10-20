const express = require('express');
const bodyParer = require('body-parser');
const schedule = require('node-schedule');
const { apiGateway } = require('./services/api.service');
const { FormPortSimRouter } = require('./controllers/port_sim.router');
const { RegexPhoneNetworkRouter } = require('./controllers/regex_phone.router');

// var cors = require('cors');

const app = express();

// app.use(cors());

app.use(bodyParer.json());
app.use(bodyParer.urlencoded({ extended: false }));
app.use('/resources',express.static(__dirname + '/../public'));

// // create a write stream (in append mode)
// var accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' })
 
// // setup the logger
// app.use(morgan('combined', { stream: accessLogStream }));


//node-schedule
// let rule = new schedule.RecurrenceRule();
// rule.month = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
// rule.date = 1;
// rule.hour = 8;
// rule.minute = 0;
// rule.second = 0;
// let start = schedule.scheduleJob(rule, function(){
    apiGateway();
// });

app.use('/port_sim', FormPortSimRouter);
app.use('/regex_network', RegexPhoneNetworkRouter);


module.exports = { app };