# Sistema de Gerenciamento de Triunviratos

Este sistema foi desenvolvido para gerenciar triunviratos e conectar cada um deles à página de plantão correspondente. Ele permite visualizar, editar e navegar para os detalhes de cada triunvirato.

## Tecnologias Utilizadas
- **React Js** - Biblioteca principal para construção da interface.
- **React-router-dom** - Gerenciamento de rotas no sistema.
- **React icons** - Ícones utilizados na interface.
- **PrimeReact** - Formatação e estilização de inputs.
- **SASS** - Pré-processador CSS para estilização.

## Funcionalidades
- Listagem de triunviratos cadastrados.
- Exibição dos membros de cada triunvirato.
- Navegação para a página de plantão de cada triunvirato.
- Gerenciamento de processos e assistidos.
- Opção para editar informações dos triunviratos.

## Instalação de Dependências
1. Certifique-se de ter o Node.js instalado em sua máquina. Caso não tenha, baixe e instale a partir do [site oficial](https://nodejs.org/).
2. Clone o repositório:
   ```bash
   git clone <url-do-repositorio>
   ```
3. Navegue até o diretório do projeto:
   ```bash
   cd saju-main
   ```
4. Instale as dependências do projeto:
   ```bash
   npm install
   ```
   As principais dependências instaladas incluem:
   - `react`
   - `react-router-dom`
   - `react-icons`
   - `primereact`
   - `sass`
   - `jspdf`
   - `jspdf-autotable`

## Como Executar o Projeto
1. Após instalar as dependências, inicie o servidor de desenvolvimento:
   ```bash
   npm start
   ```
2. O projeto será aberto automaticamente no navegador no endereço `http://localhost:3000`.

## Estrutura de Pastas
- **src/pages/Triunvirato**: Contém a página principal para gerenciar triunviratos.
- **src/pages/Plantao**: Gerenciamento de plantões e seus triunviratos.
- **src/pages/Processos**: Gerenciamento de processos.
- **src/pages/Assistidos**: Gerenciamento de assistidos.
- **src/components**: Componentes reutilizáveis como cabeçalho e rodapé.
- **src/styles**: Arquivos de estilo global e específicos.

## Como Usar
1. Acesse a página principal do sistema.
2. Visualize a lista de triunviratos cadastrados.
3. Clique no botão "Ir para Plantão" para acessar a página de plantão correspondente.
4. Utilize o botão "Editar" para modificar as informações de um triunvirato.
5. Gerencie processos e assistidos nas respectivas páginas.

## Contribuição
Contribuições são bem-vindas! Siga os passos abaixo para contribuir:
1. Faça um fork do repositório.
2. Crie uma nova branch:
   ```bash
   git checkout -b minha-feature
   ```
3. Faça as alterações e commit:
   ```bash
   git commit -m "Descrição da minha feature"
   ```
4. Envie as alterações:
   ```bash
   git push origin minha-feature
   ```
5. Abra um Pull Request.

## Licença
Este projeto está licenciado sob a [MIT License](LICENSE).