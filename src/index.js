const express = require('express');
const userRouter = require('../routes/userRoutes');
//const noteRouter = require('../routes/noteRoutes');
const app = express();
const mongoose = require("mongoose");



app.use(express.json());
app.use((req , res , next) =>{
    console.log("HTTP Method -" + req.method+ " , URL - "+ req.url);
    next();


});

app.use("/user", userRouter);
//app.use("/note", noteRouter);




app.get("/", (req, res) => {
    res.send("hello");
})

mongoose.connect("mongodb+srv://admin:admin@cluster0.5uzvb9c.mongodb.net/?retryWrites=true&w=majority&appName=AtlasApp")
    .then(() => { app.listen(5000, () => { console.log("Server started on port no. 5000") }) }) //if it connected it will call this function
    .catch((error) => { console.log("error") });//if its not connected it will call this function
