// ./src/schema/resolverConstructor/_tutorialMutations.js

export default function(input, dataSources) {
  return {
    loginUser: async() => {
      const query = await { atXavierAccount: input.atXavierAccount };
      let response = await dataSources.users.loginUser(query);
      if (!response && !!input.verifiedEmail) {
        response = await dataSources.users.createUser(input.user);
      }
      return {
        loggedInUser: response || null,
        successStatus: response !== false,
      };
    },
  };
}
