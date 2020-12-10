// ./src/schema/queries/index.js
import { gql } from 'apollo-server-express';

export default gql`
type Query {
  tutorials(
    input: TutorialsQueryInput
  ): TutorialsQueryConnection!

  codePens(
    input: CodePensQueryInput
  ): CodePensQueryConnection!
}

input CodePensQueryInput {
  collectionName: String
  pageSize: Int
  after: Int
  codePenQuery: CodePenInput
}

input TutorialsQueryInput {
  collectionName: String
  pageSize: Int
  after: Int
  articleQuery: ArticleInput
}

type CodePensQueryConnection {
  cursor: Int
  hasMore: Boolean
  codePens: [CodePen]
}

type TutorialsQueryConnection {
  cursor: Int
  hasMore: Boolean
  collection: String
  articles: [Article]
}
`;
