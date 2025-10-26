import { Router } from 'express';
import { validate, publicFetch } from '../middlewares/tokenValidation.js';
import {
  getQuestions,
  checkAnswer,
  create,
  findAll,
  findById,
  update,
  remove
} from '../controllers/questionController.js';


const router = Router();

// RUTA PUBLICA PARA OBTENER PREGUNTAS DE LA API
router.get('/fetch', publicFetch, getQuestions);

// RUTA PROTEGIDA, VALIDACION DE RESPUESTA Y ACTUALIZACION DEL SCORE
router.post('/validate', validate, checkAnswer);

// RUTA CRUD PROTEGIDA PARA CREAR, OBTENER, ACTUALIZAR Y ELIMINAR PREGUNTAS (USUARIOS)
router.post('/', validate, create);
router.get('/', validate, findAll);
router.get('/:id', validate, findById);
router.put('/:id', validate, update);
router.delete('/:id', validate, remove);

export default router;

