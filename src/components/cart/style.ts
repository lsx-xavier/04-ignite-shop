import { styled } from "@/styles";


export const CartContainer = styled("main", {
  position: "absolute",
  top: 0,
  right: 0,
  height: "100vh",
  width: "100%",
  maxWidth: "30rem",
  background: "$gray800",
  overflow: "hidden",
  padding: "1.5rem 3rem 3rem"
})

export const CloseContainer= styled("div", {
  display: "flex",
  width: "100%",
  justifyContent: "flex-end",
  alignItems: "center",
  
  button: {
    background:  "transparent",
    cursor: "pointer",
    border: 0,
    color: "$gray300",
    
    '&:hover': {
      color: "$gray100"
    }
  }
})

export const CartDetails = styled("div", {
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  gap: "1.98rem",
  maxHeight: "100%",
  height: "calc(100% - 12vw)",

  h1: {
    color: "$white",
    fontSize: "$lg",
    lineHeight: "2rem",
  }
})

export const ListItems = styled("div", {
  display: "flex",
  flexDirection: "column",
  gap: "1.98rem",
  overflowY: "auto",
  flex: 1,
})

export const CartWrapper = styled("div", {
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  height: "100%"
})

export const ProductContainer = styled("div", {
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "flex-start",
  gap: "1.25rem",
})

export const ProductImage = styled("div", {
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  background: "linear-gradient(180deg, #1ea483 0%, #7465d4 100%)",
  borderRadius: 8,

  img: {
    objectFit: "cover",
  }

})

export const ProductDetail = styled("div", {
  flex: 1,
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",

  h1: {
    fontSize: "$md",
    color: "$gray300",
  },

  p: {
    fontSize: "0.8rem",
    color: "$gray300",
    fontWeight: "bold",
    marginTop: "0.12rem",

    span: {
      fontSize: "inherit",
    }
  },

  span: {
    fontSize: "$md",
    color: "$green100",
    fontWeight: "bold",
    marginTop: "0.12rem"
  },

  button: {
    marginTop: "0.5rem",
    fontSize: "1rem",
    fontWeight: "bold",
    color: "$green500",
    background: "transparent",
    border: 0,
    textAlign: "left",
    display: "flex",
    cursor: "pointer",

    '&:hover': {
      color: "$green300"
    }
  }
})

export const QuantityContainer = styled("div", {
  display: "flex",
  gap: "0.5rem",
  alignItems: "center",
  marginTop: "0.5rem",
  paddingRight: "0.1rem",

  button: {
    marginTop: "0rem",

    '&:hover': {
      color: "$green300"
    }
  },

  input: {
    background: "transparent",
    border: 0,
    color: "$white",
    fontSize: "$md",
    flex: 1
  }
})

export const CartInfos = styled("div", {
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  gap: "1rem",

  p: {
    display: "flex",
    justifyContent: "space-between",
    color: "$gray300",
    fontSize: "1rem",
    lineHeight: "1.5rem",

    '&:nth-child(2)': {
      color: "$green100",
      fontSize: "$lg",
      fontWeight: "bold",
    }
  },

  button: {
    marginTop: "3.44rem",
    background: "$green500",
    fontSize: "$lg",
    fontWeight: "bold",
    color: "$white",
    border: 0,
    borderRadius: 8,
    padding: "1.25rem 2rem  ",
    cursor: "pointer",

    '&:hover': {
      background: "$green300",
    }
  }
})