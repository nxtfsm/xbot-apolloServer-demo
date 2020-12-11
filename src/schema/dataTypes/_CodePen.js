// ./src/schema/dataTypes/CodePen.js
import { gql } from 'apollo-server-express';

export default gql`
  type CodePen {
    _id: ID!
    title: String
    summary: String
    description: String
    data: CodePenData
    tags: [ContentTag]
    preview: File
    postedBy: User
    updatedAt: Date
  }

  type CodePenData {
    html: String
    js: String
    css: String
  }

  input CodePenDataInput {
    html: String
    js: String
    css: String
  }

  input CodePenInput {
    collectionName: String
    title: String
    summary: String
    description: String
    tags: [TagInput]
    file: Upload
    preview: FileInput
    postedBy: ID
    updatedAt: Date
  }
`;
