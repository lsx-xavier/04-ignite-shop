import { useCallback, useState } from "react";
import { MdOutlineClose } from "react-icons/md";
import { useShoppingCart } from "use-shopping-cart";
import { ProductItem } from "./productItem";
import { CartContainer, CartDetails, CartInfos, CartWrapper, CloseContainer, ListItems } from "./style";
import axios from "axios";

export function Cart() {
  const {
    shouldDisplayCart,
    handleCloseCart,
    cartDetails,
    cartCount,
    formattedTotalPrice,
    redirectToCheckout,
  } = useShoppingCart()
  const [status, setStatus] = useState<'idle' | 'missing-items' | 'redirect-error' | 'redirecting'| 'loading'>('idle')

  const handleRedirectToCheckout = useCallback(async (event: any) => {
    event.preventDefault()

    if (cartCount && cartCount > 0) {
      setStatus('loading')

      try {
        const response = await axios.post('/api/createCheckoutSession', {
          cartDetails: cartDetails
        })
  
        const { sessionId } = response.data;

        const result = await redirectToCheckout(sessionId)

        if (result?.error) {
          console.error(result)
          setStatus('redirect-error')
        }
      } catch (error) {
        console.error(error)
        setStatus('redirect-error')
      }
    } else {
      setStatus('missing-items')
    }
  }, [cartCount, cartDetails, redirectToCheckout])

  console.log(cartCount === 0)


  if(!shouldDisplayCart) return null;

  return (
    <CartContainer>
      <CloseContainer>
        <button
          onClick={handleCloseCart}
          type="button"
        >
          <MdOutlineClose size={20}  />
        </button>
      </CloseContainer>

      <CartWrapper>

        <CartDetails>
          <h1>Sacola de compras</h1>
          <ListItems>
          {cartCount === 0 ? 
              <p>Nenhum item no carrinho</p>
            : 
              Object.entries(cartDetails || {})?.map(([key, cartItem]) => (
                <ProductItem key={key} product={cartItem} />
              ))
          }
          </ListItems>
        </CartDetails>

        <CartInfos>
            <p>Quantidade <span>{cartCount} Itens</span></p>

            <p>Valor total <span>{formattedTotalPrice}</span></p>

            <button
              type="button"
              onClick={handleRedirectToCheckout}
              disabled={cartCount === 0}
            >
              Finalizar compra
            </button>
        </CartInfos>
      </CartWrapper>
    </CartContainer>
  )
}