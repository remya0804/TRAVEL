import userModel from "../models/userModel.js"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

import {v2 as cloudinary} from 'cloudinary'
import postModel from "../models/PostModel.js"



const createToken = (id) => {

    return jwt.sign({id},process.env.JWT_SECRET)
}

const createAccount = async (req,res) => {

    try {

        const {name,email,password} = req.body

        if(!name || !email || !password){

            return res.json({success: false, message: "All fields are required."})
        }

        const userExists = await userModel.findOne({email})

        if(userExists){

            return res.json({success: false, message: "User already exists!!"})
        }

        if(password.length <8){

            return res.json({success: false, message: "Enter strong password!!"})
        }

        const salt = await bcrypt.genSalt(10);

        const hashedPaswword = await bcrypt.hash(password,salt)

        const newUser = new userModel({

            name,
            email,
            password: hashedPaswword,
            profession:"",
            company:"",
            photo:"",
            date:Date.now()

        })

        const addUser = await newUser.save()

        const token = createToken(addUser._id)

        return res.json({success: true, message: "Welcome to TravelQuest!!", token})

    } catch (error) {

        console.log(error);
        res.json({success: false,message: error.message})
        
    }
}

const userLogin = async (req,res) => {

    try {

        const {email,password} = req.body

        if(!email || !password){

            return res.json({success: false, message: "All fields are required."})
        }

        const userExists = await userModel.findOne({email})

        if(!userExists){

            return res.json({success: false, message: "User doesn't exists!!"})
        }

        const passwordMatch = await bcrypt.compare(password,userExists.password)

        if(passwordMatch){

            const token = createToken(userExists._id)
            return res.json({success:true, token})

        } else{

            return res.json({success:false, message: "Invalid credentials"})
        }

    } catch (error) {

        console.log(error);
        res.json({success: false,message: error.message})
        
    }
}

const getUser = async (req,res) => {

    try {

        const {userId} = req.body

        const userInfo = await userModel.findById(userId)

        return res.json({success:true, userInfo})
        
    } catch (error) {

        console.log(error);
        res.json({success: false,message: error.message})
        
    }
}

const editProfile = async (req,res) => {

    try {

        const {userId,name,email,profession,company,currentPassword,password,removeImage} = req.body

        const photo = req.file 

        const user = await userModel.findById(userId)
  
        let imageUrl = user.photo

        if(photo){

                let result = await cloudinary.uploader.upload(photo.path,{resource_type:'image'})
    
                imageUrl = result.secure_url
    
        } else if(removeImage == true || removeImage == 'true' && !photo) {
    
                imageUrl = ""
    
        } else if(!photo && removeImage == false){

            imageUrl = user.photo
        }
        if(password.length <8){

            return res.json({success: false, message: "Enter strong password!!"})
        }

        if(currentPassword === password){

            return res.json({success: false,message: "Cannot use the same password!!"})
        }


        const salt = await bcrypt.genSalt(10);

        const hashedPaswword = await bcrypt.hash(password,salt)

        const passwordCheck = await bcrypt.compare(currentPassword,user.password)

        if(!passwordCheck){

          return  res.json({success: false,message: "Password doesn't match!!!"})
        }


        await userModel.findByIdAndUpdate(userId,{name,email,profession,company,password: hashedPaswword,photo: imageUrl,date:Date.now()},{ new: true })   

        res.json({success: true,message: "Profile updated successfully!!"})
        
    } catch (error) {

        console.log(error);
        res.json({success: false,message: error.message})
        
        
    }
}

const getAllUsers = async (req,res) => {

    try {

        const allUsers = await userModel.find({})

        res.json({success: true,allUsers})
        
    } catch (error) {

        console.log(error);
        res.json({success: false,message: error.message})
    }
}

const deleteProfile = async (req,res) => {

    try {

        const {userId} = req.body

        await userModel.findByIdAndDelete(userId)

        await postModel.deleteMany({userId})

        res.json({success: true,message: "Profile deleted successfully!!"})

        
    } catch (error) {

        console.log(error);
        res.json({success: false,message: error.message})
    }


}



export {createAccount,userLogin,getUser,editProfile,getAllUsers,deleteProfile}