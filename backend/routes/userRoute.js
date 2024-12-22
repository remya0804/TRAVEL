import express from 'express'
import { createAccount, deleteProfile, editProfile, getAllUsers, getUser, userLogin } from '../controllers/userController.js'
import authUser from '../middlewares/userAuthentication.js'
import upload from '../middlewares/multer.js'

const userRouter = express.Router()

userRouter.post('/create-account',createAccount)
userRouter.post('/login',userLogin)
userRouter.post('/get-user',authUser,getUser)
userRouter.delete('/delete-profile',authUser,deleteProfile)
userRouter.get('/get-all-users',getAllUsers)
userRouter.post('/edit-profile',upload.single('photo'),authUser,editProfile)


export default userRouter