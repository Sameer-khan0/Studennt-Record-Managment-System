const jwt=require('jsonwebtoken')
const skey='_010-A-010_'

const getteacher=async (req,res,next)=>{
    try {
        const token=req.header('token')
        if(!token){res.status(401).send({ error: "Please authenticate using a valid token" })}
        const data=jwt.verify(token,skey)
        req.teacher=data.id
        next()
        
    } catch (error) {
        console.error(error)
        res.status(401).send({ error: "Please authenticate using a valid token" })
    }
}

module.exports=getteacher