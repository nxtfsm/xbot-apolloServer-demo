import axios from 'axios';
import { print } from 'graphql';
import gql from 'graphql-tag';
import data from '../bulkImports/externalArticles.json';

const internalOrigin = false;
const ADD_ARTICLE = gql`
mutation createTutorial($input: ArticleInput!) {
  createTutorial(input: $input) {
    successStatus
  }
}
`;

export default function bulkImporter(port) {
  const endpoint = `http://localhost:${port}/graphql`;

  try {
    for (const record of data) {
      const input = { ...record, internalOrigin };
      axios.post(endpoint, {
        query: print(ADD_ARTICLE),
        variables: { input },
      })
        .then(res => console.log(res.status))
        .catch(err => console.error(err));
    }
  } catch (err) {
    console.error(err);
  }
}
