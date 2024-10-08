import mongoose from "mongoose";

mongoose.connect("mongodb+srv://errahulsingh1282:c$9589345197@cluster0.uxtyn0i.mongodb.net/Project_Management_App?retryWrites=true&w=majority&appName=Cluster0")
.then(()=>{
    console.log("connected to db...");
    
})
.catch((err)=>{
    console.log(err);
    
})
