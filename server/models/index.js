const mongoose = require('mongoose');
const User = require('./User');
const Task = require('./Task');
const RefreshToken = require('./RefreshToken')
const { DB } = require('../configs/db');

mongoose.connect(DB)
.catch(err => {
    console.log('Connect failed')
    process.exit(1)
})

module.exports = {
    User, Task, RefreshToken
}