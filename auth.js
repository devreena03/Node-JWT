let jwt = require('jsonwebtoken');
const key = "nodejwtdemoapp"

let validate = (req, res, next) => {
  let token = req.headers['my-access-token'] || req.headers['authorization'];
  if (token.startsWith('Bearer ')) {
    token = token.slice(7, token.length);
  }
  if (token) {
    jwt.verify(token, key, (err, decoded) => {
      if (err) {
        return res.json({
          success: false,
          message: 'Token is not valid'
        });
      } else {
        req.decoded = decoded;
        next();
      }
    });
  } else {
    return res.json({
      success: false,
      message: 'Auth token is not supplied'
    });
  }
};

let login = (req, res)  => {
      let username = req.body.username;
      let password = req.body.password;
      let dbUsername = 'admin';
      let dbPassword = 'password';
  
      if (username && password) {
        if (username === mockedUsername && password === mockedPassword) {
            console.log(username+" : "+password);
          let token = jwt.sign({username: username}, key,
            { expiresIn: '24h' // expires in 24 hours
            }
          );
          console.log(token);
          res.json({
            success: true,
            message: 'Authentication successful!',
            token: token
          });
        } else {
            res.sendStatus(403).json({
            success: false,
            message: 'Incorrect username or password'
          });
        }
      } else {
        res.sendStatus(400).json({
          success: false,
          message: 'Authentication failed! Please check the request'
        });
    }
}

let home = (req, res) => {
    res.json({
    success: true,
    message: 'Welcome!!'
    });
}
  
module.exports = {
    validate: validate,
    login: login,
    home: home
}