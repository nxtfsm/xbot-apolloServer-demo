// ./src/schema/dataTypes/index.js
import { gql } from 'apollo-server-express';
import Article from './_Article';
import ContentTag from './_ContentTag';
import Date from './_Date';
import User from './_User';
import UpdateResponse from './_UpdateResponse';

export default gql`
    ${Article}
    ${ContentTag}
    ${Date}
    ${User}
    ${UpdateResponse}
`;
