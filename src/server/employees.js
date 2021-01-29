let express = require('express');
let router = express.Router();
const Employee = require('./models/Employee');
const { v4: uuidv4 } = require('uuid');

router.get('/', async function(req, res, next) {
	try {
		const query = Employee.find();
		if (req.query.limit) query.limit(parseInt(req.query.limit));
		if (req.query.offset) query.skip(parseInt(req.query.offset));
		if (req.query.sort) {
			let sort = req.query.sort;
			if (sort.substring(0, 1) === '+') {
				sort = sort.substring(1, sort.length);
			}
			query.sort(sort);
		}
		const docs = await query.exec();
		const count = await Employee.estimatedDocumentCount();
		res.json({ count: count, rows: docs });
	} catch(e) {
		next(e);
	}
});

router.post('/create', async function(req, res, next) {
	try	{
		let data = req.body.employees;
		if (!Array.isArray(data)) throw new Error('Invalid data');

		const loginData = data.map(d => d.login);
		const duplicate = loginData.filter((d, i) => {
			return loginData.indexOf(d, i + 1) > -1;
		});

		if (duplicate && duplicate.length > 0) throw new Error(`Duplicate login ${duplicate[0]}`);
		// Check in database
		const duplicateFound = await Employee.find({ login: { $in: loginData } }, 'login');
		if (duplicateFound && duplicateFound.length > 0) throw new Error(`Duplicate login ${duplicateFound[0].login}`);

		data = data.map(d => {
			d.id = uuidv4();
			return d;
		});

		const doc = await Employee.insertMany(data);
		res.json(doc);
	} catch(e) {
		next(e);
	}
});

module.exports = router;