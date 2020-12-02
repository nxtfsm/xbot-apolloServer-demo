import express from 'express';
import jwt from 'express-jwt';
// import jwtAuthz from 'express-jwt-authz';
import jwksRsa from 'jwks-rsa';

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
});

export default function launchExpress(port) {
  let status = null;
  try {
    const app = express();
    app.get('/private', checkJwt, function(req, res) {
      res.json({ message: 'hello from a private endpoint' });
    });
    status = app;
  } catch (error) {
    console.error(error);
  } finally {
    return status;
  }
}
