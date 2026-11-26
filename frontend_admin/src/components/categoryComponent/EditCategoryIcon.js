import { Grid, Button } from "@mui/material"
import { useStyles } from "./CategoryCss"
import Swal from "sweetalert2";
import { postData, serverURL } from "../../services/FetchNodeServices";
import { Dialog, DialogContent } from "@mui/material";
import { useEffect, useState } from "react";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';


export default function EditCategoryIcon({ refresh, setRefresh, rowData, openEditIcon, setOpenEditIcon }) {
    const classes = useStyles();

    const [categoryId, setCategoryId] = useState('')
    const [loading, setLoading] = useState(false)
    const [saveBtnStatus, setSaveBtnStatus] = useState(false)
    const [categoryIcon, setCategoryIcon] = useState({ file: 'cate-icon.png', bytes: '' })

    const handleImage = (e) => {
        setCategoryIcon({ file: URL.createObjectURL(e.target.files[0]), bytes: e.target.files[0] })
        setSaveBtnStatus(true)
    }

    const handleCancel = () => {
        setCategoryIcon({ file: `${serverURL}/images/${rowData.categoryicon}`, bytes: '' })
        setSaveBtnStatus(false)
        
    }

    const saveCancelBtn = () => {
        return (
            <div style={{ display: "flex", width: '100px', justifyContent: "space-between" }}>
                <Button onClick={handleSubmit} variant="contained">Save</Button>
                <Button onClick={handleCancel} variant="contained">Cancel</Button>
            </div>
        )
    }

    const resave = () => {
        return (<>
            <Grid size={12} className={classes.btgrid}>
                <Button component="label" variant="contained" fullWidth startIcon={<CloudUploadIcon />}>Upload City Image
                    <input type="file" multiple onChange={handleImage} hidden accept="image/*" />
                </Button>
            </Grid>
            <Grid size={12} className={classes.btgrid}>
                <Button variant="contained" fullWidth onClick={handleClose}>Close</Button>
            </Grid>
        </>)
    }

    useEffect(() => {
        setCategoryIcon({ file: `${serverURL}/images/${rowData.categoryicon}`, bytes: '' })
        setCategoryId(rowData.categoryid)
    }, [rowData])

    const handleClose = () => {
        setOpenEditIcon(false)
        setSaveBtnStatus(false)
    }

    const handleSubmit = async () => {

        setLoading(true)
        var body = new FormData()
        body.append('categoryid', categoryId)
        body.append('categoryicon', categoryIcon.bytes)

        var res = await postData('category/edit_categoryicon', body)

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
            setOpenEditIcon(false)
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
        setSaveBtnStatus(false)
    }

    const categoryForm = () => {
        return (
            <div className={classes.root}>
                <div className={classes.boxEdit}>

                    <div className={classes.heading}>
                        <img className={classes.imageStyle} src='./wcll.png' alt="logo" />
                        <span className={classes.headingText}>Edit Category Icon</span>
                    </div>

                    <div className={classes.grids}>
                        <Grid container spacing={1}>

                            <Grid item xs={12}>
                                <img src={`${categoryIcon.file}`} style={{ width: 100 }} alt="ci" />
                            </Grid>

                            <Grid container spacing={1}>
                    
                                {/* <Grid size={6} className={classes.btgrid}>
                                    <Button component="label" variant="contained" fullWidth startIcon={<CloudUploadIcon />}>Upload City Image
                                        <input type="file" multiple onChange={handleImage} hidden accept="image/*" />
                                    </Button>
                                </Grid>

                                <Grid size={6} className={classes.btgrid}>
                                    <Button variant="contained" fullWidth onClick={handleClose}>Close</Button>
                                </Grid> */}

                                {saveBtnStatus ? saveCancelBtn() : resave()}
                            </Grid>
                        </Grid>
                    </div>
                </div>
            </div>
        )

    }
    return (
        <Dialog open={openEditIcon} onClose={handleClose}>
            <DialogContent>
                {categoryForm()}
            </DialogContent>
        </Dialog>
    )
}