# Cypress API Test Automation

## Instalar Dependencias

	npm install

## Instalar Cypress

	npm install cypress --save-dev

  
## Adicionar token

Pegar o token por esse link: https://gorest.co.in/consumer/login
Adicionar o token no ficheiro cypress.example.env.json e renomear para cypress.env.json

## Executar os testes

### Executar no modo headless
	npx cypress run

### Abrir a interface grafica do Cypress
	npx cypress open
	
## Respostas:
  
#### 1. Motivos por ter escolhido Cypress:

. Conseguimos testar APIs REST a utilizar os metodos HTTP como GET, POST, PUT e DELETE.

. A escrita de testes é mais rapida que outros frameworks e não é preciso utilizar, na maioria dos casos, dependencias ou pacotes de terceiros.

. Tem uma boa documentação, esta sempre a ser atualizado e tem uma comunidade forte e ativa.

. Várias maneiras de lidar com waits (defaultCommandTimeout, timeout, função callback(.then(), .should())). . Tem uma interface gráfica que facilita a visualização da execução do teste e identificação de erros.

. Podemos combinar testes API com frontend para cobrir cenários end-to-end e validar a integração entre a UI e API.

. Também ja trabalhei com automação de testes API com Cypress, por isso me sinto mais confortável com essa ferramenta.
  
  
#### 2. UC para ser automatizados:

. UCs a fim de interagir com todos os endpoints da API: /users, /posts, /comments, /todos.

. UCs com ids atribuidos na pesquisa, exemplo: /users/user_id, /post/post_id, /users/user_id/post.

. UCs a fim de cobrir todos os status code que são esperados, "happy path" e cenários de erro: 200, 201, 204, 304, 400, 401, 403, 404, 405, 415, 422, 429, 500.

. UC utilizando os parametros "page" e "per_page". No caso do "per_page" validar oque acontece ao escolher 100 (valor máximo) e 101.

. UCs com e sem token para os metodos PUT, POST, PATCH, DELETE. Deve ter sucesso na solicitação com token e falhar sem.

. UCs com requisições sem body para confirmar que os campos são obrigatórios, um exemplo POST.

. UCs com endpoint errado, exemplo: /wrong.

. UCs com id inexistente, exemplo: /users/11111.

 
#### 4.1. Explica e justifica uma implementação de testes de carga a esta API:

Para implementar testes de carga a essa API Rest, temos fortes ferramentas opensource como JMeter e K6. JMeter possui uma interface grafica e pode ser executado os testes via linha de comando. Conseguimos testar cada endpoint, cada metodo HTTP e colocar os listeners para obtermos o registo de como correu a execução do teste. Já o K6 é mais focado para a automação e com a liguagem JavaScript. Com ele conseguimos utilizar várias metricas para favorecer o report (Trend, Rate, Counter), validar a duração da execução para cada usuário, validar o percentual do sucesso e da falha entre outras validações. Ambas ferramentas conseguimos manipular o numero de usuários e o tempo desejado da execução do teste. Para ambas ferramentas, se for viável, eu faria uma chamada para cada método HTTP em cada endpoint. Para os endpoints mais críticos ou mais utilizados, podemos fazer uma requisição com um número maior de usuários em um tempo maior.

Testes de carga devem ser implementados nessa API para validar qão bem ela esta a desempenhar. Com foco em validar se a aplicação entrega uma boa e eficiente experiencia de usuário. Monitorar essa performance, favorece o desenvolvimento, pós-desenvolvimento e a continuidade do sucesso da aplicação, resolvendo possíveis problemas e comunidar a qualidade da aplicação. Por meio desse teste conseguimos validar o comportamento dessa API em condições normais e de pico, buscando garantir que ela permanece estavel nessas condições.

 
#### 4.2. Como implementarias uma solução de Continuous Testing, justifica:

Como estratégia de Continuous Testing eu utilizaria o Jhenkins devido a sua relevância quando se trata de ferramentas para CI/CD e por isso possui uma boa documentação e muito conteudo da comunidade sobre diversos tipos de implementação. Para implementar essa solução, eu seguiria os seguintes passos:

- Temos que ter o projeto de automação em uma plataforma como Github

- Preparar os scripts que vão ser executados

- Instalar o Jenkins, no mac são os comandos "brew install jenkins" e iniciar "brew services start jenkins"

- Criar uma tarefa, nos meus estudos, eu sempre criei um projeto de estilo livre, mas no caso de uma empresa, acredito que pipeline seria a melhor opção, porque assim conseguimos preparar todo o ciclo de desenvolvimento.

- Podemos fazer um projeto com parametros, adicionando assim os scripts a serem executados. No caso desse projeto, "cypress:chrome" e "cypress:edge"

- Adicionamos o link do repositório, nesse caso o Github

- Preparar a build e adicionar comandos para instalar as dependencias "npm install" e para executar os testes com os scripts "npm run %Script%"

- Podemos utilizar alguns plugins para ajudar nos reports após a execução dos testes como "Publish HTML reports"

- Depois das configurações feitas podemos fazer a build selecionando o script que queremos executar

- Podemos acompanhar a execução pelo console e o resultado da execução em HTML

Podemos executar o Jhenkins junto ao Docker. Docker faz uma virtualização de um sistema operacional em containers. Para isso precisariamos da docker image (um pacote executavel de software incluindo todas as dependencias necessárias) do Jhenkins com o comando "docker run -p 8080:8080 -p 50000:50000 -d -v jenkins_docker:/var/jenkins_docker jenkins/jenkins:lts"
