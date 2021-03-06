// ./src/schema/dataTypes/_User.js
import { gql } from 'apollo-server-express';

export default gql`
  type User {
    _id: ID!
    atXavierAccount: String
    firstName: String
    familyName: String
    fullName: String
    goesBy: String
    isEditor: Boolean
    lastLogin: Date
    lastUpdate: Date
  }

  input UserInput {
    _id: ID
    atXavierAccount: String
    firstName: String
    familyName: String
    fullName: String
    goesBy: String
    isEditor: Boolean
    lastLogin: Date
    lastUpdate: Date
  }

  input LoginInput {
    atXavierAccount: String!
    verifiedEmail: Boolean!
    user: UserInput
  }

  type LoginResponse {
    successStatus: Boolean
    message: String
    loggedInUser: User
    token: String
  }
`;
