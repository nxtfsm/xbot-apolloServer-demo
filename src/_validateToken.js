import jwt from 'jsonWebToken';
import jwksRsa from 'jwks-rsa';

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

function getKey(header, callback) {
  client.getSigningKey(header.kid, function(err, key) {
    if (err) throw new Error;
    const signingKey = key.publicKey || key.rsaPublicKey;
    callback(null, signingKey);
  });
}

export default function validateToken(request) {
  return new Promise((resolve, reject) => {
    if (!request.headers.authorization) resolve(false);

    const header = request.headers.authorization;
    const token = header.split(' ')[1];
    jwt.verify(token, getKey, options, (err, decoded) => {

      if (err) return reject(err);

      const { sub, permissions } = decoded;
      const authorize = {
        atXavierAccount: sub.slice(sub.indexOf('|') + 1) || sub,
        level: permissions.includes('write:any') ? 'super' : 'user',
        permissions: permissions,
      };

      resolve(authorize);
    });
  });
};
