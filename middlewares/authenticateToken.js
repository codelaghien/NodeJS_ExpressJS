const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
	try {
		// Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Ikh1eSBOZ3V5ZW4gMTIzIiwiaWF0IjoxNjEyNzQxODMwLCJleHAiOjE2MTI3NDE5NTB9.C7JcGQOuo7D8PPCP33MadjIowis56yT5SBr_TM5A7N8
		const token = req.header('Authorization').split(' ')[1];
		console.log('token', token);
		if (!token) return res.status(400).json({ msg: 'Chưa có JWT' });
		jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
			if (err) return res.status(400).json({ msg: 'JWT sai' });
			req.user = user;
			next();
		});
	} catch (err) {
		return res.status(500).json({ msg: 'Bị lỗi JWT' });
	}
};

module.exports = authenticateToken;
