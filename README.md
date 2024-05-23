# Pasteis do SI

Bem-vindo ao repositório do sistema de pedidos e gerenciamento de pastéis "Pasteis do SI". Este sistema foi desenvolvido para facilitar o processo de pedidos e gerenciamento em uma lanchonete especializada em pastéis.

## Funcionalidades

O sistema possui as seguintes funcionalidades:

### Para Clientes:

- Acesso como cliente através do nome
- Escolha dos sabores de pastéis desejados e quantidade
- Adição dos itens ao carrinho de compras
- Finalização do pedido com geração automática de número de pedido
- Visualização do resumo do pedido com valor total e opção de avaliação do atendimento

### Para Funcionários/Administradores:

- Acesso com nome de usuário e senha
- Visualização da fila de pedidos pendentes
- Marcação de pedidos como entregues e atualização do histórico de pedidos
- Visualização das avaliações dos clientes
- Gerenciamento dos sabores de pastéis disponíveis
- Gerenciamento dos usuários do sistema

## Estrutura de Arquivos

O projeto está estruturado da seguinte forma:

- **data**: Pasta contendo os arquivos JSON para armazenamento de dados.
  - **avaliacoes.json**: Armazena as avaliações dos clientes.
  - **pedidos.json**: Armazena os pedidos realizados pelos clientes.
  - **sabores.json**: Armazena os sabores de pastéis disponíveis.
  - **usuarios.json**: Armazena os usuários do sistema.
- **scripts**: Pasta contendo os arquivos JavaScript.
  - **scriptAcesso.js**: Contém as funções relacionadas ao acesso do sistema.
  - **scriptJson.js**: Contém as funções para manipulação de arquivos JSON.
  - **scriptPedidos.js**: Contém as funções relacionadas aos pedidos.
  - **scriptPrincipal.js**: Contém a função principal de inicialização da aplicação.
- **index.html**: Arquivo HTML principal da aplicação.
- **styles.css**: Arquivo CSS para estilização da aplicação.

## Como Usar

Para usar o sistema, basta abrir o arquivo `index.html` em um navegador da web compatível com JavaScript. O sistema funcionará no próprio navegador, não sendo necessária a instalação de nenhum software adicional.

Ao acessar a aplicação, siga as instruções na tela para realizar pedidos como cliente ou gerenciar pedidos e sabores como funcionário/administrador.

## Tecnologias Utilizadas

O sistema foi desenvolvido utilizando HTML, CSS e JavaScript para a interface do usuário, além de manipulação de arquivos JSON para armazenamento de dados.

## Paleta de Cores

A interface do sistema utiliza uma paleta de cores composta por tons de laranja, amarelo e preto, com o objetivo de transmitir uma sensação de alegria e apetite, comuns em lanchonetes e restaurantes.

## Contribuição

Contribuições são bem-vindas! Sinta-se à vontade para enviar pull requests com melhorias, correções de bugs ou novas funcionalidades.

## Licença

Este projeto está licenciado sob a [MIT License](LICENSE).
