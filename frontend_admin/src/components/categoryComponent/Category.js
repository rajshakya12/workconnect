import { useNavigate } from "react-router";
import { useStyles } from "../categoryComponent/CategoryCss";
import { Grid, TextField, Button } from "@mui/material";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { useState } from "react";
import { postData } from "../../services/FetchNodeServices";
import Swal from "sweetalert2";


export default function Category() {

    const classes = useStyles()
    const navigate = useNavigate()

    const [categoryName, setCategoryName] = useState('')
    const [error, setError] = useState({ categoryIcon: '' })
    const [categoryIcon, setCategoryIcon] = useState({ file: 'categoryicon.png', bytes: '' })

    const handleImage = (e) => {
        setCategoryIcon({ file: URL.createObjectURL(e.target.files[0]), bytes: e.target.files[0] })
    }
    const handleSubmit = async () => {
        var status = validate();

        if (!status) {

            var body = new FormData()
            body.append('categoryname', categoryName)
            body.append('categoryicon', categoryIcon.bytes)

            var res = await postData('category/add_new_category', body)

            if (res.status) {
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: res.message,
                    showConfirmButton: false,
                    timer: 1500,
                    toast: true
                });
                handleReset();
            }
            else {
                Swal.fire({
                    position: "center",
                    icon: "error",
                    title: res.message,
                    showConfirmButton: false,
                    timer: 1500,
                    toast: true
                })
            }
        }

    }

    const handleError = (label, message) => {
        setError((prev) => ({ ...prev, [label]: message }))
    }

    const validate = () => {

        
        var error = false
        if (!categoryName) {
            handleError("categoryName", "Category Name Required")
            error = true
        }
        if (!categoryIcon) {
            handleError("categoryIcon", "Category Icon Required")
            error = true
        }
        return error
    }

    const handleReset = () => {
        setCategoryName('')
        setCategoryIcon({ file: 'cate-icon.png', bytes: '' })
    }


    return (
        <div className={classes.root}>
            <div className={classes.box}>

                <div className={classes.heading}>
                    <img className={classes.imageStyle} src="./wcll.png" alt="logo" />
                    <span className={classes.headingText}>Category Interface</span>
                    <img className={classes.imageStyle} src="/report.png" onClick={() => navigate('/displayallcategory')} alt="report" />
                </div>

                <div className={classes.grids}>
                    <Grid container spacing={2}>
                        <Grid size={12}>
                            <TextField onChange={(e) => setCategoryName(e.target.value)} value={categoryName} onFocus={() => handleError('categoryName', '')} helperText={error.categoryName} error={error.categoryName} label="Category Name" fullWidth />
                        </Grid>

                        <Grid size={6}>
                            <Button startIcon={<CloudUploadIcon />} component="label" variant="contained" fullWidth >Upload Category Image
                                <input type="file" onChange={handleImage} multiple hidden accept="image/*"></input>
                            </Button>
                            <span className={classes.errorTextStyle}>
                                {error.categoryIcon}
                            </span>
                        </Grid>

                        <Grid className={classes.btgrid} size={6}>
                            <img className={classes.image} src={categoryIcon.file} width="40px" height="40px" alt="caticon" />
                        </Grid>


                        <Grid className={classes.btgrid} size={6}>
                            <Button className={classes.btns} onClick={handleSubmit} variant="contained">Save</Button>
                        </Grid>
                        <Grid className={classes.btgrid} size={6}>
                            <Button className={classes.btns} onClick={handleReset} variant="contained">Reset</Button>
                        </Grid>


                    </Grid>
                </div>
            </div>
        </div>
    )
}