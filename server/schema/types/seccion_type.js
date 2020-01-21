const graphql = require('graphql')
const mongoose = require('mongoose');
const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLList } = graphql
const Seccion = mongoose.model('Seccion');
const SubSeccionType = require('./subseccion_type');

const SeccionType = new GraphQLObjectType({
  name: 'SeccionType',
  fields: () => ({
    id: { type: GraphQLID },
    nombre: { type: GraphQLString },
    subsecciones: {
      type: new GraphQLList(SubSeccionType),
      resolve(parentValue) {
        return Seccion.findSubsecciones(parentValue.id);
      }
    }
  })
})

module.exports = SeccionType
