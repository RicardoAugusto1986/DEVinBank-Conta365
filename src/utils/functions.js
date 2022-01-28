const fileSystem = require('fs');



function getData(fileName = 'user.json'){
    const result = JSON.parse(fileSystem.readFileSync('src/database/'+fileName,'utf8'));
    return result;
}

function createOrUpdateData(data, filename = 'user.json'){
    fileSystem.writeFileSync('src/database/'+filename, JSON.stringify(data));
}

function parseData(updateItem, oldItem){
    return{
        name: updateItem.name ? updateItem.name : oldItem.name,
        email: updateItem.email ? updateItem.email : oldItem.email,
       
    }
}

function getDataFinanciall(fileName = 'financial.json'){
    const result = JSON.parse(fileSystem.readFileSync('src/database/'+fileName,'utf8'));
    return result;
}

function createOrUpdateDatafinance(data, filename = 'financial.json'){
    fileSystem.writeFileSync('src/database/'+filename, JSON.stringify(data));
}







module.exports ={
    getData,
    createOrUpdateData,
    parseData,
    getDataFinanciall,
    createOrUpdateDatafinance
    
}