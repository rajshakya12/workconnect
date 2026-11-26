import { FormControl, FormHelperText, Button, Radio, FormControlLabel, Checkbox, FormLabel, RadioGroup, InputLabel, Grid, Select, MenuItem, TextField, Dialog, DialogContent } from "@mui/material";
import { useStyles } from "./ExpertCss";
import { useState, useEffect } from "react";
import { getData, postData } from "../../services/FetchNodeServices";
// import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import Swal from "sweetalert2";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateField } from "@mui/x-date-pickers/DateField";
import dayjs from "dayjs";

export default function EditExpert({ refresh, setRefresh, rowData, openEdit, setOpenEdit,
}) {
  const classes = useStyles();

  const [expertId, setExpertId] = useState('')
  const [error, setError] = useState({})
  const [categoryId, setCategoryId] = useState('')
  const [subcategoryId, setSubcategoryId] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [fatherName, setFatherName] = useState('')
  const [dob, setDob] = useState('')
  const [email, setEmail] = useState('')
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

  const [vehicleno, setVehicleno] = useState('')
  const [vehicleType, setVehicleType] = useState('')
  const [licenseno, setLicenseno] = useState('')
  const [categoryList, setCategoryList] = useState([])
  const [subcategoryList, setSubcategoryList] = useState([])
  const [stateList, setStateList] = useState([])
  const [statePermanentList, setStatePermanentList] = useState([])
  const [cityList, setCityList] = useState([])
  const [permanentCityList, setPermanentCityList] = useState([])

  const [loading, setLoading] = useState(false)

  const [checked, setChecked] = useState(false);

  const copyCurrentToPermanent = () => {
    setPermanentAddress(currentAddress)
    setPermanentStateId(currentStateId)
    setPermanentCityId(currentCityId)
    setPermanentPincode(currentPincode)
    // fetchAllpermanentCities(currentStateId)
  }

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

  useEffect(() => {
    fetchAllCategory();
    fetchAllSubcategory(rowData.categoryid);

    fetchAllCurrentStates();
    fetchAllCurrentCities(rowData.currentstate);
    fetchAllPermanentStates();
    fetchAllPermanentCities(rowData.permanentstate);

    setExpertId(rowData.expertid);
    setCategoryId(rowData.categoryid);
    setSubcategoryId(rowData.subcategoryid);
    setFirstName(rowData.firstname);
    setLastName(rowData.lastname);
    setFatherName(rowData.fathername);
    console.log(dayjs(rowData.dob).format("YYYY-MM-DD"));
    setDob(dayjs(rowData.dob).format("YYYY-MM-DD"));
    setGender(rowData.gender);
    setEmail(rowData.emailid);
    setMobileNo(rowData.mobileno);

    setCurrentAddress(rowData.currentaddress);
    setCurrentStateId(rowData.currentstate);
    setCurrentCityId(rowData.currentcity);
    setCurrentPincode(rowData.currentpincode);

    setPermanentAddress(rowData.permanentaddress);
    setPermanentStateId(rowData.permanentstate);
    setPermanentCityId(rowData.permanentcity);
    setPermanentPincode(rowData.permanentpincode);

    setAadhar(rowData.aadharid);
    setPancard(rowData.panno);
    setVehicleno(rowData.vehicleno);
    setVehicleType(rowData.vehicletype);
    setLicenseno(rowData.licenseno);
  }, [rowData]);

  useEffect(() => {
    if (checked) {
      fetchAllPermanentCities(currentStateId);
    }
  }, [currentStateId, checked]);

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
    setStateList(res.data)
  }
  const fetchAllPermanentStates = async () => {
    const res = await getData('expert/fetch_all_states');
    setStatePermanentList(res.data)
  }
  const fetchAllCurrentCities = async (sid) => {

    const res = await postData('expert/fetch_all_cities', { stateid: sid });
    setCityList(res.data)
  }
  const fetchAllPermanentCities = async (sid) => {
    const res = await postData('expert/fetch_all_cities', { stateid: sid });
    setPermanentCityList(res.data)
  }

  // Filling
  const fillCategory = () => {
    return (categoryList.map((item) => {
      return <MenuItem key={item.categoryid} value={item.categoryid}>{item.categoryname}</MenuItem>
    }))
  }
  const fillSubcategory = () => {
    return (subcategoryList.map((item) => {
      return <MenuItem key={item.subcategoryid} value={item.subcategoryid}>{item.subcategoryname}</MenuItem>
    }))
  }
  const fillStates = () => {
    return (stateList.map((item) => {
      return <MenuItem key={item.stateid} value={item.stateid} >{item.statename}</MenuItem>
    }))
  }
  const fillPermanentStates = () => {
    return (statePermanentList.map((item) => {
      return <MenuItem key={item.stateid} value={item.stateid}>{item.statename}</MenuItem>
    }))
  }
  const fillCities = () => {
    return (cityList.map((item) => {
      return <MenuItem key={item.cityid} value={item.cityid}>{item.cityname}</MenuItem>
    }))
  }
  const fillPermanentCities = () => {
    return (permanentCityList.map((item) => {
      return <MenuItem key={item.cityid} value={item.cityid}>{item.cityname}</MenuItem>
    }))
  }

  const handleError = (label, message) => {
    setError((prev) => ({ ...prev, [label]: message }));
  };

  const validate = () => {
    var error = false;

    if (!categoryId) {
      handleError("categoryId", "Required");
      error = true;
    }
    if (!subcategoryId) {
      handleError("subcategoryId", "Required");
      error = true;
    }
    if (!firstName) {
      handleError("firstName", "Required");
      error = true;
    }
    if (!lastName) {
      handleError("lastName", "Required");
      error = true;
    }
    if (!fatherName) {
      handleError("fatherName", "Required");
      error = true;
    }
    if (!dob) {
      handleError("dob", "Required");
      error = true;
    }
    if (!gender) {
      handleError("gender", "Required");
      error = true;
    }
    if (!email) {
      handleError("email", "Required");
      error = true;
    }
    if (!mobileNo) {
      handleError("mobileno", "Required");
      error = true;
    }
    if (!currentAddress) {
      handleError("currentAddress", "Required");
      error = true;
    }
    if (!currentStateId) {
      handleError("currentState", "Required");
      error = true;
    }
    if (!currentCityId) {
      handleError("currentCity", "Required");
      error = true;
    }
    if (!currentPincode) {
      handleError("currentPincode", "Required");
      error = true;
    }
    if (!permanentAddress) {
      handleError("permanentAddress", "Required");
      error = true;
    }
    if (!permanentStateId) {
      handleError("permanentState", "Required");
      error = true;
    }
    if (!permanentCityId) {
      handleError("permanentCity", "Required");
      error = true;
    }
    if (!permanentPincode) {
      handleError("permanentPincode", "Required");
      error = true;
    }
    if (!aadhar) {
      handleError("aadhar", "Required");
      error = true;
    }
    if (!pancard) {
      handleError("pancard", "Required");
      error = true;
    }
    if (!vehicleno) {
      handleError("vehicleno", "Required");
      error = true;
    }
    if (!vehicleType) {
      handleError("vehicleType", "Required");
      error = true;
    }
    if (!licenseno) {
      handleError("licenseno", "Required");
      error = true;
    }
    if (!checked) {
      if (!permanentStateId) {
        error.permanentState = "Select Permanent State";
        error = true;
      }
      if (!permanentCityId) {
        error.permanentCity = "Select Permanent City";
        error = true;
      }
      if (!permanentAddress) {
        error.permanentAddress = "Enter Permanent Address";
        error = true;
      }
      if (!permanentPincode) {
        error.permanentPincode = "Enter Permanent Pincode";
        error = true;
      }
    }

    return error;
  };

  const handleSubmit = async () => {
    var status = validate();

    if (status === false) {
      setLoading(true)
      var body = new FormData();

      body.append("expertid", expertId);
      body.append("categoryid", categoryId);
      body.append("subcategoryid", subcategoryId);
      body.append("firstname", firstName);
      body.append("lastname", lastName);
      body.append("fathername", fatherName);
      body.append("dob", dob);
      body.append("emailid", email);
      body.append("mobileno", mobileNo);
      body.append("gender", gender);

      body.append("currentaddress", currentAddress);
      body.append("currentstate", currentStateId);
      body.append("currentcity", currentCityId);
      body.append("currentpincode", currentPincode);

      body.append("permanentaddress", permanentAddress);
      body.append("permanentstate", permanentStateId);
      body.append("permanentcity", permanentCityId);
      body.append("permanentpincode", permanentPincode);

      body.append("aadharid", aadhar);
      body.append("pancardno", pancard);

      body.append("vehicleno", vehicleno);
      body.append("vehicletype", vehicleType);
      body.append("licenseno", licenseno);

      // if (aadharIcon.bytes) body.append("aadhar", aadharIcon.bytes);
      // if (panIcon.bytes) body.append("pan", panIcon.bytes);
      // if (licenseFile.bytes) body.append("license", licenseFile.bytes);
      // if (photoIcon.bytes) body.append("photo", photoIcon.bytes);

      setLoading(true);
      var res = await postData("expert/edit_expert", body);
      setLoading(false);

      if (res.status) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: res.message,
          showConfirmButton: false,
          timer: 1500,
          toast: true,
        });
        setLoading(false);
        setOpenEdit(false);
        setRefresh(!refresh);
      } else {
        Swal.fire({
          position: "center",
          icon: "error",
          title: res.message,
          showConfirmButton: false,
          timer: 1500,
        });
      }
    }
  };
  const handleClose = () => {
    setOpenEdit(false);
  };


  const handleChange = (event) => {
    setChecked(event.target.checked);
    if (event.target.checked) {
      copyCurrentToPermanent();
      fetchAllPermanentCities(currentStateId);
    }
  };

  const expertForm = () => {
    return (
      <div className={classes.root}>
        <div className={classes.boxEdit}>
          <div className={classes.heading}>
            <img className={classes.imageStyle} src="./wcll.png" alt="logo" />
            <span className={classes.headingText}>Edit Expert</span>
          </div>

          <div className={classes.grids}>
            <Grid container spacing={2}>
              <Grid size={3}>
                <FormControl fullWidth error={!!error.categoryId}>
                  <InputLabel>Category Code</InputLabel>
                  <Select onChange={handleCategoryChange} value={categoryId} label="Category Code">
                    <MenuItem value="">--Select Category--</MenuItem>
                    {fillCategory()}
                  </Select>
                  <FormHelperText>
                    {error.categoryId}
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
                    value={dayjs(dob)}
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
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  error={error.email}
                  helperText={error.email}
                  fullWidth
                />
              </Grid>

              <Grid size={3}>
                <TextField onChange={(e) => setMobileNo(e.target.value)} label="Mobile No" value={mobileNo} fullWidth error={error.mobileno}
                  helperText={error.mobileno ? error.mobileno : ''} />
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


              {/* Current Address */}
              <Grid size={3}>
                <TextField onChange={(e) => {
                  setCurrentAddress(e.target.value)
                  if (checked) {
                    setPermanentAddress(e.target.value)
                  }

                }} label="Current Address" value={currentAddress} fullWidth error={error.currAddress}
                  helperText={error.currAddress ? error.currAddress : ''} />
              </Grid>
              <Grid size={3}>
                <FormControl fullWidth error={error.currState}>
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
                    {error.currState}
                  </FormHelperText>
                </FormControl>
                {/* {error.currState && <span style={{ color: "red" }}>{error.currState}</span>} */}
              </Grid>
              <Grid size={3}>
                <FormControl fullWidth error={error.currCity}>
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
                    {error.currCity}
                  </FormHelperText>
                </FormControl>
                {/* {error.currCity && <span style={{ color: "red" }}>{error.currCity}</span>} */}
              </Grid>

              <Grid size={3}>
                <TextField onChange={(e) => {
                  setCurrentPincode(e.target.value)
                  if (checked) {
                    setPermanentPincode(e.target.value)
                  }
                }} label="Pincode" value={currentPincode} fullWidth error={error.currPincode}
                  helperText={error.currPincode ? error.currPincode : ''} />
              </Grid>

              <Grid size={12}>
                <FormControlLabel control={<Checkbox checked={checked}
                  onChange={handleChange} />} label="Same as Current Address" />

              </Grid>


              {/* Permanent Address */}
              <Grid size={3}>
                <TextField disabled={checked} onChange={(e) => setPermanentAddress(e.target.value)} label="Permanent Address" value={permanentAddress} fullWidth error={error.perAddress}
                  helperText={error.perAddress ? error.perAddress : ''} />
              </Grid>
              <Grid size={3}>
                <FormControl fullWidth error={error.perState}>
                  <InputLabel>State</InputLabel>
                  <Select disabled={checked} onChange={(e) => handlePermanentStateChange(e)} value={permanentStateId} label="State" >
                    <MenuItem value="">--Select State--</MenuItem>
                    {fillPermanentStates()}
                  </Select>
                  <FormHelperText>
                    {error.perState}
                  </FormHelperText>
                </FormControl>

                {/* {error.perState && <span style={{ color: "red" }}>{error.perState}</span>} */}
              </Grid>
              <Grid size={3}>
                <FormControl fullWidth error={error.perCity}>
                  <InputLabel>City</InputLabel>
                  <Select disabled={checked} onChange={(e) => setPermanentCityId(e.target.value)} value={permanentCityId} label="City" >
                    <MenuItem value="">--Select City--</MenuItem>
                    {fillPermanentCities()}

                  </Select>
                  <FormHelperText>
                    {error.perCity}
                  </FormHelperText>
                </FormControl>
                {/* {error.perCity && <span style={{ color: "red" }}>{error.perCity}</span>} */}
              </Grid>

              <Grid size={3}>
                <TextField disabled={checked} onChange={(e) => setPermanentPincode(e.target.value)} label="Pincode" value={permanentPincode} fullWidth error={error.perPincode}
                  helperText={error.perPincode ? error.perPincode : ''} />
              </Grid>


              {/* Aadhar */}
              <Grid size={4}>
                <TextField onChange={(e) => setAadhar(e.target.value)} label="Aadhar No" value={aadhar} fullWidth />
              </Grid>
              {/* <Grid size={4} className={classes.center}>
                <Button startIcon={<CloudUploadIcon />} component="label" variant="contained" fullWidth>
                  Edit Aadhar Card
                  <input type="file" onChange={handleAadhar} hidden accept="image/*" ></input>
                </Button>
                <span className={classes.errorTextStyle}> {error.aadharIcon} </span>
              </Grid>
              <Grid size={4} className={classes.center}>
                <img src={aadharIcon.file} width="40px" height="40px" alt="aadhaaricon" />
              </Grid> */}

              {/* Pancard */}
              <Grid size={4}>
                <TextField onChange={(e) => setPancard(e.target.value)} label="Pancard No" value={pancard} fullWidth />
              </Grid>
              {/* <Grid size={4} className={classes.center}>
                <Button startIcon={<CloudUploadIcon />} component="label" variant="contained" fullWidth >
                  Edit Pan Card
                  <input type="file" onChange={handlePan} hidden accept="image/*" ></input>
                </Button>
                <span className={classes.errorTextStyle}> {error.panIcon} </span>
              </Grid>
              <Grid size={4} className={classes.center}>
                <img src={panIcon.file} width="40px" height="40px" alt="panicon" />
              </Grid> */}

              {/* License */}
              <Grid size={4}>
                <TextField onChange={(e) => setLicenseno(e.target.value)} label="License No" value={licenseno} fullWidth />
              </Grid>
              {/* <Grid size={4} className={classes.center}>
                <Button startIcon={<CloudUploadIcon />} component="label" variant="contained" fullWidth>
                  Edit License
                  <input type="file" onChange={handleLicense} hidden accept="image/*" ></input>
                </Button>
                <span className={classes.errorTextStyle}> {error.licenseFile} </span>
              </Grid>
              <Grid size={4} className={classes.center}>
                <img src={licenseFile.file} width="40px" height="40px" alt="panicon" />
              </Grid> */}

              {/* Vehicle No and License No */}
              <Grid size={3}>
                <TextField onChange={(e) => setVehicleno(e.target.value)} label="Vehicle No" value={vehicleno} fullWidth />
              </Grid>
              {/* <Grid size={3}>
                <TextField onChange={(e) => setVehicleType(e.target.value)} label="Vehicle Type" value={vehicleType} fullWidth />
              </Grid>


              <Grid size={3} className={classes.center}>
                <Button startIcon={<CloudUploadIcon />} component="label" variant="contained" fullWidth >
                  Edit Expert Photo
                  <input type="file" onChange={handlePhoto} hidden accept="image/*" ></input>
                </Button>
                <span className={classes.errorTextStyle}> {error.photoIcon} </span>
              </Grid> */}


              {/* <Grid size={3} className={classes.center}>
                <img src={photoIcon.file} width="40px" height="40px" alt="photoicon" />
              </Grid> */}
              <Grid className={classes.btns} container spacing={1}>
                <Grid size={6} className={classes.btgrid}>
                  <Button onClick={handleSubmit} disabled={loading} variant="contained" fullWidth >
                    Save
                  </Button>
                </Grid>
                <Grid size={6} className={classes.btgrid}>
                  <Button onClick={handleClose} variant="contained" fullWidth>
                    Close
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div style={{ width: "100%" }}>
      <Dialog open={openEdit} onClose={handleClose} fullWidth maxWidth="lg">
        <DialogContent>{expertForm()}</DialogContent>
      </Dialog>
    </div>
  );
}