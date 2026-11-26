import { Dialog,DialogContent,DialogActions } from "@mui/material";
import { useEffect, useState } from "react";
import { TextField, Grid, Button, IconButton } from "@mui/material";
import { useStyles } from "./SubcategoryCss";
import {postData, serverURL } from "../../services/FetchNodeServices";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import Swal from "sweetalert2";

export default function SubCategoryIconEdit({refresh,setRefresh,rowData,openStatus,setOpenStatus})
{   
    const classes=useStyles();
    const [subcategoryId,setSubCategoryId]=useState('')
    const [subcategoryIcon, setSubCategoryIcon] = useState({ file: '', bytes: '' });
    const [saveBtnStatus,setSaveBtnStatus]=useState(false)
    const [loading,setLoading]=useState(false)

    const handleImage=(e)=>{
        setSubCategoryIcon({file:URL.createObjectURL(e.target.files[0]),bytes:e.target.files[0]})
        setSaveBtnStatus(true)
    }

    const handleCancel=()=>{
          setSubCategoryIcon({file:`${serverURL}/images/${rowData.subcategoryicon}`,bytes:''});
          setSaveBtnStatus(false)
    }
    const saveCancelBtn=()=>{
        return(<div style={{display:'flex',width:'70%',justifyContent:'space-between'}}>
            <Button onClick={handleSubmit} variant="contained">Save</Button>
            <Button onClick={handleCancel} variant="contained" color="secondary">Cancel</Button>
        </div>)
    }

    //alert(JSON.stringify(rowData))
    useEffect(()=>{
        setSubCategoryIcon({file:`${serverURL}/images/${rowData.subcategoryicon}`,bytes:''});
        setSubCategoryId(rowData.subcategoryid)
        
    },[rowData])


    const handleClose=()=>{
        setOpenStatus(false)
        setSaveBtnStatus(false)
    }


     
     
    
        const handleSubmit=async()=>{
            
            setLoading(true)
            var body=new FormData()
            body.append("subcategoryid",subcategoryId)
            body.append('subcategoryicon',subcategoryIcon.bytes)
            var res=await postData('subcategory/edit_subcategory_icon',body)
            if(res.status)
            {
                Swal.fire({
                //position: "top-end",
                icon: "success",
                title: res.message,
                showConfirmButton: false,
                timer: 1500,
                toast: true
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
    });
            }
            setSaveBtnStatus(false)
            }
    

        const subcategoryForm=()=>{
            return(<div className={classes.rootEdit}>
        <div className={classes.boxEdit}>
            <div className={classes.heading}>
                <div className={classes.headingGroupStyle}>
                    <img src='/logo.png' className={classes.imageStyle}/>
                    <span className={classes.headingText}>SubCategory Interface</span>

                    
                </div>
            </div>
            <div style={{margin:'10px', width:'96.5%'}}>
                <Grid spacing={2} container>

                    <Grid size={12} className={classes.subcategoryDetailEdit}>
                        Edit Subcategory Picture
                    </Grid>

                    <Grid size={12} className={classes.centerStyle}>
                        <img src={`${subcategoryIcon.file}`} style={{width:'300px'}}/>
                    </Grid>

                    <Grid size={6} className={classes.centerStyle}>
                        {saveBtnStatus?saveCancelBtn():
                    <Button component="label" variant="contained" startIcon={<CloudUploadIcon />}>Upload New Subcategory Icon
                        <input multiple onChange={handleImage} type="file" hidden accept="image/png"/>
                    </Button>
                        }       
                    </Grid>
                
                    
                    
                    <Grid size={6} className={classes.centerStyle}>
                        <Button fullWidth variant="contained" onClick={handleClose}>Close</Button>
                    </Grid>

                </Grid>

            </div>
        </div>
    </div>)
        }


    return(
        <Dialog open={openStatus} onClose={handleClose}>
            <DialogContent>
                {subcategoryForm()}
            </DialogContent>

        </Dialog>
    )
}