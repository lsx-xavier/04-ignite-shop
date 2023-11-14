import { styled } from ".."

export const SuccessContainer = styled('main', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  margin: '0 auto',
  height: 656,

  h1: {
    color: "$gray100",
    fontSize: "$2xl",
  },

  p: {
    color: "$gray300",
    fontSize: "$xl",
    maxWidth: 560,
    textAlign: "center",
    marginTop: "2rem",
    lineHeight: 1.4
  },

  a: {
    marginTop: "5rem",
    display: "block",
    color: "$green500",
    fontSize: "$lg",
    textDecoration: "none",
    fontWeight: 'bold',

    "&:hover": {
      color: "$green300",
    }
  },
})

export const ImagesContainer = styled('div', {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  marginBottom: "4rem",
})

export const ImageContainer = styled('div', {
  Width: "8.14rem",
  height: "8.13rem",
  background: "linear-gradient(180deg, #1ea483 0%, #7465d4 100%)",
  borderRadius: "100%",
  padding: "0.25rem",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  boxShadow: "0px 0px 60px 0px rgba(0, 0, 0, 0.80)",

  '& + &': {
    marginLeft: "-3.25rem",
  },

  img: {
    objectFit: "cover"
  }
})