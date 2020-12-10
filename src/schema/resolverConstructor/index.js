// ./src/schema/resolverConstructor/index.js
import codePenMutation from './_codePenMutations';
import permit from './_permissionChecks';
import query from './_queryConstructor';
import tutorialMutation from './_tutorialMutations';
import userMutation from './_userMutations';

const mutations = {
  codePens: codePenMutation,
  internalTutorials: tutorialMutation,
  externalTutorials: tutorialMutation,
};

export default {
  query: {
    tutorials(input, collection) {
      const queryInput = { ...input, query: input.articleQuery || {} };
      const { getTutorials } = query(queryInput, collection);
      return getTutorials();
    },
    codePens(input, collection) {
      const queryInput = { ...input, query: input.codePenQuery || {} };
      const { getCodePens } = query(queryInput, collection);
      return getCodePens();
    },
  },
  mutation: {
    createOne(input, collection) {
      const mutation = mutations[input.collectionName];
      const { create } = mutation(input, collection);
      return create();
    },
    updateOne(input, collection, newValues) {
      const mutation = mutations[input.collectionName];
      const { update } = mutation(input, collection, newValues);
      return update();
    },
    deleteOne(input, collection) {
      const mutation = mutations[input.collectionName];
      const { deleteOne } = mutation(input, collection);
      return deleteOne();
    },
    loginUser(input, collection) {
      const { authorization } = collection.context;
      if (permit.queryLogin(authorization)) {
        const { loginUser } = userMutation(input, collection);
        return loginUser();
      }
    },
    updateUser(input, collection) {
      const { atXavierAccount } = input;
      const { authorization } = collection.context;
      if (permit.updateProfile(authorization, atXavierAccount)) {
        const { updateUser } = userMutation(input, collection);
        return updateUser();
      }
    },
  },
};
