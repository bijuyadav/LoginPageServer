const { hashPassword, ComaparePassword } = require('../helpers/authHelper');
const userModel = require('../models/userModel');
JWT =  require('jsonwebtoken');


// for register
const RegisterController = async(req,res)=> {
    try {
        const {name,email,mobileNo,password} = req.body
        // validation
        if (!name) {
            return res.status(400).send({
                success:false,
                message:'name is required'
            })
        }
        if (!email) {
            return res.status(400).send({
                success:false,
                message:'email-ID is required'
            })
        }
        if (!mobileNo) {
            return res.status(400).send({
                success:false,
                message:'mobileNo is required'
            })
        }
        if (mobileNo.length !== 10) {
            return res.status(400).send({
                success:false,
                message:'Mobile No. must be 10 digits long.'
            })
        }
        if (!password || password.length < 6) {
            return res.status(400).send({
                success:false,
                message:'password is required and min. 6 character long'
            })
        }

        // check exisiting
        const exisitingUser = await userModel.findOne({email:email});
        if (exisitingUser) {
            return res.status(500).send({
                success:false,
                message:"user Already Registered"
            })
        }

        //hashed password 
        const hashedPassword = await hashPassword(password);
        

        // save user data
        const user = await userModel({name, email,mobileNo,password:hashedPassword}).save(); 

        
        return res.status(201).send({
            success:true,
            message:"Registeration Successfull Please Login" 
        })
    } catch (error) {
        console.log(error)
        return res.status(500).send({
            success:false,
            message:"Error in Register API",
            error
        })
    }
};


// for login

const loginController = async(req,res)=>{
    try {
        const {email,password} = req.body
        // validation
        if(!email || !password){
            return res.status(500).send({
                success:false,
                message:"please provide valid Eamil or Password",
            });
        }
        // find user
        const user = await userModel.findOne({email})
        if(!user){
            return res.status(500).send({
                message:"User Not Found",
            });
        }
        
        // match password
        const match = await ComaparePassword(password,user.password);
        if(!match){
                return res.status(500).send({
                success:false,
                message:"Invalid Password",
            });
        }

        // Token JWT
        const token = await JWT.sign( { _id:user._id },process.env.JWT_SECRET, {
            expiresIn:"7d"
        });



        // hide password
        user.password=undefined;

        // success login

        return res.status(200).send({
            success:true,
            message:"Successfully Login",
            token,
            user,
        });


    } catch (error) {
        console.log(error)
        return res.status(500).send({
            success:false,
            message:"error in login api",
            error
        })
    }
};

module.exports= { RegisterController,loginController };