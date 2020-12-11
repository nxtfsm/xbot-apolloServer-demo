// ./src/schema/mutations/index.js
import { gql } from 'apollo-server-express';

export default gql`
  type Mutation {
    singleUpload(file: Upload!): File!

    createCodePen(
      input: CodePenInput!
    ): UpdateResponse

    updateCodePen(
      input: CodePenInput!
      newValues: CodePenInput
    ): UpdateResponse

    deleteCodePen(
      input: CodePenInput!
    ): UpdateResponse

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

    updateUser(
      input: UserInput
    ): UpdateResponse

    deleteUser(
      _id: ID!
    ): UpdateResponse

  }
`;
