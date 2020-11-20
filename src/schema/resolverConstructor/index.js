// ./src/schema/resolverConstructor/index.js
import tutorialMutation from './_tutorialMutations';
import userMutation from './_userMutations';
import query from './_queryConstructor';

export default {
  collection: (input, dataSources) => {
    const key = input.internalOrigin
      ? 'internalArticles'
      : 'externalArticles';
    return { key, collection: dataSources[key] };
  },
  query: {
    tutorials: (input, collection) => {
      const { getTutorials } = query(input, collection);
      return getTutorials();
    },
  },
  mutation: {
    createOne: (input, collection) => {
      const { create } = tutorialMutation(input, collection);
      return create();
    },
    updateOne: (input, collection, newValues) => {
      const { update } = tutorialMutation(input, collection, newValues);
      return update();
    },
    deleteOne: (input, collection) => {
      const { deleteOne } = tutorialMutation(input, collection);
      return deleteOne();
    },
    loginUser: (input, collection) => {
      const { loginUser } = userMutation(input, collection);
      return loginUser();
    },
  },
};
