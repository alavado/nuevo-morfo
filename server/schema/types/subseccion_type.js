const graphql = require('graphql')
const { GraphQLObjectType, GraphQLString, GraphQLID } = graphql

const SubseccionType = new GraphQLObjectType({
  name: 'SubseccionType',
  fields: () => ({
    id: { type: GraphQLID },
    nombre: { type: GraphQLString }
  })
})

module.exports = SubseccionType
