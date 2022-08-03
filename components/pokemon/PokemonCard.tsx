import { FC } from "react"
import { useRouter } from "next/router"
import { Card, Row, Text } from "@nextui-org/react"
import { SmallPokemon } from "../../interfaces"

export const PokemonCard: FC<SmallPokemon> = ({ id, img, name }) => {
    const router = useRouter();

    const onClick = () => {
        router.push(`/name/${name}`)
    }

    return (
        <Card isHoverable isPressable onClick={onClick}>
            <Card.Body css={{ p: 1 }}>
                <Card.Image src={img} width="100%" height={140} />
            </Card.Body>
            <Card.Footer>
                <Row justify="space-between">
                    <Text transform="capitalize">
                        {name}
                    </Text>
                    <Text>
                        #{id}
                    </Text>
                </Row>
            </Card.Footer>
        </Card>
    )
}
