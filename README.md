💻 Sobre o projeto

🔔 Página E-commerce Desenvolvedor Cadastra 💻

## Descrição

Descrição do Projeto
Este é um projeto de teste técnico para avaliação de conhecimentos em desenvolvimento. Ele consiste em implementar um layout funcional com funcionalidades específicas, integrando um front-end customizado a uma API REST fornecida por um json-server.

- Funcionalidades Implementadas
- Listagem de produtos consumidos da API.
- Filtros por cor, tamanho e preço.
- Carregar mais produtos dinamicamente.
- Layout responsivo e estilizado com HTML5 e CSS3.

<br>
<hr>
<div align="center">
	<img width="600" margin-right="30px" src="public/assets/to_readme/Tela_001.png">	
</div>
<hr>
<br>

## Estrutura

    Desenvolvedor Cadastra
    beckend/
    frontend/
    ├── src                            (Diretório principal dos arquivos do projeto)
    │   ├── assets                     (Recursos de folhas de estilo, scripts, fontes e imagens)
    │   ├── components                 (Componentes que não possuem estados, são chamados de dummy components)
    │   ├── services                   (Utilizado para transferir dados através de protocolos de comunicação para diferentes plataformas)
    ├── README.md                      (Breve definição/Documentação)
    └── ...                            (Outros arquivos de configuração)

### Ferramentas

- [NextJS](https://nextjs.org/)

- [StyledComponents](https://styled-components.com/)

- [TypeScript](https://www.typescriptlang.org/)

- [Axios](https://axios-http.com/ptbr/docs/intro)

- [Git](https://git-scm.com/doc)

- [Vercel](https://vercel.com/docs)

### Montagem do ambiente de desenvolvimento

O primeiro passo é clonar o projeto utilizando o método HTTPS ou SSH.

SSH

```sh
git clone git@github.com:eosantos/desenvolvedor-cadastra.git
```

HTTPS

```sh
git clone https://github.com/eosantos/desenvolvedor-cadastra.git
```

### Instalar dependências do projeto

Com o comando abaixo instalamos todos os pacotes definidos no package.json para configuração do servidor local:

```sh
npm i
```

### Acessando a aplicação

Para iniciar o projeto basta executar o comando abaixo:

```sh
npm star
```

Após a execução do comando acima basta o layout é acessível em `http://localhost:3000` e a API em `http://localhost:5000/products`.

### Chaves de Ambiente

Crie um arquivo .env.local na raiz do projeto e adicione a chave.

````
NEXT_PUBLIC_API_URL=http://localhost:5000
````

### Deploy

Acesse o site aqui

- [Desenvolvedor Cadastra](https://desenvolvedor-cadastra.vercel.app/)

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
