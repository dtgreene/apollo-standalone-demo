import { BaseDataSource } from 'src/data-source/base-data-source.class.js';

export class AnimalsAPI extends BaseDataSource {
  getAnimals() {
    return [
      {
        name: 'dog',
      },
      {
        name: 'cat',
      },
      {
        name: 'moose',
      },
    ];
  }

  async getAnimalsAndPokemon() {
    const pokemon = await this.context.dataSources.pokemon.getPokemon();

    return {
      animals: this.getAnimals(),
      pokemon,
    };
  }
}
