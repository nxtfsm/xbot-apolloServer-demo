// ./src/schema/_RootQuery.js
import { gql } from 'apollo-server';

export default gql`
type Query {
  internalTutorials(
    title: String
    content: String
    postedBy: ID
  ): [Article]!

  externalTutorials(
    title: String
    content: String
    postedBy: ID
  ): [Article]!

  activeUser( atXavierAccount: String! ): User
}
`
