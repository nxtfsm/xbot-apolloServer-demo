// ./src/schema/resolverConstructor/index.js
import mutation from './_mutationConstructor';
import query from './_queryConstructor';

export default {
  query: {
    tutorials: async(input, dataSource) => {
      const { getTutorials } = query(input, dataSource);
      const { collection, articles } = await getTutorials();
      return { collection, articles: articles() };
    },
    activeUser: async(input, dataSource) => {
      const { findOrCreateUser } = query(input, dataSource);
      return { updatedUser: await findOrCreateUser() };
    },
  },
  mutation: {
    createOne: async(input, dataSource) => {
      const { create } = await mutation(input, dataSource);
      return create();
    },
    updateOne: async(input, dataSrc, newValues) => {
      const { update } = await mutation(input, dataSrc, newValues);
      return update();
    },
    deleteOne: async(input, dataSrc) => {
      const { deleteOne } = await mutation(input, dataSrc);
      return deleteOne();
    },
    loginUser: async(input, dataSrc) => {
      const query = { atXavierAccount: input.atXavierAccount };
      const response = await dataSrc.users.loginUser(query);
      return {
        loggedInUser: response || null,
        successStatus: response !== false,
      };
    },
  },
};
