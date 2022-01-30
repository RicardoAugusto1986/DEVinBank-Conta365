# DEVinBank-Conta365
Projeto em NODE.JS pro curso DEVinHouse SENAI-SC


# DEVinBank

 ### Criação de endpoint Projeto de BackEnd DEVinHouse-SC 
 
 Projeto em NODE.JS,  criado pra aplicar os conhecimentos ensinados em aula de backend do curso DEVinHouse do SENAI-SC

 ##### Passos pra testar e validar os endpoints
 
 1: Faça um clone do repositorio.
 2: Iniciar com o comando no terminal:  npm install.
 3: iniciar o projeto atravez do comando no terminal: npm start.
 4: Colocar na url: http://localhost:3333/api-docs/ na aba do navegador pra documentação e testes pelo Swagger.
 5: Disponibilizei na pasta do projeto uma planilha "financial.xlsx" para facilitar os testes.




# Usuarios

 
~~~~
POST: Endpoint que cria usuarios nescessario inserir name, email
~~~~
~~~~
PATCH: Endpoint pra fazer atualizações de dados do email ou name de usuarios já cadastrados, 
~~~~
~~~~
GET: Endpoint pra buscar usuarios cadastrados atravez do seu id, quando id não corresponde a nenhum usuario retorna um erro por 
~~~~

FIM DO METODO USUARIO


# DADOS FINANCEIROS

~~~
DELETE: Endpoint pra deletar uma transaação do usuario, recebe 2 ids, o userId e financialId,
e deleta a transação solicitada atravez do finacialId
~~~~
~~~~
GET: Endpoint que traz todos os usuarios e suas despesas.
~~~~
~~~~
POST: Endpoint que registra uma nova despesa atrazez de um arquivo .xlsx, 
~~~~



