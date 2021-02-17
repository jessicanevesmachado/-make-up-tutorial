var Connection = require('tedious').Connection;
 
const config = {
    server: "localhost",//localhost 192.168.15.6
    
    options:{
        //port:60786,
        database: 'Botilabs',
        instanceName:'SQLEXPRESS',
        rowCollectionOnRequestCompletion :true
    },
    authentication: {
      type: "default",
      options: {  
        userName: "sa",
        password: "",
    }
  }}


  class Database{

    conecta(){      
       return new  Connection(config);
    }


  }

 
  module.exports = new  Database();
