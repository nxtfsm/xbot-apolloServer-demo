// ./src/schema/dataTypes/_ContentTag.js
import { gql } from 'apollo-server-express';

const ContentTag = gql`
  type ContentTag {
    _id: ID!
    key: String!
    type: String
    related: [ContentTag]
  }

  input TagInput {
    key: String
    type: String
    related: [ID]
  }
`;

export default ContentTag;
