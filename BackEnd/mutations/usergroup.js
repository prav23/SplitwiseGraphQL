const UserGroup = require("../dbSchema/UserGroup");

const createUserGroup = async (args) => {
    let newUserGroup = new UserGroup({
        user: args.user,
        group: args.group,
        status: "Registered",
        total_owed: 0,
        total_spent: 0,
    });
    let success = await newUserGroup.save();
    new_friend_user_ids = args.new_friend_user_ids;
    new_friend_user_ids.map(async (nfuid) => {
        const userGroup = await UserGroup.findOne({ user : nfuid, group : args.group});
        if (userGroup) {
            throw new Error("userGroup already exists with same user_id + group_id");
        }
        const payload = {
            user: nfuid,
            group: args.group,
            status: "Invited",
            total_spent : 0,
            total_owed : 0,
        };
        const newUserGroups = await UserGroup.create(payload);
    });
    if (success) {
        return { status: 200, message: 'USERGROUP_CREATE_SUCCESS' };
    }
    else {
        return { status: 500, message: 'USERGROUP_CREATE_ERROR' };
    }
};

const acceptUserGroupInvite = async (args) => {
    try {

      const userGroup = await UserGroup.findOne({ group : args.group, user : args.user });
      const status = "Registered";
      let success = await userGroup.update({ status });
      if (success) {
        return { status: 200, message: 'USERGROUP_INVITE_ACCEPT_SUCCESS' };
      }
      else {
        return { status: 500, message: 'USERGROUP_INVITE_ACCEPT_ERROR' };
      }
    } catch (error) {
        return { status: 500, message: 'USERGROUP_INVITE_ACCEPT_ERROR' };
    }
  };

const addExpenseUserGroup = async (req, res) => {
    try {
        const { user_id, group_id, groupUsersData, amount} = req.body;
        // for all group Users split the expense equally and update the total_owed section
        const friendIds = args.groupUsersData.map(gu => gu.user);
        const friendsCount = friendIds.length;
        let split;
        if(friendsCount)
        split = (args.amount)/friendsCount;
        else
        split = 0;
        friendIds.map(async (frId) => {
        const fug = await UserGroup.findOne({ user : frId, group : args.group });
        const fug_tot_owed = fug.total_owed;
        await fug.update( { total_owed : fug_tot_owed - split} )
        });
        const ug = await UserGroup.findOne({
        where: { 
            user:args.user,
            group:args.group,
        }
        });
        const tot_owed = ug.total_owed;
        let success = await ug.update( { total_owed : tot_owed + split*(friendsCount - 1)} )
        if (success) {
            return { status: 200, message: 'USERGROUP_ADD_EXPENSE_SUCCESS' };
        }
        else {
            return { status: 500, message: 'USERGROUP_ADD_EXPENSE_ERROR' };
        }
    } catch (error) {
        return { status: 500, message: 'USERGROUP_ADD_EXPENSE_ERROR' };
    }
};

exports.createUserGroup = createUserGroup;
exports.acceptUserGroupInvite = acceptUserGroupInvite;
exports.addExpenseUserGroup = addExpenseUserGroup;