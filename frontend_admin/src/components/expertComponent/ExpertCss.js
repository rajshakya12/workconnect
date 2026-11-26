import { makeStyles } from "@mui/styles";


export const useStyles = makeStyles({
    root: {
        display: "flex",
        justifyContent: "center",
    },
    box: {
        boxSizing: 'border-box',
        border: ".5px solid #19a25d",
        width: "50%",
        borderRadius: "10px",
        background: "white",
        margin: "10px"
    },
    boxEdit: {
        boxSizing: 'border-box',
        border: ".5px solid #19a25d",
        width: '100%',
        borderRadius: "10px",
        background: "white",
        margin: "10px"
    },
    heading: {
        display: "flex",
        alignItems: "center",
        width: "100%",
        background: "#3eb746",
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        justifyContent: 'space-between',
    },
    headingText: {
        display: "flex",
        alignItems: "center",
        fontFamily: "Raleway",
        fontSize: "28px",
        color: "white",
        fontWeight: "bold",
        marginRight: "10px"
    },
    imageStyle: {
        width: "auto",
        height: 60,
        padding: '10px',
        cursor: "pointer"
    },
    grids: {
        margin: '4px',
    },
    btns:{
        width: '100%',
        display:"flex",
        justifyContent:"center",
    },
    btgrid:{
        display: "flex",
        justifyContent: "center",
        // width: '80%',
    },
    center:{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center"
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

})  