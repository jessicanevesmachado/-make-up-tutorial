"use strict";
const db = require('../models/foto-model');

class FotoController {

    save(req, cab){
        db.save(req.body, function cb(resposta){
            cab(resposta);
        });
    };  

}

module.exports = new FotoController();