const mongoose = require('mongoose');

// connect app database

let dbUrl =  "mongodb+srv://sachin:sachin@cluster0.9x3ucir.mongodb.net/?retryWrites=true&w=majority";

const connect = ()=>{
    mongoose.connect(dbUrl, {useNewUrlParser: true, useUnifiedTopology: true}, (err)=>{
        if(err){
            console.log(err);
        }else{
            console.log('database connected');
        }
    });
}

connect();