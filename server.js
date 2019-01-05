const express = require('express');
const bodyParser = require('body-parser');
let jwt = require('jsonwebtoken');
let auth = require('./auth');

let app = express(); 

app.use(bodyParser.urlencoded({ // Middleware
    extended: true
}));
app.use(bodyParser.json());


app.post('/login', auth.login);
app.get('/', auth.validate, auth.home);  

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server is listening on port: ${port}`));
