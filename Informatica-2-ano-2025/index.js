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
    this.app.engine(
      "handlebars",
      engine({
        helpers: {
          eq: function (a, b) {
            return a === b;
          },
        },
      })
    );
    this.app.set("view engine", "handlebars");
    this.app.set("views", resolve(__dirname, "src", "views"));

    this.app.use(express.static(resolve(__dirname, "public")));
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(methodOverride("_method"));
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
