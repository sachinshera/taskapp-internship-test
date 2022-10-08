const mongoose = require('mongoose');

// connect app database

const connect = ()=>{
    mongoose.connect('mongodb://localhost:27017/taskApp', {useNewUrlParser: true, useUnifiedTopology: true}, (err)=>{
        if(err){
            console.log(err);
        }else{
            console.log('database connected');
        }
    });
}

connect();