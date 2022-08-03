import { Spacer, StyledLink, Text, useTheme } from "@nextui-org/react"
import Image from "next/image";
import Link from "next/link";
import { FC } from "react"

export const Navbar: FC = () => {
    const { theme } = useTheme();

    return (
        <div style={{
            display: 'flex',
            width: '100%',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '0 20px',
            backgroundColor: theme?.colors.blue400.value
        }}>
            <Image
                src={"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/132.png"}
                alt="icono de la app"
                width={70}
                height={70}
            />
            
            <Link href="/" passHref>
                <StyledLink>
                    <Text color="white" h2>P</Text>
                    <Text color="white" h3>okemon</Text>
                </StyledLink>
            </Link>

            <Spacer css={{ flex: 1 }} />

            <Link href="/favorites" passHref>
                <StyledLink>
                    <Text h2>F</Text>
                    <Text h3>avoritos</Text>
                </StyledLink>
            </Link>
        </div>
    )
}
