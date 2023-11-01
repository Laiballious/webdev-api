const { get } = require("mongoose");
const noteModel = require("../models/note");




const createNote = (req, res) => {

   console.log(req.userId);
};
const updateNote = (req, res) => { };
const deleteNote = (req, res) => { };
const getNote = (req, res) => { }


module.exports =
{
   createNote,
   updateNote,
   deleteNote,
   getNote
}
