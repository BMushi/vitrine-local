Materia: Programação de dispositivos moveis Prof: Julio Cartier

Alunos que participaram Bruna Migon: matricula 202303845847 Juarez Souto: matricula 202302376746
 
# Vitrine Local 

E aí! Bem-vindo ao repositório do Vitrine Local.

Sabe quando você precisa de um encanador, uma manicure, ou de alguém que faça bolos no seu bairro e não sabe onde achar o contato? Esse aplicativo nasceu exatamente para resolver isso. Ele é um guia prático e offline para conectar moradores aos pequenos empreendedores e autônomos locais, ajudando a movimentar a economia da região.

### Como o aplicativo foi construído

Para manter tudo rápido e simples, o projeto foi desenvolvido usando React Native junto com o Expo, garantindo que o aplicativo rode perfeitamente tanto em Android quanto em iOS. A transição entre as telas do formulário e da lista foi feita utilizando o React Navigation. 

O grande diferencial é o banco de dados. Escolhi utilizar o SQLite, o que significa que todas as informações ficam salvas diretamente no celular do usuário. Não é necessário criar contas, usar internet ou gastar dados móveis para o aplicativo funcionar.

### Como rodar o projeto na sua máquina

Para testar o projeto no seu computador, você só vai precisar ter o Node.js instalado na máquina e o aplicativo Expo Go baixado no seu celular.

Primeiro, abra o seu terminal e faça o clone do projeto rodando o comando:
```bash
git clone https://github.com/BMushi/vitrine-local.git
Em seguida, entre na pasta do projeto que acabou de ser criada:

Bash
cd vitrine-local-app
Agora nós precisamos baixar as dependências que fazem o aplicativo funcionar. Digite o comando abaixo e aguarde a instalação terminar:

Bash
npm install
Com tudo instalado, é só iniciar o servidor do aplicativo:

Bash
npx expo start
Um QR Code gigante vai aparecer na tela do seu terminal. Pegue o seu celular, abra o aplicativo Expo Go e escaneie esse código.
