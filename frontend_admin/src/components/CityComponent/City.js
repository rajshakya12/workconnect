import { TextField, Grid, Button, IconButton } from "@mui/material";
import { useStyles } from "./Citycss";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { useState } from "react";
import { postData } from "../../services/FetchNodeServices";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";
export default function City() {
  const classes = useStyles();
  var navigate=useNavigate()
  const [cityName,setCityName]=useState('')
  const [cityIcon,setCityIcon]=useState({file:'india-gate.png',bytes:''})
  const [error,setError]=useState({cityIcon:''})
  const [loading,setLoading]=useState(false)
  
  const handleImage=(e)=>{
    setCityIcon({file:URL.createObjectURL(e.target.files[0]),bytes:e.target.files[0]})
   handleError('cityIcon','')

  }
  //error handling////
  const handleError=(label,message)=>{
   setError((prev)=>({...prev,[label]:message})) 
   console.log('Error',error)
  }

  const validate=()=>{
    var error=false
    if(cityName.length==0)
    {
      handleError("cityName","City name should not blank...")
      error=true
    }
    if(cityIcon.bytes.length==0)
    {
       handleError("cityIcon","Choose city image...")
      error=true
  
    }
    return error
  }
  /////// end error handling////
  const handleSubmit=async()=>{
    var status=validate()
   
    if(status==false)
    {
       setLoading(true)
    var body=new FormData()
    body.append("cityname",cityName)
    body.append("cityicon",cityIcon.bytes)
    var res=await postData('city/add_new_city',body)
    if(res.status)
    {
      Swal.fire({
  
  icon: "success",
  title: res.message,
  showConfirmButton: false,
  timer: 1500,
  toast:true
});

setLoading(false)
    }
    else
    {

          Swal.fire({
  position: "top-end",
  icon: "error",
  title: res.message,
  showConfirmButton: false,
  timer: 1500
    })

    }
  }
  resetData()
  }
const resetData=()=>{
setCityIcon({file:'india-gate.png',bytes:''})
setCityName('')

}

  return (
    <div className={classes.root}>
      <div className={classes.box}>
        <div className={classes.heading}>
          <div className={classes.headingGroupStyle}>
            <img src="/logo.png" className={classes.imageStyle} />
            <span className={classes.headingText}>City Interface</span>
            
            <img onClick={()=>navigate('/dashboard/displayallcity')} src="/report.png" className={classes.imageStyle} />
          </div>
        </div>
        <div style={{ margin: 10, width: "96.5%" }}>
          <Grid spacing={2} container>
            <Grid size={12}>
              <TextField onFocus={()=>handleError('cityName','')} helperText={error.cityName}  error={error.cityName} value={cityName} onChange={(e)=>setCityName(e.target.value)} fullWidth label="City Name" variant="outlined" />
            </Grid>
            <Grid size={6} className={classes.centerStyle}>
            <Button component="label" variant="contained" startIcon={<CloudUploadIcon />}>Upload City Image
             <input multiple onChange={handleImage} type="file" hidden accept="image/png" />
                
            </Button>
            <span className={classes.errorTextStyle}>
             {error.cityIcon}
             </span>
            </Grid>
            <Grid size={6} className={classes.centerStyle} >
                <img src={cityIcon.file} className={classes.imageStyle} />

            </Grid>
            <Grid size={6} className={classes.centerStyle}>
             <Button loading={loading} onClick={handleSubmit}  fullWidth variant="contained">Save</Button>
         
            </Grid>
            <Grid size={6} className={classes.centerStyle}>
 <Button fullWidth variant="contained" onClick={resetData}>Reset</Button>
            </Grid>

          </Grid>
        </div>
      </div>
    </div>
  );
}
