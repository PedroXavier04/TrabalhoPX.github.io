import { Router } from "express";
import LivroController from "../controllers/LivroController.js";

const router = Router();

router.get("/", LivroController.listarLivros);
router.post("/", LivroController.cadastrarLivro);
router.get("/:id/edit", LivroController.exibirFormularioEdicao);
router.put("/:id", LivroController.atualizarLivro);
router.post("/:id/excluir", LivroController.excluirLivro);

export default router;
