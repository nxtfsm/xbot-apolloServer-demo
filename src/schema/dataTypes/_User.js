// ./src/schema/dataTypes/_User.js
import { gql } from 'apollo-server';

export default gql`
  type User {
    _id: ID!
    atXavierAccount: String
    firstName: String
    familyName: String
    isEditor: Boolean
  }
`
