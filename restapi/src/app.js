const express = require('express');
const app = express();
require('./db/conn');
const Student = require('./models/students')
const port = process.env.PORT || 8000;

app.get("/", (req,res)=> {
    res.send('welcome to home page');
})

app.use(express.json());

/*app.post('/students',(req,res)=>{

    //getting the data we have inserted in postman
    console.log(req.body)
    const user = new Student(req.body);
    
    //updating or sending the data to the database
    user.save().then(()=>{
        res.status(201).send(user)
    }).catch((err)=>{
        res.status(400).send(err)
    })
})*/

//handling post method using async and await
app.post("/students",async(req,res)=>{
    try{
        const user = new Student(req.body);
        const createUser = await user.save();
        res.status(201).send(createUser);
    }catch(err){
        res.status(400).send(err);
    }
})

//handling GET  request in REST api
//read the data of the registered students

app.get("/students",async(req,res)=>{
    try{
        const studentsData = await Student.find();
        res.send(studentsData);
    }catch(err){
        res.status(400).send(err)
    }
})

//getting individual students data using id
app.get("students/:id",async(req,res)=>{
    try{
        const _id= req.params.id;
        console.log(req.params.id);
        res.send(req.params.id);
    }catch(err){
        //res.status(500).send(err);
    }
})


app.listen(port,()=>{
    console.log(`server is listening on port ${port}`)
})