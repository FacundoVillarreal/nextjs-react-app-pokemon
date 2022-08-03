import { GetStaticProps, NextPage } from "next";
import { Grid } from "@nextui-org/react";
import { PokemonCard } from "../components/pokemon";
import { pokeApi } from "../api";
import { Layout } from "../components/layouts/index";
import { PokemonListResponse, SmallPokemon } from "../interfaces";

interface Props {
  pokemons: SmallPokemon[];
}

const HomePage: NextPage<Props> = ({ pokemons }) => {
  return (
    <Layout title="Listado de Pokémons">
      <Grid.Container gap={2} justify="center">
        {
          pokemons.map(({ id, name, img, url }) => (
            <Grid xs={12} sm={3} md={2} xl={1} key={id}>
              <PokemonCard key={id} id={id} name={name} img={img} />
            </Grid>
          ))
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