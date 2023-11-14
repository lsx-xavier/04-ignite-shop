import { stripe } from "@/lib/stripe";
import { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";
import { CartDetails } from "use-shopping-cart/core";
import { LineItem, formatLineItems, validateCartItems } from "use-shopping-cart/utilities";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if(req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed.'})
  }
  
  const { cartDetails } = req.body;

  if(!cartDetails) {
    return res.status(400).json({ error: "Missing priceId" })
  }

  const responseProducts = await stripe.products.list({
    expand: ['data.default_price']
  })

  const products = responseProducts.data.map(product => {
    const price = product.default_price as Stripe.Price

    return {
      id: product.id,
      name: product.name,
      price: price.unit_amount || 0,
      imageUrl: product.images[0],
      sku: product.id,
      currency: 'BRL',
    }
  });

  const success_url = `${process.env.NEXT_URL}/success?session_id={CHECKOUT_SESSION_ID}`
  const cancel_url = `${process.env.NEXT_URL}/`

  const checkoutSession = await stripe.checkout.sessions.create({
    success_url: success_url,
    cancel_url: cancel_url,
    mode: "payment",
    payment_method_types: ["card"],
    line_items: Object.entries(cartDetails as CartDetails).map(([_, value]) => ({
       price: value.price_id,
       quantity: value.quantity,
    }))
  })


  return res.status(200).json({ checkoutUrl: checkoutSession.url, sessionId: checkoutSession.id })
}