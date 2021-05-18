const User = require("../dbSchema/User");
const passwordHash = require('password-hash');


const registerUser = async (args) => {
    let hashedPassword = passwordHash.generate(args.password);

    let newUser = new User({
        name: args.name,
        email: args.email,
        password: hashedPassword,
    });

    let user = await User.find({ email: args.email });
    if (user.length) {
        return { status: 400, message: 'USER_PRESENT' };
    }
    let success = await newUser.save();
    if (success) {
        return { status: 200, message: 'REGISTER_SUCCESS' };
    }
    else {
        return { status: 500, message: 'REGISTER_ERROR' };
    }
};

exports.registerUser = registerUser;
