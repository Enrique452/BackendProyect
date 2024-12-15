import mongoose from 'mongoose';

export const connectDB = async()=>{
    
        const url = "mongodb+srv://enrique:enrique123@cluster0.efmtj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
    
       await mongoose.connect(url)
        .then( ()=>{
            console.log("Base de datos conectada");
        })
        .catch ((err)=>{
            console.log(err)
            
        })
    }
