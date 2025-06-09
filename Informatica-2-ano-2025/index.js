import express from "express";
import { resolve } from "path";
import { engine } from "express-handlebars";
import { fileURLToPath } from "url";
import methodOverride from "method-override";

const __filename = fileURLToPath(import.meta.url);
const __dirname = resolve(__filename, "..");

//importando rotas
import homeRoutes from "./src/routes/homeRoutes.js";
import alunoRoutes from "./src/routes/alunoRoutes.js";
import livroRoutes from "./src/routes/livroRoutes.js";
import editoraRoutes from "./src/routes/editoraRoutes.js";
import emprestimoRoutes from "./src/routes/emprestimoRoutes.js";

class App {
  constructor() {
    //o construtor é chamado quando a classe é instanciada
    //aqui é onde a aplicação é inicializada
    this.app = express(); //cria uma instancia do express
    this.middleware(); //configura o middleware
    this.routes(); //configura as rotas
  }

  middleware() {
    //configura o middleware
    //configurando o engine de template handlebars
    // Configura o Handlebars como motor de visualização
    this.app.engine("handlebars", engine());
    this.app.set("view engine", "handlebars");
    this.app.set("views", resolve(__dirname, "src", "views"));

    //configurar pasta public
    this.app.use(express.static(resolve(__dirname, "public")));

    this.app.use(express.json());
    //o express.json() é um middleware que faz o parse do corpo da requisição
    //para o formato json, ou seja, transforma o corpo da requisição em um objeto javascript
    //usado para receber dados no formato json
    //exemplo: { "name": "Lucas" } -> { name: "Lucas" }

    this.app.use(express.urlencoded({ extended: true }));
    //o express.urlencoded() é um middleware que faz o parse do corpo da requisição
    //para o formato urlencoded, ou seja, transforma o corpo da requisição em um objeto javascript
    //usado para receber dados no formato urlencoded
    //exemplo: name=Lucas -> { name: "Lucas" }
    //html forms geralmente usam esse formato

    this.app.use(methodOverride("_method")); // Configura o método de substituição para permitir PUT e DELETE via POST
    //o methodOverride é um middleware que permite usar métodos HTTP diferentes do padrão
    //ou seja, permite usar métodos como PUT e DELETE em formulários HTML
    //o método padrão para formulários HTML é o POST
    //então o methodOverride permite usar o método PUT e DELETE em formulários HTML
    //exemplo: <form action="/alunos/1?_method=PUT" method="POST">
    //o método PUT é usado para atualizar um recurso
  }
  routes() {
    this.app.use("/", homeRoutes);
    this.app.use("/alunos", alunoRoutes);
    this.app.use("/livros", livroRoutes);
    this.app.use("/editoras", editoraRoutes); // <- Aqui
    this.app.use("/emprestimos", emprestimoRoutes); // <- Aqui
  }
}

export default new App().app;
//exporta a instancia da classe App, ou seja, a aplicação express
//aqui é onde a aplicação é inicializada
//e exportada para ser usada em outros arquivos
//o new App() cria uma nova instancia da classe App
//e o .app retorna a aplicação express
//ou seja, a aplicação express é inicializada e exportada
//para ser usada em outros arquivos
//exemplo: import app from './index.js'
