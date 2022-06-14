require('dotenv').config()
const jwt = require('jsonwebtoken');

// console.log(process.env.SECRET_KEY);

// Crated secrete token with it...
// const secrete = require('crypto').randomBytes(64).toString('hex');
// console.log(secrete);

authenticationToken = (data) => {
    return jwt.sign(data.id, process.env.SECRET_KEY)
}

authorizationToken = (req, res, next) => {
    const cookie = req.headers.cookie;
    if (cookie) {
        token = cookie.split('=')[1];
        const id = jwt.verify(token, process.env.SECRET_KEY);
        req.user_id = Number(id);
        next()
    }
    else {
        res.status(403).send('Login first to proceed!!')
    }
}

forLogout = (req, res, next) => {
    const cookie = req.headers.cookie;
    if (cookie) {
        return res.status(406).send('You are already logged in with an account.')
    }
    next();
}

module.exports = {
    authenticationToken,
    authorizationToken,
    forLogout
}