import { FC, useState } from "react"
import { Button, Card, Container } from "@nextui-org/react"
import { useRouter } from "next/router"
import { localFavorites } from "../../utils"

interface Props {
    id: number
}

export const FavoriteCard: FC<Props> = ({ id }) => {
    const [isExistFav, setIsExistFav] = useState<boolean>(localFavorites.existPokemonFav(id))
    const { push } = useRouter()

    const handleClickDetails = () => {
        push(`/pokemon/${id}`)
    }

    const handleClickDelete = () => {
        localFavorites.toggleFavorite(id);
        setIsExistFav(!isExistFav)
    }

    return (
        <>
            {
                isExistFav
                &&
                <Card
                    isHoverable
                    isPressable
                    css={{ padding: 10 }}

                >
                    <Card.Image
                        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${id}.svg`}
                        width={100}
                        height={200}
                    />
                    <Card.Footer>
                        <Container display="flex" direction="column" gap={0}>
                            <Button
                                css={{ marginBottom: 5 }}
                                color='secondary'
                                onClick={handleClickDetails}
                            >
                                Detalles
                            </Button>
                            <Button
                                color='error'
                                onClick={handleClickDelete}
                            >
                                Eliminar
                            </Button>
                        </Container>
                    </Card.Footer>
                </Card>
            }
        </>
    )
}
