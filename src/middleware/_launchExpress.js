import express from 'express';
import jwtMiddleware from './_jwtMiddleware';

const { checkJwt } = jwtMiddleware;

export default function launchExpress(port) {
  let status = null;
  try {
    const app = express();
    app.use((checkJwt).unless({ path: ['/graphql', '/public_test' ] }));
    app.get('/private_test', function(req, res) {
      res.json({
        user: req.user.sub,
        message: 'in a private endpoint',
      });
    });
    app.get('/public_test', function(req, res) {
      res.json({
        message: 'public_test responds ok',
      });
    });
    status = app;
  } catch (error) {
    console.error(error);
  } finally {
    return status;
  }
}
