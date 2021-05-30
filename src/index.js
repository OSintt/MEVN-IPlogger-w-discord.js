const express = require('express');
const app = express();
require('dotenv').config();
const morgan = require('morgan');
const mongoose = require('mongoose');
require('./db');
//settings
app.set('port', process.env.PORT || 3000);

//middlewares
app.use(morgan('dev'));
app.use(express.json());

//routes
app.use('/api/routes', require('./routes/rutas'));

app.get('/:id', (req, res) => {
	res.sendFile(__dirname + '/public/index.html');
});
//static
app.use(express.static(__dirname + '/public'));

//server
app.listen(app.get('port'), () => {
	console.log('Server on port ', app.get('port'));
});
