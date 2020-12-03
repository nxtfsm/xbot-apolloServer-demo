import express from 'express';
import checkJwt from './_checkJwt';

export default function launchExpress(port) {
  let status = null;
  try {
    const app = express();
    app.use((checkJwt).unless({ path: ['/graphql' ] }));
    app.get('/private', checkJwt, function(req, res) {
      res.json({
        user: req.user.sub,
        message: 'in a private endpoint',
      });
    });
    status = app;
  } catch (error) {
    console.error(error);
  } finally {
    return status;
  }
}
