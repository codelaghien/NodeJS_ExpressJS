const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = process.env.PORT || 5000;
const apiPath = '/api/';

app.use(express.json());
app.use(express.urlencoded());

// website
app.use(express.static('client'));

// routers
app.use(apiPath + 'users', require('./routes/users.route'));
// app.use(apiPath + 'products', require('./routes/products.route'));

app.listen(port, function () {
	const host = 'localhost';
	console.log('Example app listening at http://%s:%s', host, port);
});
