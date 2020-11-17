// ./src/schema/queries/index.js
import { gql } from 'apollo-server';

export default gql`
type Query {
  tutorials(
    input: ArticleInput
  ): TutorialsQueryPayload!

  activeUser( atXavierAccount: String! ): User
}

type TutorialsQueryPayload {
  collection: String
  articles: [Article]
}
`
