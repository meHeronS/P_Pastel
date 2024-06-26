# Pasteis do 1° SI

Este projeto é um sistema de pedidos para a loja "Pasteis do 1° SI", permitindo acesso tanto de clientes quanto de funcionários. O sistema facilita que clientes façam pedidos de pastéis e que funcionários gerenciem esses pedidos, além de adicionar e gerenciar sabores, funcionários e visualizar avaliações.

## Descrição dos Arquivos

### Arquivos Principais

#### index.html
- Página inicial do sistema com opções para acesso como cliente ou funcionário.

#### styles.css
- Arquivo de estilização que contém toda a estilização do projeto.

### Scripts

- **scriptPrincipal.js**: Script principal para funções gerais do sistema.
- **scriptAcesso.js**: Script para validação de acessos como cliente ou funcionário.
- **scriptPedidos.js**: Script de controle dos pedidos realizados pelos clientes.
- **scriptJson.js**: Script de inicialização dos JSONs no sistema.

### Dados

- **usuarios.json**: Dados dos funcionários, sejam administradores ou usuários padrão.
- **pedidos.json**: Pedidos em aberto feitos pelos clientes.
- **avaliacoes.json**: Avaliações dos clientes.
- **sabores.json**: Sabores disponíveis para compra.
- **historicoPedidos.json**: Histórico de todos os pedidos finalizados.

### Páginas

- **cliente.html**: Página para entrada do nome do cliente e validação para seguir aos pedidos.
- **funcionario.html**: Página para entrada dos dados do funcionário e validação de acesso.
- **pedidos.html**: Página com a lista de pedidos em aberto.
- **cadastroUsuarios.html**: Página de gerenciamento de usuários.
- **cadastroSabores.html**: Página de gerenciamento de sabores.
- **avaliacoes.html**: Página de visualização das avaliações dos clientes.
- **historicoPedidos.html**: Página com o histórico de todos os pedidos finalizados.

## Funcionamento

### Acesso Cliente
1. Na página inicial, o cliente pode clicar em "Acesso Cliente".
2. O cliente é direcionado para `cliente.html` onde deve inserir seu nome.
3. Após inserir o nome, o cliente é redirecionado para `pedidos.html` onde pode escolher os sabores de pastéis.
4. Na página de pedidos, o cliente pode selecionar os sabores desejados e fazer o pedido.
5. Os pedidos são registrados em `pedidos.json`.

### Acesso Funcionário
1. Na página inicial, o funcionário pode clicar em "Acesso Funcionário".
2. O funcionário é direcionado para `funcionario.html` onde deve inserir usuário e senha.
3. Após validar o acesso, o funcionário tem acesso a várias páginas de gerenciamento:
    - **Pedidos em aberto**: `pedidos.html`
    - **Cadastro de Usuários**: `cadastroUsuarios.html`
    - **Cadastro de Sabores**: `cadastroSabores.html`
    - **Avaliações dos Clientes**: `avaliacoes.html`
    - **Histórico de Pedidos**: `historicoPedidos.html`

### Gerenciamento de Dados
- Os dados do sistema são armazenados em arquivos JSON simulados no `localStorage` do navegador.
- O `scriptJson.js` é responsável pela inicialização dos dados no sistema.
- Os scripts específicos, como `scriptPedidos.js`, manipulam a leitura e escrita dos dados para garantir o funcionamento correto do sistema.

### Funcionalidades do Sistema

#### 1. Pedidos de Clientes
- Os clientes podem fazer pedidos selecionando os sabores de pastéis disponíveis.
- Cada pedido é registrado e adicionado à lista de pedidos em aberto.
- Os pedidos são visualizados pelos funcionários para preparo e gestão.

#### 2. Gerenciamento de Funcionários
- Administradores podem adicionar, editar e remover funcionários.
- A autenticação de funcionários é feita com base nos dados armazenados em `usuarios.json`.

#### 3. Gerenciamento de Sabores
- Novos sabores de pastéis podem ser adicionados ao sistema.
- Sabores existentes podem ser editados ou removidos.

#### 4. Avaliações dos Clientes
- Clientes podem deixar avaliações sobre seus pedidos.
- Funcionários podem visualizar todas as avaliações para melhorar o serviço.

#### 5. Histórico de Pedidos
- Todos os pedidos finalizados são registrados no histórico.
- O histórico permite que os funcionários revisem pedidos passados e avaliações relacionadas.

### Comentários e Detalhes

- Todos os scripts estão bem comentados para facilitar o entendimento.
- A estrutura do projeto permite fácil manutenção e expansão de funcionalidades.
- O sistema não depende de um servidor backend, funcionando totalmente no ambiente local do navegador.

## Autores

- Breno Viana do Espirito Santo
- Geovanni Da Costa Xavier
- Heron Victor Vieira da Silva
- José Henrique Pereira Brito
- Pedro Henrique Correa Diniz

## Licença

Este projeto está licenciado sob a [MIT License](LICENSE).
