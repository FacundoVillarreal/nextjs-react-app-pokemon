import { useState } from 'react';
import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { Button, Card, Container, Grid, Image, Text } from '@nextui-org/react';

import { Layout } from '../../components/layouts'
import { Pokemon } from '../../interfaces';
import { getPokemonInfo, localFavorites } from '../../utils';

interface Props {
  pokemon: Pokemon
}

const PokemonPage: NextPage<Props> = ({ pokemon }) => {
  const [isInFavorites, setIsInFavorites] = useState(localFavorites.existPokemonFav(pokemon.id));

  const onToggleFavorite = () => {
    localFavorites.toggleFavorite(pokemon.id);
    setIsInFavorites(!isInFavorites)
  }

  return (
    <Layout title={pokemon.name} >
      <Grid.Container css={{ marginTop: '5px' }} gap={2}>
        <Grid xs={12} sm={4} md={4}>
          <Card isHoverable css={{ padding: '30px' }}>

            <Card.Header css={{ display: 'flex', justifyContent: "space-between" }}>
              <Text h1 transform='capitalize'>{pokemon.name}</Text>
            </Card.Header>

            <Card.Body>
              <Card.Image
                src={pokemon.sprites.other?.dream_world.front_default || '/no-image.png'}
                alt={pokemon.name}
                width={'90%'}
                height={200}
              />
            </Card.Body>

            <Card.Footer>
              <Button color="gradient" ghost={!isInFavorites} onClick={onToggleFavorite} auto>
                {isInFavorites ? 'Eliminar de favorito' : 'Agregar a favorito'}
              </Button>
            </Card.Footer>

          </Card>
        </Grid>

        <Grid xs={12} sm={4} md={4}>
          <Card>

            <Card.Body>
              <Text
                size={30}
                css={{
                  textGradient: "45deg, $yellow600 -20%, $red600 100%"
                }}
                weight={"bold"}
              >
                Sprites
              </Text>

              <Container direction='row' display='flex'>
                <Image
                  src={pokemon.sprites.front_default}
                  alt={pokemon.name}
                  width={100}
                  height={100}
                />
                <Image
                  src={pokemon.sprites.back_default}
                  alt={pokemon.name}
                  width={100}
                  height={100}
                />
                <Image
                  src={pokemon.sprites.front_shiny}
                  alt={pokemon.name}
                  width={100}
                  height={100}
                />
                <Image
                  src={pokemon.sprites.back_shiny}
                  alt={pokemon.name}
                  width={100}
                  height={100}
                />
              </Container>
            </Card.Body>

          </Card>
        </Grid>


        <Grid xs={12} sm={4} md={4}>
          <Card>

            <Card.Body>
              <Text
                size={30}
                css={{
                  textGradient: "45deg, $purple600 -20%, $pink600 100%"
                }}
                weight={"bold"}
              >
                Habilidades
              </Text>
              <Container css={{ padding: 0 }}>
                {
                  pokemon.abilities.map(({ ability: { name } }) => {
                    console.log(name)
                    return <Text key={name} size={20} transform='capitalize' weight='semibold'>#{name}</Text>
                  }
                  )
                }
              </Container>

            </Card.Body>
          </Card>
        </Grid>
      </Grid.Container>
    </Layout>
  )
}

export const getStaticPaths: GetStaticPaths = (ctx) => {
  const params150 = [...Array(150)].map((item, index) => `${index + 1}`)

  return {
    paths: params150.map(id => ({
      params: { id }
    })),
    fallback: 'blocking',
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { id } = params as { id: string }

  const pokemon = await getPokemonInfo(id);

  if (!pokemon) {
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    }
  }

  return {
    props: {
      pokemon: pokemon
    },
    revalidate: 86400
  }
}

export default PokemonPage