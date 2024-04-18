const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { jwtConstants } = require('../../common/constants');
const User = require('../users/user.model');

async function signIn(email, password) {
    try {
        const user = await User.findOne({ where: { email } });
        if (!user) {
            throw { response: { status: 404 } };
        }
        const isMatch = await bcrypt.compare(password, user.hash);
        if (!isMatch) {
            throw { response: { status: 404 } };
        }
        return jwt.sign({ email: user.email }, jwtConstants.secret);
    } catch (error) {
        throw error;
    }
}

async function signUp(userData) {
    try {
        const user = await User.findOne({ where: { email: userData.email } });
        if (user) {
            throw { response: { status: 409 } };
        }
        const hash = await bcrypt.hash(userData.password, 10);
        await User.create({
            email: userData.email,
            name: userData.name,
            hash: hash
        });
    } catch (error) {
        throw error;
    }
}

module.exports = {
    signIn,
    signUp,
};
