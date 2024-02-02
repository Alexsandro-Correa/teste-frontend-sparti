# Teste Frond-end

#### Tabela CRUD usando nextjs 14 + tailwind

- Para criar essa tabela, foi usado o framework nextjs 14 e o tailwind para estilização.
  O CRUD, armazena os dados da tabela de forma local no computador do usuário, usando o localStorage.

#### Formulário de Criação

- O formulário de criação e edição, tem algumas restrições nos campos de edição.

1 - O campo "Produto" , não pode conter números e tem restrição de no máximo 50 caractéres.
2 - O campo "Unidade de Medida", tem três opções: 'Quilogramas(kg), Litros(lt) e Unidade(un)'; onde a opção selecionada acompanha o valor da quantidade, que é um campo que só aparece após selecionar uma dessas 3 opções. Se a opção selecionada for kg ou lt, o usuário só pode acrescentar até 3 números após a virgula, se for un a opção selecionada, só é permitida e entrada de números inteiros.
3 - O campo "Preço", só aceita numerais e 2 números após a vírgula.

![Tabela CRUD](/imagens/Formulário%20de%20Criação.png)

#### CRUD

## CREATE

![Tabela CRUD](/imagens/CRUD-Create.gif)

## READ

![Tabela CRUD](/imagens/Tabela%20de%20Cadastro.png)

## UPDATE

![Tabela CRUD](/imagens/CRUD%20-%20Edit.gif)

## DELETE

![Tabela CRUD](/imagens/CRUD%20-%20Delete.gif)
