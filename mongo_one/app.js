const mongoose = require('mongoose');

//creating database and connecting it to nodejs

mongoose.connect('mongodb://127.0.0.1:27017/Mydb')
.then(()=> console.log("connection successful"))
.catch((err)=> console.log(err));

// Adding the schema or the structure of our database

const playlistSchema = new mongoose.Schema({

    name : String,
    ctype:String,
    videos:Number,
    author:String,
    active:Boolean,
    date: {
        type:Date,
        default:Date.now
    }

})

//Adding collection to our database with the help of models

const Playlist = new mongoose.model("Playlist", playlistSchema);

//creating and insert documents

const reactplaylist = new Playlist({

    name : "React_js",
    ctype:"Front_end",
    videos:90,
    author:"thapa bro",
    active:true,
})

reactplaylist.save();