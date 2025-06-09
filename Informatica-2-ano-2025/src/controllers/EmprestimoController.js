import { alunos } from "./AlunoController.js";
import { livros } from "./LivroController.js";

class Emprestimo {
  static id = 0;
  static incrementId() {
    return Emprestimo.id++;
  }
  constructor(idAluno, idLivro, dataEmprestimo) {
    this.id = Emprestimo.incrementId();
    this.idAluno = idAluno;
    this.idLivro = idLivro;
    this.dataEmprestimo = dataEmprestimo;
    this.dataDevolucao = null;
    this.status = "pendente"; // pendente ou devolvido
  }
}

const emprestimos = [];

class EmprestimoController {
  listarEmprestimos(req, res) {
    res.render("emprestimo", { emprestimos, alunos, livros });
  }

  cadastrarEmprestimo(req, res) {
    const { idAluno, idLivro, dataEmprestimo } = req.body;
    const aluno = alunos.find((a) => a.id == idAluno && a.ativo);
    const livro = livros.find((l) => l.id == idLivro && l.ativo);

    if (!aluno) return res.status(400).send("Aluno inválido ou inativo.");
    if (!livro) return res.status(400).send("Livro inválido ou inativo.");

    const livroEmprestado = emprestimos.find(
      (e) => e.idLivro == idLivro && e.status === "pendente"
    );
    if (livroEmprestado)
      return res.status(400).send("Livro já está emprestado.");

    const novoEmprestimo = new Emprestimo(idAluno, idLivro, dataEmprestimo);
    emprestimos.push(novoEmprestimo);
    res.redirect("/emprestimos");
  }

  devolverEmprestimo(req, res) {
    const { id } = req.params;
    const { dataDevolucao } = req.body;

    const emprestimo = emprestimos.find(
      (e) => e.id == id && e.status === "pendente"
    );

    if (!emprestimo)
      return res.status(400).send("Empréstimo não encontrado ou já devolvido.");

    emprestimo.dataDevolucao = dataDevolucao;
    emprestimo.status = "devolvido";

    res.redirect("/emprestimos");
  }
}

export default new EmprestimoController();
export { emprestimos };
