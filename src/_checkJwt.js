import jwt from 'express-jwt';
import jwksRsa from 'jwks-rsa';
// import jwtAuthz from 'express-jwt-authz';

const checkJwt = jwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: 'https://dev-r0qdxyeq.us.auth0.com/.well-known/jwks.json',
  }),

  audience: 'https://xbotdemo/api',
  issuer: 'https://dev-r0qdxyeq.us.auth0.com/',
  algorithms: ['RS256'],
  credentialsRequired: true,
});

export default checkJwt;
