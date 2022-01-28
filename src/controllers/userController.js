const { getData, createOrUpdateData, parseData } = require("../utils/functions")
const useService = require ('../services/user.service');
const axios = require('axios');



module.exports={
    async allUser (req,res){

        //#swagger.tags = ['Usuarios']
    //#swagger.description = "Retorna toda a lista de usuários."

        const users = getData();
        return res.status(200).json({'users': users});
    },

    async indexOne(req,res){
    //#swagger.tags = ['Usuarios']
    //#swagger.description = "Retorna o usuario atravez do seu id."

        const { id }= req.params;
        
        try{
            const response = await useService.getUserById(id);

            if(response.err) throw new Error(response.err);

            return res.status(200).json({ user: response});
    
            }catch (error){
                return res.status(400).json({error: error.message});
            }
       
    },

    async create(req, res){
        //#swagger.tags = ['Usuarios']
        //#swagger.description = "Endpoint que cria usuario, nescessario inserir name, email."
         /*#swagger.parameters['obj']= {
             in: 'body',
             schema: {
                 name: 'Ricardo',
                 email: 'ricardo@.com.br'
            }
        }*/
        const {id, name , email } = req.body;
        const existKeyvalue = Object.keys(req.body).filter((item)=> !req.body[item]);
       

        if(existKeyvalue.length >= 1){
            return res.status(400).send({message: "Preencha todos os campos"});
        }

        const users = getData();
        
        const createNewUser = [
            ...users, {
                id: users.length+1,
                name: name,
                email: email,
            
    
            }
        ]
        createOrUpdateData(createNewUser);
        return res.status(200).send({message: "Usúario Adicionado"});
    },

    async updateOne(req, res){
         //#swagger.tags = ['Usuarios']
        //#swagger.description = "Endpoint pra buscar usuarios cadastrados atravez do seu id."
         /*#swagger.parameters['obj']= {
             in: 'body',
             schema: {
                 name: 'Ricardo',
                 email: 'ricardo@.com.br'
            }
        }*/
        
        const { id } = req.params;
        const {  name, email } = req.body;
        const users = getData();
        const existUser = users.filter((item)=> item.id === Number(id));
        const [user] = existUser;
        
        if(!user ){
            return res.status(400).send({message: "usúario não existe"});
        }

        const findForUpdate = Object.keys(req.body).map((item)=> {
           if(item === "name" || item === "email"){ 
            return { [item]: req.body[item] }
            }else{
                return res.status(400).send({message: "O campo não existe"});  
            }
        } );
        
        const arrayToObject = Object.assign({}, ...findForUpdate);
        
        const userUpdateList = users.map((item)=>{
            if(item.id === Number(id)){
               return {id: Number(id), ...parseData(arrayToObject,item)}
            }else{
                return {...item};
            }
        } );
         
        createOrUpdateData(userUpdateList);

        return res.status(200).send({message: "Atualização de dados com sucesso!"});
    },

    



}