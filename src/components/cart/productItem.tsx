import Image from "next/image"
import { MdOutlineAdd, MdOutlineRemove } from "react-icons/md"
import { formatCurrencyString, useShoppingCart } from "use-shopping-cart"
import { CartEntry } from "use-shopping-cart/core"
import { ProductContainer, ProductDetail, ProductImage, QuantityContainer } from "./style"

type ProductItemProps = {
  product: CartEntry
}

export function ProductItem({ product }: ProductItemProps) {
  const { removeItem, incrementItem, decrementItem, setItemQuantity } = useShoppingCart()
  
  return (
    <ProductContainer>
      <ProductImage>
        <Image src={product.imageUrl as string} width={110} height={120} alt={`Imagem do produto - ${product.name}`} />
      </ProductImage>

      <ProductDetail>
        <h1>{product.name}</h1>

        <span>
          {formatCurrencyString({
            currency: product.currency,
            value: product.price,
            language: 'pt-BR'
          })}
        </span>

        <QuantityContainer>
          <div>
            <button
              type="button"
              onClick={() => incrementItem(product.id)}
            >
              <MdOutlineAdd size={20} />
            </button>

            <button
              type="button"
              onClick={() => decrementItem(product.id)}
            >
              <MdOutlineRemove size={20} />
            </button>
          </div>

          <input type="number" value={product.quantity} onChange={(e) => {
            setItemQuantity(product.id, Number(e.target.value))
          }} />
        </QuantityContainer>

        <button
          type="button"
          onClick={() => removeItem(product.id)}
        >
          Remover
        </button>
      </ProductDetail>
    </ProductContainer>
  )
}