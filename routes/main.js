const express = require('express')
const router = express.Router()
const requireAuth = require('../middleware/requireAuth')

//controllers
const { getPosts, createPost, editPost, deletePost, likePost} = require('../controllers/postsController')

//posts route
router.route('/').get(getPosts)

//require auth
router.use(requireAuth)

router.route('/create-post').post(createPost)
router.route('/edit-post/:id').patch(editPost)
router.route('/delete-post/:id').delete(deletePost)
router.route('/like-post/:id').patch(likePost)

module.exports = router 

