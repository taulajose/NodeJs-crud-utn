const mongoose = require ('../bin/mongodb')
const errorMessage = require('../util/errorMessage');
const validators = require('../util/validators');
const bcrypt = require('bcrypt');

const userWebSchema = new mongoose.Schema({
    name: {
        type:String,
        required:[true,errorMessage.GENERAL.campo_obligatorio]
    },
    email:{
        type:String,
        required:[true,errorMessage.GENERAL.campo_obligatorio],
        unique:true,
        validate:{
            validator: function(v){
                return validators.emailValidate(v)
            },
           message: errorMessage.USERSWEB.passwordIncorrect
        }
    },
    password:{
        type:String,
        required:[true,errorMessage.GENERAL.campo_obligatorio],
        validate:{
            validator: function(v){
                return validators.isGoodPassword(v)
            },
           message: errorMessage.USERSWEB.passwordIncorrect
        }
    }

});
//pre para que se ejecute antes o post despues. save, delete 
// hasSync encripta el password
userWebSchema.pre("save",function(next){
    this.password = bcrypt.hashSync(this.password,10);
    next();
})

userWebSchema.statics.findByIdAndValidate = async function(id){
    const document = await this.findById(id);
    if(!document){
        return{
            error:true,
            message: "El usuario no existe"
        }
    }
    return document
}

  module.exports=mongoose.model("usersWeb",userWebSchema)