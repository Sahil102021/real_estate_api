var express = require('express');
var router = express.Router();
var propertyDetailController = require('../controller/propertyDetail')
let userController = require('../controller/users')
const multer  = require('multer');
// const { query } = require("express-validator");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/images')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + uniqueSuffix + file.originalname)
    }
  })
  
  const upload = multer({ storage: storage })



/* GET users listing. */
router.post('/', userController.Secure ,upload.array('photos',6), propertyDetailController.Create  );
router.get('/', userController.Secure , propertyDetailController.Read  );
router.get('/search', userController.Secure , propertyDetailController.Search  );
router.delete('/delete/:id', userController.Secure , propertyDetailController.Delete );
router.patch('/update/:id', userController.Secure ,upload.single('photos'), propertyDetailController.Update );
router.get('/read', propertyDetailController.Read  );



module.exports = router;
