Materia: Programação de dispositivos moveis 
Prof: Julio Cartier

Alunos que participaram 
Bruna Migon: matricula 202303845847 
Juarez Souto: matricula 202302376746

Para visualizar e testar o aplicativo Vitrine Local em sua máquina e smartphone, por favor, siga
o roteiro de execução detalhado abaixo.
Pré-requisitos do Sistema
-Ter o ambiente Node.js instalado no computador.
-Ter o aplicativo Expo Go instalado no seu smartphone (disponível gratuitamente na
Google Play Store e Apple App Store).
-Celular e computador devem estar conectados à mesma rede Wi-Fi.

Passo 1: Obter o código-fonte
Abra o terminal do seu computador, navegue até a pasta de sua preferência e faça o clone do
repositório:

git clone https://github.com/BMushi/vitrine-local.git

cd vitrine-local 

(Alternativa: O projeto também pode ser baixado em formato .ZIP diretamente pelo link do
repositório).

Passo 2: Instalar as dependências
Com o terminal aberto dentro da raiz do projeto (pasta vitrine-local), execute o comando
abaixo para instalar as bibliotecas necessárias (React Native, React Navigation e expo-sqlite):

npm install 


Passo 3: Iniciar o servidor de desenvolvimento
Após a conclusão da instalação das dependências, inicie o servidor do Expo rodando o
comando:

npx expo start 
Este comando irá compilar os arquivos e gerar um grande QR Code na tela do seu terminal.

Passo 4: Visualizar o aplicativo no Smartphone  
-Abra o aplicativo Expo Go no seu dispositivo móvel.
-Selecione a opção "Scan QR Code".
-Aponte a câmera para o código exibido no terminal do computador.
O aplicativo será aberto imediatamente.
Nota sobre o Banco de Dados: O projeto utiliza SQLite local. Na primeira execução do
aplicativo pelo Expo Go, as tabelas serão criadas automaticamente no dispositivo, permitindo o
teste imediato de todas as operações CRUD exigidas no trabalho.

Fico á disposição!

23/05/2026
