import Image from 'next/image'
import { useCallback } from 'react'
import { MdOutlineShoppingCart } from 'react-icons/md'
import { useShoppingCart } from 'use-shopping-cart'
import { ContainerCartHeader, HeaderContainer } from './style'

import logoImg from '@/assets/logo.svg'

export function Header() {
  const { shouldDisplayCart, handleCloseCart, handleCartClick, cartCount } = useShoppingCart()

  const toggleShowCart = useCallback(()=>{
    if(shouldDisplayCart){
      handleCloseCart()
      return;
    }
    handleCartClick()
  },[handleCartClick, handleCloseCart, shouldDisplayCart])
  
  return (
    <HeaderContainer>
      <Image src={logoImg} alt="Logo img" />
      
      <ContainerCartHeader>
        

        <button
          type='button'
          onClick={toggleShowCart}
        >
          <MdOutlineShoppingCart size={20} />

          {cartCount ? <span>{cartCount}</span> : null}
        </button>
      </ContainerCartHeader>
    </HeaderContainer>
  )
}