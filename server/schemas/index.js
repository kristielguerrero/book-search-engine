// Exporting typeDefs and resolvers

const typeDefs = require('./typeDefs');
const resolvers = require('./resolvers');
console.log(typeDefs, resolvers);

module.exports = { typeDefs, resolvers };
