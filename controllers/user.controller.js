const User = require('../models/user.model');
const people = require('../assets/people.json');
const db = require('../database');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
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

	async login(req, res) {
		const username = req.body.username;
		const password = req.body.password;
		try {
			db.connectDB()
				.then((connection) => {
					connection.query(
						`SELECT * FROM users WHERE username='${username}' LIMIT 1`,
						async function (err, data, fields) {
							console.log('password = ' + password);
							console.log('data', data[0].password);
							db.closeDB(connection);

							const kiemtraPwd = await bcrypt.compare(
								password,
								data[0].password
							);
							if (kiemtraPwd) {
								const token = generateJWT({
									username: username,
								});
								return res.status(200).json(token);
							} else {
								return res.status(200).json('Login thất bại');
							}
						}
					);
				})
				.catch((error) => {
					console.log('Db not connected successfully', error);
					return res
						.status(200)
						.json({ result: `Không thể kết nối Database` });
				});
		} catch (error) {
			return res.status(500).json({ result: `Bị lỗi` });
		}
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

	promises(req, res) {
		// let allData = 'chưa có';

		const promise1 = db.testPromise('#1', 3000);
		const promise2 = db.testPromise('#2', 2000);

		Promise.all([promise1, promise2]).then(
			(result) => {
				// valArray[0] is result of promise0
				// valArray[1] is result of promise1
				console.log(result);
				return res.status(200).json(result);
			},
			(error) => {
				console.log(error);
				return res.status(200).json(error);
			}
		);

		// console.log('allData', allData);
		// return res.status(200).json(allData);
	}

	async async_await(req, res) {
		let allData = 'Chưa có data';
		const promise1 = await db.testPromise('#1', 1000).then((data) => {
			allData = data;
		});
		console.log('allData', allData);
		return res.status(200).json(allData);
	}

	async fakeLogin(req, res) {
		const payload = { username: 'Huy Nguyen', id: 1, role: 'Admin' };
		const token = generateJWT(payload);
		return res.status(200).json(token);
	}
}

function generateSecretKey(req, res) {
	const key = require('crypto').randomBytes(256).toString('hex');
	console.log('secret key', key);
	return res.status(200).json(key);
}

function generateJWT(payload) {
	return jwt.sign(payload, process.env.TOKEN_SECRET, { expiresIn: '120s' });
}

module.exports = new UserController();
