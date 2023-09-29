const usermodel = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const SECRET_KEY = "NOTESAPI";


const signup = async (req, res) => {
    // token generate

    const { username, email, password } = req.body;
    try {
        const existingUser = await usermodel.findOne({ email: email }).select('email').lean().exec(); //existing user check 
        if (existingUser) {
            return res.status(400).json({ message: "User aleady exist" });
        }
        const hashedPassword = await bcrypt.hash(password, 10); //hashed password

        const result = await usermodel.create({ // user creation
            email: email,
            password: hashedPassword,
            username: username
        });
        //token createion
        const token = await jwt.sign({ email: result.email, id: result._id }, //payloa: to validate the user
            SECRET_KEY); // decrect key : to decrypt toekn for userid
        res.status(201).json({ user: result, token: token });

    }
    catch (error) {
        console.error("Error:", error);
        res.status(500).json({ message: "something went wrong" });

    }


};

const login = async (req, res) => {

    const { email, password } = req.body;
    try {
        const existingUser = await usermodel.findOne({ email: email }); //existing user check 
        if (!existingUser) {
            return res.status(404).json({ message: "User not found" });
        }

        const matchPassword = await bcrypt.compare(password, existingUser.password);
        if (!matchPassword) {
            return res.status(400).json({ message: "Invalid password" })
        }
        const token = await jwt.sign({ email: existingUser.email, id: existingUser._id }, //payloa: to validate the user
            SECRET_KEY);
        res.status(201).json({ user: existingUser, token: token });

    } catch (error) {

        console.error("Error:", error);
        res.status(500).json({ message: "something went wrong" });
    }

};

module.exports = { signup, login };
