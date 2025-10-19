import mongoose from "mongoose";

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    alias:{
        type:String,
        required:true,
        unique:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    }},
    {
        timestamps:true/*Elle ajoute deux champs dans ta base :
                        createdAt → la date de création du document,
                        updatedAt → la dernière date de mise à jour.*/
    
});

const User=mongoose.model('User',userSchema);//Toutes les boîtes = "User"  userSchema=Plan à suivre
export default User;