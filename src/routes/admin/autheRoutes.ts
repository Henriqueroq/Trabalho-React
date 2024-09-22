import { Router } from "express";
import autheController, { AutheController } from "../../controllers/admin/autheController";

const router = Router();

router.post('/registro', autheController.register);
router.post('/login', autheController.login);

export default router;