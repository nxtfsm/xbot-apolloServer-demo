// ./src/schema/mutations/index.js
import { gql } from 'apollo-server';

export default gql`
  type Mutation {
    createTutorial(
      internalOrigin: Boolean!
      title: String!
      externalUrl: String
      summary: String
      content: String
      postedBy: ID
    ): Article

    updateInternalTutorial(
      _id: ID!
      title: String
      externalUrl: String
      summary: String
      content: String
      postedBy: ID
    ): String

    updateExternalTutorial(
      _id: ID!
      title: String
      externalUrl: String
      summary: String
      content: String
      postedBy: ID
    ): String

    deleteInternalTutorial(
      _id: ID!
    ): String

    deleteExternalTutorial(
      _id: ID!
    ): String

    createUser(
      atXavierAccount: String!
      firstName: String
      familyName: String
      isEditor: Boolean
    ): User

    updateUser(
      atXavierAccount: String!
      firstName: String
      familyName: String
      isEditor: Boolean
    ): String

    deleteUser(
      _id: ID!
    ): String

  }
`

/*
updateTutorial {
  internalOrigin: Boolean!
  title: String
  externalUrl: String
  summary: String
  content: String
  postedBy: ID
}*/
