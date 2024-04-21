const Post = require('../models/postModel')
const User = require('../models/userModel')
const crypto = require('crypto')
const { S3Client, PutObjectCommand, GetObjectCommand, DeleteObjectCommand } = require('@aws-sdk/client-s3')
const { getSignedUrl } = require('@aws-sdk/s3-request-presigner')
const bucketName = process.env.BUCKET_NAME
const bucketRegion = process.env.BUCKET_REGION
const accessKey = process.env.ACCESS_KEY
const secretAccessKey = process.env.SECRET_ACCESS_KEY




const s3 = new S3Client({
    credentials: {
        accessKeyId: accessKey,
        secretAccessKey: secretAccessKey,
    },
    region: bucketRegion
})

   
 
const getPosts = async (req, res) => {
    try {
        const post = await Post.find({}).sort({createdAt: -1}) 
        res.status(200).json({ post }) 
    } catch (error) {   
        console.log(error) 
    }  
}     

const createPost = async (req, res) => {
    try { 
        const imageName = crypto.randomBytes(32).toString('hex')
        const getSignedUrlParams = {
            Bucket: bucketName,
            Key: imageName
        }
        //create image URL
        const getSignedUrlCommand = new GetObjectCommand(getSignedUrlParams)
        const imageUrl = await getSignedUrl(s3, getSignedUrlCommand) //you can add {expiresIn: 3600}

        const params = {
            Bucket: bucketName,
            Key: imageName,
            Body: req.file.buffer,
            ContentType: req.file.mimetype, 
        }
        const command = new PutObjectCommand(params)
        await s3.send(command)

        const {title, description } = req.body
        const {_id, username} = req.user
        const user = await User.findById(_id)
        if(!user){
            return res.status(404).json({error: "User not found!!!"})
        }
        
        const createdPost = await Post.create({
            userId: _id, 
            createdBy: username,
            title, 
            description,
            imageName: imageName,
            imageUrl: imageUrl
        })

        res.status(200).json(createdPost)
    } catch (error) { 
        console.log(error)
    }
} 

const editPost = async (req, res) => {
    try {
        const {id} = req.params
        const userId = req.user._id 
        if(!userId){
            throw Error("userId not found!!!!") 
        }
        const post = await Post.findById(id)
        if(!post){
            return res.status(400).json({msg: "Post not found"})
        }
        if(userId != post.userId){
            return res.status(400).json({msg: "This is not your post"})
        }
        const params = {
            Bucket: bucketName,
            Key: post.imageName,
            Body: req.file.buffer,
            ContentType: req.file.mimetype, 
        }
        const command = new PutObjectCommand(params)
        await s3.send(command) 

        post.set(req.body)  
        await post.save()
        res.status(200).json(post)
    } catch (error) {
        console.log(error)
    }
} 

const deletePost = async (req, res) => {
    try {
        const {id} = req.params 
        const userId = req.user._id
        const post = await Post.findById(id)
        if(!post){
            return res.status(400).json({msg: "Post not found"})
        }
        if(userId != post.userId){
            return res.status(400).json({msg: "This is not your post"})
        }
        const params = {
            Bucket: bucketName,
            Key: post.imageName
        }
        const deleteImageCommand = new DeleteObjectCommand(params);
        await s3.send(deleteImageCommand);

        // Delete the post from the database
        const deletedPost = await Post.findByIdAndDelete(id);
        res.status(200).json(deletedPost);

    } catch (error) {
        console.log(error) 
    }
}


const likePost = async (req, res) => {
    try {
        const {id} = req.params
        const post = await Post.findById(id)
        const {username} = req.user
        if(post.likes.includes(username)){
            post.likes = post.likes.filter(user => user !== username)
        }else{
            post.likes.push(username)
        }
        await post.save()
        res.status(200).json(post)
    } catch (error) {
        console.log(error)
    }
}

const commentPost = async (req, res) => {
    try { 
        const {id} = req.params
        const post = await Post.findById(id)
        const {username} = req.user
        const {comment} = req.body
        const newComment = {
            comment: comment,
            createdBy: username
        } 
        post.comments.push(newComment)
        await post.save() 
        res.status(200).json(post)
    } catch (error) {
        console.log(error)
    }
}

const replyPost = async (req, res) => {
    try {
        const {postId, commentId} = req.params
        const post = await Post.findById({_id: postId})
        const comment = post.comments.find(com => com._id.toString() === commentId)
        const {username} = req.user
        const {reply} = req.body
        const newReply = {
            reply: reply,
            createdBy: username
        }
        comment.replies.push(newReply) 
        await post.save() 
        res.status(200).json(post)
    } catch (error) {
        console.log(error)
    }
}



module.exports = {
    getPosts,
    createPost,
    editPost,
    deletePost,
    likePost,
    commentPost,
    replyPost
}




