
const usermodel = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const SECRET_KEY = "NOTESAPI";
const validator = require("validator");



const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

const signup = async (req, res) => {
    const { username, email, password } = req.body;

    // Validate email using a regular expression
    if (!validator.isEmail(email)) {
        return res.status(400).json({ message: "Invalid email address" });
    }

    // Validate password using the passwordRegex regular expression
    if (!password.match(passwordRegex)) {
        return res.status(400).json({
            message:
                "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one digit, and one special character.",
        });
    }

    try {
        const existingUser = await usermodel.findOne({ email }).select('email').lean().exec();

        if (existingUser) {
            return res.status(400).json({ message: "Email is already in use" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const result = await usermodel.create({
            email,
            password: hashedPassword,
            username
        });

        const token = jwt.sign({ email: result.email, id: result._id }, SECRET_KEY// signature it
        );

        res.status(201).json({ user: result, token });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ message: "Something went wrong" });
    }
};

const login = async (req, res) => {
    const { email, password } = req.body;

    // Validate email using a regular expression
    if (!validator.isEmail(email)) {
        return res.status(400).json({ message: "Invalid email address" });
    }

    try {
        const existingUser = await usermodel.findOne({ email });

        if (!existingUser) {
            return res.status(404).json({ message: "User not found" });
        }

        const matchPassword = await bcrypt.compare(password, existingUser.password);
        if (!matchPassword) {
            return res.status(400).json({ message: "Invalid password" });
        }

        const token = jwt.sign({ email: existingUser.email, id: existingUser._id }, SECRET_KEY);

        res.status(200).json({ user: existingUser, token });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ message: "Something went wrong" });
    }
};

module.exports = { signup, login };

