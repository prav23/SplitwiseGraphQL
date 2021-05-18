// /* eslint-disable no-unused-vars */
// /* eslint-disable no-underscore-dangle */
// /* eslint-disable consistent-return */

const graphql = require('graphql');
const User = require('../dbSchema/User');

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
