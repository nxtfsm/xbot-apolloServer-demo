// ./src/schema/queries/index.js
import { gql } from 'apollo-server';

export default gql`
type Query {
  tutorials(
    input: ArticleInput
  ): TutorialsQueryPayload!

  activeUser( input: ActiveUserQueryInput ): UpdateResponse
}

input ActiveUserQueryInput {
  atXavierAccount: String!
  firstName: String
  familyName: String
  isEditor: Boolean
}

type TutorialsQueryPayload {
  collection: String
  articles: [Article]
}
`
