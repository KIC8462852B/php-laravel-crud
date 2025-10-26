import { Router } from 'express';
import { register, login } from '../controllers/authController.js';
import { validate } from '../middlewares/joiSchemaValidation.js';
import { registerSchema, loginSchema } from '../models/joi/authSchemas.js';


const router = Router();

router.post('/register', validate(registerSchema, 'body'), register);
router.post('/login', validate(loginSchema, 'body'), login);

export default router;