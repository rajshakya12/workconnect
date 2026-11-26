import { makeStyles } from '@mui/styles';
export const useStyles = makeStyles((theme) => ({
    root:{display:'flex',
          width:'100vw',
          height:'100vh',
          justifyContent:'center'
        },
    box:{
        display:'flex',
        width:'60%',
        height:'auto',
        borderRadius:10,
        margin:10,
        flexDirection:'column'
    },
    heading:{
        width:'100%',
        height:'70px',
        background:'#78e08f',
        borderTopLeftRadius:'10px',
        borderTopRightRadius:'10px',
        paddingTop:10
    },
    imageStyle:{
        width:40
    },
    headingText:{
        fontFamily:'Raleway',
        fontSize:14,
        fontWeight:'bold',
        color:'#0a3a1a'
    },
    headingGroupStyle:{
        marginLeft:'10px',
        display:'flex',
        alignItems:'center',
        justifyContent:'space-between',
        width:'95.7%'
    },
    centerStyle:{
        display:'flex',
        alignItems:'center',
        justifyContent:'center',
        display:'flex',
        flexDirection:'column'
    },
    errorTextStyle:{
    fontWeight: 400,
    color: '#d32f2f',
    fontSize: '0.75rem',
    lineHeight: 1.66,
    letterSpacing: '0.03333em',
    textAlign: 'left',
    mt: '3px',
    mb: 0,
    ml: '14px',
    mr: '14px'
  }


  }));