// ./src/schema/resolverConstructor/index.js
import tutorialMutation from './_tutorialMutations';
import query from './_queryConstructor';

export default {
  query: {
    tutorials: async(input, dataSource) => {
      const { getTutorials } = query(input, dataSource);
      const { collection, articles } = await getTutorials();
      return { collection, articles: articles() };
    },
  },
  mutation: {
    createOne: async(input, dataSource) => {
      const { create } = await tutorialMutation(input, dataSource);
      return create();
    },
    updateOne: async(input, dataSrc, newValues) => {
      const { update } = await tutorialMutation(input, dataSrc, newValues);
      return update();
    },
    deleteOne: async(input, dataSrc) => {
      const { deleteOne } = await tutorialMutation(input, dataSrc);
      return deleteOne();
    },
    loginUser: async(input, dataSrc) => {
      const query = { atXavierAccount: input.atXavierAccount };
      let response = await dataSrc.users.loginUser(query);
      if (!response && !!input.verifiedEmail) {
        response = await dataSrc.users.createUser(input.user);
      }
      return {
        loggedInUser: response || null,
        successStatus: response !== false,
      };
    },
  },
};
