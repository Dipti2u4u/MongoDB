//builr in validation using MongoDB

const mongoose = require('mongoose');

//connection creation and creating a new database

mongoose.connect('mongodb://127.0.0.1:27017/ValidationDB')
.then(()=> console.log("connection successful...."))
.catch((err)=> console.log(err));

//Schema

const ValidSchema = new mongoose.Schema({

    name : {
        type : String,
        required : true,
        unique : true,
        uppercase : true,
        minlength : 4,
    },
    ctype : {
        type : String,
        enum : ["Programming","core","serverside"],
        required : true
    },
    //Adding custom validation to videos
    videos : {
        type : Number,
        Validate(value) {
            if(value < 0){
                throw new Error('videos count should not be negetive')
            }
        }
    },
    author : String,
    active : Boolean,
})

//creating collection using models

const collection = new mongoose.model("validCollection", ValidSchema);

//creating documents and inserting data to it

const javaPlaylist = new collection ({

    name : "java",
    ctype : "Programming",
    videos : -120,
    author : "Dipti",
    active : true
})

//javaPlaylist.save();
