const express = require('express')
const bodyParser = require("body-parser")
const mongoose = require("mongoose")
const app = express()
const port = 3002

app.use(bodyParser.json())
app.use(express.static('public'))
app.use(bodyParser.urlencoded({
    extended:true
}))

mongoose.connect('mongodb://localhost:27017/mydb',{
    useNewUrlParser: true,
    useUnifiedTopology: true
});



var db = mongoose.connection;

db.on('error',()=>console.log("Error in Connecting to Database"));
db.once('open',()=>console.log("Connected to Database"))

app.post("/sign_up",(req,res)=>{
    const name = req.body.name;
    const email = req.body.email;
    const skills = req.body.skills;
    const phno = req.body.phoneno;
    const password = req.body.password;

    var data = {
        "name": name,
        "email" : email,
        "skills" : skills,
        "phno": phno,
        "password" : password
    }

    db.collection('users').insertOne(data,(err,collection)=>{
        if(err){
            throw err;
        }
        console.log("Record Inserted Successfully");
    });

    return res.redirect('/signup_success.html')

})

app.get("/",(req,res)=>{
    res.set({
        "Access-Control-Allow-Origin": '*'
    })
    return res.redirect('/index.html');
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})