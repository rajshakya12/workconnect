import { Dialog,DialogContent,DialogActions } from "@mui/material";
import { useEffect, useState } from "react";
import {FormControl,InputLabel,Select,MenuItem, TextField, Grid, Button, IconButton } from "@mui/material";
import { useStyles } from "./PlaceCss";
import { postData,getData } from "../../services/FetchNodeServices";
import Swal from "sweetalert2";

export default function PlaceEdit({refresh,setRefresh,rowData,openStatus,setOpenStatus})
{   
    const classes=useStyles();
    const [cityId,setCityId]=useState('')
    const [placeId,setPlaceId]=useState('')
    const [placeName,setPlaceName]=useState('')
    const [pinCode,setPinCode]=useState('')
    const [error,setError]=useState({})
    const [loading,setLoading]=useState(false)

    const [cityList,setCityList]=useState([])
        const fetchAllCity=async()=>{
            var res=await getData("city/fetch_all_city")
           setCityList(res.data)
    
        } 
     useEffect(()=>{
       fetchAllCity()
     },[])
     const fillCity=()=>{
        return cityList.map((item)=>{
        return <MenuItem value={item.cityid}>{item.cityname}</MenuItem>
    
        })
     }
      
    //alert(JSON.stringify(rowData))
    useEffect(()=>{
        setPlaceId(rowData.placeid);
        setCityId(rowData.cityid)
        setPlaceName(rowData.placename);
        setPinCode(rowData.pincode);
        
    },[rowData])


    const handleClose=()=>{
        setOpenStatus(false)
    }


     const validate=()=>{
            var error=false
            if(placeName.length==0)
            {
              handleError("placeName","Place name cann't be blank...")  
              error=true
            }
            if(pinCode.length==0)
            {
              handleError("pinCode","Pin Code cann't be blank...")  
              error=true
            }
            return error
        }
    
        //error handling//
        const handleError=(label,message)=>{
            setError((prev)=>({...prev,[label]:message}))
            console.log('Error',error);
    
        }
        //end error handling//
    
        const handleSubmit=async()=>{
            var status=validate()
            //alert(status,error.cityName)
            if(status==false)
            {
            setLoading(true)
            var body={cityid:cityId,placeid:placeId,placename:placeName,pincode:pinCode}
            var res=await postData('places/edit_place',body)
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
            }

        }
    

        const placeForm=()=>{
            return(<div className={classes.rootEdit}>
        <div className={classes.boxEdit}>
            <div className={classes.heading}>
                <div className={classes.headingGroupStyle}>
                    <img src='/logo.png' className={classes.imageStyle}/>
                    <span className={classes.headingText}>Place Interface</span>

                    
                </div>
            </div>
            <div style={{margin:'10px', width:'96.5%'}}>
                <Grid spacing={2} container>

                    <Grid size={12} className={classes.cityDetailEdit}>
                        Edit Place Details
                    </Grid>
     <Grid size={12}>
                        <FormControl fullWidth>
                            <InputLabel>City Code</InputLabel>
                            <Select label="City Code" value={cityId}  onChange={(e)=>setCityId(e.target.value)}>
                             <MenuItem >-Select City-</MenuItem>
                             {fillCity()}
                            </Select>
                        </FormControl>

                        
                    </Grid>

                    <Grid size={12}>
                        <TextField onFocus={()=>handleError('placeName','')} helperText={error.placeName} error={error.placeName} value={placeName} onChange={(e)=>setPlaceName(e.target.value)} fullWidth label="Place Name" variant="outlined"/>
                    </Grid>

                    <Grid size={12}>
                        <TextField onFocus={()=>handleError('pinCode','')} helperText={error.pinCode} error={error.pinCode} value={pinCode} onChange={(e)=>setPinCode(e.target.value)} fullWidth label="Pin Code" variant="outlined"/>
                    </Grid>
                
                    <Grid size={6} className={classes.centerStyle}>
                        <Button loading={loading} onClick={handleSubmit} fullWidth variant="contained">Edit</Button>
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
                {placeForm()}
            </DialogContent>

        </Dialog>
    )
}