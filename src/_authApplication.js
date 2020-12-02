import axios from 'axios';

export default function authenticateApplication(testId, testSecret) {
  const config = {
    method: 'POST',
    url: 'https://dev-r0qdxyeq.us.auth0.com/oauth/token',
    headers: {'content-type': 'application/json'},
    data: {
      grant_type: 'client_credentials',
      client_id: testId,
      client_secret: testSecret,
      audience: 'https://xbotdemo/api',
    },
  };

  axios.request(config)
    .then((response) => {
      const { token_type, access_token } = response.data;
      const authorization = `${token_type} ${access_token}`;
      const config = {
        method: 'GET',
        url: 'http://localhost:4002/private',
        headers: { authorization },
      };
      axios.request(config)
        .then((response) => console.log(response.data.message));
    })
    .catch((error) => {
      console.error(error);
    });

}
