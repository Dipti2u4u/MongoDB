const mongoose = require('mongoose');

//creating database and connecting it to nodejs

mongoose.connect('mongodb://127.0.0.1:27017/Coder')
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

const createDocument = async() => {
        try {
            const reactplaylist = new Playlist({
                name : "React_js",
                ctype:"Front_end",
                videos:90,
                author:"thapa bro",
                active:true,
            })
            const nodeplaylist = new Playlist({
                name : "Node_js",
                ctype:"Back_end",
                videos:50,
                author:"thapa bro",
                active:true,
            })
            const mongoplaylist = new Playlist({
                name : "MongoDB",
                ctype:"DataBase",
                videos:47,
                author:"thapa bro",
                active:true,
            })
            const jsplaylist = new Playlist({
                name : "javascript",
                ctype:"Front_end",
                videos:150,
                author:"thapa bro",
                active:true,
            })
            const result = await Playlist.insertMany([reactplaylist,nodeplaylist,mongoplaylist,jsplaylist])
            console.log(result);
        }catch(err){
            console.log(err);
        }
   
}
//createDocument();

//read and querying the documents uding mongoose
var getDocument = async() => {
    const result = await Playlist.find({ctype:"Front_end"})
    .select({name : 1})
    console.log(result);
}

//getDocument();

//comparision query operator in mongoose

var getDocument = async() => {
    //const result = await Playlist.find({videos : 50});
    //const result = await Playlist.find({videos : {$gt : 50}});
    //const result = await Playlist.find({videos : {$gte : 50}});
    //const result = await Playlist.find({videos : {$lte:50}});


    //const result = await Playlist.find({ctype : "Back_end"});
    //const result = await Playlist.find({ctype : {$in : ["Back_end"]}});
    const result = await Playlist.find({ctype : {$nin : ["Back_end","DataBase"]}});
    console.log(result);
}

 //getDocument();

//logical query operator in mongoose

 var getDocument = async() => {
    //const result = await Playlist.find({$and : [{ctype : "Back_end"},{author : "thapa bro"}]})
    const result = await Playlist.find({$or : [{ctype : "Back_end"},{author : "thapa bro"}]})
    console.log(result);
}

//getDocument();


//sorting and query methods


var getDocument = async() => {
    const result = await Playlist.find({author : "thapa bro"})
    .select("name : 1")
    .countDocuments();
    //.sort("name : 1")
    console.log(result);
}

//getDocument();


//Update the documents or Update Query

const updateDocument = async(_id) => {
    try {
        const result = await Playlist.findByIdAndUpdate({_id},{

            $set : {
                name : "javascript dipti"
            }
        });

        console.log(result);
    }catch(err){
        console.log(err);
    }

}

updateDocument("6468571067cd2d94ebfcebed");


