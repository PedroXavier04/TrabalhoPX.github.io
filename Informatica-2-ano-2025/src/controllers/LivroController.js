class Livro {
  static id = 0;
  static incrementId() {
    return ++Livro.id; // Corrigido para iniciar em 1
  }

  constructor(autor, titulo, genero) {
    this.autor = autor;
    this.titulo = titulo;
    this.genero = genero;
    this.ativo = true;
    this.id = Livro.incrementId();
  }
}

const livros = [];

class LivroController {
  listarLivros(req, res) {
    const livrosAtivos = livros.filter((livro) => livro.ativo === true);
    res.render("livro", { livros: livrosAtivos });
  }

  cadastrarLivro(req, res) {
    const { autor, titulo, genero } = req.body;
    const novoLivro = new Livro(autor, titulo, genero);
    livros.push(novoLivro);
    res.redirect("/livros");
  }

  excluirLivro(req, res) {
    const { id } = req.params;
    const livro = livros.find((livro) => livro.id == id);
    if (livro) {
      livro.ativo = false;
    }
    res.redirect("/livros");
  }

  // Exibe o formulário de edição
  exibirFormularioEdicao(req, res) {
    const { id } = req.params;
    const livro = livros.find((livro) => livro.id == id);
    if (!livro) {
      return res.status(404).send("Livro não encontrado");
    }
    res.render("editarLivro", { livro }); // nome do template: editarLivro.handlebars
  }

  // Salva a edição
  atualizarLivro(req, res) {
    const { id } = req.params;
    const { autor, titulo, genero } = req.body;
    const livro = livros.find((livro) => livro.id == id);
    if (!livro) {
      return res.status(404).send("Livro não encontrado");
    }
    livro.autor = autor;
    livro.titulo = titulo;
    livro.genero = genero;
    res.redirect("/livros");
  }
}

export default new LivroController();
export { livros };
