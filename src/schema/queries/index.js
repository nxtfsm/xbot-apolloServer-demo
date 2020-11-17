// ./src/schema/queries/index.js
import { gql } from 'apollo-server';

export default gql`
type Query {
  tutorials(
    internalOrigin: Boolean!
    title: String
    content: String
    postedBy: ID
  ): [Article]!

  activeUser( atXavierAccount: String! ): User
}
`
