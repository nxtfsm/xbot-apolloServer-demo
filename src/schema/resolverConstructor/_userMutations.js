// ./src/schema/resolverConstructor/_tutorialMutations.js
export default function(input, collection) {
  return {
    loginUser: async() => {
      if (!input.verifiedEmail) return {
        successStatus: false,
        loggedInUser: null,
      };

      const query = { atXavierAccount: input.atXavierAccount };
      const update = {$set: { lastLogin: input.user.lastLogin } };
      let response = await collection.loginUser(query, update);
      if (!response) {
        response = await collection.createUser(input.user);
      }

      return {
        loggedInUser: response || null,
        successStatus: response !== false,
      };
    },
  };
}
