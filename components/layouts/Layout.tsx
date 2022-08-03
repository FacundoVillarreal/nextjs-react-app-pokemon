import { Container } from '@nextui-org/react';
import Head from 'next/head'
import React, { FC } from 'react'
import { Navbar } from '../ui';

interface Props {
    children: React.ReactNode;
    title?: string;
}

export const Layout: FC<Props> = ({ children, title }) => {
    return (
        <>
            <Head>
                <title>{title || 'PokemonApp'}</title>
                <meta name='autho' content='Facundo Villareal' />
                <meta name='description' content={`Informacion sobre el pokémon ${title}'`} />
                <meta name='keywords' content={`${title}, pokémon, pokedex`} />
                <meta property="og:title" content={`Informacion sobre el pokémon ${title}'`} />
                <meta property="og:description" content={`Esta es la página sobre ${title}'`} />
            </Head>

            <Navbar />
            
            <main>
                <Container xl>
                    {children}
                </Container>
            </main>
        </>
    )
}
