const usersWebModel = require('../models/usersWebModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

module.exports ={

    create: async function(req,res,next){
        try{
            console.log(req.body)
            const user = new usersWebModel({
                name:req.body.name,
                email:req.body.email,
                password:req.body.password
            })
        
            const document = await user.save()
            res.json(document)
        }catch(e){
            res.json({message:e.message})
        }
    },
    login: async(req,res,next)=>{
        try{
            const userWeb = await usersWebModel.findOne({email:req.body.email})
            if(!userWeb){
                res.json({error:true,message:"Email incorrecto"})
                return
            }
            if(bcrypt.compareSync(req.body.password,userWeb.password)){
                const token = jwt.sign({userId:userWeb._id},req.app.get("secretKey"),{expiresIn:"1h"})
                res.json({error:false,message:"login correcto",token:token})
                return
            }else{
                res.json({error:true,message:"Password incorrecto"})
                return
            }
        }catch(e){
            res.json({message:e.message})
        }
    }

}