const Group = require("../dbSchema/Group");

const createGroup = async (args) => {
    let newGroup = new Group({
        group_name: args.group_name,
        group_image: args.group_image,
    });
    let success = await newGroup.save();
    if (success) {
        return { status: 200, message: 'GROUP_CREATE_SUCCESS' };
    }
    else {
        return { status: 500, message: 'GROUP_CREATE_ERROR' };
    }
};

exports.createGroup = createGroup;
