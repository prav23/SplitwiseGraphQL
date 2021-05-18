const User = require("../dbSchema/User");
const passwordHash = require('password-hash');
const jwt = require('jsonwebtoken');
const { secret } = require('../config/config');

const userLogin = async (args) => {
    let user = await User.findOne({ email: args.email });
    if (!user) {
        return { status: 401, message: "NO_USER" };
    }
    if (user.length === 0) {
        return { status: 401, message: "NO_USER" };
    }
    if (passwordHash.verify(args.password, user.password)) {
        const payload = { user_id: user._id };
        var token = jwt.sign(payload, secret, {
            expiresIn: 1008000
        });
        token = 'JWT ' + token;
        return { status: 200, message: token };
    }
    else {
        return { status: 401, message: "INVALID_USER_CREDENTIALS" };
    }
}

exports.userLogin = userLogin;