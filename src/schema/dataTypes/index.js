// ./src/schema/dataTypes/index.js
import { gql } from 'apollo-server-express';
import Article from './_Article';
import CodePen from './_CodePen';
import ContentTag from './_ContentTag';
import Date from './_Date';
import File from './_File';
import User from './_User';
import UpdateResponse from './_UpdateResponse';

export default gql`
    ${Article}
    ${CodePen}
    ${ContentTag}
    ${Date}
    ${File}
    ${User}
    ${UpdateResponse}
`;
