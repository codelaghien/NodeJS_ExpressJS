const User = require('../models/user.model');
const people = require('../assets/people.json');
const db = require('../database');
const bcrypt = require('bcrypt');
const saltRounds = 10;
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
		let encryptedPassword = '';

		bcrypt.hash(password, saltRounds, function (err, hash) {
			encryptedPassword = hash;
			console.log('hash', hash);

			db.connectDB()
				.then((connection) => {
					connection.query(
						`INSERT INTO users(username, password, email) VALUES('${username}', '${encryptedPassword}', '')`,
						function (err, data, fields) {
							db.closeDB(connection);
							return res
								.status(200)
								.json({ result: `Thành công` });
						}
					);
				})
				.catch((error) => {
					console.log('Db not connected successfully', error);
					return res
						.status(200)
						.json({ result: `Không thể kết nối Database` });
				});
		});
	}

	login(req, res) {
		const username = req.body.username;
		const password = req.body.password;

		db.connectDB()
			.then((connection) => {
				connection.query(
					`SELECT * FROM users WHERE username='${username}' LIMIT 1`,
					function (err, data, fields) {
						console.log('data', data[0].password);
						db.closeDB(connection);

						bcrypt.compare(
							password,
							data[0].password,
							function (err, result) {
								if (result) {
									return res
										.status(200)
										.json('Login thành công');
								} else {
									return res
										.status(200)
										.json('Login thất bại');
								}
							}
						);
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

	promise(req, res) {
		let data = 'chưa có';

		db.testPromise(3000)
			.then((monan) => {
				console.log('món ăn 3000:', monan);
			})
			.catch((error) => {
				console.log('error', error);
			});

		db.testPromise(1000)
			.then((monan) => {
				console.log('món ăn 1000: ', monan);
			})
			.catch((error) => {
				console.log('error', error);
			});

		console.log('data', data);
		return res.status(200).json(data);
	}
}

module.exports = new UserController();
