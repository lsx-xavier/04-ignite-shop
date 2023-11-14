import { HomeContainer, Product } from '@/styles/pages/home'
import 'keen-slider/keen-slider.min.css'
import { useKeenSlider } from 'keen-slider/react'
import { GetStaticProps } from 'next'
import { Inter } from 'next/font/google'
import Image from 'next/image'
import { MdOutlineShoppingCart } from "react-icons/md";
import { stripe } from '@/lib/stripe'
import Stripe from 'stripe'
import Head from 'next/head'
import { useShoppingCart } from 'use-shopping-cart'
import { useCallback } from 'react'
import { Cart } from '@/components/cart/cart'

const inter = Inter({ subsets: ['latin'] })


interface HomeProps {
  products: {
    id: string;
    title: string;
    price: string;
    imageUrl: string;
  }[]
}

export default function Home({products}: HomeProps) {
  const { handleCartClick, handleCloseCart, shouldDisplayCart } = useShoppingCart()
  const [sliderRef] = useKeenSlider({
    slides: {
      perView: 3,
      spacing: 48,
      
    }
  })

  const toggleShowCart = useCallback(()=>{
    if(shouldDisplayCart){
      handleCloseCart()
      return;
    }
    handleCartClick()
  },[handleCartClick, handleCloseCart, shouldDisplayCart])

  return (
    <>
      {/* Este head é para o SEO */}
      <Head> 
        {/* Lib Next-SEO */}
        <title>Home | Ignite Shop</title>
      </Head>

    <HomeContainer ref={sliderRef} className='keen-slider'>
      {products.map(product => (

          <Product
            key={product.id}
            href={`/product/${product.id}`}
            className='keen-slider__slide'
            prefetch={false}
          >
            {/* colocar placeholder aqui para estudo na imagem */}
          <Image src={product.imageUrl} width={520} height={480}  alt={`imagem do produto - ${product.title}`} />

          <footer>
            <div>
              <strong>{product.title}</strong>
              <span>{product.price}</span>
            </div>

            <button
              type="button"
              onClick={(e) => {
                e.preventDefault()
                toggleShowCart()
              }}
            >
              <MdOutlineShoppingCart size={20} />
            </button>
          </footer>
        </Product>
      ))}
      
    </HomeContainer>
      <Cart />
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  
  const response = await stripe.products.list({
    expand: ['data.default_price']
  })

  const products = response.data.map(product => {
    const price = product.default_price as Stripe.Price

    return {
      id: product.id,
      title: product.name,
      price: new Intl.NumberFormat('pt-BR', {
        style: 'currency', 
        currency: 'BRL',
      }).format((price.unit_amount || 0) / 100),
      imageUrl: product.images[0]
    }
  });

  return {
    props: {
      products
    },
    revalidate: 60 * 60 * 2, // 2 horas
    // depois de um acesso de um usuario o next vai gerar uma nova versão da página
  }
}
