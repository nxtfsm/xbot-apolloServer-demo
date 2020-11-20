// ./src/schema/resolverConstructor/_tutorialMutations.js
export default function(input, collection) {
  return {
    loginUser: async() => {
      if (!input.verifiedEmail) return {
        successStatus: false,
        loggedInUser: null,
      };

      const query = { atXavierAccount: input.atXavierAccount };
      let response = await collection.loginUser(query);
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
