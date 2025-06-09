import { Router } from "express";
import EmprestimoController from "../controllers/EmprestimoController.js";

const router = Router();

router.get("/", EmprestimoController.listarEmprestimos);
router.post("/", EmprestimoController.cadastrarEmprestimo);
router.post("/:id/devolver", EmprestimoController.devolverEmprestimo);

export default router;
