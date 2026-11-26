const express = require('express');
const router = express.Router();

const upload = require("./multer");
const pool = require('./pool');

// CATEGORY
router.get('/fetch_all_category', function (req, res, next) {
    pool.query('select * from category', (error, result) => {
        if (error) {
            res.status(500).json({ status: false, message: "Please contact to Database Administrator" })
        }
        else {
            res.status(200).json({ status: true, data: result })
        }
    })
})

// SUBCATEGORY
router.post('/fetch_all_subcategory', function (req, res, next) {
    console.log(req.body)
    pool.query("select * from subcategory where categoryid=?", [req.body.catid], function (error, result) {
        if (error) {
            res.status(500).json({ status: false, message: "Please contact to Database Administrator" })
        }
        else {
            res.status(200).json({ status: true, data: result })
        }
    })
})


// ADD EXPERT
router.post("/add_new_expert", upload.any(), (req, res) => {

    console.log(req.files)

    const files = {}
    req.files.forEach(file => {
        files[file.fieldname] = file.filename
    })

    pool.query(
        `insert into experts(
    categoryid, subcategoryid, firstname, lastname, fathername, dob, gender, emailid, mobileno,
    currentaddress, currentcity, currentstate, currentpincode, permanentaddress, permanentcity,
    permanentstate, permanentpincode, aadharid, panno, vehicleno, vehicletype, licenseno, aadharfile, panfile, licensefile, photograph
) values (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,

        [
            req.body.categoryid,
            req.body.subcategoryid,
            req.body.firstname,
            req.body.lastname,
            req.body.fathername,
            req.body.dob,
            req.body.gender,
            req.body.emailid,
            req.body.mobileno,
            req.body.currentaddress,
            req.body.currentcity,
            req.body.currentstate,
            req.body.currentpincode,
            req.body.permanentaddress,
            req.body.permanentcity,
            req.body.permanentstate,
            req.body.permanentpincode,
            req.body.aadharid,
            req.body.panno,
            req.body.vehicleno,
            req.body.vehicletype,
            req.body.licenseno,
            files.aadharfile,
            files.panfile,
            files.licensefile,
            files.photograph,
            
        ],
        (error, result) => {
            if (error) {
                console.log("Error:", error);
                return res
                    .status(500)
                    .json({ message: "Contact DBA", status: false, error });
            }
            res.status(200).json({ message: "Success", status: true, data: result });
        },
    );
});


// STATES
router.get('/fetch_all_states', function (req, res, next) {
    pool.query("select * from expertstate", function (error, result) {
        if (error) {
            res.status(500).json({ status: false, message: "Please contact to Database Administrator" })
        }
        else {
            res.status(200).json({ status: true, data: result })
        }
    })
})


// CITIES
router.post('/fetch_all_cities', function (req, res, next) {
    console.log(req.body.stateid)
    pool.query("select * from expertcity where stateid=?", [req.body.stateid], function (error, result) {
        if (error) {
            console.log(error)
            res.status(500).json({ status: false, message: "Please contact to Database Administrator" })
        }
        else {
            res.status(200).json({ status: true, data: result })
        }
    })
})

// EXPERTS
router.get('/fetch_all_expert', function (req, res, next) {
    pool.query("select e.*, s.subcategoryname, c.categoryname from experts e join subcategory s on e.subcategoryid = s.subcategoryid join category c on s.categoryid = c.categoryid ", function (error, result) {
        if (error) {
            console.log(error)
            res.status(500).json({ status: false, message: "Please contact to Database Administrator" })
        }
        else {
            console.log(result)
            res.status(200).json({ status: true, data: result })
        }
    })
})

// EDIT EXPERT
router.post("/edit_expert", upload.any(), (req, res) => {
    //aadhar pan photo
    console.log("Files:",req.files)
    var str = []
    req.files.map(item => {
        if (item.fieldname == "aadhar")
            str.push(`aadharfile="${item.filename}"`)
        if (item.fieldname == "pan")
            str.push(`panfile="${item.filename}"`)
        if (item.fieldname == "photo")
            str.push(`photograph="${item.filename}"`)
        if (item.fieldname == "license")
            str.push(`licensefile="${item.filename}"`)
    })
    if (str.length) {
        str = "," + str.join(",")
    } else {
        str=""
    }
    console.log(str,req.body);
    pool.query(
        `update experts set 
    categoryid=?, subcategoryid=?, firstname=?, lastname=?, fathername=?, dob=?, gender=?, emailid=?, mobileno=?,
    currentaddress=?, currentcity=?, currentstate=?, currentpincode=?, permanentaddress=?, permanentcity=?,
    permanentstate=?, permanentpincode=?, aadharid=?, panno=?, vehicleno=?, vehicletype=?, licenseno=? ${str} where expertid=?`,[
            req.body.categoryid,
            req.body.subcategoryid,
            req.body.firstname,
            req.body.lastname,
            req.body.fathername,
            req.body.dob,
            req.body.gender,
            req.body.emailid,
            req.body.mobileno,
            req.body.currentaddress,
            req.body.currentcity,
            req.body.currentstate,
            req.body.currentpincode,
            req.body.permanentaddress,
            req.body.permanentcity,
            req.body.permanentstate,
            req.body.permanentpincode,
            req.body.aadharid,
            req.body.pancardno,
            req.body.vehicleno,
            req.body.vehicletype,
            req.body.licenseno,
            req.body.expertid
        ],(error, result) => {
            if (error) {
                console.log("Error:", error);
                return res
                    .status(500)
                    .json({ message: "Contact DBA", status: false, error });
            }
            res.status(200).json({ message: "Success", status: true, data: result });
        },
    );
});

// EDIT EXPERT ICON
router.post("/edit_experticon", upload.any(), (req, res) => {

    const { expertid, doctype } = req.body;

    // simple check
    if (!expertid || !doctype || !req.files.length) {
        return res.json({ status: false, message: "Missing data" });
    }

    let column = "";

    if (doctype === "aadhar") column = "aadharfile";
    else if (doctype === "pancard") column = "panfile";
    else if (doctype === "license") column = "licensefile";
    else if (doctype === "photograph") column = "photograph";

    const filename = req.files[0].filename;

    pool.query(
        `update experts set ${column}='${filename}' where expertid='${expertid}'`,
        [filename, expertid],
        (error, result) => {
            if (error) {
                return res.json({ status: false, message: "Error" });
            }

            res.json({ status: true, message: "Updated Successfully" });
        }
    );
});

// DELETE EXPERT
router.post('/delete_expert', function (req, res, next) {
    pool.query("delete from experts where expertid=?", [req.body.expertid], function (error, result) {
        if (error) {
            res.status(500).json({ status: false, message: "Please contact to Database Administrator" })
        }
        else {
            res.status(200).json({ status: true, data: result })
        }
    })
})

module.exports = router;