import express from 'express';
import controller from '../controllers/tb_dang_ky_phong.js';

const router = express.Router();

router.get('/', controller.getAll);
router.get('/:id', controller.getById);
router.get('/status/:status', controller.getByStatus);
router.post('/', controller.insert);
router.put('/', controller.update);
router.delete('/:id', controller.deleteOne);
router.post('/delete-many', controller.deleteMany);

export default router;
