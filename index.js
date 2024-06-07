const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const port = 8080;
const uri = "mongodb+srv://elsemitchell1:xyLCMGOP2Hdabm0n@cluster0.dxwxomp.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

app.use(cors());
app.use(express.json());

async function connect(){
    try{
        await mongoose.connect(uri);
        console.log("Connected to mongodb");
    }catch(err){
        console.err(err)
    }
}

connect();

const commentSchema = new mongoose.Schema({
    projectName: String,
    name: String,
    message: String,
    date:{type: Date, default: Date.now}
});

const Comment = mongoose.model('Comment', commentSchema);

app.post('/comments', async (req, res) => {
    const {projectName, name, message} = req.body;
    const comment = new Comment({projectName,name,message});
    await comment.save();
    res.status(201).send(comment);
});

app.get('/comments/:projectName', async (req, res) => {
    const {projectName} = req.params;
    const comments = await Comment.find({projectName});
    res.status(200).send(comments);
})

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
})