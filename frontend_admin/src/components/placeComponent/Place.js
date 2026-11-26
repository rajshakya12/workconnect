import {FormControl,InputLabel,Select,MenuItem, TextField, Grid, Button, IconButton } from "@mui/material";
import { useStyles } from "./PlaceCss";
import { useEffect, useState } from "react";
import { postData,getData } from "../../services/FetchNodeServices";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";

export default function Place()
{
    const classes=useStyles();
    var navigate=useNavigate();
    const [cityId,setCityId]=useState('')
    const [placeName,setPlaceName]=useState('')
    const [pinCode,setPinCode]=useState('')
    const [error, setError] = useState({})
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
  
    const validate=()=>{
        var error=false
        if(cityId.length==0)
        {
          handleError("cityId","City Id cann't be blank...")  
          error=true
        }
        if(placeName.length==0)
        {
          handleError("placeName","Place Name cann't be blank...")  
          error=true 
        }
        if(pinCode.length==0)
        {
          handleError("pinCode","Pin code cann't be blank...")  
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
        var body={cityid:cityId,placename: placeName,pincode:pinCode}
        var res=await postData('places/add_new_places',body)
        if(res.status)
        {
            Swal.fire({
            position: "top-end",
            icon: "success",
            title: res.message,
            showConfirmButton: false,
            timer: 1500,
            toast: true
});
        setLoading(false)
        }
        else
        {
           Swal.fire({
           //position: "top-end",
           icon: "error",
           title: res.message,
           showConfirmButton: false,
           timer: 1500
});
        }
        }
        resetData()
    }


    const resetData=()=>{
        setCityId('')
        setPlaceName('')
        setPinCode('')
    }

    return(<div className={classes.root}>
        <div className={classes.box}>
            <div className={classes.heading}>
                <div className={classes.headingGroupStyle}>
                    <img src='/logo.png' className={classes.imageStyle}/>
                    <span className={classes.headingText}>Place Interface</span>

                    <img onClick={()=>navigate('/displayallplace')} src='/report.png' className={classes.imageStyle}/>
                </div>
            </div>
            <div style={{margin:'10px', width:'96%'}}>
                <Grid spacing={1.2} container>
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
                        <TextField onFocus={()=>handleError('pinCode','')} helperText={error.pinCode} error={error.pinCode} value={pinCode} onChange={(e)=>setPinCode(e.target.value)} fullWidth label="Pin code" variant="outlined"/>
                    </Grid>
                
                    <Grid size={6} className={classes.centerStyle}>
                        <Button loading={loading} fullWidth variant="contained" onClick={handleSubmit}>Save</Button>
                    </Grid>

                    <Grid size={6} className={classes.centerStyle}>
                        <Button fullWidth variant="contained" onClick={resetData}>Reset</Button>
                    </Grid>

                </Grid>

            </div>
        </div>
    </div>)
}
    