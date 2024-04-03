const jwt = require('jsonwebtoken')
const User = require('../models/userModel')


const requireAuth = async (req, res, next) => {
    //verify authentication
    const authentication = req.headers.authorization

    if(!authentication){
        return res.status(401).json({error: 'Authorization token required'})
    }
    
    const token = authentication.split(' ')[1]
    try {
        const {_id} = jwt.verify(token, process.env.SECRET)
        req.user = await User.findOne({_id}).select('_id username')
        next()
    } catch (error) {
        console.log('error')
    }
}

module.exports = requireAuth