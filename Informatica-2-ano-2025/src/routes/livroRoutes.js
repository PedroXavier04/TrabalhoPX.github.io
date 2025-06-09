import { Router } from "express";
import LivroController from "../controllers/LivroController.js";

const router = Router();
//cria uma nova instancia do Router

router.get("/", LivroController.listarLivros);
router.post("/", LivroController.cadastrarLivro);
router.post("/:id/edit", LivroController.editarLivro);
router.post("/:id/excluir", LivroController.excluirLivro);

export default router;
