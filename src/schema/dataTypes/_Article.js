// ./src/schema/dataTypes/_Article.js
import { gql } from 'apollo-server-express';

export default gql`
  type Article {
    _id: ID!
    title: String
    externalUrl: String
    summary: String
    content: String
    postedBy: User
  }

  type UpdatedArticlePayload {
    articles: [Article]
  }

  input ArticleInput {
    internalOrigin: Boolean!
    title: String
    externalUrl: String
    summary: String
    content: String
    postedBy: ID
  }

  input UpdateArticle {
    title: String
    externalUrl: String
    summary: String
    content: String
    modifiedBy: ID
  }
`;
