const { getData } = require("../utils/functions")


module.exports ={

    async getUserById(id){
        const users = getData('user.json');
       
        try{
            const user = users.find((item)=> item.id === Number(id));
            
            if(!user){
               throw new Error('Não existe usúario com este ID');
            }
            return user;
    
            }catch (error){
                return {err: error.message};
            }

        
    }

}