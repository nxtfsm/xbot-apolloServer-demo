// ./src/schema/mutations/index.js
import { gql } from 'apollo-server';

export default gql`
  type Mutation {
    createTutorial(
      input: ArticleInput!
    ): UpdateResponse

    updateTutorial(
      input: ArticleInput!
      newValues: UpdateArticle
    ): UpdateResponse

    deleteTutorial(
      input: ArticleInput!
    ): UpdateResponse

    createUser(
      atXavierAccount: String!
      firstName: String
      familyName: String
      isEditor: Boolean
    ): UpdateResponse

    updateUser(
      atXavierAccount: String!
      firstName: String
      familyName: String
      isEditor: Boolean
    ): UpdateResponse

    deleteUser(
      _id: ID!
    ): UpdateResponse

  }
`;

/*
updateTutorial {
  internalOrigin: Boolean!
  title: String
  externalUrl: String
  summary: String
  content: String
  postedBy: ID
}*/
