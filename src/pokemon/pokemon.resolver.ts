import { CustomContext } from 'src/graphql/custom-context.interface.js';

export default {
  Query: {
    pokemon: (_: never, __: never, contextValue: CustomContext) => {
      return contextValue.dataSources.pokemon.getPokemon();
    },
  },
};
