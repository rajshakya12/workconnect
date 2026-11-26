import { TextField, Grid, Button, IconButton, FormControl,Select,InputLabel, MenuItem } from "@mui/material";
import { useStyles } from "./SubcategoryCss";
import { useEffect, useState } from "react";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import {getData, postData } from "../../services/FetchNodeServices";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";

export default function SubCategory()
{
    const classes=useStyles();
    var navigate=useNavigate();
    const [categoryId,setCategoryId]=useState('')
    const [subcategoryName,setSubCategoryName]=useState('')
    const [subcategoryIcon,setSubCategoryIcon]=useState({file:'category.png',bytes:''})
    const [error, setError] = useState({subcategoryIcon:''})
    const [loading,setLoading]=useState(false)
    
    const [categoryList,setCategoryList]=useState([])

    const handleImage=(e)=>{
        setSubCategoryIcon({file:URL.createObjectURL(e.target.files[0]),bytes:e.target.files[0]})
        handleError('subcategoryIcon','')
    }

    const fetchAllCategory=async()=>{
        var res=await getData("category/fetch_all_category")
        setCategoryList(res.data)
    }


    useEffect(()=>{
        fetchAllCategory()
    },[])

    const fillcategory=()=>{
        return categoryList.map((item)=>{
            return <MenuItem value={item.categoryid}>{item.categoryname}</MenuItem>
        })
    }

    const validate=()=>{
        var error=false
        if(categoryId.length==0)
        {
          handleError("categoryId","Category Id cann't be blank...")  
          error=true
        }
        if(subcategoryName.length==0)
        {
          handleError("subcategoryName","Subcategory Name cann't be blank...")  
          error=true 
        }
        if(!subcategoryIcon.bytes)
        {
          handleError("subcategoryIcon","Choose Subcategory Image...")  
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
           var body=new FormData()
           body.append('categoryid',categoryId)
           body.append('subcategoryname',subcategoryName)
           body.append('subcategoryicon',subcategoryIcon.bytes)
           var res=await postData('subcategory/add_new_subcategory',body)
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
        resetData()
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
           setLoading(false)
           }
       }

    const resetData=()=>{
        setCategoryId('')
        setSubCategoryName('')
        setSubCategoryIcon({ file:'category.png',bytes:'' });
        
    }

    return(<div className={classes.root}>
        <div className={classes.box}>
            <div className={classes.heading}>
                <div className={classes.headingGroupStyle}>
                    <img src='/logo.png' className={classes.imageStyle}/>
                    <span className={classes.headingText}>SubCategory Interface</span>

                    <img onClick={()=>navigate('/DisplayAllSubCategory')} src='/report.png' className={classes.imageStyle}/>
                </div>
            </div>

            <div style={{margin:'10px', width:'96%'}}>
                <Grid spacing={1.2} container>
                    <Grid size={12}>
                        <FormControl fullWidth>
                            <InputLabel>Category Code</InputLabel>
                            <Select label="Category Code" value={categoryId} onChange={(e)=>setCategoryId(e.target.value)}>
                                <MenuItem>--Select Category--</MenuItem>
                                {fillcategory()}
                            </Select>
                        </FormControl>
                    </Grid>

                    <Grid size={12}>
                        <TextField onFocus={()=>handleError('subcategoryName','')} helperText={error.subcategoryName} error={error.subcategoryName} value={subcategoryName} onChange={(e)=>setSubCategoryName(e.target.value)} fullWidth label="Subcategory Name" variant="outlined"/>
                    </Grid>

                    <Grid size={6} className={classes.centerStyle}>
                        <Button component="label" variant="contained" startIcon={<CloudUploadIcon />}>Upload subcategory Image
                        <input multiple onChange={handleImage} type="file" hidden accept="image/png"/>
                        </Button>
                        <span className={classes.errorTextStyle}>
                            {error.subcategoryIcon}
                        </span>
                    </Grid>

                    <Grid size={6} className={classes.centerStyle}>
                        <img src={subcategoryIcon.file} className={classes.imageStyle}/>
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
    