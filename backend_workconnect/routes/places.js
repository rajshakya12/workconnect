var express = require('express');
var router = express.Router();
var pool = require("./pool");
// const { data } = require('react-router');

router.post('/add_new_places', function(req, res, next) {
  pool.query("insert into places(cityid,placename,pincode)values(?,?,?)",[req.body.cityid,req.body.placename,req.body.pincode], function(error,result){
    if(error)
    {   console.log(error)
        res.status(500).json({status:false,message:'Pls contact to DBA.... '});
    }
    else
    {
        res.status(200).json({status:true,message:'Record Submitted Successfully...'});
    }
  })
});


router.get('/fetch_all_places', function(req,res){
  pool.query("select * from places", function(error,result){
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


router.post('/edit_place', function(req, res, next) {
  pool.query("update places set cityid=?, placename=?, pincode=? where placeid=?",[req.body.cityid,req.body.placename,req.body.pincode,req.body.placeid], function(error,result){
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


router.post('/delete_place', function(req, res, next) {
  pool.query("delete from places where placeid=?",[req.body.placeid], function(error,result){
    if(error)
    {
        res.status(500).json({status:false,message:'Pls contact to DBA.... '});
    }
    else
    {
        res.status(200).json({status:true,message:'Place Deleted Successfully...'});
    }
  })
});


module.exports = router;