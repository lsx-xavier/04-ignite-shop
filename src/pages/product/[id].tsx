import { stripe } from "@/lib/stripe"
import { ImageContainer, ProductContainer, ProductDetail } from "@/styles/pages/product"
import axios from "axios"
import { GetStaticPaths, GetStaticProps } from "next"
import Head from "next/head"
import Image from "next/image"
import { useRouter } from "next/router"
import { useCallback, useState } from "react"
import Stripe from "stripe"
import {
  useShoppingCart,
  DebugCart,
  formatCurrencyString
} from 'use-shopping-cart'

interface ProductProps {
  product: {
    id: string;
    name: string;
    description: string;
    price: number;
    imageUrl: string;
    price_id: string;
  }
}


export default function Product({ product }: ProductProps) {
  const {isFallback} = useRouter()
  const {addItem} = useShoppingCart()

  const handleAddProductToCart = useCallback(() => {
    try {
      addItem({
        ...product,
        sku: product.price_id,
        price_id: product.price_id,
        currency: 'BRL',
      })
    } catch (error) {
      alert('Erro ao adicionar o produto ao carrinho')
    }
    
    // try {
    //   setIsCreatingCheckoutSession(true)
    //   const response = await axios.post('/api/createCheckoutSession', {
    //     priceId: product.defaultPriceId
    //   })

    //   const { checkoutUrl }= response.data

    //   window.location.href = checkoutUrl
    // } catch (error) {
    //   setIsCreatingCheckoutSession(false)

    //   // conectar com uma ferramenta de observabilidade (Datadog / Sentry)
    //   alert('Erro ao comprar o produto')

    // }
    
  },[addItem, product])

  if (isFallback) {
    return <p>Carregando...</p>
  }

  return (
    <>
      {/* Este head é para o SEO */}
      <Head> 
        {/* Lib Next-SEO */}
        <title>{product.name} | Ignite Shop</title>
      </Head>


      <ProductContainer>
        <ImageContainer>
          <Image src={product?.imageUrl} width={520} height={480} alt={`imagem do produto - ${product.name}`} />
        </ImageContainer>

        <ProductDetail>
          <h1>{product.name}</h1>
          <span>
            {new Intl.NumberFormat('pt-BR', {
              style: 'currency',
              currency: 'BRL',
            }).format((product.price || 0) / 100)}
        </span>

          <p>{product.description}</p>

          <button onClick={handleAddProductToCart}>Comprar</button>
        </ProductDetail>
      </ProductContainer>
    </>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  // Buscar os produtos mais acessados / vendidos (pois são os mais acessados e assim o usuário ja teria ele mais rápido)

  return {
    paths: [
      {
        params: {
          id: 'prod_OzFBF3kPaCL4hD'
        }
      }
    ],
    fallback: true, // "blocking" -> so renderiza a pagina quando terminar de carregar todos os dados da api
  }
}


export const getStaticProps: GetStaticProps<any, {id: string}> = async ({ params }) => {
  const productId = params?.id  as string;

  const product = await stripe.products.retrieve(productId, {
    expand: ['default_price']
  })

  const price = product.default_price as Stripe.Price


  return {
    props: {
      product: {
        id: product.id,
        name: product.name,
        price: price.unit_amount,
        imageUrl: product.images[0],
        description: product.description,
        price_id: price.id,
      }
    },
    revalidate: 60 * 60 * 1 // 1 hour
  }
}
