module.exports = (app)=>{
    //importar o package bcryptjs
    const bcryptjs = require('bcryptjs')

    //abrir a view login.ejs
    app.get('/registro',(req,res)=>{
        res.render('registro.ejs')
    })

    //gravar os dados do formulario na database
    app.post('/registro', async (req,res)=>{
        //recuperar as informações do formulario
        var dados = req.body
        //verificar se o email ja esta cadastrado

        //conectar com o banco de dados
        const conexao = require('../config/database')() 

        //importar o modelo usuarios
        const usuarios = require('../models/usuarios')

        //procurar no campo email da collection usuarios
        var procurar = await usuarios.findOne({email:dados.email})
        if(procurar){
            return res.send("email ja cadastrado")
        }
        //criptografar a senha
        var senhasegura = await bcryptjs.hash(dados.senha,10)
        console.log(senhasegura)
        //gravar o documento na callection usuarios
        var documento = await new usuarios({
            nome:dados.nome,
            email:dados.email,
            senha:senhasegura
        }).save()
        //depois que gravar redirecionar para a rota login
        res.redirect('/login')
    })
}