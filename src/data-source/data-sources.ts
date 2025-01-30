import { AnimalsAPI } from 'src/animals/animals.api.js';
import { PokemonAPI } from 'src/pokemon/pokemon.api.js';

export interface DataSources {
  pokemon: PokemonAPI;
  animals: AnimalsAPI;
}

export const createDataSources = (): DataSources => {
  return { pokemon: new PokemonAPI(), animals: new AnimalsAPI() };
};
