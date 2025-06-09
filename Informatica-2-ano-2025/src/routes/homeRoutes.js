import {Router} from 'express';

import HomeController from '../controllers/HomeController.js';

const router  = Router();

router.get("/", (req, res)=>HomeController.listar(req, res));


export default router;

