"use strict";
const express  = require('express');
const cors     = require('cors');
const { exec }  = require('child_process');
process.env.NODE_NO_WARNINGS = 1;
const app = express();
app.use(cors());
var path = require('path');

app.use(express.json({limit: '50mb', extended: true}));
app.use(express.urlencoded({limit: '50mb',  extended: true}));
app.use(require('./src/routes'));


app.use(express.static(path.resolve('../public')));

var server = app.listen(3333);
server.setTimeout(21600000);

console.log('Servidor iniciado na porta 3333');