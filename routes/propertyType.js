var express = require('express');
var router = express.Router();
var propertyTypeController = require('../controller/propertyType')
let userController = require('../controller/users')

/* GET users listing. */
router.post('/', userController.Secure , propertyTypeController.Create  );
router.get('/', userController.Secure , propertyTypeController.Read  );
router.delete('/delete/:id', userController.Secure , propertyTypeController.Delete );
router.patch('/update/:id', userController.Secure , propertyTypeController.Update );


module.exports = router;
