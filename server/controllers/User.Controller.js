const { User, RefreshToken } = require('../models/');
const bcrypt = require('bcrypt');
const CONSTANTS = require('../configs/constants');
const { createAccessToken, createRefreshToken, verifyAccessToken, verifyRefreshToken } = require('../services/tokenService');
const RefreshTokenError = require('../errors/RefreshTokenError');

module.exports.registrationUser = async (req, res, next) => {
    try {
        const {body, body: {password}} = req;
        const hashPass = await bcrypt.hash(password, CONSTANTS.SALT_ROUNDS)
        const createdUser = await User.create({ ...body, password: hashPass })

        const accessToken = await createAccessToken({userId: createdUser._id, email: createdUser.email})
        const refreshToken = await createRefreshToken({userId: createdUser._id, email: createdUser.email})
        return res.status(201).send({data: createdUser, tokens: {accessToken, refreshToken}})
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
            const accessToken = await createAccessToken({userId: foundUser._id, email: foundUser.email});
            const refreshToken = await createRefreshToken({userId: foundUser._id, email: foundUser.email});
            const addedToken = await RefreshToken.create({
                token: refreshToken,
                userId: foundUser._id
            })
            return res.status(200).send({data: foundUser, tokens: {accessToken, refreshToken}});
        } else {
            throw new NotFoundError('Incorrect email');
        }
    } catch (error) {
        next(error);
    }
}

module.exports.checkAuth = async(req, res, next) => {
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

module.exports.refreshSession = async (req, res, next) => {
    const timestamp = new Date();
    console.log(`ПОЧАТОК РЕФРЕШ СЕСІЇ ${timestamp}`)
    const {body: {refreshToken}} = req;
    let verifyResult;

    try {
        verifyResult = await verifyRefreshToken(refreshToken);
        console.log(verifyResult)
    } catch (error) {
        const newError = new RefreshTokenError('Invalid refresh token');
        return next(newError)
    }

    try {
        if(verifyResult) {
            // дістаємо сутність юзера з БД
            const foundUser = await User.findOne({
                email: verifyResult.email
            })
            console.log(`Це ми в іфі verifyResult, знайшли foundUser ${foundUser}`)

            // дістаємо сутність токена з БД
            const refreshTokenFromDB = await RefreshToken.findOne({$and: [{token: refreshToken}, {userId: foundUser._id}]});
            console.log(`пошук сутності токена в дб ${refreshTokenFromDB}`)
            
            if(refreshTokenFromDB) {
                // видаляємо попередній рефреш токен
                // const removeResult = await refreshTokenFromDB.remove();
                const removeResult = await RefreshToken.deleteOne({$and: [
                    {token: refreshToken}, {userId: foundUser._id}
                ]});
                console.log(`результат видалення сутності ${removeResult}`)

                const newAccessToken = await createAccessToken({userId: foundUser._id, email: foundUser.email});
                const newRefreshToken = await createRefreshToken({userId: foundUser._id, email: foundUser.email});
                
                const addedToken = await RefreshToken.create({
                    token: newRefreshToken,
                    userId: foundUser._id
                })

                return res.status(200).send({tokens: {accessToken: newAccessToken, refreshToken: newRefreshToken}})
            }   
        } 
    } catch (error) {
        next(error);
    }
}