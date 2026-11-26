import { FormControl, InputLabel, Select, MenuItem, Grid, TextField, Button } from "@mui/material";
import {useStyles} from './IncludesCss'
import { useEffect, useState } from "react";
import { getData,postData } from "../../services/FetchNodeServices";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';

export default function Includes() {

    const classes = useStyles()
    const navigate = useNavigate()

    const [categoryId, setCategoryId] = useState('')
    const [subCategoryId, setSubCategoryId] = useState('')
    const [includes, setIncludes] = useState('')
    const [excludes, setExcludes] = useState('')
    const [categoryList, setCategoryList] = useState([])
    const [subCategoryList, setSubCategoryList] = useState([])
    const [error, setError] = useState({})

    const fetchAllCategory = async () => {
        var res = await getData('category/fetch_all_category');
        console.log("API Response:", res?.data);
        setCategoryList(res.data)
    }

    const fetchAllSubCategory = async (cid) => {
        var res = await postData(`subcategory/fetch_subcategory_by_category`,{categoryid:cid});
        console.log("API Response:", res?.data);
        setSubCategoryList(res.data)
    }

    const handleCategory=(e)=>{
        fetchAllSubCategory(e.target.value)

    }

    useEffect(() => {
        fetchAllCategory()
    }, [])

    const fillCategory = () => {
        return categoryList?.map((item) => {
            return <MenuItem key={item.categoryid} value={item.categoryid}>{item.categoryname}</MenuItem>
        })
    }

    const fillSubCategory = () => {
        return subCategoryList?.map((item) => {
            return <MenuItem key={item.subcategoryid} value={item.subcategoryid}>{item.subcategoryname}</MenuItem>
        })
    }


    const handleSubmit = async () => {

        var status = validate();

        if (status === false) {

            var body = { "categoryid": categoryId,"subcategoryid":subCategoryId, "include": includes, "exclude":excludes }

            var res = await postData('includes/add_new_includes', body)
            console.log(res)

            if (res.status) {
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: res.message,
                    showConfirmButton: false,
                    timer: 1500,
                    toast: true
                })

            }
            else {
                Swal.fire({
                    position: "center",
                    icon: "error",
                    title: res.message,
                    showConfirmButton: false,
                    timer: 1500,
                    toast: true
                });
            }
        }

    }

    const validate = () => {
        var error = false

        if (!categoryId) {
            handleError("categoryid", "Category Shouldn't be blank")
            error = true
        }
        if (!subCategoryId) {
            handleError("subcategoryid", "SubCategory Shouldn't be blank")
            error = true
        }
        if (!includes) {
            handleError("includes", "Includes Shouldn't be blank")
            error = true
        }
        if (!excludes) {
            handleError("excludes", "Exclude Shouldn't be blank")
            error = true
        }
        return error

    }

    const handleReset = () => {
        setCategoryId('')
        setSubCategoryId('')
        setIncludes('')
        setExcludes('')
    }

    const handleError = (label, message) => {
        setError((prev) => ({ ...prev, [label]: message }))

    }


return (
<div className={classes.root}>
    <div className={classes.box}>

        <div className={classes.heading}>
            <img className={classes.imageStyle} src="./wcll.png" alt="logo" />
            <span className={classes.headingText}>Include Interface</span>
            <img className={classes.imageStyle} src="/report.png" onClick={() => navigate('/displayallincludes')} alt="report" />
        </div>

        <div className={classes.grids} >
            <Grid spacing={2} container>

                <Grid size={12}> 
                    <FormControl fullWidth error={error.categoryid}>
                        <InputLabel>Category Code</InputLabel>
                        <Select value={categoryId} label="Category Code" 
                        onChange={
                            (e) =>{
                                setCategoryId(e.target.value)
                                handleCategory(e)
                            }
                        } 
                        onFocus={() => handleError('categoryid', '')}
                        >
                            <MenuItem >-Select Category-</MenuItem>
                            {fillCategory()}
                        </Select>
                        <span style={{ color: '#d32f2f', fontSize: 12, marginLeft: 14, marginTop: 5 }}>
                            {error.categoryid}
                        </span>
                    </FormControl>
                </Grid>

                <Grid size={12}> 
                    <FormControl fullWidth error={error.subcategoryid}>
                        <InputLabel>SubCategory Code</InputLabel>
                        <Select value={subCategoryId} label="SubCategory Code" onChange={(e) => setSubCategoryId(e.target.value)} onFocus={() => handleError('subcategoryid', '')}
                        >
                            <MenuItem >-Select SubCategory-</MenuItem>
                            {fillSubCategory()}
                        </Select>
                        <span style={{ color: '#d32f2f', fontSize: 12, marginLeft: 14, marginTop: 5 }}>
                            {error.subcategoryid}
                        </span>
                    </FormControl>
                </Grid>

                <Grid size={12}>
                   
                    <ReactQuill theme="snow" value={includes} onChange={(e)=>setIncludes(e)} />
                </Grid>
                {/* above side are used it react quill  */}

                <Grid size={12}> 
                      <ReactQuill theme="snow" value={excludes} onChange={(e)=>setExcludes(e)} />
                </Grid>

                <Grid className={classes.btns} size={6}>
                    <Button className={classes.btgrid} variant="contained" onClick={handleSubmit}>Save</Button>
                </Grid>
                <Grid className={classes.btns} size={6}>
                    <Button className={classes.btgrid} variant="contained" onClick={handleReset}>Reset</Button>
                </Grid>

            </Grid>
        </div>
    </div>
</div>
)
}