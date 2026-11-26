var experess = require('express');
var router = experess.Router();

var upload = require('./multer')
var pool = require('./pool');

router.post('/add_new_category', upload.single("categoryicon"), function (req, res, next) {
    pool.query("insert into category (categoryname, categoryicon) values(?,?)", [req.body.categoryname, req.file.filename], (error, result) => {
        if (error) {
            res.status(500).json({ status: false, message: "Please contact to Database Administrator" })
        }
        else {
            res.status(200).json({ status: true, message: "Record Submitted Successfully..." })
        }
    })
})

router.get('/fetch_all_category', function (req, res, next) {
    console.log(req.body)
    console.log(req.file)
    pool.query("select * from category", function (error, result) {
        if (error) {
            res.status(500).json({ status: false, message: "Please contact to Database Administrator" })
        }
        else {
            res.status(200).json({ status: true, data: result })
        }
    })
})

router.post('/edit_category', function (req, res, next) {
    console.log(req.body);
    console.log(req.file);
    pool.query("update category set categoryname=? where categoryid=?", [req.body.categoryname, req.body.categoryid], function (error, result) {
        if (error) {
            res.status(500).json({
                status: false,
                message: "Please contact to Database Administrator",
            });
        } else {
            res.status(200).json({
                status: true,
                message: "Record Edited Successfully...",
            });
        }
    },
    );
})

router.post("/delete_category", function (req, res, next) {
  console.log(req.body);
  pool.query("delete from category where categoryid=?", [req.body.categoryid],
    function (error, result) {
      if (error) {
        res.status(500).json({
          status: false,
          message: "Please contact to Database Administrator",
          error
        });
      } else {
        res.status(200).json({
          status: true,
          message: "Category Deleted Successfully...",
        });
      }
    },
  );
});

router.post("/edit_categoryicon", upload.single("categoryicon"), function (req, res, next) {
  console.log(req.body);
  console.log(req.file);
  pool.query("update category set categoryicon=? where categoryid=?", [req.file.filename, req.body.categoryid], function (error, result) {
    if (error) {
      res.status(500).json({
        status: false,
        message: "Please contact to Database Administrator",
        error
      });
    } else {
      res.status(200).json({
        status: true,
        message: "Category Icon Updated Successfully...",
      });
    }
  },
  );
},
);

module.exports = router