const express = require('express');
const {RegisterController, loginController} = require("../controllers/userControllers") ; 


// routers object 
const router = express.Router();

// routes 
router.post('/register',RegisterController);

//login 
router.post('/login',loginController)

//export
module.exports = router;
