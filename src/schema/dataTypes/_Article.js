// ./src/schema/dataTypes/_Article.js
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
`
