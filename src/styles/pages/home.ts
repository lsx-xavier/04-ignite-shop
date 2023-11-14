import {styled } from "..";
import Link from 'next/link'

export const HomeContainer = styled("main", {
  display: "flex",
  width: "100%",
  maxWidth: "calc(100vw - ((100vw - 1180px) / 2))",
  marginLeft: "auto",
  minHeight: 656
})

export const Product = styled(Link, {
  background: "linear-gradient(180deg, #1ea483 0%, #7465d4 100%)",
  borderRadius: 8,
  cursor: "pointer",
  position: "relative",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  overflow: "hidden",

  img: {
    objectFit: "cover",
  },

  footer: {
    position: "absolute",
    bottom: "0.25rem",
    left: "0.25rem",
    right: "0.25rem",
    borderRadius: 6,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    background: 'rgba(0, 0, 0, 0.6)',
    padding: "2rem",
    transform: "translateY(110%)",
    opacity: 0,
    transition: "all 0.2s ease-in-out",
    gap: "0.75rem",
    
    "div:first-of-type": {
      display: "flex",
      flexDirection: "column",
      
      strong: {
        fontSize: "$lg",
        color: '$gray100',	
      },
      
      span: {
        fontSize: "$xl",
        fontWeight: 'bold',
        color: '$green300',
      }
    },
    
    button: {
      padding: "0.75rem",
      backgroundColor: '$green500',
      outline: "1px solid inherit",
      border: 0,
      borderRadius: 8,
      color: '$white',
      cursor: "pointer",

      '&:hover': {
        backgroundColor: '$green300',
      }
    }
  },

  "&:hover": {
    footer: {
      transform: "translateY(0)",
      opacity: 1,
    }
  }
})
