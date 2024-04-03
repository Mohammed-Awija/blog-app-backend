const express = require('express')
const router = express.Router()
const requireAuth = require('../middleware/requireAuth')

//controllers
const { getPosts, createPost, editPost, deletePost, likePost} = require('../controllers/postsController')

router.use(requireAuth)

router.route('/').get(getPosts).post(createPost)
router.route('/edit-post/:id').patch(editPost)
router.route('/delete-post/:id').delete(deletePost)
router.route('/like-post/:id').patch(likePost)

module.exports = router 

