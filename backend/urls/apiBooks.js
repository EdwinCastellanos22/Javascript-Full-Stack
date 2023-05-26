const {Router} = require("express");
const routerBook= Router();
const fs= require('fs-extra');
const path = require('path');

const storage = require("../utils/storage");
const multer = require("multer");

const book = require("../models/book")
const upload= multer({storage:storage})

routerBook.get("/books", async(req,res) => {
    const books= await book.find();
    res.json(books);
})

routerBook.post("/books", upload.single('image'), async(req, res) => {
    const { title, author, isbn }= req.body;
    const image = `/uploads/${req.file.filename}`
    try{
    const newBook= new book({title, author, isbn, imagePath:image});
    console.log(newBook);
    await newBook.save()
    res.status(201).json({"Message":"Book Save!"});
    }
    catch (error){
        res.status(400).json(error)
    }
})

routerBook.delete("/books/:id", async(req, res) => {
    try{
        const bookDeleted= await book.findByIdAndDelete(req.params.id);
        fs.unlink(path.resolve('./backend/public' + bookDeleted.imagePath))
        
        res.status(200).json({"Message":"Book Deleted!!"})

    }
    catch (error){
        res.status(500).json(error);
    }
})

module.exports= routerBook