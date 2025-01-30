import { CustomContext } from 'src/graphql/custom-context.interface.js';

export default {
  Query: {
    animals: (_: never, __: never, contextValue: CustomContext) => {
      return contextValue.dataSources.animals.getAnimals();
    },
    animalsAndPokemon: (_: never, __: never, contextValue: CustomContext) => {
      return contextValue.dataSources.animals.getAnimalsAndPokemon();
    },
  },
};
