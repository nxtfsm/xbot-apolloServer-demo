import axios from 'axios';
import { print } from 'graphql';
import gql from 'graphql-tag';
import data from '../bulkImports/externalArticles.json';

const ADD_ARTICLE = gql`
mutation createTutorial($input: ArticleInput!) {
  createTutorial(input: $input) {
    successStatus
  }
}
`;

const ADD_CODEPEN = gql`
mutation createCodePen($input: CodePenInput!) {
  createCodePen(input: $input) {
    successStatus
    updatedCodePen {
      _id
      title
      summary
    }
  }
}
`;

const queries = {
  codePens: ADD_CODEPEN,
  internalTutorials: ADD_ARTICLE,
  externalTutorials: ADD_ARTICLE,
};

export function addCodePen(port) {
  const endpoint = `http://localhost:${port}/graphql`;
  const input = {
    collectionName: 'codePens',
    title: 'Axios Code Pen',
    summary: 'From Axios',
    preview: {
      file: './bulkImports/testPenThumbnail.png',
    },
  };

  try {
    axios.post(endpoint, {
      query: print(ADD_CODEPEN),
      variables: { input },
    })
      .then(res => console.dir(res))
      .catch(err => console.error(err));
  } catch (err) {
    console.error(err);
  }
}


export default function bulkImporter(port, collectionName) {
  const endpoint = `http://localhost:${port}/graphql`;
  const query = queries[collectionName];

  try {
    for (const record of data) {
      const input = { ...record, collectionName };
      axios.post(endpoint, {
        query: print(query),
        variables: { input },
      })
        .then(res => console.log(res.status))
        .catch(err => console.error(err));
    }
  } catch (err) {
    console.error(err);
  }
}
