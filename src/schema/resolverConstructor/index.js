// ./src/schema/resolverConstructor/index.js
import tutorialMutation from './_tutorialMutations';
import userMutation from './_userMutations';
import query from './_queryConstructor';

export default {
  setCollection: (inputOrigin) => {
    return inputOrigin ? 'internalArticles' : 'externalArticles';
  },
  query: {
    tutorials: async(input, collection) => {
      const { getTutorials } = query(input, collection);
      const { articles } = await getTutorials();
      return articles();
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
    loginUser: async(input, collection) => {
      const { loginUser } = await userMutation(input, collection);
      return loginUser();
    },
  },
};
