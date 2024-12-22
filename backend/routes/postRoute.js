import express from 'express'
import authUser from '../middlewares/userAuthentication.js'
import upload from '../middlewares/multer.js'
import { addPost,fetchAllPosts, deletePost, editPost, getUserStories, updateLikes, updateDisLikes } from '../controllers/postController.js'

const postRouter = express.Router()

postRouter.post('/add-post',upload.single('photo'),authUser,addPost)
postRouter.get('/fetch-posts',fetchAllPosts)
postRouter.post('/get-user-stories',authUser,getUserStories)
postRouter.post('/edit-post/:postId',upload.single('photo'),authUser,editPost)
postRouter.delete('/delete-post',authUser,deletePost)
postRouter.post('/update-likes/:postId',authUser,updateLikes)
postRouter.post('/update-dislikes/:postId',authUser,updateDisLikes)



export default postRouter