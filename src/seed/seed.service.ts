import { Injectable } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';
import { PokeResponse } from './interfaces/poke-response.interface.';
import { InjectModel } from '@nestjs/mongoose';
import { Pokemon } from 'src/pokemon/entities/pokemon.entity';
import { Model } from 'mongoose';
import { AxiosAdapter } from 'src/common/adapters/axios.adapter';

@Injectable()
export class SeedService {

  constructor(
    @InjectModel( Pokemon.name )
    private readonly PokemonModel: Model<Pokemon>,

    private readonly http: AxiosAdapter,
  ) {}
  
  // private readonly axios: AxiosInstance = axios;


  async excecuteSeed() {

    await this.PokemonModel.deleteMany({}) // dleete * from Pokemons
    const data = await this.http.get<PokeResponse>('https://pokeapi.co/api/v2/pokemon?limit=650')

    const pokemonToInsert: { name: string, no: number}[] = [];

    data.results.forEach( async ({ name, url }) => {
      const segments = url.split('/')
      const no: number = +segments[ segments.length - 2 ]

      pokemonToInsert.push({name, no})
      // const pokemon = await this.PokemonModel.create( {name, no} );
    })

    await this.PokemonModel.insertMany( pokemonToInsert )

    return 'Seed executed'
  }
}
