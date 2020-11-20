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
    createOne: async(input, collection) => {
      const { create } = await tutorialMutation(input, collection);
      return create();
    },
    updateOne: async(input, collection, newValues) => {
      const { update } = await tutorialMutation(input, collection, newValues);
      return update();
    },
    deleteOne: async(input, collection) => {
      const { deleteOne } = await tutorialMutation(input, collection);
      return deleteOne();
    },
    loginUser: async(input, collection) => {
      const { loginUser } = await userMutation(input, collection);
      return loginUser();
    },
  },
};
