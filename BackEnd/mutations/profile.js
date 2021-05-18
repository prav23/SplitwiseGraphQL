const Profile = require("../dbSchema/Profile");

const updateProfile = async (args) => {
    let profile = await Profile.find({ user: args.user });
    if(profile){
        profile.image = args.image?args.image:profile.image;
        profile.phonenumber = args.phonenumber?args.phonenumber:profile.phonenumber;
        profile.currency = args.currency?args.currency:profile.currency;
        profile.language = args.language?args.language:profile.language;
        profile.timezone = args.timezone?args.timezone:profile.timezone;
        let updateProfile = await profile.save;
        if(updateProfile){
            return { status: 200, message: "PROFILE_UPDATED" };
        }
        else{
            return { status: 500, message: "PROFILE_UPDATE_ERROR" };
        }
    }else{
        return { status: 500, message: "INTERNAL_SERVER_ERROR" };
    }
};

const createProfile = async (args) => {
    let newProfile = new Profile({
        user: args.user,
        image: args.image,
        phonenumber: args.phonenumber,
        currency: args.currency,
        language: args.language,
        timezone: args.timezone,
    });
    let success = await newProfile.save();
    if (success) {
        return { status: 200, message: 'PROFILE_CREATE_SUCCESS' };
    }
    else {
        return { status: 500, message: 'PROFILE_CREATE_ERROR' };
    }
};

exports.createProfile = createProfile;
exports.updateProfile = updateProfile;
