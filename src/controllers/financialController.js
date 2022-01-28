const { getData, getDataFinanciall, createOrUpdateData, createOrUpdateDatafinance,createOrUpdateDataXlsx }  = require("../utils/functions")
const userService = require('../services/user.service');
const financeService = require('../services/financial.service');
const xlsxPopulate = require('xlsx-populate');
const { resolvePromissesForFinance } = require("../services/financial.service");



module.exports = {

   async financeMonth(req,res){


    //#swagger.tags = ['Dados Financeiros']
    //#swagger.description = "Endpoint que traz a soma das despesas do mês."

    const { id }= req.params;

    if(!id){
           
        return res.status(400).send({message: 'Esta informação não existe!'})

    }

    const response =  await financeService.resolvePromissesForFinance(id);  
        
       return res.status(200).send({message: response})
   },

    async getAllAccounts(req, res){
        //#swagger.tags = ['Dados Financeiros']
        //#swagger.description = "Endpoint que traz o json com as contas e despesas de todos os usuarios"

        const response =  await financeService.resolvePromissesForFinance();      
       return res.status(200).send({message: response})
    },



    async deleteOne(req, res){

         //#swagger.tags = ['Dados Financeiros']
        //#swagger.description = 'Metodo pra deletar uma transação do usuario  atravez do id da transação, nescessario colocar o id do usuario, e id da transação que quer deletar.'
         

        const { userId, financialId } = req.params;
        
        const userFinance = await financeService.resolvePromissesForFinance(userId);
        const nunberFinance = userFinance.id;

        const allFinance = await financeService.resolvePromissesForFinance();
         
        if(!userFinance){
            return res.status(400).send({message:"Essa conta não existe"})
        };

        const financeAll = userFinance.financialData;
        

        const existFinance = financeAll.find((item)=>  item.id === Number(financialId));

        if(!existFinance){
            return res.status(400).send({message:"Essa despesa não existe"})
        };
        

        const financialData = financeAll.filter((item)=>{
            if(item.id != Number(financialId)){
                return item;
            }
        });
        
        const FinanceTransitionDelete =  {...userFinance,financialData};

        

        const newFinanceJson = allFinance.map((item) => {
            if(item.id != Number(nunberFinance)){
                return item
            }else{
                return FinanceTransitionDelete
            }
        })
        
     
        createOrUpdateDatafinance(newFinanceJson);

        return res.status(200).send({message: "Finança deletada com sucesso"});
    },

 

    async importUserfinanciall(req,res){
        
        //#swagger.tags = ['Dados Financeiros']
        //#swagger.description = "Endpoint que registra dados de um arquivo .xlsx."
         
        /*
        #swagger.consumes = ['multipart/form-data']
        #swagger.parameters['file'] = {
             in: 'formData',
             type: 'file',
             required: 'true',
             description: 'Insira o arquivo chamado financial',
        }*/
        
        
        const { userId } = req.params;
        const xlsxBuffer = req.file.buffer
        const xlsxData = await xlsxPopulate.fromDataAsync(xlsxBuffer)
        const rows = xlsxData.sheet(0).usedRange().value()
        const [ firstRow ] = rows
        
             
       const keys = [ 'price','typesOfExpenses','date','name' ];
       
       const existAllKeys = firstRow.every((item, index) => {
           return keys[index] === item
           
       })
       
       if(!existAllKeys || firstRow.length != 4){
           
           return res.status(400).send({message: 'Esta informação não existe!'})

       }

       const usersFinancial = await financeService.resolvePromissesForFinance(userId); 
       const allFinancialAccounts = await financeService.resolvePromissesForFinance(); 
       const financialData = usersFinancial.financialData.map((spent)=> {return spent});
       console.log(financialData.slice(-1).id)
       
       const filterRows = rows.filter((_, index) => index != 0) 
       
       filterRows.map((row) => {
           const result = row.map((itemRow, index) => {
              // console.log(firstRow[index])
            if(firstRow[index] == "date"){
            return {
                   [firstRow[index]]: itemRow ? xlsxPopulate.numberToDate(itemRow) :""
               }
            }else{
              return {  [firstRow[index]]: itemRow ? itemRow :"" }
            }
                })
                const objectUser = Object.assign({},{id: financialData.length + 1}, ...result)
                financialData.push(objectUser)
            
       })

       const accountUpdated =  {...usersFinancial,financialData};
       const numberFinance = usersFinancial.id;
       const newFinanceJson = allFinancialAccounts.map((item) => {
        if(item.id != Number(numberFinance)){
            return item
        }else{
            return accountUpdated
        }
    })

        createOrUpdateDatafinance(newFinanceJson)
       return res.status(200).send({message: 'Despesa cadastrada com sucesso!'})
   }
}