const mongoose = require ('../bin/mongodb')
const errorMessage = require('../util/errorMessage')

const productSchema = new mongoose.Schema({
    nombre:{
        type:String,
        required:[true,errorMessage.GENERAL.campo_obligatorio],
        minlength:1,
        maxlength:10
    },
    precio:Number,
    codigo:{
        type:String,
        unique:true
    },
    descripcion:String,  
    categoria:String,
    destacado:Boolean

})
productSchema.virtual("price_currency").get(function(){
    return "$ "+this.precio
  
});

  productSchema.set("toJSON",{setters:true,virtuals:true})
  module.exports=mongoose.model("productos",productSchema)