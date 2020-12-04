import expressJwt from 'express-jwt';
import jwksRsa from 'jwks-rsa';
// import jwtAuthz from 'express-jwt-authz';

const client = jwksRsa({
  cache: true,
  cacheMaxEntries: 5,
  cacheMaxAge: 600000,
  rateLimit: true,
  jwksRequestsPerMinute: 5,
  jwksUri: 'https://dev-r0qdxyeq.us.auth0.com/.well-known/jwks.json',
});

const options = {
  algorithm: 'RS256',
  audience: 'https://xbotdemo/api',
  issuer: 'https://dev-r0qdxyeq.us.auth0.com/',
};

const expressCheckJwt = expressJwt({
  secret: jwksRsa.expressJwtSecret({
    cache: client.cache,
    rateLimit: client.rateLimit,
    jwksRequestsPerMinute: client.jwksRequestsPerMinute,
    jwksUri: client.jwksUri,
  }),

  audience: options.audience,
  issuer: options.issuer,
  algorithms: [options.algorithm],
  credentialsRequired: true,
});

function getKey(header, callback) {
  client.getSigningKey(header.kid, function(err, key) {
    if (err) throw new Error;
    const signingKey = key.publicKey || key.rsaPublicKey;
    callback(null, signingKey);
  });
}

const jwtMiddleware = {
  getKey,
  options,
  checkJwt: expressCheckJwt,
};

export default jwtMiddleware;
