// ./src/schema/dataTypes/index.js
import { gql } from 'apollo-server';
import Article from './_Article';
import Date from './_Date';
import User from './_User';
import UpdateResponse from './_UpdateResponse';

export default function() {
  return gql`
    ${Article}
    ${Date}
    ${User}
    ${UpdateResponse}
`;
}
