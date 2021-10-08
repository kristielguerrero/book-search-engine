//  Define the query and mutation functionality to work with the Mongoose models.

const { AuthenticationError } = require('apollo-server-express');
const { User, Book } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {},
};
