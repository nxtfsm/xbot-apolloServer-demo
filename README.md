[![](https://img.shields.io/badge/Node\.js-Tools-informational?style=for-the-badge&logo=node\.js&logoColor=f4f4f4&labelColor=339933&color=6f6f6f)](https://www.nodejs.org)
[![](https://img.shields.io/badge/Express-Tools-informational?style=for-the-badge&logo=express&logoColor=f4f4f4&labelColor=000&color=6f6f6f)](https://expressjs.com)
[![](https://img.shields.io/badge/Apollo\%20GraphQL-Tools-informational?style=for-the-badge&logo=apollo-graphql&logoColor=f4f4f4&labelColor=311C87&color=6f6f6f)](https://www.apollographql.com/docs/)
[![](https://img.shields.io/badge/Auth0-Tools-informational?style=for-the-badge&logo=auth0&logoColor=f4f4f4&labelColor=EB5424&color=6f6f6f)](https://www.apollographql.com/docs/)
[![](https://img.shields.io/badge/MongoDB-Tools-informational?style=for-the-badge&logo=mongodb&logoColor=f4f4f4&labelColor=47A248&color=6f6f6f)](https://www.mongodb.com)

Node.JS serving Express Apollo-GraphQL middleware endpoints for [xbotCarbonReact](https://github.com/ocommaj/xbotCarbonReact) front-end.<br>
[Auth0 express-jwt](https://github.com/auth0/express-jwt) used for checking authorization on protected endpoints, following [Auth0 Docs](https://auth0.com/docs/quickstart/backend/nodejs/01-authorization) and [Apollo Server Auth & Auth Docs](https://www.apollographql.com/docs/apollo-server/security/authentication/).<br>
Interfaces MongoDB Atlas Cluster.<br>

Expects `.env` variables for MongoDB api key & port<br>
  * `process.env.PORT`<br>
  * `process.env.MONGODB_URI`<br>

`package.json` defines `npm run devStart` option to run with log output by setting `NODE_ENV=debugging`<br>
Follows [IBM Developer Blog post by Sam Roberts](https://developer.ibm.com/articles/why-and-how-to-use-eslint-in-your-project/) for configuring [es-lint](https://www.npmjs.com/package/eslint) and running as pre-commit hook.

