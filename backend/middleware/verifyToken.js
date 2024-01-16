const jwt = require('jsonwebtoken')

const secretKey = process.env.JWT_KEY

function verifyToken(req,res,next){
    const token = req.headers.authorization

    if(!token)
    return res.status(401).json({message: 'Unauthorized'})

    jwt.verify(token, secretKey, (err, decoded) => {
        if(err){
            return res.status(401).json({message : 'Token is not valid'})
        }

        req.user = decoded
        next()
    })
}

module.exports=verifyToken;