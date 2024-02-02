# Teste Frond-end

#### Tabela CRUD usando nextjs 14 + tailwind

- Para criar essa tabela, foi usado o framework nextjs 14 e o tailwind para estilização.
  O CRUD, armazena os dados da tabela de forma local no computador do usuário, usando o localStorage.

#### Formulário de Criação

- O formulário de criação e edição, tem algumas restrições nos campos de edição.

1. O campo "Produto" , não pode conter números e tem restrição de no máximo 50 caractéres.
2. O campo "Unidade de Medida", tem três opções: 'Quilogramas(kg), Litros(lt) e Unidade(un)'; onde a opção selecionada acompanha o valor da quantidade, que é um campo que só aparece após selecionar uma dessas 3 opções. Se a opção selecionada for kg ou lt, o usuário só pode acrescentar até 3 números após a virgula, se for un a opção selecionada, só é permitida e entrada de números inteiros.
3. O campo "Preço", só aceita numerais e 2 números após a vírgula.

![Tabela CRUD](/imagens/Formulário%20de%20Criação.png)

# CRUD

## CREATE

![Tabela CRUD](/imagens/CRUD-Create.gif)

## READ

![Tabela CRUD](/imagens/Tabela%20de%20Cadastro.png)

## UPDATE

![Tabela CRUD](/imagens/CRUD%20-%20Edit.gif)

## DELETE

![Tabela CRUD](/imagens/CRUD%20-%20Delete.gif)

# EXECUÇÃO DO PROJETO

- Para conseguir executar o projeto, o usuário precisará seguir alguns passos:

1. Baixar e instalar o VsCode - link para download (https://code.visualstudio.com/download); (Importante ficar atento na hora de instalar para habilitar a opção 'Abrir com Code');
2. Baixar e instalar o Git - link para download (https://git-scm.com/downloads);
3. Ir em <> Code (Botão verde no início dessa página) , e copiar o link HTTPS;
4. Escolher um local para clonar essa aplicação;
5. Nesse local escolhido, clique com o botão direito em um espaço vazio e selecione a opção (Git Bash Here);
6. Após fazer isso irá abrir um prompt de comando já com o caminho da pasta atual que você está;
7. Nesse prompt de comando você vai escrever: git clone https..... (onde está o https... você vai colar o link HTTPS que você copiou na instrução 3);
8. Após terminar, o projeto vai estar na sua máquina, para abri-lo basta clicar com o botão direito em um espaço vazio da pasta onde está esse projeto, e clicar na opção 'Abrir com Code';
9. Abrir o terminal dentro do VsCode (Atalho -> Ctrl + ');
10. Instalar o nextjs na sua máquina - Segue o passo a passo no site (https://nextjs.org/docs/getting-started/installation);
11. Ainda no terminal, após todas as dependências estarem instaladas, basta digitar npm run dev e no navegador acessar o link http://localhost:3000, que estará no próprio terminal e você pode abri-lo direto clicando sobre ele com mouse + Ctrl, e o projeto estará acessível através desse localhost;
