
const getPosts = async (req, res) => {
    try {
        res.status(200).json({msg: 'get blogs'})
    } catch (error) {
        console.log(error)
    }
}

const createPost = async (req, res) => {
    try {
        res.status(200).json({msg: 'create post'})
    } catch (error) {
        console.log(error)
    }
}

const editPost = async (req, res) => {
    try {
        res.status(200).json({msg: 'edit post'})
    } catch (error) {
        console.log(error)
    }
}

const deletePost = async (req, res) => {
    try {
        res.status(200).json({msg: 'delete post'})
    } catch (error) {
        console.log(error)
    }
}


const likePost = async (req, res) => {
    try {
        res.status(200).json({msg: 'like a post'})
    } catch (error) {
        console.log(error)
    }
}


const sharePost = async (req, res) => {
    try {
        res.status(200).json({msg: 'share a post'})
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
    sharePost
}




