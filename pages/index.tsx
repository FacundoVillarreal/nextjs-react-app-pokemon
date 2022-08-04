import { GetStaticProps, NextPage } from "next";
import { Grid, Input, Spacer } from "@nextui-org/react";
import { PokemonCard } from "../components/pokemon";
import { pokeApi } from "../api";
import { Layout } from "../components/layouts/index";
import { PokemonListResponse, SmallPokemon } from "../interfaces";
import { ChangeEvent, ChangeEventHandler, useState } from "react";

interface Props {
  pokemons: SmallPokemon[];
}

const HomePage: NextPage<Props> = ({ pokemons }) => {

  const [pokeSearch, setPokeSearch] = useState('');

  const handlePokeChange = ({ target: { value } }: any) => {
    setPokeSearch(value)
  }

  return (
    <Layout title="Listado de Pokémons">
      <Grid.Container justify="center" css={{ width: '100%' }}>
        <Spacer y={4} />
        <Input
          size="xl"
          placeholder="Búsqueda"
          onChange={handlePokeChange}
          value={pokeSearch}
          clearable
        />
      </Grid.Container>
      <Grid.Container gap={2} justify="center">
        {
          pokemons.map(({ id, name, img }) => {
            if (name.includes(pokeSearch.trim())) {
              return (
                <Grid xs={12} sm={3} md={2} xl={1} key={id}>
                  <PokemonCard key={id} id={id} name={name} img={img} />
                </Grid>
              )
            }
          })
        }
      </Grid.Container>
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async (ctx) => {
  const { get } = pokeApi;
  const { data } = await get<PokemonListResponse>('/pokemon?limit=151');
  const pokemons: SmallPokemon[] = data.results.map((poke, i) => ({
    ...poke,
    id: i + 1,
    img: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${i + 1}.svg`
  }))

  return {
    props: {
      pokemons: pokemons
    }
  }
}

export default HomePage;