const jsonServer = require("json-server");
const cors = require("cors");
const path = require("path");

const server = jsonServer.create();
const router = jsonServer.router("db.json"); // Caminho para o db.json
const middlewares = jsonServer.defaults();

server.use(cors());
server.use(middlewares);

// Configuração para servir imagens
server.use('/img', jsonServer.static(path.join(__dirname, 'backend', 'src', 'img')));

// Roteamento para dados (produtos)
server.use(router);

// Iniciar o servidor
server.listen(5000, () => {
  console.log("JSON Server is running on port 5000");
});
