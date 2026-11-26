import { FormControl, InputLabel, Select, MenuItem, Grid, TextField, Button, Dialog, DialogContent } from "@mui/material";
import { useStyles } from "./SubcategoryCss";
import { useEffect, useState } from "react";
import { postData, getData } from "../../services/FetchNodeServices";
import Swal from "sweetalert2";

export default function EditSubcategory({ refresh, setRefresh, rowData, openEdit, setOpenEdit }) {

    const classes = useStyles();

    const [categoryId, setCategoryId] = useState('')
    const [subcategoryId, setSubcategoryId] = useState('')
    const [subcategoryName, setSubcategoryName] = useState('')
    const [categoryList, setCategoryList] = useState([])

    const [error, setError] = useState({})

    const fetchAllCategory = async () => {
        var res = await getData('category/fetch_all_category');
        console.log("API Response:", res?.data);
        setCategoryList(res?.data || [])
    }

    useEffect(() => {
        fetchAllCategory()
    }, [])

    const fillCategory = () => {
        return categoryList?.map((item) => {
            return <MenuItem key={item.categoryid} value={item.categoryid}>{item.categoryname}</MenuItem>
        })
    }

    useEffect(() => {

        setCategoryId(rowData.categoryid)
        setSubcategoryId(rowData.subcategoryid)
        setSubcategoryName(rowData.subcategoryname)
    }, [rowData])

    const handleError = (label, message) => {
        setError((prev) => ({ ...prev, [label]: message }))
        console.log("Error: ", error)
    }

    const validate = () => {
        var error = false
        if (!categoryId) {
            handleError('categoryId', "Required")
            error = true
        }
        if (!subcategoryName) {
            handleError('subcategoryName', "Required")
            error = true
        }
        return error
    }

    const handleSubmit = async () => {
        var status = validate();

        if (status === false) {

            var body = { categoryid: categoryId, subcategoryname: subcategoryName, subcategoryid: subcategoryId }

            var res = await postData('subcategory/edit_subcategory', body);

            if (res.status) {
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: res.message,
                    showConfirmButton: false,
                    timer: 1500,
                    toast: true
                })
                setOpenEdit(false)
                setRefresh(!refresh)
                
            }
            else {
                Swal.fire({
                    position: "center",
                    icon: "error",
                    title: res.message,
                    showConfirmButton: false,
                    timer: 1500
                })
            }
        }
    }

    const handleClose = () => {
        setOpenEdit(false)
    }

    const subcategoryForm = () => {
        return (
            <div className={classes.root}>
                <div className={classes.boxEdit}>

                    <div className={classes.heading}>
                        <img className={classes.imageStyle} src='./wcll.png' alt="logo" />
                        <span className={classes.headingText}>Edit Subcategory</span>
                    </div>

                    <div className={classes.grids}>
                        <Grid container spacing={1}>
                            <Grid size={12} container>
                                <FormControl fullWidth error={!!error.categoryId}>
                                    <InputLabel>Category Code</InputLabel>
                                    <Select value={categoryId} label="Category Code" onChange={(e) => setCategoryId(e.target.value)} onFocus={() => handleError('categoryId', '')}
                                    >
                                        <MenuItem >--Select Category--</MenuItem>
                                        {fillCategory()}
                                    </Select>
                                    <span style={{ color: '#d32f2f', fontSize: 12, marginLeft: 14, marginTop: 5 }}>
                                        {error.categoryId}
                                    </span>
                                </FormControl>
                            </Grid>
                            <Grid size={12} container>
                                <TextField label="Subcategory Name" onFocus={() => handleError('subcategoryName', '')} onChange={(e) => setSubcategoryName(e.target.value)} helperText={error.subcategoryName} error={error.subcategoryName} value={subcategoryName} variant="outlined" fullWidth />
                            </Grid>

                            <Grid className={classes.btns} container spacing={1}>
                                <Grid size={6} className={classes.btgrid}>
                                    <Button onClick={handleSubmit} variant="contained" fullWidth>Save</Button>
                                </Grid>
                                <Grid size={6} className={classes.btgrid}>
                                    <Button onClick={handleClose} variant="contained" fullWidth>Close</Button>
                                </Grid>
                            </Grid>
                        </Grid>
                    </div>
                </div>
            </div>

        )
    }


    return (
        <div>
            <Dialog open={openEdit} onClose={handleClose}>
                <DialogContent>
                    {subcategoryForm()}
                </DialogContent>
            </Dialog>
        </div>
    )
}