const { User } = require('../models/');
const bcrypt = require('bcrypt');
const CONSTANTS = require('../configs/constants');

module.exports.registrationUser = async (req, res, next) => {
    try {
        const {body, body: {password}} = req;
        const hashPass = await bcrypt.hash(password, CONSTANTS.SALT_ROUNDS)
        const createdUser = await User.create({ ...body, password: hashPass })
        return res.status(201).send({data: createdUser})
    } catch (error) {
        next(error)
    }
}

module.exports.loginUser = async (req, res, next) => {
    try {
        const { body } = req;
        const foundUser = await User.findOne({
            email: body.email
        });
        if(foundUser) {
            const result = await bcrypt.compare(body.password, foundUser.password);
            if(!result) {
                throw new NotFoundError('Incorrect password');
            }
            return res.status(200).send({data: foundUser});
        } else {
            throw new NotFoundError('Incorrect email');
        }
    } catch (error) {
        next(error);
    }
}