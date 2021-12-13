const jwt = require("jsonwebtoken")

const authentication = (req, res, next)=>{
    try {
        const token = req.headers.authorizayion.split(" ")[1];
        const vaild = jwt.verify(token, "ABC");
        rwq.token= vaild;
        next();
        
    } catch (error) {
        res.status(403);
        res.send(error);
        
    }
};

mpdule.exports = {authentication};