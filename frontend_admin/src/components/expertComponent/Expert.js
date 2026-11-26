import { useNavigate } from "react-router"
import { useStyles } from "./ExpertCss"
import { FormControl, FormHelperText, Button, Radio, FormControlLabel, Checkbox, FormLabel, RadioGroup, InputLabel, Grid, Select, MenuItem, TextField } from "@mui/material"
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateField } from '@mui/x-date-pickers/DateField';
import { useEffect, useState } from "react"
import { postData, getData } from "../../services/FetchNodeServices";
import Swal from "sweetalert2";


export default function Expert() {

    const classes = useStyles()
    const navigate = useNavigate()

    const [error, setError] = useState({})
    const [categoryId, setCategoryId] = useState('')
    const [subcategoryId, setSubcategoryId] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [fatherName, setFatherName] = useState('')
    const [dob, setDob] = useState('')
    const [emailId, setEmailId] = useState('')
    const [mobileNo, setMobileNo] = useState('')
    const [gender, setGender] = useState('')
    const [currentAddress, setCurrentAddress] = useState('')
    const [currentStateId, setCurrentStateId] = useState('')
    const [currentCityId, setCurrentCityId] = useState('')
    const [currentPincode, setCurrentPincode] = useState('')
    const [permanentAddress, setPermanentAddress] = useState('')
    const [permanentStateId, setPermanentStateId] = useState('')
    const [permanentCityId, setPermanentCityId] = useState('')
    const [permanentPincode, setPermanentPincode] = useState('')
    const [aadhar, setAadhar] = useState('')
    const [pancard, setPancard] = useState('')
    const [aadharIcon, setAadharIcon] = useState({ file: "aadhar.png", bytes: '' })
    const [panIcon, setPanIcon] = useState({ file: "pancard.png", bytes: '' })
    const [licenseFile, setLicenseFile] = useState({ file: "license.png", bytes: '' })
    const [photoIcon, setPhotoIcon] = useState({ file: "expert-photo.png", bytes: '' })
    const [vehicleno, setVehicleno] = useState('')
    const [vehicleType, setVehicleType] = useState('')
    const [licenseno, setLicenseno] = useState('')
    const [categoryList, setCategoryList] = useState([])
    const [subcategoryList, setSubcategoryList] = useState([])
    const [currentStateList, setCurrentStateList] = useState([])
    const [statePermanentList, setStatePermanentList] = useState([])
    const [currentCityList, setCurrentCityList] = useState([])
    const [permanentCityList, setPermanentCityList] = useState([])

    const [loading, setLoading] = useState(false)

    const [checked, setChecked] = useState(false);

    const handleChange = (event) => {
        setChecked(event.target.checked);
        if (event.target.checked) {
            copyCurrentToPermanent()
            fetchAllPermanentCities(currentStateId)
        }
    };

    useEffect(() => {
        fetchAllCategory()
        fetchAllCurrentStates()
        fetchAllPermanentStates()
    }, [])

    const handleCategoryChange = (e) => {
        setCategoryId(e.target.value);
        fetchAllSubcategory(e.target.value)
    };

    const handleCurrentStateChange = (e) => {
        setCurrentStateId(e.target.value);
        fetchAllCurrentCities(e.target.value)
    }
    const handlePermanentStateChange = (e) => {
        setPermanentStateId(e.target.value);
        fetchAllPermanentCities(e.target.value)
    }


    // Fetching
    const fetchAllCategory = async () => {
        const res = await getData('expert/fetch_all_category');
        setCategoryList(res.data)
    }
    const fetchAllSubcategory = async (cid) => {
        const res = await postData('expert/fetch_all_subcategory', { catid: cid });
        setSubcategoryList(res.data)
    }
    const fetchAllCurrentStates = async () => {
        const res = await getData('expert/fetch_all_states');
        setCurrentStateList(res.data)
    }
    const fetchAllPermanentStates = async () => {
        const res = await getData('expert/fetch_all_states');
        setStatePermanentList(res.data)
    }
    const fetchAllCurrentCities = async (sid) => {

        const res = await postData('expert/fetch_all_cities', { stateid: sid });
        setCurrentCityList(res.data)
    }
    const fetchAllPermanentCities = async (sid) => {
        const res = await postData('expert/fetch_all_cities', { stateid: sid });
        setPermanentCityList(res.data)
    }

    // Filling
    const fillCategory = () => {
        return categoryList.map((item) => {
            return <MenuItem key={item.categoryid} value={item.categoryid}>{item.categoryname}</MenuItem>
        })
    }
    const fillSubcategory = () => {
        return (subcategoryList.map((item) => {
            return <MenuItem key={item.subcategoryid} value={item.subcategoryid}>{item.subcategoryname}</MenuItem>
        }))
    }
    const fillStates = () => {
        return (currentStateList.map((item) => {
            return <MenuItem key={item.stateid} value={item.stateid} >{item.statename}</MenuItem>
        }))
    }
    const fillPermanentStates = () => {
        return (statePermanentList.map((item) => {
            return <MenuItem key={item.stateid} value={item.stateid}>{item.statename}</MenuItem>
        }))
    }
    const fillCities = () => {
        return (currentCityList.map((item) => {
            return <MenuItem key={item.cityid} value={item.cityid}>{item.cityname}</MenuItem>
        }))
    }
    const fillPermanentCities = () => {
        return (permanentCityList.map((item) => {
            return <MenuItem key={item.cityid} value={item.cityid}>{item.cityname}</MenuItem>
        }))
    }


    const copyCurrentToPermanent = () => {
        setPermanentAddress(currentAddress)
        setPermanentStateId(currentStateId)
        setPermanentCityId(currentCityId)
        setPermanentPincode(currentPincode)
        // fetchAllpermanentCities(currentStateId)
    }

    const handleSubmit = async () => {
        var status = validate();

        if (!status) {
            setLoading(true)

            var body = new FormData()
            body.append("categoryid", categoryId)
            body.append("subcategoryid", subcategoryId)
            body.append("firstname", firstName)
            body.append("lastname", lastName)
            body.append("fathername", fatherName)
            body.append("dob", dob ? dob.format('YYYY-MM-DD') : '')
            body.append("emailid", emailId)
            body.append("mobileno", mobileNo)
            body.append("gender", gender)
            body.append("currentaddress", currentAddress)
            body.append("currentstate", currentStateId)
            body.append("currentcity", currentCityId)
            body.append("currentpincode", currentPincode)

            body.append("permanentaddress", permanentAddress)
            body.append("permanentstate", permanentStateId)
            body.append("permanentcity", permanentCityId)
            body.append("permanentpincode", permanentPincode)

            body.append("aadharid", aadhar)
            body.append("panno", pancard)

            body.append("vehicleno", vehicleno)
            body.append("vehicletype", vehicleType)
            body.append("licenseno", licenseno)

            body.append("aadharfile", aadharIcon.bytes)
            body.append("panfile", panIcon.bytes)
            body.append("licensefile", licenseFile.bytes)
            body.append("photograph", photoIcon.bytes)

            var res = await postData('expert/add_new_expert', body)
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
    // const handleError = (label, message) => {
    //     setError((prev) => ({ ...prev, [label]: message }))
    // }

    const validate = () => {
        var errorVal = {}
        var error = false


        if (!categoryId) {
            errorVal.category = "Select Category"
            error = true
        }
        if (!subcategoryId) {
            errorVal.subcategory = "Select Subcategory"
            error = true
        }
        if (!firstName?.trim()) {
            errorVal.firstName = "Enter First Name"
            error = true
        }
        if (!lastName) {
            errorVal.lastName = "Enter Last Name"
            error = true
        }
        if (!fatherName) {
            errorVal.fatherName = "Enter Father's Name"
            error = true
        }
        if (!dob) {
            errorVal.dob = "Enter DOB"
            error = true
        }
        if (!emailId.includes('@')) {
            errorVal.email = "Enter Email"
            error = true
        }
        if (!mobileNo) {
            errorVal.mobileNo = "Enter Mobile No"
            error = true
        }
        if (!gender) {
            errorVal.gender = "Select Gender"
            error = true
        }
        if (!currentAddress) {
            errorVal.currentAddress = "Enter current Address"
            error = true
        }
        if (!currentStateId) {
            errorVal.currentState = "Select current State"
            error = true
        }
        if (!currentCityId) {
            errorVal.currentCity = "Select current City"
            error = true
        }
        if (!currentPincode) {
            errorVal.currentPincode = "Enter Pincode"
            error = true
        }
        // if (!permanentAddress) {
        //         errorVal.currentAddress = "Enter permanentmanent Address"
        //         error = true
        //     }
        // if (!permanentState) {
        //     errorVal.currentState = "Select permanentmanent State"
        //     error = true
        // }
        // if (!permanentCity) {
        //     errorVal.currentCity = "Select permanentmanent City"
        //     error = true
        // }
        // if (!permanentPincode) {
        //     errorVal.currentPincode = "Enter Pincode"
        //     error = true
        // }
        if (!aadhar) {
            errorVal.aadhar = "Enter Aadhar No"
            error = true
        }
        if (!pancard) {
            errorVal.pancard = "Enter Pan No"
            error = true
        }
        if (!checked) {
            if (!permanentStateId) {
                errorVal.permanentState = "Select permanentmanent State"
                error = true
            }
            if (!permanentCityId) {
                errorVal.permanentCity = "Select permanentmanent City"
                error = true
            }
            if (!permanentAddress) {
                errorVal.permanentAddress = "Enter permanentmanent Address"
                error = true
            }
            if (!permanentPincode) {
                errorVal.permanentPincode = "Enter permanentmanent Pincode"
                error = true
            }
        }

        if (!vehicleno) {
            errorVal.vehicleno = "Enter Vehicle No"
            error = true
        }
        if (!vehicleType) {
            errorVal.vehicleType = "Enter Vehicle Type"
            error = true
        }
        if (!licenseno) {
            errorVal.licenseno = "Enter License No"
            error = true
        }

        if (!aadharIcon.bytes) {
            errorVal.aadharIcon = "Upload Aadhar"
            error = true
        }
        if (!panIcon.bytes) {
            errorVal.panIcon = "Upload Pan"
            error = true
        }
        if (!licenseFile.bytes) {
            errorVal.licenseFile = "Upload License"
            error = true
        }
        if (!photoIcon.bytes) {
            errorVal.photoIcon = "Upload Photo"
            error = true
        }
        console.log(error, errorVal);


        setError(errorVal)

        return error
    }


    const handleReset = () => {

        setCategoryId('')
        setSubcategoryId('')
        setFirstName('')
        setLastName('')
        setFatherName('')
        setDob('')
        setEmailId('')
        setMobileNo('')

        setCurrentAddress('')
        setCurrentStateId('')
        setCurrentCityId('')
        setCurrentPincode('')

        setPermanentAddress('')
        setPermanentStateId('')
        setPermanentCityId('')
        setPermanentPincode('')

        setAadhar('')
        setPancard('')
        setVehicleno('')
        setLicenseno('')

        setAadharIcon({ file: "aadhar.png", bytes: '' })
        setPanIcon({ file: "pancard.png", bytes: '' })
        setPhotoIcon({ file: "expermanentt-photo.png", bytes: '' })

        setError('')
    }

    const handleAadhar = (e) => {
        setAadharIcon({ file: URL.createObjectURL(e.target.files[0]), bytes: e.target.files[0] })
    }

    const handlePan = (e) => {
        setPanIcon({ file: URL.createObjectURL(e.target.files[0]), bytes: e.target.files[0] })
    }
    const handleLicense = (e) => {
        setLicenseFile({ file: URL.createObjectURL(e.target.files[0]), bytes: e.target.files[0] })
    }

    const handlePhoto = (e) => {
        setPhotoIcon({ file: URL.createObjectURL(e.target.files[0]), bytes: e.target.files[0] })
    }


    return (
        <div className={classes.root}>
            <div className={classes.box}>

                <div className={classes.heading}>
                    <img className={classes.imageStyle} src="./wcll.png" alt="logo" />
                    <span className={classes.headingText}>Expert Interface</span>
                    <img className={classes.imageStyle} src="/report.png" onClick={() => navigate('/displayallexpert')} alt="report" />
                </div>

                <div className={classes.grids}>
                    <Grid container spacing={2}>

                        <Grid size={3}>
                            <FormControl fullWidth error={error.category}>
                                <InputLabel>Category Code</InputLabel>
                                <Select onChange={handleCategoryChange} value={categoryId} label="Category Code">
                                    <MenuItem value="">--Select Category--</MenuItem>
                                    {fillCategory()}
                                </Select>
                                <FormHelperText>
                                    {error.category}
                                </FormHelperText>
                            </FormControl>
                            {/* {error.category && <span style={{ color: "red" }}>{error.category}</span>} */}
                        </Grid>

                        <Grid size={3}>
                            <FormControl fullWidth error={error.subcategory}>
                                <InputLabel>SubCategory Code</InputLabel>
                                <Select onChange={(e) => setSubcategoryId(e.target.value)} value={subcategoryId} label="SubCategory Code" >
                                    <MenuItem value="">--Select SubCategory--</MenuItem>
                                    {fillSubcategory()}
                                </Select>
                                <FormHelperText>
                                    {error.subcategory}
                                </FormHelperText>
                            </FormControl>
                        </Grid>

                        <Grid size={3}>
                            <TextField onChange={(e) => setFirstName(e.target.value)} label="First Name" value={firstName} fullWidth error={error.firstName}
                                helperText={error.firstName ? error.firstName : ''} />
                        </Grid>

                        <Grid size={3}>
                            <TextField onChange={(e) => setLastName(e.target.value)} label="Last Name" value={lastName} fullWidth error={error.lastName}
                                helperText={error.lastName ? error.lastName : ''} />
                        </Grid>

                        <Grid size={3}>
                            <TextField onChange={(e) => setFatherName(e.target.value)} label="Father's Name" value={fatherName} fullWidth error={error.fatherName}
                                helperText={error.fatherName ? error.fatherName : ''} />
                        </Grid>

                        <Grid size={3}>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DateField label="Date of Birth"
                                    onChange={(e) => setDob(e)}
                                    // defaultValue={dayjs('2022-04-17')} 
                                    fullWidth error={error.dob} />
                                {error.dob && (
                                    <FormHelperText style={{ color: "red" }}>
                                        {error.dob}
                                    </FormHelperText>
                                )}
                            </LocalizationProvider>
                        </Grid>
                        <Grid size={3} >
                            <TextField
                                label="Email Address"
                                type="email"
                                variant="outlined"
                                value={emailId}
                                onChange={(e) => setEmailId(e.target.value)}
                                error={error.email}
                                helperText={error.email}
                                fullWidth
                            />
                        </Grid>

                        <Grid size={3}>
                            <TextField onChange={(e) => setMobileNo(e.target.value)} label="Mobile No" value={mobileNo} fullWidth error={error.mobileNo}
                                helperText={error.mobileNo ? error.mobileNo : ''} />
                        </Grid>

                        <Grid size={12} >
                            <FormControl error={error.gender}>
                                <FormLabel id="demo-row-radio-buttons-group-label">Gender</FormLabel>
                                <RadioGroup row aria-labelledby="demo-row-radio-buttons-group-label" name="row-radio-buttons-group" onChange={(e) => setGender(e.target.value)} value={gender}>
                                    <FormControlLabel value="female" control={<Radio size="small" style={{ padding: '4px 9px' }} />} label="Female" />
                                    <FormControlLabel value="male" control={<Radio size="small" style={{ padding: '4px 9px' }} />} label="Male" />
                                    <FormControlLabel value="other" control={<Radio size="small" style={{ padding: '4px 9px' }} />} label="Other" />
                                </RadioGroup>
                                {error.gender && (
                                    <FormHelperText>{error.gender}</FormHelperText>
                                )}
                            </FormControl>
                        </Grid>


                        {/* current Address */}
                        <Grid size={3}>
                            <TextField onChange={(e) => {
                                setCurrentAddress(e.target.value)
                                if (checked) {
                                    setPermanentAddress(e.target.value)
                                }

                            }} label="Current Address" value={currentAddress} fullWidth error={error.currentAddress}
                                helperText={error.currentAddress ? error.currentAddress : ''} />
                        </Grid>
                        <Grid size={3}>
                            <FormControl fullWidth error={error.currentState}>
                                <InputLabel>State</InputLabel>
                                <Select onChange={(e) => {
                                    handleCurrentStateChange(e);
                                    if (checked) {
                                        setPermanentStateId(e.target.value)
                                        fetchAllPermanentCities(e.target.value)
                                    }
                                }} value={currentStateId} label="State" >
                                    <MenuItem value="">--Select State--</MenuItem>
                                    {fillStates()}
                                </Select>
                                <FormHelperText>
                                    {error.currentState}
                                </FormHelperText>
                            </FormControl>
                            {/* {error.currentState && <span style={{ color: "red" }}>{error.currentState}</span>} */}
                        </Grid>
                        <Grid size={3}>
                            <FormControl fullWidth error={error.currentCity}>
                                <InputLabel>City</InputLabel>
                                <Select onChange={(e) => {
                                    setCurrentCityId(e.target.value)
                                    if (checked) {
                                        setPermanentCityId(e.target.value)
                                    }
                                }} value={currentCityId} label="City" >
                                    <MenuItem value="">--Select City--</MenuItem>
                                    {fillCities()}
                                </Select>
                                <FormHelperText>
                                    {error.currentCity}
                                </FormHelperText>
                            </FormControl>
                            {/* {error.currentCity && <span style={{ color: "red" }}>{error.currentCity}</span>} */}
                        </Grid>

                        <Grid size={3}>
                            <TextField onChange={(e) => {
                                setCurrentPincode(e.target.value)
                                if (checked) {
                                    setPermanentPincode(e.target.value)
                                }
                            }} label="Pincode" value={currentPincode} fullWidth error={error.currentPincode}
                                helperText={error.currentPincode ? error.currentPincode : ''} />
                        </Grid>

                        <Grid size={12}>
                            <FormControlLabel control={<Checkbox checked={checked}
                                onChange={handleChange} />} label="Same as current Address" />

                        </Grid>


                        {/* permanent Address */}
                        <Grid size={3}>
                            <TextField disabled={checked} onChange={(e) => setPermanentAddress(e.target.value)} label="Permanent Address" value={permanentAddress} fullWidth error={error.permanentAddress}
                                helperText={error.permanentAddress ? error.permanentAddress : ''} />
                        </Grid>
                        <Grid size={3}>
                            <FormControl fullWidth error={error.permanentState}>
                                <InputLabel>State</InputLabel>
                                <Select disabled={checked} onChange={(e) => handlePermanentStateChange(e)} value={permanentStateId} label="State" >
                                    <MenuItem value="">--Select State--</MenuItem>
                                    {fillPermanentStates()}
                                </Select>
                                <FormHelperText>
                                    {error.permanentState}
                                </FormHelperText>
                            </FormControl>

                            {/* {error.permanentState && <span style={{ color: "red" }}>{error.permanentState}</span>} */}
                        </Grid>
                        <Grid size={3}>
                            <FormControl fullWidth error={error.permanentCity}>
                                <InputLabel>City</InputLabel>
                                <Select disabled={checked} onChange={(e) => setPermanentCityId(e.target.value)} value={permanentCityId} label="City" >
                                    <MenuItem value="">--Select City--</MenuItem>
                                    {fillPermanentCities()}

                                </Select>
                                <FormHelperText>
                                    {error.permanentCity}
                                </FormHelperText>
                            </FormControl>
                            {/* {error.permanentCity && <span style={{ color: "red" }}>{error.permanentCity}</span>} */}
                        </Grid>

                        <Grid size={3}>
                            <TextField disabled={checked} onChange={(e) => setPermanentPincode(e.target.value)} label="Pincode" value={permanentPincode} fullWidth error={error.permanentPincode}
                                helperText={error.permanentPincode ? error.permanentPincode : ''} />
                        </Grid>

                        {/* Aadhar */}
                        <Grid size={4}>
                            <TextField onChange={(e) => setAadhar(e.target.value)} label="Aadhar No" value={aadhar} fullWidth error={error.aadhar}
                                helperText={error.aadhar ? error.aadhar : ''} />
                        </Grid>
                        <Grid size={4} className={classes.center}>
                            <Button startIcon={<CloudUploadIcon />} component="label" variant="contained" fullWidth >Upload Aadhar
                                <input type="file" onChange={handleAadhar} hidden accept="image/*"></input>
                            </Button>
                            <span className={classes.errorTextStyle}>
                                {error.aadharIcon}
                            </span>
                        </Grid>
                        <Grid size={4} className={classes.center}>
                            <img src={aadharIcon.file} width="40px" height="40px" alt="aadhaaricon" />
                        </Grid>

                        {/* Pancard */}
                        <Grid size={4}>
                            <TextField onChange={(e) => setPancard(e.target.value)} label="Pancard No" value={pancard} fullWidth error={error.pancard}
                                helperText={error.pancard ? error.pancard : ''} />
                        </Grid>
                        <Grid size={4} className={classes.center}>
                            <Button startIcon={<CloudUploadIcon />} component="label" variant="contained" fullWidth >Upload Pan
                                <input type="file" onChange={handlePan} hidden accept="image/*"></input>
                            </Button>
                            <span className={classes.errorTextStyle}>
                                {error.panIcon}
                            </span>
                        </Grid>
                        <Grid size={4} className={classes.center}>
                            <img src={panIcon.file} width="40px" height="40px" alt="panicon" />
                        </Grid>


                        {/* License */}
                        <Grid size={4}>
                            <TextField onChange={(e) => setLicenseno(e.target.value)} label="License No" value={licenseno} fullWidth error={error.licenseno}
                                helperText={error.licenseno ? error.licenseno : ''} />
                        </Grid>
                        <Grid size={4} className={classes.center}>
                            <Button startIcon={<CloudUploadIcon />} component="label" variant="contained" fullWidth >Upload License
                                <input type="file" onChange={handleLicense} hidden accept="image/*"></input>
                            </Button>
                            <span className={classes.errorTextStyle}>
                                {error.licenseFile}
                            </span>
                        </Grid>
                        <Grid size={4} className={classes.center}>
                            <img src={licenseFile.file} width="40px" height="40px" alt="licenseimage" />
                        </Grid>

                        {/* Vehicle No and License No */}
                        <Grid size={6}>
                            <TextField onChange={(e) => setVehicleno(e.target.value)} label="Vehicle No" value={vehicleno} fullWidth error={error.vehicleno}
                                helperText={error.vehicleno ? error.vehicleno : ''} />
                        </Grid>
                        <Grid size={6}>
                            <TextField onChange={(e) => setVehicleType(e.target.value)} label="Vehicle Type" value={vehicleType} fullWidth error={error.vehicleType}
                                helperText={error.vehicleType ? error.vehicleType : ''} />
                        </Grid>



                        {/* Expermanentt photo */}
                        <Grid size={6} className={classes.center}>
                            <Button startIcon={<CloudUploadIcon />} component="label" variant="contained" fullWidth >Upload Expermanentt Photo
                                <input type="file" onChange={handlePhoto} hidden accept="image/*"></input>
                            </Button>
                            <span className={classes.errorTextStyle}>
                                {error.photoIcon}
                            </span>
                        </Grid>
                        <Grid size={6} className={classes.center}>
                            <img src={photoIcon.file} width="40px" height="40px" alt="photoicon" />
                        </Grid>

                        <Grid className={classes.btgrid} size={6}>
                            <Button className={classes.btns} disabled={loading} onClick={handleSubmit} variant="contained">Save</Button>
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