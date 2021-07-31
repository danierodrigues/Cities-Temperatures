const moment = require('moment');
fs = require('fs');

const logger = (req, res, next) => {
    let logInformation = `${moment().format('YY-MM-DD HH:mm:ss')} | ${req.method} - ${req.protocol}://${req.get('host')}${req.originalUrl}`;      

    fs.appendFile('logs.txt', logInformation + '\n', function (err) {
        if (err) return console.log(err);
        console.log(logInformation);
    });

    next();
}

module.exports = logger;