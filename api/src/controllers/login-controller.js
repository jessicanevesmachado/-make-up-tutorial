"use strict";
const model = require('../models/login-model');

class LoginController {

    login(req, cab){
        model.login(req.body, function cb(resposta){
            cab(resposta);
        });
    };  

}

module.exports = new LoginController();