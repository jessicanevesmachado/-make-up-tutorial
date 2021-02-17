"use strict";
const sessao = require('../config/sessao');


class LoginModel {

    login(req, cb) {    

        if(req.user === 'admin' && req.pwd === 'admin'){   
            cb({ auth: true, token: sessao.gerarToken(req.user)});
          }else    
             cb('Login inválido!');
     
    };

    
}


module.exports = new LoginModel();
