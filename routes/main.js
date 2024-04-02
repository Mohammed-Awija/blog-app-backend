const express = require('express')
const router = express.Router()

//controllers
const { getPosts, createPost, editPost, deletePost, likePost} = require('../controllers/postsController')


router.route('/').get(getPosts).post(createPost)
router.route('/edit-post/:id').patch(editPost)
router.route('/delete-post/:id').delete(deletePost)
router.route('/like-post/:id').patch(likePost)

module.exports = router 

