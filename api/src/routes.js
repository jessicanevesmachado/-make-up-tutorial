"use strict";
const express = require('express');
const routes = express.Router();  
const app = express(); 
const fotoController = require('./controllers/foto-controller');
const loginController = require('./controllers/login-controller');
const sessao = require('./config/sessao');
var path = require('path');

routes.get('/', function(req, res) {
    
    res.sendFile(path.resolve('../index.html')) 
});

routes.get('/tela1', function(req, res) {
    
    res.sendFile(path.resolve('../tela1.html')) 
});


routes.post('/foto/save',sessao.verifyJWT, (req, res) => {
    fotoController.save(req, function cab(resposta) {
        res.send(resposta);
    });
});

routes.post('/login', (req, res, next) => {
    loginController.login(req, function cab(resposta) {
        res.send(resposta);
    });    
})  

routes.get('/logout', function(req, res) {
    res.status(200).send({ auth: false, token: null });
});

routes.get('/checaAutenticacao',sessao.verifyJWT, (req, res, next) => {
    res.send('Autenticado');
})

 

module.exports = routes;