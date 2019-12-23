const express = require('express');

const path = require('path');
const port = process.env.PORT || 12345;
const app = express();

const apiRoute = require('./src/route/api');

// mongodb
const mongoose = require('mongoose');
mongoURL = "mongodb+srv://Toby0106:dbforcardbo@cluster0-gfwld.mongodb.net/cardbo-db?retryWrites=true&w=majority"
mongoose.connect(mongoURL, {useNewUrlParser: true});
db = mongoose.connection;
db.on('error', e => {
	console.log(e);
})
db.once('open', () => {
	console.log('MongoDB connected!');
})


app.use(express.static(__dirname));
app.use(express.static(path.join(__dirname, 'build')));
app.use('/user', apiRoute);

app.get('/ping', function (req, res) {
  return res.send('pong');
});

app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(port);

