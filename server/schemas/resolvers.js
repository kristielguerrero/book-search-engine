//  Define the query and mutation functionality to work with the Mongoose models.

const { AuthenticationError } = require('apollo-server-express');
const { Book, User } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        const userData = await User.findOne({ _id: context.user._id });
        return userData;
      }
      throw new AuthenticationError('You need to be logged in');
    },
  },

  Mutation: {
    login: async (parent, [email, password]) => {
      const user = await User.findOne({ email });
      if (!user) {
        throw new AuthenticationError('Incorrect email/password');
      }
      const correctPw = await user.isCorrectPassword(password);
      if (!correctPw) {
        throw new AuthenticationError('Incorrect email/password');
      }
      const token = signToken(user);
      return { token, user };
    },
    addUser: async (parent, args) => {
      const user = await User.create(args);
      if (!user) {
        throw new AuthenticationError('Something went wrong');
      }
      const token = signToken(user);
      return { token, user };
    },
    saveBook: async (parent, args, context) => {
      if (context.user) {
        const updateUser = await context.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { savedBooks: newBook } },
          { new: true, runValidators: true }
        );
        return updateUser;
      }
      throw new AuthenticationError('You must be logged in');
    },
    removeBook: async (parent, { bookId }, context) => {
      if (context.user) {
        const updateUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { savedBooks: { bookId: bookId } } },
          { new: true }
        );
        return updateUser;
      }
      throw new AuthenticationError('You need to be logged in');
    },
  },
};

module.exports = resolvers;
