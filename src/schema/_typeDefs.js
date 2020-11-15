// ./src/schema/_typeDefs.js
import { gql } from 'apollo-server';
import Query from './queries';
import Mutation from './mutations'

export default gql`
  type Article {
    _id: ID!
    title: String
    externalUrl: String
    summary: String
    content: String
    postedBy: User
  }

  type User {
    _id: ID!
    atXavierAccount: String
    firstName: String
    familyName: String
    isEditor: Boolean
  }

  type UpdateResponse {
    successStatus: Boolean
    message: String
    updatedArticle: Article
    updatedUser: User
  }

  ${Query}

  ${Mutation}
`
