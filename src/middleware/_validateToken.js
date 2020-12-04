import jwt from 'jsonWebToken';
import jwtMiddleware from './_jwtMiddleware';

const { options, getKey } = jwtMiddleware;

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
