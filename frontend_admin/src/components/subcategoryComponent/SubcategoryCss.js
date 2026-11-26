import { makeStyles } from '@mui/styles';
export const useStyles = makeStyles((theme) => ({
    root:{display:'flex',
          width:'100vw',
          height:'100vh',
          justifyContent:'center'
        },
    box:{
        display:'flex',
        border:'0.3px solid #7f8c8d',
        width:'40%',
        height:'400px',
        borderRadius:10,
        margin:10,
        flexDirection:'column'
    },
    rootEdit:{
          display:'flex', 
          width:'100%',
          height:'auto',         
          justifyContent:'center'
        },
    boxEdit:{
        display:'flex',
        border:'0.3px solid #7f8c8d',
        width:'100%',
        height:'auto',
        borderRadius:10,
        margin:10,
        flexDirection:'column'
    },
    subcategoryDetailEdit:{
        fontFamily:'Raleway',
        fontSize:20,
        color:'#ad1f2b',
        fontWeight:'bold',
        textAlign:'center'
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
        width:60
    },
    headingText:{
        fontFamily:'Raleway',
        fontSize:24,
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
        flexDirection:'column',
        marginTop:'10px'
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