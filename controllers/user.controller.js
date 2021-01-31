const User = require('../models/user.model');
const people = require('../assets/people.json');
const fs = require('fs');
const fileName = 'chao.txt';

class UserController {
	get(req, res) {
		// return res.status(200).json('Chào bạn, đã nhận được yêu cầu của bạn !');
		const filter = req.query.filter;
		// console.log('filter', filter);
		const filterPeople = people.filter((person) =>
			person.first_name.includes(filter)
		);

		try {
			const data = fs.readFileSync(fileName, 'utf8');
			// console.log(data);
			return res.status(200).json({ data });
		} catch (e) {
			console.log('Error:', e.stack);
			return res.status(200).json({ error: 'Không thể đọc file' });
		}
	}

	post(req, res) {
		const filter = req.body.filter;
		// console.log('filter', filter);
		// fs.writeFile
		fs.appendFile(fileName, `Chào bạn ${filter} \n`, function (err) {
			if (err) {
				return res
					.status(200)
					.json({ error: `Không thể ghi vào file` });
			} else {
				return res.status(200).json({ result: `Chào bạn ${filter}` });
			}
		});
	}
}

module.exports = new UserController();
