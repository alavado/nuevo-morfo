const mongoose = require('mongoose')
const graphql = require('graphql')
const { GraphQLObjectType, GraphQLID, GraphQLList } = graphql
const SeccionType = require('./seccion_type')
const Seccion = mongoose.model('seccion')

const RootQueryType = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    secciones: {
      type: new GraphQLList(SeccionType),
      resolve() {
        return Seccion.find({})
      }
    },
  }
})

module.exports = RootQueryType
