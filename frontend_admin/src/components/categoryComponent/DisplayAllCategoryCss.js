import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles({
  root: {
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
    width: "80vw",
    height: "100vh",
    // background: "#a3bd93"
  },
  box: {
    display: "flex",
    flexDirection: "column",
    border: ".5px solid #102f20",
    width: "80%",
    height: "auto",
    margin: 10,
    overflow: "hidden",
    background: "white",
  },
  heading: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    width: "55%",
    height: "70px",

    background: "#3eb746",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  imageStyle: {
    width: "auto",
    height: 60,
    objectFit: "contain"
  },
  imageWrapper: {
    padding: "0 15px",
    display: "flex",
    alignItems: "center",
    width: "50%"
  },
  headingText: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontFamily: "Raleway",
    fontSize: 28,
    color: "white",
    fontWeight: "bold",
  },
  headingTexT: {
    display: "flex",
    justifySelf: 'center',
    alignItems: "center",
    fontFamily: "Raleway",
    fontSize: 28,
    color: "#000",
    fontWeight: "bold",
  },
  grids: {
    margin: 10,
  },
  btgrid: {
    marginTop: 20,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  },
  errorTextStyle: {
    color: "#d32f2f",
    fontFamily: "Roboto, Helvetica, Arial, sans-serif",
    fontWeight: 400,
    fontSize: "0.75rem",
    lineHeight: 1.66,
    letterSpacing: "0.03333em",
    textAlign: "left",
    mt: "3px",
    mx: "14px",
    mb: 0,
    display: "flex",
    justifyContent: "center",
  },
});
