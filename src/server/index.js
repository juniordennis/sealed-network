const path = require('path');
const express = require('express');
const fs = require("fs");
const dotenv = require('dotenv');
dotenv.config();
const app = express();
const bodyParser = require('body-parser');
const buildPath = path.join(__dirname, '../..', 'dist');
const port = process.env.PORT || 3000;
const errorHandler = require('./errorHandler');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/sealed?retryWrites=false', {
	useNewUrlParser: true,
	useCreateIndex: true,
	useUnifiedTopology: true
});

const employees = require('./employees');

const cors = require('cors');
app.use(cors());
app.options('*', cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/employees', employees);
app.use(errorHandler);

app.use(express.static(buildPath));
app.get('*', (req, res) => {
	res.sendFile(path.join(buildPath, 'index.html'));
});

app.listen(port, () => {
   console.log(`Server is up on port ${port}!`);
});