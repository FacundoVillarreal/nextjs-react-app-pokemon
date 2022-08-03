import { useEffect, useState } from 'react';
import { Layout } from '../../components/layouts'
import { FavoritePokemons } from '../../components/pokemon';
import { NoFavorites } from '../../components/ui';
import { localFavorites } from '../../utils/index'

const FavoritesPage = () => {
    const [listPokemons, setListPokemons] = useState<number[]>([])

    useEffect(() => {
        setListPokemons(localFavorites.pokemons)
    }, [])

    return (
        <Layout title='Favorites'>
            {
                listPokemons.length === 0
                    ? (<NoFavorites />)
                    : (<FavoritePokemons listPokemons={listPokemons} />)
            }
        </Layout>
    )
}

export default FavoritesPage;