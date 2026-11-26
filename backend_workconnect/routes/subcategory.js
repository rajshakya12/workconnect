var express = require('express');
var router = express.Router();
var upload = require("./multer");
var pool = require("./pool");
//const { data } = require('react-router');

router.post('/add_new_subcategory',upload.single('subcategoryicon'), function(req, res, next) {
  pool.query("insert into subcategory(categoryid,subcategoryname,subcategoryicon)values(?,?,?)",[req.body.categoryid,req.body.subcategoryname,req.file.filename], function(error,result){
    if(error)
    {
        res.status(500).json({status:false,message:'Pls contact to DBA.... '});
    }
    else
    {
        res.status(200).json({status:true,message:'Record Submitted Successfully...'});
    }
  })
});


router.get('/fetch_all_subcategory', function(req,res){
  pool.query("select subcategory.*, category.categoryname from subcategory, category where subcategory.categoryid=category.categoryid", function(error,result){
    if(error)
    {
        res.status(500).json({status:false,message:'Pls contact to DBA.... '});
    }
    else
    {
        res.status(200).json({status:true,data:result});
    }
  })
});


router.post('/edit_subcategory', function(req, res, next) {
  pool.query("update subcategory set categoryid=?, subcategoryname=? where subcategoryid=?",[req.body.categoryid,req.body.subcategoryname,req.body.subcategoryid], function(error,result){
    if(error)
    {
        res.status(500).json({status:false,message:'Pls contact to DBA.... '});
    }
    else
    {
        res.status(200).json({status:true,message:'Record Edited Successfully...'});
    }
  })
});


router.post('/edit_subcategory_icon',upload.single('subcategoryicon'), function(req, res, next) {
  pool.query("update subcategory set subcategoryicon=? where subcategoryid=?",[req.file.filename,req.body.subcategoryid], function(error,result){
    if(error)
    {
        res.status(500).json({status:false,message:'Pls contact to DBA.... '});
    }
    else
    {
        res.status(200).json({status:true,message:'City Icon Updated Successfully...'});
    }
  })
});


router.post('/delete_subcategory', function(req, res, next) {
  pool.query("delete from subcategory where subcategoryid=?",[req.body.subcategoryid], function(error,result){
    if(error)
    {
        res.status(500).json({status:false,message:'Pls contact to DBA.... '});
    }
    else
    {
        res.status(200).json({status:true,message:'Subcategory Deleted Successfully...'});
    }
  })
});


router.post('/fetch_subcategory_by_category', function(req, res, next){
   pool.query(
    "select * from subcategory where categoryid=?",[req.body.categoryid], function(error, result){
      if(error){
        res.status(500).json({status:false,message:'Pls contact to DBA.... '});
      }
      else{
        res.status(200).json({status:true,data:result});
      }
    }
  );
});


module.exports = router;