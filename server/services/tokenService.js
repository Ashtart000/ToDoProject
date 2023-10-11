const { promisify}  = require('util');
const jwt = require('jsonwebtoken');

const promisifyJwtSign = promisify(jwt.sign);
const promisifyJwtVerify = promisify(jwt.verify);

const REFRESH_EXPIRES_TIME = '24h';
const ACCESS_EXPIRES_TIME = 60;
const ACCESS_SECRET = 'some_secret_key';
const REFRESH_SECRET = 'another_some_any_secret_key'

module.exports.createAccessToken = async ({userId, email}) => 
await promisifyJwtSign({userId, email}, ACCESS_SECRET, {expiresIn: ACCESS_EXPIRES_TIME});

module.exports.createRefreshToken = async ({userId, email}) => 
await promisifyJwtSign({userId, email}, REFRESH_SECRET, {expiresIn: REFRESH_EXPIRES_TIME});

module.exports.verifyAccessToken = async (token) => 
await promisifyJwtVerify(token, ACCESS_SECRET);

module.exports.verifyRefreshToken = async (token) => 
await promisifyJwtVerify(token, REFRESH_SECRET);