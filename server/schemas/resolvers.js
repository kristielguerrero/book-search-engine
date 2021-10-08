//  Define the query and mutation functionality to work with the Mongoose models.

// const { AuthenticationError } = require('apollo-server-express');
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
    }
  }
}, 
Mutation: {
  login: async (parent, [email, password]) => {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }
    const correctPw = await user.isCorrectPassword(password);
    if (!correctPw) {
      return res.status(400).json({ message: 'Incorrect password!' });
    }
    const token = signToken(user);
    return { token, user };
  }, 
  addUser: async (parent, args) => {
      const user = await User.create(args); 
      if (!user) {
          return ({ message: 'Something went wrong'});
      }
      const token = signToken(user); 
      return ({ token, user }); 
  }, 
  saveBook: async (parent, args, context) => {
      const updateUser = await context.findOneAndUpdate(
          {_id: context.user._id }, 
          { $addToSet: { savedBooks: newBook }}, 
          { new: true, runValidators: true }
      )
      return updateUser;
  }, 
  removeBook: async (parent, { bookId }, context) => {
      const updateUser = await User.findOneAndUpdate(
          { _id: context.user._id }, 
          { $pull: { savedBooks: { bookId: bookId }}}, 
          { new: true }
      )
      return updateUser; 
  }
}

module.exports = resolvers; 