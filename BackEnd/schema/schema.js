const graphql = require('graphql');
const User = require('../dbSchema/User');
const Profile = require('../dbSchema/Profile');
const Group = require('../dbSchema/Group');
const Expense = require('../dbSchema/Expense');
const UserGroup = require('../dbSchema/UserGroup');

const { userLogin } = require('../mutations/login');
const { registerUser } = require('../mutations/register');
// const { customerUpdate, restaurantUpdate } = require('../mutations/profile');
// const { addDish } = require('../mutations/menu');
// const { createOrder, updateOrder } = require('../mutations/orders');
// const { addReview } = require('../mutations/reviews');

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
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});
