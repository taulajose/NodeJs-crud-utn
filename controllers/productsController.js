const productsModel = require('../models/productsModel')

module.exports ={

getAll: async function(req, res, next) {
   try{
        const productos = await productsModel.find({})
        res.json(productos);
    }catch(e){
        next(e);
    }
 },

getById: async function(req,res,next){
    try{
        const producto = await productsModel.findById(req.params.id)
        res.json(producto);
    }catch(e){
        next(e);
    }
},


create: async function(req,res,next){
    try{
        const producto = new productsModel({
        nombre:req.body.nombre,
        precio:req.body.precio,
        codigo:req.body.codigo,
        descripcion:req.body.descripcion,
        categoria:req.body.categoria,
        destacado:req.body.destacado
    })

    const prod = await producto.save()
    res.json(prod)
    }catch(e){
        next(e);
    }

},


update: async function(req,res,next){
    try{
        const producto = await productsModel.updateOne({_id: req.params.id},req.body,{multi:false})
        res.json(producto);
    }catch(e){
        next(e);
    }
},


delete: async function(req,res,next){
    try{
        const producto = await productsModel.deleteOne({_id: req.params.id})
        res.json(producto);
    }catch(e){
        next(e);
    }
},

getDestacados: async function(req, res, next) {
    try{
         const productos = await productsModel.find({destacado:true})
             res.json(productos);       
     }catch(e){
         next(e);
     }
  }

}