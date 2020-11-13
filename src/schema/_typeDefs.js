// ./src/schema/_typeDefs.js
import { gql } from 'apollo-server';

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

  type Query {
    internal: [Article]!
    external: [Article]!
    activeUser: User
  }
`
