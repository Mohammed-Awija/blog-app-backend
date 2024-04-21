const jwt = require('jsonwebtoken')
const User = require('../models/userModel')


const requireAuth = async (req, res, next) => {
    try{
    //verify authentication
    const authentication = req.headers.authorization

    if(!authentication){
        return res.status(401).json({error: 'Authorization token required'})
    }
     
    const token = authentication.split(' ')[1]
    const decodedToken = jwt.verify(token, process.env.SECRET)
    const {_id} = decodedToken
    req.user = await User.findOne({_id}).select('_id username')
    next()
    } catch (error) {
        if(error.name === 'TokenExpiredError'){
            return res.status(401).json({ error: 'Token expired' });
        }
        console.log( error)
    }
}

module.exports = requireAuth