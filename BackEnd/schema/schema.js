const graphql = require('graphql');
const User = require('../dbSchema/User');
const Profile = require('../dbSchema/Profile');
const Group = require('../dbSchema/Group');
const Expense = require('../dbSchema/Expense');
const UserGroup = require('../dbSchema/UserGroup');

const { userLogin } = require('../mutations/login');
const { registerUser } = require('../mutations/register');
const { updateProfile, createProfile } = require('../mutations/profile');
const { createExpense } = require('../mutations/expense');
const { createGroup } = require('../mutations/group');
const { createUserGroup, acceptUserGroupInvite, addExpenseUserGroup } = require('../mutations/usergroup');
const { resolve } = require('path');

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLFloat,
  GraphQLNonNull,
} = graphql;

const UserType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    _id: { type: GraphQLID },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    password: { type: GraphQLString },
  }),
});

const ProfileType = new GraphQLObjectType({
  name: 'Profile',
  fields: () => ({
    _id: { type: GraphQLID },
    user: { type: GraphQLString },
    image: { type: GraphQLString },
    phonenumber: { type: GraphQLInt },
    currency: { type: GraphQLString },
    language: { type: GraphQLString },
    timezone: { type: GraphQLString },
  }),
});

const GroupType = new GraphQLObjectType({
  name: 'Group',
  fields: () => ({
    _id: { type: GraphQLID },
    group_name: { type: GraphQLString },
    group_image : { type: GraphQLString },
  }),
});

const ExpenseType = new GraphQLObjectType({
  name: 'Expense',
  fields: () => ({
    _id: { type: GraphQLID },
    user: { type: GraphQLString },
    group: { type: GraphQLString },
    amount: { type: GraphQLInt },
    description: { type: GraphQLString },
    expense_date: { type: GraphQLString },
  }),
});

const UserGroupType = new GraphQLObjectType({
  name: 'UserGroup',
  fields: () => ({
    _id: { type: GraphQLID },
    user: { type: GraphQLString },
    group: { type: GraphQLString },
    status: { type: GraphQLString },
    total_spent : { type: GraphQLInt },
    total_owed : { type: GraphQLInt },
  }),
});

const StatusType = new GraphQLObjectType({
  name: 'Status',
  fields: () => ({
    status: { type: GraphQLString },
    message: { type: GraphQLString },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    user: {
      type: UserType,
      args: { user_id: { type: GraphQLString } },
      async resolve(parent, args) {
        const user = await User.findById(args.user_id);
        if (user) {
          return user;
        }
      },
    },
    users: {
      type: UserType,
      async resolve(parent, args) {
        const users = await User.find({});
        if (users) {
          return users;
        }
      },
    },
    profile: {
      type: ProfileType,
      args: { user_id: { type: GraphQLString }},
      async resolve(parent, args) {
        const profile = await Profile.find({ user : args.user_id});
        if(profile){
          return profile;
        }
      }
    },
    group: {
      type: GroupType,
      args: { group_name: { type: GraphQLString } },
      async resolve(parent, args) {
        const group = await Group.find({ group_name : args.group_name});
        if (group) {
          return group;
        }
      },
    },
    groups: {
      type: GroupType,
      async resolve(parent, args) {
        const groups = await Group.find({});
        if (groups) {
          return groups;
        }
      },
    },
    expense: {
      type: ExpenseType,
      args: { group: { type: GraphQLString } },
      async resolve(parent, args) {
        const expense = await Expense.find({ group : args.group});
        if (expense) {
          return expense;
        }
      },
    },
    expenses: {
      type: ExpenseType,
      async resolve(parent, args) {
        const expenses = await Expense.find({});
        if (expenses) {
          return expenses;
        }
      },
    },
    usergroups: {
      type: UserGroupType,
      args: { group: { type: GraphQLString } },
      async resolve(parent, args) {
        const usergroups = await UserGroup.find({ group : args.group});
        if (usergroups) {
          return usergroups;
        }
      },
    },

   }, 
});

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    registerUser: {
      type: StatusType,
      args: {
        name: { type: GraphQLString },
        email: { type: GraphQLString },
        password: { type: GraphQLString },
      },
      async resolve(parent, args) {
        return registerUser(args);
      },
    },

    userLogin: {
      type: StatusType,
      args: {
        email: { type: GraphQLString },
        password: { type: GraphQLString },
      },
      resolve(parent, args) {
        return userLogin(args);
      },
    },

    updateProfile: {
      type: StatusType,
      args: {
        user: { type: GraphQLString },
        image: { type: GraphQLString },
        phonenumber: { type: GraphQLString },
        currency: { type: GraphQLString },
        language: { type: GraphQLString },
        timezone: { type: GraphQLString },
      },
      resolve(parent, args) {
        return updateProfile(args);
      },
    },

    createProfile: {
      type: StatusType,
      args: {
        user: { type: GraphQLString },
        image: { type: GraphQLString },
        phonenumber: { type: GraphQLString },
        currency: { type: GraphQLString },
        language: { type: GraphQLString },
        timezone: { type: GraphQLString },
      },
      resolve(parent, args) {
        return createProfile(args);
      },
    },

    createExpense: {
      type: StatusType,
      args: {
        user: { type: GraphQLString },
        group: { type: GraphQLString },
        amount: { type: GraphQLString },
        description: { type: GraphQLString },
        expense_date: {type: GraphQLString}
      },
      resolve(parent, args) {
        return createExpense(args);
      },
    },

    createGroup: {
      type: StatusType,
      args: {
        group_name: { type: GraphQLString },
        group_image: { type: GraphQLString },
      },
      resolve(parent, args) {
        return createGroup(args);
      },
    },

    createUserGroup: {
      type: StatusType,
      args: {
        user : { type: GraphQLString },
        group : { type: GraphQLString},
        new_friend_user_ids : { type: GraphQLString},
      },
      resolve(parent, args){
        return createUserGroup(args);
      },
    },

    acceptUserGroupInvite: {
      type: StatusType,
      args: {
        user : { type: GraphQLString },
        group : { type: GraphQLString},
      },
      resolve(parent, args){
        return acceptUserGroupInvite(args);
      },
    },

    addExpenseUserGroup: {
      type: StatusType,
      args: {
        user : { type: GraphQLString },
        group : { type: GraphQLString},
        groupUsersData : { type: GraphQLString},
        amount: { type: GraphQLString},
      },
      resolve(parent, args){
        return addExpenseUserGroup(args);
      },
    },

  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});
