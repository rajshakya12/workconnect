import { Grid, TextField, Button, Dialog, DialogContent} from '@mui/material';
import { useStyles } from "./CategoryCss";
import { useState, useEffect } from 'react';
import { postData } from '../../services/FetchNodeServices';
import Swal from 'sweetalert2';

export default function EditCategory({ refresh, setRefresh, rowData, openEdit, setOpenEdit }) {

    const classes = useStyles()

    const [categoryId, setCategoryId] = useState('')
    const [categoryName, setCategoryName] = useState('')
    const [error, setError] = useState({ categoryName: '' })
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setCategoryName(rowData.categoryname)
        setCategoryId(rowData.categoryid)
    }, [rowData])

    const handleError = (label, message) => {
        setError((prev) => ({ ...prev, [label]: message }))
    }

    const validate = () => {
        var error = false

        if (!categoryName) {
            handleError('categoryname', "Required")
            error = true
        }
        return error
    }

    const handleSubmit = async () => {

        var status = validate();

        if (!status) {
            setLoading(true)
            var body = { categoryid: categoryId, categoryname: categoryName }
        }
        var res = await postData('category/edit_category', body)
        setLoading(false)

        if (res.status) {
            Swal.fire({
                position: "center",
                icon: "success",
                title: res.message,
                showConfirmButton: false,
                timer: 1500,
                toast: true
            });
            setLoading(false)
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
            });
        }
    }
    const handleClose = () => {
        setOpenEdit(false)
    }

    const categoryForm = () => {
        return (
            <div className={classes.root}>
                <div className={classes.boxEdit}>

                    <div className={classes.heading}>
                        <img className={classes.imageStyle} src='./wcll.png' alt="logo" />
                        <span className={classes.headingText}>Edit Category</span>
                    </div>

                    <div className={classes.grids}>
                        <Grid container spacing={1}>
                            <Grid >
                                <TextField value={categoryName} onFocus={() => handleError('categoryName', '')} helperText={error.categoryName} onChange={(e) => setCategoryName(e.target.value)} label="Category Name" variant='outlined' fullWidth/>
                            </Grid>

                            <Grid className={classes.btns} container spacing={1}>
                                <Grid item xs={6} className={classes.btgrid}>
                                    <Button onClick={handleSubmit} disabled={loading} variant="contained" fullWidth>Save</Button>
                                </Grid>
                                <Grid item xs={6} className={classes.btgrid}>
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
        <Dialog open={openEdit} onClose={handleClose}>
            <DialogContent>
                {categoryForm()}
            </DialogContent>
        </Dialog>
    )
}