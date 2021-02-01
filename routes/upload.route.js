const express = require('express');
const multer = require('multer');
const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, './uploads');
	},
	filename: function (req, file, cb) {
		console.log(file);
		cb(null, 'test-' + file.originalname);
	},
});
const upload = multer({ storage: storage }).single('myfile');
const router = express.Router();

router.post('/', (req, res, next) => {
	upload(req, res, function (err) {
		if (err) {
			res.send(err);
		} else {
			res.send('Success, Image uploaded!');
		}
	});
});

module.exports = router;
