const { promisify}  = require('util');
const jwt = require('jsonwebtoken');

const promisifyJwtSign = promisify(jwt.sign);
const promisifyJwtVerify = promisify(jwt.verify);

const EXPIRES_TIME = 60*60;
const SECRET = 'some_secret_key'

module.exports.createToken = async ({userId, email}) => 
await promisifyJwtSign({userId, email}, SECRET, {expiresIn: EXPIRES_TIME});

module.exports.verifyToken = async (token) => 
await promisifyJwtVerify(token, SECRET);