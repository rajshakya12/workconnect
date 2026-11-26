import { Grid, Button, FormControl, InputLabel, Select, MenuItem } from "@mui/material"
import { useStyles } from "./ExpertCss"
import Swal from "sweetalert2";
import { postData, serverURL } from "../../services/FetchNodeServices"
import { Dialog, DialogContent } from "@mui/material";
import { useEffect, useState } from "react";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';


export default function EditExpertIcon({ refresh, setRefresh, rowData, openEditIcon, setOpenEditIcon }) {
    const classes = useStyles();

    const [error, setError] = useState({})
    const [expertId, setExpertId] = useState('')
    const [selectedDocType, setSelectedDocType] = useState('photograph')
    const [loading, setLoading] = useState(false)
    const [saveBtnStatus, setSaveBtnStatus] = useState(false)
    const [aadharIcon, setAadharIcon] = useState({ file: 'aadhar.png', bytes: '' })
    const [pancardIcon, setPancardIcon] = useState({ file: 'pancard.png', bytes: '' })
    const [licenseIcon, setLicenseIcon] = useState({ file: 'license.png', bytes: '' })
    const [expertPhoto, setExpertPhoto] = useState({ file: 'expert-photo.png', bytes: '' })

    const getSelectedImage = () => {
        if (selectedDocType === 'aadhar') return aadharIcon.file;
        if (selectedDocType === 'pancard') return pancardIcon.file;
        if (selectedDocType === 'license') return licenseIcon.file;
        return expertPhoto.file;
    }

    const handleImage = (e) => {
        const fileObj = { file: URL.createObjectURL(e.target.files[0]), bytes: e.target.files[0] }
        if (selectedDocType === 'aadhar') {
            setAadharIcon(fileObj)
        } else if (selectedDocType === 'pancard') {
            setPancardIcon(fileObj)
        } else if (selectedDocType === 'license') {
            setLicenseIcon(fileObj)
        } else if (selectedDocType === 'photograph') {
            setExpertPhoto(fileObj)
        }
        setSaveBtnStatus(true)
    }

    const handleCancel = () => {
        if (selectedDocType === 'aadhar') {
            setAadharIcon({ file: `${serverURL}/images/${rowData.aadharicon}`, bytes: '' })
        } else if (selectedDocType === 'pancard') {
            setPancardIcon({ file: `${serverURL}/images/${rowData.panicon}`, bytes: '' })
        } else if (selectedDocType === 'license') {
            setLicenseIcon({ file: `${serverURL}/images/${rowData.licensefile}`, bytes: '' })
        } else if (selectedDocType === 'photograph') {
            setExpertPhoto({ file: `${serverURL}/images/${rowData.photograph}`, bytes: '' })
        }
        setSaveBtnStatus(false)
        setOpenEditIcon(false)
    }

    const saveCancelBtn = () => {
        return (
            <>
                <Grid size={12}>
                    <Button onClick={handleSubmit} disabled={loading} variant="contained" fullWidth>
                        {loading ? 'Saving...' : 'Save'}
                    </Button>
                </Grid>
                <Grid size={12}>
                    <Button onClick={handleCancel} variant="contained" fullWidth>Cancel</Button>
                </Grid>
            </>
        )
    }

    const resave = () => {
        const docLabels = {
            aadhar: 'Aadhar Card',
            pancard: 'Pan Card',
            license: 'License',
            photograph: 'Expert Photo'
        }
        return (
            <>
                <Grid size={12}>
                    <Button component="label" variant="contained" fullWidth startIcon={<CloudUploadIcon />}>Upload {docLabels[selectedDocType]}
                        <input type="file" onChange={handleImage} hidden accept="image/*" />
                    </Button>
                </Grid>
                <Grid size={12}>
                    <Button variant="text" fullWidth onClick={handleClose}>Close</Button>
                </Grid>
            </>
        )
    }

    useEffect(() => {
        if (rowData && rowData.expertid) {
            setExpertId(rowData.expertid)
            console.log(rowData.aadharfile);
            
            setAadharIcon({ file: `${serverURL}/images/${rowData.aadharfile}`, bytes: '' })
            setPancardIcon({ file: `${serverURL}/images/${rowData.panfile}`, bytes: '' })
            setLicenseIcon({ file: `${serverURL}/images/${rowData.licensefile}`, bytes: '' })
            setExpertPhoto({ file: `${serverURL}/images/${rowData.photograph}`, bytes: '' })
            setSaveBtnStatus(false)
            setError({})
        }
    }, [rowData])

    const handleClose = () => {
        setOpenEditIcon(false)
        setSaveBtnStatus(false)
    }

    const handleSubmit = async () => {
        let currentIcon;

        if (selectedDocType === 'aadhar') {
            currentIcon = aadharIcon;
        } else if (selectedDocType === 'pancard') {
            currentIcon = pancardIcon;
        } else if (selectedDocType === 'license') {
            currentIcon = licenseIcon;
        } else {
            currentIcon = expertPhoto;
        }

        if (!currentIcon.bytes) {
            Swal.fire({
                position: "center",
                icon: "warning",
                title: "Please select an image to upload",
                showConfirmButton: false,
                timer: 1500
            });
            return;
        }

        setLoading(true)
        var body = new FormData()
        body.append('expertid', expertId)
        body.append('doctype', selectedDocType)

        if (selectedDocType === 'aadhar') {
            body.append('aadhar', aadharIcon.bytes)
        } else if (selectedDocType === 'pancard') {
            body.append('pan', pancardIcon.bytes)
        } else if (selectedDocType === 'license') {
            body.append('license', licenseIcon.bytes)
        } else if (selectedDocType === 'photograph') {
            body.append('photo', expertPhoto.bytes)
        }

        try {
            var res = await postData('expert/edit_experticon', body)
            setLoading(false)

            if (res.status) {
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: res.message || "Document updated successfully",
                    showConfirmButton: false,
                    timer: 1500,
                    toast: true
                });
                setSaveBtnStatus(false)
                setOpenEditIcon(false)
                setRefresh(!refresh)
            }
            else {
                Swal.fire({
                    position: "center",
                    icon: "error",
                    title: res.message || "Failed to update document",
                    showConfirmButton: false,
                    timer: 1500
                });
                setSaveBtnStatus(false)
            }
        } catch (error) {
            setLoading(false)
            Swal.fire({
                position: "center",
                icon: "error",
                title: "Network error. Please try again.",
                showConfirmButton: false,
                timer: 1500
            });
            setSaveBtnStatus(false)
        }
    }


    const handleError = (label, message) => {
        setError((prev) => ({ ...prev, [label]: message }))
    }

    const expertForm = () => {
        return (
            <div>
                <div className={classes.heading}>
                    <img className={classes.imageStyle} src='./wcll.png' alt="logo" />
                    <span className={classes.headingText}>Edit Expert Icon</span>
                </div>

                <Grid container spacing={2}>
                    <Grid size={12}>
                        <FormControl fullWidth error={!!error.docType}>
                            <InputLabel>Select Document Type</InputLabel>
                            <Select value={selectedDocType} label="Select Document Type" onChange={(e) => {
                                setSelectedDocType(e.target.value)
                                setSaveBtnStatus(false)
                            }} onFocus={() => handleError('docType', '')}
                            >
                                <MenuItem value="aadhar">Aadhar Card</MenuItem>
                                <MenuItem value="pancard">Pan Card</MenuItem>
                                <MenuItem value="license">License</MenuItem>
                                <MenuItem value="photograph">Expert Photo</MenuItem>
                            </Select>
                            {error.docType && <span style={{ color: '#d32f2f', fontSize: 12, marginLeft: 14, marginTop: 5 }}>{error.docType}</span>}
                        </FormControl>
                    </Grid>

                    <Grid size={12} style={{ display: 'flex', justifyContent: 'center', padding: '16px' }}>
                        <img src={getSelectedImage()} style={{ maxWidth: 150, maxHeight: 150, objectFit: 'contain' }} alt="docimage" />
                    </Grid>

                    {saveBtnStatus && <Grid size={12} style={{ textAlign: 'center', padding: '8px' }}>
                    </Grid>}

                    {saveBtnStatus ? saveCancelBtn() : resave()}
                </Grid>
            </div>
        )

    }
    return (
        <Dialog open={openEditIcon} onClose={handleClose} fullWidth maxWidth="sm">
            <DialogContent style={{ paddingTop: '24px' }}>
                {expertForm()}
            </DialogContent>
        </Dialog>
    )
}