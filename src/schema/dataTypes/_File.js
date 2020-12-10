// ./src/schema/dataTypes/_File.js
import { gql } from 'apollo-server-express';

export default gql`
  type File {
    filename: String!
    mimetype: String!
    encoding: String!
  }

  input FileInput {
    file: Upload!
  }
`;

/* input FileInput {
  filename: String!
  mimetype: String!
  encoding: String!
}*/
