// ./src/schema/resolverConstructor/_userMutations.js

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
    updateUser: async() => {
      const query = { atXavierAccount: input.atXavierAccount };
      const update = {$set: { firstName: input.firstName } };
      const response = await collection.updateUser(query, update);
      return {
        successStatus: !!response,
        message: response
          ? `User ${response._id} updated`
          : 'user update error',
        updatedUser: response || null,
      };
    },
  };
}
