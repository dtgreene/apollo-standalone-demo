import { BaseDataSource } from 'src/data-source/base-data-source.class.js';

export class PokemonAPI extends BaseDataSource {
  baseURL = 'https://pokeapi.co';

  async getPokemon() {
    const { results } = await this.get('/api/v2/pokemon');

    return results;
  }
}
