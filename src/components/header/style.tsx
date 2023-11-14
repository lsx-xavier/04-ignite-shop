import { styled } from "@/styles"

export const HeaderContainer = styled("header", {
  padding:  "2rem 0",
  width: "100%",
  maxWidth: 1180,
  margin: "0 auto",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
})

export const ContainerCartHeader = styled("div", {
  display: "flex",
  alignItems: "center",

  button: {
    background: "$gray800",
    border: "none",
    color: "$white",
    padding: "0.75rem",
    borderRadius: "0.375rem",
    cursor: "pointer",
    transition: "filter 0.2s ease-in-out",
    position: "relative",

    "&:hover": {
      filter: "brightness(0.7)"
    },

    span: {
      position: "absolute",
      top: "-0.8rem",
      right: "-0.8rem",
      borderRadius: "100%",
      width: "2rem",
      height: "2rem",
      background: "$green500",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: "$white",
      border: "3px solid $gray800",
    }
  }
})