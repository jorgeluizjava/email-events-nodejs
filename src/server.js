const cors = require('cors');
const express = require('express');
const app = express();

app.use(express.json());
app.use(cors());
app.use('/', require('./controller/EmailsController'))

app.listen(3000);