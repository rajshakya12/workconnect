const express = require("express");
const router = express.Router();
const pool = require("./pool");
const upload = require("./multer");




router.post("/add_new_includes", (req, res) => {
  pool.query("insert into includes(categoryid,subcategoryid,include,exclude) values(?,?,?,?)", [req.body.categoryid, req.body.subcategoryid, req.body.include, req.body.exclude], (error, result) => {
    if (error) {
      res.status(500).json({ status: false, message: "Contact to DBA", error })
      console.log("Error:", error)
    }
    else {
      res.status(200).json({ status: true, message: "Data Saved Sucessfully" })
    }
  })
})

router.get("/fetch_all_includes", (req, res) => {
  pool.query("SELECT I.*,S.*,C.* FROM includes I, subcategory S, category C where I.subcategoryid=S.subcategoryid and S.categoryid=C.categoryid", (error, result) => {
    if (error) {
      res.status(500).json({ status: false, message: "Contact to DBA", error })
      console.log("Error:", error)
    }
    else {
      res.status(200).json({ status: true, message: "Data Get Sucessfully", data: result })
    }
  })
})

router.post("/edit_includes", (req, res) => {
  console.log(req.body)
  pool.query("update  includes set categoryid=?,subcategoryid=?,include=?,exclude=? where includeid=? ", [req.body.categoryid, req.body.subcategoryid, req.body.include, req.body.exclude, req.body.includeid], (error, result) => {
    if (error) {
      res.status(500).json({ status: false, message: "Contact to DBA", error })
      console.log("Error:", error)
    }
    else {
      res.status(200).json({ status: true, message: "Edit Sucessfully" })
    }
  })
})


router.post("/delete_includes", (req, res) => {
  console.log(req.body)
  pool.query("delete from includes where includeid=?", [req.body.includeid], (error, result) => {
    if (error) {
      res.status(500).json({ status: false, message: "Contact to DBA", error })
      console.log("Error:", error)
    }
    else {
      res.status(200).json({ status: true, message: "Delete Sucessfully" })
    }
  })
})



module.exports = router;