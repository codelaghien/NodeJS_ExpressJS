const User = require('../models/user.model');
const people = require('../assets/people.json');
const db = require('../database');
class UserController {
	get(req, res) {
		db.connectDB()
			.then((connection) => {
				connection.query(
					'SELECT * FROM users',
					function (err, data, fields) {
						db.closeDB(connection);
						return res.status(200).json(data);
					}
				);
			})
			.catch((error) => {
				console.log('Db not connected successfully', error);
				return res
					.status(200)
					.json({ result: `Không thể kết nối Database` });
			});
	}

	post(req, res) {
		const username = req.body.username;
		const password = req.body.password;
		// console.log('username', username);
		// console.log('password', password);

		db.connectDB()
			.then((connection) => {
				connection.query(
					`INSERT INTO users(username, password, email) VALUES('${username}', '${password}', '')`,
					function (err, data, fields) {
						db.closeDB(connection);
						return res.status(200).json({ result: `Thành công` });
					}
				);
			})
			.catch((error) => {
				console.log('Db not connected successfully', error);
				return res
					.status(200)
					.json({ result: `Không thể kết nối Database` });
			});
	}
}

module.exports = new UserController();
