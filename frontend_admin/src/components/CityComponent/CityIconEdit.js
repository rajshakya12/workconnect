import { Dialog,DialogContent,DialogActions } from "@mui/material";
import { useEffect, useState } from "react";
import { TextField, Grid, Button, IconButton } from "@mui/material";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { useStyles } from "./Citycss";
import { postData,serverURL } from "../../services/FetchNodeServices";
import Swal from "sweetalert2";


export default function CityIconEdit({refresh,setRefresh,rowData,openStatus,setOpenStatus})
{   
    const classes = useStyles();
     
     const [cityId,setCityId]=useState('')

      const[saveBtnStatus,setSaveBtnStatus]=useState(false)
       const [loading,setLoading]=useState(false)
       const [cityIcon,setCityIcon]=useState({file:'india-gate.png',bytes:''})
  const handleImage=(e)=>{
    setCityIcon({file:URL.createObjectURL(e.target.files[0]),bytes:e.target.files[0]})
   setSaveBtnStatus(true)

  
  }
   const handleCancel=()=>{
     setCityIcon({file:`${serverURL}/images/${rowData.cityicon}`,bytes:''})
     setSaveBtnStatus(false)
    }


    const SaveCancelBtn=()=>{ 
  return(
    <div style={{display:'flex',width:'70%',justifyContent:'space-between'}}>
      <Button onClick ={handleSubmit}variant="contained">Save</Button>
      <Button onClick ={handleCancel}variant="contained" color="secondary">Cancel</Button>
    
    </div>
  )
}


    useEffect(()=>{
      setCityIcon({file:`${serverURL}/images/${rowData.cityicon}`,bytes:''})
      setCityId(rowData.cityid)
    },[rowData])   
    const handleClose=()=>

    {
        
        setOpenStatus(false)
        setSaveBtnStatus(false)
        
    }


    
      const handleSubmit=async()=>{
        
    setLoading(true)

    var body= new FormData()
    body.append('cityid',cityId)
    body.append('cityicon',cityIcon.bytes)
        
    var res=await postData('city/edit_city_icon',body)

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
        setOpenStatus(false)
        setRefresh(!refresh)
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
     setSaveBtnStatus(false)
}
   
const cityForm=()=>{
    return(
        <div className={classes.rootEdit}>
          <div className={classes.boxEdit}>
            <div className={classes.heading}>
              <div className={classes.headingGroupStyle}>
                <img src="/logo.png" className={classes.imageStyle} />
                <span className={classes.headingText}>Edit City Icon</span>
                
           
              </div>
            </div>
            <div style={{ margin: 10, width: "96.5%" }}>
              <Grid spacing={2} container>
                <Grid size={12}className={classes.centerStyle}>
                    <img src={cityIcon.file} style={{ width: "300px" }}/>
                </Grid>
                <Grid size={6} className={classes.centerStyle}>
                  {saveBtnStatus?SaveCancelBtn():
                 <Button component="label" variant="contained" startIcon={<CloudUploadIcon />}>Upload New City Image Icon
             <input multiple onChange={handleImage} type="file" hidden accept="image/png" />
                
            </Button>}
             
                </Grid>
                <Grid size={6} className={classes.centerStyle}>
     <Button fullWidth variant="contained" onClick={handleClose}>Close</Button>
                </Grid>
    
              </Grid>
            </div>
          </div>
        </div>
      )
   }
  
    return(
    <Dialog open={openStatus} onClose={handleClose}>
        <DialogContent>
           {cityForm()}
        </DialogContent>

    </Dialog>

)

}