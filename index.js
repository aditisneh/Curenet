// var express = require("express");
// var app = express();
// var connection = require("./database");

// app.get('/', function(req,res){
//     let sql = "SELECT * FROM STUDENT_INFO";
//     connection.query(sql,function(err,results){
//         if(err) throw err;
//          res.send(results);
//     });
// });

// app.listen(3000, function(){
//     console.log("App listening at 3000");
//     connection.connect(function(err){
//         if(err) throw err;
//         console.log("database connected");
//     })
// });

const express = require("express");
const students = require('./students');

const app = express()
app.use(express.json());

app.listen(3000, ()=> {
    console.log("Listening on 3000");
})

app.get('/', (req,res)=>{
    res.json({message : "api is working"});
})

app.get('/api/students', (req,res)=>{
    res.json(students);
})

app.post('/api/students', (req,res)=>{

    if(!req.body.email){
        res.status(400)
        return res.json({error:"email required"})
    }

    const user = {
        id: students.length+1,
        first_name :req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email
    }
    students.push(user)
    res.json(user)
})

app.put('./api/students/:id', (req,res)=>{
    let id=req.params.id
    let first_name =req.body.first_name
    let last_name =req.body.last_name
    let email= req.body.email

    let index = students.findIndex((student)=>{
        return (student.id == Number.parseInt(id))
    })
    if(index>=0){
        const std = student[index]
        std.first_name = first_name
        std.last_name = last_name
        std.email = email
        res.json(std)
    }else{
        res.status(404)
    }
})

app.delete('/api/students/:id', (res,req)=>{
    let id = req.params.id;
    let index = students.findIndex((student)=>{
        return (student.id == Number.parseInt(id))
    })
    if(index>=0){
        let std = student[index]
       students.splice(index,1)
       res.json(std)
    }else{
        res.status(404)
        res.end
    }
})