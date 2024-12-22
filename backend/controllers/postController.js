import postModel from "../models/PostModel.js"
import {v2 as cloudinary} from 'cloudinary'


const addPost = async (req,res) => {

    try {

        const {title,desc,category,userId} = req.body

        const photo = req.file

        let result = await cloudinary.uploader.upload(photo.path,{resource_type:'image'})

        const imageUrl = result.secure_url  
        
        if(!title){

            res.json({success: false ,message: "Enter title!!"})
        }
        if(!category){

            res.json({success: false ,message: "Choose category!!"})
        }
        if(!desc){

            res.json({success: false ,message: "Add description!!"})
        }
      

        const postData = {

            title,
            desc,
            category,
            userId,
            photo:imageUrl,
            likes: [],
            dislikes: [],        
            createdDate: Date.now()
        }

        const newPost = new postModel(postData)

        await newPost.save()

        res.json({success: true ,message: "Post added successfully"})

        
    } catch (error) {

        console.log(error);
        res.json({success: false,message: "Choose thumbnail!!"})
        
    }
}

const fetchAllPosts = async (req,res) => {

    try {

        const allPosts = await postModel.find({})

        res.json({success: true,allPosts})

    } catch (error) {

        console.log(error);
        res.json({success: false,message: error.message})
        
    }
}

const getUserStories = async (req,res) => {

    try {

        const {userId} = req.body

        const userPosts = await postModel.find({userId: userId}).sort({isFavourite: -1})

        res.json({success: true ,userPosts})

        
    } catch (error) {

        console.log(error);
        res.json({success: false,message: error.message})
        
    }


}

const editPost = async (req,res) => {

    try {

        const {title,desc,category,userId} = req.body

        const {postId} = req.params

        let photo = req.file

        const postInfo = await postModel.findById(postId)

        let imageUrl = "";

        if(typeof photo == 'object'){

            let result = await cloudinary.uploader.upload(photo.path,{resource_type:'image'})

             imageUrl = result.secure_url

        } else{

            imageUrl = postInfo.photo
        }


        await postModel.findByIdAndUpdate(postId,{title,
            desc,
            category,
            userId,
            photo:imageUrl,
            likes:postInfo.likes,
            dislikes:postInfo.dislikes,        
            createdDate: Date.now()})

        res.json({success: true,message: "Post updated successfully!!"})

        
    } catch (error) {

        console.log(error);
        res.json({success: false,message: error.message})
        
    }
}

const deletePost = async (req,res) => {

    try {

        const {id,userId} = req.body


        await postModel.findByIdAndDelete(id)

        res.json({success: true,message: "Post deleted successfully!!"})

        
    } catch (error) {

        console.log(error);
        res.json({success: false,message: error.message})
        
        
    }

}

const updateLikes = async (req,res) => {

    try {

        const {userId} = req.body
        
        const {postId} = req.params

        const postInfo = await postModel.findById(postId)

        let likeStatus = true


            const likedUser = postInfo.likes.find(like => like.userId === userId)

            if(likedUser){

                postInfo.likes = postInfo.likes.filter(like => like.userId !== userId)
                likeStatus = false

            }else{

                postInfo.likes.push({userId,likeCount: 1})
                likeStatus = true

                postInfo.disLikes = postInfo.disLikes.filter(dislike => dislike.userId !== userId)
            }

        await postInfo.save()

        res.json({success: true,status:likeStatus, postInfo})
        
    } catch (error) {

        console.log(error);
        res.json({success: false,message: error.message})
        
    }
}
const updateDisLikes = async (req,res) => {

    try {

        const {userId} = req.body
        
        const {postId} = req.params

        const postInfo = await postModel.findById(postId)

        let disLikeStatus = true

            const disLikedUser = postInfo.disLikes.find(dislike => dislike.userId === userId)

            if(disLikedUser){                

                postInfo.disLikes = postInfo.disLikes.filter(dislike => dislike.userId !== userId)
                disLikeStatus = false

            }else{

                postInfo.disLikes.push({userId,dislikeCount: 1})
                disLikeStatus = true
                postInfo.likes = postInfo.likes.filter(like => like.userId !== userId)
                
            }

        await postInfo.save()

        res.json({success: true,status:disLikeStatus, postInfo})
        
    } catch (error) {

        console.log(error);
        res.json({success: false,message: error.message})
        
    }
}

export {addPost,fetchAllPosts,getUserStories,editPost,deletePost,updateLikes,updateDisLikes}