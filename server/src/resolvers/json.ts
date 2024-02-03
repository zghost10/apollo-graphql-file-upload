import GraphQLJSON from 'graphql-type-json';
import { GraphQLScalarType } from 'graphql';

export const jsonScalar = new GraphQLScalarType({
  name: 'Json',
  description: 'Json object scalar type',
  serialize(value) {
    if (value instanceof Object) {
      return GraphQLJSON.parseValue(value);
    }
    throw Error('GraphQL Date Scalar serializer expected a `Object`');
  }
});