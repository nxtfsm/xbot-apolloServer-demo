Node.JS Server providing Express Apollo-GraphQL middleware endpoints for [xbotCarbonReact](https://github.com/ocommaj/xbotCarbonReact) Front End<br>
Interfaces MongoDB Cloud Atlas Cluster<br>

expects .env variables for mongoDB api key & port<br>
process.env.PORT<br>
process.env.MONGODB_URI<br>
Connects to remote mongodb<br>

package.json defines 'npm run devStart' option to run w/log output<br>
Follows [IBM Developer Blog post by Sam Roberts](https://developer.ibm.com/articles/why-and-how-to-use-eslint-in-your-project/) for configuring [es-lint](https://www.npmjs.com/package/eslint) and running as pre-commit hook.

