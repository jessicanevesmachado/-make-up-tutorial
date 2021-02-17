"use strict";
var database =  require('../config/database');
var Request= require('tedious').Request;
var TYPES = require('tedious').TYPES;  

class FotoModel {
    
    save(response, cb) {       
       
        var service = this;
        var connection = database.conecta();       
        connection.on('connect', function(err) {  
           
            if(err) cb({status:false, mensagem: 'Não foi possivel se conectar no banco de dados.'})
            else
                service.inserir(connection,response,cb);  

           
        });  
     
    };

    inserir(connection,response,cb){ 

          var service = this;
          var bufferfoto = new Buffer(response.foto , 'base64');
        
          var  request = new Request("insert into Tutorial values( @video, @foto) SELECT SCOPE_IDENTITY() ", function(err) {  
                if (err) {
                    cb({status:false, mensagem: 'Erro ao salvar a foto.'});
                    console.log('erro');
                }
                     
                
           });  
        
           request.addParameter('video', TYPES.VarChar , response.video);  
           request.addParameter('foto', TYPES.Image, bufferfoto);  
             
           request.on('row', function(columns) {               
               
                 cb({status:true, mensagem: 'Operação realizada com sucesso.'});
                 console.log('row');
               
           });       

           connection.execSql(request);  
    }

    //** exemplo de como recuperar a imagem */
    selecionar(id,cb){
        
        var connection = database.conecta();       
        connection.on('connect', function(err) {  
           
            if(err) cb({status:false, mensagem: 'Não foi possivel se conectar no banco de dados.'});
            
            var  request = new Request("select * from Tutorial where id ="+id, function(err, rowCount,row) {  
    
                if(err) console.log(err);

                var buffer  = row[0][2].value;
                let base64data = "data:image/jpeg;base64,"+buffer.toString('base64');
               console.log(base64data);      
               cb({status:true, mensagem: 'Operação realizada com sucesso.', foto:base64data});      
           });  

           connection.execSql(request);  
    
        }); 
    
    }

    
}


module.exports = new FotoModel();
