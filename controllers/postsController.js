const Post = require('../models/postModel')
const User = require('../models/userModel')


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
        const {title, description } = req.body
        const {_id, username} = req.user
        const createdPost = await Post.create({
            userId: _id, 
            createdBy: username,
            title,
            description
        })
        res.status(200).json(createdPost)
    } catch (error) { 
        console.log(error)
    }
}

const editPost = async (req, res) => {
    try {
        const {id} = req.params
        const post = await Post.findByIdAndUpdate({_id: id}, req.body,{
            new: true, 
            runValidators: true,
        } )
        res.status(200).json({post})
    } catch (error) {
        console.log(error)
    }
}

const deletePost = async (req, res) => {
    try {
        const {id} = req.params
        const post = await Post.findByIdAndDelete({_id: id})
        res.status(200).json({post})
    } catch (error) {
        console.log(error) 
    }
}


const likePost = async (req, res) => {
    try {
        const {id} = req.params
        const post = await Post.findById({_id: id})
        const {username} = req.user
        if(post.likes.includes(username)){
            post.likes = post.likes.filter(user => user !== username)
        }else{
            post.likes.push(username)
        }
        await post.save()
        res.status(200).json(`${post.likes.length} people liked this post`)
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
}




