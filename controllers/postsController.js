const Post = require('../models/postModel')


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
        const createdPost = await Post.create(req.body)
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
        const userId = req.body.id
        if(post.likes.includes(userId)){
            post.likes = post.likes.filter(user => user !== userId)
        }else{
            post.likes.push(req.body.id)
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




