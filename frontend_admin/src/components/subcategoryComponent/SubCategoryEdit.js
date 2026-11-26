import { Dialog,DialogContent,DialogActions } from "@mui/material";
import { useEffect, useState } from "react";
import { FormControl,Select, InputLabel, MenuItem,TextField, Grid, Button, IconButton } from "@mui/material";
import { useStyles } from "./SubcategoryCss";
import {postData,getData } from "../../services/FetchNodeServices";
import Swal from "sweetalert2";

export default function SubCategoryEdit({refresh,setRefresh,rowData,openStatus,setOpenStatus})
{   const classes=useStyles();
    const [categoryId,setCategoryId]=useState('')
    const [subcategoryId,setSubCategoryId]=useState('')
    const [subcategoryName,setSubCategoryName]=useState('')
    const [error,setError]=useState({})
    const [loading,setLoading]=useState(false)
    const [categoryList,setCategoryList]=useState([])
    

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

    //alert(JSON.stringify(rowData))
    useEffect(()=>{
        setSubCategoryId(rowData.subcategoryid);
        setCategoryId(rowData.categoryid);
        setSubCategoryName(rowData.subcategoryname);
    },[rowData])


    const handleClose=()=>{
        setOpenStatus(false)
    }


     const validate=()=>{
            var error=false
            if(subcategoryName.length==0)
            {
              handleError("subcategoryName","subcategory name cann't be blank...")  
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
            //alert(status,error.categoryName)
            if(status==false)
            {
            setLoading(true)
            var body={categoryid:categoryId,subcategoryid:subcategoryId,subcategoryname:subcategoryName}
            var res=await postData('subcategory/edit_subcategory',body)
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
                        Edit Subcategory Details
                    </Grid>

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
                        <TextField onFocus={()=>handleError('subcategoryName','')} helperText={error.subcategoryName} error={error.subcategoryName} value={subcategoryName} onChange={(e)=>setSubCategoryName(e.target.value)} fullWidth label="SubCategory Name" variant="outlined"/>
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
                {subcategoryForm()}
            </DialogContent>

        </Dialog>
    )
}