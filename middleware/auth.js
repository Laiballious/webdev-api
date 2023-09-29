const jwt = require("jsonwebtoken");
const SECRET_KRRY = " NOTESAPI"


const auth = (req, res, next) => {

    try {
        let token = req.headers.authorization;
        if (token) {
            token = token.split(" ")[1];
            let user = jwt.verify(token, SECRET_KEY);//t will verify token with secretkey
            req.userId = user.id;

        } else {
            res.status(401).json({ message: "unauthorized user" });

        }
        next();

    } catch (error) {
        console.log(error);
        res.status(401).json({ message: "unauthorized user" });

    }

}
module.exports = auth;