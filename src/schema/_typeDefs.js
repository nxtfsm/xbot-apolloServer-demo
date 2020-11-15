// ./src/schema/_typeDefs.js
import { gql } from 'apollo-server';
import dataTypes from './dataTypes';
import Query from './queries';
import Mutation from './mutations'

export default gql`
  ${dataTypes}
  ${Query}
  ${Mutation}
`
