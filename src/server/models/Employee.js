const { v4: uuidv4 } = require('uuid');
const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
	id: { type: String, default: uuidv4(), unique: true },
	login: { type: String , required: true, unique: true },
	name: { type: String, required: true }
});

const Employee = mongoose.model('Employee', employeeSchema);

module.exports = Employee;