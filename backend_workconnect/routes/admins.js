var experess = require('express');
var router = experess.Router();

var upload = require('./multer')
var pool = require('./pool');

router.post('/chk_admin_password', function (req, res, next) {
    pool.query("select * from admins where (emailid=? or mobileno=?) and password=?", [req.body.emailid, req.body.emailid,req.body.password], (error, result) => {
        if (error) {
            console.log(error)
            res.status(500).json({ status: false, message: "Please contact to Database Administrator" })
        }
        else {
            if(result.length==1)
            {
            res.status(200).json({ status: true, message: "Successfull" })
            }
            else
                {
            res.status(200).json({ status: false, message: "Invalid EmailId/Mobile Number/Password..." })
            }
        }

    })
})
module.exports = router