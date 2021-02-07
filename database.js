const mysql = require('mysql');
require('dotenv').config();
module.exports.connectDB = () => {
	return new Promise((resolve, reject) => {
		const con = mysql.createConnection({
			host: process.env.DB_HOST || 'localhost',
			user: process.env.DB_USER || 'myUserName',
			password: process.env.DB_PASS || 'mypassword',
			database: process.env.DB_NAME || 'mydb',
		});
		con.connect((err) => {
			if (err) {
				reject(err);
			}
			resolve(con);
		});
	});
};
module.exports.closeDB = (con) => {
	con.destroy();
};

module.exports.testPromise = (ms = 0) => {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			resolve('Sau khi tạm dừng ' + ms + ' ms, món ăn đã xong');
		}, ms);
	});
};
