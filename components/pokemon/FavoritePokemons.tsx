import { FC } from 'react'
import { Grid } from '@nextui-org/react'
import { FavoriteCard } from './FavoriteCard'

interface Props {
    listPokemons: number[]
}

export const FavoritePokemons: FC<Props> = ({ listPokemons }) => {
    return (
        <Grid.Container gap={2} justify='flex-start'>
            {
                listPokemons.map(id => (
                    <Grid
                        key={id}
                        xs={12}
                        sm={3}
                        md={3}
                        xl={3}
                    >
                        <FavoriteCard key={id} id={id} />
                    </Grid>
                ))
            }
        </Grid.Container>
    )
}
