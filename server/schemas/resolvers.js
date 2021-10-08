//  Define the query and mutation functionality to work with the Mongoose models.

const { AuthenticationError } = require('apollo-server-express');
const { Book, User } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      const userData = await User.findOne({ _id: context.user._id });
      if (!userData) {
        return res.status(400).json({ message: 'User with this ID not found' });
      }
      return userData;
    },
  },
};
