// ./src/schema/resolverConstructor/index.js
import tutorialMutation from './_tutorialMutations';
import userMutation from './_userMutations';
import query from './_queryConstructor';

export default {
  query: {
    tutorials: async(input, dataSources) => {
      const { getTutorials } = query(input, dataSources);
      const { collection, articles } = await getTutorials();
      return { collection, articles: articles() };
    },
  },
  mutation: {
    createOne: async(input, dataSources) => {
      const { create } = await tutorialMutation(input, dataSources);
      return create();
    },
    updateOne: async(input, dataSources, newValues) => {
      const { update } = await tutorialMutation(input, dataSources, newValues);
      return update();
    },
    deleteOne: async(input, dataSources) => {
      const { deleteOne } = await tutorialMutation(input, dataSources);
      return deleteOne();
    },
    loginUser: async(input, dataSources) => {
      /* const query = { atXavierAccount: input.atXavierAccount };
      let response = await dataSrc.users.loginUser(query);
      if (!response && !!input.verifiedEmail) {
        response = await dataSrc.users.createUser(input.user)
      }
      return {
        loggedInUser: response ? response : null,
        successStatus: response !== false
      }*/
      const { loginUser } = await userMutation(input, dataSources);
      return loginUser();
    },
  },
};
