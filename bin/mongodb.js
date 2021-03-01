var mongoose =require('mongoose');

mongoose.connect('mongodb://localhost/Productos',{useNewUrlParser:true},function(error){
    if(error){
        throw error;
    }else{
        console.log('conectado a MongoDB');
    }
});

module.exports = mongoose;