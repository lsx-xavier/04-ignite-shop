import type { AppProps } from 'next/app'
import { Container } from '@/styles/pages/app'
import { globalStyles } from '@/styles/global'
import Image from 'next/image'
import logoImg from '@/assets/logo.svg'
import imgTest from '@/assets/lucasx.jpg'
import { CartProvider, useShoppingCart } from 'use-shopping-cart'
import { GetStaticProps } from 'next'
import { useCallback } from 'react'
import { MdOutlineShoppingCart } from 'react-icons/md'
import { Header } from '@/components/header'

globalStyles()


export default function App({ Component, pageProps }: AppProps) {


  return (
    <CartProvider
      cartMode="checkout-session"
      currency="BRL"
      stripe={process.env.NEXT_PUBLIC_STRIPE_KEY!}
      shouldPersist={true}
      persistKey='cart-provider'
    >
      <Container>
        <Header />

        <Component {...pageProps} />
      </Container>
    </CartProvider>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const publicStripeKey = process.env.STRIPE_PUBLIC_KEY

  return {
    props: {
      publicStripeKey
    },
  }
}