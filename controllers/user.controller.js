const User = require('../models/user.model');
const people = require('../assets/people.json');

class UserController {
	get(req, res) {
		// return res.status(200).json('Chào bạn, đã nhận được yêu cầu của bạn !');
		const filter = req.query.filter;
		// console.log('filter', filter);
		const filterPeople = people.filter((person) =>
			person.first_name.includes(filter)
		);
		return res
			.status(200)
			.json({ data: filterPeople, length: filterPeople.length });
	}

	post(req, res) {
		const filter = req.body.filter;
		console.log('filter', filter);
		return res.status(200).json({ result: `Chào bạn abc` });
	}
}

module.exports = new UserController();
