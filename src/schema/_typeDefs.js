// ./src/schema/_typeDefs.js
import { gql } from 'apollo-server-express';
import DataTypes from './dataTypes';
import Query from './queries';
import Mutation from './mutations';

export default gql`
  ${DataTypes}
  ${Query}
  ${Mutation}
`;
