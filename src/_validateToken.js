import jwt from 'jsonWebToken';
const jwksClient = require('jwks-rsa');

const client = jwksClient({
  cache: true,
  cacheMaxEntries: 5,
  cacheMaxAge: 600000,
  rateLimit: true,
  jwksRequestsPerMinute: 5,
  jwksUri: 'https://dev-r0qdxyeq.us.auth0.com/.well-known/jwks.json',
});

function getKey(header, callback) {
  client.getSigningKey(header.kid, function(err, key) {
    if (err) throw new Error;
    const signingKey = key.publicKey || key.rsaPublicKey;
    callback(null, signingKey);
  });
}

export default function validateToken(request) {
  const authorize = { level: 'public' };
  try {
    if (request.headers.authorization) {
      const header = request.headers.authorization;
      const token = header.split(' ')[1];
      const options = { algorithm: 'RS256' };

      jwt.verify(token, getKey, options, (err, {sub, permissions}) => {
        if (err) throw new Error;
        authorize.atXavierAccount = sub.slice(sub.indexOf('|') + 1) || sub;
        authorize.permissions = permissions;
      });
    }
  } catch (error) {
    console.error(error);
  } finally {
    return authorize;
  }
}
