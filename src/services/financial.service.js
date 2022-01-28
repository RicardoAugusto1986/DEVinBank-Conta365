const { getDataFinanciall } = require("../utils/functions");
const userService = require('../services/user.service');


module.exports ={

    async resolvePromissesForFinance(id){

        const financiall = getDataFinanciall('financial.json');
       
        const response = await Promise.all(financiall)
       
        try{

            if(id){
                const finance = response.find((item)=> item.userId === Number(id));
                return finance;
            }
           
            return response;
    
            }catch (error){
                return {err: error.message};
            }

        
    }

}