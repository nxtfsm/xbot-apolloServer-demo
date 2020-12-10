// ./src/schema/dataTypes/_Article.js
import { gql } from 'apollo-server-express';

export default gql`
  type Article {
    _id: ID!
    refTitle: String
    title: String
    shortTitle: String
    externalUrl: String
    summary: String
    content: String
    source: String
    tags: [ContentTag]
    postedBy: User
  }

  input ArticleInput {
    collectionName: String
    refTitle: String
    title: String
    shortTitle: String
    externalUrl: String
    summary: String
    content: String
    source: String
    tags: [ID]
    postedBy: ID
  }

  input UpdateArticle {
    title: String
    refTitle: String
    shortTitle: String
    externalUrl: String
    summary: String
    content: String
    source: String
    tags: [ID]
    modifiedBy: ID
  }
`;
