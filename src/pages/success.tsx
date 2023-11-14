import { stripe } from "@/lib/stripe";
import { SuccessContainer, ImageContainer, ImagesContainer } from "@/styles/pages/success";
import { GetServerSideProps } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import Stripe from "stripe";

interface SuccessProps {
  checkoutSession: {
    customerName: string,
    products: {
      name: string,
      quantity: number;
      imageUrl: string,
    }[]
  }
}

export default function Success({ checkoutSession }: SuccessProps) {
  console.log(checkoutSession.products.map(item => item.quantity).reduce((a,b) => a + b))
  return (
    <>
      {/* Este head é para o SEO */}
      <Head> 
        {/* Lib Next-SEO */}
        <title>Compra efetuada | Ignite Shop</title>

        <meta name="robots" content="noindex" /> {/* para o google ñ indexar esta pagina */}
      </Head>

      <SuccessContainer>

        <ImagesContainer>
          {checkoutSession.products.slice(0,4).map(product => (
            <ImageContainer key={product.name}>
              <Image  src={product.imageUrl} width={120} height={110} alt={`imagem do produto - ${product.name}`} />
            </ImageContainer>
          ))}
        </ImagesContainer>

        <h1>Compra efetuada!</h1>

        <p>
          Uhuul <strong>{checkoutSession.customerName}</strong>, sua compra de {checkoutSession.products.map(item => item.quantity).reduce((a,b) => a + b)} camisetas já está a caminho da sua casa.
        </p>

        <Link href="/">
          Voltar ao catálogo
        </Link>
      </SuccessContainer>
    </>
  )
}

// Client-side (useEffect) / getServerSideProps / getStaticPaths

// getStaticPaths -> (seria uma versão estatica, como o nome diz)
  // neste caso ñ vai servir pois é uma pagina dinamica que precisa de dados do checkout session de cada user

// Client-side (useEffect) -> por aqui, vamos ter que pensar uma tela de loading, problema maior a API do stripe ñ permite
  // request por client-side por conta da api Secret

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  if(!query.session_id) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      }
    }
  }
  
  const sessionId = String(query.session_id);
  
  const session = await stripe.checkout.sessions.retrieve(sessionId, {
    expand: ['line_items', 'line_items.data.price.product']
  });
  
  const customerName = session.customer_details?.name;
  const products = session.line_items?.data as Stripe.LineItem[] | undefined;
  console.log(products)
  
  return {
    props: {
      checkoutSession: {
        customerName,
        products: products?.map(product => ({
          name: (product.price?.product as Stripe.Product).name,
          quantity: product.quantity,
          imageUrl: (product.price?.product as Stripe.Product).images[0],
        }))
      }
    }
  }

}