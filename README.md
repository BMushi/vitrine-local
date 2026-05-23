Materia: Programação de dispositivos moveis
Prof: Julio Cartier

Alunos que participaram
Bruna Migon: matricula 202303845847
Juarez Souto: matricula  202302376746
 --------------------------------------------------------------------------------------------------
 Vitrine Local - Guia de Serviços Comunitários

Este é um aplicativo móvel desenvolvido como projeto acadêmico  para resolver um problema real de impacto social: a falta de visibilidade dos pequenos empreendedores e trabalhadores autônomos locais. 

O **Vitrine Local** atua como um catálogo descentralizado de serviços comunitários, aproximando prestadores de serviços e moradores do mesmo bairro, estimulando a economia circular e fortalecendo a rede socioeconômica regional.

 Funcionalidades (Operações CRUD)

O aplicativo foi construído com foco na gestão completa de dados, permitindo as quatro operações fundamentais:

*Create (Criar):** Cadastro de novos empreendedores, informando nome, categoria de serviço e telefone de contato.
*Read (Ler):** Listagem dinâmica e reativa de todos os serviços cadastrados na tela inicial.
*Update (Atualizar):** Edição rápida de informações de serviços já existentes no catálogo.
*Delete (Deletar):** Exclusão segura de registros de serviços que não estão mais disponíveis.

Tecnologias Utilizadas

Este projeto foi desenvolvido utilizando uma arquitetura moderna e híbrida:

*[React Native](https://reactnative.dev/):** Framework principal para desenvolvimento da interface.
*[Expo](https://expo.dev/):** Plataforma que facilita a criação, testes e build do aplicativo nativo.
*[React Navigation](https://reactnavigation.org/):** Gerenciamento de rotas e navegação em pilha (Stack Navigation) entre a listagem e os formulários.
*[SQLite (expo-sqlite)](https://docs.expo.dev/versions/latest/sdk/sqlite/):** Banco de dados relacional embarcado, escolhido para garantir o funcionamento offline e a privacidade dos dados diretamente no dispositivo do usuário.

Como executar o projeto na sua máquina

Certifique-se de ter o [Node.js](https://nodejs.org/) instalado.

**1. Clone o repositório e instale as dependências:**
```bash
# Clone este repositório
git clone [https://github.com/SEU_USUARIO/vitrine-local.git](https://github.com/SEU_USUARIO/vitrine-local.git)

# Acesse a pasta do projeto
cd vitrine-local

# Instale as dependências
npm install
