
class Aluno {
    static id = 0;
    static incrementId() {
        return Aluno.id++;
    }
    constructor(nome, idade, curso) {
        this.nome = nome;
        this.idade = idade;
        this.curso = curso;
        this.ativo = true;
        this.id = Aluno.incrementId();
    }
}



export const alunos = []


class AlunoController {
    getAlunos(req, res) {
        // console.log(alunos);
        const alunosAtivos = alunos.filter(aluno => aluno.ativo == true);
        // console.log(alunosAtivos);
        res.render("aluno", {alunosAtivos});
    }
 

    createAluno(req, res) {
        const {nome, idade, curso} = req.body;
        const aluno = new Aluno(nome, idade, curso);
        alunos.push(aluno);
        res.redirect("/alunos");
        
    }

    editAluno(req, res) {
        console.log(req.body);
        console.log(req.params);
        const {id} = req.params;
        const {nome, idade, curso} = req.body;
        const alu = alunos.find(aluno => aluno.id == id);
        alu.nome = nome;
        alu.idade = idade;
        alu.curso = curso;
        res.redirect("/alunos");
    }
    deleteAluno(req, res) {
       try {const {id} = req.params;
        const aluno = alunos.find(aluno => aluno.id == id);
        aluno.ativo = false;
        res.redirect("/alunos");
    }catch (error) {
        console.log(erro)
        console.log("Erro ao deletar aluno");
        res.status(500).send("Erro ao deletar aluno");
    }
    }
}


export default new AlunoController();