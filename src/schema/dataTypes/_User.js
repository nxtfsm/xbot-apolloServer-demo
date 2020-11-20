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

  input UserInput {
    atXavierAccount: String
    firstName: String
    familyName: String
    isEditor: Boolean
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
