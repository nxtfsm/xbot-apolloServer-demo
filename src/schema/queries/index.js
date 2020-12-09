// ./src/schema/queries/index.js
import { gql } from 'apollo-server-express';

export default gql`
type Query {
  tutorials(
    input: TutorialsQueryInput
  ): TutorialsQueryConnection!
}

input TutorialsQueryInput {
  pageSize: Int
  after: Int
  articleQuery: ArticleInput
}

type TutorialsQueryConnection {
  cursor: Int
  hasMore: Boolean
  collection: String
  articles: [Article]
}
`;
