const express = require('express')
const router = express.Router()
const requireAuth = require('../middleware/requireAuth')

//controllers
const { getPosts, createPost, editPost, deletePost, likePost, commentPost} = require('../controllers/postsController')


//require auth 
router.use(requireAuth)
router.route('/').get(getPosts)
router.route('/create-post').post(createPost)
router.route('/edit-post/:id').patch(editPost)
router.route('/delete-post/:id').delete(deletePost)
router.route('/like-post/:id').patch(likePost)
router.route('/comment-post/:id').patch(commentPost)

module.exports = router 

