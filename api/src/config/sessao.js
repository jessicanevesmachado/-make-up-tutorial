const keysecrety = "chavesecretabotilabs";
var jwt = require('jsonwebtoken');

class Sessao {

    static verifyJWT(req, res, next){

        console.log('verificando token');
    
        var token = req.headers['x-access-token'];
        console.log(token);
        if (!token) return res.status(401).send({ auth: false, message: 'É Necessário informar o token de acesso.' });
        
        jwt.verify(token, keysecrety, function(err, decoded) {
          if (err) return res.status(500).send({ auth: false, message: 'Token informado é inválido.' });
          
          // se tudo estiver ok, salva no request para uso posterior
          req.userId = decoded.id;
          console.log(req.userId);
          next();
        });
      }

      static gerarToken(id){
          var token = jwt.sign({ id }, keysecrety, {
            expiresIn: 3000 // expires in 50min
          });

          return token;
      }
}

module.exports = Sessao;