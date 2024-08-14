const jwt = require("jsonwebtoken");
const JWT_SECRET = "manish6523@sharma";

const fetchuser = (req,res,next)=>{

    const token = req.header('auth-token')
    if(!token){
        res.status(401).send({error:'please use valid token'})
    }
    try {
        const data = jwt.verify(token,JWT_SECRET)
        req.user = data.user
    } catch (error) {
        res.status(404).send({error:'internal server Error'})
    }
    next()
}
module.exports = fetchuser