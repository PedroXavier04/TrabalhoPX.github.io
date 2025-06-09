import {alunos} from "./AlunoController.js";

class HomeController {
    listar(req, res) {
        const alunosAtivos = alunos.filter(aluno => aluno.ativo == true);
        const numeroAlunos = alunos.length;
        res.render("home", {numeroAlunos, alunosAtivos});
    }
}

export default new HomeController();