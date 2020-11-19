// ./src/schema/queries/index.js
import { gql } from 'apollo-server';

export default gql`
type Query {
  tutorials(
    input: ArticleInput
  ): TutorialsQueryPayload!
}

type TutorialsQueryPayload {
  collection: String
  articles: [Article]
}
`;
