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
      preview {
        filename
        mimetype
        encoding
      }
    }
  }
}
`;

const UPLOAD_FILE = gql`
mutation singleUpload($file: Upload!) {
  singleUpload(file: $file) {
    filename
    mimetype
    encoding
  }
}
`;

const queries = {
  codePens: ADD_CODEPEN,
  internalTutorials: ADD_ARTICLE,
  externalTutorials: ADD_ARTICLE,
};

export async function fileUpload(port) {
  const endpoint = `http://localhost:${port}/graphql`;
  const file = '../bulkImports/testPenThumbnail.png';

  axios.post(endpoint, {
    query: print(UPLOAD_FILE),
    variables: { file } })
    .then(res => console.dir(res.data))
    .catch(err => console.error(err));
}

/* export function addCodePen(port) {
  const endpoint = `http://localhost:${port}/graphql`;
  const input = {
    collectionName: 'codePens',
    title: 'Axios Code Pen',
    summary: 'From Axios',
    preview: {
      filename: './bulkImports/testPenThumbnail.png',
      mimetype: 'image/png',
      encoding: 'utf-8',
    },
  };

/* try {
    axios.post(endpoint, {
      query: print(ADD_CODEPEN),
      variables: { input },
    })
      .then(res => console.dir(res))
      .catch(err => console.error(err));
  } catch (err) {
    console.error(err);
  }
}*/


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
