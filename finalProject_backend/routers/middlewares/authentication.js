const jwt = require("jsonwebtoken")

const authentication = (req, res, next)=>{
    try {
        const token = req.headers.authorization.split(" ")[1];
        const vaild = jwt.verify(token, "ABC");
        req.token= vaild;
        next();
    } catch (error) {
        res.status(403);
        res.send("Unauthorized");
    }
};

module.exports = {authentication};
