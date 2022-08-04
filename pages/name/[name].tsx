import { useState } from "react";
import { GetStaticPaths, GetStaticProps, NextPage } from "next"
import { Button, Card, Container, Grid, Image, Text } from "@nextui-org/react";
import { pokeApi } from "../../api";
import { Layout } from "../../components/layouts";
import { Pokemon, PokemonListResponse } from "../../interfaces";
import { getPokemonInfo, localFavorites } from "../../utils";

interface Props {
    pokemon: Pokemon
}
interface PropsFav {
    name: string,
    url: string,
    id: number
}

const PokemonByNamePage: NextPage<Props> = ({ pokemon }) => {
    const [isInFavorites, setIsInFavorites] = useState(localFavorites.existPokemonFav(pokemon.id))
    const onToggleFavorite = () => {

        const pokeFav: PropsFav = {
            name: pokemon.name,
            url: pokemon.sprites.other?.dream_world.front_default || '/no-image.png',
            id: pokemon.id
        }
        localFavorites.toggleFavorite(pokemon.id);
        setIsInFavorites(!isInFavorites)
    }

    return (
        <Layout title={pokemon.name} >
            <Grid.Container css={{ marginTop: '5px' }} gap={2}>
                <Grid xs={12} sm={6}>
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

                <Grid xs={12} sm={6}>
                    <Card>
                        <Card.Body>
                            <Text size={30}>Sprites:</Text>

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
            </Grid.Container>
        </Layout>
    )
}


export const getStaticPaths: GetStaticPaths = async (ctx) => {
    const { data: { results } } = await pokeApi.get<PokemonListResponse>('/pokemon?limit=151');

    return {
        paths: results.map(({ name }) => ({
            params: { name }
        })),
        fallback: 'blocking',
    }
}


export const getStaticProps: GetStaticProps = async ({ params }) => {
    const { name } = params as { name: string }

    const pokemon = await getPokemonInfo(name.toLowerCase())

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
            pokemon
        }
    }
}

export default PokemonByNamePage
