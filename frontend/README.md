💻 Sobre o projeto

⚙️ Integração Independente de Frontend com Drupal 💻

## Descrição

Este projeto consiste em um teste para implementar uma arquitetura de frontend independente utilizando React/Next.js com styled-components e Prettier. O objetivo é desenvolver uma interface web que possa ser integrada e consumida de forma independente pelo Drupal, permitindo que atualizações na camada de frontend sejam automaticamente refletidas e renderizadas dentro do sistema Drupal sem a necessidade de intervenções adicionais no backend. Essa abordagem facilita a manutenção e evolução contínua da interface, promovendo uma separação clara entre frontend e backend.

## Estrutura

    Sale-Page
    ├── src                            (Diretório principal dos arquivos do projeto)
    │   ├── components                 (Componentes que não possuem estados, são chamados de dummy components)
    ├── README.md                      (Breve definição/Documentação)
    └── ...                            (Outros arquivos de configuração)

### Ferramentas

- [NextJS](https://nextjs.org/)

- [StyledComponents](https://styled-components.com/)

- [TypeScript](https://www.typescriptlang.org/)

- [Git](https://git-scm.com/doc)

- [Vercel](https://vercel.com/docs)

### Montagem do ambiente de desenvolvimento

O primeiro passo é clonar o projeto utilizando o método HTTPS ou SSH.

SSH

```sh
git clone git@github.com:eosantos/sale-page.git
```

HTTPS

```sh
git clone https://github.com/eosantos/sale-page.git
```

### Instalar dependências do projeto

Com o comando abaixo instalamos todos os pacotes definidos no package.json para configuração do servidor local:

```sh
npm i
```

### Acessando a aplicação

Para iniciar o projeto basta executar o comando abaixo:

```sh
npm run dev
```
Após a execução do comando acima basta abrir o link `http://localhost:3000`.

### Deploy

Acesse o site aqui

- [Sale Page](https://sale-page-pied.vercel.app/)

### Commit

Para nossos commits utilizamos a seguinte estrutura:

```
feat: mensagem curta
^--^  ^------------^
|     |
|     +-> Resumo da alteração
|
+-------> Tipos: chore, docs, feat, fix, refactor, style, or test.
```

#### Exemplos

- `feat/feature`: (novo recurso para o usuário, não um novo recurso para script de compilação)
- `fix`: (correção de bug para o usuário, não uma correção para um script de construção)
- `docs`: (alterações na documentação)
- `style`: (formatação, ponto e vírgula faltando etc; sem alteração do código de produção)
- `refactor`: (refatorando o código de produção, por exemplo, renomeando uma variável)
- `test`: (adicionando testes ausentes, testes de refatoração; nenhuma alteração no código de produção)
- `chore`: (atualização de tarefas e etc; sem alteração do código de produção)
