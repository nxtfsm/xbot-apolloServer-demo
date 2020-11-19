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

    loginUser(
      input: LoginInput
    ): LoginResponse


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
