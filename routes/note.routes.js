const express = require("express");
const { auth } = require("../middleware/auth.middleware");
const { NoteModel } = require("../model/note.model");


const noteRouter = express.Router()

noteRouter.use(auth)

noteRouter.post("/create",async (req,res)=>{
    try {
        const note = new NoteModel(req.body)
        await note.save()
        res.status(200).json({msg:"A new note has been created"})

    } catch (error) {
        res.status(400).json({error:error})
    }
 
})

noteRouter.get("/", async(req,res)=>{
    try {
        const notes = await NoteModel.find({userID:req.body.userID})
        res.status(200).json({notes})
    } catch (error) {
        res.status(400).json({error:error})
    }
})

noteRouter.patch("/update/:noteID",async (req,res)=>{
    const {noteID} = req.params 
    const note = await NoteModel.findOne({_id:noteID})
    try {
        if(note.userID === req.body.userID){
            await NoteModel.findByIdAndUpdate({_id:noteID},req.body)
            res.status(200).json({msg:`The note with ID:${noteID} has been updated`})
        }else{
            res.status(200).json({msg:"You are  not authorises!"})
        }
    } catch (error) {
        res.status(400).json({error:error})
    }
})

noteRouter.delete("/delete/:noteID",async (req,res)=>{
    const {noteID} = req.params 
    const note = await NoteModel.findOne({_id:noteID})
    try {
        if(note.userID === req.body.userID){
            await NoteModel.findByIdAndDelete({_id:noteID})
            res.status(200).json({msg:`The note with ID:${noteID} has been deleted`})
        }else{
            res.status(200).json({msg:"You are  not authorises!"})
        }
    } catch (error) {
        res.status(400).json({error:error})
    }
})


module.exports = {noteRouter}