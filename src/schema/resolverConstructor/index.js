// ./src/schema/resolvers/index.js
import mutation from './_mutationConstructor';
import {
  queryTutorialsConstructor,
  queryActiveUserConstructor,
} from './_queryConstructor';


export default {
  query: {
    tutorials: (inp, dataSrc) => queryTutorialsConstructor(inp, dataSrc),
    activeUser: (inp, dataSrc) => queryActiveUserConstructor(inp, dataSrc),
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
  },
};
