const graphql = require('graphql')
const { GraphQLObjectType, GraphQLString, GraphQLID } = graphql

const SeccionType = new GraphQLObjectType({
  name: 'SeccionType',
  fields: () => ({
    id: { type: GraphQLID },
    nombre: { type: GraphQLString }
  })
})

module.exports = SeccionType
