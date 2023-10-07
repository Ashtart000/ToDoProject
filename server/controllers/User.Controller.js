const { User } = require('../models/');
const bcrypt = require('bcrypt');
const CONSTANTS = require('../configs/constants');
const { createToken, verifyToken } = require('../services/tokenService');

module.exports.registrationUser = async (req, res, next) => {
    try {
        const {body, body: {password}} = req;
        const hashPass = await bcrypt.hash(password, CONSTANTS.SALT_ROUNDS)
        const createdUser = await User.create({ ...body, password: hashPass })

        const token = await createToken({userId: createdUser._id, email: createdUser.email})
        return res.status(201).send({data: createdUser, tokens: {token}})
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
            const token = await createToken({userId: foundUser._id, email: foundUser.email})
            // return res.json({token});
            return res.status(200).send({data: foundUser, tokens: {token}});
        } else {
            throw new NotFoundError('Incorrect email');
        }
    } catch (error) {
        next(error);
    }
}

module.exports.checkToken = async(req, res, next) => {
    try {
        const {tokenPayload: {email}} = req;
        const foundUser = await User.findOne({
            email
        })
        return res.status(200).send({data: foundUser});
    } catch (error) {
        next(error);
    }
}