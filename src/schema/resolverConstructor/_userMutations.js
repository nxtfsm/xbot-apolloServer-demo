// ./src/schema/resolverConstructor/_userMutations.js
import inputReducer from './_inputReducer';

export default function(input, collection) {
  const args = inputReducer(input);

  return {
    async loginUser() {
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
    async updateUser() {
      const query = { atXavierAccount: input.atXavierAccount };
      const update = { $set: { ...args } };
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
