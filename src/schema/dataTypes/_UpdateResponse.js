// ./src/schema/dataTypes/_UpdateResonse.js
import { gql } from 'apollo-server-express';

export default gql`
  type UpdateResponse {
    successStatus: Boolean
    message: String
    updatedArticle: Article
    updatedUser: User
  }
`;
